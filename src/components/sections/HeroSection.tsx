import { motion } from 'framer-motion';
import { HeroRightColumn } from './HeroRightColumn';
import { useLanguage } from '../../hooks/useLanguage';
import logoTg from '../../assets/logo/logo_tg.svg';

/**
 * HERO SECTION - Logo + Contenu avec fond dégradé global
 *
 * Structure:
 * - Fond: Gradient global harmonisé (bleu nuit → violet → rose)
 * - Swirls animés (optionnels): 5 éléments animés pour plus de dynamisme
 * - Logo TG: SVG importé à gauche, 300px × 300px
 * - Contenu: Titre, subtitle, bouton CTA à droite
 *
 * NOTE: Les swirls animés sont OPTIONNELS. Si vous préférez seulement le gradient
 * global sans animation, commentez les sections "Swirl 1-5" dans le code
 *
 * PERSONNALISATION:
 * - Taille logo: w-[300px] h-[300px] ligne 48
 * - Couleurs swirl: modifier les classes bg-gradient dans les motion.div
 * - Opacité: modifier opacity-40, opacity-50, etc.
 * - Gradient global: Modifiez src/index.css #root
 */

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0"
    >
      {/* Fond statique sombre - maintenant transparent pour voir le gradient global */}
      <div className="absolute inset-0 bg-transparent pointer-events-none" />

      {/* FOND ANIMÉ VIBRANT - 5 éléments colorés */}

      {/* Swirl 1 - Electric Blue (Large, Dynamic) */}
      <motion.div
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-electric-500 to-cyan-500 rounded-full blur-3xl opacity-40"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 80, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ pointerEvents: 'none' }}
      />

      {/* Swirl 2 - Neon Purple (Medium, Counter-direction) */}
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-neon-600 to-pink-500 rounded-full blur-3xl opacity-50"
        animate={{
          scale: [1.2, 0.8, 1.2],
          opacity: [0.4, 0.7, 0.4],
          x: [-60, 40, -60],
          y: [-80, 40, -80],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ pointerEvents: 'none' }}
      />

      {/* Swirl 3 - Cyan Accent (Small, Fast) */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-cyan-400 to-electric-500 rounded-full blur-2xl opacity-35"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.25, 0.5, 0.25],
          x: [-40, 60, -40],
          y: [20, -40, 20],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ pointerEvents: 'none' }}
      />

      {/* Swirl 4 - Pink/Orange (Large, Soft) */}
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500 to-orange-500 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.45, 0.2],
          x: [40, -50, 40],
          y: [-30, 50, -30],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ pointerEvents: 'none' }}
      />

      {/* Swirl 5 - Purple Accent (Moving Horizontally) */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-gradient-to-br from-neon-600/50 to-cyan-500/50 rounded-full blur-2xl opacity-40"
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.3, 0.55, 0.3],
          x: [-100, 100, -100],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{ pointerEvents: 'none' }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-0 h-full flex items-center justify-center">
        {/* Two-Column Layout: Logo Left, Content Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 w-full items-center">

          {/* LEFT COLUMN: Logo TG (SVG importé) */}
          <motion.div
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo TG - Importé depuis /src/assets/logo/logo_tg.svg
                Taille modifiable: w-[300px] h-[300px]
                Augmenter à w-[400px] ou diminuer à w-[250px] selon préférence
            */}
            <motion.img
              src={logoTg}
              alt="Logo Théo Gasner"
              className="w-[300px] h-[300px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] object-contain drop-shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>

          {/* RIGHT COLUMN: Texte, Titre, Subtitle, CTA */}
          <motion.div
            className="flex items-center justify-center lg:justify-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HeroRightColumn />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <p className="text-xs md:text-sm text-gray-400 font-light">{t('hero.scroll')}</p>
        <div className="w-6 h-10 border-2 border-electric-500/40 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-electric-500 rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
