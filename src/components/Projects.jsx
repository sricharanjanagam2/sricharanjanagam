import { motion } from 'framer-motion';
import { ExternalLink, Brain } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: "Human Memory Simulator",
    description: "An interactive data structure simulation modelling how Short-Term and Long-Term memories are prioritized and forgotten in real-time, powered by C logic ported to React.",
    tech: ["React", "C", "Framer Motion", "Gemini API"],
    github: "https://github.com/sricharanjanagam2/human-memory-web",
    live: "#simulator",
    color: "from-purple-500 to-cyan-500",
    isSimulator: true,
    icon: "brain"
  },
  {
    title: "AI Chat Application",
    description: "A real-time messaging application with integrated AI chatbots, powered by Gemini and React.",
    tech: ["React", "Firebase", "Gemini API", "Tailwind"],
    github: "#",
    live: "https://edith-chatbot-oo7v.onrender.com/",
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "E-Commerce Dashboard",
    description: "Analytics dashboard for online stores featuring interactive charts, sales forecasting, and inventory tracking.",
    tech: ["Next.js", "TypeScript", "Chart.js", "Node.js"],
    github: "#",
    live: "#",
    color: "from-purple-500 to-pink-500"
  },
];

function Projects() {
  const handleSimulatorClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('simulator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-black/20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-medium tracking-wider mb-2 uppercase text-sm inline-block">Selected Works</span>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Projects</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
              style={{ perspective: 1000 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl blur-xl -z-10 bg-cyan-500"></div>
              <div className={`glass-card h-full p-8 rounded-2xl flex flex-col border transition-colors ${
                project.isSimulator
                  ? 'border-purple-500/30 group-hover:border-purple-400/60 shadow-[0_0_30px_rgba(168,85,247,0.1)]'
                  : 'border-white/10 group-hover:border-white/30'
              }`}>
                {project.isSimulator && (
                  <span className="self-start mb-4 px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-xs font-semibold text-purple-300 uppercase tracking-widest">
                    ⭐ Featured
                  </span>
                )}

                <div className={`w-14 h-14 rounded-xl mb-6 bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}>
                  {project.icon === 'brain'
                    ? <Brain size={28} className="text-white" />
                    : <span className="text-white font-bold text-xl">{project.title.charAt(0)}</span>
                  }
                </div>

                <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                <p className="text-slate-400 mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-full text-xs font-medium text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-700/50 mt-auto">
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                    <FaGithub size={18} /> Code
                  </a>
                  {project.isSimulator ? (
                    <button
                      onClick={handleSimulatorClick}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium ml-auto"
                    >
                      Try Demo <ExternalLink size={18} />
                    </button>
                  ) : (
                    <a href={project.live} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium ml-auto">
                      Live Demo <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
