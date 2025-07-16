window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const main = document.getElementById('main');

  setTimeout(() => {
    loader.style.display = 'none';
    main.style.display = 'block';

    setTimeout(initBeads, 100); // Wait for main layout to settle
  }, 2000);
});

function initBeads() {
  document.querySelectorAll('.aura-button').forEach((btn) => {
    const clockwise = btn.querySelector('.bead.clockwise');
    const counter = btn.querySelector('.bead.counter');
    const target = btn.querySelector('.orbit-target');

    if (!clockwise || !counter || !target) return;

    let t1 = 0;
    let t2 = 0.5;
    let speed = 0.002;
    let targetSpeed = 0.002;

    function lerp(a, b, f) {
      return a + (b - a) * f;
    }

    function getPos(t, w, h) {
      const p = t % 1;
      if (p < 0.25) return { top: 0, left: p * 4 * w };
      else if (p < 0.5) return { top: (p - 0.25) * 4 * h, left: w };
      else if (p < 0.75) return { top: h, left: (1 - (p - 0.5) * 4) * w };
      else return { top: (1 - (p - 0.75) * 4) * h, left: 0 };
    }

    function updateOrbit() {
      const w = target.offsetWidth;
      const h = target.offsetHeight;

      const pos1 = getPos(t1, w, h);
      const pos2 = getPos(t2, w, h);

      clockwise.style.top = `${pos1.top - 6}px`;
      clockwise.style.left = `${pos1.left - 6}px`;

      counter.style.top = `${pos2.top - 6}px`;
      counter.style.left = `${pos2.left - 6}px`;

      t1 += speed;
      t2 += speed;

      speed = lerp(speed, targetSpeed, 0.05);

      requestAnimationFrame(updateOrbit);
    }

    btn.addEventListener("mouseenter", () => {
      targetSpeed = 0.01; // Speed up
    });

    btn.addEventListener("mouseleave", () => {
      targetSpeed = 0.002; // Slow down
    });

    requestAnimationFrame(updateOrbit);
  });
}
