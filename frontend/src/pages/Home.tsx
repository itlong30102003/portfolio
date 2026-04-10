import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Facebook, Send, Instagram, Hash, Eye } from 'lucide-react';
import SplitText from '../components/SplitText';

export const Badge = ({ color, icon, text, href }: { color: string, icon: React.ReactNode, text: string, href?: string }) => (
  <motion.a
    href={href || "#"}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
    whileTap={{ scale: 0.95 }}
    className="custom-badge"
    style={{ backgroundColor: color }}
  >
    {icon} {text}
  </motion.a>
);

export const ProfileViewBadge = () => {
  const [views, setViews] = useState<string | number>('196');

  useEffect(() => {
    fetch('https://api.counterapi.dev/v1/tranduclongse/portfolio_visits/up')
      .then(res => res.json())
      .then(data => {
        if (data && data.count) {
          setViews(data.count);
        }
      })
      .catch((error) => {
        console.error('Error fetching view count:', error);
      });
  }, []);

  return (
    <Badge color="#333333" icon={<Eye size={14} />} text={`Profile Views ${views}`} href="https://github.com/tranduclong-se" />
  );
};

interface HomeProps {
  setCurrentPage: (p: string) => void;
}

const TECH_TAGS = ['NODE.JS', 'TYPESCRIPT', 'NESTJS', 'REST API', 'DOCKER', 'LINUX'];

const Home = ({ setCurrentPage }: HomeProps) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      zIndex: 1,
      pointerEvents: 'none',
      padding: '0 5% 4rem 5%',
    }}>
      {/* Bottom row: Title left, Description+Buttons right */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: '3rem',
        flexWrap: 'wrap',
        width: '100%',
      }}>
        {/* LEFT: Big Title */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ flex: '1 1 55%', minWidth: '300px' }}
        >
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            margin: 0,
          }}>
            <SplitText
              text="Hi, I'm Long"
              tag="span"
              delay={40}
              duration={1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 60 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-50px"
              textAlign="left"
            />
            <br />
            <SplitText
              text="Backend Engineer"
              tag="span"
              delay={40}
              duration={1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 60 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-50px"
              textAlign="left"
            />
          </h1>
        </motion.div>

        {/* RIGHT: Description + Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          style={{
            flex: '1 1 35%',
            minWidth: '280px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1.5rem',
          }}
        >
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
            lineHeight: 1.6,
            fontStyle: 'italic',
            margin: 0,
            maxWidth: '380px',
          }}>
            Crafting Robust APIs and Scalable Backend Systems with Node.js & TypeScript
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '0.8rem', pointerEvents: 'auto', position: 'relative', flexWrap: 'wrap' }}>
            {/* Contact Me */}
            <div style={{ position: 'relative' }}>
              <motion.button
                onClick={() => setShowContact(!showContact)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '50px',
                  padding: '12px 28px',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>

              {/* Dropdown */}
              <AnimatePresence>
                {showContact && (
                  <motion.div
                    key="contact-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      bottom: 'calc(100% + 12px)',
                      left: '0',
                      background: 'rgba(15, 15, 18, 0.9)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem',
                      minWidth: '220px',
                      zIndex: 100,
                      boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
                    }}
                  >
                    <Badge color="#ea4335" icon={<Mail size={14} />} text="Gmail" href="mailto:tranduclong.se@gmail.com" />
                    <Badge color="#0a66c2" icon={<Linkedin size={14} />} text="LinkedIn" href="https://www.linkedin.com/in/tranduclongse-tdmu" />
                    <Badge color="#1877f2" icon={<Facebook size={14} />} text="Facebook" href="https://www.facebook.com/longtran.530215" />
                    <Badge color="#229ED9" icon={<Send size={14} />} text="Telegram" href="https://t.me/Ryuu_Tran" />
                    <Badge color="#E1306C" icon={<Instagram size={14} />} text="Instagram" href="https://www.instagram.com/itlong30102003" />
                    <Badge color="#000000" icon={<Hash size={14} />} text="Threads" href="https://www.threads.net/@itlong30102003" />
                    <ProfileViewBadge />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View Documents */}
            <motion.button
              onClick={() => {
                setCurrentPage('resume');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '50px',
                padding: '12px 28px',
                color: 'var(--text-primary)',
                fontWeight: 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              View Documents
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Tech Tags Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '2.5rem',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {TECH_TAGS.map((tag, i) => (
          <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
            }}>
              {tag}
            </span>
            {i < TECH_TAGS.length - 1 && (
              <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.75rem' }}>\</span>
            )}
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default Home;
