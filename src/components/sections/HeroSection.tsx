import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { HeroRightColumn } from './HeroRightColumn';
import { useLanguage } from '../../hooks/useLanguage';
import logoTg from '../../assets/logo/logo_tg.svg';

export function HeroSection() {
  const { t } = useLanguage();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-500, 500], [30, -30]), { stiffness: 120, damping: 15 });
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-30, 30]), { stiffness: 120, damping: 15 });
  const scale   = useSpring(useTransform(
    mouseX,
    [-500, 0, 500],
    [1.05, 1, 1.05]
  ), { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set(e.clientX - cx);
    mouseY.set(e.clientY - cy);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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
            style={{ perspective: 600, transformStyle: 'preserve-3d' }}
          >
            <motion.img
              src={logoTg}
              alt="Logo Théo Gasner"
              className="w-[300px] h-[300px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] object-contain drop-shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              style={{
                rotateX,
                rotateY,
                scale,
                transformStyle: 'preserve-3d',
                filter: 'drop-shadow(0 0 40px rgba(14,165,233,0.35))',
              }}
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
        <p className="text-xs md:text-sm text-gray-200 font-light">{t('hero.scroll')}</p>
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
