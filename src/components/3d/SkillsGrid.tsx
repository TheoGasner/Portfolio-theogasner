import { motion } from 'framer-motion';

interface Skill {
  id: number;
  name: string;
  description: string;
  description_en?: string;
  tools: string[];
}

interface SkillsGridProps {
  skills: Skill[];
  language?: string;
}

const GRADIENT_COLORS = [
  'from-electric-500 to-cyan-500',
  'from-neon-600 to-pink-500',
  'from-cyan-400 to-blue-600',
  'from-pink-500 to-orange-500',
  'from-purple-600 to-neon-600',
  'from-orange-500 to-red-500',
  'from-blue-500 to-cyan-400',
  'from-pink-600 to-purple-500',
  'from-cyan-500 to-electric-500',
  'from-neon-500 to-pink-600',
  'from-electric-400 to-neon-600',
  'from-blue-600 to-cyan-500',
  'from-orange-600 to-pink-500',
  'from-purple-500 to-pink-600',
];

const EMOJI_ICONS = [
  '💡',
  '🎨',
  '📱',
  '🎯',
  '✨',
  '🚀',
  '💻',
  '🎬',
  '📊',
  '🎭',
  '🔮',
  '🌟',
  '📈',
  '🎪',
];

export function SkillsGrid({ skills, language }: SkillsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill, index) => {
        const gradientIndex = index % GRADIENT_COLORS.length;
        const emojiIndex = index % EMOJI_ICONS.length;
        const desc = language === 'en' && skill.description_en ? skill.description_en : skill.description;

        return (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group h-full"
          >
            <div
              className={`relative h-full rounded-xl bg-gradient-to-br ${GRADIENT_COLORS[gradientIndex]} p-1 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
            >
              {/* Card background */}
              <div className="relative h-full bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 rounded-lg p-6 flex flex-col overflow-hidden">
                {/* Animated background gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_COLORS[gradientIndex]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Icon */}
                <motion.div
                  className="text-5xl mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                  initial={{ scale: 1 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.1 }}
                >
                  {EMOJI_ICONS[emojiIndex]}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-grotesk font-bold mb-2 text-white relative z-10 line-clamp-2">
                  {skill.name}
                </h3>
                <p className="text-sm text-gray-200 mb-4 flex-1 relative z-10 line-clamp-3">
                  {desc}
                </p>

                {/* Tools preview */}
                <div className="relative z-10 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {skill.tools.slice(0, 2).map((tool, i) => (
                      <motion.span
                        key={i}
                        className={`px-2 py-1 text-xs rounded-full bg-white/10 text-gray-200 backdrop-blur-sm border border-white/20`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.05) + (i * 0.1) }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                    {skill.tools.length > 2 && (
                      <span className="px-2 py-1 text-xs text-gray-200">
                        +{skill.tools.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 rounded-lg bg-gradient-to-br ${GRADIENT_COLORS[gradientIndex]} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-300`}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
