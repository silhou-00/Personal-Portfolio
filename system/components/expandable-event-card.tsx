'use client';

/* Adapted from watermelon's expandable-event-card: a shared-layout morph
   (matching `layoutId`s on the trigger and the surface) grows the clicked
   card, row or button into the centred panel and back.

   Swiss pack: radius 0, no shadow, no blur. The spring keeps the original's
   bounce: 0, so it settles without overshoot. */

import type { ComponentProps, ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from 'motion/react';
import { cn } from '@/lib/utils';

export const EXPAND_SPRING: Transition = {
  type: 'spring',
  duration: 0.38,
  bounce: 0,
};

const CONTENT_FADE: Transition = { duration: 0.16, ease: 'linear' };

type TriggerProps = ComponentProps<typeof motion.button> & {
  layoutId: string;
  /* True while this trigger's surface is open. The trigger stays mounted so
     the surface can shrink back into it, but is hidden - otherwise it rides
     along stretched behind the surface and peeks out past its edges. */
  expanded?: boolean;
};

/* The thing that is clicked. It shares its layoutId with the panel, so
   motion animates between the two boxes when the panel mounts or unmounts. */
export function ExpandableTrigger({
  layoutId,
  transition,
  expanded = false,
  style,
  ...props
}: TriggerProps) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      layoutId={reduce ? undefined : layoutId}
      transition={transition ?? EXPAND_SPRING}
      aria-expanded={expanded}
      style={{ ...style, visibility: expanded ? 'hidden' : undefined }}
      {...props}
    />
  );
}

type SurfaceProps = Omit<ComponentProps<typeof motion.aside>, 'children'> & {
  layoutId?: string;
  onDismiss: () => void;
  children: ReactNode;
};

/* The expanded surface plus its scrim. Content fades in after the box has
   started moving, so text is never seen mid-stretch. */
export function ExpandableSurface({
  layoutId,
  onDismiss,
  className,
  children,
  ...props
}: SurfaceProps) {
  const reduce = useReducedMotion();
  const morph = Boolean(layoutId) && !reduce;

  return (
    <>
      <motion.div
        className="pscrim"
        onClick={onDismiss}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={CONTENT_FADE}
      />
      <motion.aside
        layoutId={morph ? layoutId : undefined}
        transition={EXPAND_SPRING}
        /* With no trigger to grow from, fade in place instead. */
        initial={morph || reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={morph || reduce ? undefined : { opacity: 0 }}
        className={cn(className)}
        {...props}
      >
        <motion.div
          className="pp-inner"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1, transition: { ...CONTENT_FADE, delay: 0.14 } }}
          exit={{ opacity: 0, transition: { duration: 0.08, ease: 'linear' } }}
        >
          {children}
        </motion.div>
      </motion.aside>
    </>
  );
}

export { AnimatePresence as ExpandablePresence };
