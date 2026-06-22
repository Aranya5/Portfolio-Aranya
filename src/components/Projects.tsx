import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const tripledProjects = [
    ...projects.map((p, i) => ({ ...p, id: `copy0-${i}` })),
    ...projects.map((p, i) => ({ ...p, id: `copy1-${i}` })),
    ...projects.map((p, i) => ({ ...p, id: `copy2-${i}` }))
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft] = useState(true);
  const [canScrollRight] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const getCopyWidth = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || scrollContainer.children.length < projects.length * 3) return 0;

    const N = projects.length;
    const firstChildOfSecondCopy = scrollContainer.children[N] as HTMLElement;
    if (!firstChildOfSecondCopy) return 0;

    return firstChildOfSecondCopy.getBoundingClientRect().left - scrollContainer.getBoundingClientRect().left + scrollContainer.scrollLeft;
  };

  // Center the scroll position in the middle copy and keep it centered on resize
  useEffect(() => {
    if (showAll) return;

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
  }, [showAll]);

  // Smooth continuous circular auto-scrolling loop
  useEffect(() => {
    if (showAll) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let lastTime = performance.now();
    const speed = 30; // pixels per second
    const isScrollPaused = isPaused || selectedProject !== null;

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

        if (!isScrollPaused) {
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
  }, [isPaused, selectedProject, showAll]);

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

        <div className={`relative ${!showAll ? 'px-4 md:px-0' : ''}`}>
          {!showAll && (
            <>
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
            </>
          )}

          <motion.div
            ref={scrollRef}
            className={showAll
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
              : "flex items-stretch overflow-x-auto gap-6 md:gap-8 pb-12 pt-4 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-20 mask-fade"}
          >
            {(showAll ? projects : tripledProjects).map((project, idx) => (
              <motion.div
                key={showAll ? idx : (project as any).id}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{
                  y: -12,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className={`glass p-8 rounded-2xl flex flex-col h-full border border-white/5 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/20 group ${!showAll ? 'w-[85vw] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] min-w-[revert] shrink-0 flex-none' : ''}`}
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
                      onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
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

      {/* Modal Popup for Project see more */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedProject(null)}
          >
            {/* Gradual blur and dark overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 pointer-events-none"
              style={{
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                maskImage: 'radial-gradient(circle, transparent 15%, black 75%)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 15%, black 75%)',
              }}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="glass p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl max-w-2xl w-full bg-[#0d0e15]/50 text-left relative cursor-default "
            >
              {/* Close button in top-right */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal header/icon */}
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  {selectedProject.icon}
                </div>
                <div className="flex space-x-3 text-slate-400 pr-6">
                  {selectedProject.githubUrl && (
                    <motion.a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: "#fff" }}><Code size={20} /></motion.a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <span className="text-xs font-mono text-indigo-400 tracking-wider">
                  {selectedProject.period}
                </span>
                <h3 className="text-3xl font-serif font-bold text-white mt-2 mb-1">
                  {selectedProject.title}
                </h3>
                <h4 className="text-md font-medium text-slate-200">
                  {selectedProject.subtitle}
                </h4>
              </div>

              <div className="mb-8">
                <ul className="text-slate-100 list-disc ml-5 space-y-3 text-base md:text-lg">
                  {selectedProject.description.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>

              {/* Stack Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {selectedProject.stack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1.5 text-xs md:text-sm font-mono rounded bg-white/5 text-slate-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
