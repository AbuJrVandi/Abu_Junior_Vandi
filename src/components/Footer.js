import { Link } from 'react-router-dom';
import { portfolio } from "../portfolio";
import { SocialLinks } from './Banner';
import { goToSection } from '../RouteSync';
export const Footer = () => <footer className="footer dark-section"><div className="content footer-top"><Link className="brand" to="/home" onClick={goToSection('home')}><span className="brand-logo" aria-hidden="true"><img src={portfolio.images.logo} alt="" /></span>{portfolio.copy.abuJr}</Link><p>{portfolio.copy.thoughtfulDesignMeaningfulExperiences}</p><SocialLinks /></div><div className="content footer-bottom"><p>© {new Date().getFullYear()} {portfolio.copy.abuJuniorVandiAllRightsReserved}</p><Link to="/home" onClick={goToSection('home')}>{portfolio.copy.backToTop}</Link></div></footer>;
