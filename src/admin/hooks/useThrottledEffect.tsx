/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

type useThrottledEffect = (callback: React.EffectCallback, delay: number, deps: React.DependencyList) => void;

const useThrottledEffect: useThrottledEffect = (callback, delay, deps = []) => {
  const lastRan = useRef<number>(null);

  useEffect(() => {
    if (lastRan) {
      const handler = setTimeout(() => {
        if (Date.now() - lastRan.current >= delay) {
          callback();
          lastRan.current = Date.now();
        }
      }, delay - (Date.now() - lastRan.current));

      return () => {
        clearTimeout(handler);
      };
    }

    callback();
    lastRan.current = Date.now();
    return () => null;
  }, [delay, ...deps]);
};

export default useThrottledEffect;
