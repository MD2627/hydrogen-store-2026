import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Hook to enable mouse-drag scrolling on an element
 * @param {import('react').RefObject<HTMLElement>} ref - Ref of the scrollable element
 * @returns {Object} { isDragging }
 */
export function useDraggableScroll(ref) {
    const [isDragging, setIsDragging] = useState(false);
    const pos = useRef({ left: 0, x: 0 });
    const moved = useRef(false);

    const onMouseDown = useCallback((e) => {
        if (!ref.current) return;
        
        setIsDragging(true);
        moved.current = false;
        pos.current = {
            left: ref.current.scrollLeft,
            x: e.clientX,
        };

        ref.current.style.cursor = 'grabbing';
        ref.current.style.userSelect = 'none';
        ref.current.style.scrollBehavior = 'auto';
    }, [ref]);

    const onMouseMove = useCallback((e) => {
        if (!isDragging || !ref.current) return;

        const dx = e.clientX - pos.current.x;
        if (Math.abs(dx) > 5) {
            moved.current = true;
        }
        ref.current.scrollLeft = pos.current.left - dx;
    }, [isDragging, ref]);

    const onMouseUp = useCallback((e) => {
        if (!ref.current) return;
        
        setIsDragging(false);
        ref.current.style.cursor = 'grab';
        ref.current.style.removeProperty('user-select');
        ref.current.style.removeProperty('scroll-behavior');

        if (moved.current) {
            // Prevent click event if we moved more than 5px
            const preventClick = (e) => {
                e.stopImmediatePropagation();
                e.preventDefault();
                window.removeEventListener('click', preventClick, true);
            };
            window.addEventListener('click', preventClick, true);
        }
    }, [ref]);


    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        el.style.cursor = 'grab';

        el.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            el.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [ref, onMouseDown, onMouseMove, onMouseUp]);

    return { isDragging };
}

