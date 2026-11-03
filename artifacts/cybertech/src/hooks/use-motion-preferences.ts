import { useEffect, useState } from 'react';

type MotionPreferences = {
  reducedMotion: boolean;
  canHover: boolean;
  finePointer: boolean;
  pageVisible: boolean;
};

function readPreferences(): MotionPreferences {
  if (typeof window === 'undefined') {
    return { reducedMotion: false, canHover: false, finePointer: false, pageVisible: true };
  }
  return {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    canHover: window.matchMedia('(hover: hover)').matches,
    finePointer: window.matchMedia('(pointer: fine)').matches,
    pageVisible: document.visibilityState === 'visible',
  };
}

export function useMotionPreferences(): MotionPreferences {
  const [prefs, setPrefs] = useState<MotionPreferences>(readPreferences);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hover = window.matchMedia('(hover: hover)');
    const pointer = window.matchMedia('(pointer: fine)');

    const update = () => setPrefs(readPreferences());
    reduced.addEventListener('change', update);
    hover.addEventListener('change', update);
    pointer.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);

    return () => {
      reduced.removeEventListener('change', update);
      hover.removeEventListener('change', update);
      pointer.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return prefs;
}
