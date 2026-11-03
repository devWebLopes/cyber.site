import { useEffect } from 'react';

const revealTargets = [
  '.section-heading', '.feature-card', '.differential-intro', '.diff-card',
  '.metric-card', '.illustration-copy', '.control-dashboard', '.step',
  '.contact-copy', '.contact-form', '.feature-cta', '.process-cta',
  '.acronis-band', '.trust-item',
].join(', ');

/** Progressive enhancement: content stays visible without JavaScript or motion. */
export function useComfortMotion() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observed = new Set<HTMLElement>();
    let observer: IntersectionObserver | undefined;
    let mutationObserver: MutationObserver | undefined;

    const stop = () => {
      observer?.disconnect();
      mutationObserver?.disconnect();
      observed.forEach((element) => {
        element.classList.remove('scroll-reveal', 'is-revealed');
        element.style.removeProperty('--reveal-delay');
      });
      observed.clear();
    };

    const start = () => {
      stop();
      if (preference.matches || !('IntersectionObserver' in window)) return;

      observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          target.classList.add('is-revealed');
          observer?.unobserve(target);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

      const observeNewElements = () => {
        document.querySelectorAll<HTMLElement>(revealTargets).forEach((element) => {
          if (observed.has(element)) return;
          observed.add(element);
          // Keep the first viewport immediate; stagger sibling cards on entry.
          if (element.getBoundingClientRect().top < window.innerHeight - 24) return;
          const siblings = Array.from(element.parentElement?.children ?? [])
            .filter((sibling) => sibling.matches(revealTargets));
          const delay = (Math.max(0, siblings.indexOf(element)) % 4) * 70;
          element.style.setProperty('--reveal-delay', `${delay}ms`);
          element.classList.add('scroll-reveal');
          observer?.observe(element);
        });
      };
      observeNewElements();
      mutationObserver = new MutationObserver(observeNewElements);
      const main = document.getElementById('main-content');
      if (main) mutationObserver.observe(main, { childList: true, subtree: true });
    };

    start();
    preference.addEventListener('change', start);
    return () => {
      stop();
      preference.removeEventListener('change', start);
    };
  }, []);
}
