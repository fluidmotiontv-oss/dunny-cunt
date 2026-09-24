import React from 'react';
import { 
  BookOpen, 
  Archive, 
  FileText, 
  Compass, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Tv, 
  HelpCircle,
  Flame
} from 'lucide-react';

export type ActiveTab = 'reader' | 'mashups' | 'archive' | 'script' | 'lore' | 'glossary';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  crtFilterActive: boolean;
  setCrtFilterActive: (active: boolean) => void;
  showDirectivesHUD: boolean;
  setShowDirectivesHUD: (show: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  crtFilterActive,
  setCrtFilterActive,
  showDirectivesHUD,
  setShowDirectivesHUD,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Logo / Branding */}
          <div 
            onClick={() => setActiveTab('reader')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 via-rose-500 to-indigo-600 p-[2px] shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                <Tv className="w-5 h-5 text-amber-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Bangers'] text-xl sm:text-2xl tracking-wide text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  NZ COMEDY
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono font-bold border border-amber-400/30">
                  LIVING COMIC
                </span>
              </div>
              <p className="text-[11px] text-amber-400 font-['Permanent_Marker'] hidden sm:block">
                "think youre fukn funny cu-nt.... check this out"
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none">
            <button
              id="nav-tab-reader"
              onClick={() => setActiveTab('reader')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'reader'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Living Reader</span>
            </button>

            <button
              id="nav-tab-mashups"
              onClick={() => setActiveTab('mashups')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'mashups'
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold shadow-md shadow-rose-500/25'
                  : 'text-rose-300 hover:text-white hover:bg-rose-950/40 border border-rose-500/30'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>3-Min Mash-Ups</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono font-bold">
                180s
              </span>
            </button>

            <button
              id="nav-tab-archive"
              onClick={() => setActiveTab('archive')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'archive'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Archive className="w-4 h-4" />
              <span>20 Moments Vault</span>
            </button>

            <button
              id="nav-tab-script"
              onClick={() => setActiveTab('script')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'script'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Scriptwriter Studio</span>
            </button>

            <button
              id="nav-tab-lore"
              onClick={() => setActiveTab('lore')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'lore'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Delica Lore</span>
            </button>

            <button
              id="nav-tab-glossary"
              onClick={() => setActiveTab('glossary')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'glossary'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Kiwi Cultural</span> Glossary
            </button>
          </nav>

          {/* Quick HUD Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Directives HUD Toggle */}
            <button
              id="toggle-hud-btn"
              onClick={() => setShowDirectivesHUD(!showDirectivesHUD)}
              title="Toggle Living Canvas Directives (Technical HUD annotations)"
              className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1 transition-all ${
                showDirectivesHUD
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline">HUD</span>
            </button>

            {/* CRT TV Filter Toggle */}
            <button
              id="toggle-crt-btn"
              onClick={() => setCrtFilterActive(!crtFilterActive)}
              title="Toggle 1989 Avalon CRT Scanline Filter"
              className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1 transition-all ${
                crtFilterActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-200'
              }`}
            >
              <Flame className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">CRT '89</span>
            </button>

            {/* Spatial Sound FX Toggle */}
            <button
              id="toggle-sound-btn"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute Procedural Web Audio' : 'Unmute Procedural Web Audio'}
              className={`p-2 rounded-lg border text-xs transition-all ${
                soundEnabled
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                  : 'bg-neutral-900 text-neutral-500 border-neutral-800'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-neutral-500" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
