import { portfolio } from "./portfolio";
import './App.css';
import { useScrollReveal } from './useScrollReveal';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  useScrollReveal();
  return <div className="site-shell"><a className="skip-link" href="#main">{portfolio.copy.skipToContent}</a><NavBar /><main id="main"><Banner /><Skills />
    <section className="about dark-section" id="about"><div className="content about-grid"><div className="about-photo"><img src={portfolio.images.portrait} alt={portfolio.copy.abuJuniorVandi} loading="lazy" /><span className="photo-note">{portfolio.copy.ideasIntoExperiences}</span></div><div><p className="section-label"><span />{portfolio.copy.aboutMe}</p><h2>{portfolio.copy.aLittleAbout} <em>{portfolio.copy.me}</em><br />{portfolio.copy.aLotAbout} <em>{portfolio.copy.possibility}</em></h2><p className="body-copy">{portfolio.copy.aboutIntroduction}</p><p className="body-copy">{portfolio.copy.aboutDescription}</p><a className="pill-button" href="#connect">{portfolio.copy.letSWorkTogether} <span aria-hidden="true">↗</span></a><span className="signature">{portfolio.copy.abuJr}</span></div></div><div className="content expertise-strip"><div><strong>{portfolio.copy.design}</strong><span>{portfolio.copy.thoughtfulUserExperiences}</span></div><i>✣</i><div><strong>{portfolio.copy.develop}</strong><span>{portfolio.copy.fromInterfaceToInfrastructure}</span></div><i>✣</i><div><strong>{portfolio.copy.discover}</strong><span>{portfolio.copy.insightsThroughData}</span></div></div></section>
    <section className="tools-section content" id="skills"><p className="section-label"><span />{portfolio.copy.myExpertise}</p><h2>{portfolio.copy.theSkills} <em>{portfolio.copy.behind}</em><br />{portfolio.copy.theExperiences}</h2><div className="tool-grid">{portfolio.expertise.map(([icon, title, detail]) => <div className="tool-card" key={title}><span className="tool-icon" aria-hidden="true">{icon}</span><div><h3>{title}</h3><p>{detail}</p></div></div>)}</div></section>
    <Projects /><Contact /></main><Footer /></div>;
}

export default App;
