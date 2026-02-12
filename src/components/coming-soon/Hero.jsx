import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShineBorder } from '@/components/ui/shine-border';
import { Iphone15Pro } from '@/components/ui/iphone-15-pro';
import { addToWaitlist } from '@/firebase/waitlist';
import { toast } from 'sonner';
import SuccessAnimation from './SuccessAnimation';
import ReferralPortal from './ReferralPortal';
import logo from '@/assets/logo.png';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReferral, setShowReferral] = useState(false);

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
    <section className="relative w-full min-h-screen bg-[#05030a] text-white flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.22),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.18),transparent_45%),radial-gradient(circle_at_bottom,rgba(88,28,135,0.25),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[conic-gradient(from_210deg_at_50%_30%,rgba(255,255,255,0.06),transparent_40%,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0614] via-[#05030a] to-[#020205] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
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
                <p className="text-sm font-semibold tracking-[0.3em] text-violet-200 uppercase">HustleXP</p>
                <p className="text-xs text-white/50 tracking-[0.2em] uppercase">Seattle Beta</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-violet-200"
          >
            Now accepting early access
            <span className="h-1 w-10 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight font-display text-white"
          >
            The local work network that{' '}
            <span className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
              feels like a product.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-slate-300/80 max-w-xl mx-auto lg:mx-0"
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
              <span className="h-2 w-2 rounded-full bg-violet-300" />
              Instant matching
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-fuchsia-300" />
              Verified payouts
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-300" />
              Built for Seattle
            </span>
          </motion.div>

          <div className="mt-10 flex items-center justify-center lg:justify-start">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.35em] text-violet-200">
              Coming soon
              <span className="h-1 w-10 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
            </div>
          </div>
        </div>

        {/* Right Content - iPhone Mockup + Form */}
        <div className="relative flex flex-col items-center gap-8">
          {/* iPhone Mockup - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateY: -10 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 z-0"
            style={{ perspective: '1000px' }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-transparent blur-3xl rounded-full scale-150 -z-10" />
              <Iphone15Pro
                width={280}
                height={570}
                className="drop-shadow-2xl opacity-40"
              />
            </div>
          </motion.div>

          {/* Signup Card with ShineBorder */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="w-full max-w-md z-10"
          >
            <ShineBorder
              borderRadius={24}
              borderWidth={1}
              duration={10}
              color={["#8b5cf6", "#d946ef", "#6366f1"]}
              className="w-full"
            >
              <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl p-8 border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-violet-200">Early Access</p>
                    <p className="text-2xl font-semibold text-white font-display">Reserve your spot</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 opacity-70" />
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-12 bg-black/30 border-white/10 text-white placeholder:text-white/40 focus:border-violet-400/60 transition-all rounded-xl text-base"
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="h-12 bg-black/30 border-white/10 text-white placeholder:text-white/40 focus:border-violet-400/60 transition-all rounded-xl text-base"
                    />
                    <Input
                      type="email"
                      placeholder="work@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 bg-black/30 border-white/10 text-white placeholder:text-white/40 focus:border-violet-400/60 transition-all rounded-xl text-base"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 w-full text-base font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-0 transition-all shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_45px_rgba(217,70,239,0.45)] hover:scale-[1.02] rounded-xl mt-2"
                  >
                    {isSubmitting ? 'Processing...' : 'Join Waitlist'}
                  </Button>

                  <p className="text-xs text-slate-400 mt-4 font-medium tracking-wide uppercase text-center">
                    Launching Seattle 2026
                  </p>
                </form>
              </div>
            </ShineBorder>
          </motion.div>
        </div>
      </div>

      {/* Success & Referral Modals */}
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
