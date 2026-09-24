import React, { useState, useEffect, useId } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sliders, 
  Radio, 
  Sparkles, 
  RotateCcw, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Music, 
  Info,
  Check
} from 'lucide-react';
import { 
  ATMOSPHERE_LAYERS, 
  PRESET_ATMOSPHERES, 
  AtmosphereLayerDef, 
  atmosphereEngine 
} from '../utils/ambientAudioEngine';
import { ComicPage } from '../types';

interface AudioAtmosphereMixerProps {
  currentPage?: ComicPage;
  className?: string;
}

export const AudioAtmosphereMixer: React.FC<AudioAtmosphereMixerProps> = ({
  currentPage,
  className = ''
}) => {
  // Global State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [masterVolume, setMasterVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('k-rd-midnight');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Urban' | 'Nature' | 'Broadcast' | 'Suburban'>('All');
  const [syncedNotice, setSyncedNotice] = useState<string | null>(null);

  // Layer State: { [layerId]: { enabled: boolean, volume: number } }
  const [layerStates, setLayerStates] = useState<Record<string, { enabled: boolean; volume: number }>>(() => {
    const initial: Record<string, { enabled: boolean; volume: number }> = {};
    ATMOSPHERE_LAYERS.forEach(l => {
      // Default to K' Rd preset active
      if (l.id === 'k-road-traffic' || l.id === 'static-radio') {
        initial[l.id] = { enabled: true, volume: l.defaultVolume };
      } else {
        initial[l.id] = { enabled: false, volume: l.defaultVolume };
      }
    });
    return initial;
  });

  // Simulated VU Meter LED Levels for Visual Feedback
  const [meterLevels, setMeterLevels] = useState<Record<string, number>>({});

  // Sync with engine when playing state changes
  useEffect(() => {
    if (isPlaying && !isMuted) {
      // Start all enabled layers
      Object.entries(layerStates).forEach(([id, state]: [string, { enabled: boolean; volume: number }]) => {
        if (state.enabled) {
          atmosphereEngine.startLayer(id, state.volume);
        } else {
          atmosphereEngine.stopLayer(id);
        }
      });
      atmosphereEngine.setMasterVolume(masterVolume);
      atmosphereEngine.setMasterMute(false);
    } else {
      atmosphereEngine.stopAllLayers();
    }

    return () => {
      // Cleanup on unmount
    };
  }, [isPlaying, isMuted]);

  // Master Volume update
  useEffect(() => {
    atmosphereEngine.setMasterVolume(masterVolume);
  }, [masterVolume]);

  // Master Mute update
  useEffect(() => {
    atmosphereEngine.setMasterMute(isMuted);
  }, [isMuted]);

  // Animated VU meters when playing
  useEffect(() => {
    if (!isPlaying || isMuted) {
      setMeterLevels({});
      return;
    }

    const interval = window.setInterval(() => {
      const updated: Record<string, number> = {};
      Object.entries(layerStates).forEach(([id, state]: [string, { enabled: boolean; volume: number }]) => {
        if (state.enabled) {
          // Dynamic pulsing meter calculation based on volume and random jitter
          const base = state.volume * 8;
          const jitter = (Math.random() * 3) - 1.5;
          updated[id] = Math.max(1, Math.min(8, Math.round(base + jitter)));
        } else {
          updated[id] = 0;
        }
      });
      setMeterLevels(updated);
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying, isMuted, layerStates]);

  // Toggle individual sound layer
  const handleToggleLayer = (layerId: string) => {
    setLayerStates(prev => {
      const curr = prev[layerId] || { enabled: false, volume: 0.5 };
      const nextEnabled = !curr.enabled;
      const updated = {
        ...prev,
        [layerId]: { ...curr, enabled: nextEnabled }
      };

      if (isPlaying && !isMuted) {
        if (nextEnabled) {
          atmosphereEngine.startLayer(layerId, curr.volume);
        } else {
          atmosphereEngine.stopLayer(layerId);
        }
      }

      return updated;
    });
    setSelectedPresetId('custom');
  };

  // Change volume for individual layer
  const handleLayerVolumeChange = (layerId: string, volume: number) => {
    setLayerStates(prev => {
      const curr = prev[layerId] || { enabled: false, volume: 0.5 };
      const updated = {
        ...prev,
        [layerId]: { ...curr, volume }
      };

      if (isPlaying && curr.enabled && !isMuted) {
        atmosphereEngine.setLayerVolume(layerId, volume);
      }

      return updated;
    });
  };

  // Load Preset Scene
  const handleSelectPreset = (presetId: string) => {
    const preset = PRESET_ATMOSPHERES.find(p => p.id === presetId);
    if (!preset) return;

    setSelectedPresetId(presetId);
    setLayerStates(prev => {
      const updated = { ...prev };
      ATMOSPHERE_LAYERS.forEach(l => {
        const presetConfig = preset.layers[l.id];
        if (presetConfig) {
          updated[l.id] = {
            enabled: presetConfig.enabled,
            volume: presetConfig.volume
          };
          if (isPlaying && !isMuted) {
            if (presetConfig.enabled) {
              atmosphereEngine.startLayer(l.id, presetConfig.volume);
            } else {
              atmosphereEngine.stopLayer(l.id);
            }
          }
        }
      });
      return updated;
    });
  };

  // Auto-sync with current script's Living Directives
  const handleSyncWithScript = () => {
    if (!currentPage) return;

    // Collect all audio layers from panels
    const audioDirectives = currentPage.panels
      .map(p => p.livingDirective.audioLayer.toLowerCase())
      .join(' ');

    const titleAndDesc = (currentPage.pageTitle + ' ' + currentPage.locationHeader + ' ' + currentPage.pageNotes).toLowerCase();
    const fullTextContext = `${audioDirectives} ${titleAndDesc}`;

    const newStates: Record<string, { enabled: boolean; volume: number }> = {};
    let matchedCount = 0;

    ATMOSPHERE_LAYERS.forEach(l => {
      const isMatched = l.tags.some(tag => fullTextContext.includes(tag));
      if (isMatched) {
        newStates[l.id] = { enabled: true, volume: l.defaultVolume };
        matchedCount++;
        if (isPlaying && !isMuted) {
          atmosphereEngine.startLayer(l.id, l.defaultVolume);
        }
      } else {
        newStates[l.id] = { enabled: false, volume: l.defaultVolume };
        if (isPlaying && !isMuted) {
          atmosphereEngine.stopLayer(l.id);
        }
      }
    });

    // If nothing matched, fallback to gentle static/traffic
    if (matchedCount === 0) {
      newStates['static-radio'] = { enabled: true, volume: 0.4 };
      if (isPlaying && !isMuted) {
        atmosphereEngine.startLayer('static-radio', 0.4);
      }
    }

    setLayerStates(prev => ({ ...prev, ...newStates }));
    setSelectedPresetId('script-synced');
    setSyncedNotice(`Atmosphere auto-matched to Page ${currentPage.pageNumber} directives!`);
    setTimeout(() => setSyncedNotice(null), 3000);

    // Auto-start playback if not playing
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const handleResetMixer = () => {
    handleSelectPreset('k-rd-midnight');
  };

  const activeLayersCount = (Object.values(layerStates) as { enabled: boolean; volume: number }[]).filter(s => s.enabled).length;
  const filteredLayers = activeCategory === 'All' 
    ? ATMOSPHERE_LAYERS 
    : ATMOSPHERE_LAYERS.filter(l => l.category === activeCategory);

  return (
    <div className={`rounded-3xl bg-neutral-900/95 border-2 border-amber-400/40 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 ${className}`}>
      
      {/* Console Top Header Bar */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-md shadow-amber-400/10">
            <Radio className={`w-5 h-5 ${isPlaying ? 'animate-pulse text-amber-300' : 'text-amber-400'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-400 text-neutral-950 font-bold font-['Bangers'] text-xs tracking-wider">
                ATMOSPHERE MIXER
              </span>
              <span className="text-[11px] font-mono text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded border border-neutral-700">
                Procedural NZ Soundscapes
              </span>
              {isPlaying && (
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE ON AIR ({activeLayersCount} LAYERS)
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-100 mt-0.5">
              NZ Soundscapes & Living Script Atmosphere Engine
            </h3>
          </div>
        </div>

        {/* Global Controls & Toggle */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          {/* Master Play/Pause Button */}
          <button
            id="atmosphere-master-play-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-lg cursor-pointer ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/25 ring-1 ring-rose-400/50'
                : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-amber-400/25 ring-1 ring-amber-400/50'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>MUTE ATMOSPHERE</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>START SOUNDSCAPE</span>
              </>
            )}
          </button>

          {/* Sync with Script Button */}
          {currentPage && (
            <button
              id="sync-script-atmosphere-btn"
              onClick={handleSyncWithScript}
              title="Auto-match ambient layers to current comic page's Audio Layer directives"
              className="px-3 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/60 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Sync Script Directives</span>
              <span className="md:hidden">Sync</span>
            </button>
          )}

          {/* Collapse/Expand Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-colors"
            title={isCollapsed ? 'Expand Mixer' : 'Collapse Mixer'}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Synced Notice Alert */}
      {syncedNotice && (
        <div className="bg-cyan-950/80 border-b border-cyan-500/30 px-6 py-2 text-xs font-mono text-cyan-300 flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-cyan-400" />
          <span>{syncedNotice}</span>
        </div>
      )}

      {/* Collapsed Mini-HUD Bar */}
      {isCollapsed ? (
        <div className="p-4 bg-neutral-950 flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3 overflow-x-auto">
            <span className="text-neutral-400">Active Layers:</span>
            {ATMOSPHERE_LAYERS.filter(l => layerStates[l.id]?.enabled).map(l => (
              <span key={l.id} className="px-2 py-0.5 rounded bg-neutral-800 text-amber-300 border border-neutral-700 text-[11px] flex items-center gap-1 shrink-0">
                <span>{l.icon}</span>
                <span>{l.name}</span>
              </span>
            ))}
            {activeLayersCount === 0 && (
              <span className="text-neutral-500 italic">No layers active</span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-neutral-500">Master Vol:</span>
            <span className="text-amber-400 font-bold">{Math.round(masterVolume * 100)}%</span>
            <button
              onClick={() => setIsCollapsed(false)}
              className="text-xs text-amber-400 hover:underline ml-2"
            >
              Open Full Console
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Top Control Strip: Presets & Master Channel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
            
            {/* Presets Quick Selector */}
            <div className="lg:col-span-2 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  Authentic NZ Scene Presets
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">
                  Instant atmospheric sonic snapshots
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PRESET_ATMOSPHERES.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      id={`preset-btn-${preset.id}`}
                      onClick={() => handleSelectPreset(preset.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400/80 text-amber-300 shadow-md shadow-amber-400/10 ring-1 ring-amber-400/40'
                          : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:bg-neutral-800/60'
                      }`}
                    >
                      <div className="text-xs font-bold truncate">
                        {preset.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono truncate mt-0.5">
                        {preset.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Master Channel Strip */}
            <div className="space-y-3 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Master Output Channel
                </span>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isMuted
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-neutral-200'
                  }`}
                  title={isMuted ? 'Unmute Master' : 'Mute Master'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Master Volume Fader */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">Master Level</span>
                  <span className="text-amber-400 font-bold">{Math.round(masterVolume * 100)}%</span>
                </div>
                <input
                  id="atmosphere-master-volume-slider"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={masterVolume}
                  onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* Master VU Indicator */}
              <div className="flex items-center justify-between gap-1 pt-1">
                <span className="text-[10px] font-mono text-neutral-500">VU L/R</span>
                <div className="flex items-center gap-1 flex-1 max-w-[140px]">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => {
                    const activeBarCount = isPlaying && !isMuted ? Math.round(masterVolume * 8) : 0;
                    const isLit = bar <= activeBarCount;
                    const color = bar > 6 ? 'bg-rose-500' : bar > 4 ? 'bg-amber-400' : 'bg-emerald-400';
                    return (
                      <div
                        key={bar}
                        className={`h-2 flex-1 rounded-sm transition-all duration-75 ${
                          isLit ? color : 'bg-neutral-800'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400 uppercase">Filter Layers:</span>
              {(['All', 'Urban', 'Nature', 'Broadcast', 'Suburban'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    activeCategory === cat
                      ? 'bg-amber-400 text-neutral-950 font-bold'
                      : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={handleResetMixer}
              className="text-xs font-mono text-neutral-500 hover:text-neutral-300 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Mix</span>
            </button>
          </div>

          {/* Individual Atmosphere Fader Strips */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredLayers.map((layer) => {
              const state = layerStates[layer.id] || { enabled: false, volume: layer.defaultVolume };
              const currentMeter = meterLevels[layer.id] || 0;

              return (
                <div
                  key={layer.id}
                  id={`layer-strip-${layer.id}`}
                  className={`p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                    state.enabled
                      ? 'bg-neutral-950 border-amber-400/70 shadow-lg shadow-amber-400/5 ring-1 ring-amber-400/30'
                      : 'bg-neutral-950/70 border-neutral-800/80 opacity-80 hover:opacity-100 hover:border-neutral-700'
                  }`}
                >
                  {/* Layer Header */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{layer.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-neutral-100 leading-tight">
                            {layer.name}
                          </div>
                          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                            {layer.category} Layer
                          </span>
                        </div>
                      </div>

                      {/* On/Off Toggle Button */}
                      <button
                        id={`toggle-layer-${layer.id}`}
                        onClick={() => handleToggleLayer(layer.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
                          state.enabled
                            ? 'bg-amber-400 text-neutral-950 border-amber-300 shadow-md shadow-amber-400/20'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-neutral-200'
                        }`}
                      >
                        {state.enabled ? 'ACTIVE' : 'MUTE'}
                      </button>
                    </div>

                    <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed mt-1">
                      {layer.tagline}
                    </p>
                  </div>

                  {/* Fader & LED Level Meter */}
                  <div className="space-y-2 mt-4 pt-3 border-t border-neutral-900">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-500">Volume</span>
                      <span className={state.enabled ? 'text-amber-400 font-bold' : 'text-neutral-600'}>
                        {Math.round(state.volume * 100)}%
                      </span>
                    </div>

                    <input
                      id={`volume-slider-${layer.id}`}
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={state.volume}
                      disabled={!state.enabled}
                      onChange={(e) => handleLayerVolumeChange(layer.id, parseFloat(e.target.value))}
                      className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${
                        state.enabled
                          ? 'bg-neutral-800 accent-amber-400'
                          : 'bg-neutral-900 accent-neutral-700 cursor-not-allowed'
                      }`}
                    />

                    {/* Mini Meter LEDs */}
                    <div className="flex items-center justify-between gap-1 pt-1">
                      <div className="flex items-center gap-1 flex-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => {
                          const isLit = state.enabled && isPlaying && bar <= currentMeter;
                          const color = bar > 6 ? 'bg-rose-500' : bar > 4 ? 'bg-amber-400' : 'bg-emerald-400';
                          return (
                            <div
                              key={bar}
                              className={`h-1.5 flex-1 rounded-sm transition-all duration-75 ${
                                isLit ? color : 'bg-neutral-900'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Lore Tooltip / Note */}
                  <div className="mt-3 pt-2 border-t border-neutral-900 text-[10px] text-neutral-400 font-sans italic flex items-start gap-1">
                    <Info className="w-3 h-3 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{layer.culturalNote}</span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
