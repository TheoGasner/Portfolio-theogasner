import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../common';

interface Skill {
  id: number;
  name: string;
  description: string;
  tools: string[];
}

interface SkillsOrbitsProps {
  skills: Skill[];
}

export function SkillsOrbits({ skills }: SkillsOrbitsProps) {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const orbitalRadius = 220;

  return (
    <div className="flex justify-center items-center py-16">
      <div className="relative w-full h-screen max-h-96" style={{ perspective: '1000px' }}>
        {/* Central node */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-electric-500 to-neon-600 flex items-center justify-center shadow-glow">
            <div className="text-white font-bold text-4xl">★</div>
          </div>
        </motion.div>

        {/* Orbiting skill nodes */}
        {skills.map((skill, index) => {
          const totalSkills = skills.length;
          const angle = (index / totalSkills) * Math.PI * 2;
          const x = Math.cos(angle) * orbitalRadius;
          const y = Math.sin(angle) * orbitalRadius;

          return (
            <motion.div
              key={skill.id}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              animate={{
                scale: hoveredSkill === skill.id ? 1.15 : 1,
                opacity: hoveredSkill !== null && hoveredSkill !== skill.id ? 0.3 : 1,
              }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredSkill(skill.id)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <motion.div
                className="w-28 h-28"
                whileHover={{ rotate: 8 }}
              >
                <GlassCard
                  className="w-full h-full flex flex-col items-center justify-center text-center cursor-pointer relative"
                >
                  <div className="text-3xl mb-2">•</div>
                  <p className="text-xs font-semibold text-white">
                    {skill.name.length > 12
                      ? skill.name.substring(0, 10) + '..'
                      : skill.name}
                  </p>

                  {/* Tooltip on hover */}
                  {hoveredSkill === skill.id && (
                    <motion.div
                      className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-56 pointer-events-none z-30"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="glass-dark p-4 rounded-lg text-left">
                        <p className="font-semibold text-white mb-2 text-sm">
                          {skill.name}
                        </p>
                        <p className="text-gray-200 mb-3 text-xs leading-relaxed">
                          {skill.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {skill.tools.map((tool, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-electric-500/30 text-electric-300 rounded border border-electric-500/50"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </GlassCard>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
