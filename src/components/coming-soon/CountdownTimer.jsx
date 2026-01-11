import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer() {
  // Extended to the end of January 2026
  const launchDate = new Date('2026-02-01T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [launchDate]);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_25px_rgba(15,23,42,0.6)]">
      <span className="text-3xl md:text-5xl font-semibold tracking-tight text-white font-display">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.4em] font-medium mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="flex flex-wrap justify-center items-center gap-3 md:gap-4"
    >
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </motion.div>
  );
}
