import React, { useEffect, useState } from 'react';

export default function PageLoader() {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const nameLetters = 'VAIDEHI NAVADIYA'.split('');

  return (
    <div className={`page-loader ${isDone ? 'page-loader--done' : ''}`}>
      <div className="loader-content">
        <div className="loader-progress-bar" />
        <p className="loader-text">
          {nameLetters.map((char, index) => (
            <span
              key={index}
              style={{ animationDelay: `${0.2 + index * 0.05}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
