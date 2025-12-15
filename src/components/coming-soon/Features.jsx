import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Bot, DollarSign } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Briefcase,
      title: 'Flexible Opportunities',
      description: 'Access a wide variety of tasks and gigs in your area. filter by skill, location, and pay.',
    },
    {
      icon: Bot,
      title: 'Smart Matching',
      description: 'Our system learns your preferences and skills to recommend the best opportunities for you.',
    },
    {
      icon: DollarSign,
      title: 'Fast & Secure Payments',
      description: 'Get paid directly to your bank account or debit card. No hidden fees or delays.',
    }
  ];

  return (
    <section className="relative py-24 px-4 bg-[#020617] border-t border-white/5 overflow-hidden">

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Radial Gradient for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300">
            Why HustleXP?
          </span>
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
            Built for the modern workforce
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A simple, transparent platform connecting you with local work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                <feature.icon className="w-6 h-6 text-indigo-400" />
              </div>

              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}