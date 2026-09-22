import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../audioEngine';
import { ShieldAlert, Crosshair } from 'lucide-react';

interface StageLockedProps {
  onUnlock: () => void;
}

export const StageLocked: React.FC<StageLockedProps> = ({ onUnlock }) => {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleStart = () => {
    sound.getContext(); // unlock audio context
    sound.playTechClick(1.2);
    sound.playGlitchBurst();
    setIsUnlocking(true);

    setTimeout(() => {
      onUnlock();
    }, 600);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-noir-950 flex items-center justify-center">
      {/* Blurred background image */}
      <motion.div
        animate={{
          filter: isUnlocking ? 'blur(0px) brightness(1.2)' : 'blur(48px) brightness(0.6)',
          scale: isUnlocking ? 1.05 : 1.15,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/crime_scene.jpg)' }}
      />

      {/* Dark overlay */}
      <motion.div 
        animate={{ opacity: isUnlocking ? 0.3 : 0.82 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-black"
      />

      {/* Noir Scanlines and Vignette */}
      <div className="absolute inset-0 scanlines" />
      <div className="absolute inset-0 vignette" />

      {/* Top and Bottom stylized hazard tape borders */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-inkred via-inkred-glow to-inkred shadow-[0_0_15px_rgba(229,9,20,0.8)]" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-inkred via-inkred-glow to-inkred shadow-[0_0_15px_rgba(229,9,20,0.8)]" />

      {/* Top Corner Technical HUD tags */}
      <div className="absolute top-6 left-8 font-mono text-xs text-neutral-500 tracking-widest flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-inkred animate-ping" />
        CASE #804 // CLASSIFIED POLICE ARCHIVE
      </div>
      <div className="absolute top-6 right-8 font-mono text-xs text-neutral-500 tracking-widest flex items-center gap-2">
        <ShieldAlert className="w-3.5 h-3.5 text-inkred" />
        RESTRICTED LEVEL 4 CLEARANCE
      </div>

      {/* Center UI */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-2xl"
      >
        {/* Pulsing warning indicator */}
        <div className="flex items-center gap-2 mb-4 px-3 py-1 bg-inkred/10 border border-inkred/40 text-inkred font-mono text-xs tracking-widest uppercase">
          <Crosshair className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>INCIDENT REPORT FILED // 22:14 HRS</span>
        </div>

        {/* Pulsing Subtitle */}
        <motion.p
          animate={{
            opacity: [0.7, 1, 0.7],
            textShadow: [
              '0 0 10px rgba(229,9,20,0.3)',
              '0 0 25px rgba(229,9,20,0.8)',
              '0 0 10px rgba(229,9,20,0.3)',
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="font-mono text-lg md:text-xl text-stark/90 tracking-widest uppercase mb-10 font-semibold"
        >
          A grisly crime has taken place.
        </motion.p>

        {/* Primary Action Button */}
        <button
          onClick={handleStart}
          onMouseEnter={() => {
            setIsHovered(true);
            sound.playHoverTick();
          }}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative group px-10 py-5 uppercase font-stencil text-2xl md:text-3xl tracking-[0.25em] 
            transition-all duration-200 outline-none
            bg-transparent border-4 text-white
            ${isHovered 
              ? 'border-inkred-glow text-white shadow-[0_0_35px_rgba(255,31,45,0.8),inset_0_0_20px_rgba(229,9,20,0.4)] translate-y-[-2px]' 
              : 'border-white text-stark hover:border-inkred'
            }
          `}
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)',
          }}
        >
          {/* Button Background sweep on hover */}
          <span className={`absolute inset-0 bg-inkred transition-transform duration-200 origin-left ${isHovered ? 'scale-x-100 opacity-90' : 'scale-x-0 opacity-0'}`} />
          
          {/* Button Text with subtle glitch */}
          <span className="relative z-10 font-bold flex items-center justify-center gap-3">
            ARE YOU READY FOR THE GAME?
          </span>

          {/* Corner accents */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-inkred" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-inkred" />
        </button>

        {/* Footnote instruction */}
        <p className="font-mono text-xs text-neutral-500 tracking-wider mt-8 uppercase">
          [ Audio System Ready • Click to Initialize Protocol ]
        </p>
      </motion.div>
    </div>
  );
};
