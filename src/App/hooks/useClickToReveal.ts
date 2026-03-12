import { type RefObject, useEffect, useState } from 'react';

export function useClickToReveal(
  containerRef: RefObject<HTMLDivElement | null>,
  linkSelector: string | string[],
): [Set<string>, (update: (prev: Set<string>) => Set<string>) => void] {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const selectors = Array.isArray(linkSelector)
      ? linkSelector
      : [linkSelector];

    selectors.forEach((selector) => {
      const links =
        containerRef.current?.querySelectorAll<HTMLAnchorElement>(selector);

      links?.forEach((link) => {
        const href = link.getAttribute('href') || '';
        const identifier = href.split(':').slice(1).join(':') || '';

        if (!identifier) {
          return;
        }

        const isRevealed = revealed.has(identifier);
        if (isRevealed) {
          link.textContent = identifier;
        }

        link.style.cursor = 'pointer';
        link.onclick = (e) => {
          if (!revealed.has(identifier)) {
            e.preventDefault();
            setRevealed((prev) => new Set(prev).add(identifier));
          }
        };
      });
    });
  }, [containerRef, linkSelector, revealed]);

  return [revealed, setRevealed];
}
