import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, MapPin, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

interface GalleryPageProps {
  onBackToHome: () => void;
  onOpenDemoModal: () => void;
  onOpenParentModal: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onBackToHome,
  onOpenDemoModal,
  onOpenParentModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Classroom Lessons', 'Competitions & Demos', 'Certificates & Awards'];

  const filteredGallery = activeCategory === 'All'
    ? SITE_INFO.gallery
    : SITE_INFO.gallery.filter(item => item.category === activeCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-amber-950/20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Top navigation row */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs uppercase tracking-wider border border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Page</span>
            </button>

            <span className="text-amber-400 font-extrabold text-xs tracking-widest uppercase bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full">
              OFFICIAL PHOTO GALLERY
            </span>
          </div>

          <div className="max-w-3xl">
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
              SAMATHS SOLUTIONS In Action
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Explore moments from our abacus mental maths classrooms, inter-school speed calculation competitions, live demonstrations, and student award ceremonies across Ghana.
            </p>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredGallery.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setLightboxIndex(index)}
              className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-400 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/60 cursor-pointer transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-115 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-amber-300 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-700 group-hover:border-amber-400/50 transition-colors">
                  {item.category}
                </span>

                {/* Expand Overlay Icon */}
                <div className="absolute top-3 right-3 p-2 bg-emerald-600/90 text-white rounded-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-lg">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
                aria-label="Close photo view"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Modal Card Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative"
              >
                <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black">
                  <img
                    src={filteredGallery[lightboxIndex].imageUrl}
                    alt={filteredGallery[lightboxIndex].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain object-center"
                  />
                </div>

                <div className="p-6 bg-slate-900 border-t border-slate-800 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase px-2.5 py-0.5 rounded-full border border-emerald-500/30 mb-2 inline-block">
                      {filteredGallery[lightboxIndex].category}
                    </span>
                    <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                      {filteredGallery[lightboxIndex].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      {filteredGallery[lightboxIndex].description}
                    </p>
                  </div>

                  <div className="shrink-0 text-right text-xs text-slate-400">
                    <div>Location: <strong className="text-white">{filteredGallery[lightboxIndex].location}</strong></div>
                    <div>Photo {lightboxIndex + 1} of {filteredGallery.length}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl p-8 sm:p-10 text-white border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-extrabold text-2xl text-white">
              Want Your School or Child in Our Next Showcase?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-2xl">
              Book a free live session for your school or enroll your child in our abacus brain development program today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenDemoModal}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book a Session</span>
            </button>
            <button
              onClick={onOpenParentModal}
              className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Register Child</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
