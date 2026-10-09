/**
 * ADHYATM SHASWAT — CLAYMORPHISM CONTROLLER
 * Tactile 3D Tilt Physics · Dynamic Light Sheen · Scroll Entrance Reveal
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. SCROLL ENTRANCE REVEAL ANIMATIONS
     ========================================================================== */
  const animatedElements = document.querySelectorAll('.hero-intro-card, .hero-avatar-card, .project-clay-card, .clay-keycap, .principle-card, .clay-console-card, .section-label-row');
  
  animatedElements.forEach((el, index) => {
    el.classList.add('reveal-on-scroll');
    // Stagger initial hero cards
    if (el.closest('#hero')) {
      setTimeout(() => {
        el.classList.add('is-revealed');
      }, 100 + index * 120);
    }
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach((el) => {
      if (!el.closest('#hero')) {
        revealObserver.observe(el);
      }
    });
  } else {
    animatedElements.forEach((el) => el.classList.add('is-revealed'));
  }


  /* ==========================================================================
     3. 3D TACTILE CLAY CARD TILT WITH DYNAMIC GLARE
     ========================================================================== */
  const tiltCards = document.querySelectorAll('.clay-tilt-card');

  tiltCards.forEach((card) => {
    let isHovered = false;

    card.addEventListener('mouseenter', () => {
      isHovered = true;
      card.style.transition = 'transform 0.12s ease-out, box-shadow 0.25s ease-out';
    });

    card.addEventListener('mousemove', (e) => {
      if (!isHovered) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      // Update light glare position
      const glarePercentX = (x / rect.width) * 100;
      const glarePercentY = (y / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${glarePercentX}%`);
      card.style.setProperty('--mouse-y', `${glarePercentY}%`);

      // Gentle, realistic 4-degree tactile tilt
      const rotX = -normY * 4.2;
      const rotY = normX * 4.2;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      isHovered = false;
      card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-out';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });


  /* ==========================================================================
     4. TACTILE MECHANICAL KEYCAP INTERACTION
     ========================================================================== */
  const keycaps = document.querySelectorAll('.clay-keycap');

  keycaps.forEach((cap) => {
    cap.addEventListener('click', () => {
      cap.style.transform = 'translateY(2px) scale(0.97)';
      setTimeout(() => {
        cap.style.transform = '';
      }, 160);
    });
  });


  /* ==========================================================================
     5. 1-CLICK EMAIL CLIPBOARD & TACTILE TOAST
     ========================================================================== */
  const copyButtons = document.querySelectorAll('.js-copy-email');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('is-visible');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2400);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'contact@adhyatmshaswat.cyou';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const temp = document.createElement('input');
          temp.value = email;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
        }
        showToast(`Copied ${email} to clipboard`);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  });


  /* ==========================================================================
     6. SMOOTH ANCHOR SCROLL
     ========================================================================== */
  const dockLinks = document.querySelectorAll('.dock-link');
  dockLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

});
