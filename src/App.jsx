import React from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import MediaGallery from './components/MediaGallery';
import QuickOrderCard from './components/QuickOrderCard';
import TrustBar from './components/TrustBar';
import ContentsSection from './components/ContentsSection';
import WhyMishkat from './components/WhyMishkat';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import StickyMobileCta from './components/StickyMobileCta';

export default function App() {
  const scrollToOrder = () => {
    const el = document.getElementById('quick-order-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C1820] font-cairo selection:bg-[#470923] selection:text-white flex flex-col w-full overflow-x-hidden">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Navbar with Links & Logo */}
      <Navbar onOrderClick={scrollToOrder} />

      {/* 3. Main Conversion Hero Zone (Top of Page) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-12">
        
        {/* 2-Column Hero Zone on Desktop, Natural Vertical Flow on Mobile */}
        <div id="order-hero" className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full">
          
          {/* Media Column (Image & Video Gallery) */}
          <div className="w-full lg:col-span-7">
            <MediaGallery />
          </div>

          {/* Order Form Column (High Converting COD Card) */}
          <div className="w-full lg:col-span-5 lg:sticky lg:top-24">
            <QuickOrderCard />
          </div>

        </div>

        {/* 4. Trust Badges Strip */}
        <TrustBar />

        {/* 5. Product Contents Section (5 Core Items) */}
        <ContentsSection onOrderClick={scrollToOrder} />

        {/* 6. Why Choose Mishkat? / Emotional Benefits */}
        <WhyMishkat onOrderClick={scrollToOrder} />

        {/* 7. Customer Reviews & Testimonials */}
        <ReviewsSection />

        {/* 8. FAQ Section */}
        <FaqSection />

      </main>

      {/* 9. Previous Beloved Footer */}
      <Footer onOrderClick={scrollToOrder} />

      {/* 10. Sticky Mobile CTA for mobile shoppers */}
      <StickyMobileCta onOrderClick={scrollToOrder} />
    </div>
  );
}
