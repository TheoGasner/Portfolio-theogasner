import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { FilterButton } from '../common';
import { ProjectModal } from '../modals/ProjectModal';
import projects from '../../content/projects.json';

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

const FILTER_IDS = ['all', 'communication', 'design', 'web', 'creation'];

const CATEGORY_TO_FILTER: Record<string, string> = {
  'Stratégie de Communication': 'communication',
  'Branding': 'communication',
  'Communication Intégrée': 'communication',
  'Campagne Digitale': 'communication',
  'Design Visuel': 'design',
  'Design Graphique': 'design',
  'Photographie / Création Visuelle': 'creation',
  'Créations Visuelles': 'design',
  'Web Design': 'web',
  'Développement Web': 'web',
};

const CATEGORY_COLORS: Record<string, string> = {
  'communication': 'bg-electric-500/20 text-electric-400 border-electric-500/30',
  'design': 'bg-neon-600/20 text-neon-400 border-neon-600/30',
  'web': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'creation': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

function ProjectCard({ project, index, onClick, language }: { project: Project; index: number; onClick: () => void; language: string }) {
  const p = language === 'en' ? { ...project, ...project.en } : project;
  const filterKey = CATEGORY_TO_FILTER[project.category] ?? 'communication';
  const badgeColor = CATEGORY_COLORS[filterKey] ?? CATEGORY_COLORS['communication'];
  const isExternal = project.image.startsWith('http');

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8, scale: 1.015 }}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-dark-800 border border-white/8 transition-all duration-300
        hover:border-electric-400/80
        hover:shadow-[0_0_0_1px_rgba(14,165,233,0.5),0_4px_20px_rgba(14,165,233,0.35),0_8px_60px_rgba(14,165,233,0.25),0_0_120px_rgba(14,165,233,0.12)]
        flex flex-col relative"
      onClick={onClick}
    >
      {/* Glow top-edge on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Image area */}
      <div className="relative h-52 overflow-hidden shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-107"
          loading="lazy"
          onError={(e) => {
            if (!isExternal) {
              (e.currentTarget as HTMLImageElement).src = `https://images.unsplash.com/photo-1461749280684-ddefd3b3e3f7?w=800&h=600&fit=crop`;
            }
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-800/90 via-dark-800/20 to-transparent" />
        {/* Overlay on hover : light sweep */}
        <div className="absolute inset-0 bg-gradient-to-br from-electric-500/0 to-electric-500/0 group-hover:from-electric-500/10 group-hover:to-transparent transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-grotesk font-bold mb-2 group-hover:text-electric-400 transition-colors duration-200 leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-gray-200 leading-relaxed flex-1 mb-4">
          {p.description}
        </p>

        {/* Tools */}
        {project.tools && project.tools.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tools.slice(0, 3).map((tool, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs bg-white/5 text-gray-200 rounded-md border border-white/10"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-gray-200 rounded-md border border-white/10 bg-white/5">
                +{project.tools.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer row: CTA + category badge */}
        <div className="flex items-center justify-between mt-auto gap-3">
          {/* CTA button */}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-electric-500/10 border border-electric-500/20 text-electric-400
              group-hover:bg-electric-500/20 group-hover:border-electric-500/50 group-hover:text-white
              transition-all duration-200"
          >
            <span className="text-sm font-semibold tracking-wide">{language === 'en' ? 'View project' : 'Voir le projet'}</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>

          {/* Category badge bottom-right */}
          <span className={`shrink-0 px-2.5 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${badgeColor}`}>
            {p.category}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions = FILTER_IDS.map(id => ({ id, label: t(`projects.filters.${id}`) }));

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return projects;
    return projects.filter((project) => CATEGORY_TO_FILTER[project.category] === selectedFilter);
  }, [selectedFilter]);

  return (
    <section
      id="projects"
      className="relative w-full py-20 md:py-32 px-6 overflow-hidden"
    >
      {/* Background subtle */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-500/3 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-reveal-clip text-4xl md:text-5xl font-grotesk font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('projects.title')}
          </motion.h2>
          <motion.p
            className="text-gray-200 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {language === 'en' ? 'A selection of projects showcasing my strategic and creative approach' : 'Sélection de projets mettant en avant mon approche stratégique et créative'}
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filterOptions.map((filter) => (
            <FilterButton
              key={filter.id}
              label={filter.label}
              isActive={selectedFilter === filter.id}
              onClick={() => setSelectedFilter(filter.id)}
            />
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project as Project}
                  index={index}
                  language={language}
                  onClick={() => setSelectedProject(project as Project)}
                />
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-16"
              >
                <p className="text-gray-200 text-lg">{language === 'en' ? 'No projects in this category' : 'Aucun projet dans cette catégorie'}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

