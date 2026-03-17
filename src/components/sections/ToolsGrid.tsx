import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tool {
  name: string;
  icon: string; // emoji ou unicode icon
  color: string;
}

const TOOLS: Tool[] = [
  { name: 'Figma', icon: '🎨', color: 'from-purple-500 to-pink-500' },
  { name: 'Photoshop', icon: '🖼️', color: 'from-blue-500 to-cyan-500' },
  { name: 'Illustrator', icon: '✏️', color: 'from-orange-500 to-red-500' },
  { name: 'Premiere Pro', icon: '🎬', color: 'from-purple-600 to-blue-600' },
  { name: 'After Effects', icon: '⚡', color: 'from-pink-500 to-purple-500' },
  { name: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
  { name: 'TypeScript', icon: '📘', color: 'from-blue-600 to-blue-800' },
  { name: 'Tailwind CSS', icon: '🌊', color: 'from-cyan-500 to-blue-600' },
  { name: 'Three.js', icon: '🎭', color: 'from-yellow-400 to-orange-500' },
  { name: 'WordPress', icon: '🔵', color: 'from-blue-500 to-blue-700' },
  { name: 'Notion', icon: '📄', color: 'from-gray-600 to-gray-800' },
  { name: 'Git', icon: '🔀', color: 'from-red-500 to-orange-600' },
  { name: 'VS Code', icon: '💻', color: 'from-blue-600 to-cyan-500' },
  { name: 'Adobe Suite', icon: '🎪', color: 'from-red-500 to-pink-600' },
  { name: 'Slack', icon: '💬', color: 'from-purple-500 to-pink-500' },
  { name: 'Canva', icon: '🎨', color: 'from-purple-400 to-pink-500' },
];

export function ToolsGrid() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {TOOLS.map((tool, index) => (
        <motion.div
          key={tool.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.02 * index }}
          className="relative flex justify-center"
          onMouseEnter={() => setHoveredTool(tool.name)}
          onMouseLeave={() => setHoveredTool(null)}
        >
          <motion.div
            className={`w-20 h-20 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-4xl shadow-lg cursor-pointer`}
            whileHover={{ scale: 1.1, rotateZ: 5 }}
            animate={{
              boxShadow: hoveredTool === tool.name
                ? '0 0 30px rgba(14, 165, 233, 0.6)'
                : '0 10px 25px rgba(0, 0, 0, 0.3)'
            }}
          >
            {tool.icon}
          </motion.div>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredTool === tool.name && (
              <motion.div
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-dark-800 rounded-lg text-white text-xs font-medium whitespace-nowrap border border-electric-500/30 pointer-events-none"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
              >
                {tool.name}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
