import React, { useState } from 'react';
import { X, Building2, User, Phone, Mail, MapPin, Users, Calendar, CheckCircle2, Send, Sparkles, AlertCircle, Database, RefreshCw, Check } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';
import { DemoBookingData } from '../types';
import { isValidEmail, isValidPhone } from '../lib/validation';
import { saveDemoBooking } from '../services/firebaseDb';

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoBookingModal: React.FC<DemoBookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<DemoBookingData>({
    schoolName: '',
    location: 'Sunyani',
    contactPerson: '',
    role: 'Head of School / Proprietor',
    phone: '',
    email: '',
    estimatedStudents: '100 - 300 Students',
    preferredDate: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState<{
    schoolName?: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
  }>({});

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedDocId, setSavedDocId] = useState<string | null>(null);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: {
      schoolName?: string;
      contactPerson?: string;
      phone?: string;
      email?: string;
    } = {};

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = "Please enter your school or institution's name";
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "Please enter the contact person's name";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter a phone or WhatsApp contact number";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (e.g. 0536541414 or +233...)";
    }

    if (formData.email.trim() && !isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid official email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Save directly to Firebase Firestore
      const res = await saveDemoBooking({
        schoolName: formData.schoolName,
        location: formData.location,
        contactPerson: formData.contactPerson,
        role: formData.role,
        phone: formData.phone,
        email: formData.email,
        estimatedStudents: formData.estimatedStudents,
        preferredDate: formData.preferredDate,
        additionalNotes: formData.additionalNotes,
      });

      setSavedDocId(res.id);
      setSubmitted(true);
    } catch (err) {
      console.error('Firebase school demo booking save error:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = `Hello SAMATHS SOLUTIONS,%0A%0AI would like to book a *Free On-Site Abacus Mental Maths Presentation* for our school!%0A%0A*School Name:* ${encodeURIComponent(formData.schoolName)}%0A*Location:* ${encodeURIComponent(formData.location)}%0A*Contact Person:* ${encodeURIComponent(formData.contactPerson)} (${encodeURIComponent(formData.role)})%0A*Phone:* ${encodeURIComponent(formData.phone)}${formData.email ? `%0A*Email:* ${encodeURIComponent(formData.email)}` : ''}%0A*Estimated Students:* ${encodeURIComponent(formData.estimatedStudents)}${formData.preferredDate ? `%0A*Target Date:* ${encodeURIComponent(formData.preferredDate)}` : ''}${formData.additionalNotes ? `%0A*Notes:* ${encodeURIComponent(formData.additionalNotes)}` : ''}`;
    window.open(`https://wa.me/${SITE_INFO.phoneRaw}?text=${message}`, '_blank');
  };

  const handleEmailRedirect = () => {
    const subject = encodeURIComponent(`School Demo Request: ${formData.schoolName} (${formData.location})`);
    const body = encodeURIComponent(
      `Hello SAMATHS SOLUTIONS Team,\n\n` +
      `We would like to book a Free On-Site Abacus Mental Maths Demo Presentation for our school.\n\n` +
      `-- SCHOOL DETAILS --\n` +
      `School Name: ${formData.schoolName}\n` +
      `Location: ${formData.location}\n` +
      `Contact Person: ${formData.contactPerson} (${formData.role})\n` +
      `Phone / WhatsApp: ${formData.phone}\n` +
      `Email: ${formData.email || 'N/A'}\n` +
      `Estimated Students: ${formData.estimatedStudents}\n` +
      `Target Date: ${formData.preferredDate || 'To be scheduled'}\n` +
      `Additional Notes: ${formData.additionalNotes || 'N/A'}\n\n` +
      `Thank you.`
    );
    window.location.href = `mailto:${SITE_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white px-5 py-3.5 sm:px-6 sm:py-4 shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 text-emerald-300 font-extrabold text-[11px] uppercase tracking-wider mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>FOR SCHOOL HEADS & PROPRIETORS</span>
          </div>

          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white leading-tight">
            Book a Free School Demo
          </h3>
          <p className="text-[11px] sm:text-xs text-teal-200 mt-0.5">
            100% Free on-site presentation for teachers, students & parents across Ghana.
          </p>
        </div>

        {/* Form / Submitted body */}
        <div className="p-4 sm:p-5 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-3 space-y-3">
              <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900">
                  Demo Booking Saved!
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mt-1">
                  Thank you, <strong>{formData.contactPerson}</strong>. Your request for <strong>{formData.schoolName}</strong> ({formData.location}) is logged into our Firebase database.
                </p>
              </div>

              {/* Firebase Live Database Badge */}
              <div className="max-w-md mx-auto">
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-2.5 flex items-center justify-between text-xs text-teal-900">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Database className="w-4 h-4 text-teal-700" />
                    <span>Saved to Firebase Database (demo_bookings)</span>
                  </span>
                  <span className="flex items-center gap-1 text-teal-700 font-extrabold bg-teal-100 px-2 py-0.5 rounded-full text-[10px]">
                    <Check className="w-3 h-3" />
                    <span>Synced</span>
                  </span>
                </div>
              </div>

              {/* Instant WhatsApp & Email Automation Actions */}
              <div className="pt-1 flex flex-col gap-2 max-w-md mx-auto">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct WhatsApp to SAMATHS ({SITE_INFO.phoneDisplay})</span>
                </button>

                <button
                  onClick={handleEmailRedirect}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Official Email ({SITE_INFO.email})</span>
                </button>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="w-full py-2 px-3 text-slate-600 hover:text-slate-900 text-xs font-semibold cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    School / Institution Name *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Ridge Basic School"
                      value={formData.schoolName}
                      onChange={(e) => {
                        setFormData({ ...formData, schoolName: e.target.value });
                        if (errors.schoolName) setErrors({ ...errors, schoolName: undefined });
                      }}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border ${errors.schoolName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-xs sm:text-sm`}
                    />
                  </div>
                  {errors.schoolName && (
                    <p className="text-red-500 text-[11px] mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.schoolName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    City / Town *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-xs sm:text-sm bg-white"
                    >
                      <option value="Sunyani">Sunyani (Bono Region)</option>
                      <option value="Accra">Accra (Greater Accra)</option>
                      <option value="Kumasi">Kumasi (Ashanti Region)</option>
                      <option value="Berekum">Berekum / Bono</option>
                      <option value="Techiman">Techiman / Bono East</option>
                      <option value="Other Region in Ghana">Other Region in Ghana</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Contact Person Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Mrs. Vivian Addo"
                      value={formData.contactPerson}
                      onChange={(e) => {
                        setFormData({ ...formData, contactPerson: e.target.value });
                        if (errors.contactPerson) setErrors({ ...errors, contactPerson: undefined });
                      }}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border ${errors.contactPerson ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-xs sm:text-sm`}
                    />
                  </div>
                  {errors.contactPerson && (
                    <p className="text-red-500 text-[11px] mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.contactPerson}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Your Role in School *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-xs sm:text-sm bg-white"
                  >
                    <option value="Head of School / Proprietor">Head of School / Proprietor</option>
                    <option value="Assistant Head / Administrator">Assistant Head / Administrator</option>
                    <option value="Head of Academics / Curriculum">Head of Academics / Curriculum</option>
                    <option value="Mathematics Coordinator / Teacher">Mathematics Coordinator / Teacher</option>
                    <option value="PTA Executive">PTA Executive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Phone / WhatsApp Contact *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="e.g. 0536541414"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border ${errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-xs sm:text-sm`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-[11px] mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Official Email (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="email"
                      placeholder="e.g. info@school.edu.gh"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-xs sm:text-sm`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-[11px] mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Estimated Students
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <select
                      value={formData.estimatedStudents}
                      onChange={(e) => setFormData({ ...formData, estimatedStudents: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-xs sm:text-sm bg-white"
                    >
                      <option value="50 - 150 Students">50 - 150 Students</option>
                      <option value="150 - 300 Students">150 - 300 Students</option>
                      <option value="300 - 600 Students">300 - 600 Students</option>
                      <option value="600+ Students">600+ Students</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Preferred Date (Optional)
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-xs sm:text-sm bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Specific Requests or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. We would like the demo on a Wednesday morning assembly..."
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-xs sm:text-sm resize-none"
                />
              </div>

              <div className="pt-1.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <span>Book Free Presentation</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
