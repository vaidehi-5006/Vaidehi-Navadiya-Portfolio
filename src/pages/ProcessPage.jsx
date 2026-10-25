import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import {
  Check,
  Search,
  PenTool,
  Lightbulb,
  CodeXml,
  Rocket,
  Handshake,
} from 'lucide-react';
import Header from '../components/Header';
import './ProcessPage.css';

const contactEmail = 'vedinavadiya0406@gmail.com';
const linkedinUrl = 'http://www.linkedin.com/in/vaidehi-navadiya-b8a04332b';

const gColor = '#2c1a0e';
const outfitFont = "'Outfit', sans-serif";

const SvgWrap = ({ children, label }) => (
  <svg
    viewBox="0 0 400 300"
    role="img"
    aria-label={label}
    className="pp-svg"
  >
    {children}
  </svg>
);

const PillBar = (x, y, w, fill = gColor, opacity = 0.18) => (
  <rect
    x={x}
    y={y}
    width={w}
    height="7"
    rx="3.5"
    fill={fill}
    opacity={opacity}
  />
);

// Chapter 1 Illustration: Conversation and checklist
const Graphic1 = (
  <SvgWrap label="Conversation and checklist illustration">
    <g className="pp-float">
      <rect x="28" y="34" width="190" height="84" rx="18" fill="#fff" stroke={gColor} strokeWidth="3" />
      <path d="M62 118 L52 146 L90 118Z" fill="#fff" stroke={gColor} strokeWidth="3" strokeLinejoin="round" />
      {PillBar(50, 58, 120)}
      {PillBar(50, 76, 140)}
      {PillBar(50, 94, 80)}
    </g>
    <g className="pp-float pp-delay">
      <rect x="182" y="132" width="190" height="84" rx="18" fill={gColor} />
      <path d="M338 216 L350 244 L312 216Z" fill={gColor} />
      {PillBar(204, 156, 130, '#fce8c7', 0.7)}
      {PillBar(204, 174, 100, '#fce8c7', 0.5)}
      {PillBar(204, 192, 120, '#fce8c7', 0.35)}
    </g>
    <rect x="28" y="190" width="130" height="88" rx="14" fill="#fff" stroke={gColor} strokeWidth="3" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <circle
          cx="50"
          cy={214 + i * 22}
          r="7"
          fill={i < 2 ? '#7bb661' : 'none'}
          stroke={gColor}
          strokeWidth="2.5"
        />
        {i < 2 && (
          <path
            d={`M46.5 ${214 + i * 22} l2.5 3 l5 -6`}
            stroke="#fff"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
        )}
        {PillBar(66, 211 + i * 22, 70)}
      </g>
    ))}
    <path
      d="M330 52 l6 14 l14 6 l-14 6 l-6 14 l-6 -14 l-14 -6 l14 -6z"
      fill="#f5a843"
      stroke={gColor}
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  </SvgWrap>
);

// Chapter 2 Illustration: Magnifying glass over analytics dashboard
const Graphic2 = (
  <SvgWrap label="Magnifying glass over analytics dashboard">
    <rect x="46" y="34" width="250" height="188" rx="16" fill="#fff" stroke={gColor} strokeWidth="3" />
    <line x1="46" y1="64" x2="296" y2="64" stroke={gColor} strokeWidth="3" />
    {[0, 1, 2].map((i) => (
      <circle
        key={i}
        cx={66 + i * 18}
        cy="49"
        r="5"
        fill={['#ef6f5e', '#f5c04a', '#7bb661'][i]}
      />
    ))}
    {[52, 84, 60, 112, 96].map((h, i) => (
      <rect
        key={i}
        x={74 + i * 40}
        y={204 - h}
        width="26"
        height={h}
        rx="6"
        fill={i === 3 ? '#7b5cd6' : gColor}
        opacity={i === 3 ? 1 : 0.2}
      />
    ))}
    <polyline
      points="86,146 126,120 166,136 206,92 246,104"
      fill="none"
      stroke="#7b5cd6"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g className="pp-float">
      <circle cx="286" cy="188" r="56" fill="rgba(255,255,255,0.55)" stroke={gColor} strokeWidth="7" />
      <line x1="326" y1="228" x2="366" y2="268" stroke={gColor} strokeWidth="14" strokeLinecap="round" />
      <path
        d="M262 196 l18 -20 l16 14 l14 -22"
        fill="none"
        stroke="#7b5cd6"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </SvgWrap>
);

