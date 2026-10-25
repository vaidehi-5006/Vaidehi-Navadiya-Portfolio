import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import CustomCursor from '../components/CustomCursor';
import PageLoader from '../components/PageLoader';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Marquee from '../components/Marquee';
import ParallaxSection from '../components/ParallaxSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsCarousel from '../components/ProjectsCarousel';
import ResumeSection from '../components/ResumeSection';
import Footer from '../components/Footer';

export default function HomePage() {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Console signature
    console.log(
      '%c Made by Vaidehi Navadiya ',
      'font-weight: bold; font-size: 14px; color: #fff; background: #111; padding: 6px 14px; border-radius: 6px; letter-spacing: 0.05em;'
    );

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      wheelMultiplier: 1,
    });

    // Observer for fade-up animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll('.animate-fade-up, .animate-mask-up')
      .forEach((el) => observer.observe(el));

    return () => {
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div className="App">
      <a href="#main-content" className="skip-link" aria-label="Skip to main content">
        Skip to main content
      </a>

      <PageLoader />
      <CustomCursor isHovering={isHovering} />

      <Header
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />

      <main id="main-content">
        <HeroSection
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
        <Marquee />
        <ParallaxSection />
        <SkillsSection />
        <ProjectsCarousel
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
        <ResumeSection
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </main>

      <Footer />
    </div>
  );
}
