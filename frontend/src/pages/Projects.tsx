import { motion } from 'framer-motion';
import SplitText from '../components/SplitText';
import { Calendar, ExternalLink, Github } from 'lucide-react';

interface ProjectItem {
  readonly title: string;
  readonly role: string;
  readonly period: string;
  readonly descriptions: readonly string[];
  readonly techStack: readonly string[];
  readonly links: readonly { readonly label: string; readonly url: string }[];
  readonly accentColor: string;
}

const projects: readonly ProjectItem[] = [
  {
    title: 'AITO — AI Real-Time Translation Overlay',
    role: 'Software Developer (Mobile & Desktop)',
    period: 'Sep 2025 — Mar 2026',
    descriptions: [
      'Mobile (Android): Built a real-time translation app using React Native and Kotlin/Java Native Interface to integrate Media Projection for screen capturing and UI overlays.',
      'Desktop (Windows): Developed a Windows translation tool leveraging Tesseract OCR and AI models to provide instant on-screen text overlays.',
      'On-device AI: Integrated Google ML Kit for high-speed on-device OCR and translation, ensuring privacy and low latency.',
      'Performance Optimization: Enhanced the "Capture → OCR → Translate" data flow, reducing CPU consumption by 50%.',
    ],
    techStack: ['React Native', 'Kotlin', 'Java', 'Tesseract OCR', 'Google ML Kit', 'Python'],
    links: [
      { label: 'Android', url: 'https://github.com/itlong30102003/A-I-T-O' },
      { label: 'Windows', url: 'https://github.com/itlong30102003/OCR-AITranslate-Overlay_Realtime' },
    ],
    accentColor: '#8b5cf6',
  },
  {
    title: 'EduEvent',
    role: 'Mobile & Web Developer',
    period: 'Dec 2024 — May 2025',
    descriptions: [
      'Built a comprehensive event management system for students with QR code and GPS-based attendance features.',
      'Implemented Google OAuth for calendar synchronization and used Firestore for real-time data sync between the web admin portal and mobile app.',
      'Developed an automated bot to scrape and update news directly from the university website.',
    ],
    techStack: ['React', 'Firestore', 'Google OAuth', 'QR Code', 'GPS', 'Web Scraping'],
    links: [
      { label: 'Mobile App', url: 'https://github.com/Penlika/EduEvent' },
      { label: 'Web Admin', url: 'https://github.com/itlong30102003/edu-event-admin' },
    ],
    accentColor: '#3b82f6',
  },
  {
    title: 'MotoCare',
    role: 'Fullstack Developer',
    period: 'Jan 2025 — Apr 2025',
    descriptions: [
      'Developed a comprehensive motorcycle maintenance management platform with automated cost calculation and maintenance tracking by license plate.',
      'Integrated SePay payment gateway for automated online invoicing and implemented real-time chat for customer support.',
    ],
    techStack: ['Node.js', 'SePay', 'Real-time Chat', 'REST API'],
    links: [
      { label: 'GitHub', url: 'https://github.com/itlong30102003/MotoCare' },
    ],
    accentColor: '#10b981',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const Projects = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      paddingTop: '6rem',
      paddingBottom: '4rem',
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: '1rem' }}>
            <SplitText
              text="My Projects"
              className="title-gradient"
              tag="span"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
            />
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
            Featured projects from my software development journey
          </p>
        </div>

        {/* Project Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={cardVariants} className="project-card">
              {/* Header */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.2rem' }}>
                <div style={{ flex: '1 1 auto' }}>
                  <h3 style={{
                    fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.4rem',
                    lineHeight: 1.3,
                  }}>
                    {project.title}
                  </h3>
                  <span style={{ color: project.accentColor, fontSize: '0.88rem', fontWeight: 600 }}>
                    {project.role}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  flexShrink: 0,
                }}>
                  <Calendar size={12} />
                  {project.period}
                </div>
              </div>

              {/* Description */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {project.descriptions.map((desc, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    gap: '0.8rem',
                    alignItems: 'flex-start',
                    color: 'var(--text-secondary)',
                    fontSize: '0.88rem',
                    lineHeight: 1.7,
                  }}>
                    <span style={{
                      flexShrink: 0,
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: project.accentColor,
                      marginTop: '0.55rem',
                      opacity: 0.7,
                    }} />
                    {desc}
                  </li>
                ))}
              </ul>

              {/* Footer: Tech Tags + Links */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                {/* Tech Tags */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {project.links.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: 'var(--text-primary)',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        background: 'rgba(255,255,255,0.04)',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none',
                        opacity: 1,
                      }}
                    >
                      {link.label === 'GitHub' ? <Github size={14} /> : <ExternalLink size={14} />}
                      {link.label}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
