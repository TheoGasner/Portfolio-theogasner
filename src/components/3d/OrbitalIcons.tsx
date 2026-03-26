import { motion } from 'framer-motion';

/**
 * OrbitalIcons - Affiche des icônes tournant autour d'un centre
 * Domaines: Communication, Stratégie, Design, Marketing, Digital
 *
 * À MODIFER: Éditer les icônes, couleurs et labels ci-dessous
 */

interface IconConfig {
  label: string;
  icon: string; // Emoji ou SVG
  color: string; // Tailwind color class
  angle: number; // Angle d'apparition
}

export function OrbitalIcons() {
  // TODO: Modifier ces icônes selon tes domaines
  const icons: IconConfig[] = [
    { label: 'Communication', icon: '💬', color: 'from-electric-500 to-cyan-500', angle: 0 },
    { label: 'Stratégie', icon: '🎯', color: 'from-neon-600 to-pink-500', angle: 72 },
    { label: 'Design', icon: '🎨', color: 'from-cyan-400 to-blue-600', angle: 144 },
    { label: 'Marketing', icon: '📊', color: 'from-pink-500 to-orange-500', angle: 216 },
    { label: 'Digital', icon: '💻', color: 'from-purple-600 to-neon-600', angle: 288 },
  ];

  // Rayon de l'orbite (en pixels)
  const orbitRadius = 180;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Centre - Cercle principal */}
      <motion.div
        className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-electric-500/10 to-neon-600/10 border-2 border-electric-500/30 flex items-center justify-center"
        animate={{
          boxShadow: [
            '0 0 40px rgba(14, 165, 233, 0.3)',
            '0 0 60px rgba(14, 165, 233, 0.6)',
            '0 0 40px rgba(14, 165, 233, 0.3)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="text-3xl md:text-4xl">✨</span>
      </motion.div>

      {/* Orbite (cercle guide) */}
      <div
        className="absolute border border-electric-500/10 rounded-full"
        style={{
          width: `${orbitRadius * 2}px`,
          height: `${orbitRadius * 2}px`,
        }}
      />

      {/* Icônes tournantes */}
      {icons.map((item, index) => {
        // Convertir l'angle en radians et calculer la position X/Y
        const angleRad = (item.angle * Math.PI) / 180;
        const x = orbitRadius * Math.cos(angleRad);
        const y = orbitRadius * Math.sin(angleRad);

        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x, y, opacity: 1 }}
            transition={{
              duration: 1 + index * 0.2,
              ease: 'easeOut',
            }}
          >
            {/* Rotation globale du groupe d'icônes */}
            <motion.div
              className="flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ x: -x, y: -y }}
            >
              {/* Carte d'icône individuelle */}
              <motion.div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl md:text-3xl shadow-lg cursor-pointer border border-white/20`}
                whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(14, 165, 233, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
              </motion.div>

              {/* Label au hover (optionnel) */}
              <motion.div
                className="absolute -bottom-10 text-xs font-semibold text-gray-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {item.label}
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
