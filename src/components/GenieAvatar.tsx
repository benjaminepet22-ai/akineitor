import React from 'react';
import { Sparkles, Brain, HelpCircle, Trophy, Lightbulb } from 'lucide-react';

export type GenieMood = 'idle' | 'thinking' | 'inquiring' | 'confident' | 'guessing' | 'victory' | 'surprised' | 'learning';

interface GenieAvatarProps {
  mood: GenieMood;
}

export const GenieAvatar: React.FC<GenieAvatarProps> = ({ mood }) => {
  // Determine avatar face and colors based on mood
  const getAvatarFace = () => {
    switch (mood) {
      case 'guessing':
        return '🔮';
      case 'thinking':
        return '🤔';
      case 'inquiring':
        return '🧐';
      case 'confident':
        return '😏';
      case 'victory':
        return '🎉';
      case 'surprised':
        return '😮';
      case 'learning':
        return '🧠';
      case 'idle':
      default:
        return '🧞‍♂️';
    }
  };

  const getAuraColor = () => {
    switch (mood) {
      case 'victory':
        return 'from-cyan-400/40 via-emerald-500/25 to-transparent';
      case 'surprised':
      case 'learning':
        return 'from-amber-400/35 via-cyan-500/20 to-transparent';
      case 'guessing':
        return 'from-cyan-400/50 via-blue-500/30 to-transparent';
      case 'thinking':
      default:
        return 'from-cyan-500/35 via-blue-600/20 to-transparent';
    }
  };

  const getSubBadge = () => {
    switch (mood) {
      case 'victory':
        return { icon: Trophy, label: '¡Victoria!', color: 'bg-gradient-to-r from-cyan-500 to-emerald-400 text-[#050b18] border border-cyan-300' };
      case 'learning':
        return { icon: Brain, label: 'Aprendiendo', color: 'bg-gradient-to-r from-amber-400 to-yellow-300 text-[#050b18] border border-amber-200' };
      case 'guessing':
        return { icon: Lightbulb, label: '¡Adivinanza!', color: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border border-cyan-300' };
      case 'thinking':
        return { icon: HelpCircle, label: 'Analizando', color: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border border-cyan-400/50' };
      default:
        return { icon: Sparkles, label: 'Oráculo IA', color: 'bg-gradient-to-r from-cyan-400 to-sky-300 text-[#050b18] border border-cyan-200' };
    }
  };

  const badge = getSubBadge();
  const BadgeIcon = badge.icon;

  return (
    <div className="relative flex flex-col items-center justify-center my-3 select-none">
      {/* Outer magical glow aura */}
      <div
        className={`absolute -inset-6 rounded-full bg-radial ${getAuraColor()} blur-2xl transition-all duration-700 animate-cyber-pulse`}
      />

      {/* Outer rotating cyber ring */}
      <div className="absolute -inset-3 rounded-full border border-cyan-500/20 border-dashed animate-spin-slow pointer-events-none" />

      {/* Main Avatar Circle */}
      <div className="relative z-10 flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-[#0e1f3a] via-[#071326] to-[#040814] border-2 border-cyan-400/70 shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-transform duration-300 hover:scale-105">
        {/* Subtle inner high-tech ring */}
        <div className="absolute inset-1.5 rounded-full border border-cyan-400/25 pointer-events-none" />
        <div className="absolute inset-3 rounded-full border border-blue-500/15 pointer-events-none" />

        {/* Emoji face with animated float */}
        <span className="text-5xl sm:text-6xl transition-transform duration-300 animate-bounce duration-1000 filter drop-shadow-[0_4px_12px_rgba(6,182,212,0.4)]">
          {getAvatarFace()}
        </span>

        {/* Mini badge on corner */}
        <div
          className={`absolute -bottom-1.5 -right-1.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-[0_2px_10px_rgba(0,0,0,0.5)] ${badge.color}`}
        >
          <BadgeIcon className="w-3 h-3 shrink-0" />
          <span>{badge.label}</span>
        </div>
      </div>
    </div>
  );
};
