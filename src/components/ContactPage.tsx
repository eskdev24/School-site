import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageSquare, ChevronDown, CheckCircle2, Clock, CreditCard, ArrowLeft, Sparkles, HelpCircle, AlertCircle } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';
import { useMetaTags } from './MetaTags';
import { isValidEmail, isValidPhone } from '../lib/validation';

interface ContactPageProps {
  onBackToHome: () => void;
  onOpenDemoModal: () => void;
  onOpenParentModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onBackToHome,
  onOpenDemoModal,
  onOpenParentModal,
}) => {
  // Dynamic Open Graph & Twitter Social Meta Tags for Contact Page
  useMetaTags({
    title: 'Contact & School Partnerships | SAMATHS SOLUTIONS Ghana',
    description: 'Get in touch with SAMATHS SOLUTIONS. Register your child for abacus mental arithmetic or book a free trial demo session for your school. Call/WhatsApp 0536541414.',
    url: `${typeof window !== 'undefined' ? window.location.origin : ''}#contact`,
    image: SITE_INFO.images.abacusClassroom || SITE_INFO.images.heroBanner,
    keywords: 'Contact SAMATHS SOLUTIONS, register abacus child Ghana, school demo booking Sunyani, 0536541414, mental arithmetic partnership Accra',
  });

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    role: 'Parent',
    location: 'Sunyani',
    message: ''
  });

  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
    fullName?: string;
  }>({});

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validateForm = () => {
    const newErrors: { phone?: string; email?: string; fullName?: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone/WhatsApp number';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (e.g. 0536541414 or +233...)';
    }

    if (formData.email.trim() && !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Send formatted message via WhatsApp to 0536541414
    const text = `Hello SAMATHS SOLUTIONS!\n\n` +
      `I am interested in your Abacus Mental Maths program.\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Role:* ${formData.role}\n` +
      `*Phone:* ${formData.phone}\n` +
      (formData.email ? `*Email:* ${formData.email}\n` : '') +
      `*Location:* ${formData.location}\n` +
      `*Message:* ${formData.message || 'I would like more information.'}`;

    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${SITE_INFO.phoneRaw}?text=${encoded}`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 800);
  };

  const faqs = [
    {
      question: "What age range is the Abacus Mental Maths program for?",
      answer: "Our program is tailored for children aged 4 to 14 years (Kindergarten through Basic School). At this developmental stage, brain plasticity is at its peak for mental calculation and speed memory training."
    },
    {
      question: "How does SAMATHS SOLUTIONS partner with schools?",
      answer: "We handle everything! We provide certified Abacus teachers, physical abacus frames, learning workbooks, and termly progress reports directly to your school campus 2 times a week."
    },
    {
      question: "How soon can parents see improvements in their children?",
      answer: "Most parents and teachers notice significant improvements in concentration, calculation speed, and class confidence within the first 6 to 12 weeks (1 term)."
    },
    {
      question: "How are tuition fees paid?",
      answer: "Fees are affordable and charged per term (12 weeks). Parents can conveniently pay via our Business MoMo account: 0536541414 (SAMATHS SOLUTIONS Business MoMo)."
    },
    {
      question: "Can school owners request a free live session?",
      answer: "Yes! We offer a 100% FREE live trial session at your school where our trainers demonstrate abacus speed calculations with your students."
    },
    {
      question: "What areas in Ghana do you serve?",
      answer: "We actively serve partner schools across Sunyani, Accra, Kumasi, and surrounding communities in the Bono and Greater Accra regions. Contact us to check availability for your school."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      
      {/* Page Header / Hero Banner */}
      <div className="bg-emerald-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 opacity-90" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Breadcrumb & Back button */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Page</span>
            </button>

            <span className="text-amber-300 font-extrabold text-xs tracking-widest uppercase bg-amber-500/20 border border-amber-500/30 px-3.5 py-1 rounded-full">
              OFFICIAL CONTACT PAGE
            </span>
          </div>

          <div className="max-w-3xl">
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
              Get In Touch With <span className="font-logo"><span className="text-amber-400">SAMATHS</span> <span className="text-emerald-400">SOLUTIONS</span></span>
            </h1>
            <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
              We are excited to help your child excel in maths or bring our proven abacus mental arithmetic program to your school. Reach out to us directly or consult our FAQs below.
            </p>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Phone / WhatsApp */}
          <a
            href={`tel:${SITE_INFO.phoneRaw}`}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg hover:border-emerald-500 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">
              Call / WhatsApp
            </h3>
            <p className="text-emerald-800 font-extrabold text-lg mb-1">
              {SITE_INFO.phoneDisplay}
            </p>
            <p className="text-xs text-slate-500">
              Instant response via WhatsApp or Call
            </p>
          </a>

          {/* Email */}
          <a
            href={`mailto:${SITE_INFO.email}`}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg hover:border-amber-500 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">
              Email Us
            </h3>
            <p className="text-amber-800 font-bold text-sm mb-1 truncate">
              {SITE_INFO.email}
            </p>
            <p className="text-xs text-slate-500">
              Official school proposals & inquiries
            </p>
          </a>

          {/* Locations */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg hover:border-teal-500 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">
              Locations
            </h3>
            <p className="text-slate-800 font-bold text-sm mb-1">
              Sunyani & Accra, Ghana
            </p>
            <p className="text-xs text-slate-500">
              Serving schools nationwide in Ghana
            </p>
          </div>

          {/* Business MoMo */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg hover:border-indigo-500 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">
              Business MoMo
            </h3>
            <p className="text-indigo-800 font-extrabold text-lg mb-1">
              {SITE_INFO.momoNumber}
            </p>
            <p className="text-xs text-slate-500">
              {SITE_INFO.momoAccountName}
            </p>
          </div>

        </div>

        {/* Main Grid: Form + FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Form Column */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
            <div className="mb-6">
              <span className="text-emerald-800 font-extrabold text-xs tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
                SEND AN INQUIRY
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mt-2">
                Send Us a Direct Message
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Fill out the form below to register your child or request a live abacus session for your school.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-xl text-slate-900 mb-1">
                  Inquiry Ready!
                </h4>
                <p className="text-slate-600 text-sm mb-4">
                  Redirecting to WhatsApp to send your message directly to <strong>{SITE_INFO.phoneDisplay}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-emerald-800 hover:underline uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Abena Mensah"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-sm outline-none transition-all`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0536541414"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-sm outline-none transition-all`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="email"
                        placeholder="e.g. parent@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-sm outline-none transition-all`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      I am a:
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-sm outline-none transition-all bg-white"
                    >
                      <option value="Parent">Parent / Guardian</option>
                      <option value="School Owner">School Owner / Proprietor</option>
                      <option value="Headmistress">Headmistress / Principal</option>
                      <option value="Teacher">Teacher / Administrator</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Region / City
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-sm outline-none transition-all bg-white"
                  >
                    <option value="Sunyani">Sunyani (Bono Region)</option>
                    <option value="Accra">Accra (Greater Accra)</option>
                    <option value="Kumasi">Kumasi (Ashanti Region)</option>
                    <option value="Other Ghana City">Other Ghana City</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Message / Inquiry
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your child or school requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-sm outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send a Message</span>
                </button>
              </form>
            )}

            {/* Quick Action Bar */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 font-medium">Prefer direct registration?</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenParentModal}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 transition-colors"
                >
                  Register Child
                </button>
                <button
                  onClick={onOpenDemoModal}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors"
                >
                  Book a Session
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Column */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-amber-400 font-extrabold text-xs tracking-widest uppercase">
                    FREQUENTLY ASKED QUESTIONS
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-white">
                    Got Questions? We Have Answers
                  </h3>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Everything parents, school proprietors, and headmistresses need to know about our abacus brain training methodology.
              </p>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-slate-800/90 rounded-xl border border-slate-700/80 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-4 text-left font-heading font-bold text-sm text-white flex justify-between items-center gap-3 hover:text-amber-300 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          openFaq === index ? 'rotate-180 text-amber-400' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-700/50 pt-3"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* School Schedule & Payment Info Card */}
            <div className="bg-emerald-800 text-white p-6 rounded-3xl shadow-xl border border-emerald-700">
              <h4 className="font-heading font-bold text-lg mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-300" />
                <span>Weekly Schedule & MoMo Payment</span>
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Abacus classes are held <strong>2 times a week</strong> directly on school premises. Termly fees are paid safely to <strong>{SITE_INFO.momoAccountName}</strong> (MoMo: <strong>{SITE_INFO.momoNumber}</strong>).
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
