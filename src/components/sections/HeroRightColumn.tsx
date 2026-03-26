import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useMagneticCursor } from '../../hooks/useMagneticCursor';

export function HeroRightColumn() {
  const { t } = useLanguage();
  const [displayedText, setDisplayedText] = useState('');
  const subtitleText = t('hero.subtitle');
  const magneticButton = useMagneticCursor();

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < subtitleText.length) {
        setDisplayedText(subtitleText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [subtitleText]);

  // Scroll to projects section
  const handleCTAClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-8 px-6 md:px-0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-grotesk font-bold text-center max-w-lg leading-tight text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {t('hero.title')}
      </motion.h1>

      {/* Separator Line - breathes in width */}
      <motion.div
        className="h-1 bg-gradient-to-r from-electric-500 to-neon-600 rounded-full"
        initial={{ scaleX: 0, width: '3rem' }}
        animate={{ scaleX: 1, width: ['3rem', '6rem', '3rem'] }}
        transition={{
          scaleX: { duration: 0.8, delay: 0.5, ease: 'easeOut' },
          width: { duration: 3, delay: 1.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Subtitle — typewriter effect */}
      <motion.p
        className="text-base md:text-lg text-gray-200/80 text-center max-w-md font-light leading-relaxed h-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        {displayedText}
        {displayedText.length < subtitleText.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="inline-block w-2 h-6 bg-electric-500 ml-1 align-middle"
          />
        )}
      </motion.p>

      {/* CTA Button */}
      <motion.button
        ref={magneticButton.ref}
        className="px-8 py-3 bg-gradient-to-r from-electric-500 to-neon-600 text-white font-semibold rounded-lg border border-electric-500/50 mt-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.9 },
          scale:   { duration: 0.8, delay: 0.9 },
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          x: magneticButton.springX,
          y: magneticButton.springY,
        }}
        onClick={handleCTAClick}
      >
        {t('hero.cta')}
      </motion.button>
    </motion.div>
  );
}
