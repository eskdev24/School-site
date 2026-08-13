import React from 'react';
import { motion } from 'motion/react';
import { MapPin, School, Users, Award, CheckCircle, Sparkles } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';
import { AnimatedCounter } from './AnimatedCounter';

interface OurReachProps {
  onOpenDemoModal: () => void;
}

export const OurReach: React.FC<OurReachProps> = ({ onOpenDemoModal }) => {
  const locations = [
    { city: 'Sunyani', status: 'Primary Hub & Partner Schools', region: 'Bono Region' },
    { city: 'Accra', status: 'Major Partner Schools', region: 'Greater Accra' },
    { city: 'All Parts of Ghana', status: 'Expanding School Partnerships', region: 'Nationwide' }
  ];

  return (
    <section id="reach" className="py-20 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 font-extrabold text-xs tracking-widest uppercase bg-emerald-100 px-3.5 py-1 rounded-full">
            OUR REACH & IMPACT
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3 mb-4">
            Building Smart, Confident Problem Solvers Across Ghana
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {SITE_INFO.ourReach.description}
          </p>
        </div>

        {/* Counter Stats Big Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.04 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md text-center hover:border-emerald-500 transition-all hover:shadow-2xl hover:shadow-emerald-600/10 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="font-heading font-black text-4xl sm:text-5xl text-emerald-800 mb-1">
              <AnimatedCounter value={800} suffix="+" />
            </div>
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Total Students Trained
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.04 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md text-center hover:border-amber-500 transition-all hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <School className="w-6 h-6" />
            </div>
            <div className="font-heading font-black text-4xl sm:text-5xl text-amber-600 mb-1">
              <AnimatedCounter value={30} suffix=" Schools" />
            </div>
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Schools Served
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.04 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md text-center hover:border-teal-500 transition-all hover:shadow-2xl hover:shadow-teal-600/10 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div className="font-heading font-black text-4xl sm:text-5xl text-teal-800 mb-1">
              <AnimatedCounter value={8} suffix="+" />
            </div>
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Schools Partnered & Growing
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.04 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md text-center hover:border-indigo-500 transition-all hover:shadow-2xl hover:shadow-indigo-600/10 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="font-heading font-black text-4xl sm:text-5xl text-indigo-800 mb-1">
              <AnimatedCounter value={2} suffix="x / Week" />
            </div>
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Weekly Classes
            </div>
          </motion.div>
        </div>

        {/* Location Reach Cards */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <h3 className="font-heading font-bold text-2xl text-slate-900">
                Regional Presence & Partner Network
              </h3>
              <p className="text-slate-600 text-sm">
                Serving primary schools, preparatory centers, and basic schools across Ghana
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((loc, i) => (
              <div
                key={loc.city}
                className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex items-start gap-4 hover:border-emerald-400 transition-colors"
              >
                <div className="p-3 bg-emerald-700 text-white rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-slate-900">
                    {loc.city}
                  </h4>
                  <div className="text-xs font-semibold text-emerald-700 mb-1">
                    {loc.region}
                  </div>
                  <p className="text-xs text-slate-500">
                    {loc.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
