import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ShieldCheck, Sparkles, Banknote, FileCheck, CheckCircle2 } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

export const WhyChooseUs: React.FC = () => {
  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    TrendingUp,
    ShieldCheck,
    Sparkles,
    Banknote,
    FileCheck
  };

  return (
    <section id="why-us" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-400 font-extrabold text-xs tracking-widest uppercase bg-emerald-950 border border-emerald-800 px-3.5 py-1 rounded-full">
            WHY CHOOSE <span className="text-amber-400">SAMATHS</span> <span className="text-emerald-400">SOLUTIONS</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mt-3 mb-4">
            Why Schools & Parents Trust <span className="text-amber-400 font-logo">SAMATHS</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            We deliver complete peace of mind for school management and tangible academic acceleration for every registered child.
          </p>
        </div>

        {/* 5 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_INFO.whyChooseUs.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || CheckCircle2;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/80 hover:border-emerald-400 hover:bg-slate-800 hover:shadow-2xl hover:shadow-emerald-950/50 transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-slate-950 flex items-center justify-center font-bold mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <h3 className="font-heading font-bold text-xl text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/80 text-xs text-emerald-400 font-semibold flex items-center justify-between">
                  <span>Guaranteed Value</span>
                  <span className="text-slate-400">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}

          {/* Highlight Box for MoMo Business & Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-gradient-to-br from-emerald-900 to-teal-950 rounded-2xl p-6 border-2 border-emerald-500 text-white flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-emerald-900/60 hover:border-amber-400 transition-all cursor-pointer group"
          >
            <div>
              <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-md uppercase mb-3 inline-block group-hover:scale-105 transition-transform">
                Direct MoMo Pay
              </span>
              <h3 className="font-heading font-extrabold text-xl text-white mb-2 group-hover:text-amber-300 transition-colors">
                Business MoMo Enabled
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed mb-4">
                Seamless parent payments directly to our verified Business MoMo account: <strong className="text-amber-300">0536541414</strong>. Transparent tracking & term receipts.
              </p>
            </div>

            <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-800 text-xs text-emerald-300 flex items-center justify-between group-hover:border-amber-500/50 transition-colors">
              <span>Official Business MoMo</span>
              <strong className="text-amber-300 text-sm">0536541414</strong>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
