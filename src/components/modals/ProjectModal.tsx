import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
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

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  'Stratégie de Communication':       { bg: 'bg-electric-500/15', text: 'text-electric-400', border: 'border-electric-500/30', accent: 'border-electric-500/60' },
  'Branding':                         { bg: 'bg-electric-500/15', text: 'text-electric-400', border: 'border-electric-500/30', accent: 'border-electric-500/60' },
  'Communication Intégrée':           { bg: 'bg-electric-500/15', text: 'text-electric-400', border: 'border-electric-500/30', accent: 'border-electric-500/60' },
  'Campagne Digitale':                { bg: 'bg-electric-500/15', text: 'text-electric-400', border: 'border-electric-500/30', accent: 'border-electric-500/60' },
  'Design Visuel':                    { bg: 'bg-neon-600/15',     text: 'text-neon-400',     border: 'border-neon-600/30',     accent: 'border-neon-600/60' },
  'Design Graphique':                 { bg: 'bg-neon-600/15',     text: 'text-neon-400',     border: 'border-neon-600/30',     accent: 'border-neon-600/60' },
  'Photographie / Création Visuelle': { bg: 'bg-amber-500/15',   text: 'text-amber-400',    border: 'border-amber-500/30',   accent: 'border-amber-500/60' },
  'Web Design':                       { bg: 'bg-cyan-500/15',     text: 'text-cyan-400',     border: 'border-cyan-500/30',    accent: 'border-cyan-500/60' },
  'Développement Web':                { bg: 'bg-cyan-500/15',     text: 'text-cyan-400',     border: 'border-cyan-500/30',    accent: 'border-cyan-500/60' },
};
const FALLBACK_COLORS = COLOR_MAP['Web Design'];

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? '55%' : '-55%', opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit:  (d: number) => ({ x: d > 0 ? '-55%' : '55%', opacity: 0, scale: 0.96 }),
};
const slideTx = { duration: 0.55, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] };

function SectionBlock({ label, children, delay = 0, accentText = 'text-electric-400' }: {
  label: string; children: ReactNode; delay?: number; accentText?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mb-9"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className={`text-[10px] font-bold uppercase tracking-[0.22em] ${accentText}`}>{label}</span>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
      </div>
      {children}
    </motion.div>
  );
}

