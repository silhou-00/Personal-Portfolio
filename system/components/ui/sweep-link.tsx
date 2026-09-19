import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* Hover links drawn with background-size on a solid-colour gradient, so the
   effect is one painted background rather than a pseudo-element.

   underline - a 1px rule grows from the left edge under the text
   fill      - an ink block grows from the left and the text turns paper

   Swiss pack: square, token colours only. Honours reduced motion. */

type Variant = 'underline' | 'fill';

type SweepLinkProps = Omit<ComponentProps<'a'>, 'children'> & {
  variant?: Variant;
  /* Show the diagonal arrow that rises in on hover. */
  arrow?: boolean;
  children: ReactNode;
};

const BASE =
  'group inline-flex w-fit items-center bg-no-repeat bg-left-bottom ' +
  'transition-[background-size,color] duration-300 ease-out ' +
  'motion-reduce:transition-none';

const VARIANTS: Record<Variant, string> = {
  underline:
    'bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] ' +
    'hover:bg-[length:100%_1px] focus-visible:bg-[length:100%_1px]',
  fill:
    'bg-[linear-gradient(var(--ink),var(--ink))] bg-[length:0%_100%] ' +
    'hover:bg-[length:100%_100%] hover:text-[var(--paper)] ' +
    'focus-visible:bg-[length:100%_100%] focus-visible:text-[var(--paper)]',
};

export function SweepLink({
  variant = 'underline',
  arrow = false,
  className,
  children,
  target,
  rel,
  ...props
}: SweepLinkProps) {
  return (
    <a
      className={cn(BASE, VARIANTS[variant], className)}
      target={target}
      // a new tab never gets a handle back to this page
      rel={target === '_blank' ? (rel ?? 'noreferrer noopener') : rel}
      {...props}
    >
      {children}
      {arrow && (
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={cn(
            'ml-[0.35em] size-[0.6em] shrink-0 translate-y-[0.2em] opacity-0',
            'transition-[transform,opacity] duration-300 ease-out',
            'group-hover:translate-y-0 group-hover:opacity-100',
            'group-focus-visible:translate-y-0 group-focus-visible:opacity-100',
            'motion-reduce:transition-none',
          )}
        >
          <path
            d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="square"
          />
        </svg>
      )}
    </a>
  );
}
