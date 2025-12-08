// Lazy load images + reveal on scroll + small parallax effect for hero layers
document.addEventListener('DOMContentLoaded', () => {
  // lazy images
  const lazyImgs = document.querySelectorAll('img.lazy');
  const io = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        const img = ent.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        io.unobserve(img);
      }
    });
  }, { rootMargin: "200px 0px" });

  lazyImgs.forEach(i => io.observe(i));

  // reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const rObserver = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('visible');
        rObserver.unobserve(ent.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(r => rObserver.observe(r));

  // small parallax on mouse move (desktop) for hero layers
  const hero = document.querySelector('.about-hero');
  if (hero && window.innerWidth > 900) {
    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const back = hero.querySelector('.layer-back');
      const mid = hero.querySelector('.layer-mid');
      if (back) back.style.transform = `translate(${x * 6}px, ${y * 6}px) scale(1.04)`;
      if (mid)  mid.style.transform  = `translate(${x * 12}px, ${y * 12}px) scale(1.02)`;
    });
  }

  // accessibility: reduce motion respect
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.hero-layer').forEach(l => l.style.transition = 'none');
  }
});