// Chapter 3 Illustration: Light bulb with wireframes and sitemap
const Graphic3 = (
  <SvgWrap label="Light bulb with wireframes and sitemap">
    <g className="pp-float">
      <circle cx="200" cy="106" r="54" fill="#ffd95a" stroke={gColor} strokeWidth="4" />
      <path d="M176 146 Q200 110 224 146" fill="none" stroke={gColor} strokeWidth="3.5" strokeLinecap="round" />
      <rect x="180" y="158" width="40" height="14" rx="4" fill="#fff" stroke={gColor} strokeWidth="3.5" />
      <rect x="184" y="174" width="32" height="12" rx="4" fill="#fff" stroke={gColor} strokeWidth="3.5" />
      {[
        [200, 28, 200, 14],
        [148, 48, 138, 38],
        [252, 48, 262, 38],
        [128, 100, 114, 100],
        [272, 100, 286, 100],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gColor} strokeWidth="4" strokeLinecap="round" />
      ))}
    </g>
    <rect x="22" y="196" width="118" height="86" rx="12" fill="#fff" stroke={gColor} strokeWidth="3" />
    <rect x="32" y="206" width="98" height="30" rx="6" fill={gColor} opacity="0.14" />
    {PillBar(32, 246, 70)}
    {PillBar(32, 260, 50)}
    <rect x="108" y="256" width="22" height="14" rx="5" fill="#f5a843" />
    <g stroke={gColor} strokeWidth="3" fill="#fff">
      <path d="M300 200 V222 M262 222 H338 M262 222 V240 M338 222 V240 M300 222 V240" fill="none" />
      <rect x="276" y="184" width="48" height="20" rx="6" />
      <rect x="246" y="240" width="32" height="20" rx="6" />
      <rect x="284" y="240" width="32" height="20" rx="6" />
      <rect x="322" y="240" width="32" height="20" rx="6" />
    </g>
  </SvgWrap>
);

// Chapter 4 Illustration: Interface mockup with colour palette and typography
const Graphic4 = (
  <SvgWrap label="Interface mockup with colour palette and typography">
    <rect x="30" y="30" width="240" height="170" rx="16" fill="#fdf5e8" stroke={gColor} strokeWidth="3" />
    <rect x="46" y="46" width="108" height="14" rx="7" fill={gColor} opacity="0.75" />
    <rect x="46" y="72" width="140" height="10" rx="5" fill={gColor} opacity="0.22" />
    <rect x="46" y="90" width="110" height="10" rx="5" fill={gColor} opacity="0.22" />
    <rect x="46" y="116" width="72" height="26" rx="13" fill="#e8743b" />
    <rect x="178" y="108" width="76" height="76" rx="12" fill="#bfa8f5" stroke={gColor} strokeWidth="3" />
    <circle cx="216" cy="146" r="16" fill="#fdf5e8" stroke={gColor} strokeWidth="3" />
    {['#e8743b', '#f5d060', '#7bb661', '#bfa8f5'].map((color, i) => (
      <circle
        key={color}
        cx={300 + (i % 2) * 54}
        cy={64 + Math.floor(i / 2) * 54}
        r="22"
        fill={color}
        stroke={gColor}
        strokeWidth="3"
      />
    ))}
    <text x="316" y="228" fontFamily={outfitFont} fontSize="76" fontWeight="700" fill={gColor} textAnchor="middle">
      Aa
    </text>
    <g className="pp-float">
      <path d="M60 262 L86 214 L102 224 L76 270Z" fill="#f5d060" stroke={gColor} strokeWidth="3" strokeLinejoin="round" />
      <path d="M60 262 L56 276 L72 270Z" fill={gColor} />
    </g>
    <path
      d="M130 250 Q170 214 210 250 T290 250"
      fill="none"
      stroke={gColor}
      strokeOpacity="0.5"
      strokeWidth="3"
      strokeDasharray="2 9"
      strokeLinecap="round"
    />
  </SvgWrap>
);

