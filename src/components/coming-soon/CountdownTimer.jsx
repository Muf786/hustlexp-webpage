import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer() {
  const launchDate = new Date('2026-01-01T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative px-4 py-3 md:px-6 md:py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <motion.div
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-5xl font-black bg-gradient-to-br from-white to-purple-200 bg-clip-text text-transparent"
        >
          {String(value).padStart(2, '0')}
        </motion.div>
        <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider mt-1">
          {label}
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex gap-3 md:gap-6 justify-center items-center"
    >
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="text-2xl md:text-4xl text-purple-400 font-bold">:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="text-2xl md:text-4xl text-purple-400 font-bold">:</div>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <div className="text-2xl md:text-4xl text-purple-400 font-bold">:</div>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </motion.div>
  );
}