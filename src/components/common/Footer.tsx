import { motion } from 'framer-motion';
import { useState } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('gasnertheo@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { label: 'Accueil', href: '#home' },
    { label: 'À propos', href: '#about' },
    { label: 'Projets', href: '#projects' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-dark-950 border-t border-white/5">

      {/* Ligne décorative haut */}
      <div className="h-px bg-gradient-to-r from-transparent via-electric-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-10">

        {/* Layout 3 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12 items-start">

          {/* Colonne gauche : Identité */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-electric-400 mb-3">
              Portfolio
            </span>
            <h2 className="font-grotesk font-bold text-2xl md:text-3xl mb-3">
              <span className="bg-gradient-to-r from-electric-400 via-cyan-300 to-neon-400 bg-clip-text text-transparent">
                Théo Gasner
              </span>
            </h2>
            <p className="text-gray-200 text-sm leading-relaxed max-w-[220px]">
              Stratégie de communication · Design d'expérience · Création digitale
            </p>
          </motion.div>

          {/* Colonne centre : Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:flex md:flex-col md:items-center"
          >
            <h4 className="text-xs font-semibold tracking-widest uppercase text-electric-400 mb-5">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-200 hover:text-electric-400 transition-colors relative group w-fit"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-electric-500 to-neon-600 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Colonne droite : Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:flex md:flex-col md:items-end"
          >
            <h4 className="text-xs font-semibold tracking-widest uppercase text-electric-400 mb-5">
              Contact
            </h4>
            <div className="flex flex-col gap-3 md:items-end">
              <button
                onClick={copyEmail}
                className="relative group flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-electric-500/40 hover:bg-electric-500/10 transition-all text-sm text-gray-200 hover:text-electric-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z" />
                </svg>
                {copied ? <span className="text-electric-400 font-semibold">Copié !</span> : 'gasnertheo@gmail.com'}
              </button>
              <a
                href="https://www.linkedin.com/in/th%C3%A9o-gasner-a6758129a/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 transition-all text-sm text-gray-200 hover:text-[#0A66C2]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>

        {/* Séparateur */}
        <div className="h-px bg-gradient-to-r from-transparent via-electric-500/25 to-transparent mb-8" />

        {/* Bas de page */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>© {currentYear} Théo Gasner. Tous droits réservés.</p>
          <p className="text-gray-300/50">
            Fait avec <span className="text-neon-500">♥</span> · React · Vite · Tailwind
          </p>
        </motion.div>
      </div>
    </footer>
  );
}