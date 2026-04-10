import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Resume from './pages/Resume';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const pageTransition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isContactOpen, setIsContactOpen] = useState(false);

  /* ── Spline 3D script loader (global, once) ── */
  useEffect(() => {
    if (!document.querySelector('script[src="https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js';
      document.body.appendChild(script);
    }
  }, []);


  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'experience':
        return <Experience />;
      case 'resume':
        return <Resume />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div style={{ width: '100%', position: 'relative', minHeight: '100vh' }}>

      {/* ── Global Spline 3D Background (fixed) ── */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'auto',
      }}>
        {/* @ts-expect-error - Custom Spline web component injected via script tag */}
        <spline-viewer url="https://prod.spline.design/rBdouVRPNb7JRusv/scene.splinecode"></spline-viewer>
      </div>


      {/* ── Navbar ── */}
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} onLetsTalkClick={() => setIsContactOpen(true)} />

      {/* ── Contact Modal ── */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* ── Page Content with Transitions ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          style={{ position: 'relative', zIndex: 1, minHeight: '100vh', pointerEvents: 'none' }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* ── Footer ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
