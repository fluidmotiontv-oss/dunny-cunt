import React, { useState, useRef } from 'react';
import { ComicPanel } from '../types';
import { playProceduralSound } from '../utils/audioSynthesizer';
import { 
  Sparkles, 
  Volume2, 
  Layers, 
  Flame, 
  Tv, 
  CheckCircle2, 
  Info,
  Radio,
  Eye,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LivingPanelProps {
  panel: ComicPanel;
  showDirectivesHUD: boolean;
  soundEnabled: boolean;
  onInspectMoment?: (momentId: string) => void;
}

export const LivingPanel: React.FC<LivingPanelProps> = ({
  panel,
  showDirectivesHUD,
  soundEnabled,
  onInspectMoment,
}) => {
  const [isPeeling, setIsPeeling] = useState(false);
  const [interactiveState, setInteractiveState] = useState<number>(0);
  const [thermalTemp, setThermalTemp] = useState<number>(89.4);
  const [isCoolingPie, setIsCoolingPie] = useState(false);
  const [biddingTimer, setBiddingTimer] = useState(42);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (soundEnabled && panel.iconicMomentRefId) {
      if (panel.iconicMomentRefId === 'always-blow-pie') playProceduralSound('police-pie');
      else if (panel.iconicMomentRefId === 'ghost-chips') playProceduralSound('ghost-chips');
      else if (panel.iconicMomentRefId === 'what-we-do-shadows-dark-bidding') playProceduralSound('vampire-trademe');
      else if (panel.iconicMomentRefId === 'fotc-band-meeting') playProceduralSound('band-meeting');
      else if (panel.iconicMomentRefId === 'taskmaster-david-correos') playProceduralSound('correos-meltdown');
      else if (panel.iconicMomentRefId === 'billy-t-james-giggle') playProceduralSound('billy-t-laugh');
      else if (panel.iconicMomentRefId === 'wellington-paranormal-bucket') playProceduralSound('wellington-paranormal');
      else playProceduralSound('default');
    }
  };

  const handleInteractiveTrigger = () => {
    setInteractiveState((prev) => prev + 1);

    if (panel.iconicMomentRefId === 'always-blow-pie') {
      setIsCoolingPie(true);
      if (soundEnabled) playProceduralSound('police-pie');
      setThermalTemp((prev) => Math.max(58.0, +(prev - 6.5).toFixed(1)));
      setTimeout(() => setIsCoolingPie(false), 800);
    } else if (panel.iconicMomentRefId === 'taskmaster-david-correos') {
      if (soundEnabled) playProceduralSound('correos-meltdown');
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#facc15', '#ef4444', '#8b5cf6', '#10b981'],
      });
    } else if (panel.iconicMomentRefId === 'billy-t-james-giggle') {
      if (soundEnabled) playProceduralSound('billy-t-laugh');
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#ffffff'],
      });
    } else if (panel.iconicMomentRefId === 'what-we-do-shadows-dark-bidding') {
      if (soundEnabled) playProceduralSound('vampire-trademe');
      setBiddingTimer((prev) => (prev > 5 ? prev - 5 : 45));
    } else if (panel.iconicMomentRefId === 'fotc-band-meeting') {
      if (soundEnabled) playProceduralSound('band-meeting');
    }
  };

  return (
    <div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className={`group relative rounded-2xl bg-neutral-900 border-2 transition-all duration-300 overflow-hidden shadow-xl ${
        isHovered
          ? 'border-amber-400/80 shadow-2xl shadow-amber-400/10 -translate-y-1'
          : 'border-neutral-800'
      } ${panel.layoutSpan || 'col-span-1'}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePos.y * 0.25}deg) rotateY(${mousePos.x * 0.25}deg)`
          : undefined,
      }}
    >
      {/* Top Panel Header / Number */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-neutral-950/80 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <span className="font-['Bangers'] text-sm tracking-wider px-2 py-0.5 rounded bg-amber-400 text-neutral-950 font-bold">
            PANEL {panel.panelNumber}
          </span>
          <span className="text-xs font-mono text-neutral-400 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {panel.title?.replace(`PANEL ${panel.panelNumber}: `, '') || `SCENE ${panel.panelNumber}`}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {panel.iconicMomentRefId && onInspectMoment && (
            <button
              onClick={() => onInspectMoment(panel.iconicMomentRefId!)}
              className="p-1 rounded bg-neutral-800/80 hover:bg-amber-400/20 text-neutral-300 hover:text-amber-300 text-[10px] flex items-center gap-1 transition-colors px-1.5"
              title="View in Archival Vault"
            >
              <Info className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline font-mono">Vault</span>
            </button>
          )}

          {/* Peel-Away Layer Switcher */}
          <button
            onClick={() => setIsPeeling(!isPeeling)}
            className={`p-1 rounded text-xs transition-colors flex items-center gap-1 ${
              isPeeling
                ? 'bg-cyan-400 text-neutral-950 font-bold'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-400'
            }`}
            title="Peel layer to reveal Archival Directives & Subtext"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono">{isPeeling ? 'Art' : 'Peel'}</span>
          </button>
        </div>
      </div>

      {/* Main Panel Canvas Area */}
      <div className="relative min-h-[260px] sm:min-h-[300px] p-4 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
        
        {/* Living Art Layer or Peel-Away Directives Layer */}
        {!isPeeling ? (
          <>
            {/* Dynamic Visual Backdrop Simulator */}
            <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
              {panel.iconicMomentRefId === 'always-blow-pie' && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.25),transparent_70%)] animate-pulse" />
              )}
              {panel.iconicMomentRefId === 'ghost-chips' && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.3),transparent_60%)]" />
              )}
              {panel.iconicMomentRefId === 'what-we-do-shadows-dark-bidding' && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.3),transparent_70%)]" />
              )}
              {panel.iconicMomentRefId === 'taskmaster-david-correos' && (
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#facc15_0,#facc15_10px,#000_10px,#000_20px)] opacity-10" />
              )}
              {panel.iconicMomentRefId === 'billy-t-james-giggle' && (
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(251,191,36,0.35)_10%,transparent_70%)] animate-ping" />
              )}
            </div>

            {/* Living Visual Simulation Box */}
            <div className="relative z-10 my-2 rounded-xl p-3 bg-neutral-950/70 border border-neutral-800 shadow-inner">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-medium">
                  <Tv className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span className="uppercase tracking-wider text-[11px]">Living Canvas</span>
                </div>

                {/* Living Directive Tag Pill */}
                <div className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-mono flex items-center gap-1 border border-neutral-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Active Loop
                </div>
              </div>

              {/* Dynamic Visual Stage Content based on scene */}
              <div className="py-2">
                {panel.iconicMomentRefId === 'always-blow-pie' && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-amber-950/30 border border-amber-500/30">
                    <div className="flex items-center gap-3">
                      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCoolingPie ? 'scale-110 bg-cyan-900/50' : 'bg-amber-500/20'
                      }`}>
                        <Flame className={`w-6 h-6 ${isCoolingPie ? 'text-cyan-400 animate-bounce' : 'text-amber-400 animate-pulse'}`} />
                        {/* Steaming Vapor Bleed */}
                        <div className="absolute -top-3 w-2 h-4 bg-amber-400/40 rounded-full blur-[2px] animate-bounce" />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-amber-300">
                          BIG BEN PIE THERMAL SENSOR
                        </div>
                        <div className="text-xs text-neutral-400">
                          Current Temp: <span className="font-mono text-amber-400 font-bold">{thermalTemp}°C</span> {thermalTemp > 65 ? '(THERMO-NUCLEAR)' : '(SAFE TO CONSUME)'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleInteractiveTrigger}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs font-mono shadow-md transition-transform active:scale-95"
                    >
                      {isCoolingPie ? 'Blowing...' : 'Blow On Pie'}
                    </button>
                  </div>
                )}

                {panel.iconicMomentRefId === 'ghost-chips' && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-400/40 animate-bounce">
                        <span className="text-2xl">👻🥔</span>
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-cyan-300">
                          MONIQUE'S SPECTRAL PACKET
                        </div>
                        <div className="text-xs text-neutral-400">
                          Status: Ready-Salted Ethereal Halo Active
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleInteractiveTrigger}
                      className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs font-mono shadow-md transition-transform active:scale-95"
                    >
                      Offer Ghost Chip
                    </button>
                  </div>
                )}

                {panel.iconicMomentRefId === 'what-we-do-shadows-dark-bidding' && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-purple-950/30 border border-purple-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-400/40">
                        <span className="text-xl font-mono text-purple-300">00:{biddingTimer < 10 ? `0${biddingTimer}` : biddingTimer}</span>
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-purple-300">
                          TRADEME: PINE COFFEE TABLE
                        </div>
                        <div className="text-xs text-neutral-400">
                          High Bidder: <span className="font-mono text-purple-300">Vlad_The_Poker ($14.50)</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleInteractiveTrigger}
                      className="px-3 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs font-mono shadow-md transition-transform active:scale-95"
                    >
                      Dark Auto-Bid
                    </button>
                  </div>
                )}

                {panel.iconicMomentRefId === 'taskmaster-david-correos' && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-rose-950/30 border border-rose-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-400/40 animate-pulse">
                        <span className="text-2xl">🍝🍇</span>
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-rose-300">
                          DAVID'S KINETIC METRIC
                        </div>
                        <div className="text-xs text-neutral-400">
                          Intensity: <span className="font-mono text-rose-400 font-bold">{400 + interactiveState * 150}% DIY Mayhem</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleInteractiveTrigger}
                      className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs font-mono shadow-md transition-transform active:scale-95"
                    >
                      Trigger Meltdown
                    </button>
                  </div>
                )}

                {panel.iconicMomentRefId === 'billy-t-james-giggle' && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-amber-950/30 border border-amber-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-400/40">
                        <span className="text-2xl animate-spin">😂</span>
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-amber-300">
                          BILLY T GIGGLE FREQUENCY
                        </div>
                        <div className="text-xs text-neutral-400">
                          Resonance: <span className="font-mono text-amber-400">He-he-he-he-he!</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleInteractiveTrigger}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs font-mono shadow-md transition-transform active:scale-95"
                    >
                      Chuckle Beat
                    </button>
                  </div>
                )}

                {panel.iconicMomentRefId === 'fotc-band-meeting' && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-400/40">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-emerald-300">
                          ROLL CALL STATUS
                        </div>
                        <div className="text-xs text-neutral-400">
                          Attendance: <span className="font-mono text-emerald-300">Bret & Jemaine (Present)</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleInteractiveTrigger}
                      className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold text-xs font-mono shadow-md transition-transform active:scale-95"
                    >
                      Tick Ledger
                    </button>
                  </div>
                )}

                {!['always-blow-pie', 'ghost-chips', 'what-we-do-shadows-dark-bidding', 'taskmaster-david-correos', 'billy-t-james-giggle', 'fotc-band-meeting'].includes(panel.iconicMomentRefId || '') && (
                  <p className="text-xs text-neutral-300 font-sans italic leading-relaxed">
                    {panel.visualDescription}
                  </p>
                )}
              </div>

              {/* Visual Description Excerpt */}
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed mt-1 line-clamp-2">
                {panel.visualDescription}
              </p>
            </div>

            {/* Dialogue & Speech Balloons */}
            <div className="space-y-2 mt-2">
              {panel.dialogue.map((line, idx) => (
                <div 
                  key={idx}
                  className={`p-2.5 rounded-xl text-xs sm:text-sm font-sans relative shadow-md transition-all ${
                    line.speaker.includes('KEVIN') || line.speaker.includes('NARRATOR')
                      ? 'bg-neutral-800 text-amber-200 border-l-4 border-amber-400'
                      : line.speaker.includes('BALDWIN') || line.speaker.includes('POLICE')
                      ? 'bg-blue-950/80 text-blue-100 border-l-4 border-blue-400'
                      : line.speaker.includes('MONIQUE')
                      ? 'bg-cyan-950/80 text-cyan-100 border-l-4 border-cyan-400'
                      : line.speaker.includes('VLADISLAV')
                      ? 'bg-purple-950/80 text-purple-100 border-l-4 border-purple-400'
                      : line.speaker.includes('CORREOS')
                      ? 'bg-rose-950/80 text-rose-100 border-l-4 border-rose-400'
                      : line.speaker.includes('BILLY')
                      ? 'bg-amber-950/80 text-amber-100 border-l-4 border-amber-400'
                      : 'bg-neutral-800 text-neutral-100 border-l-4 border-neutral-500'
                  }`}
                >
                  <span className="font-['Bangers'] tracking-wider text-xs block opacity-80 uppercase mb-0.5">
                    {line.speaker}:
                  </span>
                  <p className="font-medium leading-relaxed">"{line.text}"</p>
                </div>
              ))}
            </div>

            {/* SFX Audio / Visual Badge */}
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>{panel.sfx}</span>
              </div>

              {panel.interactiveTriggerLabel && (
                <button
                  onClick={handleInteractiveTrigger}
                  className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-[10px]"
                >
                  {panel.interactiveTriggerLabel}
                </button>
              )}
            </div>
          </>
        ) : (
          /* Peel-Away Technical Directive Layer */
          <div className="relative z-10 p-3 bg-neutral-950 rounded-xl border border-cyan-500/40 text-xs font-mono space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-900/50">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Layers className="w-4 h-4" />
                <span>LIVING CANVAS DIRECTIVE ARCHITECTURE</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                DIRECTOR SPEC
              </span>
            </div>

            <div>
              <span className="text-amber-400 font-bold block text-[11px]">PANEL STATE:</span>
              <p className="text-neutral-300 text-[11px] leading-relaxed">{panel.livingDirective.panelState}</p>
            </div>

            <div>
              <span className="text-purple-400 font-bold block text-[11px]">AUDIO LAYER:</span>
              <p className="text-neutral-300 text-[11px] leading-relaxed">{panel.livingDirective.audioLayer}</p>
            </div>

            <div>
              <span className="text-emerald-400 font-bold block text-[11px]">TACTILE / DEPTH:</span>
              <p className="text-neutral-300 text-[11px] leading-relaxed">{panel.livingDirective.tactileDepth}</p>
            </div>

            <div>
              <span className="text-rose-400 font-bold block text-[11px]">CROSS-PANEL BLEED:</span>
              <p className="text-neutral-300 text-[11px] leading-relaxed">{panel.livingDirective.crossPanelBleed}</p>
            </div>

            <button
              onClick={() => setIsPeeling(false)}
              className="w-full py-1.5 text-center bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded font-bold transition-colors"
            >
              Return to Living Comic Art
            </button>
          </div>
        )}

      </div>

      {/* Directives HUD Floating Bar when global HUD enabled */}
      {showDirectivesHUD && !isPeeling && (
        <div className="px-3 py-1.5 bg-neutral-950/95 border-t border-cyan-500/30 text-[10px] font-mono text-cyan-300 flex items-center justify-between">
          <div className="flex items-center gap-1.5 truncate">
            <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">{panel.livingDirective.panelState.slice(0, 70)}...</span>
          </div>
          <button
            onClick={() => setIsPeeling(true)}
            className="text-[10px] text-amber-400 underline hover:text-amber-300 shrink-0 ml-2"
          >
            Inspect
          </button>
        </div>
      )}
    </div>
  );
};
