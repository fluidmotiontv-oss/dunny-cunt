import React, { useState, useMemo } from 'react';
import { NZ_ARCHIVAL_MOMENTS } from '../data/archiveMoments';
import { ArchivalEntry, NZCategory } from '../types';
import { playProceduralSound } from '../utils/audioSynthesizer';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Volume2, 
  Layers, 
  Calendar, 
  User, 
  Quote, 
  Compass, 
  ExternalLink,
  BookOpen,
  Tv,
  Film,
  Radio,
  Share2,
  X
} from 'lucide-react';

interface ArchivalVaultProps {
  soundEnabled: boolean;
  onSendToScriptwriter: (moment: ArchivalEntry) => void;
  selectedMomentId?: string | null;
  onClearSelectedMoment?: () => void;
}

export const ArchivalVault: React.FC<ArchivalVaultProps> = ({
  soundEnabled,
  onSendToScriptwriter,
  selectedMomentId,
  onClearSelectedMoment,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalMoment, setActiveModalMoment] = useState<ArchivalEntry | null>(
    selectedMomentId
      ? NZ_ARCHIVAL_MOMENTS.find((m) => m.id === selectedMomentId) || null
      : null
  );

  const categories: { label: string; value: string; icon: any }[] = [
    { label: 'All 20 Moments', value: 'all', icon: Sparkles },
    { label: 'Classic TV & Film', value: 'Classic TV/Film', icon: Film },
    { label: 'Modern TV & Satire', value: 'Modern TV/Satire', icon: Tv },
    { label: 'Radio & Viral', value: 'Radio/Viral/Niche', icon: Radio },
    { label: 'Stand-up & Cult Ads', value: 'Stand-up & Ads', icon: Quote },
  ];

  const filteredMoments = useMemo(() => {
    return NZ_ARCHIVAL_MOMENTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.momentTitle.toLowerCase().includes(q) ||
        item.sourceAndYear.toLowerCase().includes(q) ||
        item.iconicQuote.toLowerCase().includes(q) ||
        item.keyCharacters.some((c) => c.toLowerCase().includes(q)) ||
        item.culturalSubtext.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handlePlayAudio = (presetKey?: string) => {
    if (soundEnabled && presetKey) {
      playProceduralSound(presetKey);
    } else if (soundEnabled) {
      playProceduralSound('default');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      
      {/* Header & Archival Vault Title */}
      <div className="bg-neutral-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-2xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded bg-amber-400 text-neutral-950 font-bold font-['Bangers'] text-sm tracking-wide">
                PHASE 1 RESEARCH SCHEMA
              </span>
              <span className="text-xs font-mono text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded border border-neutral-700">
                20 Iconic Kiwi Comedy Artifacts
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-['Bangers'] text-amber-400 tracking-wide">
              THE AOTEAROA COMEDY ARCHIVAL VAULT
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-sans mt-2 max-w-3xl leading-relaxed">
              Curated database of New Zealand’s most iconic, absurd, and culturally defining comedy moments—fully mapped with cultural subtext analyses and Living Comic Hyper-Media architecture directives.
            </p>
          </div>

          {/* Quick Stats Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0 font-mono text-center">
            <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <div className="text-xl font-bold text-amber-400">20</div>
              <div className="text-[10px] text-neutral-400">Curated Entries</div>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <div className="text-xl font-bold text-cyan-400">1975–2026</div>
              <div className="text-[10px] text-neutral-400">Timeline Span</div>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <div className="text-xl font-bold text-emerald-400">4 Pillars</div>
              <div className="text-[10px] text-neutral-400">Film, TV, Radio, Ads</div>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <div className="text-xl font-bold text-purple-400">100%</div>
              <div className="text-[10px] text-neutral-400">Living Directives</div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by quote, scene, comedian, subtext..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                      : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Grid of 20 Curated Archival Moments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMoments.map((moment, idx) => (
          <div
            key={moment.id}
            onClick={() => setActiveModalMoment(moment)}
            className="group relative rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-400/70 p-5 shadow-xl hover:shadow-2xl hover:shadow-amber-400/5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            {/* Top Bar with Number & Category */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-bold text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>

                <span className="text-[11px] font-mono text-neutral-400 px-2 py-0.5 rounded-full bg-neutral-950 border border-neutral-800">
                  {moment.sourceAndYear}
                </span>
              </div>

              {/* Moment Title */}
              <h3 className="font-['Bangers'] text-xl text-neutral-100 tracking-wide group-hover:text-amber-400 transition-colors leading-tight">
                {moment.momentTitle}
              </h3>

              {/* Characters */}
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono mt-2">
                <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{moment.keyCharacters.join(', ')}</span>
              </div>

              {/* The Iconic Beat / Quote in Callout Box */}
              <div className="my-3.5 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 relative">
                <Quote className="w-4 h-4 text-amber-400/50 absolute top-2.5 right-2.5" />
                <p className="text-xs font-sans text-amber-200 font-medium italic pr-4 line-clamp-3 leading-relaxed">
                  "{moment.iconicQuote}"
                </p>
              </div>

              {/* Cultural Subtext Teaser */}
              <p className="text-xs text-neutral-400 font-sans line-clamp-2 leading-relaxed">
                <strong className="text-neutral-300 font-mono">Subtext:</strong> {moment.culturalSubtext}
              </p>
            </div>

            {/* Bottom Action Footer */}
            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayAudio(moment.audioPresetKey);
                }}
                className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors"
                title="Play procedural audio layer cue"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Audio Cue</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSendToScriptwriter(moment);
                }}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold group-hover:translate-x-0.5 transition-all"
              >
                <span>Script Panel</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMoments.length === 0 && (
        <div className="text-center py-16 bg-neutral-900/40 rounded-3xl border border-neutral-800">
          <p className="text-neutral-400 font-mono text-sm">
            No iconic NZ moments found matching "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-amber-400 text-neutral-950 font-bold text-xs font-mono"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Comprehensive Modal Inspector for Selected Moment */}
      {activeModalMoment && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => {
            setActiveModalMoment(null);
            if (onClearSelectedMoment) onClearSelectedMoment();
          }}
        >
          <div 
            className="relative w-full max-w-2xl bg-neutral-900 border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-amber-400 text-neutral-950 font-bold text-xs font-mono">
                    ARCHIVE RECORD
                  </span>
                  <span className="text-xs font-mono text-cyan-400">
                    {activeModalMoment.sourceAndYear}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-['Bangers'] text-neutral-100 tracking-wide">
                  {activeModalMoment.momentTitle}
                </h2>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  Key Figures: {activeModalMoment.keyCharacters.join(', ')}
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveModalMoment(null);
                  if (onClearSelectedMoment) onClearSelectedMoment();
                }}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Iconic Quote Callout */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-amber-500/30 relative">
              <Quote className="w-6 h-6 text-amber-400/30 absolute top-3 right-3" />
              <div className="text-xs font-mono text-amber-400 font-bold mb-1">THE ICONIC BEAT:</div>
              <p className="text-sm sm:text-base font-sans text-amber-200 font-medium italic pr-6 leading-relaxed">
                "{activeModalMoment.iconicQuote}"
              </p>
            </div>

            {/* Kiwi Cultural Subtext Analysis */}
            <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800">
              <div className="text-xs font-mono text-cyan-400 font-bold mb-1.5 flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>KIWI CULTURAL SUBTEXT & COMEDIC MECHANICS</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                {activeModalMoment.culturalSubtext}
              </p>
            </div>

            {/* Living Comic Technical Architecture Blueprint */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-purple-500/30 space-y-3">
              <div className="text-xs font-mono text-purple-400 font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  LIVING COMIC HYPER-MEDIA DIRECTIVE
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  INTERACTIVE SPEC
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <span className="text-amber-400 font-bold block text-[11px] mb-1">PANEL STATE:</span>
                  <p className="text-neutral-300 text-[11px] leading-relaxed">{activeModalMoment.livingComicMechanic.panelState}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <span className="text-purple-400 font-bold block text-[11px] mb-1">AUDIO LAYER:</span>
                  <p className="text-neutral-300 text-[11px] leading-relaxed">{activeModalMoment.livingComicMechanic.audioLayer}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <span className="text-emerald-400 font-bold block text-[11px] mb-1">TACTILE DEPTH:</span>
                  <p className="text-neutral-300 text-[11px] leading-relaxed">{activeModalMoment.livingComicMechanic.tactileDepth}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <span className="text-rose-400 font-bold block text-[11px] mb-1">CROSS-PANEL BLEED:</span>
                  <p className="text-neutral-300 text-[11px] leading-relaxed">{activeModalMoment.livingComicMechanic.crossPanelBleed}</p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => handlePlayAudio(activeModalMoment.audioPresetKey)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono text-xs flex items-center justify-center gap-2"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Test Audio Layer Synthesizer</span>
              </button>

              <button
                onClick={() => {
                  onSendToScriptwriter(activeModalMoment);
                  setActiveModalMoment(null);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Convert to Script & Living Panel</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
