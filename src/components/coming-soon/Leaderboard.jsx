
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown, TrendingUp, Zap } from 'lucide-react';
import { db } from '@/firebase/config';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export default function Leaderboard() {
  const [topReferrers, setTopReferrers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const waitlistRef = collection(db, 'waitlist');
        const q = query(waitlistRef, orderBy('referral_count', 'desc'), limit(10));
        const snapshot = await getDocs(q);
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTopReferrers(users.filter(user => (user.referral_count || 0) > 0).slice(0, 5));
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
      setIsLoading(false);
    };
    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return { Icon: Trophy, color: 'text-amber-400' };
      case 2: return { Icon: Medal, color: 'text-gray-400' };
      case 3: return { Icon: Award, color: 'text-orange-400' };
      default: return { Icon: Crown, color: 'text-purple-400' };
    }
  };

  const getRankGradient = (rank) => {
    switch (rank) {
      case 1: return 'from-amber-400 to-yellow-600';
      case 2: return 'from-gray-400 to-gray-600';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  if (isLoading || topReferrers.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0514] via-[#1A0B2E] to-[#0F0514]" />

      {/* XP Heatmap Waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 0.15, 0],
              y: [100, -100],
            }}
            transition={{
              duration: 8,
              delay: i * 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at ${50 + i * 10}% ${50 + i * 5}%, rgba(251, 191, 36, 0.4) 0%, transparent 50%)`
            }}
          />
        ))}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/20 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 mb-6 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 backdrop-blur-xl border border-white/10">
            <TrendingUp className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="text-white/90 font-medium">Top Referrers</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Leaderboard
            </span>
          </h2>
          <p className="text-lg text-white/60">
            Hustlers climbing to the top through referrals
          </p>
        </motion.div>

        <div className="space-y-4">
          {topReferrers.map((user, index) => {
            const rank = index + 1;
            const { Icon, color } = getRankIcon(rank);
            const gradient = getRankGradient(rank);

            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity`} />

                {/* Card */}
                <div className={`relative p-6 rounded-2xl backdrop-blur-xl border transition-all ${rank <= 3
                    ? 'bg-white/10 border-white/20'
                    : 'bg-white/5 border-white/10'
                  }`}>
                  <div className="flex items-center gap-4">
                    {/* Rank Badge */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-black text-white text-xl shadow-lg ${rank === 1 ? 'ring-4 ring-amber-400/50' : ''
                        }`}
                    >
                      {rank}
                    </motion.div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white font-bold text-lg">
                          {user.name || user.email.split('@')[0]}
                        </p>
                        {rank <= 3 && (
                          <Icon className={`w-5 h-5 ${color}`} />
                        )}
                      </div>
                      <p className="text-white/60 text-sm flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        {user.referral_count} {user.referral_count === 1 ? 'referral' : 'referrals'}
                      </p>
                    </div>

                    {/* XP Badge */}
                    <div className="text-right">
                      <div className="px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-xl border border-amber-500/30">
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4 text-amber-400" />
                          <span className="text-amber-400 font-bold">{user.xp || 0}</span>
                        </div>
                        <p className="text-white/50 text-xs">XP</p>
                      </div>
                    </div>
                  </div>

                  {/* Rank 1 Special Effects */}
                  {rank === 1 && (
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2 -right-2"
                    >
                      <Crown className="w-8 h-8 text-amber-400 drop-shadow-lg" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-white/70">
            Want to see your name here?{' '}
            <a href="#hero" className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4">
              Join the waitlist and start referring
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
