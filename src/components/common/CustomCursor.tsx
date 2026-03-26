import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 35, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Curseur principal - petite croix élégante */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: '-50%',
          y: '-50%',
          width: 24,
          height: 24,
          zIndex: 9999,
        }}
      >
        {/* Ligne horizontale */}
        <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transform -translate-y-1/2" />
        {/* Ligne verticale */}
        <div className="absolute left-1/2 top-0 h-6 w-0.5 bg-gradient-to-b from-transparent via-white to-transparent transform -translate-x-1/2" />
        {/* Point central */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-white/80" />
      </motion.div>

      {/* Curseur extérieur - aura subtile */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: '-50%',
          y: '-50%',
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 0 25px rgba(255, 255, 255, 0.3)',
          zIndex: 9998,
        }}
      />
    </>
  );
}
