import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';

export function HeroRightColumn() {
  const { t } = useLanguage();

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
        className="text-4xl md:text-5xl font-grotesk font-bold text-center max-w-lg leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {t('hero.title')}
      </motion.h1>

      {/* Separator Line */}
      <motion.div
        className="h-1 w-12 bg-gradient-to-r from-electric-500 to-neon-600 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />

      {/* Subtitle */}
      <motion.p
        className="text-base md:text-lg text-gray-300/80 text-center max-w-md font-light leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        {t('hero.subtitle')}
      </motion.p>

      {/* CTA Button */}
      <motion.button
        className="px-8 py-3 bg-gradient-to-r from-electric-500 to-neon-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-electric-500/50 mt-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 30px rgba(14, 165, 233, 0.6)',
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCTAClick}
      >
        {t('hero.cta')}
      </motion.button>
    </motion.div>
  );
}
