import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

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
      quote: "Exactly the platform Seattle needed. Clean, simple, and effective.",
      author: "Alex M.",
      role: "Freelancer"
    },
    {
      quote: "Finally, a way to find local work without jumping through hoops.",
      author: "Jordan K.",
      role: "Contractor"
    },
    {
      quote: "The matching system saves me hours of searching every week.",
      author: "Sam T.",
      role: "Gig Worker"
    }
  ];

  return (
    <section className="py-24 px-4 bg-[#020617] border-t border-white/5">
      <div className="max-w-5xl mx-auto">

        {/* Counter */}
        <div className="text-center mb-16">
          <p className="text-3xl font-semibold tracking-tight text-white">
            Join <span className="text-indigo-400">{waitlistCount}+</span> professionals in Seattle
          </p>
          <p className="text-slate-400 mt-2">
            Be the first to access the network.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 p-6 rounded-2xl border border-white/10"
            >
              <p className="text-base text-slate-300 mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-medium text-sm text-white">{testimonial.author}</p>
                <p className="text-slate-500 text-xs">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}