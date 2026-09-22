import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CASE_ARCHIVES } from '../data/archiveData';
import type { CaseReport } from '../types';
import { sound } from '../audioEngine';
import { 
  ArrowLeft, 
  Folder, 
  FolderOpen, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  User, 
  Terminal, 
  Film, 
  Image as ImageIcon, 
  FileText 
} from 'lucide-react';

interface StageFileRoomProps {
  onReturn: () => void;
}

export const StageFileRoom: React.FC<StageFileRoomProps> = ({ onReturn }) => {
  const [activeCase, setActiveCase] = useState<CaseReport>(CASE_ARCHIVES[0]);

  const handleSelectCase = (c: CaseReport) => {
    sound.playTechClick(1.2);
    sound.playStampSlam();
    setActiveCase(c);
  };

  return (
    <div className="relative w-full h-[100dvh] max-h-[100dvh] overflow-hidden select-none bg-[#111114] text-stark font-mono flex flex-col justify-between">
      {/* 1. REALISTIC DARK WOOD DESK & CORKBOARD TEXTURE */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none bg-repeat"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(200, 160, 100, 0.08) 0%, transparent 80%),
            linear-gradient(to bottom, #1a1a1e 0%, #0d0d10 100%)
          `,
        }}
      />
      <div className="absolute inset-0 dot-matrix opacity-40 pointer-events-none" />

      {/* Decorative Red String Lines connecting evidence pins */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30">
        <line x1="120" y1="180" x2="340" y2="480" stroke="#e50914" strokeWidth="2" strokeDasharray="6 3" />
        <line x1="340" y1="480" x2="680" y2="240" stroke="#e50914" strokeWidth="2" strokeDasharray="6 3" />
        <line x1="680" y1="240" x2="980" y2="600" stroke="#e50914" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>

      {/* 2. TOP FULL-WIDTH POLICE CAUTION TAPE BANNER */}
      <div className="relative z-40 w-full bg-[#f59e0b] text-black shadow-[0_4px_25px_rgba(0,0,0,0.9)] border-b-2 border-black overflow-hidden py-1 sm:py-2">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee font-stencil text-[10px] sm:text-sm tracking-[0.22em] sm:tracking-[0.28em] uppercase font-black">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6">
              <span>★ POLICE LINE DO NOT CROSS ★</span>
              <span>SPECIAL INVESTIGATION ARCHIVES</span>
              <span>DEPT // FORENSIC DATABASE</span>
            </span>
          ))}
        </div>
      </div>

      {/* 3. TOP ACTION BAR (RETURN BUTTON & TERMINAL STATUS) */}
      <div className="relative z-30 flex items-center justify-between px-3 sm:px-8 py-1.5 sm:py-3 bg-black/70 backdrop-blur-md border-b border-white/10">
        {/* Stylized Physical Return Button */}
        <button
          onClick={() => {
            sound.playTechClick(0.9);
            onReturn();
          }}
          onMouseEnter={() => sound.playHoverTick()}
          className={`
            group flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-noir-900 border-2 border-white/80 text-stark
            hover:border-inkred hover:bg-inkred hover:text-white
            font-stencil text-xs sm:text-sm tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-all duration-150 outline-none
            shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_20px_rgba(229,9,20,0.7)]
          `}
          style={{
            clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
          }}
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" />
          <span>← BACK TO CLUEBOARD</span>
        </button>

        {/* Status Badge */}
        <div className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] text-neutral-400">
          <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
          <span className="hidden sm:inline">CENTRAL EVIDENCE ARCHIVE // TERMINAL-08</span>
          <span className="px-1.5 sm:px-2 py-0.5 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
            ONLINE
          </span>
        </div>
      </div>

      {/* 4. MAIN WORKSPACE: FOLDER STACK (LEFT) + DATABASE TERMINAL (RIGHT) */}
      <div className="relative z-20 flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 p-3 sm:p-8 overflow-y-auto lg:overflow-hidden">
        
        {/* LEFT COLUMN: PHYSICAL MANILA CASE FOLDERS & DESK STICKY NOTES */}
        <div className="w-full lg:w-96 flex flex-col justify-between shrink-0 gap-6">
          {/* Folders Stack */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-neutral-700 pb-2 mb-1">
              <span className="font-stencil tracking-widest text-xs text-neutral-400 uppercase">
                CASE DIRECTORY ({CASE_ARCHIVES.length})
              </span>
              <span className="font-mono text-[10px] text-neutral-500 uppercase">SELECT ENVELOPE</span>
            </div>

            {CASE_ARCHIVES.map((caseItem) => {
              const isActive = activeCase.id === caseItem.id;
              return (
                <motion.div
                  key={caseItem.id}
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectCase(caseItem)}
                  className={`
                    cursor-pointer relative p-4 rounded-sm border-2 transition-all duration-200
                    ${isActive 
                      ? 'bg-[#c8a876] border-red-600 text-black shadow-[0_0_25px_rgba(229,9,20,0.5)] translate-x-2' 
                      : 'bg-[#a3875a] hover:bg-[#b89b6c] border-black/60 text-neutral-950 shadow-md'
                    }
                  `}
                  style={{
                    boxShadow: isActive ? '0 10px 30px rgba(0,0,0,0.8)' : '0 4px 12px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Manila Folder Tab Lip */}
                  <div className={`
                    absolute -top-3 left-4 px-3 py-0.5 text-[10px] font-stencil tracking-widest rounded-t border-t border-x
                    ${isActive ? 'bg-[#c8a876] border-red-600 text-black font-black' : 'bg-[#93774a] border-black/60 text-neutral-900'}
                  `}>
                    YEAR {caseItem.year}
                  </div>

                  {/* Red Classified Stamp */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {isActive ? <FolderOpen className="w-5 h-5 text-red-700" /> : <Folder className="w-5 h-5 text-neutral-900" />}
                      <div>
                        <h3 className="font-stencil text-lg tracking-wider uppercase leading-tight font-black">
                          CASE: {caseItem.year}
                        </h3>
                        <p className="font-mono text-[10px] tracking-tight font-bold opacity-80 uppercase">
                          {caseItem.codename}
                        </p>
                      </div>
                    </div>

                    <span className={`
                      px-2 py-0.5 font-stencil text-[10px] tracking-widest uppercase border
                      ${caseItem.status === 'SOLVED' 
                        ? 'border-emerald-800 text-emerald-900 bg-emerald-300/40 font-bold' 
                        : 'border-red-900 text-red-950 bg-red-300/40 font-bold'
                      }
                    `}>
                      {caseItem.status}
                    </span>
                  </div>

                  {/* Stamp watermark on folder */}
                  <div className="mt-3 pt-2 border-t border-black/20 flex items-center justify-between text-[9px] font-mono font-semibold opacity-75">
                    <span>{caseItem.date.split('-')[0]}</span>
                    <span>{caseItem.stampText.split('//')[0]}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* DESK STICKY NOTES & INVESTIGATION CLUES */}
          <div className="hidden sm:flex flex-col gap-3 pt-2">
            {/* Yellow Sticky Note 1 */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="relative p-3.5 bg-[#fef08a] text-neutral-900 shadow-xl border border-yellow-300 transform -rotate-2"
              style={{
                boxShadow: '2px 4px 15px rgba(0,0,0,0.6)',
              }}
            >
              {/* Tape pin top */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-white/40 backdrop-blur-sm border border-black/10" />
              <p className="font-serif italic font-bold text-xs leading-relaxed">
                "Solve FIVE DIFFERENT CASES across all dossiers to assemble the full syndicate cipher."
              </p>
              <div className="flex justify-between items-center mt-2 text-[9px] font-mono text-neutral-600">
                <span>#DIRECTIVE-01</span>
                <span>CHIEF'S MEMO</span>
              </div>
            </motion.div>

            {/* Yellow Sticky Note 2 */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="relative p-3.5 bg-[#fed7aa] text-neutral-900 shadow-xl border border-orange-300 transform rotate-1"
              style={{
                boxShadow: '2px 4px 15px rgba(0,0,0,0.6)',
              }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-white/40 backdrop-blur-sm border border-black/10" />
              <p className="font-serif italic font-bold text-xs leading-relaxed">
                "Break the 4th wall: Examine the camcorder tape frequency for hidden audio clues."
              </p>
              <div className="flex justify-between items-center mt-2 text-[9px] font-mono text-neutral-600">
                <span>#ARCHIVE-NOTE</span>
                <span>CONFIDENTIAL</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT COLUMN: POLICE CYBER DATABASE TERMINAL */}
        <div className="flex-1 flex flex-col h-full bg-[#080c14]/95 border-2 border-cyan-900/60 rounded shadow-[0_0_40px_rgba(0,0,0,0.95)] overflow-hidden">
          
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-cyan-950 via-[#0a1120] to-cyan-950 border-b border-cyan-800/40 text-cyan-400 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              <span className="font-stencil tracking-widest uppercase">
                OFFICIAL CASE REPORT: {activeCase.year} // {activeCase.codename}
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] text-cyan-500/80">
              <span>CLEARANCE: LEVEL-4</span>
              <span className="px-2 py-0.5 bg-cyan-900/60 text-cyan-200 border border-cyan-600/30">
                {activeCase.status}
              </span>
            </div>
          </div>

          {/* Terminal Body (Scrollable with custom sleek scrollbar) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* 1. TOP 16:9 VIDEO HIGHLIGHT REEL */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-cyan-400">
                  <Film className="w-3.5 h-3.5" />
                  <span>VIDEO EVIDENCE // {activeCase.videoTitle}</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-500">PLAYBACK READY • 1080p 60fps</span>
              </div>

              <div className="relative aspect-video w-full bg-black rounded border border-cyan-800/50 overflow-hidden group shadow-2xl">
                <video
                  key={activeCase.id}
                  src={activeCase.videoUrl}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* CRT Scanline filter over video container */}
                <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
              </div>
            </div>

            {/* 2. CASE DOSSIER METADATA STRIP */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-black/60 border border-neutral-800 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-inkred shrink-0" />
                <div>
                  <span className="block text-[9px] text-neutral-500 uppercase">TIMESTAMP</span>
                  <span className="text-stark font-bold">{activeCase.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="block text-[9px] text-neutral-500 uppercase">LOCATION</span>
                  <span className="text-stark font-bold truncate">{activeCase.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="block text-[9px] text-neutral-500 uppercase">INVESTIGATOR</span>
                  <span className="text-stark font-bold truncate">{activeCase.leadInvestigator}</span>
                </div>
              </div>
            </div>

            {/* 3. CASE SUMMARY & TYPEWRITER CHRONO NOTES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Summary Card */}
              <div className="p-4 bg-black/50 border border-white/10 rounded space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-300 uppercase border-b border-neutral-800 pb-1.5">
                  <FileText className="w-3.5 h-3.5 text-inkred" />
                  <span>CASE SYNOPSIS</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                  {activeCase.summary}
                </p>
                {activeCase.solvedTime && (
                  <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>RECORD ESCAPE TIME: {activeCase.solvedTime}</span>
                  </div>
                )}
              </div>

              {/* Typewriter Chrono Log */}
              <div className="p-4 bg-black/70 border border-neutral-800 rounded space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase border-b border-neutral-800 pb-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>INCIDENT TIMELINE LOG</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-neutral-400">
                  {activeCase.caseNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">›</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. MEDIA GALLERY: POLAROIDS WITH MASONRY TAPE STYLING */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-300 uppercase border-b border-neutral-800 pb-1">
                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>EXHIBIT PHOTO MASONRY GALLERY ({activeCase.photos.length})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {activeCase.photos.map((photo, pIdx) => (
                  <motion.div
                    key={pIdx}
                    whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
                    style={{ transform: `rotate(${photo.rotation}deg)` }}
                    className="relative bg-[#f4f4f0] p-2 pb-5 shadow-2xl border border-neutral-300 transition-all duration-200"
                  >
                    {/* Scotch tape graphic on top */}
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/50 border border-black/10 shadow-sm backdrop-blur-sm" />

                    {/* Polaroid Image */}
                    <div className="aspect-square w-full overflow-hidden bg-black mb-2">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover filter contrast-110 grayscale-[15%] hover:grayscale-0 transition-all duration-300"
                      />
                    </div>

                    {/* Polaroid Caption */}
                    <p className="font-mono text-[10px] text-neutral-900 leading-tight font-bold">
                      {photo.caption}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
