import React, { useState } from 'react';
import { X, User, Phone, Mail, School, MapPin, CreditCard, CheckCircle2, Send, Sparkles, AlertCircle } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';
import { ParentRegistrationData } from '../types';
import { isValidEmail, isValidPhone } from '../lib/validation';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const message = `Hello SAMATHS SOLUTIONS,%0A%0AI have registered my child for the Abacus Mental Maths Program!%0A%0A*Parent Name:* ${encodeURIComponent(formData.parentName)}%0A*Child Name:* ${encodeURIComponent(formData.childName)} (Age ${formData.childAge})%0A*School Name:* ${encodeURIComponent(formData.schoolName)}%0A*Phone:* ${encodeURIComponent(formData.phone)}${formData.email ? `%0A*Email:* ${encodeURIComponent(formData.email)}` : ''}%0A*Location:* ${encodeURIComponent(formData.location)}%0A*Payment Status:* Paying via Business MoMo [0536541414]`;
    window.open(`https://wa.me/${SITE_INFO.phoneRaw}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 font-extrabold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>PARENT REGISTRATION</span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl text-white">
            Enroll Your Child Now
          </h3>
          <p className="text-xs text-slate-200 mt-1">
            Register your child for SAMATHS Abacus Mental Maths (Limited slots per school).
          </p>
        </div>

        {/* Form / Submitted body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="font-heading font-extrabold text-2xl text-slate-900">
                Child Registration Complete!
              </h4>

              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.parentName}</strong>. Your registration for <strong>{formData.childName}</strong> (Age {formData.childAge}) at <strong>{formData.schoolName}</strong> has been logged.
              </p>

              {/* MoMo Payment Instruction Card */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 text-left max-w-md mx-auto">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                  <span>Business MoMo Payment Instructions</span>
                </div>
                <p className="text-xs text-amber-950 mb-2">
                  Please complete term fee payment via Mobile Money:
                </p>
                <div className="bg-white p-3 rounded-lg border border-amber-200 text-xs space-y-1 font-mono">
                  <div><strong>MoMo Number:</strong> {SITE_INFO.momoNumber}</div>
                  <div><strong>Account Name:</strong> {SITE_INFO.momoAccountName}</div>
                  <div><strong>Reference:</strong> {formData.childName} - {formData.schoolName}</div>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Confirmation via WhatsApp ({SITE_INFO.phoneDisplay})</span>
                </button>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 text-slate-600 hover:text-slate-900 text-xs font-semibold"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Term Duration:</strong> 1 Term = 12 Weeks (2 Classes per week). Payment to Business MoMo: <strong>{SITE_INFO.momoNumber}</strong>.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Child's Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Kojo Mensah"
                      value={formData.childName}
                      onChange={(e) => {
                        setFormData({ ...formData, childName: e.target.value });
                        if (errors.childName) setErrors({ ...errors, childName: undefined });
                      }}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${errors.childName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm`}
                    />
                  </div>
                  {errors.childName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.childName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Child's Age (Ages 4 - 14) *
                  </label>
                  <select
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm bg-white"
                  >
                    {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((age) => (
                      <option key={age} value={age}>
                        {age} Years Old
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  School Attended *
                </label>
                <div className="relative">
                  <School className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Sunyani International School"
                    value={formData.schoolName}
                    onChange={(e) => {
                      setFormData({ ...formData, schoolName: e.target.value });
                      if (errors.schoolName) setErrors({ ...errors, schoolName: undefined });
                    }}
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${errors.schoolName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm`}
                  />
                </div>
                {errors.schoolName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.schoolName}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
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
                    className={`w-full px-3 py-2.5 rounded-xl border ${errors.parentName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm`}
                  />
                  {errors.parentName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.parentName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Parent Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="e.g. 0536541414"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm`}
                    />
                  </div>
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
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      placeholder="e.g. parent@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm`}
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
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm bg-white"
                    >
                      <option value="Sunyani">Sunyani</option>
                      <option value="Accra">Accra</option>
                      <option value="Kumasi">Kumasi</option>
                      <option value="Other Part of Ghana">Other Part of Ghana</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit Child Registration & View MoMo Details</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
