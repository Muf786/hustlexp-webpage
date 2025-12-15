import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer() {
  const launchDate = new Date('2026-01-01T00:00:00').getTime();
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
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <span className="text-3xl md:text-5xl font-light tracking-tight text-white mb-2">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs text-white/40 uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="flex justify-center items-start mb-10"
    >
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-3xl md:text-5xl font-light text-white/20 -mt-1">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-3xl md:text-5xl font-light text-white/20 -mt-1">:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <span className="text-3xl md:text-5xl font-light text-white/20 -mt-1">:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </motion.div>
  );
}