import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, RotateCw, X, ShieldAlert } from 'lucide-react';
import { sound } from '../audioEngine';

export const RotatePhonePrompt: React.FC = () => {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isMobileWidth = window.innerWidth <= 860;
      setIsPortraitMobile(isPortrait && isMobileWidth);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  const handleDismiss = () => {
    sound.playTechClick(1.0);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {isPortraitMobile && !dismissed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center p-6 text-center select-none font-mono"
        >
          {/* Scanlines & Vignette */}
          <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
          <div className="absolute inset-0 vignette opacity-80 pointer-events-none" />

          {/* Dismiss button in corner */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white border border-white/20 bg-neutral-900 rounded"
            title="Dismiss and continue in portrait"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Animated Rotating Smartphone Graphic */}
          <div className="relative mb-8 flex items-center justify-center">
            {/* Outer pulsating radar ring */}
            <div className="absolute w-32 h-32 rounded-full border-2 border-inkred/40 animate-ping opacity-30" />

            <motion.div
              animate={{
                rotate: [0, 0, 90, 90, 0],
                scale: [1, 1, 1.08, 1, 1],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative p-6 bg-neutral-950 border-2 border-inkred rounded-2xl shadow-[0_0_35px_rgba(229,9,20,0.6)]"
            >
              <Smartphone className="w-16 h-16 text-white" />
              <RotateCw className="absolute -bottom-1 -right-1 w-6 h-6 text-inkred animate-spin" style={{ animationDuration: '4s' }} />
            </motion.div>
          </div>

          {/* Header Warning */}
          <div className="flex items-center gap-2 mb-3 px-3 py-1 bg-inkred/20 border border-inkred text-inkred text-xs tracking-widest uppercase font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>OPTIMAL DISPLAY PROTOCOL</span>
          </div>

          <h2 className="font-stencil text-2xl sm:text-3xl text-white tracking-widest uppercase mb-2">
            ROTATE PHONE TO LANDSCAPE
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-xs leading-relaxed mb-8">
            The detective crime board, surveillance feeds, and crime dossiers are designed for widescreen landscape orientation.
          </p>

          {/* Action Button to bypass if auto-rotate is locked */}
          <button
            onClick={handleDismiss}
            onMouseEnter={() => sound.playHoverTick()}
            className="px-6 py-2.5 bg-neutral-900/90 hover:bg-neutral-800 border border-white/30 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-150"
          >
            [ PROCEED IN PORTRAIT ANYWAY ]
          </button>

          <span className="font-mono text-[10px] text-neutral-500 mt-4 uppercase">
            Auto-detects device rotation
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
