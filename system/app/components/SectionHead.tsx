interface SectionHeadProps {
  num: string;
  label: string;
  verb: string;
  meta?: string;
}

/** Sticky mono rail + scroll-scrubbed verb — the header of every section. */
export default function SectionHead({ num, label, verb, meta }: SectionHeadProps) {
  return (
    <>
      <div className="sec-rail">
        <span className="sec-rail-num">{num}</span>
        <span className="sec-rail-label">{label}</span>
        {meta && <span className="sec-rail-meta">{meta}</span>}
      </div>
      <h2 className="sec-verb" data-scrub>
        {verb}
        <span className="verb-fill" aria-hidden="true">
          {verb}
        </span>
      </h2>
    </>
  );
}
