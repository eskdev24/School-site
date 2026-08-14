import React from 'react';
import { motion } from 'motion/react';
import { Phone, Sparkles, CheckCircle2, School, User, ArrowRight, CreditCard } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

interface CallToActionProps {
  onOpenDemoModal: () => void;
  onOpenParentModal: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenDemoModal, onOpenParentModal }) => {
  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 opacity-95" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section Matching Trident Template's Bottom Admission Ribbon */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl p-8 sm:p-12 border-2 border-emerald-500/50 shadow-2xl mb-12">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="bg-amber-400 text-slate-950 font-black text-xs uppercase px-3.5 py-1 rounded-full tracking-widest inline-block mb-3">
              CALL TO ACTION
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-3">
              Ready To Transform Maths Education?
            </h2>
            <p className="text-slate-200 text-sm sm:text-base">
              Join 30+ schools and 800+ students across Sunyani, Accra, and Ghana achieving rapid mental arithmetic speed, focus, and confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Parent Box */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-emerald-500/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-2">
                  <User className="w-4 h-4" />
                  <span>FOR PARENTS</span>
                </div>
                
                <h3 className="font-heading font-extrabold text-2xl text-white mb-2">
                  {SITE_INFO.cta.forParents.lead}
                </h3>
                
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  {SITE_INFO.cta.forParents.action}
                </p>

                <div className="bg-emerald-950/90 border border-emerald-600/60 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-xs text-emerald-300 font-bold mb-1">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span>Business MoMo Payment Details:</span>
                  </div>
                  <div className="font-heading font-black text-2xl text-amber-300">
                    {SITE_INFO.momoNumber}
                  </div>
                  <div className="text-xs text-slate-400">
                    Account: {SITE_INFO.momoAccountName}
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenParentModal}
                className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Register Your Child Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* School Owner / Headmistress Box */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-emerald-500/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider mb-2">
                  <School className="w-4 h-4" />
                  <span>FOR SCHOOL OWNERS & HEADMISTRESSES</span>
                </div>
                
                <h3 className="font-heading font-extrabold text-2xl text-white mb-2">
                  Make Your School #1 For Maths Excellence
                </h3>
                
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  {SITE_INFO.cta.forSchools.lead} {SITE_INFO.cta.forSchools.action}
                </p>

                <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 mb-6">
                  <div className="text-xs text-slate-300 font-bold mb-1">
                    What happens during the Session?
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Live abacus speed calculation demonstration</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Sample 15-minute trial lesson with your pupils</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Custom school partnership proposal & timetable</span>
                    </li>
                  </ul>
                </div>
              </div>

              <button
                onClick={onOpenDemoModal}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Book a Session</span>
              </button>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
