/* The supplied canvas/Three assets are preserved. The previously invisible
   continuous WebGL render loop is replaced with a native inertial photo rail. */
const gallery = document.querySelector('.hero-gallery');
if (gallery) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let active = false;
  let dragged = false;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let frame = 0;
  let pointerId = null;
  const clamp = value => Math.max(0, Math.min(gallery.scrollWidth - gallery.clientWidth, value));
  const stop = () => { cancelAnimationFrame(frame); frame = 0; velocity = 0; gallery.classList.remove('is-dragging'); };
  gallery.querySelectorAll('img').forEach(image => { image.draggable = false; });
  gallery.addEventListener('pointerdown', event => {
    // Touch uses the browser's native inertial scrolling; don't hijack vertical gestures.
    if (event.pointerType === 'touch' || event.button !== 0) return;
    stop(); active = true; dragged = false; lastX = event.clientX; lastTime = performance.now(); pointerId = event.pointerId;
    gallery.setPointerCapture(pointerId);
  });
  gallery.addEventListener('pointermove', event => {
    if (!active) return;
    const now = performance.now();
    const distance = lastX - event.clientX;
    const dt = Math.max(8, now - lastTime);
    if (Math.abs(distance) > 2) dragged = true;
    if (dragged) {
      gallery.classList.add('is-dragging');
      gallery.scrollLeft = clamp(gallery.scrollLeft + distance);
      velocity = Math.max(-2.5, Math.min(2.5, distance / dt));
    }
    lastX = event.clientX; lastTime = now;
  });
  function release() {
    if (!active) return;
    active = false;
    if (pointerId !== null && gallery.hasPointerCapture(pointerId)) gallery.releasePointerCapture(pointerId);
    pointerId = null;
    if (reduce.matches || performance.now() - lastTime > 100) { stop(); return; }
    let previous = performance.now();
    const glide = now => {
      const dt = Math.min(32, now - previous); previous = now;
      const from = gallery.scrollLeft;
      gallery.scrollLeft = clamp(from + velocity * dt);
      velocity *= Math.pow(.93, dt / 16.67);
      if (Math.abs(velocity) < .025 || Math.abs(gallery.scrollLeft - from) < .3) { stop(); return; }
      frame = requestAnimationFrame(glide);
    };
    frame = requestAnimationFrame(glide);
  }
  gallery.addEventListener('pointerup', release);
  gallery.addEventListener('pointercancel', () => { active = false; stop(); });
  gallery.addEventListener('lostpointercapture', () => { if (active) release(); });
  gallery.addEventListener('click', event => { if (dragged) { event.preventDefault(); dragged = false; } });
  gallery.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault(); stop();
    const amount = gallery.clientWidth * .75;
    const left = event.key === 'Home' ? 0 : event.key === 'End' ? gallery.scrollWidth : gallery.scrollLeft + (event.key === 'ArrowRight' ? amount : -amount);
    gallery.scrollTo({ left: clamp(left), behavior: reduce.matches ? 'instant' : 'smooth' });
  });
  reduce.addEventListener('change', stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { active = false; stop(); } });
}
