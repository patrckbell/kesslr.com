import { useLayoutEffect, useRef } from "react";

const duration = 1500;
const pixelSize = 30;

function makeCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function paintCaption(context, caption, bounds, font) {
  const range = document.createRange();
  const textNodes = document.createTreeWalker(caption, NodeFilter.SHOW_TEXT);
  context.font = font;

  // Use the browser's line breaks and word positions, including on narrow screens.
  for (let text = textNodes.nextNode(); text; text = textNodes.nextNode()) {
    if (text.parentElement.classList.contains("hero-ellipsis")) continue;
    for (const word of text.data.matchAll(/\S+/g)) {
      range.setStart(text, word.index);
      range.setEnd(text, word.index + word[0].length);
      const box = range.getBoundingClientRect();
      const metrics = context.measureText(word[0]);
      const baseline = box.top + (box.height + metrics.fontBoundingBoxAscent
        - metrics.fontBoundingBoxDescent) / 2;
      context.fillText(word[0], box.left - bounds.left, baseline - bounds.top);
    }
  }
}

function pixelTexture(source, columns, rows, tint) {
  const sample = makeCanvas(columns, rows);
  const sampleContext = sample.getContext("2d");
  sampleContext.imageSmoothingQuality = "high";
  sampleContext.drawImage(source, 0, 0, columns, rows);
  if (tint) {
    sampleContext.globalCompositeOperation = "source-in";
    sampleContext.fillStyle = tint;
    sampleContext.fillRect(0, 0, columns, rows);
  }

  const texture = makeCanvas(source.width, source.height);
  const textureContext = texture.getContext("2d");
  textureContext.imageSmoothingEnabled = false;
  textureContext.drawImage(sample, 0, 0, texture.width, texture.height);
  return texture;
}

function prepareDissolve(canvas, context, element, ratio, accent, paint) {
  const bounds = element.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return null;

  canvas.width = Math.ceil(bounds.width * ratio);
  canvas.height = Math.ceil(bounds.height * ratio);
  const source = makeCanvas(canvas.width, canvas.height);
  const sourceContext = source.getContext("2d");
  sourceContext.scale(ratio, ratio);
  paint(sourceContext, bounds);

  const columns = Math.ceil(bounds.width / pixelSize);
  const rows = Math.ceil(bounds.height / pixelSize);
  const textures = [1, 2, 4].map((scale, index) =>
    pixelTexture(source, columns * scale, rows * scale, index === 0 ? accent : null));
  const tiles = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = Math.round(canvas.width * column / columns);
      const y = Math.round(canvas.height * row / rows);
      const right = Math.round(canvas.width * (column + 1) / columns);
      const bottom = Math.round(canvas.height * (row + 1) / rows);
      const noise = Math.sin((column + row * columns + 1) * 78.233) * 43758.5453;
      tiles.push({
        x, y, width: right - x, height: bottom - y,
        start: (noise - Math.floor(noise)) * 0.72,
        path: `M${x / ratio} ${y / ratio}H${right / ratio}V${bottom / ratio}H${x / ratio}Z`,
      });
    }
  }

  return progress => {
    const visible = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (const tile of tiles) {
      const age = (progress - tile.start) / 0.24;
      if (age <= 0) continue;
      if (age >= 1) {
        visible.push(tile.path);
        continue;
      }

      const texture = textures[Math.floor(age * textures.length)];
      const { x, y, width, height } = tile;
      context.globalAlpha = Math.min(1, age * 6);
      context.drawImage(texture, x, y, width, height, x, y, width, height);
    }

    // Completed tiles display the original image or text on the same footprint.
    if (visible.length === tiles.length) {
      element.style.setProperty("--dissolve-tiles", "none");
    } else if (visible.length) {
      element.style.setProperty("--dissolve-tiles", `path("${visible.join(" ")}")`);
    }
  };
}

export function useHeroReveal() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const brand = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const [wordmarkCanvas, captionCanvas] = brand.querySelectorAll("canvas");
    const wordmarkContext = wordmarkCanvas.getContext("2d");
    const captionContext = captionCanvas.getContext("2d");
    if (!wordmarkContext || !captionContext) return;

    const image = brand.querySelector("img");
    const caption = brand.querySelector("p");
    const style = getComputedStyle(caption);
    const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const accent = style.getPropertyValue("--blue").trim();
    let stopped = false;
    let frame;

    function cleanup() {
      stopped = true;
      clearTimeout(readinessTimeout);
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", finish);
      motion.removeEventListener("change", finish);
      delete brand.dataset.revealing;
      image.style.removeProperty("--dissolve-tiles");
      caption.style.removeProperty("--dissolve-tiles");
      wordmarkCanvas.width = wordmarkCanvas.height = 0;
      captionCanvas.width = captionCanvas.height = 0;
    }

    function finish() {
      if (stopped) return;
      cleanup();
      brand.dataset.revealComplete = "";
    }

    const readinessTimeout = setTimeout(finish, 800);
    window.addEventListener("resize", finish);
    motion.addEventListener("change", finish);
    brand.dataset.revealing = "";

    async function start() {
      await Promise.all([image.decode(), document.fonts.load(font, caption.textContent)]);
      if (stopped) return;
      clearTimeout(readinessTimeout);

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const drawWordmark = prepareDissolve(wordmarkCanvas, wordmarkContext, image, ratio, accent,
        (context, bounds) => context.drawImage(image, 0, 0, bounds.width, bounds.height));
      const drawCaption = prepareDissolve(captionCanvas, captionContext, caption, ratio, accent,
        (context, bounds) => paintCaption(context, caption, bounds, font));
      if (!drawWordmark || !drawCaption) {
        finish();
        return;
      }

      let startedAt;
      function tick(now) {
        startedAt ??= now;
        const time = (now - startedAt) / duration;
        if (time >= 1) {
          finish();
          return;
        }

        // power1.inOut is a quadratic ease.
        const progress = time < 0.5 ? 2 * time ** 2 : 1 - 2 * (1 - time) ** 2;
        drawWordmark(progress);
        drawCaption(progress);
        frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    }

    start().catch(finish);
    return () => {
      cleanup();
      delete brand.dataset.revealComplete;
    };
  }, []);

  return ref;
}
