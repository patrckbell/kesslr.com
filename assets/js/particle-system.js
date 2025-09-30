// Galactic Particle Flow System
class GalacticParticleSystem {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: false });
        this.particles = null;
        this.particleCount = 30000;
        this.time = 0;
        
        this.init();
        this.createParticleSystem();
        this.animate();
        this.handleResize();
    }
    
    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x101010);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.body.appendChild(this.renderer.domElement);
        
        this.camera.position.z = 0.5;
    }
    
    createParticleSystem() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);
        const orbitalData = new Float32Array(this.particleCount * 4); // radius, angle, speed, phase
        
        // Initialize particles with orbital patterns
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            // Create density-based distribution with higher density near center
            const densityFactor = Math.random();
            let radius;
            
            // Higher probability for smaller radii (more particles near center)
            if (densityFactor < 0.4) {
                // Inner rings - high density
                radius = 0.8 + Math.random() * 2.5;
            } else if (densityFactor < 0.7) {
                // Middle rings - medium density
                radius = 3.5 + Math.random() * 3.5;
            } else {
                // Outer rings - low density
                radius = 7.0 + Math.random() * 6.0;
            }
            
            // Add some variation
            const radiusVariation = (Math.random() - 0.5) * 0.3;
            radius += radiusVariation;
            
            const angle = (Math.random() * Math.PI * 2);
            const speed = 0.005 + Math.random() * 0.01;
            const phase = Math.random() * Math.PI * 2;
            
            // Initial positions in orbital pattern
            positions[i3] = Math.cos(angle) * radius;
            positions[i3 + 1] = Math.sin(angle) * radius * 0.3; // Flatten for galactic disk
            positions[i3 + 2] = (Math.random() - 0.5) * 0.1;
            
            // Orbital data
            orbitalData[i * 4] = radius;
            orbitalData[i * 4 + 1] = angle;
            orbitalData[i * 4 + 2] = speed;
            orbitalData[i * 4 + 3] = phase;
            
            // Dithered colors (white to gray)
            const brightness = 0.4 + Math.random() * 0.6;
            colors[i3] = brightness;
            colors[i3 + 1] = brightness;
            colors[i3 + 2] = brightness;
            
            // Size variation for dithering effect - tiny dots
            sizes[i] = 0.01 + Math.random() * 0.02;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('orbitalData', new THREE.BufferAttribute(orbitalData, 4));
        
        // Simple material with tiny dot particles
        const material = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: false
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
        
        // Add background stars
        this.createBackgroundStars();
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.time += 0.01;
        
        if (this.particles) {
            // Update particle positions for fluid motion
            const positions = this.particles.geometry.attributes.position.array;
            const orbitalData = this.particles.geometry.attributes.orbitalData.array;
            
            for (let i = 0; i < this.particleCount; i++) {
                const i3 = i * 3;
                const i4 = i * 4;
                
                // Orbital motion
                const radius = orbitalData[i4];
                const angle = orbitalData[i4 + 1] + orbitalData[i4 + 2] * this.time;
                const phase = orbitalData[i4 + 3];
                
                // Spiral and fluid effects
                const spiralFactor = Math.sin(angle * 2 + phase + this.time * 0.5) * 0.05;
                const newRadius = radius + spiralFactor;
                
                // Galactic center attraction
                const centerAttraction = 1 / (1 + radius * 1.5);
                const finalRadius = newRadius * centerAttraction;
                
                // Calculate base orbital position
                const orbitalX = Math.cos(angle) * finalRadius;
                const orbitalY = Math.sin(angle) * finalRadius * 0.3;
                const orbitalZ = Math.sin(angle * 3 + phase) * 0.05;
                
                // Add subtle turbulence
                const turbulenceX = Math.sin(this.time * 2 + i * 0.01) * 0.01;
                const turbulenceY = Math.cos(this.time * 1.5 + i * 0.01) * 0.005;
                
                // Final positions
                positions[i3] = orbitalX + turbulenceX;
                positions[i3 + 1] = orbitalY + turbulenceY;
                positions[i3 + 2] = orbitalZ;
            }
            
            this.particles.geometry.attributes.position.needsUpdate = true;
        }
        
        // Subtle background star movement
        if (this.backgroundStars) {
            const starPositions = this.backgroundStars.geometry.attributes.position.array;
            for (let i = 0; i < starPositions.length; i += 3) {
                // Very subtle drift
                starPositions[i] += Math.sin(this.time * 0.1 + i * 0.001) * 0.001;
                starPositions[i + 1] += Math.cos(this.time * 0.08 + i * 0.001) * 0.0008;
                starPositions[i + 2] += Math.sin(this.time * 0.12 + i * 0.001) * 0.0005;
            }
            this.backgroundStars.geometry.attributes.position.needsUpdate = true;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    createBackgroundStars() {
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 1500;
        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);
        const starSizes = new Float32Array(starCount);
        
        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            
            // Random positions in a large sphere around the camera
            const radius = 15 + Math.random() * 25;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            starPositions[i3 + 2] = radius * Math.cos(phi);
            
            // More visible star colors with variation
            const brightness = 0.3 + Math.random() * 0.7;
            starColors[i3] = brightness;
            starColors[i3 + 1] = brightness;
            starColors[i3 + 2] = brightness;
            
            // Slightly larger sizes for visibility
            starSizes[i] = 0.02 + Math.random() * 0.05;
        }
        
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
        
        const starMaterial = new THREE.PointsMaterial({
            size: 0.03,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: false
        });
        
        this.backgroundStars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.backgroundStars);
    }
    
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// Initialize the particle system with error handling
try {
    new GalacticParticleSystem();
    console.log('Galactic Particle System initialized successfully');
} catch (error) {
    console.error('Error initializing particle system:', error);
}
