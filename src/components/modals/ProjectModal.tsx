import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  context?: string;
  role?: string;
  tools?: string[];
  results?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.3 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onClick={onClose}
          >
            {/* Modal container */}
            <motion.div
              className="relative bg-gradient-to-br from-gray-900 via-dark-800 to-dark-900 border border-electric-500/20 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              layout
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-electric-500/10 hover:bg-electric-500/20 border border-electric-500/30 rounded-full flex items-center justify-center transition-all duration-200"
              >
                <svg
                  className="w-6 h-6 text-electric-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Image */}
                <motion.div
                  className="mb-8 rounded-xl overflow-hidden border border-electric-500/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>

                {/* Title and category */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-xs font-semibold text-electric-400 bg-electric-500/10 border border-electric-500/30 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-grotesk font-bold mb-4">
                    {project.title}
                  </h2>
                  <p className="text-lg text-gray-300 mb-8">
                    {project.description}
                  </p>
                </motion.div>

                {/* Context */}
                {project.context && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h3 className="text-sm font-semibold text-neon-400 uppercase tracking-wide mb-2">
                      Contexte
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {project.context}
                    </p>
                  </motion.div>
                )}

                {/* Role */}
                {project.role && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                    <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-2">
                      Rôle
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {project.role}
                    </p>
                  </motion.div>
                )}

                {/* Tools */}
                {project.tools && project.tools.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <h3 className="text-sm font-semibold text-electric-400 uppercase tracking-wide mb-3">
                      Outils & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm text-gray-300 border border-electric-500/30 rounded-full bg-electric-500/5 hover:bg-electric-500/10 transition-colors"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Results */}
                {project.results && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                    <h3 className="text-sm font-semibold text-neon-400 uppercase tracking-wide mb-2">
                      Résultats
                    </h3>
                    <p className="text-gray-300">
                      {project.results}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
