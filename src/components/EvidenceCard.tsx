import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { EvidenceItem } from '../types';
import { sound } from '../audioEngine';
import { Search, Pin } from 'lucide-react';

interface EvidenceCardProps {
  evidence: EvidenceItem;
  onClick: () => void;
  isSelected: boolean;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  onClick,
  isSelected,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layoutId={`card-container-${evidence.id}`}
      style={{
        left: `${evidence.boardPos.xPercent}%`,
        top: `${evidence.boardPos.yPercent}%`,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isSelected ? 0 : 1,
        scale: 1,
        rotate: evidence.boardPos.rotation,
      }}
      transition={{ duration: 0.4 }}
      className="absolute w-56 md:w-64 lg:w-72 select-none cursor-pointer z-20 group"
      onClick={() => {
        sound.playTechClick(1.2);
        onClick();
      }}
      onMouseEnter={() => sound.playHoverTick()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: rotateX !== 0 ? 1.04 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="
          relative bg-[#18181b] border-2 border-neutral-700 
          group-hover:border-inkred transition-colors duration-150
          shadow-[8px_8px_0px_#000000,10px_10px_0px_rgba(229,9,20,0.5)]
          p-3 flex flex-col
        "
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)',
        }}
      >
        {/* Red Pin Anchor at top center */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-inkred shadow-[0_0_8px_rgba(229,9,20,0.9)] border-2 border-stark flex items-center justify-center">
            <Pin className="w-2.5 h-2.5 text-white" />
          </div>
          <div className="w-0.5 h-2 bg-neutral-400" />
        </div>

        {/* Card Header Tag */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2 pt-1">
          <span className="font-mono text-[10px] text-inkred font-bold tracking-widest uppercase">
            {evidence.tag}
          </span>
          <span className="font-mono text-[9px] text-neutral-400 tracking-wider">
            [INSPECT]
          </span>
        </div>

        {/* Visual Content: Image or Styled Memo Document */}
        {evidence.image ? (
          <div className="relative aspect-[4/3] w-full bg-black overflow-hidden border border-neutral-800">
            <img
              src={evidence.image}
              alt={evidence.title}
              className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-300"
            />
            {/* Visual scanline */}
            <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />

            {/* Hover magnifying overlay */}
            <div className="absolute inset-0 bg-inkred/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="p-2 bg-black/80 border border-inkred text-white flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase">
                <Search className="w-3 h-3 text-inkred" />
                <span>EXAMINE</span>
              </div>
            </div>
          </div>
        ) : (
          /* Memo Classified Document preview */
          <div className="relative aspect-[4/3] w-full bg-[#121214] border border-neutral-800 p-3 font-mono text-[10px] text-neutral-300 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between border-b border-neutral-700 pb-1 text-neutral-400 text-[9px]">
                <span>CONFIDENTIAL DEPT</span>
                <span className="text-inkred font-bold">CASE-804</span>
              </div>
              <p className="text-stark/90 leading-tight pt-1">
                MEMORANDUM: Incident in Suite 404. All personnel are directed to analyze evidence files immediately.
              </p>
              <div className="text-[8px] text-neutral-500 font-mono">
                &gt; RULE 1: Connect suspect alibis to forensics.<br/>
                &gt; RULE 2: Decrypt the restricted safe.
              </div>
            </div>
            <div className="flex justify-end">
              <div className="px-2 py-0.5 border border-inkred text-inkred font-stencil text-[10px] tracking-widest uppercase">
                CONFIDENTIAL
              </div>
            </div>
          </div>
        )}

        {/* Card Title & Snippet */}
        <div className="mt-2.5">
          <h3 className="font-stencil text-base text-stark tracking-wider uppercase truncate group-hover:text-inkred transition-colors">
            {evidence.title}
          </h3>
          <p className="font-mono text-[10px] text-neutral-400 mt-1 line-clamp-2 leading-tight">
            {evidence.shortSnippet}
          </p>
        </div>

        {/* Stamp Badge */}
        <div className="mt-2.5 flex items-center justify-between">
          <span
            className={`
              font-stencil text-[10px] tracking-widest px-2 py-0.5 border uppercase
              ${evidence.stampColor === 'red' ? 'border-inkred text-inkred bg-inkred/10' : 'border-amberdoc text-amberdoc bg-amberdoc/10'}
            `}
          >
            {evidence.stamp}
          </span>
          <span className="font-mono text-[9px] text-neutral-500">
            PIN #0{evidence.id.length}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
