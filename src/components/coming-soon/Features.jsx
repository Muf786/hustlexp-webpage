import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Bot, DollarSign } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Briefcase,
      title: 'Flexible Opportunities',
      description: 'Filter by skill, location, and pay to find work that actually fits your calendar.',
    },
    {
      icon: Bot,
      title: 'Smart Matching',
      description: 'An intelligent signal engine surfaces the most relevant gigs before anyone else sees them.',
    },
    {
      icon: DollarSign,
      title: 'Fast & Secure Payments',
      description: 'Automatic payouts with clear fees and instant status updates, built for trust.',
    }
  ];

  return (
    <section className="relative py-28 px-4 bg-[#05030a] border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40 pointer-events-none" />
      <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-violet-500/15 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-3 px-4 py-2 mb-4 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-violet-200 uppercase tracking-[0.25em]">
            Why HustleXP
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-white font-display">
            Built for a new kind of worker
          </h2>
          <p className="text-slate-300/80 text-lg max-w-2xl mx-auto">
            A polished, transparent platform connecting you with local work without the usual chaos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-white/0 to-white/5 p-8 transition-all hover:-translate-y-2 hover:border-violet-400/40"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_60%)]" />
              <div className="relative w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-violet-400/20 transition-colors">
                <feature.icon className="w-6 h-6 text-violet-200" />
              </div>

              <h3 className="relative text-xl font-semibold mb-3 text-white font-display">
                {feature.title}
              </h3>
              <p className="relative text-slate-300/80 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
