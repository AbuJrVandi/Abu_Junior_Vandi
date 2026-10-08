import { portfolio } from "../portfolio";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { goToSection } from '../RouteSync';
const services = portfolio.services;
export const Skills = () => {
  const [active, setActive] = useState(1);
  return <section className="services content" id="services"><div className="section-heading"><div><p className="section-label"><span />{portfolio.copy.myServices}</p><h2>{portfolio.copy.howIBring} <em>{portfolio.copy.ideasToLife}</em><sup aria-hidden="true">✣</sup></h2></div><Link className="pill-button" to="/connect" onClick={goToSection('connect')}>{portfolio.copy.discussAProject} <span aria-hidden="true">➜</span></Link></div><div className="service-list">{services.map(([title, tags, description], index) => <article key={title} className={`service-item ${active === index ? 'expanded' : ''}`}><h3><button aria-expanded={active === index} aria-controls={`service-${index}`} onClick={() => setActive(active === index ? null : index)}><span className="service-number">0{index + 1}.</span><span>{title}</span><span className="round-arrow" aria-hidden="true">↗</span></button></h3><div id={`service-${index}`} className="service-description" hidden={active !== index}><div className="service-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div><p>{description}</p></div></article>)}</div></section>;
};
