import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Instagram, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToHero = () => {
    const hero = document.getElementById('hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="max-w-md mx-auto"
            >
              <Button
                onClick={scrollToHero}
                className="relative w-full h-14 px-8 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold text-lg rounded-full shadow-2xl group overflow-hidden"
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
                  Create Account & Join Waitlist
                  <ArrowUp className="w-5 h-5" />
                </span>
              </Button>
              <p className="mt-4 text-sm text-white/40">
                Create your account to unlock Founder Badges ✨
              </p>
            </motion.div>
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
    </>
  );
}