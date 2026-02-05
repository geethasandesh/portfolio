import React, { useEffect } from 'react'; // Trigger update
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';

function App() {
  return (
    <Layout>
      {/* Right Content Area (Now first in DOM for Left placement) */}
      <div id="scroll-container" className="flex-1 lg:max-w-[75%] lg:h-full lg:overflow-y-auto no-scrollbar scroll-smooth pointer-events-auto">
        <Navbar />
        <div id="content" className="p-4 md:p-8 lg:p-12 space-y-20 pb-20">
          <HeroSection />
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

      {/* Right fixed sidebar (Now second in DOM for Right placement) */}
      <Sidebar />
    </Layout>
  );
}

export default App;
