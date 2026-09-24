import React from 'react';
import { FRAMING_DEVICE_LORE } from '../data/framingDevice';
import { 
  Compass, 
  Tv, 
  Truck, 
  Ghost, 
  ClipboardCheck, 
  Flame, 
  ShieldAlert, 
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface FramingLoreDossierProps {
  onStartReading: () => void;
}

export const FramingLoreDossier: React.FC<FramingLoreDossierProps> = ({
  onStartReading,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tv': return <Tv className="w-6 h-6 text-amber-400" />;
      case 'Ghost': return <Ghost className="w-6 h-6 text-cyan-400" />;
      case 'ClipboardCheck': return <ClipboardCheck className="w-6 h-6 text-emerald-400" />;
      case 'Truck': return <Truck className="w-6 h-6 text-purple-400" />;
      default: return <Compass className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-neutral-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded bg-amber-400 text-neutral-950 font-bold font-['Bangers'] text-sm tracking-wide">
              OVERARCHING NARRATIVE FRAMING LORE
            </span>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
              {FRAMING_DEVICE_LORE.codename}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-['Bangers'] text-amber-400 tracking-wide">
            {FRAMING_DEVICE_LORE.title.toUpperCase()}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-500/40">
              OFFICIAL ARCHIVE MOTTO: "Think you're funny? Check this out."
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 font-mono mt-1.5">
            Origin: {FRAMING_DEVICE_LORE.location} • {FRAMING_DEVICE_LORE.originYear}
          </p>
        </div>

        <button
          onClick={onStartReading}
          className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold font-mono text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 shrink-0 self-start md:self-auto"
        >
          <BookOpen className="w-4 h-4" />
          <span>Launch Living Comic Reader</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Premise Dossier Breakdown */}
      <div className="bg-neutral-950 rounded-3xl p-6 sm:p-8 border-2 border-neutral-800 shadow-xl space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
          <Flame className="w-5 h-5 text-amber-400" />
          <h2 className="font-['Bangers'] text-2xl text-neutral-100 tracking-wide">
            THE ARCHIVAL SINGULARITY PREMISE
          </h2>
        </div>

        <div className="prose prose-invert max-w-none text-sm sm:text-base text-neutral-300 font-sans leading-relaxed whitespace-pre-line">
          {FRAMING_DEVICE_LORE.premise}
        </div>
      </div>

      {/* Main Cast of the Continuum */}
      <div className="space-y-4">
        <h2 className="font-['Bangers'] text-2xl text-amber-400 tracking-wide flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          PERSONNEL DOSSIER (THE DELICA CREW)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FRAMING_DEVICE_LORE.mainCharacters.map((char, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 transition-all shadow-md flex gap-4 items-start"
            >
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 shrink-0">
                {getIcon(char.icon)}
              </div>
              <div className="space-y-1">
                <h3 className="font-['Bangers'] text-lg text-neutral-100 tracking-wide">
                  {char.name}
                </h3>
                <div className="text-xs font-mono font-bold text-amber-400">
                  {char.role}
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed pt-1">
                  {char.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cosmic Rules of the Kiwi Comedy Multiverse */}
      <div className="bg-neutral-950 rounded-3xl p-6 sm:p-8 border-2 border-neutral-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          <h2 className="font-['Bangers'] text-2xl text-neutral-100 tracking-wide">
            THE 5 FUNDAMENTAL LAWS OF THE KIWI LIVING COMIC CONTINUUM
          </h2>
        </div>

        <div className="space-y-3 font-mono text-xs sm:text-sm">
          {FRAMING_DEVICE_LORE.multiverseRules.map((rule, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 text-neutral-300 leading-relaxed"
            >
              {rule}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
