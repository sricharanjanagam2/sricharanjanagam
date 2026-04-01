import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { ChevronDown, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <span className="text-cyan-400 font-medium tracking-wider mb-4 uppercase text-sm">Welcome to my universe</span>
          
          <h1 className="text-5xl md:text-7xl font-bold font-poppins text-white mb-6 leading-tight">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Sricharan
            </span>
          </h1>

          <div className="text-2xl md:text-3xl font-medium text-slate-300 mb-8 h-12">
            I am a <span className="text-cyan-300 font-semibold border-r-2 border-cyan-400 pr-1 animate-pulse">
              <Typewriter
                words={['Developer', 'Software Engineer', 'Problem Solver', 'Tech Enthusiast']}
                loop={true}
                cursor={false}
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </div>

          <p className="text-slate-400 max-w-lg mb-10 text-lg leading-relaxed">
            I craft digital experiences with modern web technologies. Specialized in building beautifully designed, high-performance applications that model complex data architectures.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a 
              href="#simulator" 
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] flex items-center gap-2"
            >
              View Showcase
            </a>
            <button 
              onClick={() => alert(`Phone: 9701684615
Instagram: @sricharan_janagam`)}
              className="px-8 py-4 bg-transparent border border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 font-semibold rounded-lg transition-all"
            >
              Contact Me
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 mt-12">
            <a href="https://github.com/sricharanjanagam2" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
              <FaGithub size={28} />
            </a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors hover:scale-110 transform duration-200">
              <FaLinkedin size={28} />
            </a>
            <a href="mailto:hello@example.com" className="text-slate-400 hover:text-purple-400 transition-colors hover:scale-110 transform duration-200">
              <Mail size={28} />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 hidden lg:flex justify-center items-center"
        >
          {/* Abstract geometric representation of memory / data structures */}
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
            <div className="absolute inset-4 glass rounded-full border border-white/20 flex items-center justify-center rotate-45 hover:rotate-90 transition-transform duration-1000 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
              <div className="w-full h-1/2 bg-white/5 absolute top-0 backdrop-blur-md"></div>
              <div className="text-6xl -rotate-45 font-bold font-poppins text-white/50 tracking-tighter">
                &lt;/&gt;
              </div>
            </div>
            {/* Orbiting particles */}
            <div className="absolute -inset-10 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]">
              <div className="absolute top-0 left-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f3ff]"></div>
            </div>
            <div className="absolute -inset-20 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]">
              <div className="absolute bottom-0 right-1/4 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_10px_#bc13fe]"></div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-slate-500">
        <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll</span>
        <ChevronDown size={24} />
      </div>
    </section>
  );
}

export default Hero;
