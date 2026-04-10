import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  setCurrentPage: (p: string) => void;
  currentPage: string;
  onLetsTalkClick: () => void;
}

type PageKey = 'home' | 'about' | 'projects' | 'experience' | 'resume';

const NAV_ITEMS: readonly { readonly key: PageKey; readonly label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'projects', label: 'Project' },
  { key: 'experience', label: 'Experience' },
  { key: 'resume', label: 'Resume' },
] as const;

const mobileMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const Navbar = ({ setCurrentPage, currentPage, onLetsTalkClick }: NavbarProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (!isNavigating) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isNavigating]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    setIsNavigating(true);
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });

    setTimeout(() => {
      setIsNavigating(false);
    }, 100);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 5%',
              zIndex: 999,
              background: 'linear-gradient(to bottom, rgba(10,10,12,0.6) 0%, transparent 100%)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          >
            {/* LEFT: Desktop Nav Links */}
            <div className="desktop-nav-links">
              {NAV_ITEMS.map(({ key, label }) => (
                <a
                  key={key}
                  href={`#${key}`}
                  onClick={(e) => handleLinkClick(e, key)}
                  style={{
                    color: currentPage === key ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    transition: 'color 0.2s',
                  }}
                  className="nav-link"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* RIGHT: CTA Button + Hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onLetsTalkClick}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '50px',
                  padding: '8px 24px',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                }}
              >
                Let's Talk!
              </motion.button>

              {/* Hamburger (mobile only) */}
              <button
                className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {NAV_ITEMS.map(({ key, label }) => (
              <motion.a
                key={key}
                href={`#${key}`}
                onClick={(e) => handleLinkClick(e, key)}
                variants={mobileItemVariants}
                style={{
                  color: currentPage === key ? 'var(--accent-primary)' : 'var(--text-primary)',
                  textDecoration: 'none',
                }}
                className="nav-link"
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
