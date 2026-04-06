import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        ></motion.div>

        {/* Modal Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-card relative w-full max-w-md p-8 rounded-2xl border border-cyan-500/30 shadow-[0_0_40px_rgba(0,243,255,0.15)] flex flex-col items-center text-center overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <h3 className="text-3xl font-bold font-poppins text-white mb-2 mt-4">Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Connect</span></h3>
          <p className="text-slate-400 text-sm mb-6">Feel free to reach out to me via phone, email or Instagram!</p>

          <div className="w-full space-y-4">
            {/* Photo Row */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-yellow-400/50 hover:bg-slate-800 transition-all group">
              <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden border-2 border-yellow-400/30 group-hover:border-yellow-400/70 group-hover:scale-110 transition-all shadow-[0_0_15px_rgba(250,204,21,0.15)]">
                <img src="/contact-photo.jpg" alt="Sricharan" className="w-full h-full object-cover" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Photo</p>
                <p className="text-lg font-medium text-slate-200 group-hover:text-yellow-300 transition-colors truncate">Sricharan Janagam</p>
              </div>
            </div>

            <a href="tel:9701684615" className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 hover:bg-slate-800 transition-all group">
              <div className="w-12 h-12 shrink-0 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
                <Phone size={24} />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Phone</p>
                <p className="text-lg font-medium text-slate-200 group-hover:text-cyan-300 transition-colors truncate">+91 9701684615</p>
              </div>
            </a>

            <a href="mailto:sricharanjanagam2@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-emerald-400/50 hover:bg-slate-800 transition-all group">
              <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all">
                <Mail size={24} />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Email</p>
                <p className="text-lg sm:text-base md:text-lg font-medium text-slate-200 group-hover:text-emerald-300 transition-colors truncate">sricharanjanagam2@gmail.com</p>
              </div>
            </a>

            <a href="https://instagram.com/sricharan_janagam" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 hover:bg-slate-800 transition-all group">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all">
                <FaInstagram size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Instagram</p>
                <p className="text-lg font-medium text-slate-200 group-hover:text-purple-300 transition-colors">@sricharan_janagam</p>
              </div>
            </a>
          </div>

          <button onClick={onClose} className="mt-8 px-8 py-3 w-full bg-transparent border border-slate-600 hover:border-white text-slate-300 hover:text-white font-medium rounded-lg transition-colors">
            Close
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ContactModal;
