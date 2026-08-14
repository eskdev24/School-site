import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProgramSection } from './components/ProgramSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { OurReach } from './components/OurReach';
import { GalleryPage } from './components/GalleryPage';
import { ContactPage } from './components/ContactPage';
import { CallToAction } from './components/CallToAction';
import { DemoBookingModal } from './components/DemoBookingModal';
import { ParentRegisterModal } from './components/ParentRegisterModal';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { useMetaTags } from './components/MetaTags';
import { SITE_INFO } from './data/siteData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery' | 'contact'>('home');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  // Default Home Page Meta Tags (Open Graph & Twitter)
  useMetaTags({
    title: 'SAMATHS SOLUTIONS | Abacus Mental Maths School Program in Ghana',
    description: 'Transform your child\'s mathematical speed, memory, and concentration with Abacus Mental Maths classes across Sunyani, Accra, and all parts of Ghana. 2 classes a week.',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    image: SITE_INFO.images.heroBanner,
    keywords: 'Abacus mental maths Ghana, SAMATHS SOLUTIONS Sunyani Accra, school maths program, brain boosting arithmetic kids',
  });

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#contact') {
        setCurrentPage('contact');
      } else if (window.location.hash === '#gallery') {
        setCurrentPage('gallery');
      } else {
        setCurrentPage('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: 'home' | 'gallery' | 'contact', sectionId?: string) => {
    setCurrentPage(page);
    if (page === 'contact') {
      window.location.hash = 'contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'gallery') {
      window.location.hash = 'gallery';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (sectionId && sectionId !== 'home') {
        window.location.hash = sectionId;
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            const headerOffset = 110;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 60);
      } else {
        window.location.hash = 'home';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-emerald-600 selection:text-white">
      
      {/* Header Bar */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenParentModal={() => setIsParentModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero
              onOpenDemoModal={() => setIsDemoModalOpen(true)}
              onOpenParentModal={() => setIsParentModalOpen(true)}
            />

            <AboutSection
              onOpenDemoModal={() => setIsDemoModalOpen(true)}
            />

            <ProgramSection
              onOpenDemoModal={() => setIsDemoModalOpen(true)}
              onOpenParentModal={() => setIsParentModalOpen(true)}
            />

            <WhyChooseUs />

            <OurReach
              onOpenDemoModal={() => setIsDemoModalOpen(true)}
            />

            <CallToAction
              onOpenDemoModal={() => setIsDemoModalOpen(true)}
              onOpenParentModal={() => setIsParentModalOpen(true)}
            />
          </>
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            onBackToHome={() => handleNavigate('home', 'home')}
            onOpenDemoModal={() => setIsDemoModalOpen(true)}
            onOpenParentModal={() => setIsParentModalOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onBackToHome={() => handleNavigate('home', 'home')}
            onOpenDemoModal={() => setIsDemoModalOpen(true)}
            onOpenParentModal={() => setIsParentModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenParentModal={() => setIsParentModalOpen(true)}
      />

      {/* Floating Action Buttons (Phone & WhatsApp) */}
      <FloatingActions />

      {/* Interactive Modals */}
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      <ParentRegisterModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
      />

    </div>
  );
}

