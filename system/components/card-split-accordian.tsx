'use client';

/* Adapted from watermelon's card-split-accordian. Kept: the spring, the
   measured height (react-use-measure), and the split - the open item pulls
   away from its neighbours with a gap and closes its own box, and the rows
   either side cap their open edge.
   Swiss pack: the original animates 20px corner radii to make the split;
   here corners stay square and the split reads from the gap and the ink
   border alone. Colours come from tokens, so no zinc or hex values. */

import { useRef, type FC, type KeyboardEvent, type ReactNode } from 'react';
import {
  motion,
  MotionConfig,
  useReducedMotion,
  type Transition,
} from 'motion/react';
import useMeasure from 'react-use-measure';
import { cn } from '@/lib/utils';

export interface AccordionItemData {
  id: string;
  header: ReactNode;
  content: ReactNode;
}

const springTransition: Transition = {
  type: 'spring',
  stiffness: 600,
  damping: 50,
  mass: 1,
};

const SPLIT_GAP = 10;

interface AccordionItemProps {
  item: AccordionItemData;
  index: number;
  total: number;
  openIndex: number;
  onSelect: (index: number) => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>, index: number) => void;
  registerHead: (index: number, el: HTMLButtonElement | null) => void;
}

const AccordionItem: FC<AccordionItemProps> = ({
  item,
  index,
  total,
  openIndex,
  onSelect,
  onKeyDown,
  registerHead,
}) => {
  const [ref, bounds] = useMeasure();
  const isOpen = index === openIndex;

  const isFirst = index === 0;
  const isLast = index === total - 1;
  const isBeforeOpen = index === openIndex - 1;
  const isAfterOpen = index === openIndex + 1;

  // each row draws only the edges nobody else draws, so lines never double
  const edge = (on: boolean) => (on ? '1px' : '0px');
  const hasTop = isFirst || isAfterOpen || isOpen;

  return (
    <motion.li layout className="split-li">
      <motion.div
        className={cn('split-item', isOpen && 'is-open', hasTop && 'has-top')}
        style={{
          borderTopWidth: edge(hasTop),
          borderBottomWidth: edge(isLast || isBeforeOpen || isOpen),
        }}
        animate={{ marginBlock: isOpen ? `${SPLIT_GAP}px` : '0px' }}
      >
        <button
          className="acc-h"
          id={`ah-${item.id}`}
          ref={(el) => registerHead(index, el)}
          aria-expanded={isOpen}
          aria-disabled={isOpen || undefined}
          aria-controls={`ap-${item.id}`}
          onClick={() => onSelect(index)}
          onKeyDown={(e) => onKeyDown(e, index)}
        >
          {item.header}
        </button>

        <motion.div
          id={`ap-${item.id}`}
          role="region"
          aria-labelledby={`ah-${item.id}`}
          aria-hidden={!isOpen}
          inert={!isOpen}
          initial={false}
          animate={{
            height: isOpen ? bounds.height : 0,
            opacity: isOpen ? 1 : 0,
          }}
          className="split-body"
        >
          <div ref={ref}>{item.content}</div>
        </motion.div>
      </motion.div>
    </motion.li>
  );
};

interface AccordionProps {
  items: AccordionItemData[];
  openIndex: number;
  onSelect: (index: number) => void;
  className?: string;
  id?: string;
}

/* Controlled and single-select: one item is always open, as the awards list
   was before. Arrow keys move between headers. */
export const AccordionApp: FC<AccordionProps> = ({
  items,
  openIndex,
  onSelect,
  className,
  id,
}) => {
  const reduce = useReducedMotion();
  const heads = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    heads.current[(i + step + items.length) % items.length]?.focus();
  };

  return (
    <MotionConfig transition={reduce ? { duration: 0 } : springTransition}>
      <ul id={id} className={cn('split-list', className)}>
        {items.map((item, index) => (
          <AccordionItem
            key={item.id}
            item={item}
            index={index}
            total={items.length}
            openIndex={openIndex}
            onSelect={(i) => i !== openIndex && onSelect(i)}
            onKeyDown={onKeyDown}
            registerHead={(i, el) => {
              heads.current[i] = el;
            }}
          />
        ))}
      </ul>
    </MotionConfig>
  );
};
