import Rail from './components/Rail';
import Masthead from './components/Masthead';
import Experience from './components/Experience';
import BuildWall from './components/BuildWall';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Activity from './components/Activity';
import GridInspector from './components/GridInspector';
import PageBlur from './components/PageBlur';

export default function Home() {
  return (
    <>
      {/* Top sentinel for PageBlur, taken out of flow so it moves nothing. */}
      <div
        id="page-start"
        aria-hidden="true"
        style={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1 }}
      />
      <Rail />
      <Masthead />
      <Experience />
      <BuildWall />
      <Certifications />
      <Contact />
      <Activity />
      {/* Sentinel marking the end of the document, so the rail gets a
          callback down here - see Rail.tsx. It needs a real height: an
          IntersectionObserver does not report a zero-area element as
          intersecting, so a 0px sentinel never fired at all. */}
      <div id="page-end" aria-hidden="true" style={{ height: 1 }} />
      <PageBlur />
      <GridInspector />
    </>
  );
}
