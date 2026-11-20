const hiddenAtTop = "inset(0 0 100% 0)";
const hiddenAtBottom = "inset(100% 0 0 0)";
const visible = "inset(0)";

function pointerEdge(event, row) {
  const bounds = row.getBoundingClientRect();
  const { clientX: x, clientY: y, relatedTarget } = event;
  const otherRow = relatedTarget?.closest?.("tr");

  if (otherRow?.parentElement === row.parentElement && x >= bounds.left && x <= bounds.right) {
    const other = otherRow.getBoundingClientRect();
    if (other.bottom <= bounds.top + 1) return "top";
    if (other.top >= bounds.bottom - 1) return "bottom";
  }

  if (x < bounds.left || x > bounds.right) return "side";
  if (y < bounds.top) return "top";
  if (y > bounds.bottom) return "bottom";

  const top = y - bounds.top;
  const bottom = bounds.bottom - y;
  if (Math.min(x - bounds.left, bounds.right - x) <= Math.min(top, bottom)) return "side";
  return top <= bottom ? "top" : "bottom";
}

export function animateRoleMarker(event) {
  if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const row = event.currentTarget;
  const marker = row.querySelector(".role-marker");
  if (!marker.animate || !marker.getClientRects().length) return;

  const entering = event.type === "pointerenter";
  const edge = pointerEdge(event, row);
  const collapsed = edge === "top" ? hiddenAtTop : hiddenAtBottom;
  const running = marker.getAnimations();
  const from = running.length ? getComputedStyle(marker).clipPath : entering ? collapsed : visible;
  for (const animation of running) animation.cancel();

  const keyboardFocused = row.querySelector(":focus-visible");
  if (keyboardFocused) return;

  marker.animate([{ clipPath: from }, { clipPath: entering ? visible : collapsed }], {
    duration: 160,
    easing: "ease-out",
  });
}
