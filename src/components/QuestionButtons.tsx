import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface QuestionButtonsProps {
  onAnswer: (answer: 'yes' | 'no') => void;
  yesLabel?: string;
  noLabel?: string;
  disabled?: boolean;
}

export const QuestionButtons: React.FC<QuestionButtonsProps> = ({
  onAnswer,
  yesLabel = '¡Sí!',
  noLabel = '¡No!',
  disabled = false
}) => {
  // Keyboard navigation support: 'S' or 'Y' or '1' -> Yes, 'N' or '2' -> No
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 's' || e.key === 'S' || e.key === 'y' || e.key === 'Y' || e.key === '1') {
        e.preventDefault();
        sounds.playClick();
        onAnswer('yes');
      } else if (e.key === 'n' || e.key === 'N' || e.key === '2') {
        e.preventDefault();
        sounds.playClick();
        onAnswer('no');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onAnswer]);

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full mt-2">
      {/* Botón Sí */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          sounds.playClick();
          onAnswer('yes');
        }}
        className="flex-1 group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-bold text-white bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-400/40 cursor-pointer disabled:opacity-50"
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors shadow-inner">
          <Check className="w-4 h-4 text-white stroke-[3]" />
        </span>
        <span>{yesLabel}</span>
        <span className="hidden sm:inline-block ml-1 text-xs px-2 py-0.5 rounded-md bg-black/30 text-cyan-200 border border-cyan-400/30 font-mono">
          S
        </span>
      </button>

      {/* Botón No */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          sounds.playClick();
          onAnswer('no');
        }}
        className="flex-1 group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 hover:from-rose-500 hover:to-red-500 active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(244,63,94,0.25)] hover:shadow-[0_0_25px_rgba(244,63,94,0.4)] border border-rose-400/40 cursor-pointer disabled:opacity-50"
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors shadow-inner">
          <X className="w-4 h-4 text-white stroke-[3]" />
        </span>
        <span>{noLabel}</span>
        <span className="hidden sm:inline-block ml-1 text-xs px-2 py-0.5 rounded-md bg-black/30 text-rose-200 border border-rose-400/30 font-mono">
          N
        </span>
      </button>
    </div>
  );
};
