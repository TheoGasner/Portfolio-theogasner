import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

// Import des logos SVG
import figma from '../../assets/tools/figma.svg';
import photoshop from '../../assets/tools/photoshop.svg';
import illustrator from '../../assets/tools/illustrator.svg';
import react from '../../assets/tools/react.svg';
import nextjs from '../../assets/tools/Nextjs.svg';
import tailwind from '../../assets/tools/tailwind.svg';
import wordpress from '../../assets/tools/wordpress.svg';
import github from '../../assets/tools/github.svg';
import vsCode from '../../assets/tools/vs-code.svg';
import davinci from '../../assets/tools/davinci.svg';
import obs from '../../assets/tools/obs.svg';
import notion from '../../assets/tools/notion.svg';
import miro from '../../assets/tools/miro.svg';
import trello from '../../assets/tools/trello.svg';
import canva from '../../assets/tools/canva.svg';
import chatgpt from '../../assets/tools/chatgpt.svg';
import gemini from '../../assets/tools/gemini.svg';
import claude from '../../assets/tools/claude.svg';
import notebooklm from '../../assets/tools/notebooklm.svg';
import capcut from '../../assets/tools/capcut.svg';
import copilot from '../../assets/tools/copilot.svg';
import semrush from '../../assets/tools/semrush.svg';
import analytics from '../../assets/tools/analytics.svg';
import ads from '../../assets/tools/ads.svg';

interface Tool {
  name: string;
  displayName: string; // Nom complet affiché au survol
  icon: string; // chemin vers l'icône SVG (importé)
}

const TOOLS: Tool[] = [
  { name: 'figma', displayName: 'Figma', icon: figma },
  { name: 'photoshop', displayName: 'Adobe Photoshop', icon: photoshop },
  { name: 'illustrator', displayName: 'Adobe Illustrator', icon: illustrator },
  { name: 'react', displayName: 'React', icon: react },
  { name: 'nextjs', displayName: 'Next.js', icon: nextjs },
  { name: 'tailwind', displayName: 'Tailwind CSS', icon: tailwind },
  { name: 'wordpress', displayName: 'WordPress', icon: wordpress },
  { name: 'github', displayName: 'GitHub', icon: github },
  { name: 'vs-code', displayName: 'VS Code', icon: vsCode },
  { name: 'davinci', displayName: 'DaVinci Resolve', icon: davinci },
  { name: 'obs', displayName: 'OBS Studio', icon: obs },
  { name: 'notion', displayName: 'Notion', icon: notion },
  { name: 'miro', displayName: 'Miro', icon: miro },
  { name: 'trello', displayName: 'Trello', icon: trello },
  { name: 'canva', displayName: 'Canva', icon: canva },
  { name: 'chatgpt', displayName: 'ChatGPT', icon: chatgpt },
  { name: 'gemini', displayName: 'Google Gemini', icon: gemini },
  { name: 'claude', displayName: 'Claude', icon: claude },
  { name: 'notebooklm', displayName: 'NotebookLM', icon: notebooklm },
  { name: 'capcut', displayName: 'CapCut', icon: capcut },
  { name: 'copilot', displayName: 'Microsoft Copilot', icon: copilot },
  { name: 'semrush', displayName: 'SEMrush', icon: semrush },
  { name: 'analytics', displayName: 'Google Analytics', icon: analytics },
  { name: 'ads', displayName: 'Google Ads', icon: ads },
];

export function ToolsGrid() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <motion.div
      className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-16 gap-x-6 md:gap-x-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {TOOLS.map((tool, index) => (
        <ToolCard key={tool.name} tool={tool} index={index} isHovered={hoveredTool === tool.name} onHover={setHoveredTool} />
      ))}
    </motion.div>
  );
}

function ToolCard({ tool, index, isHovered, onHover }: { tool: Tool; index: number; isHovered: boolean; onHover: (name: string | null) => void }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;

    rotateY.set(x * 25);
    rotateX.set(y * -25);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    onHover(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative flex justify-center h-20 md:h-24"
      onMouseEnter={() => onHover(tool.name)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-20 md:w-24 h-20 md:h-24 rounded-2xl overflow-hidden cursor-pointer"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          y: -12,
          transition: { duration: 0.3 },
        }}
      >
        {/* Fond glassmorphism avec gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-dark-800/40 to-dark-900/60 backdrop-blur-xl rounded-2xl border border-white/10"
          animate={{
            borderColor: isHovered ? 'rgba(34, 211, 238, 0.6)' : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isHovered
              ? '0 0 40px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.1)'
              : '0 10px 30px rgba(0, 0, 0, 0.3)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl pointer-events-none"
          animate={{
            x: isHovered ? ['-100%', '100%'] : '-100%',
          }}
          transition={{
            duration: isHovered ? 0.6 : 0,
            ease: 'easeInOut',
          }}
        />

        {/* Logo avec animation float */}
        <motion.img
          src={tool.icon}
          alt={tool.displayName}
          className="absolute inset-0 w-full h-full p-3 md:p-4 object-contain"
          animate={{
            filter: isHovered
              ? 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.6)) brightness(1.2)'
              : 'drop-shadow(0 0 0px) brightness(1)',
          }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.15 }}
        />
      </motion.div>

      {/* Tooltip élégant */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.85 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-12 left-0 right-0 mx-auto w-fit px-4 py-2.5 bg-gradient-to-r from-electric-500/90 to-neon-600/90 backdrop-blur-md rounded-lg text-white text-xs md:text-sm font-semibold whitespace-nowrap border border-white/20 shadow-xl pointer-events-none z-50"
          >
            {tool.displayName}
            {/* Triangle pointer */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-electric-500/90" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
