import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, Trophy, Zap, Star, Crown, Award, Flame, Gift } from 'lucide-react';

export default function SuccessAnimation({ isVisible, onClose }) {
  const [xp, setXp] = useState(0);
  const [phase, setPhase] = useState(0);
  const targetXP = 100;

  useEffect(() => {
    if (isVisible) {
      // Phase progression
      const phaseTimers = [
        setTimeout(() => setPhase(1), 300),
        setTimeout(() => setPhase(2), 800),
        setTimeout(() => setPhase(3), 1500),
        setTimeout(() => setPhase(4), 2200),
      ];

      // Animate XP counter with easing
      const duration = 1500;
      const startTime = Date.now() + 800;
      
      const animateXP = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        
        if (elapsed < 0) {
          requestAnimationFrame(animateXP);
          return;
        }
        
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4); // Ease out quart
        setXp(Math.floor(eased * targetXP));
        
        if (progress < 1) {
          requestAnimationFrame(animateXP);
        }
      };
      
      requestAnimationFrame(animateXP);

      // Auto close after 6 seconds
      const closeTimer = setTimeout(() => {
        onClose();
      }, 6000);

      return () => {
        phaseTimers.forEach(timer => clearTimeout(timer));
        clearTimeout(closeTimer);
        setXp(0);
        setPhase(0);
      };
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay with Flash Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Flash Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.5, times: [0, 0.3, 1] }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500"
            />

            {/* Screen Shake Container */}
            <motion.div
              animate={{ 
                x: [0, -5, 5, -5, 5, 0],
                y: [0, -3, 3, -3, 3, 0]
              }}
              transition={{ 
                duration: 0.4,
                delay: 0.3,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1]
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Energy Rings Expanding */}
              {phase >= 1 && [...Array(3)].map((_, i) => (
                <motion.div
                  key={`ring-${i}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ 
                    scale: [0.5, 3, 4],
                    opacity: [0.6, 0.3, 0]
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                  className="absolute w-96 h-96 rounded-full border-4 border-purple-500"
                  style={{ 
                    boxShadow: '0 0 60px rgba(168, 85, 247, 0.8)'
                  }}
                />
              ))}

              {/* XP Orbs Flying In */}
              {phase >= 1 && [...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const startX = Math.cos(angle) * 500;
                const startY = Math.sin(angle) * 500;
                
                return (
                  <motion.div
                    key={`orb-${i}`}
                    initial={{ 
                      x: startX, 
                      y: startY,
                      scale: 0,
                      opacity: 0
                    }}
                    animate={{ 
                      x: [startX, 0],
                      y: [startY, -50],
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.5 + i * 0.05,
                      ease: "easeInOut"
                    }}
                    className="absolute pointer-events-none"
                  >
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 shadow-lg shadow-amber-500/50" />
                  </motion.div>
                );
              })}

              {/* Confetti Explosion - Multiple Waves */}
              {[...Array(60)].map((_, i) => {
                const angle = (i / 60) * Math.PI * 2;
                const distance = 150 + Math.random() * 400;
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance - Math.random() * 100;
                const shapes = ['circle', 'square', 'triangle'];
                const shape = shapes[i % 3];
                const colors = ['bg-purple-500', 'bg-pink-500', 'bg-amber-400', 'bg-blue-500', 'bg-green-500', 'bg-red-500'];
                const color = colors[i % colors.length];
                
                return (
                  <motion.div
                    key={`confetti-${i}`}
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0,
                      opacity: 1,
                      rotate: 0
                    }}
                    animate={{
                      x: endX,
                      y: [0, endY * 0.5, endY],
                      scale: [0, 1.5, 1, 0],
                      opacity: [1, 1, 0.8, 0],
                      rotate: Math.random() * 720 - 360
                    }}
                    transition={{
                      duration: 1.5 + Math.random() * 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.3 + Math.random() * 0.3
                    }}
                    className="absolute pointer-events-none"
                  >
                    <div
                      className={`${color} ${
                        shape === 'circle' ? 'rounded-full w-3 h-3' :
                        shape === 'square' ? 'w-3 h-3' :
                        'w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-current'
                      }`}
                      style={{
                        boxShadow: '0 0 10px currentColor'
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Sparkles Floating */}
              {phase >= 2 && [...Array(20)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  initial={{ 
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400,
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{ 
                    y: [(Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400 - 100],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: 1 + i * 0.1,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2
                  }}
                  className="absolute pointer-events-none"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </motion.div>
              ))}

              {/* Main Success Card */}
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0, y: 50 }}
                animate={{ 
                  scale: phase >= 0 ? 1 : 0, 
                  rotate: 0, 
                  opacity: 1,
                  y: 0
                }}
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  delay: 0.1 
                }}
                className="relative max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mega Glow Effect */}
                <motion.div 
                  animate={{ 
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-3xl blur-3xl"
                />

                {/* Card Content */}
                <div className="relative bg-gradient-to-br from-[#1A0B2E] via-[#2D1B4E] to-[#0F0514] rounded-3xl p-8 md:p-12 border-2 border-white/20 overflow-hidden shadow-2xl">
                  {/* Animated Background Grid */}
                  <div className="absolute inset-0 opacity-20">
                    <motion.div 
                      animate={{ 
                        backgroundPosition: ['0% 0%', '100% 100%']
                      }}
                      transition={{ 
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0" 
                      style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                      }} 
                    />
                  </div>

                  {/* Light Rays */}
                  {phase >= 2 && [...Array(8)].map((_, i) => (
                    <motion.div
                      key={`ray-${i}`}
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ 
                        opacity: [0, 0.3, 0],
                        scaleY: [0, 1, 1],
                        rotate: (i * 45)
                      }}
                      transition={{ 
                        duration: 1,
                        delay: 1 + i * 0.05,
                        ease: "easeOut"
                      }}
                      className="absolute top-1/2 left-1/2 w-1 h-full bg-gradient-to-t from-amber-400/50 to-transparent origin-bottom"
                      style={{ transform: 'translate(-50%, -50%)' }}
                    />
                  ))}

                  <div className="relative z-10 text-center space-y-6">
                    {/* Trophy Icon with Epic Effects */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ 
                        scale: phase >= 1 ? 1 : 0, 
                        rotate: 0 
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 15,
                        delay: 0.4 
                      }}
                      className="relative inline-block"
                    >
                      {/* Pulsing Rings */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={`pulse-${i}`}
                          animate={{ 
                            scale: [1, 1.8, 1],
                            opacity: [0.6, 0, 0.6]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-amber-500 rounded-full blur-xl"
                        />
                      ))}
                      
                      {/* Trophy Container */}
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, -5, 5, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="relative"
                      >
                        <div className="relative w-28 h-28 mx-auto bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-600 rounded-full flex items-center justify-center shadow-2xl">
                          <Trophy className="w-14 h-14 text-white drop-shadow-lg" />
                          
                          {/* Shine effect */}
                          <motion.div
                            animate={{ 
                              x: ['-100%', '200%']
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                          />
                        </div>
                      </motion.div>

                      {/* Orbiting Icons */}
                      {phase >= 3 && [Crown, Award, Flame, Gift].map((Icon, i) => {
                        const angle = (i / 4) * Math.PI * 2;
                        const radius = 60;
                        
                        return (
                          <motion.div
                            key={`orbit-${i}`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                              scale: [0, 1, 1],
                              opacity: [0, 1, 1],
                              x: [0, Math.cos(angle) * radius],
                              y: [0, Math.sin(angle) * radius],
                              rotate: [0, 360]
                            }}
                            transition={{ 
                              duration: 0.6,
                              delay: 1.5 + i * 0.1
                            }}
                            className="absolute top-1/2 left-1/2"
                          >
                            <motion.div
                              animate={{ rotate: -360 }}
                              transition={{ 
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                            >
                              <Icon className="w-6 h-6 text-amber-400 drop-shadow-lg" />
                            </motion.div>
                          </motion.div>
                        );
                      })}

                      {/* Floating Stars Around Trophy */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={`star-float-${i}`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: [0, 1, 1, 0],
                            opacity: [0, 1, 1, 0],
                            x: [(i - 2.5) * 30, (i - 2.5) * 50],
                            y: [0, -40 - i * 8, -60]
                          }}
                          transition={{ 
                            duration: 2,
                            delay: 0.8 + i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                          className="absolute top-1/2 left-1/2"
                        >
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Success Message with Entrance */}
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.8 }}
                      animate={{ 
                        opacity: phase >= 2 ? 1 : 0, 
                        y: phase >= 2 ? 0 : 30,
                        scale: phase >= 2 ? 1 : 0.8
                      }}
                      transition={{ 
                        type: "spring",
                        delay: 0.7 
                      }}
                    >
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ 
                            duration: 0.5,
                            delay: 1.2
                          }}
                        >
                          <CheckCircle2 className="w-8 h-8 text-green-400 drop-shadow-lg" />
                        </motion.div>
                        <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                          Welcome Aboard!
                        </h2>
                      </div>
                      <p className="text-white/80 text-lg font-medium">
                        You've earned your spot on the waitlist
                      </p>
                    </motion.div>

                    {/* XP Bar with Combo Style */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: phase >= 3 ? 1 : 0, 
                        scale: phase >= 3 ? 1 : 0.8
                      }}
                      transition={{ delay: 1.2 }}
                      className="space-y-4"
                    >
                      <motion.div
                        animate={{ 
                          scale: xp > 0 ? [1, 1.1, 1] : 1
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center gap-3"
                      >
                        <Zap className="w-7 h-7 text-amber-400 drop-shadow-lg" />
                        <span className="text-5xl font-black bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent drop-shadow-lg">
                          +{xp}
                        </span>
                        <span className="text-2xl font-bold text-white/80">XP</span>
                      </motion.div>

                      {/* Progress Bar with Particles */}
                      <div className="relative">
                        <div className="relative h-5 bg-black/40 rounded-full overflow-hidden backdrop-blur-xl border-2 border-white/20 shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${xp}%` }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 rounded-full shadow-lg"
                          />
                          
                          {/* Animated shimmer */}
                          <motion.div
                            animate={{ 
                              x: ['-100%', '200%'],
                            }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity,
                              ease: "linear",
                              repeatDelay: 0.5
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                          />
                          
                          {/* Particle trail */}
                          {xp > 0 && xp < 100 && (
                            <motion.div
                              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-sm"
                              style={{ right: `${100 - xp}%` }}
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Badge Unlocked with Slide In */}
                    <motion.div
                      initial={{ opacity: 0, x: -50, rotateY: -90 }}
                      animate={{ 
                        opacity: phase >= 4 ? 1 : 0, 
                        x: phase >= 4 ? 0 : -50,
                        rotateY: phase >= 4 ? 0 : -90
                      }}
                      transition={{ 
                        type: "spring",
                        delay: 2,
                        stiffness: 200
                      }}
                      className="relative inline-block"
                    >
                      <motion.div
                        animate={{ 
                          boxShadow: [
                            '0 0 20px rgba(168, 85, 247, 0.5)',
                            '0 0 40px rgba(236, 72, 153, 0.8)',
                            '0 0 20px rgba(168, 85, 247, 0.5)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-6 py-4 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-amber-600/30 rounded-2xl border-2 border-white/30 backdrop-blur-xl"
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                          >
                            <Sparkles className="w-6 h-6 text-amber-400" />
                          </motion.div>
                          <span className="text-white font-bold text-lg">
                            Founder Badge Unlocked
                          </span>
                          <motion.div
                            animate={{ rotate: [0, -360] }}
                            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                          >
                            <Crown className="w-6 h-6 text-purple-400" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Call to Actions */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: phase >= 4 ? 1 : 0 }}
                      transition={{ delay: 2.5 }}
                      className="space-y-3 pt-4"
                    >
                      <p className="text-white/80 text-base font-medium">
                        🎉 Check your email for exclusive updates
                      </p>
                      <p className="text-white/50 text-sm">
                        Click anywhere to continue your journey
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}