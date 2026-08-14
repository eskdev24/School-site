import React from 'react';
import { Phone, Mail, MapPin, CreditCard, Sparkles } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate?: (page: 'home' | 'gallery' | 'contact', sectionId?: string) => void;
  onOpenDemoModal: () => void;
  onOpenParentModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDemoModal, onOpenParentModal }) => {
  const handleLinkClick = (e: React.MouseEvent, page: 'home' | 'gallery' | 'contact', sectionId?: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page, sectionId);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo theme="dark" size="md" />

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Leading Abacus Mental Maths company in Accra, Sunyani, Ghana. We partner with schools to deliver fun, brain-boosting classes that transform how children think, learn, and calculate.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-emerald-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#home" onClick={(e) => handleLinkClick(e, 'home', 'home')} className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, 'home', 'about')} className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#program" onClick={(e) => handleLinkClick(e, 'home', 'program')} className="hover:text-emerald-400 transition-colors">Our Program</a></li>
              <li><a href="#why-us" onClick={(e) => handleLinkClick(e, 'home', 'why-us')} className="hover:text-emerald-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#reach" onClick={(e) => handleLinkClick(e, 'home', 'reach')} className="hover:text-emerald-400 transition-colors">Our Reach</a></li>
              <li><a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery', 'gallery')} className="hover:text-emerald-400 transition-colors">Photo Gallery</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact', 'contact')} className="hover:text-emerald-400 transition-colors">Contact Us & FAQ</a></li>
            </ul>
          </div>

          {/* Program Information */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-emerald-400">
              Program Details
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>• School Abacus Program (2x / Week)</li>
              <li>• Target Ages: 4 - 14 Years</li>
              <li>• Duration: 1 Term = 12 Weeks</li>
              <li>• Mental Calculation & Speed</li>
              <li>• Memory & Concentration</li>
              <li>• Currently serving 30 schools</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-emerald-400">
              Contact & Location
            </h4>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <a 
                href={`tel:+${SITE_INFO.phoneRaw}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp / Call: {SITE_INFO.phoneDisplay}</span>
              </a>

              <a 
                href={`mailto:${SITE_INFO.email}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{SITE_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{SITE_INFO.location}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={onOpenDemoModal}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition-colors"
              >
                Book a Session
              </button>
              <button
                onClick={onOpenParentModal}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
              >
                Register Child
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <span className="font-logo font-bold"><span className="text-amber-400">SAMATHS</span> <span className="text-emerald-400">SOLUTIONS</span></span>. All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
