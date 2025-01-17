import { useEffect } from 'react';

function ConfettiEffect({ earnedPoints }) {
  useEffect(() => {
    if (earnedPoints === null) return;

    let canvas,
      ctx,
      W,
      H,
      mp,
      particles,
      angle,
      tiltAngle, // eslint-disable-line @typescript-eslint/no-unused-vars
      confettiActive,
      animationComplete; // eslint-disable-line @typescript-eslint/no-unused-vars

    function initializeConfetti() {
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      mp = 10; // max particles
      particles = [];
      angle = 0;
      tiltAngle = 0;
      confettiActive = true;
      animationComplete = false;

      for (let i = 0; i < mp; i++) {
        particles.push(createParticle());
      }
      startConfetti();
    }

    function createParticle() {
      return {
        x: Math.random() * W,
        y: Math.random() * H - H,
        r: Math.random() * 75 + 45,
        d: Math.random() * mp + 10,
        color: randomColor(),
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      };
    }

    function randomColor() {
      const colors = [
        'DodgerBlue',
        'OliveDrab',
        'Gold',
        'pink',
        'SlateBlue',
        'lightblue',
        'Violet',
        'PaleGreen',
        'SteelBlue',
        'SandyBrown',
        'Chocolate',
        'Crimson',
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function startConfetti() {
      function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.lineWidth = p.r / 2;
          ctx.strokeStyle = p.color;
          ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
          ctx.stroke();
        });
        updateParticles();
        if (confettiActive) requestAnimationFrame(draw);
      }
      draw();
    }

    function updateParticles() {
      angle += 0.01;
      tiltAngle += 0.1;
      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(angle + p.d) + 3 + p.r / 2) / 3;
        p.x += Math.sin(angle);
        p.tilt = Math.sin(p.tiltAngle) * 15;
        if (p.y > H) p.y = -10;
      });
    }

    initializeConfetti();

    // Cleanup when component unmounts
    return () => {
      confettiActive = false;
      if (ctx) ctx.clearRect(0, 0, W, H);
    };
  }, [earnedPoints]);

  return null;
}

export default ConfettiEffect;
