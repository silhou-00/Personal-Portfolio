import { SweepLink } from '@/components/ui/sweep-link';
import site from '../data/site.json';

export default function Contact() {
  const [user, domain] = site.email.split('@');

  return (
    <section className="shell band" id="contact">
      <div className="well g12">
        <h2 className="band-title">
          <span className="bn">04</span>Contact
        </h2>

        {/* An ink block sweeps across and the address turns paper on hover.
            flex-wrap stands in for the <wbr>, which a flex row would ignore,
            so the address still breaks at the @ on narrow screens. */}
        <SweepLink
          variant="fill"
          href={`mailto:${site.email}`}
          className="addr flex-wrap"
        >
          {user}
          <span>@{domain}</span>
          <span className="caret" aria-hidden="true" />
        </SweepLink>

        {/* Underline draws left to right, arrow rises in. */}
        <div className="c-links" data-reveal>
          <SweepLink href={site.links.github} target="_blank" arrow>
            github
          </SweepLink>
          <SweepLink href={site.links.linkedin} target="_blank" arrow>
            linkedin
          </SweepLink>
          <SweepLink href={site.resume} target="_blank" arrow>
            resume
          </SweepLink>
        </div>
      </div>
    </section>
  );
}
