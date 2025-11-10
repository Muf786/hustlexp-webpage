import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Share2, Trophy, Zap, Crown, Award, Medal, Users, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { playClickSound } from './AudioSystem';

const BADGE_TIERS = [
  { name: 'Bronze', referrals: 3, icon: Medal, color: 'from-orange-600 to-orange-800', xp: 50 },
  { name: 'Silver', referrals: 10, icon: Award, color: 'from-gray-400 to-gray-600', xp: 150 },
  { name: 'Gold', referrals: 25, icon: Trophy, color: 'from-amber-400 to-yellow-600', xp: 300 },
  { name: 'Platinum', referrals: 50, icon: Crown, color: 'from-cyan-400 to-blue-600', xp: 500 }
];

export default function ReferralPortal({ userEmail, referralCode, currentReferrals = 0, onClose }) {
  const [copied, setCopied] = useState(false);
  const [currentTierIndex, setCurrentTierIndex] = useState(0);
  const referralUrl = `${window.location.origin}${window.location.pathname}?ref=${referralCode}`;

  useEffect(() => {
    const tierIndex = BADGE_TIERS.findIndex(tier => currentReferrals < tier.referrals);
    setCurrentTierIndex(tierIndex === -1 ? BADGE_TIERS.length - 1 : Math.max(0, tierIndex));
  }, [currentReferrals]);

  const currentTier = BADGE_TIERS[currentTierIndex];
  const nextTier = BADGE_TIERS[currentTierIndex + 1];
  const progress = currentTier ? Math.min((currentReferrals / currentTier.referrals) * 100, 100) : 100;
  const referralsNeeded = currentTier ? Math.max(0, currentTier.referrals - currentReferrals) : 0;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    playClickSound();
    toast.success('🎮 Referral link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join HustleXP - Level Up Your Hustle',
          text: 'Join me on the HustleXP waitlist! AI-powered gig marketplace meets RPG. Seattle 2026.',
          url: referralUrl
        });
        playClickSound();
        toast.success('🚀 Thanks for sharing!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const TierBadge = ({ tier, isActive, isCompleted }) => {
    const Icon = tier.icon;
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative group"
      >
        <motion.div
          animate={isActive ? {
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inset-0 bg-gradient-to-br ${tier.color} rounded-xl blur-xl ${isActive ? 'opacity-70' : 'opacity-0'}`}
        />
        <div className={`relative p-3 rounded-xl border-2 transition-all ${
          isCompleted 
            ? `bg-gradient-to-br ${tier.color} border-white/30` 
            : isActive
            ? 'bg-white/10 border-white/30'
            : 'bg-white/5 border-white/10 opacity-50'
        }`}>
          <Icon className={`w-6 h-6 ${isCompleted || isActive ? 'text-white' : 'text-white/40'}`} />
        </div>
        <p className={`text-xs mt-1 text-center font-semibold ${
          isCompleted || isActive ? 'text-white' : 'text-white/40'
        }`}>
          {tier.name}
        </p>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
          >
            <Check className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-w-2xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Epic Glow */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-3xl blur-3xl"
          />

          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-[#1A0B2E] via-[#2D1B4E] to-[#0F0514] rounded-3xl p-8 md:p-10 border-2 border-white/20 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}
              />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-purple-600/30 to-amber-600/30 border border-white/20">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span className="text-white/90 text-sm font-semibold">Referral Portal</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-2">
                  Invite Friends. Earn XP.
                </h2>
                <p className="text-white/70">Share your unique link and climb the leaderboard together</p>
              </motion.div>

              {/* Current Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    {currentReferrals}
                  </motion.div>
                  <p className="text-white/60 text-sm mt-1">Referrals</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="text-3xl font-black bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent"
                  >
                    {100 + currentReferrals * 25}
                  </motion.div>
                  <p className="text-white/60 text-sm mt-1 flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3" /> Total XP
                  </p>
                </div>
              </motion.div>

              {/* Badge Tiers Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center gap-2">
                  {BADGE_TIERS.map((tier, index) => (
                    <TierBadge
                      key={tier.name}
                      tier={tier}
                      isActive={index === currentTierIndex}
                      isCompleted={currentReferrals >= tier.referrals}
                    />
                  ))}
                </div>

                {nextTier && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">
                        {referralsNeeded} more to unlock {nextTier.name}
                      </span>
                      <span className="text-amber-400 font-semibold">+{nextTier.xp} XP</span>
                    </div>
                    <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${nextTier.color} rounded-full`}
                      />
                      <motion.div
                        animate={{ x: ['0%', '200%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Referral Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <label className="text-white font-semibold text-sm">Your Referral Link</label>
                <div className="flex gap-2">
                  <div className="relative flex-1 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                    <Input
                      value={referralUrl}
                      readOnly
                      className="relative h-12 bg-white/5 backdrop-blur-xl border-white/20 text-white text-sm"
                    />
                  </div>
                  <Button
                    onClick={handleCopy}
                    className="h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold"
                  >
                    {copied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </motion.div>

              {/* Share Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 gap-3"
              >
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleShare}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Link
                  </Button>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => {
                      playClickSound();
                      onClose();
                    }}
                    variant="outline"
                    className="w-full h-12 border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold"
                  >
                    Continue
                  </Button>
                </motion.div>
              </motion.div>

              {/* Footer Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center space-y-2 pt-2"
              >
                <p className="text-white/60 text-sm">
                  🎁 Both you and your friend earn <span className="text-amber-400 font-semibold">+25 XP</span> per referral
                </p>
                <p className="text-white/40 text-xs">
                  Track your progress on the leaderboard • Unlock exclusive founder badges
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}