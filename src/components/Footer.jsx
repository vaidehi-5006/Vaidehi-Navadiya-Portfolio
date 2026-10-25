import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  ArrowUpRight,
  ArrowUp,
  Check,
  Copy,
  Linkedin,
  ExternalLink,
  Clock,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const email = 'vedinavadiya0406@gmail.com';
  const phone = '+91 6353658140';
  const linkedinUrl = 'http://www.linkedin.com/in/vaidehi-navadiya-b8a04332b';
  const craftyUrl = 'https://www.craftyartapp.com/portfolio/user04137951';

  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');

  // Live Indian Standard Time (IST) Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmailToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer modern-footer" id="about" aria-label="Site Footer and Contact Information">
      {/* Ambient Radial Glows */}
      <div className="footer-glow footer-glow-1" />
      <div className="footer-glow footer-glow-2" />

      <div className="container footer-container">
        {/* Status Pill & Live Clock */}
        <div className="footer-status-row">
          <div className="footer-status-badge">
            <span className="footer-status-pulse" />
            <span className="footer-status-text">Available for UI/UX & Full Stack Development Opportunities</span>
          </div>
          <div className="footer-clock-badge">
            <Clock size={13} className="clock-icon" />
            <span>Surat, India • {time || 'IST'}</span>
          </div>
        </div>

        {/* Big Pitch Section */}
        <div className="footer-pitch-section">
          <h2 className="footer-pitch-title">
            Let's build your next{' '}
            <span className="footer-gradient-text">digital experience</span>.
          </h2>
          <p className="footer-pitch-subtitle">
            Specializing in intuitive interfaces, visual branding, and modern frontend design. Let’s collaborate to turn creative ideas into impactful digital products.
          </p>
        </div>

        {/* Glassmorphic Contact Cards Grid */}
        <div className="footer-cards-grid">
          {/* Card 1: Direct Email */}
          <div className="footer-card footer-card-primary">
            <div className="footer-card-header">
              <div className="footer-card-icon-wrap icon-mail">
                <Mail size={18} />
              </div>
              <span className="footer-card-label">DIRECT EMAIL</span>
            </div>
            <div className="footer-card-body">
              <a href={`mailto:${email}`} className="footer-card-value font-mono">
                {email}
              </a>
              <p className="footer-card-hint">Primary inbox • Response within 24 hours</p>
            </div>
            <div className="footer-card-actions">
              <a href={`mailto:${email}`} className="footer-btn footer-btn-accent">
                <span>Send Email</span>
                <ArrowUpRight size={14} />
              </a>
              <button
                type="button"
                className={`footer-btn footer-btn-secondary ${copied ? 'btn-copied' : ''}`}
                onClick={copyEmailToClipboard}
                title="Copy email to clipboard"
              >
                {copied ? <Check size={14} className="success-icon" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Phone & Direct Reach */}
          <div className="footer-card">
            <div className="footer-card-header">
              <div className="footer-card-icon-wrap icon-phone">
                <Phone size={18} />
              </div>
              <span className="footer-card-label">PHONE & WHATSAPP</span>
            </div>
            <div className="footer-card-body">
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="footer-card-value">
                {phone}
              </a>
              <p className="footer-card-hint">Direct phone line & instant messaging</p>
            </div>
            <div className="footer-card-actions">
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="footer-btn footer-btn-accent">
                <span>Call Now</span>
                <ArrowUpRight size={14} />
              </a>
              <a
                href="https://wa.me/916353658140"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-btn footer-btn-secondary"
              >
                <span>WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Social Ecosystem Strip */}
        <div className="footer-social-strip">
          <div className="footer-social-header">
            <span>DISCOVER WORK & PROFILES</span>
          </div>
          <div className="footer-social-chips">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-chip social-chip-linkedin"
            >
              <Linkedin size={15} />
              <span>LinkedIn</span>
              <ArrowUpRight size={12} className="chip-arrow" />
            </a>
            <a
              href={craftyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-chip social-chip-crafty"
            >
              <ExternalLink size={15} />
              <span>CraftyArt Portfolio</span>
              <ArrowUpRight size={12} className="chip-arrow" />
            </a>
            <a href="/#resume" className="social-chip social-chip-resume">
              <span>View Resume (PDF)</span>
              <ArrowUpRight size={12} className="chip-arrow" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              © {currentYear} <span className="highlight-white">Vaidehi Navadiya</span>. Crafted with passion & modern code.
            </p>
          </div>
          <div className="footer-bottom-center">
            <span className="footer-role-chip">
              UI/UX Designer • Frontend Developer • Graphic Designer
            </span>
          </div>
          <div className="footer-bottom-right">
            <button
              type="button"
              className="back-to-top-btn"
              onClick={scrollToTop}
              title="Scroll smoothly back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
