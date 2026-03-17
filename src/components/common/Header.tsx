import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import logo from '../../assets/logo/logo_tg.svg';

export function Header() {
  const { language, switchLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = t('header.nav');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500" style={{ paddingTop: isScrolled ? '8px' : '16px' }}>
      {/* Premium container - Centered, Rounded, Semi-transparent */}
      <motion.div
        className={`relative transition-all duration-500 ${
          isScrolled
            ? 'w-full max-w-4xl'
            : 'w-full max-w-5xl'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Backdrop blur container with rounded corners */}
        <div
          className={`relative rounded-2xl backdrop-blur-md border transition-all duration-500 ${
            isScrolled
              ? 'bg-dark-900/60 border-electric-500/15 py-3'
              : 'bg-dark-900/40 border-electric-500/10 py-4'
          }`}
        >
          {/* Optional glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-electric-500/5 via-transparent to-neon-600/5 pointer-events-none" />

          {/* Content wrapper */}
          <nav className="relative z-10 flex items-center justify-between px-6">
            {/* Logo - Left */}
            <motion.button
              onClick={() => scrollToSection('home')}
              className="flex-shrink-0 group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`transition-all duration-500 ${
                  isScrolled ? 'w-8 h-8' : 'w-10 h-10'
                }`}
              >
                {/* Subtle halo effect around logo */}
                <div className="absolute inset-0 bg-gradient-to-br from-electric-500/20 to-neon-600/20 rounded-full blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100" />
                <img
                  src={logo}
                  alt="Logo TG"
                  className="relative w-full h-full object-contain filter drop-shadow-lg"
                />
              </div>
            </motion.button>

            {/* Desktop Navigation - Full inline menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item: string, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 relative pb-0.5 ${
                    activeSection === item.toLowerCase()
                      ? 'text-electric-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                  {/* Underline animation */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-electric-500 to-neon-600 transition-all duration-300 ${
                      activeSection === item.toLowerCase() ? 'w-full' : 'w-0'
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            {/* Right side - Language Switcher (Desktop) & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Desktop Language Switcher */}
              <div className="hidden md:flex items-center gap-2">
                <motion.button
                  onClick={() => switchLanguage('fr')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-300 ${
                    language === 'fr'
                      ? 'bg-electric-500/20 text-electric-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  FR
                </motion.button>
                <span className="text-gray-600">/</span>
                <motion.button
                  onClick={() => switchLanguage('en')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-neon-500/20 text-neon-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  EN
                </motion.button>
              </div>

              {/* Mobile Menu Button - Only visible on mobile */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Hamburger icon */}
                <motion.span
                  className="w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center"
                  animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-current rounded-full transition-all duration-300"
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center"
                  animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                />
              </motion.button>
            </div>
          </nav>
        </div>

        {/* Mobile Dropdown Menu - Only appears on mobile */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute top-full left-0 right-0 mt-3 rounded-2xl backdrop-blur-md bg-dark-900/80 border border-electric-500/15 overflow-hidden md:hidden"
            >
              {/* Menu items */}
              <div className="py-4 px-6 space-y-3">
                {/* Navigation items */}
                {navItems.map((item: string, index: number) => (
                  <motion.button
                    key={index}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`w-full text-left text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
                      activeSection === item.toLowerCase()
                        ? 'bg-electric-500/20 text-electric-400'
                        : 'text-gray-300 hover:bg-dark-800/50 hover:text-white'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item}
                  </motion.button>
                ))}

                {/* Divider */}
                <div className="my-3 h-px bg-gradient-to-r from-electric-500/0 via-electric-500/20 to-electric-500/0" />

                {/* Language Switcher - Mobile */}
                <div className="flex items-center gap-2 py-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase">Langue</span>
                  <div className="flex-1" />
                  <motion.button
                    onClick={() => switchLanguage('fr')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 ${
                      language === 'fr'
                        ? 'bg-electric-500/20 text-electric-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    FR
                  </motion.button>
                  <span className="text-gray-600">/</span>
                  <motion.button
                    onClick={() => switchLanguage('en')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 ${
                      language === 'en'
                        ? 'bg-neon-500/20 text-neon-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    EN
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Close menu on scroll or click outside */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />
      </motion.div>
    </header>
  );
}
