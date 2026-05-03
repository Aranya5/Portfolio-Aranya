import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Code2, ShieldAlert, Cpu, ScanEye, ChevronLeft, ChevronRight, Grid, List, Terminal } from 'lucide-react';

const projects = [
  {
    title: 'Argus CLI',
    period: 'Apr 2026 - Current',
    subtitle: 'Asynchronous Voice-Activated DevOps Assistant',
    description: [
      'Engineered a decoupled, multi-process Rust architecture featuring a voice telemetry brain, a command execution daemon, and a 60FPS Ratatui TUI dashboard.',
      'Developed smart network telemetry and automated workflows to detect frameworks, nuke zombie ports, and manipulate native browsers via AppleScript.'
    ],
    stack: ['Rust', 'Ratatui', 'CLI/Daemon', 'Voice-to-Text', 'AppleScript'],
    icon: <Terminal className="text-cyan-400" size={24} />,
    githubUrl: 'https://github.com/Aranya5/Argus-CLI'
  },
  {
    title: 'Retro Quest',
    period: 'Jan 2026 - Current',
    subtitle: '2D Adventure Game',
    description: [
      'Architected a custom 2D Java game engine featuring core loops, physics, and AABB collision detection, applying Entity-Component and State Machine OOP design patterns.',
      'Optimized sprite rendering and asset management pipelines via spatial data structures, resolving cross-platform loading bottlenecks and increasing rendering efficiency by over 40%.'
    ],
    stack: ['Java', 'OOP', 'Data Structures', 'Custom Rendering Engine'],
    icon: <Cpu className="text-amber-400" size={24} />,
    githubUrl: 'https://github.com/Aranya5/Retro-Quest'
  },
  {
    title: 'ShelfMate',
    period: 'Jan 2026 - Mar 2026',
    subtitle: 'Edge AI Retail Analytics Platform',
    description: [
      'Full-stack AI platform enabling real-time retail analytics, automating stockout detection, and analyzing shopper intent for store managers.',
      'Engineered a computer vision pipeline with OpenCV and MediaPipe, integrating Firebase for real-time task coordination and predictive gap velocity algorithms.'
    ],
    stack: ['Python', 'OpenCV', 'MediaPipe', 'Node.js', 'SQL', 'Firebase'],
    icon: <ScanEye className="text-violet-400" size={24} />,
    githubUrl: 'https://github.com/Aranya5/ShelfMate'
  },
  {
    title: 'AAB-O-HAWA',
    period: 'Aug 2025 - Sep 2025',
    subtitle: 'Crowdsourced Civic Data Platform',
    description: [
      'Built a full-stack civic crowdsourcing platform for real-time issue reporting, supporting 500+ geotagged submissions with Google Maps and Leaflet heatmap visualization.',
      'Engineered role-based JWT authentication and live Socket.io collaboration, integrating Cloudinary CDN for secure image storage to reduce media upload latency by ~35%.',
      'Implemented Express.js REST APIs and MongoDB aggregation pipelines for hotspot detection, driving a responsive React/TypeScript frontend deployed on Render.'
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io', 'Google Maps API'],
    icon: <ShieldAlert className="text-rose-400" size={24} />,
    githubUrl: 'https://github.com/Aranya5/Un4gettable'
  },
  {
    title: 'Straw-hats',
    period: 'Aug 2024 - Oct 2024',
    subtitle: 'AI-Driven Crop Disease Management System',
    description: [
      'Engineered a TensorFlow-based CNN trained on 13,000+ images using bagging ensemble techniques, achieving 86%+ test accuracy for multi-class crop disease prediction.',
      'Architected a scalable Flask/FastAPI backend to expose RESTful prediction endpoints, delivering real-time diagnostic results to a responsive frontend with <200ms inference latency.'
    ],
    stack: ['Python', 'TensorFlow', 'CNN', 'Flask', 'FastAPI', 'Machine Learning'],
    icon: <Code2 className="text-emerald-400" size={24} />,
    githubUrl: 'https://github.com/Aranya5/Strawhats'
  }
];

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current && !showAll) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10);
    }
  };

  useEffect(() => {
    if (!showAll) {
      checkScroll();
      window.addEventListener('resize', checkScroll);
      return () => window.removeEventListener('resize', checkScroll);
    }
  }, [showAll]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-rose-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-400 font-sans max-w-2xl mx-auto">
            A showcase of my recent project architectures, where robust backend engineering resists the pull of complexity, elevating the user experience.
          </p>
        </motion.div>

        <div className="flex justify-end mb-8 relative z-30">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 rounded-full glass glass-hover text-sm font-mono text-cyan-300 flex items-center gap-2 hover:bg-white/5 transition-colors focus:outline-none"
          >
            {showAll ? <><List size={16} /> Show Slider</> : <><Grid size={16} /> View All Projects</>}
          </button>
        </div>

        <div className={`relative ${!showAll ? 'group/slider px-4 md:px-0' : ''}`}>
          {!showAll && (
            <>
              {/* Left Navigation Arrow */}
              <button 
                onClick={() => scroll('left')}
                className={`absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full glass shadow-xl transition-all duration-300 md:opacity-0 md:group-hover/slider:opacity-100 ${canScrollLeft ? 'text-cyan-400 hover:bg-white/10 hover:scale-110 cursor-pointer' : 'text-slate-600 cursor-not-allowed opacity-0 md:opacity-0 pointer-events-none'}`}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Right Navigation Arrow */}
              <button 
                onClick={() => scroll('right')}
                className={`absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full glass shadow-xl transition-all duration-300 pointer-events-auto md:opacity-0 md:group-hover/slider:opacity-100 ${canScrollRight ? 'text-cyan-400 hover:bg-white/10 hover:scale-110 cursor-pointer' : 'text-slate-600 cursor-not-allowed opacity-50 md:opacity-50 pointer-events-none'}`}
                disabled={!canScrollRight}
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <motion.div 
            ref={scrollRef}
            onScroll={!showAll ? checkScroll : undefined}
            className={showAll 
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" 
              : "flex items-stretch overflow-x-auto gap-6 md:gap-8 pb-12 snap-x snap-mandatory pt-4 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-20"}
          >
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ 
                  y: -12, 
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className={`glass p-8 rounded-2xl flex flex-col h-full border border-white/5 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/20 group ${!showAll ? 'w-[85vw] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] min-w-[revert] snap-center shrink-0 flex-none' : ''}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <div className="flex space-x-3 text-slate-400">
                    {project.githubUrl && (
                      <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: "#fff" }}><Code size={20} /></motion.a>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-xs font-mono text-indigo-400 tracking-wider">
                    {project.period}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-2 mb-1">
                    {project.title}
                  </h3>
                  <h4 className="text-sm font-medium text-slate-300">
                    {project.subtitle}
                  </h4>
                </div>

                <div className="flex-grow mb-8">
                  <ul className={`text-slate-400 list-disc ml-5 space-y-1 ${!showAll ? 'line-clamp-4' : ''}`}>
                    {project.description.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                  {!showAll && project.description.join(' ').length > 150 && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowAll(true); }}
                      className="text-cyan-400 text-sm font-mono mt-2 flex items-center hover:underline"
                    >
                      ...see more
                    </button>
                  )}
                </div>

                {/* Tag Cloud */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2 py-1 text-xs font-mono rounded bg-white/5 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
