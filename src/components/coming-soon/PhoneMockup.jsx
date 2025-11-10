import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, Star, TrendingUp, Check } from 'lucide-react';

export default function PhoneMockup() {
  const [screen, setScreen] = useState(0);
  const screens = ['feed', 'xp', 'leaderboard'];

  useEffect(() => {
    const interval = setInterval(() => {
      setScreen((prev) => (prev + 1) % screens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative mx-auto w-full max-w-sm"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotateY: [-2, 2, -2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {/* Phone Frame */}
        <div className="relative mx-auto w-[280px] h-[580px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-10" />
          
          {/* Screen Content */}
          <div className="relative h-full bg-gradient-to-br from-[#0F0514] to-[#1A0B2E] overflow-hidden">
            <AnimatePresence mode="wait">
              {screen === 0 && (
                <motion.div
                  key="feed"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="p-6 pt-10 space-y-4"
                >
                  <div className="text-white">
                    <h3 className="text-lg font-bold mb-1">For You</h3>
                    <p className="text-xs text-white/60">AI-matched quests</p>
                  </div>
                  
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-sm">Quest #{i}</h4>
                          <p className="text-white/60 text-xs mt-1">Complete this task...</p>
                        </div>
                        <div className="px-2 py-1 bg-amber-500/20 rounded-lg">
                          <span className="text-amber-400 text-xs font-bold">+{20 * i} XP</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="px-2 py-1 bg-purple-500/20 rounded text-purple-400 text-xs">
                          Level {i}
                        </div>
                        <div className="px-2 py-1 bg-green-500/20 rounded text-green-400 text-xs">
                          ${10 * i}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {screen === 1 && (
                <motion.div
                  key="xp"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="p-6 pt-10 flex flex-col items-center justify-center h-full"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative mb-6"
                  >
                    <div className="absolute inset-0 bg-amber-500/50 rounded-full blur-2xl animate-pulse" />
                    <div className="relative w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center">
                      <Trophy className="w-16 h-16 text-white" />
                    </div>
                  </motion.div>

                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="text-5xl font-black text-white mb-2"
                    >
                      +150
                    </motion.div>
                    <p className="text-amber-400 font-semibold flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5" /> XP Earned!
                    </p>
                  </div>

                  <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: "40%" }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-amber-500"
                    />
                  </div>
                  <p className="text-white/60 text-sm mt-2">Level 5 → Level 6</p>

                  {/* Confetti */}
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0, opacity: 1 }}
                      animate={{
                        y: [0, -100, -200],
                        x: [(i - 5) * 10, (i - 5) * 30],
                        opacity: [1, 1, 0],
                        rotate: [0, 360]
                      }}
                      transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                      className="absolute top-1/2 left-1/2"
                    >
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {screen === 2 && (
                <motion.div
                  key="leaderboard"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="p-6 pt-10 space-y-4"
                >
                  <div className="text-white mb-4">
                    <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-400" />
                      Leaderboard
                    </h3>
                    <p className="text-xs text-white/60">Top hustlers this week</p>
                  </div>
                  
                  {[
                    { name: 'Alex M.', xp: '12,450', rank: 1, color: 'from-amber-400 to-yellow-500' },
                    { name: 'Jordan K.', xp: '11,230', rank: 2, color: 'from-gray-300 to-gray-400' },
                    { name: 'Sam T.', xp: '10,890', rank: 3, color: 'from-orange-400 to-orange-600' },
                    { name: 'You', xp: '8,450', rank: 7, color: 'from-purple-500 to-pink-500' }
                  ].map((user, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-4 rounded-2xl border ${
                        user.rank === 7 
                          ? 'bg-purple-500/20 border-purple-500/50' 
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center font-black text-white text-sm`}>
                          {user.rank}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold text-sm">{user.name}</p>
                          <p className="text-white/60 text-xs flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> {user.xp} XP
                          </p>
                        </div>
                        {user.rank <= 3 && (
                          <Trophy className={`w-5 h-5 ${
                            user.rank === 1 ? 'text-amber-400' :
                            user.rank === 2 ? 'text-gray-400' :
                            'text-orange-400'
                          }`} />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-purple-600/20 via-pink-600/20 to-amber-600/20 opacity-50 pointer-events-none" />
        </div>

        {/* Phone Shadow */}
        <div className="absolute inset-0 rounded-[3rem] shadow-2xl shadow-purple-900/50 pointer-events-none" />
      </motion.div>

      {/* Floating indicators */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-8 top-20 px-4 py-2 bg-green-500/20 backdrop-blur-xl border border-green-500/30 rounded-full"
      >
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm font-semibold">Quest Complete!</span>
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -left-8 bottom-32 px-4 py-2 bg-amber-500/20 backdrop-blur-xl border border-amber-500/30 rounded-full"
      >
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-amber-400 text-sm font-semibold">+50 XP</span>
        </div>
      </motion.div>
    </motion.div>
  );
}