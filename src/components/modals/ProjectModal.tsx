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

const DOT_COLORS: Record<string, string> = {
  'Stratégie de Communication': '#38bdf8',
  'Branding':                   '#38bdf8',
  'Communication Intégrée':     '#38bdf8',
  'Campagne Digitale':          '#38bdf8',
  'Design Visuel':              '#d946ef',
  'Design Graphique':           '#d946ef',
  'Photographie / Création Visuelle': '#f59e0b',
  'Web Design':                 '#22d3ee',
  'Développement Web':          '#22d3ee',
};
const FALLBACK_DOT = '#22d3ee';

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? '55%' : '-55%', opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit:  (d: number) => ({ x: d > 0 ? '-55%' : '55%', opacity: 0, scale: 0.96 }),
};
const slideTx = { duration: 0.55, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] };

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
  const dotColor = DOT_COLORS[project.category] ?? FALLBACK_DOT;
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

            {/* ── Meta bar ── */}
            <motion.div
              className="flex flex-wrap gap-x-8 gap-y-4 mb-14 p-5 rounded-2xl bg-white/[0.025] border border-white/[0.06]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
            >
              {project.role && (
                <div className="border-l-2 border-electric-500/50 pl-3">
                  <p className="text-[9px] text-gray-400 uppercase tracking-[0.18em] mb-1">{L.role}</p>
                  <p className="text-sm text-white font-medium">{p.role}</p>
                </div>
              )}
              {project.tools && project.tools.length > 0 && (
                <div className="border-l-2 border-neon-600/50 pl-3 flex-1 min-w-[180px]">
                  <p className="text-[9px] text-gray-400 uppercase tracking-[0.18em] mb-2">{L.tools}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs text-white/70 bg-white/[0.06] border border-white/[0.08] rounded-md">{tool}</span>
                    ))}
                  </div>
                </div>
              )}
              {project.results && (
                <div className={`border-l-2 ${colors.accent} pl-3`}>
                  <p className="text-[9px] text-gray-400 uppercase tracking-[0.18em] mb-1">{L.results}</p>
                  <p className={`text-sm font-bold ${colors.text}`}>{p.results}</p>
                </div>
              )}
              {project.link && (
                <div className="ml-auto flex items-center">
                  <a
                    href={project.link} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 hover:opacity-80 ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {L.visit}
                  </a>
                </div>
              )}
            </motion.div>

            {/* ── Layout éditorial varié ── */}
            {(() => {
              const sections = [
                project.summary    ? { label: L.summary,    text: p.summary }    : null,
                project.concept    ? { label: L.concept,    text: p.concept }    : null,
                project.context    ? { label: L.context,    text: p.context }    : null,
                project.objectives ? { label: L.objectives, text: p.objectives } : null,
              ].filter(Boolean) as { label: string; text: string | undefined }[];

              // Patterns de mise en page qui varient : 'left' | 'right' | 'text-only' | 'img-full'
              const PATTERNS = ['left', 'text-only', 'right', 'img-full'] as const;
              type Pattern = typeof PATTERNS[number];

              const getPattern = (i: number, total: number): Pattern => {
                if (total === 1) return 'left';
                if (total === 2) return i === 0 ? 'left' : 'right';
                // Pour 3+ sections : varie de façon intéressante
                const cycle: Pattern[] = ['left', 'text-only', 'right', 'img-full'];
                return cycle[i % cycle.length];
              };

              const ImgBlock = ({ src, ratio = '4/3' }: { src: string; ratio?: string }) => (
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    aspectRatio: ratio,
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 20px 50px rgba(0,0,0,0.55), 0 0 50px ${dotColor}18`,
                  }}
                  whileHover={{ scale: 1.012 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1461749280684-ddefd3b3e3f7?w=800&h=600&fit=crop';
                    }}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                    style={{ background: `linear-gradient(to top, ${dotColor}20, transparent)` }}
                  />
                </motion.div>
              );

              const TextBlock = ({ label, text, side = 'none' }: { label: string; text: string | undefined; side?: string }) => (
                <div className={side === 'right' ? 'md:pl-4' : side === 'left' ? 'md:pr-4' : ''}>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.22em] ${colors.text} block mb-3`}>
                    {label}
                  </span>
                  <p className="text-gray-200 leading-[1.75] text-[15px] md:text-base">{text}</p>
                </div>
              );

              return (
                <div className="flex flex-col">
                  {sections.map((section, i) => {
                    const pattern = getPattern(i, sections.length);
                    const img = gallery[i % gallery.length];
                    const hasBorder = i < sections.length - 1;

                    return (
                      <motion.div
                        key={i}
                        className={hasBorder ? 'pb-12 mb-12 border-b border-white/[0.05]' : 'pb-4'}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        {/* Image à gauche + texte à droite */}
                        {pattern === 'left' && (
                          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
                            <div className="w-full md:w-[48%] shrink-0">
                              <ImgBlock src={img} />
                            </div>
                            <div className="flex-1">
                              <TextBlock label={section.label} text={section.text} side="right" />
                            </div>
                          </div>
                        )}

                        {/* Texte à gauche + image à droite */}
                        {pattern === 'right' && (
                          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-10">
                            <div className="w-full md:w-[48%] shrink-0">
                              <ImgBlock src={img} />
                            </div>
                            <div className="flex-1">
                              <TextBlock label={section.label} text={section.text} side="left" />
                            </div>
                          </div>
                        )}

                        {/* Texte centré — pleine largeur */}
                        {pattern === 'text-only' && (
                          <div className="max-w-2xl mx-auto text-center">
                            <span className={`text-[10px] font-bold uppercase tracking-[0.22em] ${colors.text} block mb-4`}>
                              {section.label}
                            </span>
                            <p className="text-gray-200 leading-[1.85] text-[16px] md:text-[17px]">{section.text}</p>
                          </div>
                        )}

                        {/* Texte seul large — anciennement img-full */}
                        {pattern === 'img-full' && (
                          <div className="max-w-2xl mx-auto text-center">
                            <span className={`text-[10px] font-bold uppercase tracking-[0.22em] ${colors.text} block mb-4`}>
                              {section.label}
                            </span>
                            <p className="text-gray-200 leading-[1.85] text-[16px] md:text-[17px]">{section.text}</p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              );
            })()}

            {/* ── Galerie cinématique (seulement si plusieurs images) ── */}
            {multi && (
              <motion.div
                className="mt-16"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.55 }}
              >
                {/* Header avec ghost number */}
                <div className="flex items-end justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.22em] ${colors.text}`}>
                      {language === 'en' ? 'Gallery' : 'Galerie'}
                    </span>
                    <div className="w-12 h-px bg-gradient-to-r from-white/12 to-transparent" />
                  </div>
                  {/* Gros numéro fantôme animé */}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 12, scale: 0.85 }}
                      animate={{ opacity: 0.055, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 1.1 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="text-[88px] leading-none font-black tabular-nums text-white pointer-events-none select-none"
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Stage */}
                <div className="relative">
                  {/* Ambient glow pulsant */}
                  <motion.div
                    className="absolute inset-x-[12%] inset-y-[8%] rounded-full blur-[80px] pointer-events-none"
                    style={{ background: dotColor, zIndex: 0 }}
                    animate={{ opacity: [0.15, 0.32, 0.15], scale: [1, 1.06, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Cadre principal */}
                  <div
                    className="relative rounded-2xl overflow-hidden select-none"
                    style={{ aspectRatio: '16/9', zIndex: 1, boxShadow: `0 0 0 1px rgba(255,255,255,0.07), 0 25px 60px rgba(0,0,0,0.7), 0 0 80px ${dotColor}22` }}
                  >
                    {/* Barre de progression */}
                    <div className="absolute inset-x-0 top-0 h-[2px] z-30 pointer-events-none" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div
                        className="h-full bg-gradient-to-r from-electric-400 via-cyan-400 to-neon-500"
                        animate={{ width: `${((idx + 1) / gallery.length) * 100}%` }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                          initial={{ scale: 1.06 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 7, ease: 'linear' }}
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-ddefd3b3e3f7?w=1200&h=700&fit=crop'; }}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Drag-to-swipe */}
                    <motion.div
                      className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.08}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -50) paginate(1, gallery.length);
                        else if (info.offset.x > 50) paginate(-1, gallery.length);
                      }}
                    />

                    {/* Zone gauche cliquable (invisible, révèle chevron au survol) */}
                    <button
                      onClick={() => paginate(-1, gallery.length)}
                      className="absolute left-0 top-0 bottom-0 w-[28%] z-20 group
                                 flex items-center justify-start pl-5
                                 bg-gradient-to-r from-transparent to-transparent
                                 hover:from-black/50 transition-all duration-300"
                      aria-label="Précédent"
                    >
                      <motion.svg
                        className="w-9 h-9 text-white drop-shadow-xl"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                        initial={{ opacity: 0, x: 6 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </motion.svg>
                    </button>

                    {/* Zone droite cliquable */}
                    <button
                      onClick={() => paginate(1, gallery.length)}
                      className="absolute right-0 top-0 bottom-0 w-[28%] z-20 group
                                 flex items-center justify-end pr-5
                                 bg-gradient-to-l from-transparent to-transparent
                                 hover:from-black/50 transition-all duration-300"
                      aria-label="Suivant"
                    >
                      <motion.svg
                        className="w-9 h-9 text-white drop-shadow-xl"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                        initial={{ opacity: 0, x: -6 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </button>

                    {/* Gradient bas */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-[5]" />

                    {/* Live counter */}
                    <div className="absolute bottom-3.5 left-4 z-20 flex items-center gap-2 pointer-events-none">
                      <motion.span
                        className="w-[7px] h-[7px] rounded-full"
                        style={{ background: dotColor }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <span className="text-[11px] font-bold text-white/80 tabular-nums">
                        {String(idx + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pill dots navigation */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {gallery.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setSlide([i, i > idx ? 1 : -1])}
                      className="h-[5px] rounded-full cursor-pointer"
                      animate={{
                        width: i === idx ? 36 : 7,
                        backgroundColor: i === idx ? dotColor : 'rgba(255,255,255,0.18)',
                      }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Gallery spread — perspective fan */}
                <div className="mt-8">
                  <div className="text-center mb-5">
                    <span className={`text-[9px] font-bold uppercase tracking-[0.25em] ${colors.text} opacity-70`}>
                      {language === 'en' ? 'Gallery' : 'Galerie'}
                    </span>
                  </div>
                  <div
                    className="flex items-end justify-center"
                    style={{ perspective: '900px', paddingBottom: '8px' }}
                  >
                    {gallery.map((img, i) => {
                      const mid = (gallery.length - 1) / 2;
                      const offset = i - mid;
                      const rotateY = offset * (gallery.length <= 4 ? 10 : 6);
                      const isActive = i === idx;
                      return (
                        <motion.button
                          key={i}
                          className="relative shrink-0 rounded-xl overflow-hidden focus:outline-none"
                          style={{
                            width: 108,
                            height: 72,
                            marginLeft: i > 0 ? -6 : 0,
                          }}
                          animate={{
                            rotateY,
                            scale: isActive ? 1.12 : 1 - Math.abs(offset) * 0.03,
                            opacity: isActive ? 1 : 0.45 + (1 - Math.min(Math.abs(offset), 2) / 3) * 0.35,
                            zIndex: isActive ? 20 : 10 - Math.abs(Math.round(offset)),
                            boxShadow: isActive
                              ? `0 0 0 2px ${dotColor}, 0 8px 28px rgba(0,0,0,0.65), 0 0 18px ${dotColor}55`
                              : `0 0 0 1px rgba(255,255,255,0.08), 0 4px 14px rgba(0,0,0,0.5)`,
                          }}
                          whileHover={{
                            scale: isActive ? 1.14 : 1.06,
                            rotateY: rotateY * 0.15,
                            opacity: 0.95,
                            zIndex: 25,
                          }}
                          transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                          onClick={() => setSlide([i, i > idx ? 1 : -1])}
                          aria-label={`Image ${i + 1}`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover pointer-events-none"
                            draggable={false}
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-ddefd3b3e3f7?w=200&h=130&fit=crop'; }}
                          />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Section galerie spread — toujours visible ── */}
            {!multi && (
              <motion.div
                className="mt-16"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.55 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.22em] ${colors.text}`}>
                    {language === 'en' ? 'Gallery' : 'Galerie'}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                <div
                  className="flex items-end justify-center"
                  style={{ perspective: '900px', paddingBottom: '8px' }}
                >
                  {gallery.map((img, i) => {
                    const mid = (gallery.length - 1) / 2;
                    const offset = i - mid;
                    const rotateY = offset * 10;
                    const isActive = i === idx;
                    return (
                      <motion.div
                        key={i}
                        className="relative shrink-0 rounded-xl overflow-hidden"
                        style={{
                          width: 200,
                          height: 133,
                          marginLeft: i > 0 ? -8 : 0,
                          boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${dotColor}33`,
                          rotateY,
                          zIndex: isActive ? 10 : 10 - Math.abs(Math.round(offset)),
                        }}
                        animate={{ rotateY }}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                          draggable={false}
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-ddefd3b3e3f7?w=400&h=270&fit=crop'; }}
                        />
                      </motion.div>
                    );
                  })}
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
