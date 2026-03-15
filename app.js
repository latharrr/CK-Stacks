/* =========================================
   CK STACKS — JavaScript Interactions
   Buy buttons, toast, scroll-reveal, etc.
   ========================================= */

(function () {
  'use strict';

  // ── Toast Notification ──
  const toast = document.getElementById('toast');

  function showToast(msg = 'Opening with your cashback link!') {
    toast.querySelector('.toast-msg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ── Buy Button Interactions ──
  const buyButtons = document.querySelectorAll('.buy-btn, .full-stack-btn');
  buyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Ripple effect
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%; background:rgba(255,255,255,0.15);
        width:10px; height:10px; transform:scale(0); animation:rippleAnim 0.5s ease-out forwards;
        left:${e.offsetX - 5}px; top:${e.offsetY - 5}px; pointer-events:none;
      `;
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);

      // Show toast (link opens naturally via href)
      const productCard = btn.closest('.product-card');
      if (productCard) {
        const productName = productCard.querySelector('.product-name')?.textContent || 'product';
        const store = productCard.querySelector('.product-store')?.textContent || 'the store';
        showToast(`Opening ${productName} on ${store} with cashback! 🎉`);
      } else {
        showToast('Opening all items with CashKaro cashback! 🛒');
      }
    });
  });

  // ── Create Stack Button ──
  const createStackBtn = document.getElementById('create-stack-btn');
  if (createStackBtn) {
    createStackBtn.addEventListener('click', () => {
      showToast('Redirecting to CashKaro to create your stack… ✦');
    });
  }

  // ── Scroll-reveal Intersection Observer ──
  const revealEls = document.querySelectorAll('.product-card, .savings-summary, .creator-cta-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Set initial state for reveal (override animation for cards that are off-screen)
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.05}s`;
    observer.observe(el);
  });

  // ── Cashback Chip Pulse ──
  const cashbackChips = document.querySelectorAll('.cashback-chip');
  cashbackChips.forEach((chip, i) => {
    setInterval(() => {
      chip.style.transform = 'scale(1.04)';
      chip.style.transition = 'transform 0.2s';
      setTimeout(() => {
        chip.style.transform = 'scale(1)';
      }, 200);
    }, 3000 + i * 700);
  });

  // ── Product Card Tilt on Hover (desktop only) ──
  if (window.matchMedia('(hover:hover)').matches) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-2px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
        card.style.transition = 'transform 0.1s';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        card.style.transition = 'transform 0.4s ease';
      });
    });
  }

  // ── Dynamic View Counter ──
  const viewCountEl = document.querySelector('.meta-pill:last-child span:last-child');
  if (viewCountEl) {
    let views = 1247;
    setInterval(() => {
      const delta = Math.floor(Math.random() * 3);
      if (delta > 0) {
        views += delta;
        viewCountEl.textContent = `${(views / 1000).toFixed(1)}k views`;
      }
    }, 8000);
  }

  // Add ripple keyframes to the page
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleAnim {
      to { transform: scale(30); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  console.log('%c✦ CK Stacks Prototype %c— Built for CashKaro', 
    'color:#6366f1; font-weight:bold; font-size:14px;', 
    'color:#9898c0; font-size:14px;'
  );
})();
