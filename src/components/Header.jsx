import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageTransition } from '../context/TransitionContext';
import ThemeToggle from './ThemeToggle';

export default function Header({ handleMouseEnter, handleMouseLeave }) {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isHoverExpanded, setIsHoverExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { navigateWithTransition } = usePageTransition();
  const location = useLocation();

  // Theme state
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Eye tracking & blinking logic
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const eyes = [
      { eyeRef: leftEyeRef, pupilRef: leftPupilRef, sideBias: -3, currentX: 0, currentY: 0 },
      { eyeRef: rightEyeRef, pupilRef: rightPupilRef, sideBias: 3, currentX: 0, currentY: 0 },
    ];

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let lastMouseMove = performance.now();
    let idleOffsetX = 0;
    let idleOffsetY = 0;
    let nextIdleTime = 0;
    let blinkTimer;
    let animId;
    let autoMoveTimer;
    const timeouts = [];

    const safeTimeout = (fn, delay) => {
      const id = window.setTimeout(() => {
        const idx = timeouts.indexOf(id);
        if (idx >= 0) timeouts.splice(idx, 1);
        fn();
      }, delay);
      timeouts.push(id);
      return id;
    };

    const triggerBlink = () => {
      [leftEyeRef.current, rightEyeRef.current].forEach((eye, index) => {
        if (!eye) return;
        safeTimeout(() => {
          eye.classList.remove('is-blinking');
          void eye.offsetWidth; // retrigger reflow
          eye.classList.add('is-blinking');
          safeTimeout(() => {
            eye.classList.remove('is-blinking');
          }, 220);
        }, index * (28 + Math.random() * 30));
      });
    };

    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => {
        triggerBlink();
        if (Math.random() < 0.28) {
          safeTimeout(triggerBlink, 140 + Math.random() * 120);
        }
        scheduleBlink();
      }, 1900 + Math.random() * 1700);
    };

    const updatePupils = (now) => {
      const isMobileOrIdle = window.innerWidth <= 768 || now - lastMouseMove > 1500;
      if (isMobileOrIdle && now >= nextIdleTime) {
        idleOffsetX = (Math.random() - 0.5) * 20;
        idleOffsetY = (Math.random() - 0.5) * 14;
        nextIdleTime = now + 700 + Math.random() * 900;
      }

      eyes.forEach((item) => {
        if (!item.eyeRef.current || !item.pupilRef.current) return;
        const rect = item.eyeRef.current.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const lookX = isMobileOrIdle ? eyeCenterX + idleOffsetX + item.sideBias : targetX + item.sideBias;
        const lookY = isMobileOrIdle ? eyeCenterY + idleOffsetY : targetY;

        const deltaX = lookX - eyeCenterX;
        const deltaY = lookY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const maxDist = rect.width * 0.22;
        const hyp = Math.min(Math.hypot(deltaX, deltaY), maxDist * 6);
        const dist = Math.min(hyp / 6, maxDist);

        const destX = Math.cos(angle) * dist;
        const destY = Math.sin(angle) * dist;

        item.currentX += (destX - item.currentX) * 0.16;
        item.currentY += (destY - item.currentY) * 0.16;

        item.pupilRef.current.style.transform = `translate(${item.currentX}px, ${item.currentY}px)`;
      });
    };

    const loop = () => {
      if (!document.hidden) {
        updatePupils(performance.now());
      }
      animId = requestAnimationFrame(loop);
    };
    loop();

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      lastMouseMove = performance.now();
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const scheduleAutoMove = () => {
      autoMoveTimer = window.setTimeout(() => {
        if (window.innerWidth <= 768) {
          onMouseMove({
            clientX: window.innerWidth * 0.32 + Math.random() * window.innerWidth * 0.36,
            clientY: window.innerHeight * 0.26 + Math.random() * window.innerHeight * 0.28,
          });
        }
        scheduleAutoMove();
      }, 900 + Math.random() * 1300);
    };

    scheduleBlink();
    scheduleAutoMove();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (blinkTimer) clearTimeout(blinkTimer);
      if (autoMoveTimer) clearTimeout(autoMoveTimer);
      timeouts.forEach((id) => clearTimeout(id));
      cancelAnimationFrame(animId);
    };
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#skills', label: 'Skills' },
    { href: '/#resume', label: 'Resume' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileOpen(false);
    navigateWithTransition(href);
  };

  return (
    <header
      role="banner"
      aria-label="Main navigation"
      className={`header ${isShrunk ? 'shrunk' : ''} ${isShrunk && isHoverExpanded ? 'expanded' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}
      onMouseEnter={() => setIsHoverExpanded(window.innerWidth > 768)}
      onMouseLeave={() => setIsHoverExpanded(false)}
      onClick={(e) => {
        if (isShrunk && window.innerWidth <= 768) {
          e.stopPropagation();
          setIsMobileOpen((prev) => !prev);
        }
      }}
    >
      <div
        className="logo"
        onClick={() => navigateWithTransition('/')}
        style={{ cursor: 'pointer' }}
      >
        Vaidehi<span>.</span>
      </div>

      <div className="nav-eye nav-eye-left" ref={leftEyeRef}>
        <div className="nav-pupil" ref={leftPupilRef} />
      </div>
      <div className="nav-eye nav-eye-right" ref={rightEyeRef}>
        <div className="nav-pupil" ref={rightPupilRef} />
      </div>

      <nav id="mobile-navigation" className={`nav-links ${isMobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className={
              location.pathname === link.href ||
              (link.href === '/process' && location.pathname.startsWith('/process'))
                ? 'active'
                : ''
            }
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        <button
          className={`mobile-menu-btn ${isMobileOpen ? 'open' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsMobileOpen((prev) => !prev);
          }}
          aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-navigation"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>
    </header>
  );
}
