import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../audioEngine';
import { ArrowRight, Crosshair, ShieldAlert } from 'lucide-react';

type CinematicPhase = 
  | 'SCENE_1'
  | 'SCENE_1_ENDED'
  | 'SCENE_2'
  | 'NAME_REVEAL'
  | 'SCENE_3';

interface StageCinematicProps {
  onComplete: () => void;
}

export const StageCinematic: React.FC<StageCinematicProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<CinematicPhase>('SCENE_1');
  const [isMuted, setIsMuted] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Attempt video playback and handle browser autoplay restrictions gracefully
  useEffect(() => {
    sound.startAmbience();

    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocks unmuted autoplay, mute and resume
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, [phase]);

  // Video end handler
  const handleVideoEnded = () => {
    if (phase === 'SCENE_1') {
      sound.playGlitchBurst();
      setPhase('SCENE_1_ENDED');
    } else if (phase === 'SCENE_2') {
      sound.playStampSlam();
      sound.playGlitchBurst();
      setPhase('NAME_REVEAL');
    } else if (phase === 'SCENE_3') {
      triggerTransitionToClueboard();
    }
  };

  // Transition to Scene 2 when clicking "Are you ready to investigate"
  const handleReadyToInvestigate = () => {
    sound.playTechClick(1.2);
    sound.playGlitchBurst();
    setPhase('SCENE_2');
  };

  // Transition to Scene 3 when clicking "Continue" on Name Reveal screen
  const handleContinueToScene3 = () => {
    sound.playTechClick(1.1);
    sound.playStampSlam();
    setPhase('SCENE_3');
  };

  // Final transition from Scene 3 to Clueboard
  const triggerTransitionToClueboard = () => {
    sound.playFlashStinger();
    setIsFlashing(true);

    setTimeout(() => {
      setIsBlackout(true);
    }, 250);

    setTimeout(() => {
      onComplete();
    }, 800);
  };


  // Determine current video source
  const getVideoSrc = () => {
    if (phase === 'SCENE_1') {
      return '/assets/screenintrofinal.mp4';
    }
    if (phase === 'SCENE_2') {
      return '/assets/scene 2.mp4';
    }
    if (phase === 'SCENE_3') {
      return '/assets/scene3.mp4';
    }
    return '';
  };

  const handleGlobalClick = () => {
    if (isMuted) {
      setIsMuted(false);
      if (videoRef.current) {
        videoRef.current.muted = false;
      }
      if (sound.getMuted()) sound.toggleMute();
      sound.getContext();
    }
  };

  return (
    <div 
      onClick={handleGlobalClick}
      className="relative w-screen h-screen overflow-hidden select-none bg-noir-950 flex items-center justify-center font-mono"
    >
      {/* 1. VIDEO PLAYER (SCENE 1, SCENE 2, SCENE 3) */}
      {(phase === 'SCENE_1' || phase === 'SCENE_2' || phase === 'SCENE_3') && (
        <video
          ref={videoRef}
          key={phase}
          src={getVideoSrc()}
          autoPlay
          playsInline
          muted={isMuted}
          onEnded={handleVideoEnded}
          className="absolute inset-0 w-full h-full object-cover z-0 brightness-100 contrast-110"
        />
      )}

      {/* 2. FINAL.PNG BACKGROUND FOR SCENE 1 ENDED (ARE YOU READY TO INVESTIGATE) */}
      {phase === 'SCENE_1_ENDED' && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full bg-cover bg-center z-0 brightness-[0.7] contrast-125"
            style={{ backgroundImage: "url('/assets/final.png')" }}
          />
          {/* Contrast vignette */}
          <div className="absolute inset-0 bg-black/45 z-0 pointer-events-none" />
        </>
      )}

      {/* 3. NAME.PNG BACKGROUND FOR NAME REVEAL PHASE */}
      {phase === 'NAME_REVEAL' && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/assets/Name.png')" }}
        />
      )}

      {/* Atmospheric overlays: Scanlines & Vignette */}
      <div className="absolute inset-0 scanlines pointer-events-none z-10" />
      <div className="absolute inset-0 vignette pointer-events-none z-10" />

      {/* Top Header: MYSTERY ROOM on the left */}
      <div className="absolute top-6 left-8 z-20 flex items-center gap-3 pointer-events-none">
        <span className="font-stencil tracking-[0.25em] text-base sm:text-xl text-white font-bold uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          MYSTERY ROOM
        </span>
      </div>

      {/* PHASE: SCENE_1_ENDED OVERLAY WITH "ARE YOU READY TO INVESTIGATE" BUTTON */}
      <AnimatePresence>
        {phase === 'SCENE_1_ENDED' && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 flex flex-col items-center text-center w-[92vw] sm:w-auto max-w-2xl px-5 sm:px-8 py-6 sm:py-10 bg-black/85 backdrop-blur-md border-2 border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.95)]"
          >
            {/* Pulsing indicator tag */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 bg-black border-2 border-inkred text-white font-mono text-[10px] sm:text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(229,9,20,0.6)]">
              <Crosshair className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-inkred animate-spin" style={{ animationDuration: '6s' }} />
              <span className="font-bold">SCENE 1 CONCLUDED // SUSPECT ESCAPED</span>
            </div>

            {/* High-visibility dramatic prompt text */}
            <h2 className="font-stencil text-xl sm:text-3xl md:text-4xl text-white tracking-[0.16em] uppercase my-2 sm:my-3 drop-shadow-[0_2px_10px_rgba(0,0,0,1)] leading-tight">
              THE CRIME SCENE IS SEALED.<br />
              <span className="text-inkred drop-shadow-[0_0_15px_rgba(229,9,20,0.8)]">THE TRUTH AWAITS.</span>
            </h2>

            {/* ARE YOU READY TO INVESTIGATE BUTTON */}
            <button
              onClick={handleReadyToInvestigate}
              onMouseEnter={() => sound.playHoverTick()}
              className={`
                group relative mt-3 sm:mt-4 px-6 sm:px-12 py-3.5 sm:py-5 uppercase font-stencil text-xl sm:text-3xl md:text-4xl tracking-[0.2em]
                transition-all duration-200 outline-none
                bg-black border-4 border-white text-white
                hover:border-inkred-glow hover:text-white
                shadow-[0_0_40px_rgba(0,0,0,0.9)]
                hover:shadow-[0_0_45px_rgba(255,31,45,0.85),inset_0_0_25px_rgba(229,9,20,0.45)]
                hover:scale-[1.02] active:scale-[0.98]
              `}
              style={{
                clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
              }}
            >
              {/* Background red sweep */}
              <span className="absolute inset-0 bg-inkred opacity-0 group-hover:opacity-90 transition-opacity duration-200" />

              {/* Text content */}
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 font-bold">
                <span>ARE YOU READY TO INVESTIGATE</span>
                <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-1.5" />
              </span>
            </button>

            <span className="font-mono text-[10px] sm:text-xs text-neutral-300 tracking-widest mt-4 px-3 py-1 bg-black/70 border border-neutral-700 uppercase">
              [ CLICK TO INITIATE SCENE 2 PROTOCOL ]
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE: NAME_REVEAL (Name.png background with deep red Mystery Room title + Continue button) */}
      <AnimatePresence>
        {phase === 'NAME_REVEAL' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 flex flex-col items-center justify-center text-center px-4 max-w-4xl"
          >
            {/* Classified case ribbon */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-transparent via-[#8B0000] to-transparent mb-3 max-w-md"
            />

            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 text-[#8B0000]" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-neutral-400">
                CLASSIFIED CRIME ARCHIVE // LEVEL 4
              </span>
            </div>

            {/* MYSTERY ROOM TITLE IN DEEP RED */}
            <h1
              className="font-stencil text-5xl sm:text-7xl md:text-9xl tracking-[0.16em] uppercase select-none leading-none my-2"
              style={{
                color: '#8B0000',
                textShadow: '0 0 25px rgba(139, 0, 0, 0.9), 0 0 50px rgba(100, 0, 0, 0.7), 0 10px 40px rgba(0, 0, 0, 0.95)',
                filter: 'drop-shadow(0 0 15px rgba(139,0,0,0.8))',
              }}
            >
              MYSTERY ROOM
            </h1>

            {/* Sub-tag */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="font-mono text-xs sm:text-sm md:text-base text-[#ff4d4d] tracking-[0.35em] uppercase font-bold mt-1 mb-6 sm:mb-8"
              style={{
                textShadow: '0 0 12px rgba(255, 77, 77, 0.6)',
              }}
            >
              CASE #804: THE RED ROOM OCCURRENCE
            </motion.p>

            {/* CONTINUE BUTTON */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button
                onClick={handleContinueToScene3}
                onMouseEnter={() => sound.playHoverTick()}
                className={`
                  group relative px-8 sm:px-14 py-3 sm:py-4 uppercase font-stencil text-lg sm:text-2xl md:text-3xl tracking-[0.25em]
                  transition-all duration-200 outline-none
                  bg-black/85 border-2 border-[#8B0000] text-stark
                  hover:border-red-600 hover:bg-[#8B0000] hover:text-white
                  shadow-[0_0_35px_rgba(139,0,0,0.6)]
                  hover:shadow-[0_0_45px_rgba(229,9,20,0.8)]
                  hover:scale-[1.03] active:scale-[0.98]
                `}
                style={{
                  clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                }}
              >
                <span className="flex items-center justify-center gap-2.5 sm:gap-3">
                  <span>CONTINUE</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1.5" />
                </span>
              </button>

              <p className="font-mono text-[11px] text-neutral-400 tracking-widest mt-3 uppercase">
                [ ADVANCE TO SCENE 3 // FINAL BRIEFING ]
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera Flash transition effect */}
      {isFlashing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.85] }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-white z-50 pointer-events-none"
        />
      )}

      {/* Blackout Fade effect before clueboard */}
      {isBlackout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-black z-50 pointer-events-none"
        />
      )}
    </div>
  );
};
