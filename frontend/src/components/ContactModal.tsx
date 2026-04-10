import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, MessageSquare, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface FormData {
  name: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  name: '',
  message: '',
};

// Use environment variables for security
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.25 },
  },
};

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const text = [
        `📬 *New Portfolio Message*`,
        ``,
        `👤 *From:* ${form.name}`,
        ``,
        `💬 *Message:*`,
        form.message,
        ``,
        `⏰ ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}`,
      ].join('\n');

      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text,
            parse_mode: 'Markdown',
          }),
        }
      );

      const result: { ok: boolean } = await response.json();

      if (result.ok) {
        setStatus('success');
        setForm(INITIAL_FORM);
        setTimeout(() => {
          setStatus('idle');
          onClose();
        }, 3000);
      } else {
        throw new Error('Telegram API failed');
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const getFieldStyle = (fieldName: string): React.CSSProperties => ({
    width: '100%',
    padding: '14px 16px 14px 44px',
    background: focusedField === fieldName
      ? 'rgba(139, 92, 246, 0.06)'
      : 'rgba(255, 255, 255, 0.04)',
    border: `1px solid ${focusedField === fieldName
      ? 'rgba(139, 92, 246, 0.4)'
      : 'rgba(255, 255, 255, 0.08)'
      }`,
    borderRadius: '12px',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'all 0.3s ease',
    resize: 'none' as const,
  });

  const iconStyle = (fieldName: string): React.CSSProperties => ({
    position: 'absolute',
    left: '14px',
    top: fieldName === 'message' ? '16px' : '50%',
    transform: fieldName === 'message' ? 'none' : 'translateY(-50%)',
    color: focusedField === fieldName
      ? 'var(--accent-primary)'
      : 'var(--text-secondary)',
    transition: 'color 0.3s ease',
    pointerEvents: 'none',
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="contact-modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOverlayClick}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '1rem',
          }}
        >
          <motion.div
            ref={modalRef}
            className="contact-modal"
            variants={modalVariants}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px',
              background: 'rgba(15, 15, 20, 0.92)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: '0 32px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.05)',
              overflow: 'hidden',
            }}
          >
            {/* Accent glows */}
            <div style={{
              position: 'absolute', top: '-60px', right: '-60px',
              width: '200px', height: '200px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0, 136, 204, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: '-40px', left: '-40px',
              width: '160px', height: '160px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Close button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px', width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-secondary)', zIndex: 2,
              }}
            >
              <X size={18} />
            </motion.button>

            {/* Header */}
            <div style={{ position: 'relative', zIndex: 1, marginBottom: '1.5rem' }}>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{
                  fontSize: '1.6rem', fontWeight: 700,
                  color: 'var(--text-primary)', margin: 0,
                  fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em',
                }}
              >
                Let's Talk! 💬
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                style={{
                  color: 'var(--text-secondary)', fontSize: '0.9rem',
                  marginTop: '0.5rem', lineHeight: 1.5,
                }}
              >
                Send me a message — I'll receive it instantly on Telegram!
              </motion.p>
            </div>

            {/* Success */}
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '1rem', padding: '2rem 0', position: 'relative', zIndex: 1,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                >
                  <CheckCircle2 size={56} color="#4ade80" />
                </motion.div>
                <p style={{ color: '#4ade80', fontWeight: 600, fontSize: '1.1rem' }}>
                  Message sent successfully! ✈️
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center' }}>
                  Thank you! I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '1rem', padding: '2rem 0', position: 'relative', zIndex: 1,
                }}
              >
                <AlertCircle size={56} color="#f87171" />
                <p style={{ color: '#f87171', fontWeight: 600 }}>Something went wrong</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Please try again or message me directly via Telegram.
                </p>
              </motion.div>
            ) : (
              /* Form — Name + Message */
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  display: 'flex', flexDirection: 'column', gap: '1rem',
                  position: 'relative', zIndex: 1,
                }}
              >
                {/* Name */}
                <div style={{ position: 'relative' }}>
                  <User size={18} style={iconStyle('name')} />
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your name, phone number or email..."
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    style={getFieldStyle('name')}
                  />
                </div>

                {/* Message */}
                <div style={{ position: 'relative' }}>
                  <MessageSquare size={18} style={iconStyle('message')} />
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Drop me a message! Don't forget to leave your phone number, email or social handle if you'd like a response."
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    style={getFieldStyle('message')}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0, 136, 204, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #0088cc, #229ED9)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '0.5rem',
                    opacity: status === 'sending' ? 0.7 : 1,
                    transition: 'opacity 0.3s ease',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Loader2 size={18} />
                      </motion.div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Direct Telegram link */}
                <p style={{
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  marginTop: '0.25rem',
                }}>
                  Or message me directly via{' '}
                  <a
                    href="https://t.me/Ryuu_Tran"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#229ED9',
                      textDecoration: 'underline',
                      textUnderlineOffset: '2px',
                    }}
                  >
                    Telegram
                  </a>
                </p>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
