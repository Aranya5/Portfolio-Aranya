import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Award } from 'lucide-react';

const education = [
  {
    title: 'B.Tech in Computer Science and Engineering',
    institution: 'Heritage Institute of Technology, Kolkata',
    period: 'Expected June 2027',
    score: 'Current CGPA: 9.64',
    icon: <GraduationCap size={24} className="text-indigo-400" />
  },
  {
    title: 'Higher Secondary (Class XII) - WBCHSE',
    institution: 'Purba Barasat Adarsha Bidyapith, Barasat',
    period: '2022',
    score: 'Score: 94.60%',
    icon: <BookOpen size={24} className="text-cyan-400" />
  },
  {
    title: 'Madhyamik (Class X) - WBBSE',
    institution: 'Purba Barasat Adarsha Bidyapith, Barasat',
    period: '2020',
    score: 'Score: 93.86%',
    icon: <Award size={24} className="text-purple-400" />
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 pt-10">About & Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Bio Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-serif text-indigo-300">Professional Summary</h3>
            <p className="text-slate-300 font-sans leading-relaxed text-lg">
              B.Tech Computer Science undergraduate at Heritage Institute of Technology (graduating June 2027), specializing in full-stack engineering with the MERN stack, Python, and AI/ML systems.
            </p>
            <p className="text-slate-300 font-sans leading-relaxed text-lg">
              Experienced in building RESTful APIs, CNN-based ML pipelines, and real-time collaborative systems. Actively seeking internship or research opportunities to apply skills in scalable backend development and applied machine learning.
            </p>
          </motion.div>

          {/* Education Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8 relative"
          >
            {/* Timeline connection line */}
            <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-indigo-500/50 via-cyan-500/50 to-transparent" />

            {education.map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ x: 10 }}
                className="relative pl-16"
              >
                {/* Timeline dot/icon */}
                <div className="absolute left-0 top-1 p-2 bg-slate-900 border border-indigo-500/30 rounded-full z-10">
                  {item.icon}
                </div>
                
                <div className="glass p-6 rounded-2xl glass-hover">
                  <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full mb-3 inline-block">
                    {item.period}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-slate-400 mb-2">{item.institution}</p>
                  <p className="text-cyan-300 font-mono text-sm border-l-2 border-cyan-500/50 pl-3">
                    {item.score}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
