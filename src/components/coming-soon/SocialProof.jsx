import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Star, CheckCircle2 } from 'lucide-react';

export default function SocialProof() {
  const [waitlistCount, setWaitlistCount] = useState(0);

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

  const testimonials = [
    {
      quote: "Exactly the platform Seattle needed. The seamless matching system saves me hours of searching every week.",
      author: "Alex M.",
      role: "Freelance Designer",
      initials: "AM",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      quote: "Finally, a way to find local work without jumping through hoops. Payment processing is super fast too.",
      author: "Jordan K.",
      role: "Local Contractor",
      initials: "JK",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      quote: "I've tried every gig app out there. HustleXP is the only one that actually feels professional and transparent.",
      author: "Sam T.",
      role: "Event Specialist",
      initials: "ST",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="relative py-24 px-4 bg-[#020617] border-t border-white/5 overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Counter */}
        <div className="text-center mb-20">
          <p className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">
            Join <span className="text-indigo-400">{waitlistCount}+</span> professionals in Seattle
          </p>
          <p className="text-slate-400 text-lg">
            Be the first to access the network.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/[0.03] backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all hover:bg-white/[0.05]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg text-slate-200 mb-8 leading-relaxed font-light">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                  {testimonial.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  </div>
                  <p className="text-slate-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}