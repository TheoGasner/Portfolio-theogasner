import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface ProjectEn {
  category?: string;
  description?: string;
  summary?: string;
  concept?: string;
  objectives?: string;
  context?: string;
  role?: string;
  results?: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
  summary?: string;
  concept?: string;
  objectives?: string;
  context?: string;
  role?: string;
  tools?: string[];
  results?: string;
  link?: string;
  en?: ProjectEn;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Stratégie de Communication':       { bg: 'bg-electric-500/15', text: 'text-electric-400', border: 'border-electric-500/30' },
  'Branding':                         { bg: 'bg-electric-500/15', text: 'text-electric-400', border: 'border-electric-500/30' },
  'Communication Intégrée':           { bg: 'bg-electric-500/15', text: 'text-electric-400', border: 'border-electric-500/30' },
  'Campagne Digitale':                { bg: 'bg-electric-500/15', text: 'text-electric-400', border: 'border-electric-500/30' },
  'Design Visuel':                    { bg: 'bg-neon-600/15',     text: 'text-neon-400',     border: 'border-neon-600/30' },
  'Design Graphique':                 { bg: 'bg-neon-600/15',     text: 'text-neon-400',     border: 'border-neon-600/30' },
  'Photographie / Création Visuelle': { bg: 'bg-amber-500/15',   text: 'text-amber-400',    border: 'border-amber-500/30' },
  'Web Design':                       { bg: 'bg-cyan-500/15',     text: 'text-cyan-400',     border: 'border-cyan-500/30' },
  'Développement Web':                { bg: 'bg-cyan-500/15',     text: 'text-cyan-400',     border: 'border-cyan-500/30' },
};

