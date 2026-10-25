import React, { useState, useRef } from 'react';
import {
  Mail,
  Phone,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export default function IdCardBadge({ handleMouseEnter, handleMouseLeave }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    '--glare-x': '50%',
    '--glare-y': '50%',
    '--glare-opacity': '0',
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const px = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
    const py = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);

    const rotateX = -(y / (rect.height / 2)) * 10;
    const rotateY = (x / (rect.width / 2)) * 10;

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      '--glare-x': `${px}%`,
      '--glare-y': `${py}%`,
      '--glare-opacity': '1',
    });
  };

  const handleMouseLeaveCard = () => {
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      '--glare-x': '50%',
      '--glare-y': '50%',
      '--glare-opacity': '0',
    });
    handleMouseLeave?.();
  };

  const toggleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="idcard-stage">
      {/* Lanyard Strap hanging from top navigation */}
      <div className="idcard-lanyard-holder">
        <div className="idcard-lanyard-mount" />
        <div className="idcard-lanyard-strap">
          <div className="idcard-strap-track">
            <span className="strap-text-item">VAIDEHI NAVADIYA • UI/UX DESIGNER • FRONTEND DEVELOPER • GRAPHIC DESIGNER • </span>
            <span className="strap-text-item">VAIDEHI NAVADIYA • UI/UX DESIGNER • FRONTEND DEVELOPER • GRAPHIC DESIGNER • </span>
          </div>
        </div>
        {/* Metal Carabiner Clip */}
        <div className="idcard-clip">
          <div className="idcard-clip-ring" />
          <div className="idcard-clip-body" />
          <div className="idcard-clip-hook" />
        </div>
      </div>

      {/* Floating 3D Card Container */}
      <div
        ref={cardRef}
        className={`idcard-container ${isFlipped ? 'flipped' : ''}`}
        style={tiltStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeaveCard}
        onClick={toggleFlip}
        role="button"
        tabIndex={0}
        aria-label="Click to flip designer identity pass"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleFlip(e);
        }}
      >
        <div className="idcard-inner">
          {/* ================= FRONT FACE (PHOTO ONLY) ================= */}
          <div className="idcard-face idcard-front idcard-front-photo">
            {/* Lanyard Slot Hole */}
            <div className="idcard-slot">
              <div className="idcard-slot-hole" />
            </div>

            {/* Specular Glare & Hologram overlays */}
            <div className="idcard-hologram-layer" />
            <div className="idcard-glare" />

            {/* Full Photo Container */}
            <div className="idcard-photo-container">
              <img
                src="/vaidehi-avatar.jpg?v=2"
                alt="Vaidehi Navadiya"
                className="idcard-full-photo"
              />
              <div className="idcard-photo-overlay-gradient" />
            </div>

            {/* Discreet Floating Flip Button */}
            <div className="idcard-photo-footer">
              <button
                type="button"
                className="idcard-flip-btn idcard-photo-flip-btn"
                onClick={toggleFlip}
                title="Flip to back of pass"
              >
                <RefreshCw size={13} className="flip-icon" />
                <span>Flip Pass</span>
              </button>
            </div>
          </div>

          {/* ================= BACK FACE ================= */}
          <div className="idcard-face idcard-back">
            {/* Lanyard Slot Hole */}
            <div className="idcard-slot">
              <div className="idcard-slot-hole" />
            </div>

            {/* Magnetic Stripe across the top */}
            <div className="idcard-magstripe" />

            {/* Signature & Security Panel */}
            <div className="idcard-signature-panel">
              <div className="signature-label">AUTHORIZED SIGNATURE</div>
              <div className="signature-box">
                <span className="signature-cursive">Vaidehi Navadiya</span>
                <span className="signature-security-code">03/04/2006</span>
              </div>
            </div>

            {/* Quick Contact & Links */}
            <div className="idcard-back-contact">
              <div className="back-contact-title">DIRECT ACCESS & CONNECT</div>
              <a
                href="mailto:vedinavadiya0406@gmail.com"
                className="back-contact-row"
                onClick={(e) => e.stopPropagation()}
              >
                <Mail size={14} className="back-icon" />
                <span className="contact-text">vedinavadiya0406@gmail.com</span>
              </a>
              <a
                href="tel:+916353658140"
                className="back-contact-row"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone size={14} className="back-icon" />
                <span className="contact-text">+91 6353658140</span>
              </a>
              <a
                href="http://www.linkedin.com/in/vaidehi-navadiya-b8a04332b"
                target="_blank"
                rel="noopener noreferrer"
                className="back-contact-row"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={14} className="back-icon" />
                <span className="contact-text">linkedin.com/in/vaidehi-navadiya</span>
              </a>
            </div>

            {/* Core Tech Stack */}
            <div className="idcard-tech-section">
              <div className="back-contact-title">PRIMARY TOOLKIT</div>
              <div className="idcard-tech-tags">
                <span className="tech-badge">Figma</span>
                <span className="tech-badge">Canva</span>
                <span className="tech-badge">Photoshop</span>
                <span className="tech-badge">After Effects</span>
                <span className="tech-badge">UI/UX</span>
                <span className="tech-badge">React</span>
                <span className="tech-badge">Full Stack</span>
                <span className="tech-badge">JavaScript</span>
                <span className="tech-badge">Next.js</span>
                <span className="tech-badge">CSS3</span>
              </div>
            </div>

            {/* Card Flip Button */}
            <div className="idcard-back-footer idcard-back-footer-clean">
              <button
                type="button"
                className="idcard-flip-btn"
                onClick={toggleFlip}
                title="Flip to front of pass"
              >
                <RefreshCw size={13} className="flip-icon" />
                <span>Front Side</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Surrounding Ambient Highlights */}
      <div className="idcard-ambient-glow" />
    </div>
  );
}
