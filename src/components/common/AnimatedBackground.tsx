import { motion } from 'framer-motion';

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: (i * 13 + 7) % 100,
  y: (i * 19 + 11) % 100,
  size: (i % 3) + 1,
  duration: 8 + (i % 7) * 2,
  delay: (i % 5) * 0.8,
  amplitude: 15 + (i % 4) * 10,
}));

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
  delay: Math.random() * 50 + 15, // Entre 15 et 65 secondes de délai
  duration: 1.5 + Math.random() * 0.5,
  angle: Math.random() * 360,
  distance: 150 + Math.random() * 100,
}));

// Éclairs d'énergie occasionnels
const ENERGY_BOLTS = Array.from({ length: 4 }, (_, i) => ({
  id: `bolt-${i}`,
  startX: Math.random() * 100,
  startY: Math.random() * 100,
  endX: Math.random() * 100,
  endY: Math.random() * 100,
  delay: Math.random() * 40 + 20,
  duration: 1.2,
}));

// Formes géométriques flottantes
const FLOATING_SHAPES = Array.from({ length: 6 }, (_, i) => ({
  id: `shape-${i}`,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 20 + Math.random() * 40,
  delay: i * 0.5,
  duration: 15 + Math.random() * 10,
  borderRadius: Math.random() > 0.5 ? '50%' : '20%',
}));

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ background: 'linear-gradient(135deg, #0D2137 0%, #3A1E5D 50%, #7F3FF1 100%)' }}>
      {/* Swirl 1 - Electric Blue */}
      <motion.div
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-electric-500 to-cyan-500 rounded-full blur-3xl opacity-40"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 80, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Swirl 2 - Neon Purple */}
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-neon-600 to-pink-500 rounded-full blur-3xl opacity-50"
        animate={{
          scale: [1.2, 0.8, 1.2],
          opacity: [0.4, 0.7, 0.4],
          x: [-60, 40, -60],
          y: [-80, 40, -80],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Swirl 3 - Cyan Accent */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-cyan-400 to-electric-500 rounded-full blur-2xl opacity-35"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.25, 0.5, 0.25],
          x: [-40, 60, -40],
          y: [20, -40, 20],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Swirl 4 - Pink/Orange */}
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500 to-orange-500 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.45, 0.2],
          x: [40, -50, 40],
          y: [-30, 50, -30],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Swirl 5 - Purple Accent */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-gradient-to-br from-neon-600/50 to-cyan-500/50 rounded-full blur-2xl opacity-40"
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.3, 0.55, 0.3],
          x: [-100, 100, -100],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [-p.amplitude, p.amplitude, -p.amplitude],
            x: [-p.amplitude / 2, p.amplitude / 2, -p.amplitude / 2],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}

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
              repeatDelay: 30 - star.delay,
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

      {/* Aurores légères - background glow */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-1/3 bg-gradient-to-r from-cyan-400/10 via-transparent to-purple-500/10 blur-3xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Formes géométriques flottantes */}
      {FLOATING_SHAPES.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute border border-cyan-400/20"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            borderRadius: shape.borderRadius,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Éclairs d'énergie occasionnels */}
      {ENERGY_BOLTS.map((bolt) => (
        <motion.div
          key={bolt.id}
          className="absolute"
          style={{
            left: `${bolt.startX}%`,
            top: `${bolt.startY}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: bolt.duration,
            delay: bolt.delay,
            repeat: Infinity,
            repeatDelay: 25,
          }}
        >
          <svg width="200" height="2" className="absolute -left-32" style={{ filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.6))' }}>
            <line x1="0" y1="1" x2="200" y2="1" stroke="url(#gradBolt)" strokeWidth="1" />
            <defs>
              <linearGradient id="gradBolt" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
                <stop offset="50%" stopColor="rgba(34, 211, 238, 1)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
