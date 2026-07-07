import Nav from './components/Nav';
import Hero from './components/Hero';
import Summary from './components/Summary';
import ExperienceList from './components/ExperienceList';
import ProjectsGrid from './components/ProjectsGrid';
import Wins from './components/Wins';
import Proof from './components/Proof';
import PingMe from './components/PingMe';
import ScrollFx from './components/ScrollFx';

export default function Home() {
  return (
    <>
      <Nav />
      <div className="page-col">
        <Hero />
        <Summary />
        <ExperienceList />
        <ProjectsGrid />
        <Wins />
        <Proof />
        <PingMe />
      </div>
      <ScrollFx />
    </>
  );
}
