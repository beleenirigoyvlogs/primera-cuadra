import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();

    // Observe class attribute changes on <html>
    const observer = new MutationObserver(() => {
      checkDark();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    window.addEventListener('storage', checkDark);
    window.addEventListener('theme-change', checkDark);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', checkDark);
      window.removeEventListener('theme-change', checkDark);
    };
  }, []);

  const toggleTheme = () => {
    const nextDark = !document.documentElement.classList.contains('dark');
    if (typeof document !== 'undefined') {
      if (nextDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      try {
        localStorage.setItem('theme', nextDark ? 'dark' : 'light');
      } catch (e) {}
      window.dispatchEvent(new CustomEvent('theme-change', { detail: { isDark: nextDark } }));
    }
    setIsDark(nextDark);
  };

  return { isDark, toggleTheme };
}
