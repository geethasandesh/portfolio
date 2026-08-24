import React from 'react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Education from '../components/Education';

function Portfolio() {
  return (
    <Layout>
      <div id="scroll-container" className="flex-1 lg:max-w-[75%] lg:h-full lg:overflow-y-auto no-scrollbar scroll-smooth pointer-events-auto overflow-x-hidden max-w-full min-w-0">
        <Navbar />
        <div id="content" className="p-4 md:p-8 lg:p-12 space-y-20 pb-20 overflow-x-hidden">
          <HeroSection />
          <Sidebar className="lg:hidden" />
          <div id="projects">
            <Projects />
          </div>
          <Experience />
          <Skills />
          <Education />
          <div id="contact">
            <Contact />
          </div>
        </div>
      </div>

      <Sidebar className="hidden lg:flex" />
    </Layout>
  );
}

export default Portfolio;
