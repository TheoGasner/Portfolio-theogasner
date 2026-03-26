import { motion } from 'framer-motion';
import logo from '../../assets/logo/logo_tg.svg';

export function AnimatedLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mb-8 flex justify-center"
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-electric-500/30 to-neon-600/30 rounded-full blur-3xl opacity-60" />

        {/* Rotating ring */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent border-t-electric-500 border-r-neon-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Logo image */}
        <motion.img
          src={logo}
          alt="Logo Théo Gasner"
          className="relative z-10 w-full h-full object-contain filter brightness-0 invert drop-shadow-lg"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{
            scale: 1.15,
            transition: { duration: 0.3 },
          }}
        />

        {/* Pulsing outer glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-electric-500/20 to-neon-600/20 rounded-full"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
}
