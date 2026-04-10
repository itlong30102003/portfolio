import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Facebook, ArrowDown } from 'lucide-react';
import { INFO } from '../data';

export const Hero = () => {
  return (
    <section className="container section-spacing" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span style={{ 
          color: 'var(--accent-primary)', 
          fontWeight: 600, 
          letterSpacing: '0.1em', 
          textTransform: 'uppercase',
          fontSize: '0.875rem'
        }}>
          Chào mừng bạn đến với Portfolio của tôi
        </span>
        <h1 className="title-gradient" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginTop: '1rem', lineHeight: 1.1 }}>
          {INFO.name}
        </h1>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          {INFO.role}
        </h2>
        <p style={{ maxWidth: '600px', fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          {INFO.bio}
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a href="#projects" style={{ 
            background: 'var(--accent-primary)', 
            padding: '1rem 2rem', 
            borderRadius: '0.5rem',
            fontWeight: 600,
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Xem dự án
          </a>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href={INFO.github} target="_blank" rel="noopener noreferrer"><Github size={24} /></a>
            <a href={INFO.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={24} /></a>
            <a href={INFO.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={24} /></a>
            <a href={`mailto:${INFO.email}`}><Mail size={24} /></a>
          </div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};
