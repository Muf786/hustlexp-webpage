import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Bot, DollarSign, Zap, Shield, Clock } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export default function Features() {
  const features = [
    {
      icon: Briefcase,
      title: 'Flexible Opportunities',
      description: 'Filter by skill, location, and pay to find work that actually fits your calendar.',
      area: 'md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]',
    },
    {
      icon: Bot,
      title: 'Smart Matching',
      description: 'An intelligent signal engine surfaces the most relevant gigs before anyone else sees them.',
      area: 'md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/9]',
    },
    {
      icon: DollarSign,
      title: 'Fast & Secure Payments',
      description: 'Automatic payouts with clear fees and instant status updates, built for trust.',
      area: 'md:[grid-area:2/1/3/7] xl:[grid-area:1/9/2/13]',
    },
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Accept gigs with one tap. No back-and-forth negotiations or endless messaging.',
      area: 'md:[grid-area:2/7/3/13] xl:[grid-area:2/1/3/5]',
    },
    {
      icon: Shield,
      title: 'Verified Workers',
      description: 'Every hustler is identity-verified and rated, so you know who you\'re working with.',
      area: 'md:[grid-area:3/1/4/7] xl:[grid-area:2/5/3/9]',
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Track task progress, get notifications, and communicate seamlessly in-app.',
      area: 'md:[grid-area:3/7/4/13] xl:[grid-area:2/9/3/13]',
    },
  ];

  return (
    <section className="relative py-28 px-4 bg-[#05030a] border-t border-white/10 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40 pointer-events-none" />
      <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-violet-500/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[120px] pointer-events-none" />

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

        {/* Bento Grid */}
        <ul className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {features.map((feature, index) => (
            <motion.li
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`min-h-[14rem] list-none ${feature.area}`}
            >
              <div className="group relative h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-2 transition-all hover:border-violet-400/30">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-[#08060e] p-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors border border-white/5">
                    <feature.icon className="w-6 h-6 text-violet-300" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white font-display">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
