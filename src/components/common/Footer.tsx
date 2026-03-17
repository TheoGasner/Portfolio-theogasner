import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-dark-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-grotesk font-bold text-xl text-white mb-4">
              Théo Gasner
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Créateur de stratégies de communication et d'expériences digitales innovantes.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2">
              {['Accueil', 'À propos', 'Projets', 'Compétences'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-electric-400 transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:gasnertheo@gmail.com"
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm block"
              >
                gasnertheo@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/theo-gasner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-400 transition-colors text-sm block"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-electric-500/30 to-transparent mb-8" />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-500 text-xs text-center md:text-left mb-4 md:mb-0">
            © {currentYear} Théo Gasner. Tous droits réservés.
          </p>
          <p className="text-gray-600 text-xs">
            Créé avec <span className="text-neon-500">♥</span> • React • Vite • Tailwind • GSAP
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
