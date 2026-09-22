import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../audioEngine';
import { ArrowLeft, BatteryCharging, Maximize2, Minimize2, Disc, Eye } from 'lucide-react';

interface StageCamcorderProps {
  onReturn: () => void;
}

export const StageCamcorder: React.FC<StageCamcorderProps> = ({ onReturn }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [timestamp, setTimestamp] = useState('OCT 31 2025 23:14:02');
  const [isHoveredScreen, setIsHoveredScreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Live ticking camcorder clock with past year vintage date
  useEffect(() => {
    let seconds = 2;
    const interval = setInterval(() => {
      seconds++;
      const secStr = String(seconds % 60).padStart(2, '0');
      const minStr = String(Math.floor(seconds / 60) + 14).padStart(2, '0');
      setTimestamp(`OCT 31 2025 23:${minStr}:${secStr}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update video volume and play state when switching between preview and fullscreen
  useEffect(() => {
    if (videoRef.current) {
      if (isFullScreen) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {
          // Autoplay fallback
          if (videoRef.current) videoRef.current.muted = true;
        });
      } else {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isFullScreen]);

  const handleScreenClick = () => {
    if (!isFullScreen) {
      sound.playTechClick(1.3);
      sound.playGlitchBurst();
      setIsFullScreen(true);
    }
  };

  const handleReturnClick = () => {
    sound.playTechClick(0.9);
    if (isFullScreen) {
      // Step 1: reverse zoom animation back to handheld camcorder
      setIsFullScreen(false);
    } else {
      // Step 2: return to the detective clueboard
      onReturn();
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-black font-mono">
      {/* 1. POV BACKGROUND: DIM, ABANDONED ROOM */}
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-[0.22] contrast-150 filter blur-[2px]"
        style={{ backgroundImage: "url('/assets/crime_scene.jpg')" }}
      />
      {/* Flashlight beam vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/60 to-black pointer-events-none" />

      {/* 2. FIXED RETURN BUTTON (Visible both in handheld and fullscreen mode) */}
      <button
        onClick={handleReturnClick}
        onMouseEnter={() => sound.playHoverTick()}
        className={`
          fixed top-6 left-6 z-50 flex items-center gap-2.5 px-4 py-2.5
          bg-noir-900/90 border-2 border-white/80 text-stark
          hover:border-inkred hover:bg-inkred hover:text-white
          font-stencil text-sm sm:text-base tracking-[0.2em] uppercase
          shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(229,9,20,0.7)]
          transition-all duration-150 outline-none
        `}
        style={{
          clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
        }}
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
        <span>{isFullScreen ? 'MINIMIZE CAMCORDER' : 'RETURN TO CLUEBOARD'}</span>
      </button>

      {/* Top right indicator */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-3 bg-black/70 px-3 py-1.5 border border-white/10 text-xs text-neutral-400 font-mono tracking-widest uppercase">
        <Disc className="w-3.5 h-3.5 text-inkred animate-spin" style={{ animationDuration: '4s' }} />
        <span>ARCHIVE TAPE: 2025 INCIDENT</span>
      </div>

      {/* 3. HANDHELD CAMCORDER BODY (Hidden or scaled down when in Fullscreen) */}
      <motion.div
        animate={{
          opacity: isFullScreen ? 0 : 1,
          scale: isFullScreen ? 0.95 : 1,
          pointerEvents: isFullScreen ? 'none' : 'auto',
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 flex items-center justify-center p-4 sm:p-10 pointer-events-none"
      >
        {/* Handheld Camcorder Realistic Chassis */}
        <div className="relative pointer-events-auto flex items-center bg-[#151518] border-4 border-[#2c2c34] rounded-2xl p-4 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.95),inset_0_2px_4px_rgba(255,255,255,0.1)] max-w-4xl w-full">
          
          {/* Camcorder Left Hinged Swivel Frame */}
          <div className="relative flex-1 bg-black rounded-lg p-2 sm:p-3 border-2 border-neutral-700 shadow-inner">
            {/* The Placeholder where layoutId connects */}
            {!isFullScreen && (
              <motion.div
                layoutId="camcorder-lcd-screen"
                onClick={handleScreenClick}
                onMouseEnter={() => {
                  setIsHoveredScreen(true);
                  sound.playHoverTick();
                }}
                onMouseLeave={() => setIsHoveredScreen(false)}
                className={`
                  relative w-full aspect-video bg-noir-950 overflow-hidden rounded cursor-pointer group
                  border-2 ${isHoveredScreen ? 'border-[#00ff66]' : 'border-neutral-600'}
                  shadow-[0_0_20px_rgba(0,0,0,0.8)]
                `}
                transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              >
                {/* Looping Tape Video */}
                <video
                  ref={videoRef}
                  src="/assets/scene1.mp4"
                  autoPlay
                  loop
                  playsInline
                  muted
                  className="w-full h-full object-cover filter contrast-125 brightness-90 saturate-50"
                />

                {/* Night-Vision Phosphor Tint & CRT Scanlines */}
                <div className="absolute inset-0 bg-[#00ff66]/10 mix-blend-color pointer-events-none" />
                <div className="absolute inset-0 scanlines opacity-60 pointer-events-none" />
                <div className="absolute inset-0 vignette opacity-75 pointer-events-none" />

                {/* Camcorder HUD Overlay */}
                <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between pointer-events-none text-[10px] sm:text-xs">
                  {/* Top Row: REC & Battery */}
                  <div className="flex items-center justify-between text-white font-mono font-bold tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_#ff0000]" />
                      <span className="text-red-500 font-extrabold">REC</span>
                      <span className="text-neutral-400 text-[10px]">SP 0:42:19</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-neutral-300">
                      <BatteryCharging className="w-3.5 h-3.5 text-[#00ff66]" />
                      <span>84%</span>
                    </div>
                  </div>

                  {/* Center: Glowing Focus Reticle with "CLICK TO EXPAND" */}
                  <div className="flex items-center justify-center">
                    <div className={`
                      relative w-20 h-20 sm:w-28 sm:h-28 border-2 border-dashed
                      ${isHoveredScreen ? 'border-[#00ff66] scale-105 shadow-[0_0_15px_#00ff66]' : 'border-white/50'}
                      transition-all duration-200 flex flex-col items-center justify-center text-center p-1
                    `}>
                      {/* Corner marks */}
                      <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#00ff66]" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#00ff66]" />
                      <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#00ff66]" />
                      <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#00ff66]" />

                      <AnimatePresence>
                        {isHoveredScreen ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-black/80 px-2 py-1 text-[9px] sm:text-[10px] text-[#00ff66] font-bold tracking-wider"
                          >
                            <Maximize2 className="w-3 h-3 mx-auto mb-0.5" />
                            CLICK TO EXPAND
                          </motion.div>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Bottom Row: Timestamp & Audio meters */}
                  <div className="flex items-center justify-between text-white font-mono text-[9px] sm:text-xs tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    <span className="text-[#00ff66]">{timestamp}</span>
                    <span className="text-neutral-400 uppercase text-[9px]">TAPE CH-1 // NTSC</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Camcorder Right Physical Body & Controls Texture */}
          <div className="hidden md:flex flex-col justify-between w-48 h-full pl-6 border-l border-neutral-700/60 text-neutral-400 font-mono text-[10px]">
            {/* Model Badge */}
            <div>
              <div className="flex items-center gap-1.5 text-neutral-200 font-bold tracking-widest text-xs uppercase mb-1">
                <Eye className="w-4 h-4 text-inkred" />
                <span>NIGHT-VISION</span>
              </div>
              <p className="text-[9px] text-neutral-500 uppercase">OPTICAL STEADYSHOT 20x</p>
            </div>

            {/* Tactile Hardware Buttons */}
            <div className="my-6 space-y-2">
              <div className="flex items-center justify-between bg-black/60 px-2 py-1 rounded border border-neutral-800">
                <span>ZOOM</span>
                <span className="text-neutral-300 font-bold">[ W / T ]</span>
              </div>
              <div className="flex items-center justify-between bg-black/60 px-2 py-1 rounded border border-neutral-800">
                <span>IR LIGHT</span>
                <span className="text-[#00ff66] font-bold">ON</span>
              </div>
              <div className="flex items-center justify-between bg-black/60 px-2 py-1 rounded border border-neutral-800">
                <span>FORMAT</span>
                <span className="text-neutral-300 font-bold">MINI-DV</span>
              </div>
            </div>

            {/* Red Physical REC Button */}
            <div className="flex items-center gap-2 pt-2 border-t border-neutral-800">
              <div className="w-4 h-4 rounded-full bg-inkred border-2 border-red-950 shadow-[0_0_8px_rgba(229,9,20,0.8)]" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-300">SHUTTER ENGAGED</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. FULLSCREEN EXPANDED CAMCORDER VIDEO (Using Framer Motion layoutId) */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            layoutId="camcorder-lcd-screen"
            className="fixed inset-0 z-40 w-screen h-screen bg-black overflow-hidden flex items-center justify-center"
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          >
            {/* The Fullscreen Video Playing with Audio */}
            <video
              src="/assets/scene1.mp4"
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover filter contrast-110 brightness-100"
            />

            {/* Subtle VHS scanlines in Fullscreen */}
            <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
            <div className="absolute inset-0 vignette opacity-50 pointer-events-none" />

            {/* High-Tech Camcorder Fullscreen HUD */}
            <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between pointer-events-none">
              {/* Top HUD */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 bg-black/70 px-4 py-1.5 border border-white/20 backdrop-blur-sm">
                  <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_#ff0000]" />
                  <span className="font-stencil tracking-widest text-sm text-red-500 font-bold">PLAYBACK // LIVE</span>
                  <span className="text-xs text-neutral-300 font-mono">OCTOBER 2025 ARCHIVE</span>
                </div>

                <div className="flex items-center gap-2 bg-black/70 px-3 py-1.5 border border-white/20 text-xs text-neutral-300">
                  <BatteryCharging className="w-4 h-4 text-[#00ff66]" />
                  <span>84% BATTERY</span>
                </div>
              </div>

              {/* Center Targeting Reticle (Subtle) */}
              <div className="flex items-center justify-center opacity-40">
                <div className="w-32 h-32 border border-white/40 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/60" />
                </div>
              </div>

              {/* Bottom HUD */}
              <div className="flex items-center justify-between">
                <div className="bg-black/70 px-4 py-2 border border-white/20 font-mono text-sm text-[#00ff66] tracking-widest">
                  {timestamp}
                </div>

                <button
                  onClick={handleReturnClick}
                  className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-black/80 border border-white/30 text-white font-mono text-xs uppercase hover:bg-inkred hover:border-inkred transition-colors"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>MINIMIZE VIEW</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
