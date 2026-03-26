import { useRef, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useMagneticCursor() {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 20, stiffness: 300 });
  const springY = useSpring(y, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const maxDistance = 100; // Zone magnétique de 100px

      if (distance < maxDistance) {
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const pullForce = (1 - distance / maxDistance) * 30;

        x.set(Math.cos(angle) * pullForce);
        y.set(Math.sin(angle) * pullForce);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  return { ref, springX, springY };
}
