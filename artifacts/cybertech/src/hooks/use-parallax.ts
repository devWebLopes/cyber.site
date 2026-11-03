import { MotionValue, useScroll, useTransform } from 'framer-motion';
import { useMotionPreferences } from './use-motion-preferences';

export function useParallax(distance: number, range: [number, number] = [0, 600]): MotionValue<number> {
  const prefs = useMotionPreferences();
  const enabled = !prefs.reducedMotion && prefs.pageVisible;
  const { scrollY } = useScroll();
  return useTransform(scrollY, range, enabled ? [0, distance] : [0, 0]);
}
