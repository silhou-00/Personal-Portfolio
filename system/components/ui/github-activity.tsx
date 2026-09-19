"use client";

/* Adapted from rare-ui's github-activity. Removed: the "top contributions"
   footer panel and the public-events lookup that fed it (one fewer GitHub
   API call per visitor, and that API allows 60 an hour per IP). Swiss pack:
   square cells, no card chrome, no blur, no shadow, palette from tokens. */

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type Contribution = {
  date: string;
  count: number;
  level: ContributionLevel;
};

const DEFAULT_ACCENT = "var(--ink)";
const DEFAULT_CELL_SIZE = 11;
const DEFAULT_MONTHS = 12;
const WEEKS_PER_MONTH = 365.25 / 12 / 7;
const MIN_LABEL_WEEKS = 3;

const gapFor = (cellSize: number) => Math.max(2, Math.round(cellSize / 4));
// never zero: weeks.slice(-0) would hand back the whole history instead of nothing
const weeksFor = (months: number) =>
  Math.max(1, Math.ceil(months * WEEKS_PER_MONTH));

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const CELL_FADE = { duration: 0.2, ease: EASE_OUT } as const;
const TOOLTIP_FADE = { duration: 0.14, ease: EASE_OUT } as const;
const TOOLTIP_EDGE = 8;
const COLUMN_STAGGER = 0.012;
const LABEL_REVEAL = { duration: 0.45, ease: EASE_OUT } as const;

const LEVELS = [0, 1, 2, 3, 4] as const;

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function toMonthLabels(weeks: Contribution[][]) {
  const labels: (string | null)[] = weeks.map(() => null);
  const monthAt = (index: number) => weeks[index]?.[0]?.date.slice(5, 7);

  let start = 0;
  for (let i = 1; i <= weeks.length; i++) {
    if (i < weeks.length && monthAt(i) === monthAt(start)) continue;
    // a shorter run is narrower than the label itself, so it would sit under the next month
    if (i - start >= MIN_LABEL_WEEKS) {
      labels[start] = MONTH_NAMES[Number(monthAt(start)) - 1] ?? null;
    }
    start = i;
  }

  return labels;
}

const LEVEL_OPACITY: Record<ContributionLevel, number> = {
  0: 0,
  1: 0.3,
  2: 0.52,
  3: 0.76,
  4: 1,
};

type LevelStyle = { backgroundColor: string; opacity: number };

type HoveredDay = { day: Contribution; x: number; y: number };

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function describeDay({ count, date }: Contribution) {
  const noun = count === 1 ? "contribution" : "contributions";
  return `${count} ${noun} on ${DATE_FORMAT.format(new Date(`${date}T00:00:00`))}`;
}

const CALENDAR_API = "https://github-contributions-api.jogruber.de/v4";

type ApiDay = { date: string; count: number; level: number };
async function fetchCalendar(login: string) {
  const res = await fetch(`${CALENDAR_API}/${login}?y=last`);
  if (!res.ok) return null;

  const days: ApiDay[] = (await res.json())?.contributions ?? [];
  if (!days.length) return null;

  // columns are weeks, so the first day has to be a sunday or every column shears
  const start = days.findIndex(
    (day) => new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0,
  );

  return days.slice(start < 0 ? 0 : start).map<Contribution>((day) => ({
    date: day.date,
    count: day.count,
    level: Math.min(4, Math.max(0, day.level)) as ContributionLevel,
  }));
}

function useGitHubUser(login?: string) {
  const [data, setData] = React.useState<Contribution[]>();

  React.useEffect(() => {
    if (!login) return;
    let active = true;

    fetchCalendar(login)
      .then((contributions) => {
        if (active && contributions) setData(contributions);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [login]);

  return data;
}

function emptyDays(weeks: number): Contribution[] {
  const today = new Date();
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (weeks * 7 - 1 - i));
    return {
      date: date.toISOString().slice(0, 10),
      count: 0,
      level: 0 as ContributionLevel,
    };
  });
}

function toScale(accent: string | string[]): LevelStyle[] {
  if (typeof accent === "string") {
    return LEVELS.map((level) => ({
      backgroundColor: accent,
      opacity: LEVEL_OPACITY[level],
    }));
  }

  const colors = accent.length > 4 ? accent : ["transparent", ...accent];
  return LEVELS.map((level) => {
    const color = colors[level] ?? colors.at(-1) ?? "transparent";
    return { backgroundColor: color, opacity: color === "transparent" ? 0 : 1 };
  });
}

function toWeeks(contributions: Contribution[]) {
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }
  return weeks;
}

/* Grows the cells to fill the available width across the wanted number of
   weeks, never below minCell. When even minCell cannot fit them all (a
   phone), it falls back to showing as many recent weeks as fit. */
function useFittedGrid(minCell: number, weeksWanted: number, maxCell = 28) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState<number>();

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!width) {
    return { ref, cellSize: minCell, gap: gapFor(minCell), columns: undefined };
  }

  const estimate = Math.floor(width / weeksWanted);
  const gap = gapFor(estimate);
  const fitted = Math.floor((width + gap) / weeksWanted) - gap;
  const cellSize = Math.min(maxCell, Math.max(minCell, fitted));
  const finalGap = gapFor(cellSize);
  const columns = Math.max(
    1,
    Math.floor((width + finalGap) / (cellSize + finalGap)),
  );
  return { ref, cellSize, gap: finalGap, columns };
}