function MetaItem({ label, borderCls, children }: { label: string; borderCls: string; children: ReactNode }) {
  return (
    <div className={`pl-4 border-l-2 ${borderCls}`}>
      <p className="text-[10px] text-gray-400 uppercase tracking-[0.18em] mb-2">{label}</p>
      {children}
    </div>
  );
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { language } = useLanguage();
  const [[idx, dir], setSlide] = useState<[number, number]>([0, 0]);

  const paginate = (d: number, len: number) =>
    setSlide(([i]) => [((i + d) % len + len) % len, d]);

  useEffect(() => { setSlide([0, 0]); }, [project?.id]);

  useEffect(() => {
    const galleryLen = (project?.images?.length ?? 0) > 0 ? project!.images!.length : 1;
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowRight') setSlide(([i]) => [((i + 1) % galleryLen + galleryLen) % galleryLen, 1]);
      if (e.key === 'ArrowLeft')  setSlide(([i]) => [((i - 1) % galleryLen + galleryLen) % galleryLen, -1]);
    };
    window.addEventListener('keydown', onKey);
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = 'auto'; };
  }, [isOpen, onClose, project?.id]);

  if (!project) return null;

  const p = language === 'en' ? { ...project, ...project.en } : project;
  const gallery = project.images && project.images.length > 0 ? project.images : [project.image];
  const colors = COLOR_MAP[project.category] ?? FALLBACK_COLORS;
  const multi = gallery.length > 1;

  const L = language === 'en'
    ? { back: 'Back', role: 'Role', tools: 'Tools', results: 'Key results', summary: 'Overview', concept: 'Concept', objectives: 'Objectives', context: 'Context', visit: 'View live', offline: 'Not available online' }
    : { back: 'Retour', role: 'Rôle', tools: 'Outils', results: 'Résultats', summary: 'Résumé', concept: 'Concept', objectives: 'Objectifs', context: 'Contexte', visit: 'Voir en ligne', offline: 'Non disponible en ligne' };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-dark-950 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >

          {/* ── Top bar ── */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-5 md:px-10 py-3.5 bg-dark-950/85 backdrop-blur-2xl border-b border-white/[0.05]">
            <button
              onClick={onClose}
              className="group flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-150"
            >
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {L.back}
            </button>
            <div className="flex items-center gap-2.5">
              <span className={`hidden sm:inline-flex px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                {p.category}
              </span>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold text-white/75 bg-white/[0.07] border border-white/[0.12] rounded-full hover:text-white hover:bg-white/[0.14] transition-colors duration-150">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live
                </a>
              )}
            </div>
          </div>

          {/* ── Hero image fixe ── */}
          <div className="relative w-full overflow-hidden" style={{ height: 'clamp(280px, 56vh, 660px)' }}>
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.06, opacity: 0 }}
              animate={{ scale: 1.0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1461749280684-ddefd3b3e3f7?w=1200&h=700&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-950/55 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-8">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-grotesk font-bold tracking-tight leading-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                {project.title}
              </motion.h1>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="max-w-5xl mx-auto px-5 md:px-10 pt-10 pb-28">

            <motion.p
              className="text-[17px] md:text-xl text-white/85 leading-relaxed font-light mb-10 max-w-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45 }}
            >
              {p.description}
            </motion.p>

            <div className="h-px bg-gradient-to-r from-white/10 via-white/[0.04] to-transparent mb-10" />

            {/* Two-column layout */}
            <div className="grid md:grid-cols-3 gap-10 lg:gap-16 items-start">

              {/* Left: narrative */}
              <div className="md:col-span-2">
                {project.summary && (
                  <SectionBlock label={L.summary} delay={0.22} accentText={colors.text}>
                    <p className="text-gray-300 leading-relaxed text-[15px]">{p.summary}</p>
                  </SectionBlock>
                )}
                {project.concept && (
                  <SectionBlock label={L.concept} delay={0.28} accentText={colors.text}>
                    <p className="text-gray-300 leading-relaxed text-[15px]">{p.concept}</p>
                  </SectionBlock>
                )}
                {project.context && (
                  <SectionBlock label={L.context} delay={0.34} accentText={colors.text}>
                    <p className="text-gray-300 leading-relaxed text-[15px]">{p.context}</p>
                  </SectionBlock>
                )}
                {project.objectives && (
                  <SectionBlock label={L.objectives} delay={0.4} accentText={colors.text}>
                    <p className="text-gray-300 leading-relaxed text-[15px]">{p.objectives}</p>
                  </SectionBlock>
                )}
              </div>

              {/* Right: sticky meta */}
              <motion.aside
                className="md:sticky md:top-[58px] flex flex-col gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.28, duration: 0.5 }}
              >
                {project.role && (
                  <MetaItem label={L.role} borderCls="border-electric-500/50">
                    <p className="text-sm text-white font-medium leading-snug">{p.role}</p>
                  </MetaItem>
                )}
                {project.tools && project.tools.length > 0 && (
                  <MetaItem label={L.tools} borderCls="border-neon-600/50">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((tool, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs text-white/70 bg-white/[0.06] border border-white/[0.08] rounded-md">{tool}</span>
                      ))}
                    </div>
                  </MetaItem>
                )}
                {project.results && (
                  <MetaItem label={L.results} borderCls={colors.accent}>
                    <p className={`text-sm font-semibold leading-snug ${colors.text}`}>{p.results}</p>
                  </MetaItem>
                )}
                {project.link && (
                  <a
                    href={project.link} target="_blank" rel="noopener noreferrer"
                    className={`mt-1 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 hover:opacity-80 ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {L.visit}
                  </a>
                )}
              </motion.aside>
            </div>

            {/* ── Carrousel galerie ── */}
            {multi && (
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.22em] ${colors.text}`}>
                    {language === 'en' ? 'Gallery' : 'Galerie'}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                {/* Slide area */}
                <div className="relative rounded-2xl overflow-hidden select-none bg-dark-900" style={{ height: 'clamp(220px, 48vw, 560px)' }}>

                  {/* Progress bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/[0.06] z-20 pointer-events-none">
                    <motion.div
                      className="h-full bg-gradient-to-r from-electric-400 via-cyan-400 to-neon-500 rounded-r-full"
                      animate={{ width: `${((idx + 1) / gallery.length) * 100}%` }}
                      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  </div>

                  {/* Slides */}
                  <AnimatePresence custom={dir} mode="sync">
                    <motion.div
                      key={idx}
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTx}
                      className="absolute inset-0"
                    >
                      <motion.img
                        src={gallery[idx]}
                        alt={`${project.title} — visuel ${idx + 1}`}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.07 }}
                        animate={{ scale: 1.0 }}
                        transition={{ duration: 8, ease: 'linear' }}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1461749280684-ddefd3b3e3f7?w=1200&h=700&fit=crop';
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Drag to swipe */}
                  <motion.div
                    className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -45) paginate(1, gallery.length);
                      else if (info.offset.x > 45) paginate(-1, gallery.length);
                    }}
                  />

                  {/* Gradient bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark-950/60 to-transparent pointer-events-none z-[5]" />

                  {/* Counter */}
                  <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-sm border border-white/[0.12] text-xs font-bold text-white tabular-nums pointer-events-none">
                    {String(idx + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                  </div>

                  {/* Arrows */}
                  <button
                    onClick={() => paginate(-1, gallery.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/[0.12] text-white/65 hover:text-white hover:bg-black/65 hover:border-white/25 transition-all duration-200"
                    aria-label="Image précédente"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => paginate(1, gallery.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/[0.12] text-white/65 hover:text-white hover:bg-black/65 hover:border-white/25 transition-all duration-200"
                    aria-label="Image suivante"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Filmstrip */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {gallery.map((img, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setSlide([i, i > idx ? 1 : -1])}
                      className="relative shrink-0 rounded-lg overflow-hidden"
                      style={{ width: 82, height: 54 }}
                      animate={{ opacity: idx === i ? 1 : 0.32, scale: idx === i ? 1 : 0.93 }}
                      transition={{ duration: 0.22 }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      {idx === i && (
                        <motion.div
                          layoutId="filmThumb"
                          className={`absolute inset-0 rounded-lg border-2 ${colors.border} shadow-[0_0_12px_rgba(56,189,248,0.35)]`}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Bottom nav */}
            <div className="mt-16 pt-8 border-t border-white/[0.05] flex items-center justify-between flex-wrap gap-4">
              {!project.link
                ? <p className="text-sm text-gray-400 italic">{L.offline}</p>
                : <span />
              }
              <button
                onClick={onClose}
                className="group flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors duration-150"
              >
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {L.back}
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