// Chapter 5 Illustration: Code editor window and git branches
const Graphic5 = (
  <SvgWrap label="Code editor window and git branches">
    <rect x="28" y="28" width="250" height="210" rx="16" fill="#1f1410" stroke={gColor} strokeWidth="3" />
    <line x1="28" y1="58" x2="278" y2="58" stroke="#fdf5e8" strokeOpacity="0.15" strokeWidth="2" />
    {[0, 1, 2].map((i) => (
      <circle
        key={i}
        cx={48 + i * 18}
        cy="43"
        r="5"
        fill={['#ef6f5e', '#f5c04a', '#7bb661'][i]}
      />
    ))}
    {[
      [0, 90, '#7bb661'],
      [1, 140, '#f5d060'],
      [1, 110, '#bfa8f5'],
      [2, 150, '#fdf5e8'],
      [2, 100, '#f5a843'],
      [1, 60, '#bfa8f5'],
      [0, 40, '#7bb661'],
      [0, 120, '#f5d060'],
    ].map(([indent, w, color], i) => (
      <g key={i}>
        <text x="44" y={86 + i * 18} fontFamily="monospace" fontSize="10" fill="#fdf5e8" opacity="0.3">
          {i + 1}
        </text>
        <rect x={66 + indent * 16} y={78 + i * 18} width={w} height="8" rx="4" fill={color} opacity="0.9" />
      </g>
    ))}
    <rect x="44" y="214" width="12" height="3" rx="1.5" fill="#7bb661" />
    <rect x="60" y="214" width="6" height="12" rx="1" fill="#fdf5e8" className="pp-blink" />
    <g stroke={gColor} strokeWidth="4" fill="none" strokeLinecap="round">
      <path d="M338 60 V240" />
      <path d="M338 120 C338 150 312 150 312 180 V240" />
    </g>
    {[
      [338, 60, '#f5d060'],
      [338, 120, '#fff'],
      [338, 240, '#7bb661'],
      [312, 180, '#bfa8f5'],
      [312, 240, '#fff'],
    ].map(([cx, cy, fill], i) => (
      <circle key={i} cx={cx} cy={cy} r="11" fill={fill} stroke={gColor} strokeWidth="4" />
    ))}
    <rect x="28" y="254" width="130" height="30" rx="15" fill={gColor} />
    <text x="93" y="274" fontFamily={outfitFont} fontSize="14" fontWeight="600" fill="#fce8c7" textAnchor="middle">
      React + Firebase
    </text>
  </SvgWrap>
);

// Chapter 6 Illustration: Rocket launch with performance score
const Graphic6 = (
  <SvgWrap label="Rocket launch with performance score">
    {[
      [40, 50],
      [92, 124],
      [330, 40],
      [352, 150],
      [200, 36],
    ].map(([x, y], i) => (
      <path
        key={i}
        d={`M${x} ${y - 7} l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z`}
        fill={gColor}
        opacity="0.45"
      />
    ))}
    <g className="pp-float">
      <path d="M180 190 L200 252 L220 190Z" fill="#f5a843" stroke={gColor} strokeWidth="3" strokeLinejoin="round" />
      <path d="M190 190 L200 222 L210 190Z" fill="#ffd95a" />
      <path
        d="M200 38 C236 72 238 138 224 190 H176 C162 138 164 72 200 38Z"
        fill="#fff"
        stroke={gColor}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="200" cy="108" r="19" fill="#7ec8e8" stroke={gColor} strokeWidth="4" />
      <path d="M176 160 L146 196 L180 188Z" fill="#e8743b" stroke={gColor} strokeWidth="4" strokeLinejoin="round" />
      <path d="M224 160 L254 196 L220 188Z" fill="#e8743b" stroke={gColor} strokeWidth="4" strokeLinejoin="round" />
    </g>
    <g transform="translate(300 214)">
      <circle r="44" fill="#fff" stroke={gColor} strokeWidth="3" />
      <circle r="32" fill="none" stroke="#7bb661" strokeWidth="9" strokeLinecap="round" transform="rotate(-90)" />
      <text y="7" fontFamily={outfitFont} fontSize="18" fontWeight="700" fill={gColor} textAnchor="middle">
        Fast
      </text>
    </g>
    <path d="M26 250 q16 -22 40 -8 q10 -16 32 -4 q22 -2 24 12z" fill="#fff" stroke={gColor} strokeWidth="3" strokeLinejoin="round" />
  </SvgWrap>
);

