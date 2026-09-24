import React, { useState } from 'react';
import { COMIC_PAGES } from '../data/comicScripts';
import { LivingPanel } from './LivingPanel';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Flame, 
  Layers, 
  BookOpen, 
  Compass, 
  Clock, 
  Tv,
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface LivingComicReaderProps {
  showDirectivesHUD: boolean;
  soundEnabled: boolean;
  crtFilterActive: boolean;
  onInspectMoment: (momentId: string) => void;
  onSwitchToScriptwriter: () => void;
}

export const LivingComicReader: React.FC<LivingComicReaderProps> = ({
  showDirectivesHUD,
  soundEnabled,
  crtFilterActive,
  onInspectMoment,
  onSwitchToScriptwriter,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const currentPage = COMIC_PAGES[currentPageIndex] || COMIC_PAGES[0];

  return (
    <div className={`relative max-w-6xl mx-auto py-4 sm:py-8 px-3 sm:px-6 transition-all ${
      crtFilterActive ? 'relative' : ''
    }`}>
      
      {/* 1989 CRT Scanline & Grain Overlay */}
      {crtFilterActive && (
        <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-60" />
          <div className="absolute top-4 right-4 text-emerald-400 font-mono text-xs px-2 py-1 bg-black/70 border border-emerald-500/50 rounded flex items-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            AVALON VTR-89 • QUADRUPLEX MASTER FEED
          </div>
        </div>
      )}

      {/* Comic Book Page Header Bar */}
      <div className="bg-neutral-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-neutral-800 shadow-2xl mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-950 font-bold font-['Bangers'] text-sm tracking-wide">
                ISSUE #1
              </span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/80">
                {currentPage.temporalCoordinate}
              </span>
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                {currentPage.locationHeader}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-['Bangers'] text-neutral-100 tracking-wide text-balance">
              {currentPage.pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-1">
              {currentPage.pageNotes}
            </p>
          </div>

          {/* Page Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              id="prev-page-btn"
              disabled={currentPageIndex === 0}
              onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
              className={`p-2.5 rounded-xl border flex items-center gap-1 text-xs font-mono transition-all ${
                currentPageIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-neutral-900 border-neutral-800 text-neutral-600'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700 hover:border-amber-400 shadow-md'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-1">
              {COMIC_PAGES.map((page, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPageIndex(idx)}
                  className={`w-8 h-8 rounded-lg font-['Bangers'] text-sm transition-all ${
                    currentPageIndex === idx
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/30 scale-105'
                      : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  P.{page.pageNumber}
                </button>
              ))}
            </div>

            <button
              id="next-page-btn"
              disabled={currentPageIndex === COMIC_PAGES.length - 1}
              onClick={() => setCurrentPageIndex((prev) => Math.min(COMIC_PAGES.length - 1, prev + 1))}
              className={`p-2.5 rounded-xl border flex items-center gap-1 text-xs font-mono transition-all ${
                currentPageIndex === COMIC_PAGES.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-neutral-900 border-neutral-800 text-neutral-600'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700 hover:border-amber-400 shadow-md'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Comic Page Canvas Grid */}
      <div className="relative bg-neutral-950 rounded-3xl p-4 sm:p-8 border-4 border-neutral-800 shadow-2xl">
        
        {/* Dynamic Cross-Panel Gutter Particles / Vapor */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-20">
          {/* Faint Steaming Pastry Particles */}
          <div className="absolute top-1/4 left-1/2 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
          {/* Ethereal Ghost Chips Halo */}
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        {/* The Comic Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative z-10">
          {currentPage.panels.map((panel) => (
            <LivingPanel
              key={panel.panelNumber}
              panel={panel}
              showDirectivesHUD={showDirectivesHUD}
              soundEnabled={soundEnabled}
              onInspectMoment={onInspectMoment}
            />
          ))}
        </div>

        {/* Page Footer Margins with Quick Nav */}
        <div className="mt-8 pt-4 border-t-2 border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-['Bangers'] text-amber-400 text-sm tracking-wider">
              AVALON PRESS NZ • LIVING HYPER-MEDIA ARTIFACT
            </span>
            <span>|</span>
            <span>Page {currentPage.pageNumber} of {COMIC_PAGES.length}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onSwitchToScriptwriter}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold underline transition-colors"
            >
              <span>View Professional Script Document</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Floating Instructions Tip */}
      <div className="mt-4 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-xs text-neutral-400 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Living Canvas Interactive Cues:</strong> Click "Peel" on any panel to expose the underlying technical script directives, click interactive buttons (e.g. <em>Blow on Pie</em>, <em>Dark Auto-Bid</em>, <em>Meltdown</em>), or hover to experience spatial audio synthesis.
          </span>
        </div>
      </div>

    </div>
  );
};