const Tooltip = ({
  hovered,
  reduceMotion,
}: {
  hovered: HoveredDay;
  reduceMotion: boolean | null;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [left, setLeft] = React.useState(hovered.x);

  useIsoLayoutEffect(() => {
    const half = (ref.current?.offsetWidth ?? 0) / 2;
    const edge = TOOLTIP_EDGE + half;
    setLeft(Math.min(Math.max(hovered.x, edge), window.innerWidth - edge));
  }, [hovered]);

  return createPortal(
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left,
        top: hovered.y,
        transform: "translate(-50%, calc(-100% - 8px))",
      }}
    >
      <motion.div
        ref={ref}
        className="whitespace-nowrap bg-foreground px-2 py-1 font-mono text-[11px] tracking-[.04em] text-background"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
        transition={reduceMotion ? { duration: 0 } : TOOLTIP_FADE}
      >
        {describeDay(hovered.day)}
      </motion.div>
    </div>,
    document.body,
  );
};

const ContributionGrid = ({
  contributions,
  scale,
  cellSize: minCell,
  months,
  showMonths,
  label,
  reduceMotion,
}: {
  contributions: Contribution[];
  scale: LevelStyle[];
  cellSize: number;
  months: number;
  showMonths: boolean;
  label: string;
  reduceMotion: boolean | null;
}) => {
  const weeks = React.useMemo(() => toWeeks(contributions), [contributions]);
  const cap = Math.min(weeks.length, weeksFor(months));
  const { ref, cellSize, gap, columns } = useFittedGrid(minCell, cap);
  const [hovered, setHovered] = React.useState<HoveredDay>();

  const visible = weeks.slice(-Math.min(cap, columns ?? cap));
  const sweepEnd = (visible.length - 1) * COLUMN_STAGGER + CELL_FADE.duration;

  const hover = (day: Contribution) => (event: React.PointerEvent) => {
    const cell = event.currentTarget.getBoundingClientRect();
    setHovered({ day, x: cell.left + cell.width / 2, y: cell.top });
  };

  return (
    <div
      ref={ref}
      data-slot="github-activity-grid"
      role="img"
      aria-label={label}
      className="relative"
    >
      {showMonths && (
        <motion.div
          className="flex justify-start"
          style={{ gap, marginBottom: gap }}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ...LABEL_REVEAL,
            delay: reduceMotion ? 0 : sweepEnd,
          }}
        >
          {toMonthLabels(visible).map((month, index) => (
            <div
              key={index}
              className="relative h-3 shrink-0"
              style={{ width: cellSize }}
            >
              {month && (
                <span className="absolute left-0 top-0 font-mono text-[10px] uppercase leading-none tracking-[.06em] text-muted-foreground">
                  {month}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      )}

      <div
        className="flex justify-start overflow-hidden"
        style={{ gap }}
        onPointerLeave={() => setHovered(undefined)}
      >
        {visible.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col" style={{ gap }}>
            {week.map((day) => (
              <motion.div
                key={day.date}
                onPointerEnter={hover(day)}
                className="shrink-0 bg-foreground/[0.08]"
                style={{ width: cellSize, height: cellSize }}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  ...CELL_FADE,
                  delay: reduceMotion ? 0 : weekIndex * COLUMN_STAGGER,
                }}
              >
                <div
                  className="h-full w-full"
                  style={scale[day.level] ?? scale[0]}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {hovered && (
          <Tooltip
            key="tooltip"
            hovered={hovered}
            reduceMotion={reduceMotion}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export type GitHubActivityProps = React.ComponentProps<"div"> & {
  username?: string;
  contributions?: Contribution[];
  year?: number;
  accent?: string | string[];
  cellSize?: number;
  months?: number;
  showMonths?: boolean;
};

const GitHubActivity = ({
  className,
  username,
  contributions: contributionsProp = [],
  year,
  accent = DEFAULT_ACCENT,
  cellSize = DEFAULT_CELL_SIZE,
  months = DEFAULT_MONTHS,
  showMonths = false,
  style,
  ...props
}: GitHubActivityProps) => {
  const reduceMotion = useReducedMotion();
  const needsFetch = !contributionsProp.length;
  const fetched = useGitHubUser(needsFetch ? username : undefined);
  const placeholder = React.useMemo(
    () => (username ? emptyDays(weeksFor(months)) : []),
    [username, months],
  );

  const contributions = contributionsProp.length
    ? contributionsProp
    : (fetched ?? placeholder);

  const scale = React.useMemo(() => toScale(accent), [accent]);
  const total = React.useMemo(
    () => contributions.reduce((sum, day) => sum + day.count, 0),
    [contributions],
  );

  const parsedYear = Number(contributions.at(-1)?.date.slice(0, 4));
  const displayYear = year ?? (Number.isFinite(parsedYear) ? parsedYear : null);
  // the calendar is a rolling window, so name it that way unless a year is given
  const heading = `${total} contributions ${year ? `in ${displayYear}` : "in the last year"}`;

  return (
    <div
      data-slot="github-activity"
      className={cn("relative w-full max-w-full", className)}
      style={style}
      {...props}
    >
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[.06em] text-muted-foreground">
        {heading}
      </p>

      <ContributionGrid
        contributions={contributions}
        scale={scale}
        cellSize={cellSize}
        months={months}
        showMonths={showMonths}
        label={heading}
        reduceMotion={reduceMotion}
      />

    </div>
  );
};

export { GitHubActivity };
export default GitHubActivity;