function SectionBlock({ label, children, delay = 0 }: { label: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="mb-10"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-electric-400">{label}</span>
        <div className="flex-1 h-px bg-gradient-to-r from-electric-500/40 to-transparent" />
      </div>
      {children}
    </motion.div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { language } = useLanguage();
  const [activeImg, setActiveImg] = useState(0);
  const [[carouselIdx, carouselDir], setCarousel] = useState<[number, number]>([0, 0]);

  const paginate = (dir: number, len: number) =>
    setCarousel(([idx]) => [((idx + dir) % len + len) % len, dir]);

  useEffect(() => { setActiveImg(0); setCarousel([0, 0]); }, [project?.id]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
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

  const p = language === 'en' ? { ...project, ...project.en } : project;
  const gallery = project.images && project.images.length > 0 ? project.images : [project.image];
  const colors = CATEGORY_COLORS[project.category] ?? { bg: 'bg-electric-500/15', text: 'text-electric-400', border: 'border-electric-500/30' };
  const labels = language === 'en'
    ? { back: 'Back to projects', role: 'Role', tools: 'Tools', results: 'Results', summary: 'Summary', concept: 'Concept', objectives: 'Objectives', context: 'Context', gallery: 'Gallery' }
    : { back: 'Retour aux projets', role: 'Rôle', tools: 'Outils', results: 'Résultats', summary: 'Résumé', concept: 'Concept', objectives: 'Objectifs', context: 'Contexte', gallery: 'Galerie' };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-dark-950 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-12 py-4 bg-dark-950/90 backdrop-blur-md border-b border-white/6">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-white transition-colors duration-200 group"
            >
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{labels.back}</span>
            </button>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
              {p.category}
            </span>
          </div>

          {/* Hero */}
          <div className="relative w-full h-[55vh] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={gallery[activeImg]}
                alt={project.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-ddefd3b3e3f7?w=1200&h=700&fit=crop';
                }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />

            {/* Title over hero */}
            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-10">
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-grotesk font-bold leading-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                {project.title}
              </motion.h1>
            </div>
          </div>

          {/* Thumbnails (if gallery) */}
          {gallery.length > 1 && (
            <div className="flex gap-3 px-6 md:px-16 pt-5 pb-2">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`rounded-lg overflow-hidden h-16 w-24 shrink-0 border-2 transition-all duration-200 ${
                    activeImg === i ? 'border-electric-400 opacity-100 scale-105' : 'border-white/10 opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="max-w-4xl mx-auto px-6 md:px-16 pt-12 pb-24">

            {/* Description + meta */}
            <div className="grid md:grid-cols-3 gap-8 mb-14">
              {/* Lead text */}
              <div className="md:col-span-2">
                <motion.p
                  className="text-lg md:text-xl text-white leading-relaxed font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {p.description}
                </motion.p>
              </div>
              {/* Meta */}
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                {project.role && (
                  <div className="border-l-2 border-electric-500/50 pl-4">
                    <p className="text-xs text-gray-200 uppercase tracking-widest mb-1">{labels.role}</p>
                    <p className="text-sm text-white font-medium">{p.role}</p>
                  </div>
                )}
                {project.tools && project.tools.length > 0 && (
                  <div className="border-l-2 border-neon-600/50 pl-4">
                    <p className="text-xs text-gray-200 uppercase tracking-widest mb-2">{labels.tools}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((tool, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs text-white bg-white/5 border border-white/10 rounded-md">{tool}</span>
                      ))}
                    </div>
                  </div>
                )}
                {project.results && (
                  <div className="border-l-2 border-cyan-500/50 pl-4">
                    <p className="text-xs text-gray-200 uppercase tracking-widest mb-1">{labels.results}</p>
                    <p className="text-sm text-white font-medium">{p.results}</p>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="h-px bg-gradient-to-r from-electric-500/30 via-neon-600/20 to-transparent mb-12" />

            {/* Summary */}
            {project.summary && (
              <SectionBlock label={labels.summary} delay={0.3}>
                <p className="text-gray-200 leading-relaxed text-base">{p.summary}</p>
              </SectionBlock>
            )}

            {/* Concept */}
            {project.concept && (
              <SectionBlock label={labels.concept} delay={0.35}>
                <p className="text-gray-200 leading-relaxed text-base">{p.concept}</p>
              </SectionBlock>
            )}

            {/* Objectives */}
            {project.objectives && (
              <SectionBlock label={labels.objectives} delay={0.4}>
                <p className="text-gray-200 leading-relaxed text-base">{p.objectives}</p>
              </SectionBlock>
            )}

            {/* Context */}
            {project.context && (
              <SectionBlock label={labels.context} delay={0.45}>
                <p className="text-gray-200 leading-relaxed text-base">{p.context}</p>
              </SectionBlock>
            )}

            {/* ── Carousel Galerie ── */}
            {gallery.length > 0 && (
              <SectionBlock label={labels.gallery} delay={0.5}>
                <div className="relative rounded-2xl overflow-hidden bg-dark-900 border border-white/8 select-none">
                  {/* Slide area */}
                  <div className="relative h-[520px] overflow-hidden">
                    <AnimatePresence custom={carouselDir} mode="wait">
                      <motion.img
                        key={carouselIdx}
                        src={gallery[carouselIdx]}
                        alt={`${project.title} — visuel ${carouselIdx + 1}`}
                        custom={carouselDir}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-ddefd3b3e3f7?w=1200&h=700&fit=crop'; }}
                      />
                    </AnimatePresence>

                    {/* Gradient overlay bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-dark-950/80 to-transparent pointer-events-none" />

                    {/* Counter badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-xs font-bold text-white border border-white/15">
                      {carouselIdx + 1} / {gallery.length}
                    </div>

                    {/* Prev / Next arrows */}
                    {gallery.length > 1 && (
                      <>
                        <button
                          onClick={() => paginate(-1, gallery.length)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center hover:bg-black/70 hover:border-electric-400/50 hover:text-electric-400 transition-all duration-200 group"
                          aria-label="Image précédente"
                        >
                          <svg className="w-5 h-5 text-white group-hover:text-electric-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => paginate(1, gallery.length)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center hover:bg-black/70 hover:border-electric-400/50 transition-all duration-200 group"
                          aria-label="Image suivante"
                        >
                          <svg className="w-5 h-5 text-white group-hover:text-electric-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Dot indicators + thumbnail strip */}
                  {gallery.length > 1 && (
                    <div className="px-5 py-4 flex items-center gap-4">
                      {/* Thumbnails */}
                      <div className="flex gap-2 flex-1 overflow-x-auto pb-0.5">
                        {gallery.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => setCarousel([i, i > carouselIdx ? 1 : -1])}
                            className={`relative shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                              carouselIdx === i
                                ? 'border-electric-400 opacity-100 shadow-[0_0_12px_rgba(14,165,233,0.5)]'
                                : 'border-white/10 opacity-40 hover:opacity-70 hover:border-white/25'
                            }`}
                            style={{ width: 72, height: 48 }}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                      {/* Dots */}
                      <div className="flex gap-1.5 shrink-0">
                        {gallery.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCarousel([i, i > carouselIdx ? 1 : -1])}
                            className={`rounded-full transition-all duration-300 ${
                              carouselIdx === i
                                ? 'w-6 h-2 bg-electric-400'
                                : 'w-2 h-2 bg-white/25 hover:bg-white/50'
                            }`}
                            aria-label={`Image ${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </SectionBlock>
            )}

            <div className="h-px bg-gradient-to-r from-electric-500/30 via-neon-600/20 to-transparent mb-10" />

            {/* CTA */}
            <motion.div
              className="flex items-center justify-between flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-electric-500/10 border border-electric-500/40 text-electric-400 font-semibold text-sm hover:bg-electric-500/20 hover:border-electric-400 hover:text-white transition-all duration-200 group"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Voir le projet en ligne</span>
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ) : (
                <p className="text-sm text-gray-200 italic">Projet non disponible en ligne</p>
              )}

              <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm text-gray-200 hover:text-white transition-colors duration-200 group"
              >
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour aux projets
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}