class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        this.init();
        this.bindEvents();
        this.animate();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    createParticles() {
        this.particles = [];
        const particleCount = Math.floor((this.width * this.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.width, this.height));
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.particles.forEach((particle, index) => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
            
            // Connect nearby particles
            for (let j = index + 1; j < this.particles.length; j++) {
                const dx = particle.x - this.particles[j].x;
                const dy = particle.y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.drawConnection(particle, this.particles[j], distance);
                }
            }
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawConnection(particle1, particle2, distance) {
        const opacity = 1 - (distance / 120);
        
        this.ctx.save();
        this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.3})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.beginPath();
        this.ctx.moveTo(particle1.x, particle1.y);
        this.ctx.lineTo(particle2.x, particle2.y);
        this.ctx.stroke();
        this.ctx.restore();
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

class Particle {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02;
    }

    update(mouse) {
        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            const force = (150 - distance) / 150;
            const angle = Math.atan2(dy, dx);
            this.vx -= Math.cos(angle) * force * 0.01;
            this.vy -= Math.sin(angle) * force * 0.01;
        }

        // Apply damping
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Boundary collision
        if (this.x < 0 || this.x > this.canvasWidth) {
            this.vx *= -1;
            this.x = Math.max(0, Math.min(this.canvasWidth, this.x));
        }
        
        if (this.y < 0 || this.y > this.canvasHeight) {
            this.vy *= -1;
            this.y = Math.max(0, Math.min(this.canvasHeight, this.y));
        }

        // Update pulse
        this.pulse += this.pulseSpeed;
    }

    draw(ctx) {
        const pulseRadius = this.radius + Math.sin(this.pulse) * 0.5;
        const pulseOpacity = this.opacity + Math.sin(this.pulse) * 0.2;
        
        ctx.save();
        
        // Outer glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(0, 212, 255, ${pulseOpacity})`;
        
        // Main particle
        ctx.fillStyle = `rgba(0, 212, 255, ${pulseOpacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner bright core
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseRadius * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Create dynamic background waves
class WaveBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.1';
        
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.time = 0;
        
        this.resize();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.time += 0.01;
        
        // Create flowing gradient waves
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        gradient.addColorStop(0, `rgba(0, 212, 255, 0.1)`);
        gradient.addColorStop(0.5, `rgba(185, 103, 219, 0.1)`);
        gradient.addColorStop(1, `rgba(0, 212, 255, 0.1)`);
        
        this.ctx.fillStyle = gradient;
        
        // Draw flowing shapes
        this.ctx.beginPath();
        for (let x = 0; x <= this.width + 50; x += 50) {
            const y = this.height / 2 + Math.sin((x / 200) + this.time) * 100;
            if (x === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.lineTo(this.width, this.height);
        this.ctx.lineTo(0, this.height);
        this.ctx.closePath();
        this.ctx.fill();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    window.particleSystem = new ParticleSystem();
    
    // Initialize wave background
    window.waveBackground = new WaveBackground();
});