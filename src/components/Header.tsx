import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Menu, X, BookOpen, Sparkles } from 'lucide-react';
import { SITE_INFO } from '../data/siteData';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentPage: 'home' | 'gallery' | 'contact';
  onNavigate: (page: 'home' | 'gallery' | 'contact', sectionId?: string) => void;
  onOpenDemoModal?: () => void;
  onOpenParentModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  const navLinks = [
    { name: 'Home', targetPage: 'home', sectionId: 'home' },
    { name: 'About Us', targetPage: 'home', sectionId: 'about' },
    { name: 'Our Program', targetPage: 'home', sectionId: 'program' },
    { name: 'Why Choose Us', targetPage: 'home', sectionId: 'why-us' },
    { name: 'Our Reach', targetPage: 'home', sectionId: 'reach' },
    { name: 'Gallery', targetPage: 'gallery', sectionId: 'gallery' },
    { name: 'Contact', targetPage: 'contact', sectionId: 'contact' },
  ];

  // Scroll spy for sections on home page
  useEffect(() => {
    if (currentPage !== 'home') {
      setActiveSection(currentPage);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      const sectionIds = ['home', 'about', 'program', 'why-us', 'reach'];

      // Find current active section based on scroll position
      let current = 'home';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = id;
            break;
          } else if (scrollPosition >= top) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleLinkClick = (e: React.MouseEvent, link: (typeof navLinks)[0]) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(link.sectionId);
    if (link.targetPage === 'contact') {
      onNavigate('contact');
    } else if (link.targetPage === 'gallery') {
      onNavigate('gallery');
    } else {
      onNavigate('home', link.sectionId);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-md border-b border-slate-100">
        {/* Animated Top Utility Bar (Infinite Right-to-Left Loop) */}
      <div className="bg-emerald-950 text-slate-100 text-xs py-2 border-b border-emerald-800 overflow-hidden relative">
        {/* Subtle edge gradient masks for smooth transitions */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-emerald-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-emerald-950 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration: 35,
          }}
        >
          {/* Duplicate track content twice for seamless infinite loop */}
          {[0, 1].map((copyIndex) => (
            <div key={copyIndex} className="flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 shrink-0 whitespace-nowrap">
              <a 
                href={`tel:+${SITE_INFO.phoneRaw}`} 
                className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+{SITE_INFO.phoneRaw}</span>
              </a>

              <span className="text-emerald-700 select-none">•</span>

              <a 
                href={`mailto:${SITE_INFO.email}`} 
                className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{SITE_INFO.email}</span>
              </a>

              <span className="text-emerald-700 select-none">•</span>

              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{SITE_INFO.location}</span>
              </div>

              <span className="text-emerald-700 select-none">•</span>

              <div className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  <span className="font-logo font-extrabold text-amber-400">SAMATHS</span>{' '}
                  <span className="font-logo font-extrabold text-emerald-400">SOLUTIONS</span>{' '}
                  <span className="text-emerald-300">({SITE_INFO.tagline})</span>
                </span>
              </div>

              <span className="text-emerald-700 select-none">•</span>

              <div className="flex items-center gap-1.5 text-slate-300">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Abacus Mental Maths & Brain Development</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <button
            onClick={() => onNavigate('home', 'home')}
            className="group text-left cursor-pointer focus:outline-none"
            aria-label="SAMATHS SOLUTIONS Home"
          >
            <BrandLogo theme="light" size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isHomeSection = link.targetPage === 'home';
              const isActive =
                currentPage === 'home'
                  ? isHomeSection && activeSection === link.sectionId
                  : currentPage === link.targetPage;

              return (
                <a
                  key={link.name}
                  href={`#${link.sectionId}`}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`group relative py-2 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-emerald-700 font-bold'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>

                  {/* Active Sliding Underline Indicator with Spring Animation */}
                  {isActive ? (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] bg-emerald-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-emerald-400/50 rounded-full transition-all duration-300 group-hover:w-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-5 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isHomeSection = link.targetPage === 'home';
              const isActive =
                currentPage === 'home'
                  ? isHomeSection && activeSection === link.sectionId
                  : currentPage === link.targetPage;

              return (
                <a
                  key={link.name}
                  href={`#${link.sectionId}`}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold border-l-4 border-emerald-600 pl-3'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50 font-medium pl-4'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shadow-xs" />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      )}
      </header>
      {/* Layout Spacer so content begins directly below fixed header */}
      <div className="h-[114px] w-full shrink-0" aria-hidden="true" />
    </>
  );
};

