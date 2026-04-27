import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5 0-1.4-.5-2.5-1.5-3.5.1-.3.6-1.7-.1-3.5 0 0-1.1-.4-3.5 1.2-1-.3-2.1-.4-3.1-.4-1 0-2.1.1-3.1.4-2.4-1.6-3.5-1.2-3.5-1.2-.7 1.8-.2 3.2-.1 3.5-1 1-1.5 2.1-1.5 3.5 0 5 3 6.2 6 6.5-.4.4-.8 1.1-.9 2.2-.1.9-.1 2.3-.1 2.8 0 .5-.3 1.1-.9 1.4" />
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 md:p-16 text-center shadow-2xl shadow-indigo-500/10 border-indigo-500/20 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-white">Let's Build the Future</h2>
          <p className="text-slate-400 font-sans max-w-xl mx-auto mb-12 text-lg">
            I am available for software engineering internships and full-time roles.
            Connect with me to discuss scalable systems, deep learning, and everything in between.
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">

            <a href="mailto:basuaranya5@gmail.com" className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4 group-hover:-translate-y-2 group-hover:bg-indigo-600/20 group-hover:border-indigo-500/50 transition-all duration-300">
                <Mail className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={28} />
              </div>
              <span className="text-slate-300 font-mono text-sm tracking-wide group-hover:text-white">basuaranya5@gmail.com</span>
            </a>

            <a href="tel:+917044576568" className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4 group-hover:-translate-y-2 group-hover:bg-cyan-600/20 group-hover:border-cyan-500/50 transition-all duration-300">
                <Phone className="text-cyan-400 group-hover:text-cyan-300 transition-colors" size={28} />
              </div>
              <span className="text-slate-300 font-mono text-sm tracking-wide group-hover:text-white">+91 70445 76568</span>
            </a>

            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4 group-hover:-translate-y-2 group-hover:bg-purple-600/20 group-hover:border-purple-500/50 transition-all duration-300 cursor-default">
                <MapPin className="text-purple-400 group-hover:text-purple-300 transition-colors" size={28} />
              </div>
              <span className="text-slate-300 font-mono text-sm tracking-wide text-center max-w-[200px]">
                North 24 Parganas, West Bengal
              </span>
            </div>

          </div>

          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-slate-500 font-mono text-sm text-left">
              &copy; 2026 Aranya Basu.<br />
              Engineered with React & Framer Motion.
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/Aranya5"
                target="_blank" rel="noreferrer"
                className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-400"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/aranya-basu-80437b359/"
                target="_blank" rel="noreferrer"
                className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center text-slate-300 hover:text-[#0a66c2] hover:border-[#0a66c2]/50"
              >
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
