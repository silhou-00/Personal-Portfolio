import site from '../data/site.json';
import Marks from './Marks';
import Portrait from './Portrait';

export default function Masthead() {
  return (
    <header className="shell masthead" id="top">
      <div className="well mh-main">
        <div className="g12">
          <Portrait alt={site.name} />
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
