/**
 * Procedural Ambient Audio Engine for NZ Comedy Living Comic Book & Scriptwriter Studio
 * Uses Web Audio API to procedurally generate continuous, multi-layered New Zealand soundscapes:
 * - K' Road Distant Traffic
 * - NZ Summer Cicadas (Tātarakihi Chorus)
 * - Classic Static Radio & AM Interference
 * - Wellington Southerly Gale & Wire Whistle
 * - Dannevirke Dairy Pie Warmer & Fluorescent Hum
 * - Rain on Corrugated Iron Roof
 * - Rural Paddock Diesel Tractor Idle
 */

export interface AtmosphereLayerDef {
  id: string;
  name: string;
  category: 'Urban' | 'Nature' | 'Broadcast' | 'Suburban';
  icon: string;
  tagline: string;
  culturalNote: string;
  defaultVolume: number;
  tags: string[];
}

export const ATMOSPHERE_LAYERS: AtmosphereLayerDef[] = [
  {
    id: 'k-road-traffic',
    name: "Karangahape Rd Traffic",
    category: 'Urban',
    icon: '🚗',
    tagline: "Distant Auckland city rumble, wet asphalt tyre hiss & diesel bus air brakes",
    culturalNote: "The unmistakable 2:00 AM backdrop of K' Rd and Queen Street before the night bus arrives.",
    defaultVolume: 0.55,
    tags: ['traffic', 'urban', 'city', 'k-road', 'car', 'street', 'night']
  },
  {
    id: 'nz-cicadas',
    name: 'NZ Summer Cicadas',
    category: 'Nature',
    icon: '🦗',
    tagline: 'Pulsing Tātarakihi high-frequency chorus in hot dry bush and suburban lawns',
    culturalNote: 'The sound of Christmas holidays, baking Hawke’s Bay lawns, and scorching afternoons.',
    defaultVolume: 0.60,
    tags: ['cicada', 'nature', 'summer', 'bush', 'lawn', 'heat', 'daytime', 'outside']
  },
  {
    id: 'static-radio',
    name: 'AM Radio Static & Drift',
    category: 'Broadcast',
    icon: '📻',
    tagline: '1980s Avalon CRT hiss, AM heterodyne tone flutter, and shortwave crackle',
    culturalNote: 'Late-night talkback radio fading between Palmerston North and Wellington repeaters.',
    defaultVolume: 0.45,
    tags: ['static', 'radio', 'am', 'crt', 'broadcast', 'tape', 'interference', 'hum']
  },
  {
    id: 'wellington-gale',
    name: 'Wellington Southerly Gale',
    category: 'Nature',
    icon: '💨',
    tagline: 'Gusting 80-knot Cook Strait wind whistling through telephone wires',
    culturalNote: 'Turning umbrellas inside out on Lambton Quay and whistling past the Basin Reserve.',
    defaultVolume: 0.50,
    tags: ['wind', 'gale', 'wellington', 'storm', 'wire', 'cold', 'outdoor']
  },
  {
    id: 'dairy-hum',
    name: 'Dairy Hum & Pie Warmer',
    category: 'Suburban',
    icon: '🥧',
    tagline: '50Hz mains hum, fluorescent tube phosphor buzz & glass cabinet warmth',
    culturalNote: 'Dannevirke 24-hr BP and corner Four Square pie warmers glowing at 3:15 AM.',
    defaultVolume: 0.50,
    tags: ['dairy', 'pie', 'hum', 'fluorescent', 'fridge', 'indoor', 'store', 'forecourt']
  },
  {
    id: 'corrugated-rain',
    name: 'Rain on Corrugated Roof',
    category: 'Nature',
    icon: '🌧️',
    tagline: 'Rhythmic metallic patter of steady rain on galvanized corrugated iron',
    culturalNote: 'The universal soundtrack of bach holidays, woolsheds, and suburban carports.',
    defaultVolume: 0.50,
    tags: ['rain', 'roof', 'corrugated', 'bach', 'water', 'storm', 'patter']
  },
  {
    id: 'paddock-tractor',
    name: 'Rural Tractor Idle',
    category: 'Suburban',
    icon: '🚜',
    tagline: 'Rhythmic low-rpm diesel engine thrum with distant paddock ambiance',
    culturalNote: 'Fred Dagg checking on Trev in the top paddock with a thermos and baling twine.',
    defaultVolume: 0.40,
    tags: ['tractor', 'farm', 'paddock', 'diesel', 'engine', 'rural', 'fred dagg']
  }
];

