import React from 'react';

interface SpeechBubbleProps {
  text: string;
  stepNumber?: number;
  highlight?: boolean;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  stepNumber,
  highlight = false
}) => {
  return (
    <div className="relative w-full my-4">
      {/* Speech pointer arrow pointing to avatar with border */}
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-cyan-500/40" />
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-7 border-x-transparent border-b-7 border-b-[#0b1428]" />

      {/* Bubble box */}
      <div
        className={`relative w-full p-5 sm:p-6 rounded-2xl bg-[#0b1428]/85 border shadow-2xl backdrop-blur-md transition-all duration-300 text-center ${
          highlight
            ? 'border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)] bg-[#0d1832]/90'
            : 'border-cyan-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.6)]'
        }`}
      >
        {stepNumber !== undefined && (
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 mb-2.5 rounded-full text-xs font-semibold bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Pregunta #{stepNumber}</span>
          </div>
        )}

        <p className="text-lg sm:text-xl font-medium text-slate-100 tracking-wide leading-relaxed min-h-[50px] flex items-center justify-center">
          {text}
        </p>
      </div>
    </div>
  );
};
