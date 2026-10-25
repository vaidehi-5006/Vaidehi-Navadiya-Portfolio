import React, { useEffect, useRef } from 'react';

export default function ParallaxSection() {
  const sectionRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);

  useEffect(() => {
    let animId;

    const handleScroll = () => {
      if (!sectionRef.current || !leftTextRef.current || !rightTextRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.top <= vh && rect.bottom >= 0) {
        const factor = 1 - rect.top / vh;
        const leftX = -115 + factor * 130;
        const rightX = 115 - factor * 130;
        const leftSkew = leftX * 0.3;
        const rightSkew = rightX * 0.3;

        leftTextRef.current.style.transform = `translateX(${leftX}%) skewX(${leftSkew}deg)`;
        rightTextRef.current.style.transform = `translateX(${rightX}%) skewX(${rightSkew}deg)`;
      }
    };

    const loop = () => {
      if (!document.hidden) {
        handleScroll();
      }
      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="parallax-section" ref={sectionRef}>
      <div className="parallax-content">
        <h2 className="parallax-text parallax-left" ref={leftTextRef}>
          Creative
        </h2>
        <h2 className="parallax-text parallax-right" ref={rightTextRef}>
          Designer
        </h2>
      </div>
    </section>
  );
}
