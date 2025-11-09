import React from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, Upload, TrendingUp } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Browse AI-Matched Tasks',
      description: 'Your personalized "For You" feed of gigs tailored to your skills and interests.',
      color: 'from-purple-600 to-blue-600'
    },
    {
      number: '02',
      icon: MessageCircle,
      title: 'Accept & Chat',
      description: 'Connect instantly with task posters. AI-powered smart replies help you seal the deal.',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      number: '03',
      icon: Upload,
      title: 'Complete & Upload Proof',
      description: 'Finish the quest, upload your work, and watch your XP burst with satisfaction.',
      color: 'from-cyan-600 to-green-600'
    },
    {
      number: '04',
      icon: TrendingUp,
      title: 'Level Up',
      description: 'Climb the leaderboards, unlock badges, and become a legendary hustler.',
      color: 'from-green-600 to-amber-600'
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
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Your Journey
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            From quest discovery to legendary status
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connecting Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
              )}

              {/* Card */}
              <div className="relative h-full">
                {/* Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  {/* Number Badge */}
                  <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center font-black text-white text-lg shadow-lg`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${step.color} mb-6`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 text-lg">
            Ready to start your adventure?{' '}
            <a href="#hero" className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 transition-colors">
              Join the waitlist
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}