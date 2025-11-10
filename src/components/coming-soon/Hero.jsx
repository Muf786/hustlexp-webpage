import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Gamepad2, Bot, DollarSign, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import SuccessAnimation from './SuccessAnimation';
import CountdownTimer from './CountdownTimer';
import PhoneMockup from './PhoneMockup';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await base44.entities.Waitlist.create({ email, name, source: 'hero' });
      setShowSuccess(true);
      setEmail('');
      setName('');
    } catch (error) {
      toast.error('Already on the waitlist? Try another email.');
    }
    setIsSubmitting(false);
  };

  const badges = [
    { icon: Gamepad2, text: 'Gamified Tasks', color: 'from-purple-500 to-pink-500' },
    { icon: Bot, text: 'AI Matching', color: 'from-amber-500 to-orange-500' },
    { icon: DollarSign, text: 'Instant Payouts', color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0514] via-[#1A0B2E] to-[#0F0514]" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-white/90">Launching Seattle 2026</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent animate-gradient">
                  Level Up Your Hustle
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed"
              >
                AI-powered gig marketplace meets RPG. Get anything done, earn XP, and climb the leaderboards.
              </motion.p>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mb-8"
              >
                <p className="text-white/60 text-sm mb-4 uppercase tracking-wider">Launch Countdown</p>
                <CountdownTimer />
              </motion.div>

              {/* Floating Badges */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
              >
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${badge.color} rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                    <div className="relative px-5 py-2.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-2">
                      <badge.icon className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">{badge.text}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Waitlist Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="max-w-xl"
              >
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-xl opacity-0 group-hover:opacity-30 group-focus-within:opacity-30 transition-opacity" />
                      <Input
                        type="text"
                        placeholder="Your name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="relative h-14 bg-white/5 backdrop-blur-xl border-white/10 text-white placeholder:text-white/40 focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div className="relative flex-1 group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-xl opacity-0 group-hover:opacity-30 group-focus-within:opacity-30 transition-opacity" />
                      <Input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="relative h-14 bg-white/5 backdrop-blur-xl border-white/10 text-white placeholder:text-white/40 focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full h-14 px-8 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold text-lg rounded-lg overflow-hidden group"
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(168, 85, 247, 0.5)',
                          '0 0 40px rgba(251, 191, 36, 0.8)',
                          '0 0 20px rgba(168, 85, 247, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0"
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                      <Zap className="w-5 h-5" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </form>
                
                <p className="mt-4 text-sm text-white/50 text-center lg:text-left">
                  Be among the first 1,000 to earn <span className="text-amber-400 font-semibold">Founder Badges</span> ✨
                </p>
              </motion.div>

              {/* Animated Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-white/60"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-sm">AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">RPG Mechanics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="text-sm">Built Different</span>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Phone Mockup */}
            <div className="hidden lg:block">
              <PhoneMockup />
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
        `}</style>
      </section>

      {/* Success Animation */}
      <SuccessAnimation isVisible={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  );
}