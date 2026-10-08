import { portfolio } from "../portfolio";
import { useEffect, useRef, useState } from 'react';
const links = portfolio.links;
export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  useEffect(() => {
    let frame;

    const update = () => {
      setScrolled(window.scrollY > 24);
      const sections = [...document.querySelectorAll('main > section[id]')];
      const current = sections.filter(section => section.getBoundingClientRect().top <= 160).pop();
      setActive(current?.id || 'home');
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
    };
  }, []);

  const onKeyDown = event => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      toggleRef.current?.focus();
    }
  };

  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} onKeyDown={onKeyDown}>
      <nav className="navigation" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label={`${portfolio.copy.abuJuniorVandi} home`} onClick={() => setOpen(false)}>
          <span className="brand-logo" aria-hidden="true"><img src={portfolio.images.logo} alt="" /></span>{portfolio.copy.abuJr}</a>
        <button ref={toggleRef} className="menu-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>
          {open ? 'Close ✕' : 'Menu ☰'}
        </button>
        <div className={`nav-links ${open ? 'is-open' : ''}`} id="nav-links">
          {links.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
        </div>
        <a className="nav-contact" href="#connect" aria-current={active === 'connect' ? 'location' : undefined} onClick={() => setOpen(false)}>{portfolio.copy.letSTalk}<span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>;
};
