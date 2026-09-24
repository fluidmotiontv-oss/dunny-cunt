import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Flame, 
  Clock, 
  Tv, 
  Share2, 
  Copy, 
  Check, 
  Mic, 
  Radio, 
  Zap, 
  Layers, 
  MessageSquare, 
  AlertTriangle,
  ChevronRight,
  BookOpen,
  Wand2,
  RefreshCw,
  Award,
  Volume1
} from 'lucide-react';
import { ThreeMinMashUp, MashUpBeat, MashUpCharacter } from '../types';
import { curatedThreeMinMashups } from '../data/threeMinMashups';
import { playProceduralSound, speakDialogue, stopSpeaking } from '../utils/audioSynthesizer';

interface ThreeMinMashupStudioProps {
  soundEnabled: boolean;
  onSendToReader?: (mashup: ThreeMinMashUp) => void;
}

export const ThreeMinMashupStudio: React.FC<ThreeMinMashupStudioProps> = ({
  soundEnabled,
  onSendToReader,
}) => {
  // Current Active Mash-Up
  const [activeMashup, setActiveMashup] = useState<ThreeMinMashUp>(curatedThreeMinMashups[0]);
  const [allMashups, setAllMashups] = useState<ThreeMinMashUp[]>(curatedThreeMinMashups);

  // Playback / Timeline State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSecond, setCurrentSecond] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [voiceCastEnabled, setVoiceCastEnabled] = useState<boolean>(true);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [activeActTab, setActiveActTab] = useState<1 | 2 | 3>(1);

  // Mixer / AI Generator State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [selectedProtagonist, setSelectedProtagonist] = useState<string>('Senior Sgt Guy Baldwin');
  const [selectedAntagonist, setSelectedAntagonist] = useState<string>('Vladislav the Poker');
  const [selectedLocation, setSelectedLocation] = useState<string>('Dannevirke 24-Hour BP Forecourt');
  const [selectedCatalyst, setSelectedCatalyst] = useState<string>('Thermo-Nuclear Pie Hazard meets TradeMe Auction Dispute');
  const [selectedIntensity, setSelectedIntensity] = useState<string>('Maximum Unhinged DIY Kiwi Mayhem');
  const [customTwist, setCustomTwist] = useState<string>('');

  // Soundboard Trigger Tracker
  const [lastPlayedSfx, setLastPlayedSfx] = useState<string | null>(null);

  const timerRef = useRef<number | null>(null);
  const prevSecondRef = useRef<number>(0);

  // Collect all beats across all 3 acts sorted by second
  const allBeats: MashUpBeat[] = React.useMemo(() => {
    return activeMashup.acts.flatMap(act => act.beats).sort((a, b) => a.second - b.second);
  }, [activeMashup]);

  // Determine current active beat
  const currentBeatIndex = React.useMemo(() => {
    let activeIdx = 0;
    for (let i = 0; i < allBeats.length; i++) {
      if (currentSecond >= allBeats[i].second) {
        activeIdx = i;
      }
    }
    return activeIdx;
  }, [allBeats, currentSecond]);

  const currentBeat = allBeats[currentBeatIndex] || allBeats[0];

  // Determine which act is currently active based on currentSecond
  const currentActNumber = currentSecond < 45 ? 1 : currentSecond < 120 ? 2 : 3;

  // Auto-switch act tab if playing
  useEffect(() => {
    if (isPlaying) {
      setActiveActTab(currentActNumber as 1 | 2 | 3);
    }
  }, [currentActNumber, isPlaying]);

  // Handle Playback Interval
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentSecond(prev => {
          if (prev >= 180) {
            setIsPlaying(false);
            return 180;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      stopSpeaking();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  // Trigger SFX & Voice synthesis when crossing a beat
  useEffect(() => {
    if (isPlaying && currentBeat) {
      // Check if we just hit this exact second
      if (currentSecond === currentBeat.second) {
        // Trigger sound preset if available
        if (soundEnabled && currentBeat.audioPreset) {
          playProceduralSound(currentBeat.audioPreset);
          setLastPlayedSfx(currentBeat.audioPreset);
        }

        // Trigger voice synthesis if enabled
        if (voiceCastEnabled) {
          const char = activeMashup.characters.find(c => c.name.toLowerCase().includes(currentBeat.speaker.toLowerCase()) || currentBeat.speaker.toLowerCase().includes(c.name.toLowerCase()));
          const pitch = char ? char.pitch : 1.0;
          const rate = char ? char.rate : 1.0;
          speakDialogue(`${currentBeat.speaker}: ${currentBeat.dialogue}`, pitch, rate);
        }
      }
    }
    prevSecondRef.current = currentSecond;
  }, [currentSecond, isPlaying, currentBeat, soundEnabled, voiceCastEnabled, activeMashup]);

  const handlePlayPause = () => {
    if (currentSecond >= 180) {
      setCurrentSecond(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentSecond(0);
    stopSpeaking();
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sec = parseInt(e.target.value, 10);
    setCurrentSecond(sec);
    // Find beat
    const beat = allBeats.find(b => b.second === sec);
    if (beat && soundEnabled && beat.audioPreset) {
      playProceduralSound(beat.audioPreset);
    }
  };

  const handleTriggerSoundboard = (preset: string) => {
    if (soundEnabled) {
      playProceduralSound(preset);
    }
    setLastPlayedSfx(preset);
  };

  const handleSelectMashup = (mashup: ThreeMinMashUp) => {
    setIsPlaying(false);
    stopSpeaking();
    setCurrentSecond(0);
    setActiveMashup(mashup);
    setActiveActTab(1);
  };

  const handleCopyScript = () => {
    let scriptText = `# ${activeMashup.title}\n`;
    scriptText += `Tagline: ${activeMashup.tagline}\n`;
    scriptText += `Location: ${activeMashup.location}\n`;
    scriptText += `Target Cultural Trope: ${activeMashup.targetCulturalTrope}\n\n`;
    scriptText += `--- CHARACTERS ---\n`;
    activeMashup.characters.forEach(c => {
      scriptText += `- ${c.name} (${c.actorRef}) - Voice: ${c.voiceTone}\n`;
    });
    scriptText += `\n--- 3-MINUTE PERFORMANCE ---\n`;

    activeMashup.acts.forEach(act => {
      scriptText += `\n[${act.actTitle}]\nScene: ${act.sceneNotes}\n\n`;
      act.beats.forEach(b => {
        scriptText += `[${b.timestamp}] ${b.speaker.toUpperCase()}:\n"${b.dialogue}"\n`;
        scriptText += `(Delivery: ${b.deliveryNote})\n`;
        if (b.sfxCue) scriptText += `${b.sfxCue}\n`;
        if (b.stageAction) scriptText += `[Stage Action: ${b.stageAction}]\n`;
        scriptText += `\n`;
      });
    });

    scriptText += `\n--- PISS-TAKE SUBTEXT BREAKDOWN ---\n${activeMashup.pissTakeBreakdown}\n`;

    navigator.clipboard.writeText(scriptText);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  // Generate a brand new custom 3-minute Kiwi comedy mash-up via Gemini API
  const handleGenerateMashup = async () => {
    setIsGenerating(true);
    setGenError(null);

    try {
      const res = await fetch('/api/gemini/generate-mashup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          protagonist: selectedProtagonist,
          antagonist: selectedAntagonist,
          location: selectedLocation,
          catalyst: selectedCatalyst,
          intensity: selectedIntensity,
          customTopic: customTwist
        })
      });

      const data = await res.json();
      if (data.success && data.mashup) {
        const newMashup: ThreeMinMashUp = {
          ...data.mashup,
          userCreated: true
        };
        setAllMashups([newMashup, ...allMashups]);
        handleSelectMashup(newMashup);
        if (soundEnabled) {
          playProceduralSound('trademe-bid');
        }
      } else {
        throw new Error(data.error || 'Failed to generate mash-up');
      }
    } catch (err: any) {
      console.error(err);
      setGenError(err.message || 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-mono text-xs font-bold border border-rose-500/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                3-MINUTE MASH-UP STUDIO
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 font-mono text-xs font-bold border border-amber-400/30">
                180-SECOND PERFORMANCE FORMAT
              </span>
              <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 font-mono text-xs">
                3-Act Comic Stage
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-['Bangers'] tracking-wider text-amber-400 drop-shadow-md">
              THE 3-MINUTE KIWI CULTURAL PISS-TAKE ENGINE
            </h1>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Synthesize legendary New Zealand comedic personalities, unshakeable deadpan tropes, and surreal suburban hazards into structured, timed 3-minute performances (replete with speech-synthesized voice acting and procedural SFX stings).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="copy-script-btn"
              onClick={handleCopyScript}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono text-xs font-bold transition-all border border-neutral-700 shadow-md"
            >
              {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
              <span>{copiedScript ? 'Script Copied!' : 'Copy Script Text'}</span>
            </button>

            {onSendToReader && (
              <button
                id="view-in-comic-btn"
                onClick={() => onSendToReader(activeMashup)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-all shadow-lg shadow-amber-400/20"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open in Living Reader</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preset Curated Mash-Ups Carousel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-neutral-200 tracking-wide uppercase font-mono">
              Curated 3-Minute Kiwi Classics ({allMashups.length})
            </h2>
          </div>
          <span className="text-xs text-neutral-500 font-mono hidden sm:inline">
            Select to load into live stage & teleprompter
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allMashups.map((mashup) => {
            const isSelected = activeMashup.id === mashup.id;
            return (
              <div
                key={mashup.id}
                id={`mashup-card-${mashup.id}`}
                onClick={() => handleSelectMashup(mashup)}
                className={`p-4 rounded-xl border cursor-pointer transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-neutral-900 border-amber-400/80 shadow-lg shadow-amber-400/10 ring-1 ring-amber-400/50'
                    : 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-400/30 to-transparent pointer-events-none" />
                )}

                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-neutral-800 text-amber-300 border border-neutral-700">
                    3:00 MIN • 180s
                  </span>
                  {mashup.userCreated && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      User Mash-Up
                    </span>
                  )}
                </div>

                <h3 className="font-['Bangers'] text-base tracking-wide text-neutral-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                  {mashup.title}
                </h3>

                <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-snug">
                  {mashup.tagline}
                </p>

                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-neutral-800/80">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    {mashup.characters.map((c, idx) => (
                      <span 
                        key={idx} 
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs border border-neutral-900 ${c.badgeColor}`}
                        title={`${c.name} (${c.actorRef})`}
                      >
                        {c.avatarEmoji}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono truncate ml-1">
                    {mashup.characters.map(c => c.name.split(' ')[0]).join(' × ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main 3-Minute Live Stage & Teleprompter Player */}
      <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl">
        
        {/* Stage Header / Meta Bar */}
        <div className="p-5 bg-neutral-950 border-b border-neutral-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Active Live Stage
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-xs font-mono text-neutral-400">
                📍 {activeMashup.location}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-['Bangers'] tracking-wide text-white">
              {activeMashup.title}
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              {activeMashup.tagline}
            </p>
          </div>

          {/* Cast Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {activeMashup.characters.map((c, i) => (
              <div 
                key={i}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                  currentBeat && currentBeat.speaker.toLowerCase().includes(c.name.toLowerCase())
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-md shadow-amber-400/20'
                    : 'bg-neutral-800/80 border-neutral-700 text-neutral-300'
                }`}
              >
                <span className="text-sm">{c.avatarEmoji}</span>
                <span className="font-bold">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 180s Playback Controls & Timeline Scrubber */}
        <div className="p-4 bg-neutral-950/60 border-b border-neutral-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* Play/Pause & Reset */}
            <div className="flex items-center gap-2">
              <button
                id="play-pause-stage-btn"
                onClick={handlePlayPause}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                  isPlaying
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                    : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-amber-400/30'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'PAUSE PERFORMANCE' : 'PLAY 3-MIN SKETCH'}</span>
              </button>

              <button
                id="reset-stage-btn"
                onClick={handleReset}
                title="Reset to 0:00"
                className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors border border-neutral-700"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 ml-2 font-mono text-sm bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-amber-400">{formatTime(currentSecond)}</span>
                <span className="text-neutral-500">/</span>
                <span className="text-neutral-400">3:00</span>
              </div>
            </div>

            {/* Performance Options */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Voice Cast Speech Synthesis Toggle */}
              <button
                id="toggle-voice-btn"
                onClick={() => setVoiceCastEnabled(!voiceCastEnabled)}
                title="Toggle Web Speech Synthesis voice acting for Kiwi characters"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  voiceCastEnabled
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                    : 'bg-neutral-900 text-neutral-500 border-neutral-800'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{voiceCastEnabled ? 'Voice Cast: ON' : 'Voice Cast: OFF'}</span>
              </button>

              {/* Speed toggle */}
              <div className="flex items-center bg-neutral-900 rounded-lg border border-neutral-800 p-0.5 text-xs font-mono">
                {[1, 1.25, 1.5].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-1 rounded transition-colors ${
                      playbackSpeed === spd
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Bar with Act Division Markers */}
          <div className="space-y-1.5 pt-1">
            <div className="relative">
              <input
                id="timeline-scrubber"
                type="range"
                min={0}
                max={180}
                value={currentSecond}
                onChange={handleScrub}
                className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              {/* Act Breakpoint Markers */}
              <div className="absolute top-0 left-[25%] -bottom-1 w-0.5 bg-neutral-600 pointer-events-none opacity-50" title="Act 1 -> Act 2 (0:45)" />
              <div className="absolute top-0 left-[66.6%] -bottom-1 w-0.5 bg-neutral-600 pointer-events-none opacity-50" title="Act 2 -> Act 3 (2:00)" />
            </div>

            {/* Act Labels on Timeline */}
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-0.5">
              <div className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${currentSecond < 45 ? 'bg-amber-400 animate-ping' : 'bg-neutral-600'}`} />
                <span className={currentSecond < 45 ? 'text-amber-300 font-bold' : ''}>Act 1: The Setup (0:00 - 0:45)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${currentSecond >= 45 && currentSecond < 120 ? 'bg-rose-400 animate-ping' : 'bg-neutral-600'}`} />
                <span className={currentSecond >= 45 && currentSecond < 120 ? 'text-rose-300 font-bold' : ''}>Act 2: The Escalation (0:45 - 2:00)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${currentSecond >= 120 ? 'bg-emerald-400 animate-ping' : 'bg-neutral-600'}`} />
                <span className={currentSecond >= 120 ? 'text-emerald-300 font-bold' : ''}>Act 3: The Resolution (2:00 - 3:00)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Stage Visual Arena / Spotlight Card */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-neutral-900 to-neutral-950 relative min-h-[220px] flex flex-col justify-center">
          
          {currentBeat ? (
            <div className="space-y-4 max-w-4xl mx-auto w-full">
              
              {/* Speaker Bar & Timing */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-800 border-2 border-amber-400/60 flex items-center justify-center text-2xl shadow-lg shadow-amber-400/20 shrink-0">
                    {activeMashup.characters.find(c => currentBeat.speaker.toLowerCase().includes(c.name.toLowerCase()))?.avatarEmoji || '🎭'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-['Bangers'] text-xl sm:text-2xl text-amber-400 tracking-wide">
                        {currentBeat.speaker}
                      </span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                        [{currentBeat.timestamp}]
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 italic">
                      Tone: {currentBeat.deliveryNote}
                    </p>
                  </div>
                </div>

                {/* SFX Alert Badge if Active */}
                {currentBeat.sfxCue && (
                  <button
                    onClick={() => currentBeat.audioPreset && handleTriggerSoundboard(currentBeat.audioPreset)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs hover:bg-rose-500/20 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>{currentBeat.sfxCue}</span>
                  </button>
                )}
              </div>

              {/* Spoken Dialogue Balloon */}
              <div className="relative p-5 sm:p-6 rounded-2xl bg-neutral-950 border-2 border-neutral-700 shadow-xl">
                <div className="absolute -top-3 left-8 w-6 h-6 bg-neutral-950 border-t-2 border-l-2 border-neutral-700 transform rotate-45" />
                <p className="font-sans text-base sm:text-xl text-neutral-100 font-medium leading-relaxed">
                  "{currentBeat.dialogue}"
                </p>

                {currentBeat.stageAction && (
                  <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center gap-2 text-xs font-mono text-amber-400/90">
                    <Zap className="w-3.5 h-3.5 shrink-0" />
                    <span>Stage Action: {currentBeat.stageAction}</span>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="text-center text-neutral-500 font-mono text-sm py-8">
              Press Play to start the 3-minute performance
            </div>
          )}

        </div>

        {/* 3-Act Teleprompter Script Tabs */}
        <div className="border-t border-neutral-800 bg-neutral-950">
          
          {/* Act Selector Bar */}
          <div className="flex border-b border-neutral-800 overflow-x-auto scrollbar-none">
            {activeMashup.acts.map((act) => (
              <button
                key={act.actNumber}
                id={`act-tab-btn-${act.actNumber}`}
                onClick={() => {
                  setActiveActTab(act.actNumber);
                  setCurrentSecond(act.startSecond);
                }}
                className={`flex-1 min-w-[200px] px-4 py-3 text-left font-mono text-xs transition-all border-r border-neutral-800 last:border-r-0 ${
                  activeActTab === act.actNumber
                    ? 'bg-neutral-900 text-amber-300 font-bold border-b-2 border-b-amber-400'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="uppercase">{act.actTitle.split(':')[0]}</span>
                  <span className="text-[10px] text-neutral-500">[{act.timeRange}]</span>
                </div>
                <div className="text-[11px] text-neutral-300 truncate">
                  {act.actTitle.split(':')[1] || act.actTitle}
                </div>
              </button>
            ))}
          </div>

          {/* Act Beats Transcript List */}
          <div className="p-4 sm:p-6 space-y-4 max-h-[380px] overflow-y-auto">
            {activeMashup.acts.find(a => a.actNumber === activeActTab)?.beats.map((beat) => {
              const isCurrent = currentBeat?.id === beat.id;
              return (
                <div
                  key={beat.id}
                  id={`beat-card-${beat.id}`}
                  onClick={() => setCurrentSecond(beat.second)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-neutral-900 border-amber-400/70 shadow-md ring-1 ring-amber-400/40'
                      : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400">
                        [{beat.timestamp}]
                      </span>
                      <span className="font-['Bangers'] text-base tracking-wide text-neutral-200">
                        {beat.speaker}
                      </span>
                    </div>
                    {beat.audioPreset && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTriggerSoundboard(beat.audioPreset!);
                        }}
                        className="p-1 rounded bg-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors"
                        title={`Play SFX preset: ${beat.audioPreset}`}
                      >
                        <Volume1 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                    {beat.dialogue}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] font-mono text-neutral-400">
                    <span className="italic text-neutral-400">"{beat.deliveryNote}"</span>
                    {beat.stageAction && (
                      <span className="text-amber-400/80">• Action: {beat.stageAction}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Interactive Procedural SFX Soundboard */}
      <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-rose-400" />
            <h3 className="font-['Bangers'] text-xl text-neutral-100 tracking-wide">
              KIWI COMEDY PROCEDURAL SFX SOUNDBOARD
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            Real-time Web Audio synthesis • Click to trigger instant stings
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {[
            { id: 'police-pie', label: 'Pie Thermal Siren', desc: 'Squelch + Microwave', icon: '🚨' },
            { id: 'ghost-chips', label: 'Ghost Chip Chime', desc: 'Spectral resonance', icon: '👻' },
            { id: 'billy-t-laugh', label: 'Billy T Giggle', desc: 'Staccato Huh-huh', icon: '🎭' },
            { id: 'trademe-bid', label: 'TradeMe Reserve Ping', desc: 'Cash register chime', icon: '🔔' },
            { id: 'speedo-cop', label: 'Speedo Cop Megaphone', desc: 'Distorted compliance', icon: '📢' },
            { id: 'correos-meltdown', label: 'Correos Pasta Drop', desc: 'Kinetic panic thud', icon: '⚡' },
            { id: 'fred-dagg', label: 'Fred Dagg Tractor', desc: 'Paddock diesel hum', icon: '🚜' },
            { id: 'wellington-paranormal', label: 'Paranormal Theremin', desc: 'Eerie pitch slide', icon: '🛸' },
            { id: 'outrageous-burnout', label: 'Westie Burnout', desc: 'Tyre squeal & pub rock', icon: '🏎️' },
            { id: 'no8-wire', label: 'No. 8 Wire Twang', desc: 'Metallic fence tension', icon: '🪢' },
          ].map((sfx) => (
            <button
              key={sfx.id}
              id={`sfx-btn-${sfx.id}`}
              onClick={() => handleTriggerSoundboard(sfx.id)}
              className={`p-3 rounded-xl border text-left transition-all group ${
                lastPlayedSfx === sfx.id
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md shadow-rose-500/20 scale-[0.98]'
                  : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/80 text-neutral-300'
              }`}
            >
              <div className="text-xl mb-1 group-hover:scale-110 transition-transform">
                {sfx.icon}
              </div>
              <div className="font-bold text-xs text-neutral-100 truncate">
                {sfx.label}
              </div>
              <div className="text-[10px] text-neutral-400 font-mono truncate">
                {sfx.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* The Piss-Take Mixer (Custom AI Generator) */}
      <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-amber-400" />
              <h3 className="font-['Bangers'] text-2xl text-amber-400 tracking-wide">
                CUSTOM 3-MINUTE PISS-TAKE MIXER
              </h3>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Select any clash of Kiwi cultural personalities, locations, and absurd institutional rules to generate a brand-new 3-minute performance.
            </p>
          </div>

          <button
            id="generate-mashup-btn"
            onClick={handleGenerateMashup}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-rose-500/25 disabled:opacity-50 shrink-0 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-neutral-950" />
                <span>SYNTHESIZING 3-MIN MASH-UP...</span>
              </>
            ) : (
              <>
                <Flame className="w-4 h-4 fill-current text-neutral-950" />
                <span>GENERATE 3-MIN PISS-TAKE</span>
              </>
            )}
          </button>
        </div>

        {genError && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{genError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Protagonist */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-neutral-300 uppercase">
              1. Hero / Cultural Anchor
            </label>
            <select
              id="select-protagonist"
              value={selectedProtagonist}
              onChange={(e) => setSelectedProtagonist(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
            >
              <option value="Senior Sgt Guy Baldwin">Senior Sgt Guy Baldwin (Police 10-7)</option>
              <option value="Fred Dagg">Fred Dagg & The Trevs</option>
              <option value="Lynn of Tawa">Lynn of Tawa</option>
              <option value="Ted West">Ted West (Outrageous Fortune)</option>
              <option value="David Correos">David Correos (Taskmaster NZ)</option>
              <option value="Billy T James">Billy T James</option>
              <option value="Leigh Hart Speedo Cop">Speedo Cop Leigh Hart</option>
              <option value="Murray Hewitt">Murray Hewitt (Flight of the Conchords)</option>
              <option value="Officers O'Leary & Minogue">Officers O'Leary & Minogue (Wellington Paranormal)</option>
            </select>
          </div>

          {/* Antagonist */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-neutral-300 uppercase">
              2. Rival / Challenger
            </label>
            <select
              id="select-antagonist"
              value={selectedAntagonist}
              onChange={(e) => setSelectedAntagonist(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
            >
              <option value="Vladislav the Poker">Vladislav the Poker (What We Do in the Shadows)</option>
              <option value="Target TV Investigative Reporter">Target TV Investigative Anchor</option>
              <option value="TradeMe $1 Reserve Lowballer">TradeMe $1 Reserve Lowballer</option>
              <option value="Auckland Council Parking Bylaw Officer">Auckland Council Parking Bylaw Officer</option>
              <option value="Monique the Ghost Chip">Monique the Ghost Chip</option>
              <option value="Gore Brown Trout Civic Council">Gore Brown Trout Civic Council</option>
              <option value="David Tua with Wheel of Fortune">David Tua with Wheel of Fortune "O for Awesome"</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-neutral-300 uppercase">
              3. Arena / Location
            </label>
            <select
              id="select-location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
            >
              <option value="Dannevirke 24-Hour BP Forecourt">Dannevirke 24-Hour BP Forecourt</option>
              <option value="Upper Hutt Mitre 10 Mega Hardware Aisle">Upper Hutt Mitre 10 Mega Hardware Aisle</option>
              <option value="Te Aro Vampire Kitchen & Flat Roster Board">Te Aro Vampire Kitchen</option>
              <option value="Gore Giant Brown Trout Statue Pedestal">Gore Giant Brown Trout Statue</option>
              <option value="Huntly DEKA Sign Historic Carpark">Huntly DEKA Sign Historic Carpark</option>
              <option value="Avalon Broadcasting Studios Sub-Level 4">Avalon Tape Vault Sub-Level 4</option>
              <option value="Basin Reserve KFC Drive-Thru Lane">Basin Reserve KFC Drive-Thru Lane</option>
            </select>
          </div>

          {/* Catalyst / Piss-Take */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-neutral-300 uppercase">
              4. Absurd Catalyst
            </label>
            <select
              id="select-catalyst"
              value={selectedCatalyst}
              onChange={(e) => setSelectedCatalyst(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
            >
              <option value="Thermo-Nuclear Pie Hazard meets TradeMe Auction Dispute">Molten Pie vs TradeMe Pickup</option>
              <option value="Unpaid Yellow Council Rubbish Sticker Eviction Notice">Yellow Rubbish Bag Eviction</option>
              <option value="Undercover Investigation of a Baling Twine Fence Repair">Baling Twine Fencing Audit</option>
              <option value="Taskmaster 180-second Giant Concrete Fish Relocation">180s Giant Fish Relocation</option>
              <option value="Porirua Shopping Mall Safari Suit Wardrobe Takeover">Safari Suit Wardrobe Takeover</option>
              <option value="20-Piece Fried Chicken Poltergeist Infringement Notice">20-Piece Chicken Ghost Ticket</option>
            </select>
          </div>

        </div>

        {/* Custom Twist Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-neutral-400 uppercase">
            Optional Custom Twist / Punchline Directive
          </label>
          <input
            id="custom-twist-input"
            type="text"
            value={customTwist}
            onChange={(e) => setCustomTwist(e.target.value)}
            placeholder="e.g. Include a cameo from Guy Williams, a debate over cheese rolls, or a No. 8 wire spacetime repair..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-400 font-mono"
          />
        </div>
      </div>

      {/* Cultural Subtext Deconstruction */}
      <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-neutral-200 uppercase font-mono tracking-wider">
            Piss-Take Subtext Deconstruction
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans bg-neutral-950 p-4 rounded-xl border border-neutral-800/80">
          {activeMashup.pissTakeBreakdown}
        </p>
      </div>

    </div>
  );
};
