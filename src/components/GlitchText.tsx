import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  return (
    <span 
      className={`relative inline-block chromatic-glitch glitch-active ${className}`} 
      data-text={text}
    >
      {text}
    </span>
  );
};
