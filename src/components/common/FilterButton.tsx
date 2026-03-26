import { motion } from 'framer-motion';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

/**
 * FilterButton - Bouton de filtre réutilisable
 *
 * Props:
 * - label: Text affiché sur le bouton
 * - isActive: Boolean indiquant si le filtre est sélectionné
 * - onClick: Callback au clic
 *
 * Styles:
 * - Bouton inactif: fond transparent, bordure electric-500/50
 * - Bouton actif: fond gradient electric→neon, bordure electric-500
 * - Animations: Transition smooth et glow effect au hover
 */
export function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold text-sm md:text-base
        transition-all duration-300 border
        ${
          isActive
            ? 'bg-gradient-to-r from-electric-500 to-neon-600 text-white border-electric-500 shadow-lg'
            : 'bg-transparent text-gray-200 border-electric-500/50 hover:border-electric-500 hover:text-electric-400'
        }
      `}
    >
      {/* Underline animation for active state */}
      {isActive && (
        <motion.div
          layoutId="underline"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-500 to-neon-600"
          transition={{ duration: 0.3 }}
        />
      )}
      {label}
    </motion.button>
  );
}
