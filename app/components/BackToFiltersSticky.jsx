import { useEffect, useState } from 'react';

/**
 * Shows a floating "Back to Filters" button when the filters element is scrolled out of view.
 * @param {{ targetRef: import('react').RefObject<HTMLElement>, label?: string, yOffset?: number, enabled?: boolean }} props
 */
export function BackToFiltersSticky({ targetRef, label = 'Back to Filters', yOffset = -100, enabled = true }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setShow(false);
      return;
    }

    const el = targetRef?.current;
    if (!el) return;

    // Prefer IntersectionObserver (more accurate + cheaper than scroll listeners).
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show when filters are not visible and user has scrolled a bit.
        setShow(!entry.isIntersecting && window.scrollY > 250);
      },
      {
        root: null,
        threshold: 0,
        // Treat the filters as "visible" until they're a little above the viewport.
        rootMargin: '60px 0px 0px 0px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, targetRef]);

  const scrollToFilters = () => {
    const el = targetRef?.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  if (!enabled || !show) return null;

  return (
    <button
      type="button"
      onClick={scrollToFilters}
      aria-label={label}
      className="back-to-filters-sticky f-12 f-m-12 w-300 ff-n l-h-1-2 white-color text-uppercase"
    >
      {label}
    </button>
  );
}

