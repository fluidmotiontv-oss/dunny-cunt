import React, { useState, useEffect, useRef } from 'react';
import { ComicPage, ComicPanel } from '../types';
import { 
  KIWI_ACCENT_PROFILES, 
  KiwiAccentVoiceProfile, 
  NarrationQueueItem, 
  getBestVoice, 
  playComicPanelChime 
} from '../utils/kiwiSpeechEngine';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square, 
  SkipForward, 
  SkipBack, 
  Sliders, 
  Mic, 
  Radio, 
  Sparkles, 
  Check, 
  Layers, 
  MessageSquare, 
  Film, 
  RefreshCw,
  Zap,
  Info,
  ChevronRight,
  Headphones
} from 'lucide-react';

interface KiwiNarrationVoiceStudioProps {
  currentPage?: ComicPage;
  highlightedPanelIndex?: number | null;
  onPanelFocus?: (panelNumber: number) => void;
}

export const KiwiNarrationVoiceStudio: React.FC<KiwiNarrationVoiceStudioProps> = ({
  currentPage,
  highlightedPanelIndex,
  onPanelFocus,
}) => {
  // Available system voices
  const [systemVoices, setSystemVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeechSupported, setIsSpeechSupported] = useState<boolean>(true);

  // Active Selected Kiwi Accent Profile
  const [selectedProfileId, setSelectedProfileId] = useState<string>('westie');
  
  // Custom speech adjustments
  const activeProfile = KIWI_ACCENT_PROFILES.find(p => p.id === selectedProfileId) || KIWI_ACCENT_PROFILES[0];
  const [customRate, setCustomRate] = useState<number>(activeProfile.rate);
  const [customPitch, setCustomPitch] = useState<number>(activeProfile.pitch);
  const [volume, setVolume] = useState<number>(1.0);
  const [enableInflections, setEnableInflections] = useState<boolean>(true);
  const [enablePanelChimes, setEnablePanelChimes] = useState<boolean>(true);

  // Narration Scope Mode: 'full' | 'dialogue-only' | 'directives-only' | 'current-panel'
  const [narrationMode, setNarrationMode] = useState<'full' | 'dialogue-only' | 'directives-only' | 'current-panel'>('full');

  // Playback State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentQueueIndex, setCurrentQueueIndex] = useState<number>(0);
  const [previewingProfileId, setPreviewingProfileId] = useState<string | null>(null);

  // Ref to hold utterance queue and track active state without race conditions
  const queueRef = useRef<NarrationQueueItem[]>([]);
  const isPlayingRef = useRef<boolean>(false);
  const currentIndexRef = useRef<number>(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Sync profile defaults when profile changes
  useEffect(() => {
    setCustomRate(activeProfile.rate);
    setCustomPitch(activeProfile.pitch);
  }, [selectedProfileId]);

  // Load system voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeechSupported(false);
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setSystemVoices(voices);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Build the Narration Queue based on currentPage and narrationMode
  const buildNarrationQueue = (): NarrationQueueItem[] => {
    if (!currentPage) return [];
    const queue: NarrationQueueItem[] = [];

    // Title / Location Header
    if (narrationMode === 'full') {
      queue.push({
        id: 'title',
        type: 'title',
        text: `Living Comic Script. Page ${currentPage.pageNumber}. ${currentPage.pageTitle}.`,
        cleanUtteranceText: `Living Comic Script. Page ${currentPage.pageNumber}. ${currentPage.pageTitle}.`,
      });
      queue.push({
        id: 'location',
        type: 'location',
        text: `${currentPage.locationHeader}. ${currentPage.temporalCoordinate}.`,
        cleanUtteranceText: `Setting: ${currentPage.locationHeader}. Time coordinate: ${currentPage.temporalCoordinate}.`,
      });
    }

    // Panels to process
    let targetPanels = currentPage.panels;
    if (narrationMode === 'current-panel' && typeof highlightedPanelIndex === 'number' && currentPage.panels[highlightedPanelIndex]) {
      targetPanels = [currentPage.panels[highlightedPanelIndex]];
    }

    targetPanels.forEach((panel) => {
      // Panel announcement
      if (narrationMode === 'full' || narrationMode === 'current-panel') {
        queue.push({
          id: `p-${panel.panelNumber}-header`,
          type: 'panel-header',
          panelNumber: panel.panelNumber,
          text: `PANEL ${panel.panelNumber}: ${panel.title}`,
          cleanUtteranceText: `Panel ${panel.panelNumber}. ${panel.title || ''}.`,
        });
      }

      // Visual Cinematography Description
      if (narrationMode === 'full' || narrationMode === 'directives-only' || narrationMode === 'current-panel') {
        queue.push({
          id: `p-${panel.panelNumber}-visual`,
          type: 'visual',
          panelNumber: panel.panelNumber,
          text: `Visual: ${panel.visualDescription}`,
          cleanUtteranceText: `Visual scene: ${panel.visualDescription}`,
        });
      }

      // Living Canvas Directives
      if (narrationMode === 'directives-only' || (narrationMode === 'full' && panel.livingDirective)) {
        const d = panel.livingDirective;
        if (d) {
          queue.push({
            id: `p-${panel.panelNumber}-directive`,
            type: 'directive',
            panelNumber: panel.panelNumber,
            text: `Audio: ${d.audioLayer} | State: ${d.panelState}`,
            cleanUtteranceText: `Audio layer instruction: ${d.audioLayer}. Panel mechanic: ${d.panelState}.`,
          });
        }
      }

      // Dialogue Lines
      if (narrationMode === 'full' || narrationMode === 'dialogue-only' || narrationMode === 'current-panel') {
        panel.dialogue.forEach((line, lineIdx) => {
          queue.push({
            id: `p-${panel.panelNumber}-diag-${lineIdx}`,
            type: 'dialogue',
            panelNumber: panel.panelNumber,
            speaker: line.speaker,
            text: `${line.speaker}: "${line.text}"`,
            cleanUtteranceText: `${line.speaker} says: ${line.text}`,
          });
        });
      }

      // SFX
      if (panel.sfx && (narrationMode === 'full' || narrationMode === 'current-panel')) {
        queue.push({
          id: `p-${panel.panelNumber}-sfx`,
          type: 'sfx',
          panelNumber: panel.panelNumber,
          text: panel.sfx,
          cleanUtteranceText: `Sound effect: ${panel.sfx}`,
        });
      }
    });

    return queue;
  };

  // Stop / Cancel Speech
  const stopNarration = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isPlayingRef.current = false;
    setIsPlaying(false);
    setIsPaused(false);
    setPreviewingProfileId(null);
  };

  // Play a single item from the queue
  const playQueueItem = (index: number) => {
    if (!('speechSynthesis' in window)) return;
    const queue = queueRef.current;
    if (index >= queue.length) {
      // Completed full queue
      stopNarration();
      if (enablePanelChimes) playComicPanelChime('complete');
      return;
    }

    currentIndexRef.current = index;
    setCurrentQueueIndex(index);

    const item = queue[index];

    // Trigger visual panel focus if panelNumber is present
    if (item.panelNumber && onPanelFocus) {
      onPanelFocus(item.panelNumber);
    }

    // Play chime when encountering a new panel header
    if (item.type === 'panel-header' && enablePanelChimes) {
      playComicPanelChime('panel-advance');
    } else if (item.type === 'dialogue' && enablePanelChimes) {
      playComicPanelChime('dialogue-pop');
    }

    // Prepare text with optional inflection filter
    let utteranceText = item.cleanUtteranceText;
    if (enableInflections && activeProfile.inflectionTransformer && item.type === 'dialogue') {
      utteranceText = activeProfile.inflectionTransformer(utteranceText);
    }

    const utterance = new SpeechSynthesisUtterance(utteranceText);
    utteranceRef.current = utterance;

    // Assign voice
    const matchedVoice = getBestVoice(systemVoices, activeProfile);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    // Apply pitch & rate with character nuance
    let finalPitch = customPitch;
    let finalRate = customRate;

    // Slight voice pitch variation between Narrator and Character Speakers
    if (item.type === 'dialogue') {
      if (item.speaker?.toLowerCase().includes('baldwin') || item.speaker?.toLowerCase().includes('police')) {
        finalPitch = Math.max(0.6, customPitch * 0.88);
      } else if (item.speaker?.toLowerCase().includes('vlad')) {
        finalPitch = Math.min(1.5, customPitch * 1.15);
      } else if (item.speaker?.toLowerCase().includes('dagg')) {
        finalPitch = Math.max(0.6, customPitch * 0.82);
        finalRate = Math.max(0.7, customRate * 0.90);
      } else if (item.speaker?.toLowerCase().includes('lynn')) {
        finalPitch = Math.min(1.6, customPitch * 1.25);
      }
    } else if (item.type === 'visual' || item.type === 'directive') {
      finalPitch = customPitch * 0.95;
      finalRate = customRate * 1.05;
    }

    utterance.pitch = finalPitch;
    utterance.rate = finalRate;
    utterance.volume = volume;

    utterance.onend = () => {
      if (isPlayingRef.current) {
        // Advance to next line with natural comic breath pause
        const pauseTime = item.type === 'panel-header' ? 300 : item.type === 'visual' ? 250 : 150;
        setTimeout(() => {
          if (isPlayingRef.current) {
            playQueueItem(index + 1);
          }
        }, pauseTime);
      }
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis utterance error:', e);
      if (isPlayingRef.current && index + 1 < queue.length) {
        playQueueItem(index + 1);
      } else {
        stopNarration();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // Start Narration from specified index (or 0)
  const startNarration = (startIndex: number = 0) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const queue = buildNarrationQueue();
    if (queue.length === 0) return;

    queueRef.current = queue;
    isPlayingRef.current = true;
    setIsPlaying(true);
    setIsPaused(false);

    const safeStart = Math.min(Math.max(0, startIndex), queue.length - 1);
    playQueueItem(safeStart);
  };

  // Toggle Pause / Resume
  const togglePause = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      isPlayingRef.current = true;
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
      isPlayingRef.current = false;
    }
  };

  // Quick Preview of a Voice Profile
  const handleTestPreviewVoice = (profile: KiwiAccentVoiceProfile) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setPreviewingProfileId(profile.id);

    const utterance = new SpeechSynthesisUtterance(profile.samplePhrase);
    const matchedVoice = getBestVoice(systemVoices, profile);
    if (matchedVoice) utterance.voice = matchedVoice;

    utterance.pitch = profile.pitch;
    utterance.rate = profile.rate;
    utterance.volume = volume;

    utterance.onend = () => setPreviewingProfileId(null);
    utterance.onerror = () => setPreviewingProfileId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Active queue preview items
  const queueItems = queueRef.current.length > 0 ? queueRef.current : buildNarrationQueue();
  const currentItem = queueItems[currentQueueIndex] || queueItems[0];
  const detectedVoice = getBestVoice(systemVoices, activeProfile);

  return (
    <div className="bg-neutral-900/95 rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Feature Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded bg-cyan-400 text-neutral-950 font-bold font-['Bangers'] text-xs tracking-wider flex items-center gap-1">
              <Headphones className="w-3.5 h-3.5" />
              WEB SPEECH API NARRATION ENGINE
            </span>
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px] font-mono border border-neutral-700">
              Kiwi Dialectal Synthesizer
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-['Bangers'] text-neutral-100 tracking-wide flex items-center gap-2">
            <Radio className="w-6 h-6 text-cyan-400" />
            LIVING SCRIPT NARRATION VOICE STUDIO
          </h2>
          <p className="text-xs text-neutral-400 font-sans mt-1 max-w-2xl leading-relaxed">
            Listen to your generated living comic scripts performed aloud in authentic New Zealand regional accents (Westie, Southland, Taihape Rural, Paternal Police Deadpan, and more) with automatic role-based pitch shifts.
          </p>
        </div>

        {/* System Voice Detection Pill */}
        <div className="flex items-center gap-2 bg-neutral-950 px-3.5 py-2 rounded-2xl border border-neutral-800 self-start md:self-auto text-xs font-mono">
          <Mic className="w-4 h-4 text-cyan-400 shrink-0" />
          <div className="text-[11px]">
            <div className="text-neutral-400">System Speech Engine:</div>
            <div className="text-cyan-300 font-semibold truncate max-w-[200px]">
              {detectedVoice ? `${detectedVoice.name} (${detectedVoice.lang})` : 'Default Browser Speech Engine'}
            </div>
          </div>
        </div>
      </div>

      {!isSpeechSupported && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs font-mono text-amber-300 flex items-center gap-2.5">
          <Info className="w-4 h-4 shrink-0" />
          <span>Web Speech API is not supported in this browser. Please use Chrome, Edge, Safari, or a compatible modern browser.</span>
        </div>
      )}

      {/* Voice Profiles Grid */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          1. Select Kiwi Regional Voice Persona:
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {KIWI_ACCENT_PROFILES.map((profile) => {
            const isSelected = selectedProfileId === profile.id;
            const isTesting = previewingProfileId === profile.id;

            return (
              <div
                key={profile.id}
                onClick={() => {
                  setSelectedProfileId(profile.id);
                  if (isPlaying) {
                    stopNarration();
                  }
                }}
                className={`relative cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-950 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400'
                    : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-950'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-lg">{profile.iconTag}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${profile.color}`}>
                      {profile.region.split('(')[0].trim()}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-neutral-100 font-sans flex items-center justify-between">
                    <span>{profile.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                  </h3>

                  <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                    {profile.archetype}
                  </div>

                  <p className="text-[11px] text-neutral-400 font-sans mt-2 leading-relaxed line-clamp-2">
                    {profile.description}
                  </p>
                </div>

                {/* Sample Test Button */}
                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                  <div className="text-[10px] font-mono text-neutral-400">
                    Rate: {profile.rate}x • Pitch: {profile.pitch}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTestPreviewVoice(profile);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors flex items-center gap-1 ${
                      isTesting
                        ? 'bg-cyan-400 text-neutral-950 font-bold animate-pulse'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-cyan-300 border border-neutral-700'
                    }`}
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>{isTesting ? 'Playing...' : 'Test'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls & Narration Modes Bar */}
      <div className="bg-neutral-950 rounded-2xl p-5 border border-neutral-800 space-y-5">
        
        {/* Top Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Narration Mode Buttons */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono text-neutral-400">
              Narration Scope:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setNarrationMode('full');
                  if (isPlaying) stopNarration();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                  narrationMode === 'full'
                    ? 'bg-cyan-400 text-neutral-950 font-bold shadow-md shadow-cyan-400/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Full Script Storyteller</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setNarrationMode('dialogue-only');
                  if (isPlaying) stopNarration();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                  narrationMode === 'dialogue-only'
                    ? 'bg-cyan-400 text-neutral-950 font-bold shadow-md shadow-cyan-400/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Dialogue Only (Radio Play)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setNarrationMode('directives-only');
                  if (isPlaying) stopNarration();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                  narrationMode === 'directives-only'
                    ? 'bg-cyan-400 text-neutral-950 font-bold shadow-md shadow-cyan-400/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Living Directives Only</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setNarrationMode('current-panel');
                  if (isPlaying) stopNarration();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                  narrationMode === 'current-panel'
                    ? 'bg-cyan-400 text-neutral-950 font-bold shadow-md shadow-cyan-400/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Current Panel ({highlightedPanelIndex !== null && highlightedPanelIndex !== undefined ? `P${(highlightedPanelIndex || 0) + 1}` : 'Selected'})</span>
              </button>
            </div>
          </div>

          {/* Primary Action Buttons (Play / Pause / Stop / Skip) */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            {!isPlaying ? (
              <button
                onClick={() => startNarration(0)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-neutral-950 font-bold font-mono text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all scale-100 hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Narrate Script Aloud</span>
              </button>
            ) : (
              <>
                <button
                  onClick={togglePause}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold font-mono text-xs flex items-center gap-1.5 transition-colors"
                >
                  {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>

                <button
                  onClick={() => {
                    if (currentQueueIndex > 0) {
                      playQueueItem(currentQueueIndex - 1);
                    }
                  }}
                  disabled={currentQueueIndex === 0}
                  className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-neutral-300 border border-neutral-800 transition-colors"
                  title="Previous Line"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (currentQueueIndex + 1 < queueItems.length) {
                      playQueueItem(currentQueueIndex + 1);
                    }
                  }}
                  disabled={currentQueueIndex + 1 >= queueItems.length}
                  className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-neutral-300 border border-neutral-800 transition-colors"
                  title="Next Line"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  onClick={stopNarration}
                  className="p-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 transition-colors"
                  title="Stop Narration"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
              </>
            )}
          </div>

        </div>

        {/* Sliders & Dialectal Customizer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-neutral-800/80 text-xs font-mono">
          
          {/* Rate Slider */}
          <div>
            <div className="flex justify-between text-neutral-400 mb-1">
              <span>Speech Speed:</span>
              <span className="text-cyan-300 font-bold">{customRate.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.6"
              max="1.6"
              step="0.05"
              value={customRate}
              onChange={(e) => setCustomRate(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-neutral-900 rounded-lg cursor-pointer"
            />
          </div>

          {/* Pitch Slider */}
          <div>
            <div className="flex justify-between text-neutral-400 mb-1">
              <span>Vocal Pitch:</span>
              <span className="text-cyan-300 font-bold">{customPitch.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={customPitch}
              onChange={(e) => setCustomPitch(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-neutral-900 rounded-lg cursor-pointer"
            />
          </div>

          {/* Volume Slider */}
          <div>
            <div className="flex justify-between text-neutral-400 mb-1">
              <span>Narration Volume:</span>
              <span className="text-cyan-300 font-bold">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-neutral-900 rounded-lg cursor-pointer"
            />
          </div>

          {/* Toggles */}
          <div className="flex flex-col justify-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-[11px] text-neutral-300 hover:text-white">
              <input
                type="checkbox"
                checked={enableInflections}
                onChange={(e) => setEnableInflections(e.target.checked)}
                className="rounded accent-cyan-400"
              />
              <span>Kiwi Phonetic Inflections</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-[11px] text-neutral-300 hover:text-white">
              <input
                type="checkbox"
                checked={enablePanelChimes}
                onChange={(e) => setEnablePanelChimes(e.target.checked)}
                className="rounded accent-cyan-400"
              />
              <span>Retro Comic Audio Chimes</span>
            </label>
          </div>

        </div>
      </div>

      {/* Live Teleprompter & Active Line Visualizer */}
      <div className="bg-neutral-950 rounded-2xl p-5 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isPlaying ? (isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-ping') : 'bg-neutral-600'}`} />
            <span className="text-xs font-mono text-neutral-300 font-bold uppercase tracking-wider">
              {isPlaying ? (isPaused ? 'Narration Paused' : 'Live Speech Teleprompter') : 'Script Reading Preview'}
            </span>
          </div>

          {isPlaying && (
            <div className="flex items-center gap-1">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 bg-cyan-400 rounded-full transition-all duration-150 ${isPaused ? 'h-1.5 opacity-30' : 'animate-pulse'}`}
                  style={{ 
                    height: isPaused ? '6px' : `${8 + ((i * 7) % 18)}px`,
                    animationDelay: `${i * 120}ms`
                  }} 
                />
              ))}
            </div>
          )}
        </div>

        {/* Scrollable Teleprompter Lines */}
        <div className="max-h-56 overflow-y-auto space-y-1.5 pr-2 scrollbar-thin scrollbar-thumb-neutral-800">
          {queueItems.map((item, idx) => {
            const isCurrent = isPlaying && currentQueueIndex === idx;

            return (
              <div
                key={item.id || idx}
                onClick={() => {
                  if (isPlaying) {
                    playQueueItem(idx);
                  } else {
                    startNarration(idx);
                  }
                }}
                className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-start justify-between gap-3 text-xs font-mono ${
                  isCurrent
                    ? 'bg-cyan-950/80 border border-cyan-400 text-cyan-200 shadow-md font-bold'
                    : 'bg-neutral-900/50 hover:bg-neutral-900 border border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 ${
                    item.type === 'dialogue'
                      ? 'bg-amber-500/20 text-amber-300'
                      : item.type === 'visual'
                      ? 'bg-purple-500/20 text-purple-300'
                      : item.type === 'panel-header'
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {item.type}
                  </span>
                  <span className="leading-relaxed font-sans text-[12px]">{item.text}</span>
                </div>

                {isCurrent && (
                  <span className="text-[10px] font-mono text-cyan-400 animate-pulse shrink-0">
                    ▶ Speaking
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
