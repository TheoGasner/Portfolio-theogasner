import { motion } from 'framer-motion';

// Étoiles fixes scintillantes
const TWINKLE_STARS = Array.from({ length: 500 }, (_, i) => ({
  id: `twinkle-${i}`,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: 3 + Math.random() * 2,
  delay: Math.random() * 3,
}));

// Étoiles filantes occasionnelles
const SHOOTING_STARS = Array.from({ length: 12 }, (_, i) => ({
  id: `shooting-${i}`,
  startX: Math.random() * 100,
  startY: Math.random() * 100,
  delay: Math.random() * 50 + 15, // Entre 15 et 65 secondes de délai aléatoire
  duration: 1.5 + Math.random() * 0.5, // 1.5-2 secondes
  angle: Math.random() * 360, // Direction aléatoire
  distance: 150 + Math.random() * 100, // Distance variable
}));

export function ShootingStars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Étoiles fixes scintillantes */}
      {TWINKLE_STARS.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Étoiles filantes sporadiques avec traînée */}
      {SHOOTING_STARS.map((star) => {
        const radians = (star.angle * Math.PI) / 180;
        const endX = Math.cos(radians) * star.distance;
        const endY = Math.sin(radians) * star.distance;

        return (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.8))',
            }}
            initial={{
              opacity: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              x: endX,
              y: endY,
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: 30 - star.delay, // Espace entre les répétitions pour total ~30s
              ease: 'easeOut',
            }}
          >
            {/* Core de l'étoile filante */}
            <div className="w-1 h-1 bg-white rounded-full blur-sm" />

            {/* Traînée/tail */}
            <motion.div
              className="absolute -top-0.5 -left-12 w-12 h-0.5 bg-gradient-to-l from-cyan-400 via-cyan-400/50 to-transparent rounded-full"
              animate={{
                opacity: [1, 0],
              }}
              transition={{
                duration: star.duration,
                ease: 'easeOut',
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
