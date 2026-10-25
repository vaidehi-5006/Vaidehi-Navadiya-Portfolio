import React, { useEffect, useRef } from 'react';
import { GraduationCap, Briefcase, ExternalLink } from 'lucide-react';
import IdCardBadge from './IdCardBadge';

export default function HeroSection({ handleMouseEnter, handleMouseLeave }) {
  const sectionRef = useRef(null);
  const word1Ref = useRef(null);
  const word2Ref = useRef(null);
  const word3Ref = useRef(null);

  const canvas1Ref = useRef(null);
  const canvas2Ref = useRef(null);
  const canvas3Ref = useRef(null);

  const seq1Images = useRef([]);
  const seq2Images = useRef([]);
  const seq3Images = useRef([]);

  const lastProgressYb = useRef(0);
  const lastProgressBetter = useRef(0);

  useEffect(() => {
    // Define frames
    const frames = {
      seq: Array.from({ length: 77 }, (_, i) => `/assets/Ribbit sequence 1/${10002 + i}.png`),
      yb: Array.from({ length: 51 }, (_, i) => `/assets/ribbit your brand pull push/${10090 + i}.png`),
      better: [
        ...Array.from({ length: 17 }, (_, i) => `/assets/better push pull/push${10141 + i}.png`),
        ...Array.from({ length: 21 }, (_, i) => `/assets/better push pull/pull${10027 + i}.png`),
        ...Array.from({ length: 18 }, (_, i) => `/assets/better push pull/loop${10048 + i}.png`),
      ],
    };

    const preloadImages = (targetRef, list) => {
      if (!targetRef.current.length) {
        targetRef.current = list.map((src) => {
          const img = new Image();
          img.decoding = 'async';
          img.src = src;
          return img;
        });
      }
    };

    const loadAll = () => {
      preloadImages(seq1Images, frames.seq);
      preloadImages(seq2Images, frames.yb);
      preloadImages(seq3Images, frames.better);
    };

    if (document.readyState === 'complete') {
      loadAll();
    } else {
      window.addEventListener('load', loadAll, { once: true });
    }

    let animId;
    const isVisible = (el) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.bottom >= 0 && rect.top <= window.innerHeight;
    };

    const renderLoop = () => {
      if (document.hidden) {
        animId = requestAnimationFrame(renderLoop);
        return;
      }

      if (sectionRef.current && isVisible(sectionRef.current)) {
        const rect = sectionRef.current.getBoundingClientRect();
        const totalScroll = Math.max(1, rect.height - window.innerHeight);
        const currentScroll = Math.max(0, -rect.top);

        const updateWordTransform = (ref, dir, factor) => {
          if (!ref.current) return;
          const prog = Math.min(1, Math.max(0, currentScroll / totalScroll / factor));
          const offset = dir * 120 * (1 - prog);
          ref.current.style.transform = `translateX(${offset}%)`;
        };

        updateWordTransform(word1Ref, -1, 0.4);
        updateWordTransform(word2Ref, -1, 0.56);
        updateWordTransform(word3Ref, 1, 0.72);

        // Canvas 2: Ribbit sequence 1
        if (canvas2Ref.current && seq1Images.current.length === 77) {
          const p = Math.min(1, Math.max(0, currentScroll / totalScroll / 0.56));
          const idx = Math.round(p * 76);
          const img = seq1Images.current[idx];
          const ctx = canvas2Ref.current.getContext('2d');
          if (ctx && img && img.complete) {
            ctx.clearRect(0, 0, canvas2Ref.current.width, canvas2Ref.current.height);
            ctx.drawImage(img, 0, 0, canvas2Ref.current.width, canvas2Ref.current.height);
          }
        }

        // Canvas 1: ribbit your brand pull push
        if (canvas1Ref.current && seq2Images.current.length === 51) {
          const p = Math.min(1, Math.max(0, currentScroll / totalScroll / 0.4));
          const prevP = lastProgressYb.current;
          const ctx = canvas1Ref.current.getContext('2d');
          if (ctx) {
            let frameIdx;
            if (p >= 0.99) {
              frameIdx = 34 + (Math.floor(Date.now() / 83) % 17);
            } else if (p >= prevP) {
              frameIdx = 1 + Math.round(p * 14);
            } else {
              frameIdx = 16 + Math.round((1 - p) * 17);
            }
            frameIdx = Math.min(50, Math.max(0, frameIdx));
            const img = seq2Images.current[frameIdx];
            if (img && img.complete) {
              ctx.clearRect(0, 0, canvas1Ref.current.width, canvas1Ref.current.height);
              ctx.drawImage(img, 0, 0, canvas1Ref.current.width, canvas1Ref.current.height);
            }
          }
          lastProgressYb.current = p;
        }

        // Canvas 3: better push pull
        if (canvas3Ref.current && seq3Images.current.length === 56) {
          const p = Math.min(1, Math.max(0, currentScroll / totalScroll / 0.72));
          const prevP = lastProgressBetter.current;
          const ctx = canvas3Ref.current.getContext('2d');
          if (ctx) {
            let frameIdx;
            if (p >= 0.99) {
              frameIdx = 38 + (Math.floor(Date.now() / 83) % 18);
            } else if (p >= prevP) {
              frameIdx = Math.round(p * 16);
            } else {
              frameIdx = 17 + Math.round((1 - p) * 20);
            }
            frameIdx = Math.min(55, Math.max(0, frameIdx));
            const img = seq3Images.current[frameIdx];
            if (img && img.complete) {
              ctx.clearRect(0, 0, canvas3Ref.current.width, canvas3Ref.current.height);
              ctx.drawImage(img, 0, 0, canvas3Ref.current.width, canvas3Ref.current.height);
            }
          }
          lastProgressBetter.current = p;
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('load', loadAll);
    };
  }, []);

  const experience = [
    {
      role: 'Graphic Designer & UI/UX Designer',
      company: 'InfiApp',
      period: 'May 2026 — Present',
      badge: 'Present',
      link: 'https://www.craftyartapp.com/portfolio/user04137951',
      desc: (
        <>
          <strong className="role-highlight">Collaborating on UI/UX redesigns & user interfaces</strong>, designing social media creatives, marketing assets, invitation systems, and 3D AI workflows.
        </>
      ),
    },
    {
      role: 'Graphic Designer Intern',
      company: 'InAmigos Foundation',
      period: 'Jan 2026 — Feb 2026',
      badge: 'Internship',
      desc: 'Crafted awareness campaign posters, social media creatives, and visual content for NGO & CSR initiatives.',
    },
    {
      role: 'Technical Head',
      company: 'Entrepreneurship & Business Club (EBC)',
      period: 'Apr 2025 — Aug 2025',
      badge: 'Leadership',
      desc: 'Led the technical & creative team for university events, promotional booklets, banners, and campaign design.',
    },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-showcase hero-split-showcase">
          <div className="hero-bg" />

          <div className="hero-split-container">
            {/* Left Side: 3D Designer ID Card */}
            <div className="hero-left-col">
              <IdCardBadge
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            </div>

            {/* Right Side: Education & Professional Experience */}
            <div className="hero-right-col">
              {/* Header Title */}
              <div className="hero-cred-header">
                <h3 className="hero-cred-title">
                  Designer & Developer <span>Overview</span>
                </h3>
              </div>

              {/* Education Card */}
              <div className="resume-detail-card hero-detail-card">
                <div className="card-header-icon">
                  <GraduationCap size={22} className="accent-icon" />
                  <div>
                    <h3 className="card-title">Education</h3>
                    <p className="card-meta">B.Tech Computer Science Engineering</p>
                  </div>
                </div>
                <div className="edu-body">
                  <div className="edu-school">P. P. Savani University</div>
                  <div className="edu-years">2023 — 2027 • Surat, Gujarat</div>
                  <p className="edu-desc">
                    Focused on software engineering, interactive interfaces, cloud fundamentals, and object-oriented architecture.
                  </p>
                </div>
              </div>

              {/* Professional Experience Timeline */}
              <div className="resume-detail-card hero-detail-card">
                <div className="card-header-icon">
                  <Briefcase size={22} className="accent-icon" />
                  <div>
                    <h3 className="card-title">Professional Experience</h3>
                    <p className="card-meta">Design & Technical Roles</p>
                  </div>
                </div>

                <div className="timeline-list">
                  {experience.map((exp, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-dot" />
                      <div className="timeline-content">
                        <div className="timeline-heading">
                          {exp.link ? (
                            <a
                              href={exp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="role-name role-name-link"
                              title="Open Vaidehi's CraftyArt Portfolio"
                            >
                              <span>{exp.role}</span>
                              <ExternalLink size={13} className="role-link-icon" />
                            </a>
                          ) : (
                            <span className="role-name">{exp.role}</span>
                          )}
                          <span className="role-badge">{exp.badge}</span>
                        </div>
                        <div className="company-period">
                          <span className="company-name">{exp.company}</span>
                          <span className="period-sep">•</span>
                          <span className="period-text">{exp.period}</span>
                        </div>
                        <p className="role-desc">{exp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-title-section" ref={sectionRef}>
        <div className="hero-parallax-sticky">
          <div className="hero-bg hero-parallax-bg" />
          <div className="hero-parallax-wrapper animate-fade-up stagger-1">
            <div className="parallax-word-left" ref={word1Ref}>
              <canvas
                ref={canvas1Ref}
                width={400}
                height={500}
                className="parallax-char seq-canvas"
              />
              <h2 className="hero-word">Your Digital</h2>
            </div>

            <div className="parallax-word-left" ref={word2Ref}>
              <canvas
                ref={canvas2Ref}
                width={400}
                height={500}
                className="parallax-char seq-canvas"
              />
              <h2 className="hero-word">Vision</h2>
            </div>

            <div className="parallax-word-right" ref={word3Ref}>
              <h2 className="hero-word hero-word-outline">Built Better</h2>
              <canvas
                ref={canvas3Ref}
                width={400}
                height={500}
                className="parallax-char seq-canvas char-right"
              />
            </div>
          </div>

          <p className="hero-intro-copy animate-fade-up stagger-2">
            UI/UX Designer • Frontend Developer • Graphic Designer
            <br />
            Specializing in Intuitive UI/UX Design, Creative Visual Branding & Seamless Frontend Development.
          </p>
        </div>
      </section>
    </>
  );
}
