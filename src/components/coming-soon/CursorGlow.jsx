import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('button') || target.closest('a') || target.closest('input')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="w-[500px] h-[500px] bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-amber-600/20 rounded-full blur-3xl" />
      </motion.div>
      
      <motion.div
        className="pointer-events-none fixed z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
      >
        <div className="w-5 h-5 border-2 border-purple-500 rounded-full mix-blend-difference" />
      </motion.div>
    </>
  );
}