import React, { useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ContentsSection from './components/ContentsSection';
import VideoSection from './components/VideoSection';
import WhyMishkat from './components/WhyMishkat';
import ReviewsSection from './components/ReviewsSection';
import PricingOffer from './components/PricingOffer';
import OrderForm from './components/OrderForm';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import StickyMobileCta from './components/StickyMobileCta';

export default function App() {
  const [selectedBundleId, setSelectedBundleId] = useState('single');

  const scrollToOrderForm = () => {
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectBundle = (bundleId) => {
    setSelectedBundleId(bundleId);
    scrollToOrderForm();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C1820] font-cairo selection:bg-[#470923] selection:text-white pb-14 sm:pb-0">
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Main Navigation */}
      <Navbar onOrderClick={scrollToOrderForm} />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOrderClick={scrollToOrderForm} />

        {/* 2. Trust Seals Bar */}
        <TrustBar />

        {/* 3. Product Contents (5 Core Items) */}
        <ContentsSection onOrderClick={scrollToOrderForm} />

        {/* 4. Video / Unboxing Showcase */}
        <VideoSection onOrderClick={scrollToOrderForm} />

        {/* 5. Why Choose Mishkat? / Emotional Benefits */}
        <WhyMishkat onOrderClick={scrollToOrderForm} />

        {/* 6. Customer Testimonials & Reviews */}
        <ReviewsSection />

        {/* 7. Special Pricing & Bundles */}
        <PricingOffer
          selectedBundle={selectedBundleId}
          onSelectBundle={handleSelectBundle}
          onOrderClick={scrollToOrderForm}
        />

        {/* 8. High-Converting Order Form */}
        <OrderForm
          selectedBundleId={selectedBundleId}
          onSelectBundle={setSelectedBundleId}
        />

        {/* 9. FAQ Section */}
        <FaqSection />
      </main>

      {/* 10. Footer */}
      <Footer onOrderClick={scrollToOrderForm} />

      {/* 11. Mobile Floating CTA Bar */}
      <StickyMobileCta onOrderClick={scrollToOrderForm} />
    </div>
  );
}

