import { useEffect, useRef } from 'react';

export const useClickOutside = (close: () => void) => {
  const clickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (clickRef.current && !clickRef.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () =>
      document.removeEventListener('click', handleClickOutside, true);
  }, [clickRef, close]);

  return { clickRef };
};
