import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Layout, Server, Database, BrainCircuit, Cloud, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';

const skillCategories = [
  {
    title: 'Languages',
    icon: <Terminal className="text-indigo-400 mb-4" size={32} />,
    skills: ['Java', 'Python', 'C/C++', 'JavaScript', 'TypeScript']
  },
  {
    title: 'Frontend',
    icon: <Layout className="text-cyan-400 mb-4" size={32} />,
    skills: ['React.js', 'Tailwind CSS', 'Vite', 'HTML5/CSS3']
  },
  {
    title: 'Backend',
    icon: <Server className="text-purple-400 mb-4" size={32} />,
    skills: ['Node.js', 'Express.js', 'Flask', 'Django', 'FastAPI', 'Socket.io']
  },
  {
    title: 'Databases',
    icon: <Database className="text-emerald-400 mb-4" size={32} />,
    skills: ['MongoDB', 'MySQL', 'Redis']
  },
  {
    title: 'ML/AI',
    icon: <BrainCircuit className="text-pink-400 mb-4" size={32} />,
    skills: ['TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV']
  },
  {
    title: 'Cloud/DevOps',
    icon: <Cloud className="text-sky-400 mb-4" size={32} />,
    skills: ['AWS', 'Docker', 'Git/GitHub', 'Maven', 'Render', 'Vercel', 'Jupyter']
  },
  {
    title: 'Core CS',
    icon: <Cpu className="text-orange-400 mb-4" size={32} />,
    skills: ['Data Structures', 'Algorithms', 'OOPs', 'Operating Systems']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
};

export default function Skills() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">Core Competencies</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-400 font-sans">Technologies and tools I leverage to engineer scalable systems.</p>
        </motion.div>

        <div className="relative group/slider px-4 md:px-0">
          {/* Left Navigation Arrow */}
          <button 
            onClick={() => scroll('left')}
            className={`absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full glass shadow-xl transition-all duration-300 md:opacity-0 md:group-hover/slider:opacity-100 ${canScrollLeft ? 'text-cyan-400 hover:bg-white/10 hover:scale-110 cursor-pointer' : 'text-slate-600 cursor-not-allowed opacity-0 md:opacity-0 pointer-events-none'}`}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Navigation Arrow */}
          <button 
            onClick={() => scroll('right')}
            className={`absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full glass shadow-xl transition-all duration-300 pointer-events-auto md:opacity-0 md:group-hover/slider:opacity-100 ${canScrollRight ? 'text-cyan-400 hover:bg-white/10 hover:scale-110 cursor-pointer' : 'text-slate-600 cursor-not-allowed opacity-50 md:opacity-50 pointer-events-none'}`}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          <motion.div 
            ref={scrollRef}
            onScroll={checkScroll}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex overflow-x-auto items-stretch gap-6 pb-12 snap-x snap-mandatory pt-4 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-20"
          >
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass p-6 md:p-8 rounded-2xl border-t border-white/10 relative overflow-hidden group min-w-[280px] md:min-w-[340px] snap-center shrink-0 flex flex-col h-full hover:shadow-2xl hover:shadow-cyan-500/10 transition-all cursor-grab active:cursor-grabbing"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {category.icon}
                <h3 className="text-xl md:text-2xl font-bold font-serif mb-5 text-white group-hover:text-cyan-300 transition-colors">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-2 py-1 text-xs font-mono rounded bg-slate-800/80 text-cyan-100 border border-cyan-500/20 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
