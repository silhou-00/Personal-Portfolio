import Rail from './components/Rail';
import Masthead from './components/Masthead';
import Experience from './components/Experience';
import BuildWall from './components/BuildWall';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import GridInspector from './components/GridInspector';

export default function Home() {
  return (
    <>
      <Rail />
      <Masthead />
      <Experience />
      <BuildWall />
      <Certifications />
      <Contact />
      {/* Sentinel marking the end of the document, so the rail gets a
          callback down here - see Rail.tsx. It needs a real height: an
          IntersectionObserver does not report a zero-area element as
          intersecting, so a 0px sentinel never fired at all. */}
      <div id="page-end" aria-hidden="true" style={{ height: 1 }} />
      <GridInspector />
    </>
  );
}
