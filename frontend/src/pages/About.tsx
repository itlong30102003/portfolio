
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import SplitText from '../components/SplitText';
import avata from '../assets/avata.png';
import avataReal from '../assets/avata.jpg';

// ── Shared section wrapper with glass card ──
const Section = ({ children, title, id }: { children: React.ReactNode; title: string; id?: string }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="glass-card"
    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}
  >
    <h3 style={{
      fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      fontFamily: "'Orbitron', sans-serif",
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    }}>
      <SplitText
        text={title}
        className="title-gradient"
        tag="span"
        delay={30}
        duration={1}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 30 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-50px"
        textAlign="left"
      />
    </h3>
    {children}
  </motion.div>
);

// ── Tech category row ──
type TechIcon = { name: string; id: string; url: string };

const TechCategory = ({ label, techs }: { label: string; techs: readonly TechIcon[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'flex-start' }}>
    <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {techs.map(tech => (
        <a key={tech.name} href={tech.url} target="_blank" rel="noopener noreferrer" title={tech.name}>
          <motion.img
            whileHover={{ scale: 1.1, translateY: -2 }}
            src={`https://skillicons.dev/icons?i=${tech.id}`}
            alt={tech.name}
            style={{ height: '42px', transition: 'all 0.2s', alignSelf: 'flex-start' }}
          />
        </a>
      ))}
    </div>
  </div>
);

const LANGUAGES: readonly TechIcon[] = [
  { name: 'TypeScript', id: 'ts', url: 'https://www.typescriptlang.org/' },
  { name: 'JavaScript', id: 'js', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'Java', id: 'java', url: 'https://www.java.com/' },
  { name: 'Python', id: 'py', url: 'https://www.python.org/' },
  { name: 'C++', id: 'cpp', url: 'https://isocpp.org/' },
  { name: 'Ruby', id: 'ruby', url: 'https://www.ruby-lang.org/' },
  { name: 'Kotlin', id: 'kotlin', url: 'https://kotlinlang.org/' },
  { name: 'HTML5', id: 'html', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS3', id: 'css', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
];

const FRAMEWORKS: readonly TechIcon[] = [
  { name: 'Node.js', id: 'nodejs', url: 'https://nodejs.org/' },
  { name: 'NestJS', id: 'nestjs', url: 'https://nestjs.com/' },
  { name: 'Express', id: 'express', url: 'https://expressjs.com/' },
  { name: 'Spring', id: 'spring', url: 'https://spring.io/projects/spring-boot' },
  { name: 'React', id: 'react', url: 'https://react.dev/' },
];

const DATABASES: readonly TechIcon[] = [
  { name: 'PostgreSQL', id: 'postgres', url: 'https://www.postgresql.org/' },
  { name: 'MySQL', id: 'mysql', url: 'https://www.mysql.com/' },
  { name: 'SQLite', id: 'sqlite', url: 'https://www.sqlite.org/' },
  { name: 'MongoDB', id: 'mongodb', url: 'https://www.mongodb.com/' },
  { name: 'Firebase', id: 'firebase', url: 'https://firebase.google.com/' },
];

const CLOUD: readonly TechIcon[] = [
  { name: 'Linux', id: 'linux', url: 'https://www.kernel.org/' },
  { name: 'Docker', id: 'docker', url: 'https://www.docker.com/' },
  { name: 'Git', id: 'git', url: 'https://git-scm.com/' },
];

const TOOLS: readonly TechIcon[] = [
  { name: 'GitHub', id: 'github', url: 'https://github.com/' },
  { name: 'GitLab', id: 'gitlab', url: 'https://about.gitlab.com/' },
  { name: 'Postman', id: 'postman', url: 'https://www.postman.com/' },
];

// ── WakaTime bar component ──
interface WakaEntry {
  readonly name: string;
  readonly time: string;
  readonly percent: number;
}

const WakaBar = ({ entry, index }: { entry: WakaEntry; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.4 }}
    style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
      <span style={{ fontWeight: 600 }}>{entry.name}</span>
      <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{entry.time} · {entry.percent.toFixed(1)}%</span>
    </div>
    <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${entry.percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.08 }}
        style={{
          height: '100%',
          borderRadius: '4px',
          background: `linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))`,
        }}
      />
    </div>
  </motion.div>
);