const chapterDetails = {
  1: {
    lead: 'Tell me your goals. I turn them into a plan.',
    points: [
      'A relaxed chat about your business, customers and goals',
      'Scope, timeline and cost agreed before work starts',
      'A written brief so we both build the same thing',
    ],
    outcome: 'You leave with a clear plan and no surprises.',
    deliverables: ['Project brief', 'Timeline', 'Cost estimate'],
    graphic: Graphic1,
  },
  2: {
    lead: 'I study your market so your site can beat the competition.',
    points: [
      'What competitors do well, and where they fall short',
      'The exact words your customers type into Google',
      'Technology chosen for your budget, not for trends',
    ],
    outcome: 'You get a strategy built on facts, not guesses.',
    deliverables: ['Competitor review', 'Keyword map', 'Tech choice'],
    graphic: Graphic2,
  },
  3: {
    lead: 'See the structure of your site before any design work.',
    points: [
      'A sitemap that guides visitors toward calling or buying',
      'Wireframes you can react to while changes are still cheap',
      'A tone and look that fits your brand',
    ],
    outcome: 'You get a blueprint you have approved.',
    deliverables: ['Sitemap', 'Wireframes', 'Moodboard'],
    graphic: Graphic3,
  },
  4: {
    lead: 'Screens that look like your brand and turn visitors into customers.',
    points: [
      'Designs for phone, tablet and desktop',
      'One consistent set of colours, fonts and buttons',
      'A clickable prototype to try before it is built',
    ],
    outcome: 'You get a design you love, approved before any code.',
    deliverables: ['Screen designs', 'Style guide', 'Prototype'],
    graphic: Graphic4,
  },
  5: {
    lead: 'Fast, secure and ready to grow with your business.',
    points: [
      'Clean React and Next.js code that loads quickly',
      'Logins, databases and admin tools where you need them',
      'A preview link every week to see real progress',
    ],
    outcome: 'You get a working product, not a promise.',
    deliverables: ['Working website', 'Admin tools', 'Weekly previews'],
    graphic: Graphic5,
  },
  6: {
    lead: 'Go live with confidence, and get help when you need it.',
    points: [
      'Tested on real phones, tablets and browsers',
      'Speed and search visibility checked before launch',
      'A walkthrough on launch day and support afterwards',
    ],
    outcome: 'You get a live site and someone to call.',
    deliverables: ['Live website', 'Handover guide', 'Support'],
    graphic: Graphic6,
  },
};

const chapters = [
  {
    id: 1,
    theme: 'theme-beige',
    title: 'Onboarding',
    Icon: Handshake,
    content: 'A relaxed first chat about your business and goals. You get a clear plan, timeline and cost before any work starts.',
  },
  {
    id: 2,
    theme: 'theme-purple',
    title: 'Research',
    Icon: Search,
    content: 'I study your market and what your customers search for, then pick technology that fits your budget.',
  },
  {
    id: 3,
    theme: 'theme-orange',
    title: 'Concept',
    Icon: Lightbulb,
    content: 'Your plan becomes a sitemap and simple wireframes. You shape the layout while changes are still quick and cheap.',
  },
  {
    id: 4,
    theme: 'theme-brown',
    title: 'Design',
    Icon: PenTool,
    content: 'Polished screens for phone, tablet and desktop in one consistent style. You click through a prototype before anything is coded.',
  },
  {
    id: 5,
    theme: 'theme-yellow',
    title: 'Development',
    Icon: CodeXml,
    content: 'Your approved design becomes a fast, secure website. You get a preview link every week, so nothing comes as a surprise.',
  },
  {
    id: 6,
    theme: 'theme-green',
    title: 'Delivery',
    Icon: Rocket,
    content: 'I test on real devices, check speed and search visibility, then launch. After go-live I stay on hand for support.',
  },
];

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const clamp = (val) => Math.max(0, Math.min(1, val));

