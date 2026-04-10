
import { motion } from 'framer-motion';
import SplitText from '../components/SplitText';

const Photo = () => {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#121215', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5rem' }}>
      <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
      >
        <h2 style={{ fontSize: '3rem', textAlign: 'center' }}>
          <SplitText 
            text="Photo Gallery" 
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
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', textAlign: 'center' }}>
          <SplitText 
            text="... Coming Soon ..." 
            tag="span" 
            delay={30}
            duration={1}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
          />
        </p>
      </motion.div>
    </div>
  );
};

export default Photo;
