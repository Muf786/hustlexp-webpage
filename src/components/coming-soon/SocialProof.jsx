import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Flame } from 'lucide-react';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import LiveActivity from './LiveActivity';

export default function SocialProof() {
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const waitlistRef = collection(db, 'waitlist');
        const snapshot = await getDocs(waitlistRef);
        setWaitlistCount(snapshot.size + 200);
      } catch (error) {
        setWaitlistCount(200);
      }
    };
    fetchCount();
  }, []);

  useEffect(() => {
    if (waitlistCount > 0) {
      let current = 0;
      const increment = Math.ceil(waitlistCount / 50);
      const timer = setInterval(() => {
        current += increment;
        if (current >= waitlistCount) {
          setDisplayCount(waitlistCount);
          clearInterval(timer);
        } else {
          setDisplayCount(current);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [waitlistCount]);

  const testimonials = [
    {
      quote: "This is exactly what Seattle needs. Can't wait to level up my side hustle!",
      author: "Alex M.",
      role: "Early Adopter",
      avatar: "from-purple-500 to-pink-500"
    },
    {
      quote: "Finally, a gig platform that doesn't feel like work. The gamification is genius.",
      author: "Jordan K.",
      role: "Beta Tester",
      avatar: "from-blue-500 to-cyan-500"
    },
    {
      quote: "AI matching + RPG mechanics? I'm all in. This is the future of gig work.",
      author: "Sam T.",
      role: "Founder's Circle",
      avatar: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0B2E] via-[#0F0514] to-[#1A0B2E]" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Live Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <LiveActivity />
        </motion.div>

        {/* Counter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 mb-6 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-white/10">
            <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
            <span className="text-white/90 font-medium">Waitlist Growing Fast</span>
          </div>

          <motion.h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Join{' '}
            <motion.span
              key={displayCount}
              initial={{ scale: 1.2, color: '#FBBF24' }}
              animate={{ scale: 1, color: '#FFFFFF' }}
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent"
            >
              {displayCount}+
            </motion.span>
            {' '}Seattle Hustlers
          </motion.h2>
          <p className="text-lg text-white/60">
            on the waitlist for launch day
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/50 to-pink-600/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />

              {/* Card */}
              <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 h-full">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + i * 0.05 }}
                    >
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/80 mb-4 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.avatar} flex items-center justify-center`}>
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-white/50 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}