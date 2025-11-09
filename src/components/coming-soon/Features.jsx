import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Bot, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Gamepad2,
      title: 'Complete Quests, Earn XP',
      description: 'Turn everyday tasks into an RPG. Level up, unlock badges, and climb leaderboards.',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: Bot,
      title: 'AI Finds Your Perfect Match',
      description: 'Smart matching that connects you with tasks tailored to your skills and vibe.',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Zap,
      title: 'Get Paid, Get Rewards',
      description: 'Instant payouts, XP multipliers, streak bonuses. Your hustle, gamified.',
      gradient: 'from-amber-600 to-orange-600'
    }
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0514] via-[#1A0B2E] to-[#0F0514]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Your gig platform reimagined as an epic adventure
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>

                {/* Gradient Border Animation */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ padding: '2px', zIndex: -1 }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}