import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import MemorySimulator from './components/MemorySimulator';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050510] font-inter text-slate-200 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {/* Global Background Elements */}
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#050510] to-[#050510]"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar onOpenContact={() => setIsContactModalOpen(true)} />
        
        <main className="flex-grow">
          <Hero onOpenContact={() => setIsContactModalOpen(true)} />

          
          {/* Subtle separator */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10 relative">
            <div className="absolute left-1/2 -top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
          </div>

          <Skills />
          
          <Projects />

          {/* Special Dedicated Interactive Section for the Simulator */}
          <section id="simulator" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-purple-900/10 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                <span className="text-purple-400 font-medium tracking-wider mb-2 uppercase text-sm inline-block">Interactive Demonstration</span>
                <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4">Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Showcase</span></h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                  Below is a fully functional data structure simulation I built, allowing you to see how Short-Term and Long-Term memories are prioritized and forgotten in real-time.
                </p>
              </div>
              
              <MemorySimulator />
            </div>
          </section>

        </main>

        <Footer />
        <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      </div>
    </div>
  );
}

export default App;
