import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { SkillsGrid } from '../3d/SkillsGrid';
import { ToolsGrid } from './ToolsGrid';
import skills from '../../content/skills.json';

export function SkillsSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="skills"
      className="relative w-full py-20 md:py-32 px-6 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-600/5 to-cyan-600/5 pointer-events-none" />

      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-electric-500/15 rounded-full blur-3xl opacity-30 animate-pulse"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-600/15 rounded-full blur-3xl opacity-30 animate-pulse"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section title and description */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-reveal-clip text-4xl md:text-5xl font-grotesk font-bold mb-16">
            {t('skills.title')}
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            {t('skills.description')}
          </p>
        </motion.div>

        {/* Skills Grid visualization - NEW WOW EFFECT */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SkillsGrid skills={skills as any} language={language} />
        </motion.div>

        {/* Tools section below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-16">
            <h2 className="text-reveal-clip text-4xl md:text-5xl font-grotesk font-bold text-center mb-2">
              {language === 'en' ? 'Tools & Technologies' : 'Outils & Technologies'}
            </h2>
            <p className="text-center text-gray-200 text-sm">
              {language === 'en' ? 'Hover over the icons to discover each tool' : 'Survolez les icônes pour découvrir chaque outil'}
            </p>
          </div>
          <ToolsGrid />
        </motion.div>
      </div>
    </section>
  );
}
