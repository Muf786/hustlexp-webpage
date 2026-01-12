import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Layers, Orbit, ShieldCheck, Sparkles, Workflow, Zap } from 'lucide-react';

export default function ImmersiveRail() {
  const reduceMotion = useReducedMotion();
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start start', 'end start']
  });

  const railX = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const railRotate = useTransform(scrollYProgress, [0, 1], ['0deg', '-3deg']);
  const railScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const cards = [
    {
      icon: Sparkles,
      title: 'Signature Jobs',
      description: 'Curated local work with clear scopes and premium payouts.',
      accent: 'from-violet-400/40 to-fuchsia-400/40'
    },
    {
      icon: Orbit,
      title: 'Signal Engine',
      description: 'A scoring layer that surfaces the best-fit gigs first.',
      accent: 'from-indigo-400/40 to-violet-400/40'
    },
    {
      icon: Workflow,
      title: 'Live Ops',
      description: 'Track tasks in motion with real-time status visibility.',
      accent: 'from-fuchsia-400/40 to-purple-400/40'
    },
    {
      icon: ShieldCheck,
      title: 'Trust Layer',
      description: 'Verified professionals, protected payouts, fewer disputes.',
      accent: 'from-violet-400/40 to-indigo-400/40'
    },
    {
      icon: Layers,
      title: 'Layered Profiles',
      description: 'Showcase skills, past work, and reliability in one view.',
      accent: 'from-purple-400/40 to-fuchsia-400/40'
    },
    {
      icon: Zap,
      title: 'Fast Launch',
      description: 'From match to payout without the gig-platform friction.',
      accent: 'from-indigo-400/40 to-violet-400/40'
    }
  ];

  return (
    <section
      ref={railRef}
      className="relative h-[220vh] bg-[#05030a] border-t border-white/10 overflow-hidden"
      style={{ perspective: '1400px' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.2),transparent_55%),radial-gradient(circle_at_bottom,rgba(79,70,229,0.16),transparent_50%)]" />
      <div
        className="absolute -bottom-20 left-1/2 h-[520px] w-[520px] -translate-x-1/2 opacity-60"
        style={{ transform: 'rotateX(70deg) rotateZ(45deg)' }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      <motion.div
        className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-fuchsia-500/25 blur-[140px]"
        animate={reduceMotion ? undefined : { y: [0, 30, -10], x: [0, -20, 10] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
        }
      />
      <motion.div
        className="absolute -bottom-40 left-[-10%] h-96 w-96 rounded-full bg-indigo-500/25 blur-[160px]"
        animate={reduceMotion ? undefined : { y: [0, -20, 12], x: [0, 16, -8] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 22, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
        }
      />

      <div className="sticky top-0 flex h-screen items-center">
        <div className="absolute left-8 top-20 hidden max-w-xs text-left lg:block">
          <p className="text-xs uppercase tracking-[0.35em] text-violet-200">Experience</p>
          <h2 className="mt-4 text-3xl font-semibold text-white font-display">
            The marketplace, rendered in motion.
          </h2>
          <p className="mt-4 text-sm text-white/60">
            Scroll to move through the system architecture and see the platform layers unfold.
          </p>
        </div>

        <motion.div
          className="flex gap-8 px-8 lg:px-24"
          style={
            reduceMotion
              ? undefined
              : {
                  x: railX,
                  rotateZ: railRotate,
                  scale: railScale,
                  transformOrigin: 'center'
                }
          }
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                className="relative w-[280px] md:w-[340px] rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                style={{ transformStyle: 'preserve-3d' }}
                animate={
                  reduceMotion
                    ? undefined
                    : { rotateY: [-6, 6, -6], rotateX: [2, -2, 2] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 12 + index, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                }
              >
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.accent} opacity-40`}
                  style={{ transform: 'translateZ(-20px)' }}
                />
                <div className="relative z-10">
                  <motion.div
                    className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-violet-200"
                    animate={reduceMotion ? undefined : { y: [0, -6, 0], rotate: [0, 8, 0] }}
                    transition={
                      reduceMotion
                        ? undefined
                        : { duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                    }
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white font-display">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/65">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
