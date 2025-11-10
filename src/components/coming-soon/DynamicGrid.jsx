import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function DynamicGrid({ trigger = 0 }) {
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (trigger > 0) {
      setPulseKey(prev => prev + 1);
    }
  }, [trigger]);

  return (
    <>
      {/* Base Grid */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Seattle Coordinates Glow */}
      <motion.div
        key={`pulse-${pulseKey}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0, 0.8, 0],
          scale: [0.5, 2, 3]
        }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-amber-600/50 blur-[100px]" />
      </motion.div>

      {/* Expanding Rings on Trigger */}
      {pulseKey > 0 && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`ring-${pulseKey}-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.8, 0.4, 0],
                scale: [0, 1.5, 3]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.2,
                ease: "easeOut"
              }}
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="w-[400px] h-[400px] rounded-full border-2 border-amber-400/50" />
            </motion.div>
          ))}
        </>
      )}
    </>
  );
}