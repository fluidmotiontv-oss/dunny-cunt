// Web Speech API Kiwi Narration & Accent Engine

export interface KiwiAccentVoiceProfile {
  id: string;
  name: string;
  region: string;
  archetype: string;
  description: string;
  iconTag: string;
  color: string;
  pitch: number;
  rate: number;
  samplePhrase: string;
  inflectionTransformer?: (text: string) => string;
}

export const KIWI_ACCENT_PROFILES: KiwiAccentVoiceProfile[] = [
  {
    id: 'westie',
    name: 'Westie Cadence',
    region: 'Central West Auckland (Henderson / K-Road)',
    archetype: 'Streetwise Raconteur & Slapped-Cefiro Poet',
    description: 'Punchy, rhythmic, nasal vowel shifts, rapid tempo with rising high-terminal intonation ("eh", "bro", "hard out").',
    iconTag: '🚗',
    color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/40',
    pitch: 0.95,
    rate: 1.14,
    samplePhrase: "Fark-up, not park-up bro! My funny mates are going to laugh hard out, so move the wagon along eh.",
    inflectionTransformer: (text: string) => {
      return text
        .replace(/\bcannot\b/gi, "can't")
        .replace(/\bdo not\b/gi, "don't")
        .replace(/\bgoing to\b/gi, "gonna")
        .replace(/\bbrother\b/gi, "bro")
        .replace(/\bman\b/gi, "cuz");
    }
  },
  {
    id: 'southland',
    name: 'Southland Rhotic Lilt',
    region: 'Deep South / Murihiku & Gore',
    archetype: 'Rolling Rhotic "R" & Cheese-Roll Master',
    description: 'Measured, grounding southern cadence with rich rolling "R"s, deep vocal timbre, and relaxed provincial rhythm.',
    iconTag: '🧀',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/40',
    pitch: 0.84,
    rate: 0.92,
    samplePhrase: "Gidday there. Nothing beats a warm Southland cheese roll from Gore on a frosty July morning, right.",
    inflectionTransformer: (text: string) => {
      // Accentuate rolling r's phonetically for synthesis
      return text
        .replace(/\bhard\b/gi, "harr-rd")
        .replace(/\bpie\b/gi, "py-er")
        .replace(/\bcar\b/gi, "carr-r")
        .replace(/\bdoor\b/gi, "doorr-r");
    }
  },
  {
    id: 'rural-gumboot',
    name: 'Rural Taihape Laconic',
    region: 'Waikato / Taihape / Gumboot Country',
    archetype: 'Fred Dagg & No. 8 Wire Dry Wit',
    description: 'Deep gravelly baritone, laconic pauses, unhurried dry delivery ("Righto", "Not bad at all, relatively speaking").',
    iconTag: '🥾',
    color: 'from-lime-500/20 to-emerald-500/20 text-lime-400 border-lime-500/40',
    pitch: 0.78,
    rate: 0.88,
    samplePhrase: "Gidday. Me and Trev reckon a bit of high-tensile No. 8 wire will sort her right out. She'll be right.",
    inflectionTransformer: (text: string) => {
      return `Righto. ${text} ... Not bad at all, relatively speaking.`;
    }
  },
  {
    id: 'police-deadpan',
    name: 'Paternal Police Deadpan',
    region: 'Wellington / Provincial Patrol',
    archetype: 'Senior Sgt Baldwin & Civic Safety',
    description: 'Grave, instructional public-safety tone, utterly deadpan under-reaction to supernatural or thermonuclear pastry phenomena.',
    iconTag: '🚨',
    color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/40',
    pitch: 0.88,
    rate: 0.98,
    samplePhrase: "Look mate, that pastry is fundamentally thermonuclear. You must always blow on the pie. Safer communities together.",
    inflectionTransformer: (text: string) => {
      return `Official safety notice: ${text}`;
    }
  },
  {
    id: 'vampire-gothic',
    name: 'Wellington Flatmate Gothic',
    region: 'Suburban Te Aro / Brooklyn Flats',
    archetype: 'Vladislav the Poker (Ancient Aristocrat)',
    description: 'Flamboyant theatrical European aristocrat cadence colliding melodramatically with modern TradeMe auctions and dish chore wheels.',
    iconTag: '🧛',
    color: 'from-rose-500/20 to-purple-500/20 text-rose-400 border-rose-500/40',
    pitch: 1.18,
    rate: 0.92,
    samplePhrase: "I have crossed oceans of time to bid on this pine coffee table for twelve dollars fifty on TradeMe!",
    inflectionTransformer: (text: string) => {
      return text;
    }
  },
  {
    id: 'maori-warmth',
    name: 'Urban Māori Warmth & Snicker',
    region: 'Auckland / Variety Television',
    archetype: 'Billy T James & Cheerful Charisma',
    description: 'Sunny melodic rhythm, warm storytelling timbre, and infectious comedic pauses.',
    iconTag: '🧣',
    color: 'from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/40',
    pitch: 1.06,
    rate: 1.08,
    samplePhrase: "Hey bro! Check this out, special discount at the dairy. *chuckle* ... You can't beat it eh!",
    inflectionTransformer: (text: string) => {
      return text;
    }
  },
  {
    id: 'suburban-gossip',
    name: 'Suburban Gossip / Tawa Society',
    region: 'Tawa / Remuera High Society',
    archetype: 'Lynn of Tawa & Gossip Columnist',
    description: 'High-society, nasal articulation, breathless scandalized delivery with heightened inflection.',
    iconTag: '💅',
    color: 'from-fuchsia-500/20 to-pink-500/20 text-fuchsia-400 border-fuchsia-500/40',
    pitch: 1.28,
    rate: 1.06,
    samplePhrase: "Well really, Mrs Henderson! I was simply flabbergasted at the Dannevirke bridge club yesterday!",
    inflectionTransformer: (text: string) => {
      return `Oh honestly! ${text}`;
    }
  }
];

