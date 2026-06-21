/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsGrid from './components/ProjectsGrid';
import SkillsMarquee from './components/SkillsMarquee';
import ContactFooter from './components/ContactFooter';

export default function App() {
  return (
    <div className="min-h-screen bg-[#030303] text-neutral-100 flex flex-col selection:bg-white selection:text-black" id="applet-primary-layout">
      {/* 1. Global Navigation Overlay */}
      <Header />

      {/* Main Container Sections */}
      <main className="flex-grow" id="main-content-flow">
        {/* 2. Brand Hero Landing */}
        <HeroSection />

        {/* 3. Detailed Bio Column alongside Vector Shader canvas */}
        <AboutSection />

        {/* 4. Complete dynamic projects workspace (Grid with active simulators) */}
        <ProjectsGrid />

        {/* 5. Endless competencies rows */}
        <SkillsMarquee />

        {/* 6. Contact form and social anchors */}
        <ContactFooter />
      </main>
    </div>
  );
}

