import { motion } from 'framer-motion';

const skillsData = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 90 },
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "Tailwind CSS", level: 85 },
      { name: "HTML/CSS", level: 95 },
    ]
  },
  {
    category: "Backend & Systems",
    items: [
      { name: "C / C++", level: 80 },
      { name: "Node.js", level: 75 },
      { name: "Data Structures", level: 90 },
      { name: "Algorithms", level: 85 },
    ]
  },
  {
    category: "Tools & DevOps",
    items: [
      { name: "Git & GitHub", level: 85 },
      { name: "Vite", level: 80 },
      { name: "Linux / GNU", level: 75 },
      { name: "VS Code", level: 90 },
    ]
  }
];

function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-medium tracking-wider mb-2 uppercase text-sm inline-block">My Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white">Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500">Skills</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skillGroup, groupIdx) => (
            <motion.div 
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIdx * 0.2 }}
              className="glass p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors shadow-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.1)] group"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 border border-slate-700 group-hover:border-cyan-400 transition-colors">
                  {groupIdx === 0 ? '💻' : groupIdx === 1 ? '⚙️' : '🔧'}
                </span>
                <span className="text-slate-200">{skillGroup.category}</span>
              </h3>

              <div className="flex flex-col gap-6">
                {skillGroup.items.map((item, idx) => (
                  <div key={item.name} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-300">{item.name}</span>
                      <span className="text-xs font-bold text-slate-500">{item.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + (idx * 0.1) }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 relative"
                      >
                        {/* Shimmer effect */}
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
