import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Instagram, Zap } from 'lucide-react';
import { addToWaitlist } from '@/components/firebase/waitlist';
import { toast } from 'sonner';
import SuccessAnimation from './SuccessAnimation';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await addToWaitlist({
        email,
        name: "",
        source: "footer",
        referral_code: "",
        referred_by: ""
      });

      setShowSuccess(true);
      setEmail("");
    } catch (error) {
      toast.error("Error joining waitlist.");
    }
    setIsSubmitting(false);
  };

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/officialhustlexp' },
    { icon: null, label: 'X', href: 'https://x.com/HustleXpApp' }
  ];

  return (
    <>
      <footer className="relative py-20 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0B2E] to-[#0F0514]" />

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-purple-600/20 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Don't Miss the <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">Launch</span>
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Join the waitlist and be among the first to experience the future of gig work
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
              <div className="flex gap-3">
                <div className="relative flex-1 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="relative h-12 bg-white/5 backdrop-blur-xl border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="relative flex-1 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="relative h-12 bg-white/5 backdrop-blur-xl border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 px-6 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </Button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center gap-6 mb-12"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                <div className="relative w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 flex items-center justify-center transition-all">
                  {social.icon ? (
                    <social.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  ) : (
                    <span className="text-xl font-bold text-white/70 group-hover:text-white transition-colors">𝕏</span>
                  )}
                </div>
              </a>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center space-y-4"
          >
            <p className="text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                Seattle 2026
              </span>
              <span className="text-white/50"> · Built Different</span>
            </p>
            <p className="text-sm text-white/40">
              Be among the first 1,000 to earn Founder Badges ✨
            </p>
          </motion.div>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center text-white/40 text-sm"
          >
            <p>© 2025 HustleXP. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>

      {/* Success Animation */}
      <SuccessAnimation isVisible={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  );
}