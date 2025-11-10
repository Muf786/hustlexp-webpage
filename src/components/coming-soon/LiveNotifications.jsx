import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, MapPin, TrendingUp } from 'lucide-react';

const NOTIFICATIONS = [
  { name: 'Alex M.', action: 'joined the waitlist', location: 'Seattle, WA', icon: Zap },
  { name: 'Jordan K.', action: 'earned Founder Badge', location: 'Bellevue, WA', icon: Zap },
  { name: 'Sam T.', action: 'referred 3 friends', location: 'Tacoma, WA', icon: TrendingUp },
  { name: 'Morgan P.', action: 'joined the waitlist', location: 'Redmond, WA', icon: Zap },
  { name: 'Casey R.', action: 'unlocked Bronze tier', location: 'Kirkland, WA', icon: TrendingUp },
  { name: 'Riley D.', action: 'joined the waitlist', location: 'Everett, WA', icon: Zap },
  { name: 'Quinn B.', action: 'earned +100 XP', location: 'Spokane, WA', icon: Zap },
  { name: 'Taylor M.', action: 'joined the waitlist', location: 'Vancouver, WA', icon: Zap },
];

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [notificationId, setNotificationId] = useState(0);

  useEffect(() => {
    const showNotification = () => {
      const randomNotification = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
      const id = notificationId + 1;
      
      setNotifications(prev => [...prev, { ...randomNotification, id }]);
      setNotificationId(id);

      // Remove notification after 4 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 4000);
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showNotification, 3000);

    // Show new notifications every 8-12 seconds
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 4000 + 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [notificationId]);

  return (
    <div className="fixed bottom-20 left-4 z-40 space-y-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="relative group"
          >
            {/* Glow */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-xl"
            />
            
            {/* Notification Card */}
            <div className="relative px-4 py-3 bg-[#1A0B2E]/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl min-w-[280px]">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                >
                  <notification.icon className="w-5 h-5 text-white" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">
                    <span className="text-amber-400">{notification.name}</span>{' '}
                    {notification.action}
                  </p>
                  <p className="text-white/60 text-xs flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    {notification.location}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}