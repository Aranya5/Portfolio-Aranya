import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    
    // Mouse tracking
    let mouse = { x: -1000, y: -1000 };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const techLogos = ["React", "TypeScript", "Node.js", "Python", "TensorFlow", "MongoDB", "Java", "Docker", "AWS", "</>", "{ }", "C++", "Next.js"];
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      isLogo: boolean;
      text?: string;
      baseX: number;
      baseY: number;
      glow: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.glow = 0;
        
        // 8% chance to be a tech text logo
        this.isLogo = Math.random() < 0.08;
        if (this.isLogo) {
          this.text = techLogos[Math.floor(Math.random() * techLogos.length)];
          this.radius = 0;
          // logos float even slower
          this.vx *= 0.3;
          this.vy *= 0.3;
        } else {
          this.radius = Math.random() * 2 + 0.5;
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.glow > 0) {
          this.glow = Math.max(0, this.glow - 0.02);
        }

        // Bounce off edges
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;

        // Mouse Dispersing effect
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;

        if (distance < maxDist) {
          // Push away
          const force = (maxDist - distance) / maxDist;
          this.x -= (dx / distance) * force * 3;
          this.y -= (dy / distance) * force * 3;
          this.glow = 1.0;
        }
      }

      draw() {
        if (!ctx) return;
        if (this.isLogo && this.text) {
          const alpha = 0.05 + this.glow * 0.6;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.font = "bold 20px 'Inter', sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          
          if (this.glow > 0.1) {
             ctx.shadowBlur = Math.floor(this.glow * 15);
             ctx.shadowColor = `rgba(16, 185, 129, ${this.glow * 0.5})`;
          } else {
             ctx.shadowBlur = 0;
          }
          
          ctx.fillText(this.text, this.x, this.y);
          ctx.shadowBlur = 0;
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius + (this.glow * 1.5), 0, Math.PI * 2);
          
          const r = Math.round(99 + this.glow * (16 - 99));
          const g = Math.round(102 + this.glow * (185 - 102));
          const b = Math.round(241 + this.glow * (129 - 241));
          const alpha = Math.min(1, 0.3 + this.glow * 0.5);
          
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          if (this.glow > 0.1) {
             ctx.shadowBlur = Math.floor(this.glow * 15);
             ctx.shadowColor = `rgba(16, 185, 129, ${this.glow})`;
          } else {
             ctx.shadowBlur = 0;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 10000); 
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Connect nearby particles
          if (distance < 120 && !particles[i].isLogo && !particles[j].isLogo) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            const opacity = 1 - (distance / 120);
            ctx!.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }

        // Draw line to mouse for ALL elements including logos
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        if (distToMouse < 240) {
          ctx!.beginPath();
          ctx!.moveTo(particles[i].x, particles[i].y);
          ctx!.lineTo(mouse.x, mouse.y);
          const opacity = Math.max(0, 1 - (distToMouse / 240));
          // Softer, highly visually appealing emerald connection lines
          ctx!.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.25})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle dynamic lighting following the mouse
      if (mouse.x !== -1000) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 600);
        gradient.addColorStop(0, 'rgba(79, 70, 229, 0.08)');
        gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.03)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawLines();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-80"
    />
  );
};

export default ParticleBackground;
