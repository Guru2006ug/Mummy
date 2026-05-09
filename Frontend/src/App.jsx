import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, MailOpen, Stars } from 'lucide-react';
import './App.css';
import HeroBg from './assets/MotherDayHero.png';
import mom1 from './assets/mom1.jpg';
import mom2 from './assets/mom2.jpg';
import mom3 from './assets/mom3.jpg';
import mom4 from './assets/mom4.jpg';

// Fallback images in case the user hasn't added them yet, to prevent broken image icons
// We'll use the ones they are supposed to upload, but standard HTML img will show broken icon if missing.
// We can use a try-catch dynamic import or just standard imports and assume they exist.
// Assuming they will be added to src/assets as per the plan.

const REASONS = [
  'NagaJyothi, your voice turns any room into a safe harbor.',
  'Your love makes ordinary days feel golden.',
  'You are the steady hand behind every brave choice I make.',
  'You taught me tenderness without ever needing a lesson plan.',
  'You celebrate the small wins like they are fireworks.',
  'You listen with your whole heart, every single time.',
];

const MEMORIES = [
  {
    src: mom1,
    caption: 'Our Strength',
    fallbackColor: '#E8B4B8'
  },
  {
    src: mom2,
    caption: 'Santoor Santoor ma!!',
    fallbackColor: '#F3E5AB'
  },
  {
    src: mom3,
    caption: 'Ashirvad dedo sarkar',
    fallbackColor: '#F4D6D7'
  },
  {
    src: mom4,
    caption: 'Nenu Mummy Lucky Friends...!!',
    fallbackColor: '#C6898D'
  }
];

// Helper to handle missing images gracefully
const ImageWithFallback = ({ src, alt, caption, fallbackColor }) => {
  const [error, setError] = useState(false);

  return (
    <div className="gallery-item glass-panel" style={{ backgroundColor: fallbackColor }}>
      {!error ? (
        <img src={src} alt={alt} onError={() => setError(true)} loading="lazy" />
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,0.5)', flexDirection: 'column', gap: '10px', padding: '20px', textAlign: 'center' }}>
          <Stars size={32} />
          <p style={{ fontSize: '14px', fontFamily: 'Inter', margin: 0 }}>Image not found</p>
          <h3 style={{ fontFamily: 'Playfair Display', margin: 0, fontSize: '1.2rem', marginTop: '10px' }}>{caption}</h3>
        </div>
      )}
      <div className="gallery-overlay">
        <h3 className="gallery-caption">{caption}</h3>
      </div>
    </div>
  );
};

function App() {
  const [reasonIndex, setReasonIndex] = useState(0);
  const [hugCount, setHugCount] = useState(1);
  const [hugGlow, setHugGlow] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const handleReason = () => {
    setReasonIndex((index) => (index + 1) % REASONS.length);
  };

  const handleHug = (e) => {
    setHugCount((count) => count + 1);
    setHugGlow(true);

    // Spawn floating heart
    const newHeart = { id: Date.now(), x: e.clientX, y: e.clientY };
    setFloatingHearts(prev => [...prev, newHeart]);

    window.setTimeout(() => setHugGlow(false), 800);
    window.setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2000);
  };

  return (
    <div className="page">
      {/* Floating Hearts Container */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
        <AnimatePresence>
          {floatingHearts.map(heart => (
            <motion.div
              key={heart.id}
              initial={{ x: heart.x - 12, y: heart.y - 12, scale: 0.5, opacity: 1 }}
              animate={{ y: heart.y - 150, scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ position: 'absolute', color: '#E8B4B8' }}
            >
              <Heart fill="currentColor" size={24} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.header
        className="hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div className="hero-bg" style={{ y: yHero }}>
          <img src={HeroBg} alt="Floral Background" />
        </motion.div>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="eyebrow">A Tribute to NagaJyothi</p>
          <h1>The most loving place in the world is your heart.</h1>
          <p className="lead">
            This little corner of the internet is made with love, gratitude, and
            the softest affection for you, from your loving bangaru.
          </p>

          <div className="actions">
            <button
              type="button"
              className={`hug-button ${hugGlow ? 'glow' : ''}`}
              onClick={handleHug}
            >
              <Heart size={20} fill={hugGlow ? "white" : "transparent"} />
              Send a warm hug
            </button>
            <div className="hug-counter">
              Hugs sent <span>{hugCount}</span>
            </div>
          </div>
        </div>
      </motion.header>

      <motion.section
        className="memory-gallery"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <h2>Moments I carry with me</h2>
          <p className="soft">A beautiful journey of our strength and love together.</p>
        </div>
        <div className="gallery-grid">
          {MEMORIES.map((memory, index) => (
            <ImageWithFallback
              key={index}
              src={memory.src}
              alt={memory.caption}
              caption={memory.caption}
              fallbackColor={memory.fallbackColor}
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        className="letter-section"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <h2>A note just for you</h2>
          <p className="soft">Tap to read my heart.</p>
        </div>

        <motion.div
          className="letter-envelope"
          onClick={() => setLetterOpen(!letterOpen)}
          animate={letterOpen ? { height: 'auto', paddingBottom: '4rem' } : { height: '200px', overflow: 'hidden' }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="wax-seal">
            <MailOpen size={20} />
          </div>

          <AnimatePresence>
            {letterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="letter-content"
              >
                Dear NagaJyothi,
                <br /><br />
                Thank you for being my calm, my cheerleader, and my soft place to land. When we were in Aurangabad, you stood with me in my most critical exam moments and supported me with all your heart.
                <br /><br />
                And in Tirupati, you single-handedly took care of our family. Every day with you is a gentle reminder that love can be both strong and tender. I love you always, and I will definitely make you proud, ma.
                <br /><br />
                Happy Mother's Day.
                <div className="letter-signature">
                  Forever your loving bangaru.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!letterOpen && (
            <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--rose-dark)', fontFamily: 'Playfair Display', fontSize: '1.25rem', fontStyle: 'italic' }}>
              For Ma...
            </div>
          )}
        </motion.div>
      </motion.section>

      <footer className="footer">
        <p>Made with <Heart size={16} fill="var(--rose-dark)" color="var(--rose-dark)" /> always. — your loving bangaru</p>
      </footer>
    </div>
  );
}

export default App;
