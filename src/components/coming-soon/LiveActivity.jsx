import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin } from 'lucide-react';

const activities = [
  { name: 'Alex M.', action: 'completed a quest', location: 'Seattle, WA', xp: 50 },
  { name: 'Jordan K.', action: 'joined the waitlist', location: 'Bellevue, WA', xp: 25 },
  { name: 'Sam T.', action: 'leveled up to 12', location: 'Tacoma, WA', xp: 100 },
  { name: 'Morgan P.', action: 'earned Founder Badge', location: 'Redmond, WA', xp: 75 },
  { name: 'Casey R.', action: 'completed 5 quests', location: 'Kirkland, WA', xp: 150 },
];

export default function LiveActivity() {
  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-20 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentActivity}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                {activities[currentActivity].name} <span className="text-white/60">{activities[currentActivity].action}</span>
              </p>
              <p className="text-white/50 text-xs flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {activities[currentActivity].location}
              </p>
            </div>
            <div className="px-3 py-1 bg-amber-500/20 rounded-lg">
              <span className="text-amber-400 text-xs font-bold">+{activities[currentActivity].xp} XP</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}