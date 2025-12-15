import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessAnimation({ isVisible, onClose, onComplete }) {
  useEffect(() => {
    if (isVisible && onComplete) {
      // Automatically proceed after a short delay
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-card text-card-foreground border w-full max-w-sm p-6 rounded-lg shadow-lg text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">You're on the list</h2>
            <p className="text-muted-foreground">
              We'll notify you as soon as we launch in Seattle.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
