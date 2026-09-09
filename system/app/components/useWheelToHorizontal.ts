'use client';

import { useEffect, type RefObject } from 'react';

/* Vertical wheel drives an image strip sideways, with smooth travel.
 *
 * The strip keeps its own target position and eases toward it on every frame,
 * so a wheel notch glides instead of jumping. Setting `scrollLeft` straight
 * from the wheel delta is instant and reads as a teleport; `scroll-behavior:
 * smooth` cannot be used either, because a second notch mid-animation
 * restarts the browser's own tween and the strip stutters. Holding the target
 * ourselves means repeated notches simply push it further and the same
 * animation keeps running.
 *
 * The strips deliberately carry no scroll snapping. Snap - mandatory or
 * proximity - keeps dragging a partial scroll back to a figure edge, which is
 * what made small wheel movements do nothing at all.
 */

/* Fraction of the remaining distance covered per frame. Higher is snappier;
   0.16 lands in about a fifth of a second without feeling loose. */
const EASE = 0.16;

/* Below this the animation is over - anything less is invisible. */
const EPSILON = 0.5;

export function useWheelToHorizontal(
  ref: RefObject<HTMLElement | null>,
  /* Pass a value that changes when the underlying element is swapped, so the
     listener is rebound to the new node. */
  rebindKey?: unknown
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let target = el.scrollLeft;
    let frame = 0;

    const maxScroll = () => el.scrollWidth - el.clientWidth;

    const step = () => {
      const distance = target - el.scrollLeft;
      if (Math.abs(distance) < EPSILON) {
        el.scrollLeft = target;
        frame = 0;
        return;
      }
      el.scrollLeft += distance * EASE;
      frame = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      /* Leave genuinely horizontal gestures alone - a trackpad two-finger
         swipe sideways already scrolls this correctly on its own. */
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const max = maxScroll();
      if (max <= 1) return;

      const forward = e.deltaY > 0;
      /* At either end the gesture belongs to the page again, so the wheel is
         not swallowed and the reader can carry on past the strip. */
      if (forward && el.scrollLeft >= max - 1) return;
      if (!forward && el.scrollLeft <= 1) return;

      e.preventDefault();

      /* Wheel deltas are not always pixels: Firefox often reports lines, and
         a page-scroll device reports pages. */
      const unit =
        e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientWidth : 1;

      /* Resync when idle, so a scrollbar drag or a keyboard scroll since the
         last gesture is not undone by a stale target. */
      if (!frame) target = el.scrollLeft;

      target = Math.max(0, Math.min(max, target + e.deltaY * unit));

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.scrollLeft = target;
        return;
      }
      if (!frame) frame = requestAnimationFrame(step);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, rebindKey]);
}
