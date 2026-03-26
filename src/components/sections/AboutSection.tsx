import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import profileImg from '../../assets/images/profile.JPG';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLanguage } from '../../hooks/useLanguage';
import { GlassCard } from '../common';
import texts from '../../content/text.json';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

/**
 * ABOUT SECTION - Portrait immersif avec biographie et expertise
 *
 * Structure:
 * - Gauche: Image agrandie (400-500px) avec halo et ombre portée
 * - Droite: Biographie, domaines d'expertise stylisés
 * - Bas: Timeline des formations et expériences
 *
 * PERSONNALISATION:
 * - Taille image: modifier max-w-sm/md/lg à la ligne 75
 * - Halo: modifier opacity-60 (couleur) et blur-3xl (intensité) ligne 79
 * - Tags: couleurs et styles à la ligne 120-130
 * - Photo: chemin à vérifier /src/assets/images/profile.JPG
 */

export function AboutSection() {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'top 20%',
            markers: false,
          },
        }
      );
    }
  }, [language]);

  const timeline = texts[language as 'fr' | 'en'].about.timeline;
  const skills = texts[language as 'fr' | 'en'].about.skills;
  const interests = texts[language as 'fr' | 'en'].about.interests;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-20 md:py-32 px-6 overflow-hidden"
    >
      {/* Subtle background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent pointer-events-none" />

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto">
        {/* ==================== SECTION TITLE ==================== */}
        <motion.h2
          className="text-reveal-clip text-4xl md:text-5xl font-grotesk font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('about.title')}
        </motion.h2>

        {/* ==================== MAIN CONTENT (Image + Bio) ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">

          {/* ========== LEFT COLUMN: ENLARGED PORTRAIT ========== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              className="relative w-full max-w-md"
            >

              {/*
                HALO EFFECT - Customize here:
                - Change opacity-60 to opacity-40 (dimmer) or opacity-80 (brighter)
                - Change blur-3xl to blur-2xl (sharper) or blur-[50px] (softer)
                - Adjust from-electric-500/30 and to-neon-600/30 for different colors
              */}
              <div className="absolute -inset-8 bg-gradient-to-br from-electric-500/40 to-neon-600/40 rounded-3xl blur-3xl opacity-60 -z-10" />

              {/*
                SHADOW & BORDER - Customize here:
                - Change rounded-3xl to rounded-2xl (less rounded) or rounded-full (more)
                - Change border-electric-500/50 for different border color
              */}
              <div className="relative rounded-3xl overflow-hidden border border-electric-500/50 shadow-2xl shadow-electric-500/20">
                <img
                  src={profileImg}
                  alt={t('about.imageAlt') || 'Portrait de Théo Gasner'}
                  className="w-full h-auto object-cover aspect-[3/4] block"
                />
                {/* Overlay subtle gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            </motion.div>
          </motion.div>

          {/* ========== RIGHT COLUMN: BIO & EXPERTISE ========== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col gap-8"
          >

            {/* BIOGRAPHY */}
            <div>
              <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-satoshi">
                {t('about.bio')}
              </p>
            </div>

            {/*
              EXPERTISE & PASSIONS SECTION
              Customize tag styling here at lines 130-145
            */}
            <div>
              <h3 className="text-sm font-grotesk font-bold text-electric-400 mb-4 uppercase tracking-widest">
                ✨ {t('about.domains') || 'Domaines d\'expertise & Passions'}
              </h3>

              <div className="flex flex-wrap gap-3">

                {/* SKILLS TAGS - Styled with glass effect */}
                {skills.map((skill: string, index: number) => (
                  <motion.div
                    key={`skill-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                  >
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-electric-500/15 to-neon-600/15 border border-electric-500/40 text-sm text-gray-100 font-medium hover:from-electric-500/25 hover:to-neon-600/25 hover:border-electric-500/60 hover:shadow-lg hover:shadow-electric-500/20 transition-all duration-300 cursor-default">
                      {skill}
                    </div>
                  </motion.div>
                ))}

                {/* INTERESTS TAGS - Styled with neon accent */}
                {interests.map((interest: string, index: number) => (
                  <motion.div
                    key={`interest-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 * (skills.length + index) }}
                  >
                    <div className="px-4 py-2 rounded-full bg-neon-600/10 border border-neon-600/50 text-sm text-gray-100 font-medium hover:bg-neon-600/20 hover:border-neon-400 hover:shadow-lg hover:shadow-neon-600/20 transition-all duration-300 cursor-default">
                      {interest}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ==================== TIMELINE SECTION ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-reveal-clip text-4xl md:text-5xl font-grotesk font-bold mb-16 text-center">
            {t('about.education')}
          </h2>

          <div className="space-y-6">
            {timeline.slice(0, 3).map((item: TimelineItem, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <GlassCard className="p-6 border-l-4 border-electric-500 hover:border-neon-600 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-electric-400 uppercase tracking-wide">
                        {item.date}
                      </p>
                      <h4 className="text-lg font-grotesk font-bold mt-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-200 mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
