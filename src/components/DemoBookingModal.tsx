import React, { useState } from 'react';
import { X, Calendar, School, User, Phone, Mail, MapPin, Users, CheckCircle, Sparkles, Send, AlertCircle } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';
import { DemoBookingData } from '../types';
import { isValidEmail, isValidPhone } from '../lib/validation';

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoBookingModal: React.FC<DemoBookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<DemoBookingData>({
    schoolName: '',
    contactPerson: '',
    role: 'School Owner/Headmistress',
    phone: '',
    email: '',
    location: 'Sunyani',
    estimatedStudents: '50-100',
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

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: {
      schoolName?: string;
      contactPerson?: string;
      phone?: string;
      email?: string;
    } = {};

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'Please enter your school name';
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Please enter the contact person name';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter a phone or WhatsApp number';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (e.g. 0536541414 or +233...)';
    }

    if (formData.email.trim() && !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g. school@example.com)';
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
    const message = `Hello SAMATHS SOLUTIONS,%0A%0AI would like to schedule a Session for my school!%0A%0A*School Name:* ${encodeURIComponent(formData.schoolName)}%0A*Contact Person:* ${encodeURIComponent(formData.contactPerson)} (${formData.role})%0A*Phone:* ${encodeURIComponent(formData.phone)}${formData.email ? `%0A*Email:* ${encodeURIComponent(formData.email)}` : ''}%0A*Location:* ${encodeURIComponent(formData.location)}%0A*Estimated Students:* ${encodeURIComponent(formData.estimatedStudents)}%0A*Preferred Date:* ${encodeURIComponent(formData.preferredDate || 'N/A')}%0A*Notes:* ${encodeURIComponent(formData.additionalNotes || 'N/A')}`;
    window.open(`https://wa.me/${SITE_INFO.phoneRaw}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 font-extrabold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>FOR SCHOOL OWNERS & HEADMISTRESSES</span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl text-white">
            Schedule a Session
          </h3>
          <p className="text-xs text-slate-200 mt-1">
            Experience our abacus mental maths curriculum live with a session at your school campus.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="font-heading font-extrabold text-2xl text-slate-900">
                Session Request Received!
              </h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.contactPerson}</strong>. Your session request for <strong>{formData.schoolName}</strong> has been logged.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-1 max-w-md mx-auto">
                <div><strong>Location:</strong> {formData.location}</div>
                <div><strong>Preferred Date:</strong> {formData.preferredDate || 'To be agreed'}</div>
                <div><strong>Estimated Students:</strong> {formData.estimatedStudents}</div>
                <div><strong>Contact Phone:</strong> {formData.phone}</div>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Request Via WhatsApp ({SITE_INFO.phoneDisplay})</span>
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
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  School Name *
                </label>
                <div className="relative">
                  <School className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Grace Preparatory School"
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
                    Contact Person Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Mrs. Abena Osei"
                      value={formData.contactPerson}
                      onChange={(e) => {
                        setFormData({ ...formData, contactPerson: e.target.value });
                        if (errors.contactPerson) setErrors({ ...errors, contactPerson: undefined });
                      }}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${errors.contactPerson ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm`}
                    />
                  </div>
                  {errors.contactPerson && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.contactPerson}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Role / Position
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm bg-white"
                  >
                    <option value="Headmistress/Headmaster">Headmistress / Headmaster</option>
                    <option value="School Owner">School Owner</option>
                    <option value="Academic Director">Academic Director</option>
                    <option value="Teacher/Coordinator">Teacher / Coordinator</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Phone / WhatsApp Number *
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      placeholder="e.g. school@example.com"
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    School Location *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm bg-white"
                    >
                      <option value="Sunyani">Sunyani (Bono Region)</option>
                      <option value="Accra">Accra (Greater Accra)</option>
                      <option value="Kumasi">Kumasi</option>
                      <option value="Other Part of Ghana">Other Part of Ghana</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Est. Students (Ages 4-14)
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <select
                      value={formData.estimatedStudents}
                      onChange={(e) => setFormData({ ...formData, estimatedStudents: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm bg-white"
                    >
                      <option value="Under 50">Under 50 students</option>
                      <option value="50-100">50 - 100 students</option>
                      <option value="100-200">100 - 200 students</option>
                      <option value="200+">200+ students</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Preferred Session Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any specific instructions or questions..."
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Confirm Session Request</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
