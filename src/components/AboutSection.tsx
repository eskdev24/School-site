import React from 'react';
import { motion } from 'motion/react';
import { School, Award, Users, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

interface AboutSectionProps {
  onOpenDemoModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenDemoModal }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Floating Stats Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group cursor-pointer transition-all hover:shadow-emerald-900/20"
            >
              <img
                src={SITE_INFO.images.abacusClassroom}
                alt="Certified Abacus Teacher with students in Ghana"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-full mb-2 uppercase tracking-wide shadow-md">
                  Certified Mentors
                </span>
                <p className="text-sm font-semibold text-slate-200">
                  Transforming brain power and maths calculations across Sunyani & Accra.
                </p>
              </div>
            </motion.div>

            {/* Overlapping Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-2 sm:-right-6 bg-emerald-900 text-white p-5 rounded-2xl shadow-xl border-2 border-emerald-400 max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <School className="w-6 h-6 text-amber-400" />
                <span className="font-heading font-black text-2xl text-amber-300">30</span>
              </div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Schools Currently Served
              </div>
            </motion.div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-emerald-700 font-extrabold text-xs tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">
                ABOUT US
              </span>

              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mt-3 mb-4 leading-tight">
                Welcome to <span className="text-emerald-700">{SITE_INFO.brandName}</span>
              </h2>

              <p className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-amber-500 pl-4 py-1">
                {SITE_INFO.about.leadText}
              </p>

              <p className="text-slate-600 leading-relaxed mb-6">
                {SITE_INFO.about.description}
              </p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 sm:p-5 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0 mt-0.5">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-base mb-1">
                      Our proven 2x a Week Methodology
                    </h4>
                    <p className="text-sm text-slate-700 leading-normal">
                      {SITE_INFO.about.methodology}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
                  <div className="font-heading font-black text-2xl text-emerald-700 mb-1">
                    30
                  </div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Schools Served
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
                  <div className="font-heading font-black text-2xl text-amber-600 mb-1">
                    800+
                  </div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Students Trained
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
                  <div className="font-heading font-black text-2xl text-teal-700 mb-1">
                    2x
                  </div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Weekly Classes
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
                  <div className="font-heading font-black text-2xl text-indigo-700 mb-1">
                    4-14
                  </div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Years Old
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
