import { useEffect } from 'react';

// Reveal content once, with immediate visibility for reduced-motion preferences.
export function useScrollReveal() {
  useEffect(() => {
    if (!window.IntersectionObserver || !window.matchMedia) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    const elements = [...document.querySelectorAll('.section-heading, .about-grid, .tool-card, .contact-intro')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach(element => {
      element.classList.add('scroll-reveal');
      observer.observe(element);
    });
    const revealAll = () => {
      if (preference.matches) {
        elements.forEach(element => element.classList.add('is-revealed'));
        observer.disconnect();
      }
    };
    preference.addEventListener('change', revealAll);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', revealAll);
      elements.forEach(element => element.classList.remove('scroll-reveal', 'is-revealed'));
    };
  }, []);
}
