import { motion } from 'framer-motion';
import SplitText from '../components/SplitText';
import { FileText, GraduationCap } from 'lucide-react';

const Resume = () => {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5rem' }}>

      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         style={{ 
           position: 'relative', 
           zIndex: 1, 
           display: 'flex', 
           flexDirection: 'column', 
           alignItems: 'center', 
           gap: '3rem',
           width: '100%',
           maxWidth: '1200px',
           padding: '0 2rem 5rem 2rem'
         }}
      >
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', textAlign: 'center', marginBottom: '1rem' }}>
          <SplitText 
            text="Documents & Certificates" 
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
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
          gap: '2.5rem', 
          width: '100%',
          pointerEvents: 'auto' 
        }}>
          {/* CV Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <FileText size={20} /> MY CURRICULUM VITAE
            </h3>
            <div style={{ 
              width: '100%', 
              height: '650px', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <iframe 
                src="https://drive.google.com/file/d/1DVzZ9ub1hCsVD10zoZVCwUVM8aL6EJVN/preview" 
                width="100%" 
                height="100%" 
                allow="autoplay"
                style={{ border: 'none' }}
              ></iframe>
            </div>
          </div>

          {/* Transcript Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <GraduationCap size={20} /> ACADEMIC TRANSCRIPT
            </h3>
            <div style={{ 
              width: '100%', 
              height: '650px', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <iframe 
                src="https://drive.google.com/file/d/12fRpD-f6_5Pa6VcduAyQiruXOqijC01M/preview" 
                width="100%" 
                height="100%" 
                allow="autoplay"
                style={{ border: 'none' }}
              ></iframe>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Resume;
