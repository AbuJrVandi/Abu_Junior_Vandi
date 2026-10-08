import { portfolio } from "../portfolio";
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { SECTIONS, goToSection } from '../RouteSync';
const links = portfolio.links;
export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  useEffect(() => {
    let frame;
    let pathTimer;

    const update = () => {
      setScrolled(window.scrollY > 24);
      const sections = [...document.querySelectorAll('main > section[id]')];
      const current = sections.filter(section => section.getBoundingClientRect().top <= 160).pop();
      const next = current?.id || 'home';
      setActive(next);
      clearTimeout(pathTimer);
      if (SECTIONS.includes(next)) {
        pathTimer = setTimeout(() => {
          if (window.location.pathname !== `/${next}`) {
            window.history.replaceState(window.history.state, '', `/${next}`);
          }
        }, 150);
      }
      frame = null;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(pathTimer);
    };
  }, []);

  const handleSection = id => event => {
    setOpen(false);
    goToSection(id)(event);
  };

  const onKeyDown = event => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      toggleRef.current?.focus();
    }
  };

  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} onKeyDown={onKeyDown}>
      <nav className="navigation" aria-label="Main navigation">
        <Link className="brand" to="/home" aria-label={`${portfolio.copy.abuJuniorVandi} home`} onClick={handleSection('home')}>
          <span className="brand-logo" aria-hidden="true"><img src={portfolio.images.logo} alt="" /></span>{portfolio.copy.abuJr}</Link>
        <button ref={toggleRef} className="menu-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>
          {open ? 'Close ✕' : 'Menu ☰'}
        </button>
        <div className={`nav-links ${open ? 'is-open' : ''}`} id="nav-links">
          {links.map(([label, id]) => <Link key={id} to={`/${id}`} aria-current={active === id ? 'location' : undefined} onClick={handleSection(id)}>{label}</Link>)}
        </div>
        <Link className="nav-contact" to="/connect" aria-current={active === 'connect' ? 'location' : undefined} onClick={handleSection('connect')}>{portfolio.copy.letSTalk}<span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>;
};
