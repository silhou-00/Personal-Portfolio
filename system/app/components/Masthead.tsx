import Image from 'next/image';
import site from '../data/site.json';
import Marks from './Marks';

export default function Masthead() {
  return (
    <header className="shell masthead" id="top">
      <div className="well mh-main">
        <div className="g12">
          <figure className="mh-portrait">
            {/* span 3 of the capped well = 301px max, so 602px at DPR2.
                Profile.jpg is 600x600 square into a square box: cover crops
                nothing. Do not widen past span 3 without a larger source. */}
            <Image
              src="/Profile.jpg"
              alt={site.name}
              width={600}
              height={600}
              priority
              sizes="(max-width: 767px) 40vw, 301px"
            />
          </figure>
          <div className="mh-text">
            <p className="mh-status">[ {site.status} ]</p>
            <h1 className="mh-name">{site.name}</h1>
            <p className="mh-role">
              {site.role}
              <span className="caret" aria-hidden="true" />
            </p>
            <p className="mh-sum prose">{site.summary}</p>
          </div>
        </div>
      </div>

      <div className="well mh-foot">
        <div className="mh-rule" />
        <div className="mh-meta">
          <div className="mh-metacol">
            <Marks />
            <p className="micro">{site.location}</p>
            <p className="micro">{site.study}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
