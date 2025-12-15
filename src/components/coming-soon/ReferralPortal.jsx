import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Users, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function ReferralPortal({ referralCode, currentReferrals = 0, onClose }) {
  const [copied, setCopied] = useState(false);
  const referralUrl = `${window.location.origin}${window.location.pathname}?ref=${referralCode}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    toast.success('Referral link copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-lg w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Card */}
          <div className="bg-[#020617] rounded-2xl p-8 border border-white/10 shadow-2xl shadow-indigo-500/10">

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/10 mb-4">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Invite your network
              </h2>
              <p className="text-slate-400">
                Gain priority access to jobs by verifying professionals in your network.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mb-8 py-6 border-y border-white/5">
              <div className="text-center">
                <p className="text-3xl font-light text-white">{currentReferrals}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Referrals</p>
              </div>
              <div className="h-12 w-px bg-white/5" />
              <div className="text-center">
                <p className="text-3xl font-light text-indigo-400">{100 + (currentReferrals * 25)}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Trust Score</p>
              </div>
            </div>

            {/* Link Input */}
            <div className="space-y-4 mb-8">
              <label className="text-sm font-medium text-slate-300">Your Unique Link</label>
              <div className="flex gap-2">
                <Input
                  value={referralUrl}
                  readOnly
                  className="bg-white/5 border-white/10 text-slate-300 focus-visible:ring-indigo-500/50"
                />
                <Button
                  onClick={handleCopy}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white min-w-[100px]"
                >
                  {copied ? <Check className="w-4 h-4" /> : "Copy"}
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full border-white/10 bg-transparent text-slate-400 hover:text-white hover:bg-white/5"
              >
                Close
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-2">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified referrals boost your trust score</span>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}