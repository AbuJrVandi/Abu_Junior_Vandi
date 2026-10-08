import { portfolio } from "../portfolio";
import { useState } from 'react';
const projects = portfolio.projects;
const siteShot = (url) => `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280`;
const siteHost = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};
export const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  return (
    <section className="projects dark-section" id="projects">
      <div className="content">
        <div className="section-heading">
          <div>
            <p className="section-label"><span />{portfolio.copy.myPortfolio}</p>
            <h2>{portfolio.copy.letSHaveALook}<br /><em>{portfolio.copy.atMyPortfolio}</em><sup aria-hidden="true">✣</sup></h2>
          </div>
          <button className="pill-button" aria-expanded={showAll} aria-controls="project-list" onClick={() => setShowAll(!showAll)}>
            {showAll ? portfolio.copy.showSelectedWork : portfolio.copy.viewAllProjects} <span aria-hidden="true">➜</span>
          </button>
        </div>
        <div className="project-list" id="project-list">
          {(showAll ? projects : projects.slice(0, 3)).map(([title, description, img, tag, liveUrl], index) => (
            <article className="project-card" key={title}>
              {liveUrl ? (
                <a
                  className="project-image is-site"
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${portfolio.copy.openLiveSite}: ${title}`}
                >
                  <span className="project-chrome" aria-hidden="true">
                    <span className="project-chrome-dots"><i /><i /><i /></span>
                    <span className="project-chrome-url">{siteHost(liveUrl)}</span>
                  </span>
                  <img
                    className="project-shot"
                    src={siteShot(liveUrl)}
                    alt={`${title} website preview`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = img;
                    }}
                  />
                  <span className="project-live-badge" aria-hidden="true">
                    <span className="project-live-dot" />Live
                  </span>
                </a>
              ) : (
                <a className="project-image" href={img} target="_blank" rel="noreferrer" aria-label={`Open ${title} project image`}>
                  <img src={img} alt={`${title} project preview`} loading="lazy" />
                </a>
              )}
              <div className="project-copy">
                <div className="project-tags">
                  <span>{tag}</span>
                  <span>{portfolio.copy.designDevelopment}</span>
                </div>
                <span className="project-index">{String(index + 1).padStart(2, '0')} {portfolio.copy.projectEyebrow}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                {liveUrl ? (
                  <a className="project-preview is-live" href={liveUrl} target="_blank" rel="noreferrer" aria-label={`${portfolio.copy.openLiveSite}: ${title}`}>
                    {portfolio.copy.livePreview} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <a className="project-preview" href={img} target="_blank" rel="noreferrer">
                    {portfolio.copy.viewProjectPreview} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
