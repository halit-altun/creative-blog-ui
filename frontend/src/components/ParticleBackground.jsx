import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
        this.color = `hsla(${Math.random() * 60 + 200}, 70%, 50%, 0.8)`;
        this.angle = Math.random() * 360;
        this.speed = 0.3 + Math.random() * 0.5;
        this.radius = 30 + Math.random() * 50;
      }

      update() {
        this.angle += this.speed * 0.5;
        const radian = (this.angle * Math.PI) / 180;
        this.baseX = this.x + Math.cos(radian) * this.radius * 0.02;
        this.baseY = this.y + Math.sin(radian) * this.radius * 0.02;

        let dx = mouseRef.current.x - this.baseX;
        let dy = mouseRef.current.y - this.baseY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 200;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density * 0.8;
        let directionY = forceDirectionY * force * this.density * 0.8;

        if (distance < maxDistance) {
          this.baseX -= directionX;
          this.baseY -= directionY;
        }

        this.x = this.baseX;
        this.y = this.baseY;

        if (this.x < 0 || this.x > canvas.width) {
          this.x = Math.random() * canvas.width;
          this.baseX = this.x;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.y = Math.random() * canvas.height;
          this.baseY = this.y;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}
    />
  );
};

export default ParticleBackground;