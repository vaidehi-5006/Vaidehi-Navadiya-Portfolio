import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';

export default function ProjectsCarousel({ handleMouseEnter, handleMouseLeave }) {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const lastActiveRef = useRef(0);

  useEffect(() => {
    let animId;

    const isVisible = (el) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.bottom >= 0 && rect.top <= window.innerHeight;
    };

    const updateCards = () => {
      if (!sectionRef.current || !isVisible(sectionRef.current)) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = Math.max(1, rect.height - window.innerHeight);
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      const currentFloatIndex = progress * (projects.length - 1);

      const roundedIdx = Math.max(0, Math.min(projects.length - 1, Math.round(currentFloatIndex)));
      if (lastActiveRef.current !== roundedIdx) {
        lastActiveRef.current = roundedIdx;
        setActiveIdx(roundedIdx);
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const diff = i - currentFloatIndex;
        let scale = 1;
        let translateY = 0;
        let opacity = 1;

        if (diff > 0) {
          scale = Math.max(0, 1 - diff * 0.15);
          translateY = diff * 120;
          opacity = Math.max(0, 1 - diff * 0.4);
        } else {
          scale = 1 + Math.abs(diff) * 0.3;
          translateY = diff * 200;
          opacity = Math.max(0, 1 - Math.abs(diff) * 3);
        }

        card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        card.style.opacity = opacity.toString();
        card.style.zIndex = Math.round(100 - Math.abs(diff) * 10).toString();
        card.style.pointerEvents = Math.abs(diff) > 0.5 ? 'none' : 'auto';
      });
    };

    const loop = () => {
      if (!document.hidden) {
        updateCards();
      }
      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      className="projects-carousel-section"
      id="projects"
      ref={sectionRef}
      style={{ height: `${100 + (projects.length - 1) * 70}vh` }}
    >
      <div className="carousel-sticky-container">
        <div className="container carousel-layout">
          <div className="carousel-sidebar">
            <span className="section-subtitle">
              0{activeIdx + 1} / 0{projects.length} • {projects[activeIdx]?.category}
            </span>
            <h2 className="section-title">{projects[activeIdx]?.title}</h2>
            <p
              className="carousel-project-desc"
              style={{
                color: 'var(--text-secondary)',
                marginTop: '1rem',
                fontSize: '1.05rem',
                maxWidth: '420px',
                lineHeight: 1.5,
              }}
            >
              {projects[activeIdx]?.subtitle}
            </p>

            {projects[activeIdx]?.tech && (
              <div style={{ marginTop: '1.2rem', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {projects[activeIdx].tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--border-color)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {projects[activeIdx]?.link && (
              <div style={{ marginTop: '1.6rem' }}>
                <a
                  href={projects[activeIdx].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="carousel-link-btn"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 24px',
                    borderRadius: '50px',
                    background: 'var(--accent)',
                    color: 'var(--on-accent)',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.35)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span>{projects[activeIdx]?.linkLabel || 'View Project'}</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', gap: '8px' }}>
              {projects.map((p, idx) => (
                <span
                  key={p.id}
                  style={{
                    width: idx === activeIdx ? '28px' : '8px',
                    height: '6px',
                    borderRadius: '3px',
                    background: idx === activeIdx ? 'var(--accent)' : 'var(--border-color)',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="carousel-cards-container">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="carousel-card"
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="project-image-wrap"
                  style={{ cursor: project.link ? 'pointer' : 'default' }}
                  onClick={() => {
                    if (project.link) {
                      window.open(project.link, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <img
                    className="project-image"
                    src={project.image}
                    alt={`${project.title}, ${project.subtitle}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
