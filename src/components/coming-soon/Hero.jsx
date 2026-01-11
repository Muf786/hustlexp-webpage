import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addToWaitlist } from '@/firebase/waitlist';
import { toast } from 'sonner';
import SuccessAnimation from './SuccessAnimation';
import ReferralPortal from './ReferralPortal';
import CountdownTimer from './CountdownTimer';
import logo from '@/assets/logo.png';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReferral, setShowReferral] = useState(false);

  // Keep referral logic but simplify UI
  const [referredBy, setReferredBy] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      setReferredBy(refCode);
    }
  }, []);

  const generateReferralCode = (email) => {
    return email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') +
      Math.random().toString(36).substring(2, 6);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const referralCode = generateReferralCode(email);
      const data = {
        email,
        name,
        phone,
        source: referredBy ? "referral" : "hero",
        referral_code: referralCode,
        referred_by: referredBy
      }

      await addToWaitlist(data);

      // Store for referral portal
      setUserData(data);

      setShowSuccess(true);
      setEmail("");
      setName("");
      setPhone("");
      toast.success("You have been added to the waitlist.");
    } catch (error) {
      console.error(error);
      toast.error("Error joining waitlist. Please try again.");
    }
    setIsSubmitting(false);
  };

  const handleSuccessComplete = () => {
    setShowSuccess(false);
    setShowReferral(true);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#05060a] text-white flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_40%,rgba(255,255,255,0.02))] pointer-events-none" />

      <motion.div
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-[120px]"
        animate={{ y: [0, 24, -8], x: [0, -16, 6] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-400/20 blur-[140px]"
        animate={{ y: [0, -18, 12], x: [0, 12, -10] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex flex-col items-center lg:items-start"
          >
            <div className="flex items-center gap-3">
              <div className="p-4 rounded-3xl bg-white/5 shadow-2xl shadow-cyan-500/10 border border-white/10">
                <img src={logo} alt="HustleXP Logo" className="h-16 md:h-20 w-auto object-contain" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold tracking-[0.3em] text-cyan-200 uppercase">HustleXP</p>
                <p className="text-xs text-white/50 tracking-[0.2em] uppercase">Seattle Beta</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-cyan-200"
          >
            Now accepting early access
            <span className="h-1 w-10 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight font-display text-white"
          >
            The local work network that{' '}
            <span className="bg-gradient-to-r from-cyan-200 via-emerald-200 to-lime-200 bg-clip-text text-transparent">
              feels like a product.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-lg md:text-2xl text-slate-300/80 max-w-xl mx-auto lg:mx-0"
          >
            A premium marketplace for local tasks. Clear scopes, verified workers, and fast payouts built for the next
            wave of earners.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs uppercase tracking-[0.3em] text-white/50"
          >
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Instant matching
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Verified payouts
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-lime-300" />
              Built for Seattle
            </span>
          </motion.div>

          <div className="mt-10">
            <CountdownTimer />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full max-w-lg mx-auto lg:mx-0"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Early Access</p>
                <p className="text-2xl font-semibold text-white font-display">Reserve your spot</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 opacity-70" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 bg-black/20 border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400/60 transition-all rounded-xl text-base"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-12 bg-black/20 border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400/60 transition-all rounded-xl text-base"
                />
                <Input
                  type="email"
                  placeholder="work@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-black/20 border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400/60 transition-all rounded-xl text-base"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full text-base font-semibold bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-900 border-0 transition-all shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:shadow-[0_0_45px_rgba(16,185,129,0.45)] rounded-xl mt-2"
              >
                {isSubmitting ? 'Processing...' : 'Join Waitlist'}
              </Button>

              <p className="text-xs text-slate-400 mt-4 font-medium tracking-wide uppercase">
                Launching Seattle 2026
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Success & Referral Modals - Keep functionality but ensure style matches if possible */}
      {/* (SuccessAnimation might need a tweak internally to not be too flashy, but logic is here) */}
      <SuccessAnimation
        isVisible={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          setShowReferral(true);
        }}
        onComplete={handleSuccessComplete}
      />

      {showReferral && userData && (
        <ReferralPortal
          userEmail={userData.email}
          referralCode={userData.referral_code}
          currentReferrals={userData.referral_count || 0}
          onClose={() => setShowReferral(false)}
        />
      )}
    </section>
  );
}
