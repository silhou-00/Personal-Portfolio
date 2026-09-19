import { GitHubActivity } from '@/components/ui/github-activity';
import site from '../data/site.json';

const USER = site.links.github.split('/').filter(Boolean).pop() ?? '';

export default function Activity() {
  return (
    <section className="shell band" id="activity">
      <div className="well g12">
        {/* Reads the public contribution calendar, which counts private work
            since "Include private contributions" is on for the profile. */}
        {/* Placed inline rather than through globals.css so the span cannot
            go missing with a stale stylesheet - that is what shrank it to a
            few weeks. 1 / -1 spans every column at every breakpoint. */}
        <div style={{ gridColumn: '1 / -1' }}>
          <GitHubActivity
            username={USER}
            showMonths
            cellSize={10}
            accent="var(--red)"
          />
        </div>
      </div>
    </section>
  );
}
