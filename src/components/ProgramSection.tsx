import React from 'react';
import { motion } from 'motion/react';
import { Calculator, Brain, Zap, Smile, Clock, UserCheck, CalendarDays, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

interface ProgramSectionProps {
  onOpenDemoModal: () => void;
  onOpenParentModal: () => void;
}

export const ProgramSection: React.FC<ProgramSectionProps> = ({ onOpenDemoModal, onOpenParentModal }) => {
  const iconsMap: Record<string, React.FC<{ className?: string }>> = {
    Calculator,
    Brain,
    Zap,
    Smile
  };

  return (
    <section id="program" className="py-20 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 font-extrabold text-xs tracking-widest uppercase bg-emerald-100 px-3.5 py-1 rounded-full">
            OUR PROGRAM
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3 mb-4">
            {SITE_INFO.program.name}
          </h2>
          <p className="text-lg font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 inline-block px-4 py-2 rounded-xl mb-4">
            "{SITE_INFO.program.tagline}"
          </p>
          <p className="text-slate-600 text-base">
            Comprehensive brain development program tailored for schools in Ghana. Certified teachers bring abacus tools directly into classrooms.
          </p>
        </div>

        {/* Program Specifications Badge Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl mb-16 border border-emerald-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            
            <div className="pt-2 md:pt-0">
              <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
                <UserCheck className="w-4 h-4" />
                <span>Target Ages</span>
              </div>
              <div className="font-heading font-extrabold text-2xl text-white">
                {SITE_INFO.program.ages}
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Program Duration</span>
              </div>
              <div className="font-heading font-extrabold text-2xl text-white">
                {SITE_INFO.program.duration}
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                <span>Affordable Fee Structure</span>
              </div>
              <div className="font-heading font-extrabold text-2xl text-white">
                Fee Per Term
              </div>
            </div>

          </div>
        </div>

        {/* What Children Learn Heading */}
        <div className="mb-10 text-center">
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            What Children Learn With SAMATHS SOLUTIONS
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            4 Core Brain-Boosting Skills Mastered Every Term
          </p>
        </div>

        {/* 4 Cards Grid (Matching Trident Academics Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SITE_INFO.program.learningOutcomes.map((item, index) => {
            const IconComponent = iconsMap[item.icon] || Calculator;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all group flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-3 right-4 font-heading font-black text-4xl text-slate-200 group-hover:text-emerald-100 transition-colors">
                  0{item.number}
                </div>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h4 className="font-heading font-bold text-xl text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Certified Abacus Skill</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Showcase Feature Highlight Banner */}
        <div className="bg-slate-100 rounded-3xl p-6 sm:p-10 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="bg-amber-400 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              For Schools & Parents
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
              Transform Your Students' Math Performance In Just 1 Term
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Our abacus curriculum integrates seamlessly into school timetables for 2 sessions per week. We supply certified abacus teachers, practice workbooks, abacus frames, and term progress reports.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onOpenDemoModal}
                className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
              >
                <span>Book a Free Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenParentModal}
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Parent Registration
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl shadow-lg border-2 border-white cursor-pointer hover:shadow-2xl transition-all">
            <img
              src={SITE_INFO.images.abacusStudents}
              alt="Students doing abacus mental arithmetic calculations"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-72 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
};
