import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, Trophy, Zap, Star } from 'lucide-react';

export default function SuccessAnimation({ isVisible, onClose }) {
  const [xp, setXp] = useState(0);
  const targetXP = 100;

  useEffect(() => {
    if (isVisible) {
      // Animate XP counter
      const duration = 2000;
      const steps = 50;
      const increment = targetXP / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetXP) {
          setXp(targetXP);
          clearInterval(timer);
        } else {
          setXp(Math.floor(current));
        }
      }, duration / steps);

      // Auto close after 5 seconds
      const closeTimer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(closeTimer);
        setXp(0);
      };
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Confetti Particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50vw',
                  y: '50vh',
                  scale: 0,
                  opacity: 1
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: [0, 1, 0.8, 0],
                  opacity: [1, 1, 0.5, 0],
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 2 + Math.random(),
                  ease: "easeOut",
                  delay: Math.random() * 0.3
                }}
                className="absolute pointer-events-none"
              >
                <div
                  className={`w-3 h-3 ${
                    i % 3 === 0 ? 'bg-purple-500' : i % 3 === 1 ? 'bg-amber-400' : 'bg-pink-500'
                  } rounded-full`}
                />
              </motion.div>
            ))}

            {/* Main Success Card */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 180, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20,
                delay: 0.1 
              }}
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-3xl blur-3xl opacity-60 animate-pulse" />

              {/* Card Content */}
              <div className="relative bg-gradient-to-br from-[#1A0B2E] to-[#0F0514] rounded-3xl p-8 md:p-12 border border-white/20 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }} />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-6">
                  {/* Trophy Icon with Burst */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15,
                      delay: 0.3 
                    }}
                    className="relative inline-block"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative"
                    >
                      {/* Glow Ring */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-amber-500 rounded-full blur-2xl"
                      />
                      
                      <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl">
                        <Trophy className="w-12 h-12 text-white" />
                      </div>
                    </motion.div>

                    {/* Floating Stars */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1, 1, 0],
                          opacity: [0, 1, 1, 0],
                          x: [0, (i - 1.5) * 40],
                          y: [0, -30 - i * 10]
                        }}
                        transition={{ 
                          duration: 2,
                          delay: 0.5 + i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                        className="absolute top-1/2 left-1/2"
                      >
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Success Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                      <h2 className="text-3xl md:text-4xl font-black text-white">
                        Welcome Aboard!
                      </h2>
                    </div>
                    <p className="text-white/70 text-lg">
                      You've earned your spot on the waitlist
                    </p>
                  </motion.div>

                  {/* XP Bar */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5 text-amber-400" />
                      <span className="text-2xl font-bold text-white">
                        +{xp} XP
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-xl border border-white/20">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${xp}%` }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 rounded-full"
                      />
                      <motion.div
                        animate={{ 
                          x: ['-100%', '200%'],
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </div>
                  </motion.div>

                  {/* Badge Unlocked */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-amber-600/20 rounded-full border border-white/20 backdrop-blur-xl"
                  >
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-white font-semibold">
                      Founder Badge Unlocked
                    </span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5 text-purple-400" />
                    </motion.div>
                  </motion.div>

                  {/* Call to Action */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-white/60 text-sm"
                  >
                    Check your email for exclusive updates
                  </motion.p>

                  {/* Close hint */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="text-white/40 text-xs"
                  >
                    Click anywhere to continue
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}