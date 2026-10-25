import React, { useState, useRef, useEffect } from 'react';

export default function ThemeToggle({ isDark, onToggle }) {
  const [phase, setPhase] = useState('idle');
  const [direction, setDirection] = useState('ltr');
  const [isHovered, setIsHovered] = useState(false);
  const timeouts = useRef([]);

  const addTimeout = (delay, callback) => {
    const id = window.setTimeout(callback, delay);
    timeouts.current.push(id);
  };

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const handleClick = () => {
    if (phase !== 'idle') return;
    setIsHovered(false);
    setDirection(isDark ? 'rtl' : 'ltr');
    setPhase('pushing');
    addTimeout(520, () => onToggle());
    addTimeout(900, () => setPhase('settling'));
    addTimeout(1150, () => setPhase('idle'));
  };

  const statusText = isDark ? "it's dark" : "it's light";
  const actionText = isDark ? 'need it light?' : 'need it dark?';
  const showAction = isHovered && phase === 'idle';

  return (
    <button
      className={`ttoggle is-${isDark ? 'dark' : 'light'} phase-${phase} push-${direction}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
    >
      <span
        className={`ttoggle-text ${phase === 'idle' ? '' : 'text-hidden'}`}
        aria-hidden={phase !== 'idle'}
      >
        <span className={`ttext-status ${showAction ? 'ttext-out' : 'ttext-in'}`}>
          {statusText}
        </span>
        <span className={`ttext-action ${showAction ? 'ttext-in' : 'ttext-out'}`}>
          {actionText}
        </span>
      </span>

      <span
        className={`ttoggle-scene ${phase === 'idle' ? 'scene-hidden' : 'scene-visible'}`}
        aria-hidden="true"
      >
        <span className="tstickman">
          <svg viewBox="0 0 28 46" fill="none" className="tstickman-svg">
            <circle cx="14" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="2" />
            <line x1="14" y1="10" x2="14" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="t-body" />
            <line x1="14" y1="16" x2="5" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="t-arm-l" />
            <line x1="14" y1="16" x2="24" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="t-arm-r" />
            <line x1="14" y1="27" x2="7" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="t-leg-l" />
            <line x1="14" y1="27" x2="21" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="t-leg-r" />
          </svg>
        </span>
        <span className="tpill">
          <span className="tpill-icon tpill-sun">☀️</span>
          <span className="tpill-icon tpill-moon">🌙</span>
          <span className="tpill-thumb" />
        </span>
      </span>
    </button>
  );
}
