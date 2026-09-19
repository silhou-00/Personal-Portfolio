import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

/* Progressive blur for one edge of a container, built from stacked layers.
   Each layer blurs a little more than the one before and is masked to a
   narrower band nearer the edge, so the blur deepens smoothly toward the
   edge instead of being one uniform smear. A last layer fades to the page
   colour so text dissolves into the ground.

   The parent must be positioned; this fills `size` along the chosen edge. */

type EdgeBlurProps = {
  edge: 'top' | 'bottom';
  /* Depth of the blurred band. */
  size?: string;
  /* Strongest blur, reached right at the edge. */
  maxBlur?: number;
  /* Page colour the band fades into. */
  color?: string;
  className?: string;
};

const LAYERS = 4;

export function EdgeBlur({
  edge,
  size = '96px',
  maxBlur = 8,
  color = 'var(--paper)',
  className,
}: EdgeBlurProps) {
  // mask gradients run from the edge inward
  const inward = edge === 'top' ? 'to bottom' : 'to top';

  const layers = Array.from({ length: LAYERS }, (_, i) => {
    // blur doubles per layer: maxBlur/8, /4, /2, /1
    const blur = maxBlur / 2 ** (LAYERS - 1 - i);
    // each layer is fully opaque for less of the band than the last
    const solid = 100 - ((i + 1) * 100) / (LAYERS + 1);
    const mask = `linear-gradient(${inward}, #000 ${solid * 0.5}%, transparent ${solid}%)`;
    return (
      <div
        key={i}
        className="absolute inset-0"
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    );
  });

  const box: CSSProperties = { height: size, [edge]: 0 };

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-x-0 select-none', className)}
      style={box}
    >
      {layers}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(${inward}, ${color}, transparent)` }}
      />
    </div>
  );
}
