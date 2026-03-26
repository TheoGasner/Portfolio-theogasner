import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLanguage } from '../../hooks/useLanguage';
import { GlassCard } from '../common';
import texts from '../../content/text.json';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSection() {
  const { language, t } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineRef.current) {
      ScrollTrigger.refresh();
    }

    return () => {
      ScrollTrigger.refresh();
    };
  }, [language]);

  const timeline = texts[language as 'fr' | 'en'].about.timeline;

  return (
    <section
      id="experience"
      className="relative w-full py-20 md:py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section title */}
        <motion.h2
          className="text-reveal-clip text-4xl md:text-5xl font-grotesk font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('about.experience')}
        </motion.h2>

        {/* Timeline */}
        <div ref={timelineRef} className="space-y-8 relative">
          {/* Vertical line — animates as you scroll */}
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-electric-500 via-neon-600 to-cyan-500 rounded-full md:-translate-x-1/2"
            initial={{ height: '0%' }}
            whileInView={{ height: '100%' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {timeline.slice(3, 6).map((item: any, index: number) => (
            <motion.div
              key={index}
              className="timeline-item ml-12 md:ml-0 md:w-1/2 md:even:ml-auto md:even:text-right md:even:pr-12 md:odd:pl-12 md:odd:ml-0"
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              {/* Timeline dot - REMOVED */}

              <GlassCard className="p-6 hover:shadow-glow-lg transition-all">
                <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-2">
                  {item.date}
                </p>
                <h3 className="text-xl font-grotesk font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-200">
                  {item.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
