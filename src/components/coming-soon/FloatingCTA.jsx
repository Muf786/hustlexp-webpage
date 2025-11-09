import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative group">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
            
            {/* Button */}
            <Button
              onClick={scrollToHero}
              className="relative px-6 py-6 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold rounded-full shadow-2xl flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              <span>Join Waitlist</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}