import React from 'react';
import Hero from '../components/coming-soon/Hero';
import Features from '../components/coming-soon/Features';
import SocialProof from '../components/coming-soon/SocialProof';
import Footer from '../components/coming-soon/Footer';

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen bg-[#05030a] overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10">
        <div id="hero">
          <Hero />
        </div>
        <Features />
        <SocialProof />
        <Footer />
      </div>
    </div>
  );
}