export interface PresetScene {
  id: string;
  name: string;
  description: string;
  layers: Record<string, { enabled: boolean; volume: number }>;
}

export const PRESET_ATMOSPHERES: PresetScene[] = [
  {
    id: 'k-rd-midnight',
    name: "K' Rd Midnight Noir",
    description: "Wet street asphalt hum, passing traffic and distant static interference",
    layers: {
      'k-road-traffic': { enabled: true, volume: 0.75 },
      'static-radio': { enabled: true, volume: 0.35 },
      'dairy-hum': { enabled: true, volume: 0.30 },
      'nz-cicadas': { enabled: false, volume: 0.4 },
      'wellington-gale': { enabled: false, volume: 0.3 },
      'corrugated-rain': { enabled: false, volume: 0.4 },
      'paddock-tractor': { enabled: false, volume: 0.3 },
    }
  },
  {
    id: 'waitakere-summer',
    name: 'Waitakere Summer Bach',
    description: 'Deafening cicada chorus and light corrugated iron roof thermal settling',
    layers: {
      'nz-cicadas': { enabled: true, volume: 0.85 },
      'static-radio': { enabled: true, volume: 0.20 },
      'k-road-traffic': { enabled: false, volume: 0.3 },
      'wellington-gale': { enabled: false, volume: 0.2 },
      'dairy-hum': { enabled: false, volume: 0.3 },
      'corrugated-rain': { enabled: false, volume: 0.3 },
      'paddock-tractor': { enabled: false, volume: 0.2 },
    }
  },
  {
    id: 'dannevirke-3am',
    name: 'Dannevirke 3:00 AM Forecourt',
    description: 'Fluorescent buzzing, microwave drone, and distant highway transit',
    layers: {
      'dairy-hum': { enabled: true, volume: 0.80 },
      'k-road-traffic': { enabled: true, volume: 0.40 },
      'static-radio': { enabled: true, volume: 0.45 },
      'nz-cicadas': { enabled: false, volume: 0.3 },
      'wellington-gale': { enabled: false, volume: 0.2 },
      'corrugated-rain': { enabled: false, volume: 0.3 },
      'paddock-tractor': { enabled: false, volume: 0.2 },
    }
  },
  {
    id: 'wellington-storm',
    name: 'Wellington Southerly Gale',
    description: 'Fierce Cook Strait wind and rain drumming on corrugated iron roofs',
    layers: {
      'wellington-gale': { enabled: true, volume: 0.80 },
      'corrugated-rain': { enabled: true, volume: 0.70 },
      'static-radio': { enabled: true, volume: 0.30 },
      'k-road-traffic': { enabled: false, volume: 0.3 },
      'nz-cicadas': { enabled: false, volume: 0.3 },
      'dairy-hum': { enabled: false, volume: 0.3 },
      'paddock-tractor': { enabled: false, volume: 0.2 },
    }
  },
  {
    id: 'fred-dagg-paddock',
    name: 'Fred Dagg Farming Paddock',
    description: 'Chugging diesel tractor, summer cicadas, and AM talkback radio',
    layers: {
      'paddock-tractor': { enabled: true, volume: 0.70 },
      'nz-cicadas': { enabled: true, volume: 0.45 },
      'static-radio': { enabled: true, volume: 0.40 },
      'k-road-traffic': { enabled: false, volume: 0.2 },
      'wellington-gale': { enabled: false, volume: 0.2 },
      'dairy-hum': { enabled: false, volume: 0.2 },
      'corrugated-rain': { enabled: false, volume: 0.3 },
    }
  },
  {
    id: 'avalon-broadcast-vault',
    name: 'Avalon Studio 4 Tape Vault',
    description: 'Heavy tape hiss, CRT 15kHz flyback hum and 50Hz studio mains line',
    layers: {
      'static-radio': { enabled: true, volume: 0.85 },
      'dairy-hum': { enabled: true, volume: 0.50 },
      'k-road-traffic': { enabled: false, volume: 0.2 },
      'nz-cicadas': { enabled: false, volume: 0.2 },
      'wellington-gale': { enabled: false, volume: 0.2 },
      'corrugated-rain': { enabled: false, volume: 0.2 },
      'paddock-tractor': { enabled: false, volume: 0.2 },
    }
  },
  {
    id: 'central-westside-idle',
    name: 'Central Westside Night Drive',
    description: 'Slammed import idling in rain, amber sodium hum, and distant Auckland traffic',
    layers: {
      'k-road-traffic': { enabled: true, volume: 0.80 },
      'corrugated-rain': { enabled: true, volume: 0.50 },
      'static-radio': { enabled: true, volume: 0.40 },
      'dairy-hum': { enabled: true, volume: 0.35 },
      'nz-cicadas': { enabled: false, volume: 0.2 },
      'wellington-gale': { enabled: false, volume: 0.2 },
      'paddock-tractor': { enabled: false, volume: 0.2 },
    }
  }
];

