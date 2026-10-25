import React, { useState } from 'react';
import { Download, Eye, FileText, X } from 'lucide-react';

export default function ResumeSection({ handleMouseEnter, handleMouseLeave }) {
  const [activeCard, setActiveCard] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resumePdfUrl = '/resume.pdf';

  return (
    <section id="resume" className="resume-section" aria-label="Resume">
      <div className="resume-glow resume-glow-1" />
      <div className="resume-glow resume-glow-2" />

      <div className="resume-container">
        {/* Minimal Clean Header: Heading 'Resume' + 2 Buttons only */}
        <div className="resume-clean-header">
          <h2 className="resume-clean-title">Resume</h2>

          <div className="resume-clean-actions">
            <button
              type="button"
              className="resume-pill-btn btn-fullscreen"
              onClick={() => setIsModalOpen(true)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              title="Open full screen interactive PDF viewer"
            >
              <Eye size={15} />
              <span>Full Screen</span>
            </button>

            <a
              href={resumePdfUrl}
              download="Vaidehi_Navadiya_Resume.pdf"
              className="resume-pill-btn btn-download"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              title="Download verified resume PDF"
            >
              <Download size={15} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* 2 Overlapping Resume Cards Showcase */}
        <div className="resume-overlap-wrapper">
          <div className="resume-overlap-stage">
            {/* Page 1 Card */}
            <div
              className={`resume-overlap-card card-page-1 ${activeCard === 1 ? 'is-front' : 'is-back'}`}
              onClick={() => setActiveCard(1)}
              title={activeCard === 1 ? 'Page 1 (Click to view fullscreen)' : 'Click to bring Page 1 to front'}
            >
              <div className="overlap-card-bar">
                <div className="bar-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="overlap-card-title">
                  <FileText size={13} className="bar-icon" />
                  <span>Page 01 — Experience & Education</span>
                </div>
                <span className="overlap-card-tag">P. 1</span>
              </div>

              <div
                className="overlap-card-body"
                onDoubleClick={() => setIsModalOpen(true)}
              >
                <img
                  src="/resume-preview-1.png"
                  alt="Vaidehi Navadiya Resume — Page 1"
                  className="overlap-card-img"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Page 2 Card */}
            <div
              className={`resume-overlap-card card-page-2 ${activeCard === 2 ? 'is-front' : 'is-back'}`}
              onClick={() => setActiveCard(2)}
              title={activeCard === 2 ? 'Page 2 (Click to view fullscreen)' : 'Click to bring Page 2 to front'}
            >
              <div className="overlap-card-bar">
                <div className="bar-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="overlap-card-title">
                  <FileText size={13} className="bar-icon" />
                  <span>Page 02 — Skills & Projects</span>
                </div>
                <span className="overlap-card-tag">P. 2</span>
              </div>

              <div
                className="overlap-card-body"
                onDoubleClick={() => setIsModalOpen(true)}
              >
                <img
                  src="/resume-preview-2.png"
                  alt="Vaidehi Navadiya Resume — Page 2"
                  className="overlap-card-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Quick Page Indicator Pill */}
          <div className="resume-page-pills">
            <button
              type="button"
              className={`page-pill-btn ${activeCard === 1 ? 'active' : ''}`}
              onClick={() => setActiveCard(1)}
            >
              Page 1
            </button>
            <button
              type="button"
              className={`page-pill-btn ${activeCard === 2 ? 'active' : ''}`}
              onClick={() => setActiveCard(2)}
            >
              Page 2
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen PDF Modal Viewer */}
      {isModalOpen && (
        <div className="resume-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="resume-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <div className="modal-title-group">
                <FileText size={18} className="modal-icon" />
                <span>Vaidehi_Navadiya_Resume.pdf — Interactive Viewer</span>
              </div>
              <div className="modal-actions">
                <a
                  href={resumePdfUrl}
                  download="Vaidehi_Navadiya_Resume.pdf"
                  className="modal-action-btn"
                  title="Download PDF"
                >
                  <Download size={16} />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close PDF Viewer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="resume-modal-body">
              <iframe
                src={`${resumePdfUrl}#toolbar=1&navpanes=0`}
                title="Vaidehi Navadiya Resume PDF"
                className="resume-pdf-iframe"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
