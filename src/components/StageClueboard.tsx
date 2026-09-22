import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { EVIDENCE_LIST, THREAD_CONNECTIONS } from '../data/evidenceData';
import type { EvidenceItem } from '../types';
import { EvidenceCard } from './EvidenceCard';
import { InspectionModal } from './InspectionModal';
import { sound } from '../audioEngine';
import { Crosshair, FileSearch } from 'lucide-react';

interface StageClueboardProps {
  onOpenArchive: () => void;
  onOpenFileRoom: () => void;
}

export const StageClueboard: React.FC<StageClueboardProps> = ({ onOpenArchive, onOpenFileRoom }) => {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);
  const [, setInspectedIds] = useState<Set<string>>(new Set());
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sound.startAmbience();
  }, []);

  const handleCardClick = (evidence: EvidenceItem) => {
    setSelectedEvidence(evidence);
    setInspectedIds((prev) => new Set([...prev, evidence.id]));
  };

  const handleCloseModal = () => {
    setSelectedEvidence(null);
  };

  // Find evidence by ID for SVG thread connections
  const getEvidence = (id: string) => EVIDENCE_LIST.find((e) => e.id === id);

  return (
    <div
      ref={boardRef}
      className="relative w-screen h-screen overflow-hidden select-none bg-[#0e0e11] flex flex-col justify-between"
    >
      {/* TOP-RIGHT MANILA FOLDER CASE ARCHIVES TAB */}
      <button
        onClick={() => {
          sound.playStampSlam();
          sound.playTechClick(1.2);
          onOpenFileRoom();
        }}
        onMouseEnter={() => sound.playHoverTick()}
        className="fixed top-6 right-6 z-50 group cursor-pointer outline-none focus:outline-none"
        title="Open Case Report Archives (Previous Years)"
      >
        <div className="relative flex items-center bg-[#c8a876] hover:bg-inkred text-neutral-900 hover:text-white px-5 py-2.5 rounded-b-md border-b-2 border-x-2 border-black/80 shadow-[0_8px_25px_rgba(0,0,0,0.85)] transition-all duration-200 group-hover:translate-y-1.5 group-hover:shadow-[0_0_30px_rgba(229,9,20,0.7)]">
          {/* Metallic Paperclip SVG graphic */}
          <svg 
            className="absolute -top-3 left-3 w-6 h-10 text-neutral-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>

          <div className="flex items-center gap-2 pl-4">
            <span className="font-stencil tracking-[0.22em] text-xs sm:text-sm font-black uppercase select-none">
              CASE ARCHIVES
            </span>
            <span className="px-1.5 py-0.2 bg-red-800 text-white font-mono text-[9px] font-bold tracking-tighter uppercase rounded-xs">
              TOP SECRET
            </span>
          </div>
        </div>
      </button>

      {/* LEFT-SIDE ARCHIVE LINK (Authentic yellowed masking tape / vintage physical tab) */}
      <button
        onClick={() => {
          sound.playGlitchBurst();
          onOpenArchive();
        }}
        onMouseEnter={() => sound.playHoverTick()}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 group cursor-pointer outline-none focus:outline-none"
        title="Open Camcorder Archive: Previous Year"
      >
        <div className="relative flex items-center bg-[#d4af37] hover:bg-inkred text-black hover:text-white border-y-2 border-r-2 border-black/80 px-2.5 py-6 shadow-[5px_0_25px_rgba(0,0,0,0.9)] transition-all duration-200 group-hover:translate-x-1.5">
          {/* Masking tape ragged top/bottom edges */}
          <div className="absolute -top-1 left-0 right-0 h-1 bg-[#b89528] group-hover:bg-[#990000]" />
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[#b89528] group-hover:bg-[#990000]" />

          <div className="flex flex-col items-center gap-3">
            {/* Blinking red recording dot */}
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_#ff0000] group-hover:bg-white" />

            {/* Rotated 90 degrees text */}
            <span
              className="font-stencil tracking-[0.25em] text-xs sm:text-sm font-bold uppercase select-none whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              ARCHIVE: PREVIOUS YEAR
            </span>

            <span className="font-mono text-[9px] font-extrabold opacity-80 select-none">
              '25
            </span>
          </div>
        </div>
      </button>

      {/* Sleek Vector Dot Matrix Background */}
      <div className="absolute inset-0 dot-matrix opacity-70 pointer-events-none" />

      {/* Sleek Vector Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f4f4f5 1px, transparent 1px),
            linear-gradient(to bottom, #f4f4f5 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top Detective Status Banner (HUD) - Stylized indie game header */}
      <div className="relative z-30 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-[#0a0a0c]/90 via-[#0a0a0c]/70 to-transparent border-b border-white/5 pointer-events-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-inkred text-white font-stencil text-sm tracking-widest clip-diagonal shadow-[0_0_15px_rgba(229,9,20,0.5)]">
            <Crosshair className="w-4 h-4 animate-pulse" />
            <span>CASE #804</span>
          </div>
          <div className="hidden sm:block">
            <h2 className="font-stencil text-base text-stark tracking-wider uppercase">
              THE RED ROOM OCCURRENCE // EVIDENCE BOARD
            </h2>
            <p className="font-mono text-[10px] text-neutral-400 tracking-wider">
              CRIME SCENE RECONSTRUCTION • 5 EXHIBITS CATALOGUED
            </p>
          </div>
        </div>


      </div>

      {/* Diagonal stylized crime scene hazard tape across bottom-left */}
      <div className="absolute -bottom-8 -left-12 rotate-12 z-10 pointer-events-none opacity-80">
        <div className="crime-tape px-16 py-2 shadow-2xl border-y-2 border-black">
          <span className="font-stencil text-xs text-white tracking-[0.3em] uppercase drop-shadow-[0_2px_4px_#000]">
            DO NOT CROSS CRIME SCENE PERIMETER • SPECIAL INVESTIGATION
          </span>
        </div>
      </div>

      {/* The Detective Conspiracy Board Canvas & Interactive Cards */}
      <div className="relative flex-1 w-full h-full">
        {/* SVG Red Conspiracy Threads Connecting the Cards */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <filter id="thread-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#e50914" floodOpacity="0.8" />
            </filter>
          </defs>

          {THREAD_CONNECTIONS.map(([idA, idB], idx) => {
            const evA = getEvidence(idA);
            const evB = getEvidence(idB);
            if (!evA || !evB) return null;

            // Approximate center pushpin coordinate based on boardPos
            const x1 = `${evA.boardPos.xPercent + 9}%`;
            const y1 = `${evA.boardPos.yPercent + 2}%`;
            const x2 = `${evB.boardPos.xPercent + 9}%`;
            const y2 = `${evB.boardPos.yPercent + 2}%`;

            return (
              <g key={idx}>
                {/* Background Shadow Thread */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#000000"
                  strokeWidth="4"
                  strokeOpacity="0.7"
                />
                {/* Red Vector Tension Thread */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#e50914"
                  strokeWidth="2.2"
                  filter="url(#thread-glow)"
                  strokeDasharray="8 3"
                />
                {/* Center marker knot */}
                <circle
                  cx={`calc((${x1} + ${x2}) / 2)`}
                  cy={`calc((${y1} + ${y2}) / 2)`}
                  r="3.5"
                  fill="#ff1f2d"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              </g>
            );
          })}
        </svg>

        {/* Render Evidence Cards Scattered Across the Board */}
        {EVIDENCE_LIST.map((evidence) => (
          <EvidenceCard
            key={evidence.id}
            evidence={evidence}
            onClick={() => handleCardClick(evidence)}
            isSelected={selectedEvidence?.id === evidence.id}
          />
        ))}
      </div>

      {/* Bottom HUD Hint Bar */}
      <div className="relative z-30 px-6 py-3 bg-gradient-to-t from-[#0a0a0c] to-transparent border-t border-white/5 flex items-center justify-between text-neutral-500 font-mono text-[11px] pointer-events-none">
        <div className="flex items-center gap-2">
          <FileSearch className="w-3.5 h-3.5 text-inkred" />
          <span>CLICK ANY EXHIBIT TO ZOOM &amp; ACCESS DOSSIER HUD</span>
        </div>
        <div className="hidden sm:block uppercase tracking-widest text-[10px]">
          [ TACTICAL BOARD COORDINATES: 45.4215° N, 75.6972° W ]
        </div>
      </div>

      {/* Global Vignette and Scanlines */}
      <div className="absolute inset-0 scanlines" />
      <div className="absolute inset-0 vignette" />

      {/* Zoom / Inspect Mode Modal */}
      <AnimatePresence>
        {selectedEvidence && (
          <InspectionModal
            evidence={selectedEvidence}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
