import React, { useState } from 'react';
import { Sparkles, Flame, Volume2, Radio, Zap, AlertCircle, Quote } from 'lucide-react';
import { playProceduralSound } from '../utils/audioSynthesizer';

interface BrandHeroMottoProps {
  soundEnabled?: boolean;
  onNavigateToTab?: (tab: any) => void;
}

export const BrandHeroMotto: React.FC<BrandHeroMottoProps> = ({
  soundEnabled = true,
  onNavigateToTab
}) => {
  const [isPlayingSting, setIsPlayingSting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleTriggerBrandSting = () => {
    if (!soundEnabled) return;
    setIsPlayingSting(true);
    const sounds = ['billy-t-laugh', 'police-pie', 'trademe-bid', 'ghost-chips'];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    playProceduralSound(randomSound);
    setTimeout(() => setIsPlayingSting(false), 900);
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-b border-amber-500/30 overflow-hidden shadow-2xl">
      {/* Background Graphic Halftone / Texture Noise & Subtle Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
          
          {/* Main Slogan Banner Callout */}
          <div 
            onClick={handleTriggerBrandSting}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative cursor-pointer select-none w-full lg:w-auto flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-neutral-900/90 border-2 border-amber-400/40 hover:border-amber-400 transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:shadow-[0_0_35px_rgba(245,158,11,0.3)]"
          >
            {/* Stamp Tag */}
            <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded bg-amber-400 text-neutral-950 font-mono font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-md transform -rotate-1 border border-neutral-950">
              AVALON LIVING ARCHIVE MOTTO • 1975–2026
            </div>

            {/* Icon / Sound Burst */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-rose-600 p-[2px] shrink-0 shadow-lg ${isPlayingSting ? 'animate-bounce' : 'group-hover:scale-105'} transition-transform`}>
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                <Quote className="w-6 h-6 text-amber-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>

            {/* Stylized High-Impact Typography */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1">
                  <Flame className="w-3 h-3 animate-pulse text-rose-500" />
                  OFFICIAL CODEX GREETING
                </span>
                <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
                  (click for archival sting)
                </span>
              </div>
              
              {/* Slogan Text in stylized Permanent Marker & Bangers fonts */}
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl tracking-tight text-white leading-tight">
                <span className="font-['Permanent_Marker'] text-amber-400 drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)] mr-2">
                  "think youre fukn funny cu-nt....
                </span>
                <span className="font-['Bangers'] text-rose-400 tracking-wider text-2xl sm:text-3xl lg:text-4xl drop-shadow-[0_2px_12px_rgba(244,63,94,0.4)]">
                  check this out"
                </span>
              </h1>
            </div>

            {/* Audio Indicator */}
            {soundEnabled && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800/80 border border-neutral-700 text-neutral-300 text-xs font-mono group-hover:text-amber-400 group-hover:border-amber-400/40 transition-colors shrink-0">
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingSting ? 'text-amber-400 animate-spin' : 'text-neutral-400'}`} />
                <span>Audio Sting</span>
              </div>
            )}
          </div>

          {/* Quick Cultural Lore Pillars */}
          <div className="flex items-center gap-2 shrink-0 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none text-xs font-mono font-semibold">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-amber-300 shrink-0">
              <span className="text-base">🥧</span>
              <span>Pastry Thermo-Nuclear</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-rose-300 shrink-0">
              <span className="text-base">🧛</span>
              <span>Flatmate Chore Wheel</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-emerald-300 shrink-0">
              <span className="text-base">🌾</span>
              <span>No. 8 Wire Gumboot</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
