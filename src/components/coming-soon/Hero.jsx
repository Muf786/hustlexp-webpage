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
    <section className="relative w-full min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          {/* Logo container ensures blending */}
          <div className="p-4 rounded-3xl bg-[#020617] inline-block shadow-2xl shadow-indigo-500/10 border border-white/5">
            <img src={logo} alt="HustleXP Logo" className="h-24 w-auto object-contain mx-auto" />
          </div>
        </motion.div>

        {/* Brand Name - Refined */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-10"
        >
          <span className="text-sm font-semibold tracking-[0.3em] text-indigo-300/80 uppercase">
            HustleXP
          </span>
        </motion.div>

        {/* Countdown */}
        <CountdownTimer />

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-7xl font-semibold tracking-tight mb-6 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent pb-2"
        >
          Earning on your terms.
        </motion.h1>

        {/* Subcopy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xl md:text-2xl text-slate-400 mb-12 max-w-lg font-light"
        >
          The professional marketplace for local tasks. <br className="hidden md:block" /> Connect with opportunities clearly on HustleXP.
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-md"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500/50 transition-all rounded-lg text-base"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500/50 transition-all rounded-lg text-base"
              />
              <Input
                type="email"
                placeholder="work@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500/50 transition-all rounded-lg text-base"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full text-base font-medium bg-indigo-600 hover:bg-indigo-500 text-white border-0 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] rounded-lg mt-2"
            >
              {isSubmitting ? 'Processing...' : 'Join Waitlist'}
            </Button>

            <p className="text-xs text-slate-500 mt-6 font-medium tracking-wide uppercase">
              Launching Seattle 2026
            </p>
          </form>
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