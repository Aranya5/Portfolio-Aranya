import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeTab, setActiveTab] = useState<'image' | 'json' | 'terminal'>('image');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      id="home" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden select-none"
    >
      {/* Background Spotlight Grid */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `
            radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.12), transparent 70%), 
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100%, 24px 24px',
          opacity: isHovering ? 1 : 0.4,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Ambient backgrounds blur */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] -z-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-[120px] -z-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center z-10 w-full">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="space-y-6 select-text"
        >
          {/* Developer Bash Prompt decoration */}
          <div className="flex items-center space-x-2 font-mono text-xs text-indigo-400/80 select-none">
            <span>aranya.basu ~ %</span>
            <span className="text-slate-400">cat intro.sh</span>
            <span className="w-1.5 h-3 bg-indigo-500 animate-pulse" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block px-6 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 font-serif text-xl md:text-2xl font-bold tracking-wide"
          >
            Aranya Basu
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Engineering robust software <br />
            from <span className="text-gradient font-serif italic">concept</span> to execution.
          </h1>

          <p className="text-lg text-slate-400 font-sans max-w-lg leading-relaxed">
            I am a <strong className="text-white">Full-Stack Engineer</strong> and CS undergraduate, specializing in scalable backend architecture, applied AI/ML systems, and interactive interfaces.
          </p>

          <div className="flex flex-wrap gap-4 pt-4 select-none">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center space-x-2 transition-colors shadow-lg shadow-indigo-600/25"
            >
              <span>View Projects</span>
              <ArrowRight size={18} />
            </motion.a>

            <motion.a
              href="https://drive.google.com/file/d/1gx_nV3GpboomZPDImrBL0Cjp8ExztbGd/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full glass glass-hover text-white font-medium flex items-center space-x-2"
            >
              <span>View My Resume</span>
              <Download size={18} />
            </motion.a>
          </div>
        </motion.div>

        {/* Profile Picture Mock IDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center py-10"
        >
          {/* Gentle float animation to feel alive */}
          <motion.div
            animate={{
              y: [-8, 8, -8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full max-w-lg h-[30rem] rounded-2xl glass bg-[#0a0b10]/90 border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* IDE Header Tabs Bar */}
            <div className="flex items-center justify-between border-b border-white/5 bg-[#0e0f15]/80 select-none">
              <div className="flex items-center w-full overflow-hidden">
                {/* Mac Window Controls */}
                <div className="flex items-center space-x-1.5 px-4 border-r border-white/5 h-full py-3.5 select-none">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f56]/80" />
                  <div className="w-2 h-2 rounded-full bg-[#ffbd2e]/80" />
                  <div className="w-2 h-2 rounded-full bg-[#27c93f]/80" />
                </div>

                {/* Tabs container */}
                <div className="flex overflow-x-hidden scrollbar-none select-none">
                  {/* Tab 1: Image */}
                  <button
                    onClick={() => setActiveTab('image')}
                    className={`px-4 py-3 text-xs font-mono flex items-center space-x-2 border-r border-white/5 transition-colors relative ${
                      activeTab === 'image'
                        ? 'bg-[#0a0b10] text-slate-200'
                        : 'text-slate-500 hover:text-slate-300 bg-transparent'
                    }`}
                  >
                    <span className="text-[#a78bfa] text-sm">🖼️</span>
                    <span>aranya.jpg</span>
                    {activeTab === 'image' && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-indigo-500" />
                    )}
                  </button>

                  {/* Tab 2: Specs JSON */}
                  <button
                    onClick={() => setActiveTab('json')}
                    className={`px-4 py-3 text-xs font-mono flex items-center space-x-2 border-r border-white/5 transition-colors relative ${
                      activeTab === 'json'
                        ? 'bg-[#0a0b10] text-slate-200'
                        : 'text-slate-500 hover:text-slate-300 bg-transparent'
                    }`}
                  >
                    <span className="text-[#fb923c] font-bold">{"{}"}</span>
                    <span>specs.json</span>
                    {activeTab === 'json' && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-indigo-500" />
                    )}
                  </button>

                  {/* Tab 3: Terminal shell */}
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`px-4 py-3 text-xs font-mono flex items-center space-x-2 border-r border-white/5 transition-colors relative ${
                      activeTab === 'terminal'
                        ? 'bg-[#0a0b10] text-slate-200'
                        : 'text-slate-500 hover:text-slate-300 bg-transparent'
                    }`}
                  >
                    <span className="text-[#4ade80] font-bold">$_</span>
                    <span>terminal.sh</span>
                    {activeTab === 'terminal' && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-indigo-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* IDE Content Area */}
            <div className="flex-1 relative overflow-hidden bg-[#0a0b10]/95">
              <AnimatePresence mode="wait">
                {activeTab === 'image' && (
                  <motion.div
                    key="image-tab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-full overflow-hidden"
                  >
                    <img
                      src="/aranya_profile.jpg"
                      alt="Aranya Basu"
                      className="w-full h-full object-cover grayscale-[15%] contrast-110 object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent opacity-80" />
                    
                    {/* Console Output overlay at bottom of image */}
                    <div className="absolute bottom-3 left-4 right-4 z-20 font-mono text-[11px] bg-black/75 backdrop-blur-md border border-white/10 rounded px-3 py-2 text-slate-300 flex items-center justify-between shadow-lg select-none">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>aranya.basu ~ main % node run</span>
                      </span>
                      <span className="text-indigo-400 font-bold text-[10px]">SUCCESS</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'json' && (
                  <motion.div
                    key="json-tab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full overflow-y-auto p-5 font-mono text-[11px] leading-relaxed text-slate-300 select-all scrollbar-none"
                  >
                    <div className="flex">
                      <div className="text-slate-600 text-right pr-4 border-r border-white/5 select-none text-[11px] w-6">
                        {Array.from({ length: 15 }, (_, i) => (
                          <div key={i}>{i + 1}</div>
                        ))}
                      </div>
                      <div className="pl-4">
                        <div><span className="text-[#a78bfa]">{"{"}</span></div>
                        <div className="pl-4"><span className="text-[#38bdf8]">"name"</span>: <span className="text-[#4ade80]">"Aranya Basu"</span>,</div>
                        <div className="pl-4"><span className="text-[#38bdf8]">"role"</span>: <span className="text-[#4ade80]">"Full-Stack Engineer"</span>,</div>
                        <div className="pl-4"><span className="text-[#38bdf8]">"education"</span>: <span className="text-[#a78bfa]">{"{"}</span></div>
                        <div className="pl-8"><span className="text-[#38bdf8]">"degree"</span>: <span className="text-[#4ade80]">"Computer Science undergraduate"</span>,</div>
                        <div className="pl-8"><span className="text-[#38bdf8]">"metrics"</span>: <span className="text-[#fb923c]">"CGPA 9.64/10"</span></div>
                        <div className="pl-4"><span className="text-[#a78bfa]">{"}"}</span>,</div>
                        <div className="pl-4"><span className="text-[#38bdf8]">"specialties"</span>: <span className="text-[#a78bfa]">{"["}</span></div>
                        <div className="pl-8"><span className="text-[#4ade80]">"Scalable Backend Architecture"</span>,</div>
                        <div className="pl-8"><span className="text-[#4ade80]">"Applied AI / ML Systems"</span>,</div>
                        <div className="pl-8"><span className="text-[#4ade80]">"Premium Interactive Interfaces"</span></div>
                        <div className="pl-4"><span className="text-[#a78bfa]">{"]"}</span>,</div>
                        <div className="pl-4"><span className="text-[#38bdf8]">"status"</span>: <span className="text-[#4ade80]">"building_the_future"</span></div>
                        <div><span className="text-[#a78bfa]">{"}"}</span></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'terminal' && (
                  <motion.div
                    key="terminal-tab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full bg-[#050508]/95 p-6 font-mono text-[11px] leading-relaxed text-slate-300 overflow-y-auto scrollbar-none"
                  >
                    <div className="space-y-3 select-text">
                      <div className="flex items-center gap-2 select-none">
                        <span className="text-emerald-400">$</span>
                        <span className="text-slate-100">developer --status</span>
                      </div>
                      <div className="space-y-1.5 border-l-2 border-indigo-500/30 pl-3">
                        <div className="flex items-center gap-1.5 select-none">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="font-bold text-white">Aranya Basu — Online</span>
                        </div>
                        <div className="text-slate-400">Role: Full-Stack Engineer</div>
                        <div className="text-slate-400">Stack: TypeScript, Python, Go, React, Node.js</div>
                        <div className="text-slate-400">DBs: PostgreSQL, MongoDB, Redis, Pinecone</div>
                        <div className="text-slate-300 italic">"Engineering robust software from concept to execution."</div>
                      </div>
                      <div className="flex items-center gap-2 pt-2 select-none">
                        <span className="text-emerald-400">$</span>
                        <span className="text-slate-100 animate-pulse">_</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div >
    </section >
  );
}
