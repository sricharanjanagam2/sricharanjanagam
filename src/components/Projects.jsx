import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: "AI Chat Application",
    description: "A real-time messaging application with integrated AI chatbots, powered by Gemini and React.",
    tech: ["React", "Firebase", "Gemini API", "Tailwind"],
    github: "#",
    live: "#",
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
  {
    title: "Task Management Web App",
    description: "A beautiful Kanban-style task board with drag-and-drop features, offline support, and dark mode.",
    tech: ["React", "Redux", "Framer Motion", "CSS Modules"],
    github: "#",
    live: "#",
    color: "from-emerald-400 to-cyan-500"
  }
];

function Projects() {
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
              <div className="glass-card h-full p-8 rounded-2xl flex flex-col border border-white/10 group-hover:border-white/30 transition-colors">
                
                <div className={`w-14 h-14 rounded-xl mb-6 bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-xl">{project.title.charAt(0)}</span>
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
                  <a href={project.github} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                    <FaGithub size={18} /> Code
                  </a>
                  <a href={project.live} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium ml-auto">
                    Live Demo <ExternalLink size={18} />
                  </a>
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
