import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_INFO } from '../data/siteData';

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${SITE_INFO.phoneRaw}?text=${encodeURIComponent('Hello SAMATHS SOLUTIONS, I am inquiring about your Abacus Mental Maths school program.')}`;
  const phoneUrl = `tel:+${SITE_INFO.phoneRaw}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      
      {/* 1. Contact / Call Button (Top) */}
      <a
        href={phoneUrl}
        className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-2xl hover:bg-slate-800 hover:scale-110 transition-all border-2 border-slate-700 group relative"
        aria-label="Call SAMATHS SOLUTIONS"
      >
        <Phone className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
        <span className="absolute right-15 bg-slate-900 text-white text-xs font-bold py-1 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700">
          Call: {SITE_INFO.phoneDisplay}
        </span>
      </a>

      {/* 2. WhatsApp Button (Middle) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:bg-emerald-600 hover:scale-110 transition-all border-2 border-emerald-300 group relative"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        <span className="absolute right-15 bg-emerald-900 text-white text-xs font-bold py-1 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-emerald-700">
          WhatsApp: {SITE_INFO.phoneDisplay}
        </span>
      </a>

      {/* 3. Floating Back To Top Button (Bottom) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 15 }}
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white shadow-2xl border-2 border-emerald-400/60 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="absolute right-14 bg-slate-900 text-white text-xs font-bold py-1 px-2.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700">
              Back to Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};
