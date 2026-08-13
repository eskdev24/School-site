import React from 'react';
import { motion } from 'motion/react';
import { Calculator, Brain, Zap, Smile, School, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

interface HeroProps {
  onOpenDemoModal: () => void;
  onOpenParentModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemoModal, onOpenParentModal }) => {
  const highlights = [
    {
      icon: Calculator,
      title: 'Mental Calculation',
      desc: 'Add, subtract, multiply & divide without a calculator',
      color: 'bg-emerald-500'
    },
    {
      icon: Brain,
      title: 'Concentration & Memory',
      desc: 'Stay focused longer in class & retain concepts',
      color: 'bg-teal-500'
    },
    {
      icon: Zap,
      title: 'Speed & Accuracy',
      desc: 'Finish homework & exams faster with precision',
      color: 'bg-amber-500'
    },
    {
      icon: Smile,
      title: 'Maths Confidence',
      desc: 'Eliminate fear & transform problem solving skills',
      color: 'bg-blue-500'
    },
    {
      icon: School,
      title: '30+ Schools Served',
      desc: 'Partnered across Sunyani, Accra & Ghana',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <section id="home" className="relative bg-slate-900 text-white overflow-hidden pb-16 lg:pb-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-35 scale-105">
        <img
          src={SITE_INFO.images.heroBanner}
          alt="Children using Abacus in Ghana school classroom"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-slate-900/85 to-emerald-900/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-20">
        <div className="max-w-3xl">
          
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-semibold text-xs tracking-wider uppercase mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>SAMATHS SOLUTIONS ({SITE_INFO.tagline})</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-4"
          >
            Is Your Child <span className="text-amber-400 underline decoration-emerald-500 underline-offset-8">Struggling</span> With Maths?
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-2xl font-semibold text-emerald-200 mb-6 leading-relaxed"
          >
            {SITE_INFO.subheadline}
          </motion.p>

          {/* Short Lead Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl"
          >
            In just <span className="text-amber-300 font-bold">2 classes a week</span>, our certified teachers use the abacus to train children’s brains for speed, accuracy, focus and confidence. Currently serving <span className="text-emerald-300 font-bold">30 schools</span> and <span className="text-amber-300 font-bold">800+ students</span> in Ghana.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8"
          >
            <button
              onClick={onOpenDemoModal}
              className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-3 group"
            >
              <span>Book a Free Session</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenParentModal}
              className="px-8 py-4 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white border border-emerald-400/40 font-bold text-sm sm:text-base uppercase tracking-wider backdrop-blur-sm transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-amber-300" />
              <span>Register Your Child</span>
            </button>
          </motion.div>

          {/* Quick Metrics Trust Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span><strong>30 Schools</strong> Partnered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span><strong>800+</strong> Trained Kids</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
              <span>Ages <strong>4 - 14 Years</strong></span>
            </div>
          </div>

        </div>
      </div>

      {/* Overlapping Feature Highlights Ribbon (Matching Trident Template ribbon overlay) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mb-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
              >
                <div className={`p-2.5 rounded-xl text-white ${item.color} shrink-0 shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-sm leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
