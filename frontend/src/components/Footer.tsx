import { Github, Linkedin, Facebook, Send, Instagram, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface SocialLink {
  readonly icon: React.ComponentType<{ size: number }>;
  readonly href: string;
  readonly label: string;
}

const socialLinks: readonly SocialLink[] = [
  { icon: Github, href: 'https://github.com/tranduclong-se', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/tranduclongse-tdmu', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://www.facebook.com/longtran.530215', label: 'Facebook' },
  { icon: Send, href: 'https://t.me/Ryuu_Tran', label: 'Telegram' },
  { icon: Instagram, href: 'https://www.instagram.com/itlong30102003', label: 'Instagram' },
  { icon: Mail, href: 'mailto:tranduclong.se@gmail.com', label: 'Email' },
] as const;

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="footer-content">
        <div className="footer-social">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>
          Built with ❤️ by{' '}
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Trần Đức Long</span>
        </p>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', margin: 0 }}>
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