export default function ProcessPage() {
  const [activeChapter, setActiveChapter] = useState(1);

  const heroWrapperRef = useRef(null);
  const heroTopLeftRef = useRef(null);
  const heroBottomRightRef = useRef(null);
  const zoomOverlayRef = useRef(null);
  const bookArtifactRef = useRef(null);
  const stickyNotesRef = useRef(null);
  const coverFlipperRef = useRef(null);
  const layoutRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      wheelMultiplier: 0.9,
    });

    const handleScroll = () => {
      const el = heroWrapperRef.current;
      if (!el) return;
      const scrollable = el.offsetHeight - window.innerHeight;
      const progress = clamp((window.scrollY - el.offsetTop) / scrollable);
      const flipProgress = clamp((progress - 0.15) / 0.7);
      const zoomProgress = clamp((progress - 0.4) / 0.55);
      const smoothZoom = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);
      const fadeText = Math.max(0, 1 - zoomProgress * 4.5);

      if (heroTopLeftRef.current) {
        heroTopLeftRef.current.style.transform = `translateY(${progress * -60}px)`;
        heroTopLeftRef.current.style.opacity = String(fadeText);
      }
      if (heroBottomRightRef.current) {
        heroBottomRightRef.current.style.transform = `translateY(${progress * -30}px)`;
        heroBottomRightRef.current.style.opacity = String(fadeText);
      }
      if (zoomOverlayRef.current) {
        zoomOverlayRef.current.style.display = progress >= 1 ? 'none' : 'flex';
        zoomOverlayRef.current.style.opacity = String(
          Math.max(0, 1 - Math.max(0, (progress - 0.95) * 20))
        );
        zoomOverlayRef.current.style.backgroundColor = `rgba(250, 243, 232, ${Math.min(1, smoothZoom * 1.5)})`;
      }
      if (bookArtifactRef.current) {
        bookArtifactRef.current.style.transform = `scale(${1 + smoothZoom * 5})`;
      }
      if (stickyNotesRef.current) {
        stickyNotesRef.current.style.opacity = String(Math.max(0, 1 - flipProgress * 2.5));
      }
      if (coverFlipperRef.current) {
        coverFlipperRef.current.style.transform = `rotateY(${flipProgress * -180}deg)`;
      }
      if (layoutRef.current) {
        layoutRef.current.style.opacity = progress > 0.8 ? '1' : '0';
      }
    };

    handleScroll();
    lenis.on('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const chId = Number(entry.target.getAttribute('data-chapter-id'));
            if (chId) setActiveChapter(chId);
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0,
      }
    );

    document
      .querySelectorAll('.pp-right-section')
      .forEach((sec) => observer.observe(sec));

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleScroll);
      lenis.destroy();
    };
  }, []);

  const scrollToChapter = (id) => {
    const el = document.getElementById(`chapter-sec-${id}`);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Header />

      {/* Hero with opening book zoom animation */}
      <div className="pp-hero-wrapper" ref={heroWrapperRef}>
        <div className="pp-hero-sticky">
          <div className="pp-hero-label top-left" ref={heroTopLeftRef}>
            <span className="pp-hero-eyebrow">How I work</span>
            <h1 className="pp-hero-heading">
              From Ideas
              <br />
              to Product.
            </h1>
          </div>

          <div className="pp-hero-book" aria-hidden="true" />

          <div className="pp-hero-label bottom-right" ref={heroBottomRightRef}>
            <p className="pp-hero-para">
              Six clear steps from first conversation to launch day, so you always know what happens next.
            </p>
          </div>
        </div>
      </div>

      {/* Book Zoom Overlay */}
      <div className="pp-book-zoom-overlay" ref={zoomOverlayRef} aria-hidden="true">
        <div
          className="book-artifact"
          ref={bookArtifactRef}
          style={{ width: 'clamp(260px, 28vw, 400px)' }}
        >
          <div className="sticky-notes-container" ref={stickyNotesRef}>
            <div className="sticky-note note-1">RexaLink.AI</div>
            <div className="sticky-note note-2">Mobile UI/UX</div>
            <div className="sticky-note note-3">ZenZap</div>
            <div className="sticky-note note-4">3D AI Invitations</div>
          </div>

          <div className="book-pages" />

          <div className="book-cover-flipper" ref={coverFlipperRef}>
            <div className="book-cover book-cover-front">
              <div className="book-frame" />
              <span className="book-author">Vaidehi Navadiya's</span>
              <h2 className="book-title">PROCESS</h2>
              <span className="book-tagline">From first call to launch day</span>
              <div className="book-ribbon" />
            </div>

            <div className="book-cover-back">
              <div className="book-inside-cover">
                <p className="book-inside-label">What's inside</p>
                <ol className="book-toc">
                  {chapters.map((ch, idx) => (
                    <li key={ch.id}>
                      <span>{romanNumerals[idx]}</span>
                      {ch.title}
                    </li>
                  ))}
                </ol>
                <div className="book-inside-line" />
                <p className="book-inside-quote">A clear process means no surprises.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Process Layout */}
      <div className="process-layout" ref={layoutRef} style={{ opacity: 0 }}>
        {/* Left Sticky Progress Sidebar */}
        <div className="pp-left-sidebar">
          <div className="pp-accordion-container">
            <div className="pp-progress-track">
              {chapters.map(({ id, title, Icon, content }) => {
                const isActive = activeChapter === id;
                const isPast = activeChapter > id;
                return (
                  <div
                    key={id}
                    className={`pp-sidebar-item ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
                    onClick={() => scrollToChapter(id)}
                  >
                    <div className="pp-sidebar-left">
                      <div className={`pp-step-dot dot-${id} ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}>
                        {isPast ? <Check size={14} strokeWidth={3} /> : id}
                      </div>
                      {id < chapters.length && (
                        <div className={`pp-connector ${isPast || isActive ? 'filled' : ''}`} />
                      )}
                    </div>

                    <div className="pp-sidebar-content">
                      <div className="pp-sidebar-emoji">
                        <Icon size={20} strokeWidth={1.75} />
                      </div>
                      <div className="pp-sidebar-text">
                        <span className="pp-sidebar-label">Chapter {id}</span>
                        <h3 className="pp-sidebar-title">{title}</h3>
                        <div className="pp-sidebar-desc">
                          <p>{content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Chapters Content */}
        <div className="pp-right-content">
          {chapters.map((ch) => {
            const detail = chapterDetails[ch.id];
            return (
              <div
                key={ch.id}
                className={`pp-right-section ${ch.theme}`}
                id={`chapter-sec-${ch.id}`}
                data-chapter-id={ch.id}
              >
                <div className="pp-art-container">
                  <div className="pp-chapter">
                    <div className="pp-chapter-graphic">{detail.graphic}</div>
                    <div className="pp-chapter-info">
                      <h2 className="pp-chapter-title">{ch.title}</h2>
                      <p className="pp-chapter-lead">{detail.lead}</p>
                      <ul className="pp-points">
                        {detail.points.map((pt, i) => (
                          <li key={i}>
                            <span className="pp-tick" aria-hidden="true">
                              <Check size={13} strokeWidth={3} />
                            </span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <p className="pp-outcome">{detail.outcome}</p>
                      <div className="pp-chips">
                        {detail.deliverables.map((del, i) => (
                          <span key={i} className="pp-chip">
                            {del}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* CTA Section */}
          <section className="pp-cta" aria-labelledby="pp-cta-title">
            <h2 id="pp-cta-title" className="pp-cta-title">
              Ready for chapter one?
            </h2>
            <p className="pp-cta-text">
              Tell me about your idea. I will reply with how I would approach it and what it would take.
            </p>
            <div className="pp-cta-actions">
              <a
                className="pp-btn pp-btn-primary"
                href={`mailto:${contactEmail}?subject=New%20project%20enquiry`}
              >
                Start a project
              </a>
              <a
                className="pp-btn pp-btn-ghost"
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