interface ActiveLayerNodes {
  gainNode: GainNode;
  nodes: (AudioNode | number)[];
  cleanup: () => void;
}

class ProceduralAtmosphereEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMasterMuted = false;
  private masterVolume = 0.75;
  private activeLayers: Map<string, ActiveLayerNodes> = new Map();
  private noiseBuffer: AudioBuffer | null = null;
  private pinkNoiseBuffer: AudioBuffer | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMasterMuted ? 0 : this.masterVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (this.noiseBuffer) return this.noiseBuffer;
    const bufferSize = ctx.sampleRate * 4; // 4 seconds looping white noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = buffer;
    return buffer;
  }

  private getPinkNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (this.pinkNoiseBuffer) return this.pinkNoiseBuffer;
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    this.pinkNoiseBuffer = buffer;
    return buffer;
  }

  public setMasterVolume(val: number) {
    this.masterVolume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMasterMuted) {
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
  }

  public setMasterMute(muted: boolean) {
    this.isMasterMuted = muted;
    if (this.masterGain && this.ctx) {
      const target = muted ? 0 : this.masterVolume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
  }

  public setLayerVolume(layerId: string, volume: number) {
    const layer = this.activeLayers.get(layerId);
    if (layer && this.ctx) {
      layer.gainNode.gain.setTargetAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime, 0.05);
    }
  }

  public startLayer(layerId: string, volume = 0.5) {
    if (this.activeLayers.has(layerId)) {
      this.setLayerVolume(layerId, volume);
      return;
    }

    try {
      const ctx = this.getContext();
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.setTargetAtTime(volume, ctx.currentTime, 0.1);
      gainNode.connect(this.masterGain!);

      let cleanup = () => {};
      const nodes: (AudioNode | number)[] = [gainNode];

      switch (layerId) {
        case 'k-road-traffic': {
          // Low rumble + filtered pink noise + LFO modulation for passing cars
          const pinkNoise = ctx.createBufferSource();
          pinkNoise.buffer = this.getPinkNoiseBuffer(ctx);
          pinkNoise.loop = true;

          const lowFilter = ctx.createBiquadFilter();
          lowFilter.type = 'lowpass';
          lowFilter.frequency.setValueAtTime(140, ctx.currentTime);

          // Traffic swell LFO
          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(50, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(lowFilter.frequency);

          // Tyre hiss layer
          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = this.getNoiseBuffer(ctx);
          whiteNoise.loop = true;
          const hissFilter = ctx.createBiquadFilter();
          hissFilter.type = 'bandpass';
          hissFilter.frequency.setValueAtTime(800, ctx.currentTime);
          hissFilter.Q.setValueAtTime(1.5, ctx.currentTime);
          const hissGain = ctx.createGain();
          hissGain.gain.setValueAtTime(0.08, ctx.currentTime);

          // Sub rumble
          const subRumble = ctx.createOscillator();
          subRumble.type = 'sine';
          subRumble.frequency.setValueAtTime(42, ctx.currentTime);
          const subGain = ctx.createGain();
          subGain.gain.setValueAtTime(0.15, ctx.currentTime);

          pinkNoise.connect(lowFilter);
          lowFilter.connect(gainNode);

          whiteNoise.connect(hissFilter);
          hissFilter.connect(hissGain);
          hissGain.connect(gainNode);

          subRumble.connect(subGain);
          subGain.connect(gainNode);

          pinkNoise.start();
          whiteNoise.start();
          subRumble.start();
          lfo.start();

          cleanup = () => {
            try {
              pinkNoise.stop();
              whiteNoise.stop();
              subRumble.stop();
              lfo.stop();
              pinkNoise.disconnect();
              whiteNoise.disconnect();
              subRumble.disconnect();
              lfo.disconnect();
              gainNode.disconnect();
            } catch (e) {}
          };
          break;
        }

        case 'nz-cicadas': {
          // Dual high resonant bandpass noise filters with rhythmic swelling amplitude LFOs
          const noiseSource = ctx.createBufferSource();
          noiseSource.buffer = this.getNoiseBuffer(ctx);
          noiseSource.loop = true;

          const cicadaFilter1 = ctx.createBiquadFilter();
          cicadaFilter1.type = 'bandpass';
          cicadaFilter1.frequency.setValueAtTime(4400, ctx.currentTime);
          cicadaFilter1.Q.setValueAtTime(12, ctx.currentTime);

          const cicadaFilter2 = ctx.createBiquadFilter();
          cicadaFilter2.type = 'bandpass';
          cicadaFilter2.frequency.setValueAtTime(5800, ctx.currentTime);
          cicadaFilter2.Q.setValueAtTime(10, ctx.currentTime);

          // Fast chirp tremolo
          const chirpLFO = ctx.createOscillator();
          chirpLFO.frequency.setValueAtTime(14, ctx.currentTime); // 14Hz chirp rate
          const chirpGain = ctx.createGain();
          chirpGain.gain.setValueAtTime(0.35, ctx.currentTime);
          chirpLFO.connect(chirpGain);

          // Slow swell (summer heat wave cycle)
          const swellLFO = ctx.createOscillator();
          swellLFO.frequency.setValueAtTime(0.2, ctx.currentTime);
          const swellGain = ctx.createGain();
          swellGain.gain.setValueAtTime(0.25, ctx.currentTime);
          swellLFO.connect(swellGain);

          const cicadaVCA = ctx.createGain();
          cicadaVCA.gain.setValueAtTime(0.4, ctx.currentTime);
          chirpGain.connect(cicadaVCA.gain);
          swellGain.connect(cicadaVCA.gain);

          noiseSource.connect(cicadaFilter1);
          noiseSource.connect(cicadaFilter2);
          cicadaFilter1.connect(cicadaVCA);
          cicadaFilter2.connect(cicadaVCA);
          cicadaVCA.connect(gainNode);

          noiseSource.start();
          chirpLFO.start();
          swellLFO.start();

          cleanup = () => {
            try {
              noiseSource.stop();
              chirpLFO.stop();
              swellLFO.stop();
              noiseSource.disconnect();
              chirpLFO.disconnect();
              swellLFO.disconnect();
              gainNode.disconnect();
            } catch (e) {}
          };
          break;
        }

        case 'static-radio': {
          // Bandpass filtered noise + 1000Hz AM carrier whistle + occasional crackle burst
          const noiseSource = ctx.createBufferSource();
          noiseSource.buffer = this.getNoiseBuffer(ctx);
          noiseSource.loop = true;

          const radioFilter = ctx.createBiquadFilter();
          radioFilter.type = 'bandpass';
          radioFilter.frequency.setValueAtTime(1800, ctx.currentTime);
          radioFilter.Q.setValueAtTime(1.8, ctx.currentTime);

          // AM carrier whine
          const carrier = ctx.createOscillator();
          carrier.type = 'sine';
          carrier.frequency.setValueAtTime(1150, ctx.currentTime);
          const carrierGain = ctx.createGain();
          carrierGain.gain.setValueAtTime(0.015, ctx.currentTime);

          // Drift LFO for carrier
          const driftLFO = ctx.createOscillator();
          driftLFO.frequency.setValueAtTime(0.3, ctx.currentTime);
          const driftGain = ctx.createGain();
          driftGain.gain.setValueAtTime(45, ctx.currentTime);
          driftLFO.connect(driftGain);
          driftGain.connect(carrier.frequency);

          // CRT 15.625kHz flyback hum (subtle retro feel)
          const crtOsc = ctx.createOscillator();
          crtOsc.type = 'sine';
          crtOsc.frequency.setValueAtTime(15625, ctx.currentTime);
          const crtGain = ctx.createGain();
          crtGain.gain.setValueAtTime(0.006, ctx.currentTime);

          noiseSource.connect(radioFilter);
          radioFilter.connect(gainNode);

          carrier.connect(carrierGain);
          carrierGain.connect(gainNode);

          crtOsc.connect(crtGain);
          crtGain.connect(gainNode);

          noiseSource.start();
          carrier.start();
          driftLFO.start();
          crtOsc.start();

          cleanup = () => {
            try {
              noiseSource.stop();
              carrier.stop();
              driftLFO.stop();
              crtOsc.stop();
              noiseSource.disconnect();
              carrier.disconnect();
              driftLFO.disconnect();
              crtOsc.disconnect();
              gainNode.disconnect();
            } catch (e) {}
          };
          break;
        }

        case 'wellington-gale': {
          // Low/mid howling wind with resonant bandpass whistling
          const pinkNoise = ctx.createBufferSource();
          pinkNoise.buffer = this.getPinkNoiseBuffer(ctx);
          pinkNoise.loop = true;

          const windFilter = ctx.createBiquadFilter();
          windFilter.type = 'bandpass';
          windFilter.frequency.setValueAtTime(320, ctx.currentTime);
          windFilter.Q.setValueAtTime(3.5, ctx.currentTime);

          // Gust modulator
          const gustLFO = ctx.createOscillator();
          gustLFO.frequency.setValueAtTime(0.18, ctx.currentTime);
          const gustGain = ctx.createGain();
          gustGain.gain.setValueAtTime(280, ctx.currentTime);
          gustLFO.connect(gustGain);
          gustGain.connect(windFilter.frequency);

          // Telephone wire whistle
          const wireOsc = ctx.createOscillator();
          wireOsc.type = 'sine';
          wireOsc.frequency.setValueAtTime(740, ctx.currentTime);
          const wireGain = ctx.createGain();
          wireGain.gain.setValueAtTime(0.03, ctx.currentTime);

          const wirePitchLFO = ctx.createOscillator();
          wirePitchLFO.frequency.setValueAtTime(0.25, ctx.currentTime);
          const wirePitchGain = ctx.createGain();
          wirePitchGain.gain.setValueAtTime(120, ctx.currentTime);
          wirePitchLFO.connect(wirePitchGain);
          wirePitchGain.connect(wireOsc.frequency);

          pinkNoise.connect(windFilter);
          windFilter.connect(gainNode);

          wireOsc.connect(wireGain);
          wireGain.connect(gainNode);

          pinkNoise.start();
          gustLFO.start();
          wireOsc.start();
          wirePitchLFO.start();

          cleanup = () => {
            try {
              pinkNoise.stop();
              gustLFO.stop();
              wireOsc.stop();
              wirePitchLFO.stop();
              pinkNoise.disconnect();
              gustLFO.disconnect();
              wireOsc.disconnect();
              wirePitchLFO.disconnect();
              gainNode.disconnect();
            } catch (e) {}
          };
          break;
        }

        case 'dairy-hum': {
          // 50Hz mains hum + 100Hz/150Hz upper harmonics + fluorescent phosphor buzzing
          const mains50 = ctx.createOscillator();
          mains50.type = 'sine';
          mains50.frequency.setValueAtTime(50, ctx.currentTime);
          const gain50 = ctx.createGain();
          gain50.gain.setValueAtTime(0.2, ctx.currentTime);

          const mains100 = ctx.createOscillator();
          mains100.type = 'sine';
          mains100.frequency.setValueAtTime(100, ctx.currentTime);
          const gain100 = ctx.createGain();
          gain100.gain.setValueAtTime(0.08, ctx.currentTime);

          const mains150 = ctx.createOscillator();
          mains150.type = 'sine';
          mains150.frequency.setValueAtTime(150, ctx.currentTime);
          const gain150 = ctx.createGain();
          gain150.gain.setValueAtTime(0.04, ctx.currentTime);

          // Fluorescent ballast buzz (filtered noise at 3200Hz)
          const noise = ctx.createBufferSource();
          noise.buffer = this.getNoiseBuffer(ctx);
          noise.loop = true;
          const buzzFilter = ctx.createBiquadFilter();
          buzzFilter.type = 'bandpass';
          buzzFilter.frequency.setValueAtTime(3200, ctx.currentTime);
          buzzFilter.Q.setValueAtTime(8, ctx.currentTime);
          const buzzGain = ctx.createGain();
          buzzGain.gain.setValueAtTime(0.025, ctx.currentTime);

          mains50.connect(gain50);
          gain50.connect(gainNode);

          mains100.connect(gain100);
          gain100.connect(gainNode);

          mains150.connect(gain150);
          gain150.connect(gainNode);

          noise.connect(buzzFilter);
          buzzFilter.connect(buzzGain);
          buzzGain.connect(gainNode);

          mains50.start();
          mains100.start();
          mains150.start();
          noise.start();

          cleanup = () => {
            try {
              mains50.stop();
              mains100.stop();
              mains150.stop();
              noise.stop();
              mains50.disconnect();
              mains100.disconnect();
              mains150.disconnect();
              noise.disconnect();
              gainNode.disconnect();
            } catch (e) {}
          };
          break;
        }

        case 'corrugated-rain': {
          // Granular noise bursts filtered to mimic raindrops on tin roof
          const pinkNoise = ctx.createBufferSource();
          pinkNoise.buffer = this.getPinkNoiseBuffer(ctx);
          pinkNoise.loop = true;

          const rainFilter = ctx.createBiquadFilter();
          rainFilter.type = 'bandpass';
          rainFilter.frequency.setValueAtTime(1200, ctx.currentTime);
          rainFilter.Q.setValueAtTime(0.9, ctx.currentTime);

          const highPatter = ctx.createBiquadFilter();
          highPatter.type = 'highpass';
          highPatter.frequency.setValueAtTime(2400, ctx.currentTime);

          const patterNoise = ctx.createBufferSource();
          patterNoise.buffer = this.getNoiseBuffer(ctx);
          patterNoise.loop = true;

          const patterGain = ctx.createGain();
          patterGain.gain.setValueAtTime(0.12, ctx.currentTime);

          // Tin roof resonance
          const tinResonance = ctx.createBiquadFilter();
          tinResonance.type = 'peaking';
          tinResonance.frequency.setValueAtTime(850, ctx.currentTime);
          tinResonance.gain.setValueAtTime(6, ctx.currentTime);

          pinkNoise.connect(rainFilter);
          rainFilter.connect(tinResonance);
          tinResonance.connect(gainNode);

          patterNoise.connect(highPatter);
          highPatter.connect(patterGain);
          patterGain.connect(gainNode);

          pinkNoise.start();
          patterNoise.start();

          cleanup = () => {
            try {
              pinkNoise.stop();
              patterNoise.stop();
              pinkNoise.disconnect();
              patterNoise.disconnect();
              gainNode.disconnect();
            } catch (e) {}
          };
          break;
        }

        case 'paddock-tractor': {
          // Low frequency sawtooth pulse (diesel cylinder firing rate ~16Hz) + diesel purr
          const engineOsc = ctx.createOscillator();
          engineOsc.type = 'sawtooth';
          engineOsc.frequency.setValueAtTime(18, ctx.currentTime);

          const engineFilter = ctx.createBiquadFilter();
          engineFilter.type = 'lowpass';
          engineFilter.frequency.setValueAtTime(220, ctx.currentTime);

          const subPurr = ctx.createOscillator();
          subPurr.type = 'sine';
          subPurr.frequency.setValueAtTime(54, ctx.currentTime);

          const subPurrGain = ctx.createGain();
          subPurrGain.gain.setValueAtTime(0.12, ctx.currentTime);

          engineOsc.connect(engineFilter);
          engineFilter.connect(gainNode);

          subPurr.connect(subPurrGain);
          subPurrGain.connect(gainNode);

          engineOsc.start();
          subPurr.start();

          cleanup = () => {
            try {
              engineOsc.stop();
              subPurr.stop();
              engineOsc.disconnect();
              subPurr.disconnect();
              gainNode.disconnect();
            } catch (e) {}
          };
          break;
        }
      }

      this.activeLayers.set(layerId, {
        gainNode,
        nodes,
        cleanup
      });
    } catch (e) {
      console.warn('Atmosphere start layer failed:', layerId, e);
    }
  }

  public stopLayer(layerId: string) {
    const layer = this.activeLayers.get(layerId);
    if (layer && this.ctx) {
      layer.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
      setTimeout(() => {
        layer.cleanup();
        this.activeLayers.delete(layerId);
      }, 120);
    }
  }

  public stopAllLayers() {
    this.activeLayers.forEach((_, key) => {
      this.stopLayer(key);
    });
  }
}

// Global Singleton Instance
export const atmosphereEngine = new ProceduralAtmosphereEngine();
