import SectionHead from './SectionHead';

export default function Summary() {
  return (
    <section id="summary" data-sec>
      <SectionHead
        num="01"
        label="Summary"
        meta="assembling DevSecOps engineer"
        verb="I am"
      />
      <p className="summary-body" data-reveal>
        Student at the University of Makati assembling a{' '}
        <strong>DevSecOps career</strong>, passionate about{' '}
        <strong>automating workflows and pipelines</strong> to cut out
        repetitive manual work and let teams ship faster{' '}
        <strong>without sacrificing security</strong>.
      </p>
    </section>
  );
}