export interface NarrationQueueItem {
  id: string;
  type: 'title' | 'location' | 'panel-header' | 'visual' | 'directive' | 'dialogue' | 'sfx';
  panelNumber?: number;
  speaker?: string;
  text: string;
  cleanUtteranceText: string;
}

/**
 * Finds the most suitable SpeechSynthesisVoice based on system availability
 * Prioritizes en-NZ, en-AU, en-GB, en-US
 */
export function getBestVoice(voices: SpeechSynthesisVoice[], profile: KiwiAccentVoiceProfile): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  // 1. Direct NZ Voice
  const nzVoice = voices.find(v => v.lang === 'en-NZ' || v.name.toLowerCase().includes('new zealand') || v.name.toLowerCase().includes('kiwi'));
  if (nzVoice) return nzVoice;

  // 2. Australian Voice (closest phonetic neighbor in OS synthesizers)
  const auVoice = voices.find(v => v.lang === 'en-AU' || v.name.toLowerCase().includes('australia'));
  if (auVoice) return auVoice;

  // 3. For gothic vampire, prefer British or Romanian/European English if available
  if (profile.id === 'vampire-gothic') {
    const gbVoice = voices.find(v => v.lang === 'en-GB' || v.lang.startsWith('en-'));
    if (gbVoice) return gbVoice;
  }

  // 4. British English
  const gbVoice = voices.find(v => v.lang === 'en-GB');
  if (gbVoice) return gbVoice;

  // 5. Any English voice
  const anyEn = voices.find(v => v.lang.startsWith('en'));
  if (anyEn) return anyEn;

  return voices[0] || null;
}

/**
 * Play a retro synthesizer comic chime when switching panels using Web Audio API
 */
export function playComicPanelChime(type: 'panel-advance' | 'dialogue-pop' | 'complete' = 'panel-advance') {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    if (type === 'panel-advance') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'dialogue-pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'complete') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      osc2.frequency.setValueAtTime(659.25, now + 0.1);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(now);
      osc2.start(now + 0.1);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    }
  } catch (e) {
    // AudioContext autoplay restrictions are handled gracefully
  }
}
