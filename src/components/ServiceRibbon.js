import { useState } from 'react';
import { portfolio } from '../portfolio';

export const ServiceRibbon = () => {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`service-ribbon${paused ? ' is-paused' : ''}`}>
      <div className="ribbon-track" style={{ '--ribbon-duration': `${portfolio.ribbonDuration}s` }}>
        {[0, 1].map(copy => (
          <div className="ribbon-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {portfolio.ribbon.map((label, index) => (
              <span className="ribbon-item" key={`${label}-${index}`}>
                <span>{label}</span><i aria-hidden="true">✣</i>
              </span>
            ))}
          </div>
        ))}
      </div>
      <button className="ribbon-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? portfolio.copy.resumeRibbon : portfolio.copy.pauseRibbon}>
        <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
      </button>
    </div>
  );
};
