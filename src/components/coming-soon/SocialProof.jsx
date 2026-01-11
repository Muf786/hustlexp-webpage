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
      gradient: "from-cyan-400 to-sky-500"
    },
    {
      quote: "Finally, a way to find local work without jumping through hoops. Payment processing is super fast too.",
      author: "Jordan K.",
      role: "Local Contractor",
      initials: "JK",
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      quote: "I've tried every gig app out there. HustleXP is the only one that actually feels professional and transparent.",
      author: "Sam T.",
      role: "Event Specialist",
      initials: "ST",
      gradient: "from-lime-400 to-emerald-500"
    }
  ];

  return (
    <section className="relative py-28 px-4 bg-[#05060a] border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.12),transparent_55%)] pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-[420px] h-[420px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200 mb-4">
            Trusted by early adopters
          </p>
          <p className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-3 font-display">
            Join <span className="text-emerald-300">{waitlistCount}+</span> professionals in Seattle
          </p>
          <p className="text-slate-300/80 text-lg">
            Be the first to access the network.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/[0.04] backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all hover:bg-white/[0.08]"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-lg text-slate-200 mb-8 leading-relaxed font-light">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                  {testimonial.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <CheckCircle2 className="w-4 h-4 text-cyan-300 flex-shrink-0" />
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
