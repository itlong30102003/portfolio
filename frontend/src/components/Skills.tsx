import { motion } from 'framer-motion';
import { SKILLS } from '../data';

export const Skills = () => {
  return (
    <section id="skills" style={{ background: 'var(--bg-secondary)', padding: '6rem 0' }}>
      <div className="container">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '3rem', textAlign: 'center' }} className="title-gradient">
            Kỹ năng công nghệ
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '2rem' }}>
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="glass"
                style={{ 
                  padding: '2rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '1rem',
                  cursor: 'default',
                  textAlign: 'center'
                }}
              >
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  borderRadius: '1rem', 
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--accent-primary)'
                }}>
                  {/* Dynamic icon loading could be done here, for now using names */}
                  <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{skill.name[0]}</span>
                </div>
                <h4 style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{skill.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
