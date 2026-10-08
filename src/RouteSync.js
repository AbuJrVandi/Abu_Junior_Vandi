import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SECTIONS = ['home', 'services', 'projects', 'about', 'skills', 'connect'];

const slugFrom = value => (value || '').replace(/^[#/]+|\/+$/g, '').toLowerCase();

const findSection = value => {
  const slug = slugFrom(value);
  return SECTIONS.includes(slug) ? slug : null;
};

export const goToSection = id => event => {
  const section = document.getElementById(id);
  if (!section) return;
  if (window.location.pathname === `/${id}`) {
    event.preventDefault();
    section.scrollIntoView({ block: 'start' });
  }
};

export const RouteSync = () => {
  const { pathname, key } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const slug = findSection(pathname) || findSection(window.location.hash) || SECTIONS[0];
    const needsCleanup = pathname !== `/${slug}` || window.location.hash !== '';
    const section = document.getElementById(slug);

    if (needsCleanup) navigate(`/${slug}`, { replace: true });

    const jump = behavior => section?.scrollIntoView?.({ ...(behavior && { behavior }), block: 'start' });
    jump(needsCleanup || key === 'default' ? 'instant' : null);

    if (key !== 'default') return;
    const resync = () => jump('instant');
    window.addEventListener('load', resync);
    return () => window.removeEventListener('load', resync);
  }, [key, navigate, pathname]);

  return null;
};
