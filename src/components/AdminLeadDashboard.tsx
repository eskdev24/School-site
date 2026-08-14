import React, { useState, useEffect } from 'react';
import {
  X,
  Database,
  Users,
  Building2,
  MessageSquare,
  Search,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Trash2,
  Download,
  Filter,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Calendar,
  MapPin,
  Sparkles,
} from 'lucide-react';
import {
  FirebaseParentRegistration,
  FirebaseDemoBooking,
  FirebaseContactInquiry,
  subscribeParentRegistrations,
  subscribeDemoBookings,
  subscribeContactInquiries,
  updateParentRegistrationStatus,
  updateDemoBookingStatus,
  updateContactInquiryStatus,
  deleteParentRegistration,
  deleteDemoBooking,
  deleteContactInquiry,
} from '../services/firebaseDb';
import { SITE_INFO } from '../data/siteData';

interface AdminLeadDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLeadDashboard: React.FC<AdminLeadDashboardProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'parents' | 'demos' | 'inquiries'>('parents');
  const [parents, setParents] = useState<FirebaseParentRegistration[]>([]);
  const [demos, setDemos] = useState<FirebaseDemoBooking[]>([]);
  const [inquiries, setInquiries] = useState<FirebaseContactInquiry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);

    const unsubParents = subscribeParentRegistrations((data) => {
      setParents(data);
      setIsLoading(false);
    });

    const unsubDemos = subscribeDemoBookings((data) => {
      setDemos(data);
    });

    const unsubInquiries = subscribeContactInquiries((data) => {
      setInquiries(data);
    });

    return () => {
      unsubParents();
      unsubDemos();
      unsubInquiries();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Formatting WhatsApp number helper for Ghana
  const formatWhatsAppLink = (phoneStr: string, message: string) => {
    let clean = phoneStr.replace(/\D/g, '');
    if (clean.startsWith('0')) {
      clean = '233' + clean.substring(1);
    } else if (!clean.startsWith('233') && clean.length === 9) {
      clean = '233' + clean;
    }
    return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
  };

  // Filtered lists
  const filteredParents = parents.filter((p) => {
    const matchesSearch =
      searchTerm === '' ||
      p.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredDemos = demos.filter((d) => {
    const matchesSearch =
      searchTerm === '' ||
      d.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.phone.includes(searchTerm) ||
      d.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredInquiries = inquiries.filter((i) => {
    const matchesSearch =
      searchTerm === '' ||
      i.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.phone.includes(searchTerm) ||
      i.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export to CSV
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    if (activeTab === 'parents') {
      csvContent += 'Timestamp,Child Name,Age,School,Location,Parent Name,Phone,Email,Payment Method,Payment Status,Status\n';
      filteredParents.forEach((p) => {
        csvContent += `"${p.timestampDisplay || ''}","${p.childName}","${p.childAge}","${p.schoolName}","${p.location}","${p.parentName}","${p.phone}","${p.email || ''}","${p.paymentMethod}","${p.paymentStatus}","${p.status}"\n`;
      });
    } else if (activeTab === 'demos') {
      csvContent += 'Timestamp,School Name,Location,Contact Person,Role,Phone,Email,Estimated Students,Preferred Date,Notes,Status\n';
      filteredDemos.forEach((d) => {
        csvContent += `"${d.timestampDisplay || ''}","${d.schoolName}","${d.location}","${d.contactPerson}","${d.role}","${d.phone}","${d.email || ''}","${d.estimatedStudents}","${d.preferredDate || ''}","${d.additionalNotes || ''}","${d.status}"\n`;
      });
    } else {
      csvContent += 'Timestamp,Full Name,Phone,Email,Role,Location,Subject,Message,Status\n';
      filteredInquiries.forEach((i) => {
        csvContent += `"${i.timestampDisplay || ''}","${i.fullName}","${i.phone}","${i.email || ''}","${i.role || ''}","${i.location || ''}","${i.subject || ''}","${i.message}","${i.status}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `samaths_${activeTab}_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[95vh] flex flex-col my-auto">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 shrink-0 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg text-white">
                  SAMATHS Lead & Registration Portal
                </h3>
                <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Firebase Realtime Database Live</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Real-time student enrollments, school presentations & inquiries
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Metrics Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-slate-500 font-semibold text-[11px]">Total Parent Registrations</div>
            <div className="text-xl font-extrabold text-emerald-700 mt-0.5">{parents.length}</div>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-slate-500 font-semibold text-[11px]">School Demo Requests</div>
            <div className="text-xl font-extrabold text-teal-700 mt-0.5">{demos.length}</div>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-slate-500 font-semibold text-[11px]">Contact Inquiries</div>
            <div className="text-xl font-extrabold text-indigo-700 mt-0.5">{inquiries.length}</div>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-slate-500 font-semibold text-[11px]">MoMo Verified Students</div>
            <div className="text-xl font-extrabold text-amber-700 mt-0.5">
              {parents.filter((p) => p.status === 'verified' || p.status === 'enrolled').length}
            </div>
          </div>
        </div>

        {/* Tab & Filter Bar */}
        <div className="px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => {
                setActiveTab('parents');
                setStatusFilter('all');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'parents'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Parent Registrations ({parents.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('demos');
                setStatusFilter('all');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'demos'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>School Demos ({demos.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('inquiries');
                setStatusFilter('all');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'inquiries'
                  ? 'bg-white text-indigo-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquiries ({inquiries.length})</span>
            </button>
          </div>

          {/* Search & Export */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, phone, school..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-emerald-600"
              />
            </div>

            <button
              onClick={handleExportCSV}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="Download CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Lead Table / List Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 min-h-[300px]">
          {isLoading ? (
            <div className="py-16 text-center text-slate-500 space-y-2">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-600" />
              <p className="text-xs">Connecting to Firebase Realtime Database...</p>
            </div>
          ) : activeTab === 'parents' ? (
            filteredParents.length === 0 ? (
              <div className="py-16 text-center text-slate-500 space-y-2">
                <Users className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-sm font-semibold">No parent registrations found</p>
                <p className="text-xs text-slate-400">
                  New enrollments submitted on the website will instantly appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredParents.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 hover:border-emerald-300 rounded-xl p-4 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-heading font-extrabold text-sm text-slate-900">
                          {item.childName} (Age {item.childAge})
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-md">
                          {item.schoolName}
                        </span>
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>{item.location}</span>
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span><strong>Parent:</strong> {item.parentName}</span>
                        <span><strong>Phone:</strong> {item.phone}</span>
                        {item.email && <span><strong>Email:</strong> {item.email}</span>}
                        <span className="text-slate-400">• {item.timestampDisplay}</span>
                      </div>

                      <div className="text-[11px] text-amber-800 bg-amber-50 inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-amber-200">
                        <CreditCard className="w-3 h-3 text-amber-600" />
                        <span><strong>Payment:</strong> {item.paymentStatus}</span>
                      </div>
                    </div>

                    {/* Actions & Status Dropdown */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          item.id &&
                          updateParentRegistrationStatus(
                            item.id,
                            e.target.value as any,
                            e.target.value === 'verified' || e.target.value === 'enrolled'
                              ? 'MoMo Verified (0536541414)'
                              : 'Pending MoMo Verification'
                          )
                        }
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none ${
                          item.status === 'enrolled'
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                            : item.status === 'verified'
                            ? 'bg-teal-100 border-teal-300 text-teal-800'
                            : item.status === 'contacted'
                            ? 'bg-blue-100 border-blue-300 text-blue-800'
                            : 'bg-amber-50 border-amber-300 text-amber-800'
                        }`}
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="verified">💳 MoMo Verified</option>
                        <option value="enrolled">🎉 Enrolled</option>
                      </select>

                      {/* WhatsApp Button */}
                      <a
                        href={formatWhatsAppLink(
                          item.phone,
                          `Hello ${item.parentName}, this is SAMATHS SOLUTIONS regarding ${item.childName}'s registration for Abacus Mental Maths.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-1.5 rounded-lg text-xs flex items-center gap-1 shadow-xs transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>

                      {/* Delete */}
                      <button
                        onClick={() => item.id && deleteParentRegistration(item.id)}
                        className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete registration"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : activeTab === 'demos' ? (
            filteredDemos.length === 0 ? (
              <div className="py-16 text-center text-slate-500 space-y-2">
                <Building2 className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-sm font-semibold">No school demo requests found</p>
                <p className="text-xs text-slate-400">
                  School presentation requests will automatically sync here in real time.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredDemos.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 hover:border-teal-300 rounded-xl p-4 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-heading font-extrabold text-sm text-slate-900">
                          {item.schoolName}
                        </span>
                        <span className="bg-teal-100 text-teal-800 font-bold text-[10px] px-2 py-0.5 rounded-md">
                          {item.estimatedStudents}
                        </span>
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>{item.location}</span>
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span><strong>Contact:</strong> {item.contactPerson} ({item.role})</span>
                        <span><strong>Phone:</strong> {item.phone}</span>
                        {item.preferredDate && <span><strong>Target Date:</strong> {item.preferredDate}</span>}
                        <span className="text-slate-400">• {item.timestampDisplay}</span>
                      </div>

                      {item.additionalNotes && (
                        <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200">
                          <strong>Notes:</strong> {item.additionalNotes}
                        </p>
                      )}
                    </div>

                    {/* Actions & Status Dropdown */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          item.id && updateDemoBookingStatus(item.id, e.target.value as any)
                        }
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none ${
                          item.status === 'completed'
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                            : item.status === 'scheduled'
                            ? 'bg-blue-100 border-blue-300 text-blue-800'
                            : item.status === 'contacted'
                            ? 'bg-teal-100 border-teal-300 text-teal-800'
                            : 'bg-amber-50 border-amber-300 text-amber-800'
                        }`}
                      >
                        <option value="new">🌟 New Request</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="scheduled">📅 Scheduled</option>
                        <option value="completed">✅ Completed</option>
                      </select>

                      {/* WhatsApp Button */}
                      <a
                        href={formatWhatsAppLink(
                          item.phone,
                          `Hello ${item.contactPerson}, this is SAMATHS SOLUTIONS regarding the Abacus Mental Maths presentation for ${item.schoolName}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-teal-700 hover:bg-teal-800 text-white font-bold p-1.5 rounded-lg text-xs flex items-center gap-1 shadow-xs transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>

                      {/* Delete */}
                      <button
                        onClick={() => item.id && deleteDemoBooking(item.id)}
                        className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete booking"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : filteredInquiries.length === 0 ? (
            <div className="py-16 text-center text-slate-500 space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-semibold">No inquiries logged yet</p>
              <p className="text-xs text-slate-400">
                General inquiries sent through the contact form will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredInquiries.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-4 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-heading font-extrabold text-sm text-slate-900">
                        {item.fullName}
                      </span>
                      <span className="bg-indigo-100 text-indigo-800 font-bold text-[10px] px-2 py-0.5 rounded-md">
                        {item.role || 'Inquiry'}
                      </span>
                      {item.location && (
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>{item.location}</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span><strong>Phone:</strong> {item.phone}</span>
                      {item.email && <span><strong>Email:</strong> {item.email}</span>}
                      <span className="text-slate-400">• {item.timestampDisplay}</span>
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      "{item.message}"
                    </p>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        item.id && updateContactInquiryStatus(item.id, e.target.value as any)
                      }
                      className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none ${
                        item.status === 'replied'
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                          : item.status === 'read'
                          ? 'bg-slate-100 border-slate-300 text-slate-800'
                          : 'bg-amber-50 border-amber-300 text-amber-800'
                      }`}
                    >
                      <option value="unread">📬 Unread</option>
                      <option value="read">👀 Read</option>
                      <option value="replied">✅ Replied</option>
                    </select>

                    {/* WhatsApp Button */}
                    <a
                      href={formatWhatsAppLink(
                        item.phone,
                        `Hello ${item.fullName}, this is SAMATHS SOLUTIONS responding to your inquiry.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-1.5 rounded-lg text-xs flex items-center gap-1 shadow-xs transition-colors"
                      title="Reply on WhatsApp"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Reply WhatsApp</span>
                    </a>

                    {/* Delete */}
                    <button
                      onClick={() => item.id && deleteContactInquiry(item.id)}
                      className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-100 border-t border-slate-200 px-5 py-2.5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Database: <strong>Realtime Database</strong> (Ghana Accra GMT+0)</span>
          </div>
          <div>
            Support / MoMo Desk: <strong>{SITE_INFO.phoneDisplay}</strong>
          </div>
        </div>

      </div>
    </div>
  );
};
