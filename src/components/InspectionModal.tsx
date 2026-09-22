import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { EvidenceItem } from '../types';
import { sound } from '../audioEngine';
import confetti from 'canvas-confetti';
import { 
  X, 
  Lightbulb, 
  ShieldAlert, 
  FileText, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Volume2, 
  CornerDownLeft, 
  Delete 
} from 'lucide-react';

interface InspectionModalProps {
  evidence: EvidenceItem;
  onClose: () => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({ evidence, onClose }) => {
  const [uvActive, setUvActive] = useState(false);
  const [keypadInput, setKeypadInput] = useState('');
  const [safeUnlocked, setSafeUnlocked] = useState(false);
  const [safeError, setSafeError] = useState(false);
  const [isPlayingAudioTape, setIsPlayingAudioTape] = useState(false);

  // Sound effect and ESC listener
  useEffect(() => {
    sound.playStampSlam();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playTechClick(0.8);
        onClose();
      }
      // Keypad numerical inputs if viewing safe
      if (evidence.dossier.hasKeypad && !safeUnlocked) {
        if (/^[0-9]$/.test(e.key) && keypadInput.length < 4) {
          const digit = parseInt(e.key);
          sound.playKeypadTone(digit);
          setKeypadInput((prev) => prev + e.key);
        } else if (e.key === 'Backspace') {
          sound.playTechClick(0.7);
          setKeypadInput((prev) => prev.slice(0, -1));
        } else if (e.key === 'Enter') {
          handleKeypadSubmit();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [evidence, keypadInput, safeUnlocked]);

  // Keypad handling
  const handleKeypadPress = (digit: string) => {
    if (safeUnlocked) return;
    if (keypadInput.length < 4) {
      sound.playKeypadTone(parseInt(digit));
      setKeypadInput((prev) => prev + digit);
    }
  };

  const handleKeypadBackspace = () => {
    if (safeUnlocked) return;
    sound.playTechClick(0.7);
    setKeypadInput((prev) => prev.slice(0, -1));
  };

  const handleKeypadSubmit = () => {
    if (safeUnlocked) return;
    if (keypadInput === '7304') {
      sound.playCipherSuccess();
      setSafeUnlocked(true);
      setSafeError(false);
      // Fire detective victory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e50914', '#ffffff', '#f59e0b'],
      });
    } else {
      sound.playGlitchBurst();
      setSafeError(true);
      setTimeout(() => {
        setSafeError(false);
        setKeypadInput('');
      }, 700);
    }
  };

  const toggleUv = () => {
    sound.playTechClick(uvActive ? 0.9 : 1.4);
    setUvActive(!uvActive);
  };

  const toggleAudioTape = () => {
    sound.playTechClick(1.1);
    setIsPlayingAudioTape(!isPlayingAudioTape);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center select-none">
      {/* Background Dims Heavily */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          sound.playTechClick(0.8);
          onClose();
        }}
        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
      />

      {/* Unmistakable Close 'X' Button in Top Right */}
      <button
        onClick={() => {
          sound.playTechClick(0.8);
          onClose();
        }}
        className={`
          absolute top-3 right-4 sm:top-6 sm:right-8 z-50 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 
          bg-noir-900 border-2 border-white/40 text-stark 
          hover:border-inkred hover:bg-inkred hover:text-white 
          font-stencil text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-150
          shadow-[0_0_20px_rgba(0,0,0,0.8)]
        `}
        style={{
          clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
        }}
      >
        <span>CLOSE [ESC]</span>
        <X className="w-4 h-4 sm:w-5 sm:h-5 text-inkred group-hover:text-white" />
      </button>

      {/* Main Inspection Modal Container */}
      <div className="relative z-40 w-[96vw] max-w-6xl h-[90vh] md:h-[88vh] flex flex-col md:flex-row items-stretch gap-4 sm:gap-6 pointer-events-auto overflow-y-auto md:overflow-visible p-1">
        {/* Left Side: Scaled-up Zoomed Image or Memo Exhibit */}
        <motion.div
          layoutId={`card-container-${evidence.id}`}
          className="flex-1 bg-[#111113] border-2 border-neutral-700 flex flex-col overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.9)]"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)',
          }}
        >
          {/* Top Bar on Card */}
          <div className="bg-[#18181b] border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-inkred" />
              <span className="font-stencil text-sm text-stark tracking-wider uppercase">
                {evidence.tag} // {evidence.title}
              </span>
            </div>
            <div className="font-mono text-[11px] text-neutral-400">
              MAGNIFICATION: 2.5X
            </div>
          </div>

          {/* Visual Showcase (Photo with UV lamp or Memo Layout) */}
          <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden p-2">
            {evidence.image ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={evidence.image}
                  alt={evidence.title}
                  className={`
                    max-h-full max-w-full object-contain transition-all duration-300
                    ${uvActive 
                      ? 'filter hue-rotate-180 invert brightness-125 contrast-150 saturate-200' 
                      : 'filter contrast-110'
                    }
                  `}
                />

                {/* UV Blacklight Secret Glowing Clue Overlay */}
                {evidence.dossier.hasUvLight && uvActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none bg-indigo-950/40"
                  >
                    <div className="bg-black/90 border-2 border-inkred p-6 max-w-md text-center shadow-[0_0_40px_rgba(229,9,20,0.9)]">
                      <p className="font-stencil text-2xl text-inkred-glow tracking-widest uppercase mb-2">
                        [ UV FLUORESCENCE DETECTED ]
                      </p>
                      <p className="font-mono text-sm text-stark font-bold tracking-wider">
                        {evidence.dossier.uvMessage}
                      </p>
                      <p className="font-mono text-[10px] text-neutral-400 mt-3 uppercase">
                        Traces of luminal reaction on hardwood floor matching safe digits.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Scanline texture */}
                <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
              </div>
            ) : (
              /* High-Level Classified Memo Document View */
              <div className="w-full h-full bg-[#18181b] p-8 font-mono text-xs text-neutral-300 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <div className="border-b-2 border-inkred pb-3 flex items-center justify-between">
                    <div>
                      <h2 className="font-stencil text-2xl text-stark tracking-wider uppercase">
                        DEPARTMENT OF SPECIAL INVESTIGATIONS
                      </h2>
                      <p className="text-inkred font-mono text-xs tracking-widest mt-1">
                        OPERATION RED ROOM // CASE SYNOPSIS
                      </p>
                    </div>
                    <div className="border-2 border-inkred text-inkred px-3 py-1 font-stencil text-sm tracking-widest">
                      EYES ONLY
                    </div>
                  </div>

                  <p className="text-sm text-stark/90 leading-relaxed">
                    {evidence.dossier.synopsis}
                  </p>

                  <div className="space-y-2 mt-4 bg-black/40 p-4 border border-neutral-800">
                    <h4 className="font-stencil text-sm text-stark tracking-wider uppercase text-inkred">
                      PRIMARY PROTOCOLS:
                    </h4>
                    {evidence.dossier.keyFindings.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-neutral-300">
                        <span className="text-inkred font-bold">[{idx + 1}]</span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-800 text-[10px] text-neutral-500 flex justify-between">
                  <span>AUTHORIZED BY COMMISSIONER'S OFFICE</span>
                  <span>DOC-REF #804-A</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Controls (UV Lamp or Audio toggle) */}
          <div className="bg-[#18181b] border-t border-neutral-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {evidence.dossier.hasUvLight && (
                <button
                  onClick={toggleUv}
                  className={`
                    px-4 py-2 border font-mono text-xs tracking-wider uppercase flex items-center gap-2 transition-all
                    ${uvActive 
                      ? 'bg-purple-950 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.6)]' 
                      : 'bg-black/60 border-neutral-600 text-stark hover:border-inkred hover:text-inkred'
                    }
                  `}
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>{uvActive ? 'DEACTIVATE UV LAMP' : 'ACTIVATE UV BLACKLIGHT'}</span>
                </button>
              )}

              {evidence.category === 'wiretap' && (
                <button
                  onClick={toggleAudioTape}
                  className="px-4 py-2 bg-black/60 border border-neutral-600 text-stark hover:border-inkred hover:text-inkred font-mono text-xs tracking-wider uppercase flex items-center gap-2 transition-all"
                >
                  <Volume2 className="w-4 h-4 text-inkred" />
                  <span>{isPlayingAudioTape ? 'PAUSE WIRETAP' : 'PLAY REEL-TO-REEL AUDIO'}</span>
                </button>
              )}
            </div>

            <div className="font-mono text-xs text-neutral-500">
              EVIDENCE STATUS: VERIFIED
            </div>
          </div>
        </motion.div>

        {/* Right Side: Inspection Panel (HUD Dossier) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-[420px] lg:w-[460px] bg-[#111113] border-2 border-neutral-700 flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.9)] overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
          }}
        >
          {/* Header */}
          <div className="bg-[#18181b] border-b border-neutral-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-inkred" />
              <span className="font-stencil text-sm text-stark tracking-wider uppercase">
                CASE DOSSIER // INSPECTION HUD
              </span>
            </div>
            <div className="px-2 py-0.5 bg-inkred/20 border border-inkred text-inkred font-mono text-[10px] tracking-widest uppercase font-bold">
              {evidence.stamp}
            </div>
          </div>

          {/* Dossier Content Details */}
          <div className="flex-1 p-6 font-mono text-xs space-y-5 overflow-y-auto text-neutral-300">
            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 bg-black/60 p-3 border border-neutral-800">
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">CLASSIFICATION</span>
                <span className="text-stark font-bold text-[11px] truncate block">{evidence.dossier.classification}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">TIMESTAMP</span>
                <span className="text-stark font-bold text-[11px] block">{evidence.dossier.date}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-neutral-500 block uppercase">SUBJECT</span>
                <span className="text-inkred font-bold text-[11px] block">{evidence.dossier.subject}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-neutral-500 block uppercase">CASE LEAD</span>
                <span className="text-neutral-300 text-[11px] block">{evidence.dossier.investigator}</span>
              </div>
            </div>

            {/* Case Synopsis */}
            <div>
              <h4 className="font-stencil text-sm text-stark tracking-widest uppercase text-inkred mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-inkred" />
                OFFICIAL REPORT
              </h4>
              <p className="text-neutral-300 leading-relaxed bg-black/30 p-3 border-l-2 border-neutral-700">
                {evidence.dossier.synopsis}
              </p>
            </div>

            {/* Key Forensic Findings */}
            <div>
              <h4 className="font-stencil text-sm text-stark tracking-widest uppercase text-inkred mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-inkred" />
                CRITICAL EXHIBIT FINDINGS
              </h4>
              <ul className="space-y-2">
                {evidence.dossier.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-neutral-900/60 p-2 border-l border-neutral-800">
                    <span className="text-inkred font-bold text-[10px] mt-0.5">&gt;</span>
                    <span className="text-neutral-300 leading-tight">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Secret Detective Hint if unlocked */}
            {evidence.dossier.secretClue && (
              <div className="bg-amber-950/20 border border-amber-500/40 p-3">
                <div className="flex items-center gap-2 text-amberdoc font-stencil text-xs tracking-wider uppercase mb-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-amberdoc" />
                  DETECTIVE NOTE
                </div>
                <p className="text-amber-200/90 text-[11px] leading-tight">
                  {evidence.dossier.secretClue}
                </p>
              </div>
            )}

            {/* Interactive Safe Keypad UI if this is the safe evidence */}
            {evidence.dossier.hasKeypad && (
              <div className="bg-black/80 border-2 border-neutral-700 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-stencil text-sm text-stark tracking-wider uppercase flex items-center gap-2">
                    {safeUnlocked ? <Unlock className="w-4 h-4 text-green-400" /> : <Lock className="w-4 h-4 text-inkred" />}
                    VAULT ELECTRONIC CIPHER
                  </span>
                  <span className={`font-mono text-[10px] font-bold ${safeUnlocked ? 'text-green-400' : safeError ? 'text-inkred animate-pulse' : 'text-neutral-400'}`}>
                    {safeUnlocked ? 'STATUS: UNLOCKED' : safeError ? 'CODE DENIED' : '4-DIGIT PIN REQUIRED'}
                  </span>
                </div>

                {/* Display Screen */}
                <div className="bg-[#050505] border border-neutral-700 p-3 text-center">
                  <span className="font-mono text-2xl tracking-[0.5em] text-inkred-glow font-bold">
                    {safeUnlocked ? '7 3 0 4' : (keypadInput.padEnd(4, '_').split('').join(' '))}
                  </span>
                </div>

                {safeUnlocked ? (
                  <div className="p-3 bg-green-950/30 border border-green-500 text-green-300 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold uppercase">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      SAFE CRACKED // CONFESSION REVEALED
                    </div>
                    <p className="text-[11px] text-neutral-300">
                      Inside lies a high-grade 9mm suppressor and an autographed transfer of bearer bonds to Victor Vance dated 22:00 Oct 11.
                      <strong> Case solved! Prime Suspect is apprehended.</strong>
                    </p>
                  </div>
                ) : (
                  /* Numerical Pad */
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleKeypadPress(num)}
                        className="py-2.5 bg-neutral-900 border border-neutral-700 hover:border-inkred hover:text-inkred font-stencil text-base text-stark transition-colors active:scale-95"
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      onClick={handleKeypadBackspace}
                      className="py-2.5 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-400 flex items-center justify-center transition-colors active:scale-95"
                      title="Backspace"
                    >
                      <Delete className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleKeypadPress('0')}
                      className="py-2.5 bg-neutral-900 border border-neutral-700 hover:border-inkred hover:text-inkred font-stencil text-base text-stark transition-colors active:scale-95"
                    >
                      0
                    </button>
                    <button
                      onClick={handleKeypadSubmit}
                      className="py-2.5 bg-inkred/20 border border-inkred hover:bg-inkred hover:text-white font-stencil text-xs text-inkred tracking-wider uppercase flex items-center justify-center gap-1 transition-colors active:scale-95"
                    >
                      <CornerDownLeft className="w-3.5 h-3.5" />
                      ENTER
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="bg-[#18181b] border-t border-neutral-800 p-4 flex items-center justify-between">
            <span className="font-mono text-[10px] text-neutral-500">
              PRESS ESC TO RETURN TO CONSPIRACY BOARD
            </span>
            <button
              onClick={() => {
                sound.playTechClick(0.8);
                onClose();
              }}
              className="px-4 py-1.5 bg-inkred text-white font-stencil text-xs tracking-widest uppercase hover:bg-inkred-glow transition-colors"
            >
              RETURN
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
