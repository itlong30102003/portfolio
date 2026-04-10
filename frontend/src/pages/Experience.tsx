import { motion } from 'framer-motion';
import SplitText from '../components/SplitText';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceItem {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly descriptions: readonly string[];
  readonly accentColor: string;
}

const experiences: readonly ExperienceItem[] = [
  {
    company: 'Aladin Technology',
    role: 'AI Developer',
    period: 'Sep 2025 — Dec 2025',
    descriptions: [
      'Developed an AI-powered system using Python, YOLOv8, and Tesseract OCR to automate text detection and data extraction from digital contracts.',
      'Implemented decentralized storage solutions by integrating data and ProofChat onto the IPFS network.',
      'Optimized contract processing workflows for Trust Layer, enhancing automation in storage and retrieval tasks.',
    ],
    accentColor: '#8b5cf6',
  },
  {
    company: 'Sango Technology',
    role: 'Backend Developer Intern',
    period: 'May 2025 — Jul 2025',
    descriptions: [
      'Designed the architecture and developed an internal microservices-based web system for cash flow management using Ruby on Rails and Node.js.',
      'Designed and optimized RESTful APIs for client-side applications, ensuring high performance and robust data security.',
      'Built an intelligent Slack chatbot integrated with Gemini AI and Tesseract OCR to automate lunch ordering and provide Japanese communication support.',
      'Participated in professional CI/CD workflows and Git Flow (Code Reviews, Pull Requests), collaborating closely with the Frontend team to improve system resilience.',
    ],
    accentColor: '#3b82f6',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const Experience = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      paddingTop: '6rem',
      paddingBottom: '4rem',
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: '1rem' }}>
            <SplitText
              text="Work Experience"
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
            Professional experience in software development
          </p>
        </div>

        {/* Timeline */}
        <motion.div
          className="timeline-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              variants={itemVariants}
              style={{ position: 'relative' }}
            >
              {/* Timeline Dot */}
              <div className="timeline-dot" style={{ background: exp.accentColor }} />

              {/* Card */}
              <div className="experience-card">
                {/* Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <div>
                    <h3 style={{
                      fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                      fontFamily: "'Orbitron', sans-serif",
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '0.3rem',
                    }}>
                      {exp.company}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Briefcase size={14} color={exp.accentColor} />
                      <span style={{ color: exp.accentColor, fontSize: '0.9rem', fontWeight: 600 }}>
                        {exp.role}
                      </span>
                    </div>
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
                    {exp.period}
                  </div>
                </div>

                {/* Description */}
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                }}>
                  {exp.descriptions.map((desc, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.2 + i * 0.08, duration: 0.4 }}
                      style={{
                        display: 'flex',
                        gap: '0.8rem',
                        alignItems: 'flex-start',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        lineHeight: 1.7,
                      }}
                    >
                      <span style={{
                        flexShrink: 0,
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: exp.accentColor,
                        marginTop: '0.55rem',
                        opacity: 0.7,
                      }} />
                      {desc}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
