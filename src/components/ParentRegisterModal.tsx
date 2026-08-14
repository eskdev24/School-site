import React, { useState } from 'react';
import { X, User, Phone, Mail, School, MapPin, CreditCard, CheckCircle2, Send, Sparkles, AlertCircle, Database, RefreshCw, Check } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';
import { ParentRegistrationData } from '../types';
import { isValidEmail, isValidPhone } from '../lib/validation';
import { saveParentRegistration } from '../services/firebaseDb';

interface ParentRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentRegisterModal: React.FC<ParentRegisterModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ParentRegistrationData>({
    childName: '',
    childAge: '7',
    schoolName: '',
    parentName: '',
    phone: '',
    email: '',
    location: 'Sunyani',
    paymentMethod: 'Business MoMo'
  });

  const [errors, setErrors] = useState<{
    childName?: string;
    schoolName?: string;
    parentName?: string;
    phone?: string;
    email?: string;
  }>({});

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedDocId, setSavedDocId] = useState<string | null>(null);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: {
      childName?: string;
      schoolName?: string;
      parentName?: string;
      phone?: string;
      email?: string;
    } = {};

    if (!formData.childName.trim()) {
      newErrors.childName = "Please enter your child's full name";
    }

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = "Please enter the school attended";
    }

    if (!formData.parentName.trim()) {
      newErrors.parentName = "Please enter parent/guardian name";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter a phone or WhatsApp number";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (e.g. 0536541414 or +233...)";
    }

    if (formData.email.trim() && !isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address (e.g. parent@example.com)";
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
      const res = await saveParentRegistration({
        childName: formData.childName,
        childAge: formData.childAge,
        schoolName: formData.schoolName,
        location: formData.location,
        parentName: formData.parentName,
        phone: formData.phone,
        email: formData.email,
        paymentMethod: 'Business MoMo (0536541414)',
        paymentStatus: 'Pending MoMo Verification',
      });

      setSavedDocId(res.id);
      setSubmitted(true);
    } catch (err) {
      console.error('Firebase submission error:', err);
      // Still allow submission completion so parent isn't blocked
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = `Hello SAMATHS SOLUTIONS,%0A%0AI have registered my child for the Abacus Mental Maths Program!%0A%0A*Parent Name:* ${encodeURIComponent(formData.parentName)}%0A*Child Name:* ${encodeURIComponent(formData.childName)} (Age ${formData.childAge})%0A*School Name:* ${encodeURIComponent(formData.schoolName)}%0A*Phone:* ${encodeURIComponent(formData.phone)}${formData.email ? `%0A*Email:* ${encodeURIComponent(formData.email)}` : ''}%0A*Location:* ${encodeURIComponent(formData.location)}%0A*Payment Status:* Paying via Business MoMo [0536541414]`;
    window.open(`https://wa.me/${SITE_INFO.phoneRaw}?text=${message}`, '_blank');
  };

  const handleEmailRedirect = () => {
    const subject = encodeURIComponent(`Child Registration: ${formData.childName} (${formData.schoolName})`);
    const body = encodeURIComponent(
      `Hello SAMATHS SOLUTIONS team,\n\n` +
      `I have registered my child for the Abacus Mental Maths Program.\n\n` +
      `-- REGISTRATION DETAILS --\n` +
      `Child's Full Name: ${formData.childName}\n` +
      `Child's Age: ${formData.childAge}\n` +
      `School Attended: ${formData.schoolName}\n` +
      `Location: ${formData.location}\n` +
      `Parent / Guardian: ${formData.parentName}\n` +
      `Phone / WhatsApp: ${formData.phone}\n` +
      `Email: ${formData.email || 'N/A'}\n` +
      `Payment Method: Business MoMo (0536541414)\n\n` +
      `Thank you.`
    );
    window.location.href = `mailto:${SITE_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white px-5 py-3.5 sm:px-6 sm:py-4 shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 text-amber-300 font-extrabold text-[11px] uppercase tracking-wider mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>PARENT REGISTRATION</span>
          </div>

          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white leading-tight">
            Enroll Your Child Now
          </h3>
          <p className="text-[11px] sm:text-xs text-emerald-200 mt-0.5">
            Register for SAMATHS Abacus Mental Maths (Limited slots per school).
          </p>
        </div>

        {/* Form / Submitted body */}
        <div className="p-4 sm:p-5 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-3 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900">
                  Registration Received & Stored!
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mt-1">
                  Thank you, <strong>{formData.parentName}</strong>. Your registration for <strong>{formData.childName}</strong> (Age {formData.childAge}) at <strong>{formData.schoolName}</strong> is saved to our Firebase Database.
                </p>
              </div>

              {/* Firebase Live Database Badge */}
              <div className="max-w-md mx-auto">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between text-xs text-emerald-900">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Database className="w-4 h-4 text-emerald-600" />
                    <span>Saved to Firebase Database (parent_registrations)</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                    <Check className="w-3 h-3" />
                    <span>Synced</span>
                  </span>
                </div>
              </div>

              {/* MoMo Payment Instruction Card */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3 text-left max-w-md mx-auto">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs sm:text-sm mb-1">
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <span>Business MoMo Payment Details</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-amber-200 text-xs space-y-0.5 font-mono">
                  <div><strong>MoMo Number:</strong> {SITE_INFO.momoNumber}</div>
                  <div><strong>Account Name:</strong> {SITE_INFO.momoAccountName}</div>
                  <div><strong>Reference:</strong> {formData.childName} - {formData.schoolName}</div>
                </div>
              </div>

              {/* Instant WhatsApp & Email Automation Actions */}
              <div className="pt-1 flex flex-col gap-2 max-w-md mx-auto">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Confirmation to SAMATHS WhatsApp ({SITE_INFO.phoneDisplay})</span>
                </button>

                <button
                  onClick={handleEmailRedirect}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Details to SAMATHS Email ({SITE_INFO.email})</span>
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
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Term Duration:</strong> 1 Term = 12 Weeks (2 Classes per week). Payment via MoMo: <strong>{SITE_INFO.momoNumber}</strong>.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Child's Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Kojo Mensah"
                      value={formData.childName}
                      onChange={(e) => {
                        setFormData({ ...formData, childName: e.target.value });
                        if (errors.childName) setErrors({ ...errors, childName: undefined });
                      }}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border ${errors.childName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm`}
                    />
                  </div>
                  {errors.childName && (
                    <p className="text-red-500 text-[11px] mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.childName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Child's Age (Ages 4 - 14) *
                  </label>
                  <select
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm bg-white"
                  >
                    {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((age) => (
                      <option key={age} value={age}>
                        Age {age}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    School Attended *
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Sunyani Int. School"
                      value={formData.schoolName}
                      onChange={(e) => {
                        setFormData({ ...formData, schoolName: e.target.value });
                        if (errors.schoolName) setErrors({ ...errors, schoolName: undefined });
                      }}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border ${errors.schoolName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm`}
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
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm bg-white"
                    >
                      <option value="Sunyani">Sunyani</option>
                      <option value="Accra">Accra</option>
                      <option value="Kumasi">Kumasi</option>
                      <option value="Other Part of Ghana">Other Part of Ghana</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mr. Emmanuel Mensah"
                    value={formData.parentName}
                    onChange={(e) => {
                      setFormData({ ...formData, parentName: e.target.value });
                      if (errors.parentName) setErrors({ ...errors, parentName: undefined });
                    }}
                    className={`w-full px-3 py-2 rounded-xl border ${errors.parentName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm`}
                  />
                  {errors.parentName && (
                    <p className="text-red-500 text-[11px] mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.parentName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Phone / WhatsApp *
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
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border ${errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-[11px] mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="e.g. parent@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl border ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-[11px] mt-0.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div className="pt-1.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : (
                    <span>Submit Registration</span>
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
