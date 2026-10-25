import React from 'react';
import {
  Code,
  Braces,
  Terminal,
  Atom,
  Sparkles,
  Brush,
  WandSparkles,
  Image as ImageIcon,
  TrendingUp,
  Star,
  Rocket,
  Lightbulb,
  Target,
  Monitor,
  Palette,
  Briefcase,
} from 'lucide-react';

export default function SkillsSection() {
  return (
    <section className="services" id="skills">
      <div className="container">
        <div className="section-header animate-fade-up">
          <div>
            <span className="section-subtitle">Core Expertise</span>
            <h2 className="section-title">Skills & Experience</h2>
          </div>
        </div>

        <div className="services-grid animate-fade-up stagger-2">
          {/* 1. UI/UX Design */}
          <div className="service-card">
            <div className="card-popouts">
              <span><Sparkles size={18} /></span>
              <span><Brush size={18} /></span>
              <span><WandSparkles size={18} /></span>
              <span><div style={{ fontSize: '0.85rem', fontWeight: 600 }}>UX</div></span>
            </div>
            <div className="service-icon">
              <Palette size={36} strokeWidth={1.5} />
            </div>
            <h3>UI/UX Design</h3>
            <p>
              Crafting intuitive, user-centered wireframes, interactive prototypes, and design systems in Figma.
            </p>
          </div>

          {/* 2. Frontend Development */}
          <div className="service-card">
            <div className="card-popouts">
              <span><Code size={18} /></span>
              <span><Braces size={18} /></span>
              <span><Terminal size={18} /></span>
              <span><Atom size={18} /></span>
            </div>
            <div className="service-icon">
              <Monitor size={36} strokeWidth={1.5} />
            </div>
            <h3>Frontend Dev</h3>
            <p>
              Building responsive, high-performance web applications with React, modern CSS, and web APIs.
            </p>
          </div>

          {/* 3. Graphic Design */}
          <div className="service-card">
            <div className="card-popouts">
              <span><Brush size={18} /></span>
              <span><ImageIcon size={18} /></span>
              <span><Sparkles size={18} /></span>
              <span><div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Art</div></span>
            </div>
            <div className="service-icon">
              <Brush size={36} strokeWidth={1.5} />
            </div>
            <h3>Graphic Design</h3>
            <p>
              Creating eye-catching visual graphics, marketing creatives, vector illustrations, and digital media.
            </p>
          </div>

          {/* 4. Branding & Identity */}
          <div className="service-card">
            <div className="card-popouts">
              <span><Lightbulb size={18} /></span>
              <span><Star size={18} /></span>
              <span><Target size={18} /></span>
              <span><div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Logo</div></span>
            </div>
            <div className="service-icon">
              <Briefcase size={36} strokeWidth={1.5} />
            </div>
            <h3>Branding & Identity</h3>
            <p>
              Developing cohesive brand identities, modern logos, typography schemes, and brand guidelines.
            </p>
          </div>

          {/* 5. Interaction & Motion */}
          <div className="service-card">
            <div className="card-popouts">
              <span><WandSparkles size={18} /></span>
              <span><TrendingUp size={18} /></span>
              <span><Sparkles size={18} /></span>
              <span><div style={{ fontSize: '0.85rem', fontWeight: 600 }}>UI</div></span>
            </div>
            <div className="service-icon">
              <WandSparkles size={36} strokeWidth={1.5} />
            </div>
            <h3>Interaction & Motion</h3>
            <p>
              Enhancing digital products with micro-interactions, smooth state transitions, and responsive aesthetics.
            </p>
          </div>

          {/* 6. Creative Direction */}
          <div className="service-card">
            <div className="card-popouts">
              <span><Rocket size={18} /></span>
              <span><Target size={18} /></span>
              <span><Lightbulb size={18} /></span>
              <span><div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Lead</div></span>
            </div>
            <div className="service-icon">
              <Rocket size={36} strokeWidth={1.5} />
            </div>
            <h3>Creative Direction</h3>
            <p>
              Guiding design concepts from initial user journey mapping to polished, production-ready experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
