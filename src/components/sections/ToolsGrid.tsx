import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tool {
  name: string;
  displayName: string; // Nom complet affiché au survol
  icon: string; // chemin vers l'icône SVG
  color: string;
}

const TOOLS: Tool[] = [
  { name: 'figma', displayName: 'Figma', icon: '/assets/tools/figma.svg', color: 'from-purple-500 to-pink-500' },
  { name: 'photoshop', displayName: 'Adobe Photoshop', icon: '/assets/tools/photoshop.svg', color: 'from-blue-500 to-cyan-500' },
  { name: 'illustrator', displayName: 'Adobe Illustrator', icon: '/assets/tools/illustrator.svg', color: 'from-orange-500 to-red-500' },
  { name: 'react', displayName: 'React', icon: '/assets/tools/react.svg', color: 'from-cyan-400 to-blue-500' },
  { name: 'nextjs', displayName: 'Next.js', icon: '/assets/tools/nextjs.svg', color: 'from-gray-700 to-black' },
  { name: 'tailwind', displayName: 'Tailwind CSS', icon: '/assets/tools/tailwind.svg', color: 'from-cyan-500 to-blue-600' },
  { name: 'wordpress', displayName: 'WordPress', icon: '/assets/tools/wordpress.svg', color: 'from-blue-500 to-blue-700' },
  { name: 'github', displayName: 'GitHub', icon: '/assets/tools/github.svg', color: 'from-gray-600 to-gray-800' },
  { name: 'vs-code', displayName: 'VS Code', icon: '/assets/tools/vs-code.svg', color: 'from-blue-600 to-cyan-500' },
  { name: 'davinci', displayName: 'DaVinci Resolve', icon: '/assets/tools/davinci.svg', color: 'from-orange-500 to-yellow-600' },
  { name: 'obs', displayName: 'OBS Studio', icon: '/assets/tools/obs.svg', color: 'from-purple-500 to-pink-600' },
  { name: 'notion', displayName: 'Notion', icon: '/assets/tools/notion.svg', color: 'from-gray-600 to-gray-800' },
  { name: 'miro', displayName: 'Miro', icon: '/assets/tools/miro.svg', color: 'from-yellow-400 to-orange-500' },
  { name: 'trello', displayName: 'Trello', icon: '/assets/tools/trello.svg', color: 'from-blue-500 to-cyan-600' },
  { name: 'canva', displayName: 'Canva', icon: '/assets/tools/canva.svg', color: 'from-purple-400 to-pink-500' },
  { name: 'chatgpt', displayName: 'ChatGPT', icon: '/assets/tools/chatgpt.svg', color: 'from-green-500 to-teal-600' },
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
            className={`w-20 h-20 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-4xl shadow-lg cursor-pointer overflow-hidden`}
            whileHover={{ scale: 1.1, rotateZ: 5 }}
            animate={{
              boxShadow: hoveredTool === tool.name
                ? '0 0 30px rgba(14, 165, 233, 0.6)'
                : '0 10px 25px rgba(0, 0, 0, 0.3)'
            }}
          >
            <img
              src={tool.icon}
              alt={tool.displayName}
              className="w-12 h-12 object-contain"
              onError={(e) => {
                // Fallback en cas d'image manquante - affiche emoji
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </motion.div>

          {/* Tooltip avec nom complet */}
          <AnimatePresence>
            {hoveredTool === tool.name && (
              <motion.div
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-dark-800 rounded-lg text-white text-xs font-medium whitespace-nowrap border border-electric-500/30 pointer-events-none"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
              >
                {tool.displayName}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
