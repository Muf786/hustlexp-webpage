import React from 'react';
import ParticleField from '../components/coming-soon/ParticleField';
import CursorGlow from '../components/coming-soon/CursorGlow';
import Hero from '../components/coming-soon/Hero';
import Features from '../components/coming-soon/Features';
import SocialProof from '../components/coming-soon/SocialProof';
import Leaderboard from '../components/coming-soon/Leaderboard';
import HowItWorks from '../components/coming-soon/HowItWorks';
import Footer from '../components/coming-soon/Footer';
import FloatingCTA from '../components/coming-soon/FloatingCTA';
import AudioSystem from '../components/coming-soon/AudioSystem';
import LiveNotifications from '../components/coming-soon/LiveNotifications';

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen bg-[#0F0514] overflow-hidden">
      {/* Audio System */}
      <AudioSystem />
      
      {/* Live Notifications */}
      <LiveNotifications />
      
      {/* Animated Particle Background */}
      <ParticleField />
      
      {/* Custom Cursor Glow */}
      <CursorGlow />

      {/* Main Content */}
      <div className="relative z-10">
        <div id="hero">
          <Hero />
        </div>
        <Features />
        <SocialProof />
        <Leaderboard />
        <HowItWorks />
        <Footer />
      </div>

      {/* Floating CTA */}
      <FloatingCTA />
    </div>
  );
}