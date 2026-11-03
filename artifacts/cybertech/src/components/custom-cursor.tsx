import { useEffect, useRef, useState } from 'react';
import { useMotionPreferences } from '@/hooks/use-motion-preferences';

type CursorVariant = 'default' | 'interactive' | 'pressed';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, select, textarea, [data-cursor="interactive"], .feature-card, .diff-card, .metric-card, .step';

export function CustomCursor() {
  const prefs = useMotionPreferences();
  const enabled = prefs.canHover && prefs.finePointer && !prefs.reducedMotion && prefs.pageVisible;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const variantRef = useRef<CursorVariant>('default');
  const [variant, setVariant] = useState<CursorVariant>('default');

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add('has-custom-cursor');

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let running = true;

    const applyVariant = (next: CursorVariant) => {
      if (variantRef.current === next) return;
      variantRef.current = next;
      setVariant(next);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };
    const onDown = () => applyVariant('pressed');
    const onUp = () => applyVariant(variantRef.current === 'pressed' ? 'default' : variantRef.current);
    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target) return;
      const interactive = target.closest(INTERACTIVE_SELECTOR);
      applyVariant(interactive ? 'interactive' : 'default');
    };
    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const tick = () => {
      if (!running) return;
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const onVisibility = () => {
      if (document.visibilityState !== 'visible') {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className={`custom-cursor-dot custom-cursor-${variant}`} aria-hidden="true" />
      <div ref={ringRef} className={`custom-cursor-ring custom-cursor-${variant}`} aria-hidden="true" />
    </>
  );
}
