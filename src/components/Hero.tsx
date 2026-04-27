import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block px-6 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 font-serif text-xl md:text-2xl font-bold tracking-wide"
          >
            Aranya Basu
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Engineering robust software <br />
            from <span className="text-gradient font-serif italic">concept</span> to execution.
          </h1>

          <p className="text-lg text-slate-400 font-sans max-w-lg leading-relaxed">
            I am a <strong className="text-white">Full-Stack Engineer</strong> and CS undergraduate, specializing in scalable backend architecture, applied AI/ML systems, and interactive interfaces.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
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

        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center py-10"
        >
          {/* Floating Geometric Frame */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-2, 2, -2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-72 h-96 md:w-80 md:h-[28rem] rounded-2xl p-1 glass overflow-hidden shadow-2xl shadow-indigo-500/10 border-indigo-500/20"
          >
            {/* Dark gradient fade over the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent z-10 rounded-2xl" />

            <img
              src="/aranya_profile.jpg"
              alt="Aranya Basu"
              className="w-full h-full object-cover rounded-xl grayscale-[15%] contrast-110 object-top"
            />

            {/* Floating elements indicating anti-gravity */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-20 h-20 bg-cyan-500/20 blur-2xl rounded-full z-20"
            />
          </motion.div>
        </motion.div>
      </div >
    </section >
  );
}
