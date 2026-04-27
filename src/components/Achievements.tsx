import { motion } from 'framer-motion';
import { Trophy, Medal, Users } from 'lucide-react';

const achievements = [
  {
    title: '1st Place',
    event: 'Hack Heritage 2.0',
    description: 'Won with "Strawhats," an AI-driven crop disease detection system built and deployed within the hackathon window.',
    icon: <Trophy className="text-yellow-400" size={28} />,
    color: 'from-yellow-500/20 to-amber-600/5'
  },
  {
    title: 'Hackathon Competitor',
    event: 'Hack Heritage 3.0 & Aignite\'25',
    description: 'Successfully built and deployed functional software prototypes under strict time constraints.',
    icon: <Medal className="text-slate-300" size={28} />,
    color: 'from-slate-400/20 to-slate-600/5'
  }
];

const leadership = [
  {
    title: 'Student Organizer',
    event: 'DAKSHH 2026',
    description: 'Directed visual designing and overall event management for HITK\'s annual techno-management fest.',
    icon: <Users className="text-cyan-400" size={28} />
  },
  {
    title: 'Student Organizer',
    event: 'ICAA \'26',
    description: 'Managed visual designing, technical operations, and hall coordination for the International Conference on Applied Algorithms, Heritage Institute of Technology.',
    icon: <Users className="text-indigo-400" size={28} />
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">Achievements & Leadership</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Hackathons / Awards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-serif text-yellow-500 mb-8 flex items-center gap-3">
              <Trophy size={24} /> 
              Competitive Excellence
            </h3>
            
            {achievements.map((item, idx) => (
              <div 
                key={idx}
                className={`glass p-6 rounded-2xl border-l-4 border-l-yellow-500/50 bg-gradient-to-r ${item.color} flex gap-6 items-start`}
              >
                <div className="p-3 bg-black/40 rounded-xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-sm font-mono text-yellow-400 mb-3">{item.event}</p>
                  <p className="text-slate-400 leading-relaxed text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Leadership Roles */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-serif text-cyan-500 mb-8 flex items-center gap-3">
              <Users size={24} /> 
              Leadership
            </h3>
            
            <div className="glass p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-indigo-500/5 opacity-50 group-hover:scale-105 transition-transform duration-700" />
              
              <div className="relative z-10 space-y-8">
                {leadership.map((item, idx) => (
                  <div key={idx} className="flex gap-5">
                    <div className="shrink-0 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm font-mono text-cyan-300 mb-2">{item.event}</p>
                      <p className="text-slate-400 leading-relaxed text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