// ── Language proficiency bar ──
const LanguageBar = ({ name, level, percent, color }: { name: string; level: string; percent: number; color: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
      <span style={{ fontWeight: 600 }}>{name}</span>
      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{level}</span>
    </div>
    <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ height: '100%', borderRadius: '4px', background: color }}
      />
    </div>
  </div>
);

// ── Parse WakaTime text into structured data ──
function parseWakaStats(raw: string): WakaEntry[] {
  const lines = raw.split('\n').filter(l => l.trim());
  const entries: WakaEntry[] = [];
  for (const line of lines) {
    // Match pattern: "TypeScript   2 hrs 24 mins   ████████████████░░░░░░░░░   64.49 %"
    const match = line.match(/^(\S+(?:\s+\S+)?)\s+([\d]+\s+\w+(?:\s+[\d]+\s+\w+)?)\s+.*?([\d.]+)\s*%/);
    if (match) {
      entries.push({
        name: match[1],
        time: match[2],
        percent: parseFloat(match[3]),
      });
    }
  }
  return entries;
}



const About = () => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [wakaEntries, setWakaEntries] = useState<WakaEntry[]>([]);

  // Fetch WakaTime stats
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/tranduclong-se/tranduclong-se/main/README.md')
      .then(res => res.text())
      .then(text => {
        const startMarker = '<!--START_SECTION:waka-->';
        const endMarker = '<!--END_SECTION:waka-->';
        const startIdx = text.indexOf(startMarker);
        const endIdx = text.indexOf(endMarker);
        if (startIdx !== -1 && endIdx !== -1) {
          let section = text.slice(startIdx + startMarker.length, endIdx).trim();
          const codeMatch = section.match(/```[\w]*\n([\s\S]*?)```/);
          if (codeMatch) {
            section = codeMatch[1].trim();
          }
          const parsed = parseWakaStats(section);
          if (parsed.length > 0) {
            setWakaEntries(parsed);
          }
        }
      })
      .catch(() => { /* fallback handled in render */ });
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '6rem 2rem 4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
        >

          {/* ═══ ABOUT ME ═══ */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-start' }}>

            {/* Left Column: Text */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 500px' }}>
              <div style={{ marginBottom: '3.5rem' }}>
                <div style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 'bold',
                  lineHeight: 1.2,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Orbitron', sans-serif"
                }}>
                  <p style={{ margin: 0 }}>
                    <SplitText
                      text="I'm Tran Duc Long."
                      tag="span"
                      delay={40}
                      duration={1.2}
                      ease="power4.out"
                      splitType="words"
                      from={{ opacity: 0, y: 30 }}
                      to={{ opacity: 1, y: 0 }}
                      textAlign="left"
                    />
                  </p>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                    marginTop: '0.8rem',
                    fontWeight: 500,
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: 'normal'
                  }}>
                    <SplitText
                      text="I am based in Ho Chi Minh City, crafting the future through code."
                      tag="span"
                      delay={60}
                      duration={1.2}
                      ease="power4.out"
                      splitType="words"
                      from={{ opacity: 0, y: 30 }}
                      to={{ opacity: 1, y: 0 }}
                      textAlign="left"
                    />
                  </p>
                </div>
              </div>

              <div style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                <p style={{ margin: 0 }}>
                  <SplitText
                    text="Backend-focused Software Engineer specializing in NestJS (JS/TS) and Java. I bridge the gap between complex server-side logic and seamless, interactive user experiences with a high-performance mindset."
                    tag="span"
                    delay={10}
                    duration={1}
                    ease="power3.out"
                    splitType="words"
                    from={{ opacity: 0, y: 20 }}
                    to={{ opacity: 1, y: 0 }}
                    textAlign="left"
                  />
                </p>
                <p style={{ margin: 0 }}>
                  <SplitText
                    text="Expert in RESTful APIs and Modular Architecture, prioritizing clean, production-ready code. I leverage Linux and Docker to build systems that are not only scalable and optimized but also resilient and easy to manage."
                    tag="span"
                    delay={10}
                    duration={1}
                    ease="power3.out"
                    splitType="words"
                    from={{ opacity: 0, y: 20 }}
                    to={{ opacity: 1, y: 0 }}
                    textAlign="left"
                  />
                </p>
                <p style={{ margin: 0 }}>
                  <SplitText
                    text="A self-driven developer and open-source enthusiast committed to continuous evolution. I thrive on turning complex technical challenges into elegant, optimized software solutions—regardless of the circumstances."
                    tag="span"
                    delay={10}
                    duration={1}
                    ease="power3.out"
                    splitType="words"
                    from={{ opacity: 0, y: 20 }}
                    to={{ opacity: 1, y: 0 }}
                    textAlign="left"
                  />
                </p>
              </div>
            </div>

            {/* Right Column: Avatar Flip Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              style={{
                flex: '1 1 300px',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '4.5rem',
                perspective: '1000px'
              }}
            >
              <motion.div
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                style={{
                  width: '100%',
                  maxWidth: '380px',
                  height: '380px',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  cursor: 'pointer'
                }}
              >
                {/* Front */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                }}>
                  <img src={avata} alt="Stylized Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* Back */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  transform: 'rotateY(180deg)'
                }}>
                  <img src={avataReal} alt="Real Photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Divider */}
          <hr className="section-divider" />

          {/* ═══ TECH STACK ═══ */}
          <Section title="🛠 Tech Stack">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '0.5rem' }}>
              <TechCategory label="📜 Languages" techs={LANGUAGES} />
              <TechCategory label="🚀 Frameworks & Libraries" techs={FRAMEWORKS} />
              <TechCategory label="🗄️ Databases & Caching" techs={DATABASES} />
              <TechCategory label="☁️ Cloud & DevOps" techs={CLOUD} />
              <TechCategory label="🛠️ Dev Tools & Integrations" techs={TOOLS} />

              {/* AI & Data Processing */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500 }}>🤖 AI & Data Processing</span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer"><motion.img whileHover={{ scale: 1.1, translateY: -2 }} src="https://img.shields.io/badge/Gemini-%238E75B2.svg?style=for-the-badge&logo=googlebard&logoColor=white" height="32" alt="Gemini" /></a>
                  <a href="https://chat.openai.com/" target="_blank" rel="noopener noreferrer"><motion.img whileHover={{ scale: 1.1, translateY: -2 }} src="https://img.shields.io/badge/ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white" height="32" alt="ChatGPT" /></a>
                  <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer"><motion.img whileHover={{ scale: 1.1, translateY: -2 }} src="https://img.shields.io/badge/Claude_AI-D97757?style=for-the-badge&logo=anthropic&logoColor=white" height="32" alt="Claude" /></a>
                  <a href="https://cursor.sh/" target="_blank" rel="noopener noreferrer"><motion.img whileHover={{ scale: 1.1, translateY: -2 }} src="https://img.shields.io/badge/Cursor-000000?style=for-the-badge&logo=cursor&logoColor=white" height="32" alt="Cursor" /></a>
                  <a href="#" rel="noopener noreferrer"><motion.img whileHover={{ scale: 1.1, translateY: -2 }} src="https://img.shields.io/badge/Antigravity-4285F4?style=for-the-badge&logo=google&logoColor=white" height="32" alt="Antigravity" /></a>
                </div>
              </div>
            </div>
          </Section>

          {/* Divider */}
          <hr className="section-divider" />

          {/* ═══ WAKATIME ═══ */}
          <Section title="📊 This Week I Spent My Time On">
            <div style={{ paddingTop: '0.5rem' }}>
              {wakaEntries.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
                  {wakaEntries.map((entry, i) => (
                    <WakaBar key={entry.name} entry={entry} index={i} />
                  ))}
                </div>
              ) : (
                <img
                  src="https://github-readme-stats.vercel.app/api/wakatime?username=tranduclongse&theme=radical&layout=compact&hide_border=true&bg_color=00000000"
                  alt="WakaTime Stats"
                  style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }}
                />
              )}
            </div>
          </Section>

          {/* Divider */}
          <hr className="section-divider" />

          {/* ═══ CONTRIBUTION GRAPH ═══ */}
          <Section title="📊 Contribution Graph">
            <div style={{ width: '100%', paddingTop: '0.5rem' }}>
              <div style={{ color: 'var(--text-secondary)' }}>
                <GitHubCalendar
                  username="tranduclong-se"
                  year={selectedYear}
                  colorScheme="dark"
                  blockSize={12}
                  blockMargin={4}
                  fontSize={14}
                  theme={{
                    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                    dark: ['#1b1f23', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                {[2026, 2025, 2024, 2023, 2022].map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    style={{
                      padding: '0.4rem 1.2rem',
                      borderRadius: '6px',
                      border: 'none',
                      background: selectedYear === year ? '#39d353' : '#21262d',
                      color: selectedYear === year ? '#000' : '#c9d1d9',
                      fontWeight: selectedYear === year ? 'bold' : 'normal',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </Section>

          {/* Divider */}
          <hr className="section-divider" />

          {/* ═══ GITHUB STATS ═══ */}
          <Section title="📊 GitHub Stats">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
              <img
                src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=tranduclong-se&theme=radical"
                alt="GitHub Profile Details"
                style={{ width: '100%', borderRadius: '12px' }}
              />
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                <img
                  src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=tranduclong-se&theme=radical"
                  alt="Repos per Language"
                  style={{ width: '48%', minWidth: '280px', borderRadius: '12px' }}
                />
                <img
                  src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=tranduclong-se&theme=radical"
                  alt="Most Commit Language"
                  style={{ width: '48%', minWidth: '280px', borderRadius: '12px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                <img
                  src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=tranduclong-se&theme=radical"
                  alt="GitHub Stats"
                  style={{ width: '48%', minWidth: '280px', borderRadius: '12px' }}
                />
                <img
                  src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=tranduclong-se&theme=radical&utcOffset=7"
                  alt="Productive Time"
                  style={{ width: '48%', minWidth: '280px', borderRadius: '12px' }}
                />
              </div>
            </div>
          </Section>

          {/* Divider */}
          <hr className="section-divider" />

          {/* ═══ LEETCODE ═══ */}
          <Section title="🧩 LeetCode Stats">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src="https://leetcard.jacoblin.cool/tranduclong-se?theme=dark&font=Ubuntu"
                alt="LeetCode Stats"
                style={{
                  width: '100%',
                  maxWidth: '550px',
                  borderRadius: '12px',
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5)) brightness(1.05)',
                }}
              />
            </div>
          </Section>



          {/* ═══ LANGUAGE SKILLS ═══ */}
          <Section title="🌐 Language Skills">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              maxWidth: '500px',
              paddingTop: '0.5rem',
            }}>
              <LanguageBar name="Vietnamese" level="Native" percent={100} color="linear-gradient(90deg, #da251d, #ff6b6b)" />
              <LanguageBar name="English" level="Professional Working Proficiency" percent={65} color="linear-gradient(90deg, #3b82f6, #60a5fa)" />
              <LanguageBar name="Japanese" level="JLPT N5 (Aiming for N3 in 2026)" percent={25} color="linear-gradient(90deg, #ef4444, #f97316)" />
            </div>
          </Section>

        </motion.div>
      </div>
    </div>
  );
};

export default About;
