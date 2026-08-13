import React, { useState } from 'react';
import { Phone, Mail, MapPin, Menu, X, BookOpen, Sparkles, CheckCircle, ChevronRight } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

interface HeaderProps {
  currentPage: 'home' | 'gallery' | 'contact';
  onNavigate: (page: 'home' | 'gallery' | 'contact', sectionId?: string) => void;
  onOpenDemoModal: () => void;
  onOpenParentModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenDemoModal,
  onOpenParentModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', targetPage: 'home', sectionId: 'home' },
    { name: 'About Us', targetPage: 'home', sectionId: 'about' },
    { name: 'Our Program', targetPage: 'home', sectionId: 'program' },
    { name: 'Why Choose Us', targetPage: 'home', sectionId: 'why-us' },
    { name: 'Our Reach', targetPage: 'home', sectionId: 'reach' },
    { name: 'Gallery', targetPage: 'gallery', sectionId: 'gallery' },
    { name: 'Contact', targetPage: 'contact', sectionId: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: { name: string; targetPage: string; sectionId: string }) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (link.targetPage === 'contact') {
      onNavigate('contact');
    } else if (link.targetPage === 'gallery') {
      onNavigate('gallery');
    } else {
      onNavigate('home', link.sectionId);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-slate-100">
      {/* Top Utility Bar */}
      <div className="bg-emerald-900 text-slate-100 text-xs py-2 px-4 sm:px-8 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Contact details */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center sm:justify-start w-full sm:w-auto">
            <a 
              href={`tel:+${SITE_INFO.phoneRaw}`} 
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+{SITE_INFO.phoneRaw}</span>
            </a>
            <a 
              href={`mailto:${SITE_INFO.email}`} 
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{SITE_INFO.email}</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{SITE_INFO.location}</span>
            </div>
          </div>
          <div className="hidden sm:block text-[11px] text-emerald-300 font-medium">
            Sunyani & Accra, Ghana
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <button
            onClick={() => onNavigate('home', 'home')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform border border-emerald-500">
              <span className="font-heading tracking-wider">SS</span>
            </div>
            <div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                {SITE_INFO.brandName}
              </div>
              <div className="text-xs font-medium text-emerald-600 italic tracking-wide mt-1">
                ({SITE_INFO.tagline})
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.targetPage;
              return (
                <a
                  key={link.name}
                  href={`#${link.sectionId}`}
                  onClick={(e) => handleLinkClick(e, link as any)}
                  className={`font-semibold text-sm transition-colors relative py-1 ${
                    isActive
                      ? 'text-emerald-700 after:w-full'
                      : 'text-slate-700 hover:text-emerald-700'
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenParentModal}
              className="px-4 py-2.5 rounded-lg text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Register Child
            </button>
            <button
              onClick={onOpenDemoModal}
              className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
            >
              <span>Book a Session</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-4 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.sectionId}`}
                onClick={(e) => handleLinkClick(e, link as any)}
                className="px-3 py-2 rounded-md text-base font-semibold text-slate-800 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenParentModal();
              }}
              className="w-full py-3 rounded-lg text-emerald-800 bg-emerald-100 font-bold text-sm text-center"
            >
              Parent Registration (Child)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="w-full py-3 rounded-lg bg-emerald-700 text-white font-bold text-sm shadow-md text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book a Free Session (Schools)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
