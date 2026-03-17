import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { GlassCard, ImagePlaceholder, Button, FilterButton } from '../common';
import { ProjectModal } from '../modals/ProjectModal';
import projects from '../../content/projects.json';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  context?: string;
  role?: string;
  tools?: string[];
  results?: string;
}

/**
 * CONFIGURATION DES FILTRES
 * Modifiez ce tableau pour ajouter, supprimer ou renommer des filtres
 * Les labels ici correspondent aux clés de traduction dans text.json (projects.filters)
 */
const FILTER_OPTIONS = [
  { id: 'all', label: 'Tous' },
  { id: 'communication', label: 'Communication' },
  { id: 'design', label: 'Design' },
  { id: 'web', label: 'Web' },
  { id: 'creation', label: 'Création Visuelle' },
];

/**
 * MAPPING CATÉGORIES → FILTRES
 * Associez chaque catégorie de projet à un ID de filtre
 * Pour ajouter une nouvelle catégorie de projet, ajoutez-la ici
 */
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

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full cursor-pointer"
      onClick={onClick}
    >
      <GlassCard className="group h-full flex flex-col overflow-hidden hover:shadow-glow-lg transition-all hover:-translate-y-2">
        {/* Image */}
        <div className="relative h-48 overflow-hidden mb-4">
          <ImagePlaceholder
            alt={project.title}
            src={project.image}
            width={400}
            height={300}
            className="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <p className="text-xs font-semibold text-electric-400 uppercase tracking-wide mb-2">
            {project.category}
          </p>
          <h3 className="text-xl font-grotesk font-bold mb-2 group-hover:text-electric-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-gray-400 mb-4 flex-1">
            {project.description}
          </p>

          {/* Tools preview */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tools && project.tools.slice(0, 3).map((tool, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-electric-500/20 text-electric-300 rounded border border-electric-500/30"
              >
                {tool}
              </span>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={onClick} className="w-full">
            Voir le détail →
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function ProjectsSection() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  /**
   * État du filtre sélectionné
   * Commence par 'all' pour afficher tous les projets
   * À modifier si vous voulez un filtre par défaut différent
   */
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  /**
   * Filtrage des projets
   * - Si 'all' est sélectionné: affiche tous les projets
   * - Sinon: affiche seulement les projets dont la catégorie correspond au filtre
   */
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') {
      return projects;
    }
    return projects.filter((project) => {
      const filterCategory = CATEGORY_TO_FILTER[project.category];
      return filterCategory === selectedFilter;
    });
  }, [selectedFilter]);

  return (
    <section
      id="projects"
      className="relative w-full py-20 md:py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-600/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section title */}
        <motion.h2
          className="text-4xl md:text-5xl font-grotesk font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('projects.title')}
        </motion.h2>

        <motion.p
          className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Sélection de projets mettant en avant mon approche stratégique et créative
        </motion.p>

        {/* FILTER BUTTONS */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {FILTER_OPTIONS.map((filter) => (
            <FilterButton
              key={filter.id}
              label={filter.label}
              isActive={selectedFilter === filter.id}
              onClick={() => setSelectedFilter(filter.id)}
            />
          ))}
        </motion.div>

        {/* Projects grid with animation on filter change */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project as Project}
                  onClick={() => setSelectedProject(project as Project)}
                />
              ))
            ) : (
              // Message si aucun projet ne correspond au filtre
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-gray-400 text-lg">
                  Aucun projet trouvé pour cette catégorie
                </p>
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

