import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Showcase', href: '#simulator' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold font-montserrat tracking-tighter text-white group">
          S<span className="text-cyan-400">.</span>J<span className="text-purple-500">_</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-300 hover:text-cyan-400 text-sm font-medium tracking-wide transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button onClick={() => alert('Phone: 9701684615\\nInstagram: @sricharan_janagam')} className="px-5 py-2 rounded-full border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all font-medium text-sm">
            Contact Me
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full glass border-t border-white/10 p-6 flex flex-col gap-4 text-center shadow-xl"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-300 hover:text-cyan-400 text-lg font-medium py-2 border-b border-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              alert('Phone: 9701684615\\nInstagram: @sricharan_janagam');
              setMobileMenuOpen(false);
            }} 
            className="mt-2 px-5 py-3 rounded-lg border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 transition-all font-medium text-lg inline-block w-full"
          >
            Contact Me
          </button>
        </motion.div>
      )}
    </header>
  );
}

export default Navbar;
