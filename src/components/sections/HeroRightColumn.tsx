import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

export function HeroRightColumn() {
  const { t } = useLanguage();
  const [displayedText, setDisplayedText] = useState('');
  const subtitleText = t('hero.subtitle');

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

  // Scroll to projects section supprimé — bouton remplacé par lien CV

  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-2 px-6 md:px-0"
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
      <motion.a
        href="/CV-Theo-Gasner.pdf"
        download
        className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/30 backdrop-blur-sm hover:bg-gradient-to-r hover:from-electric-600/80 hover:via-cyan-600/80 hover:to-neon-700/80 hover:border-transparent transition-all duration-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 0.8, delay: 0.9 },
          scale:   { duration: 0.8, delay: 0.9 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        </svg>
        {t('hero.cta')}
      </motion.a>
    </motion.div>
  );
}
