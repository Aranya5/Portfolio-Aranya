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
    skills: ['React.js', 'React Native', 'Tailwind CSS', 'Vite', 'HTML5/CSS3']
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
    skills: ['TensorFlow', 'Keras', 'OpenCV']
  },
  {
    title: 'Cloud/DevOps',
    icon: <Cloud className="text-sky-400 mb-4" size={32} />,
    skills: ['AWS', 'Docker', 'Git/GitHub', 'Render', 'Vercel', 'Jupyter Notebooks']
  },
  {
    title: 'Core CS',
    icon: <Cpu className="text-orange-400 mb-4" size={32} />,
    skills: ['DSA', 'OOP', 'Operating Systems']
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
  const tripledSkills = [
    ...skillCategories.map((c, i) => ({ ...c, id: `copy0-${i}` })),
    ...skillCategories.map((c, i) => ({ ...c, id: `copy1-${i}` })),
    ...skillCategories.map((c, i) => ({ ...c, id: `copy2-${i}` }))
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft] = useState(true);
  const [canScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const getCopyWidth = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || scrollContainer.children.length < skillCategories.length * 3) return 0;
    
    const N = skillCategories.length;
    const firstChildOfSecondCopy = scrollContainer.children[N] as HTMLElement;
    if (!firstChildOfSecondCopy) return 0;
    
    return firstChildOfSecondCopy.getBoundingClientRect().left - scrollContainer.getBoundingClientRect().left + scrollContainer.scrollLeft;
  };

  // Center the scroll position in the middle copy and keep it centered on resize
  useEffect(() => {
    const handleResize = () => {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        const copyWidth = getCopyWidth();
        if (copyWidth > 0) {
          const currentOffset = scrollContainer.scrollLeft % copyWidth;
          scrollContainer.scrollLeft = copyWidth + currentOffset;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    // Execute after a short delay to ensure layout has computed
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Smooth continuous circular auto-scrolling loop
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let lastTime = performance.now();
    const speed = 30; // pixels per second

    let currentScrollLeft = scrollContainer.scrollLeft;

    const step = (time: number) => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      const copyWidth = getCopyWidth();
      if (copyWidth > 0) {
        let actualScrollLeft = scrollContainer.scrollLeft;

        // Seamless wrap-around checks
        if (actualScrollLeft >= 2 * copyWidth) {
          actualScrollLeft -= copyWidth;
          scrollContainer.scrollLeft = actualScrollLeft;
        } else if (actualScrollLeft < copyWidth) {
          actualScrollLeft += copyWidth;
          scrollContainer.scrollLeft = actualScrollLeft;
        }

        if (!isPaused) {
          currentScrollLeft = actualScrollLeft + speed * deltaTime;
          scrollContainer.scrollLeft = currentScrollLeft;
        } else {
          currentScrollLeft = actualScrollLeft;
        }
      }

      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

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

        <div className="relative px-4 md:px-0">
          {/* Left Fade Zone & Sensor */}
          <div 
            className="absolute left-0 top-0 bottom-12 w-20 md:w-32 bg-white/0 z-30 pointer-events-auto flex items-center justify-start pl-2 md:pl-4 group/left-sensor"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left Navigation Arrow */}
            <button 
              onClick={() => scroll('left')}
              className={`w-12 h-12 flex items-center justify-center rounded-full glass shadow-xl transition-all duration-300 opacity-0 group-hover/left-sensor:opacity-100 ${canScrollLeft ? 'text-cyan-400 hover:bg-white/10 hover:scale-110 cursor-pointer' : 'text-slate-600 cursor-not-allowed pointer-events-none opacity-0'}`}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          {/* Right Fade Zone & Sensor */}
          <div 
            className="absolute right-0 top-0 bottom-12 w-20 md:w-32 bg-white/0 z-30 pointer-events-auto flex items-center justify-end pr-2 md:pr-4 group/right-sensor"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Right Navigation Arrow */}
            <button 
              onClick={() => scroll('right')}
              className={`w-12 h-12 flex items-center justify-center rounded-full glass shadow-xl transition-all duration-300 opacity-0 group-hover/right-sensor:opacity-100 ${canScrollRight ? 'text-cyan-400 hover:bg-white/10 hover:scale-110 cursor-pointer' : 'text-slate-600 cursor-not-allowed pointer-events-none opacity-0'}`}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <motion.div 
            ref={scrollRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex overflow-x-auto items-stretch gap-6 pb-12 pt-4 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-20 mask-fade"
          >
          {tripledSkills.map((category) => (
            <motion.div 
              key={(category as any).id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="glass p-6 md:p-8 rounded-2xl border-t border-white/10 relative overflow-hidden group min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] aspect-square shrink-0 flex flex-col justify-center items-center h-full hover:shadow-2xl hover:shadow-cyan-500/10 transition-all cursor-grab active:cursor-grabbing"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center">
                <div className="flex items-center justify-center text-center transform transition-transform group-hover:scale-110 duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-serif mb-5 text-white group-hover:text-cyan-300 transition-colors">
                  {category.title}
                </h3>
                <div className="flex flex-wrap justify-center gap-3 w-full px-2">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="w-[calc(50%-6px)] px-2 py-1.5 text-xs font-mono rounded bg-slate-800/80 text-cyan-100 border border-cyan-500/20 shadow-sm flex items-center justify-center text-center"
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
