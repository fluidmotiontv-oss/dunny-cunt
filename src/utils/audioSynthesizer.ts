/**
 * Procedural Web Audio API Sound Synthesizer for NZ Comedy Living Comic Book
 * Generates authentic retro CRT hums, police radio squelches, ghostly foil crinkles,
 * dialup modem beeps, Billy T chuckle tones, and comedic stings.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playProceduralSound(preset: string) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    switch (preset) {
      case 'police-pie': {
        // Police scanner squelch + microwave drone + thermal buzz
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);

        // White noise burst for radio squelch
        const bufferSize = ctx.sampleRate * 0.15;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.18, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        // Microwave 50Hz hum
        const hum = ctx.createOscillator();
        const humGain = ctx.createGain();
        hum.type = 'sine';
        hum.frequency.setValueAtTime(50, now);
        humGain.gain.setValueAtTime(0.3, now);
        humGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

        whiteNoise.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        osc.connect(gain);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        gain.connect(ctx.destination);

        hum.connect(humGain);
        humGain.connect(ctx.destination);

        whiteNoise.start(now);
        osc.start(now);
        hum.start(now);
        whiteNoise.stop(now + 0.15);
        osc.stop(now + 0.3);
        hum.stop(now + 0.4);
        break;
      }

      case 'ghost-chips': {
        // Ethereal spectral chime + crinkle resonance
        const freqs = [523.25, 659.25, 783.99, 1046.5]; // C major ethereal
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.6);

          gain.gain.setValueAtTime(0.08, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + 0.8);
        });
        break;
      }

      case 'vampire-trademe': {
        // Gothic organ minor chord + modem dialup chirp
        const freqs = [220, 261.63, 329.63, 415.3]; // A minor baroque
        freqs.forEach((f) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.7);
        });

        // Modem click
        const click = ctx.createOscillator();
        const clickGain = ctx.createGain();
        click.type = 'sawtooth';
        click.frequency.setValueAtTime(1800, now + 0.1);
        click.frequency.setValueAtTime(1200, now + 0.2);
        clickGain.gain.setValueAtTime(0.08, now + 0.1);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        click.connect(clickGain);
        clickGain.connect(ctx.destination);
        click.start(now + 0.1);
        click.stop(now + 0.35);
        break;
      }

      case 'band-meeting': {
        // Acoustic ukulele single out-of-tune twang + pencil scratch
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(392, now); // G4
        osc.frequency.exponentialRampToValueAtTime(388, now + 0.4); // slightly flat!

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
        break;
      }

      case 'correos-meltdown': {
        // Frantic kinetic pasta rattle and bass thud
        const kick = ctx.createOscillator();
        const kickGain = ctx.createGain();
        kick.type = 'sine';
        kick.frequency.setValueAtTime(160, now);
        kick.frequency.exponentialRampToValueAtTime(35, now + 0.3);
        kickGain.gain.setValueAtTime(0.4, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        kick.connect(kickGain);
        kickGain.connect(ctx.destination);
        kick.start(now);
        kick.stop(now + 0.3);

        // Rapid bubble pops
        for (let i = 0; i < 4; i++) {
          const pop = ctx.createOscillator();
          const popGain = ctx.createGain();
          pop.type = 'square';
          pop.frequency.setValueAtTime(600 + i * 150, now + i * 0.06);
          popGain.gain.setValueAtTime(0.1, now + i * 0.06);
          popGain.gain.exponentialRampToValueAtTime(0.001, now + (i + 1) * 0.06);
          pop.connect(popGain);
          popGain.connect(ctx.destination);
          pop.start(now + i * 0.06);
          pop.stop(now + (i + 1) * 0.06);
        }
        break;
      }

      case 'billy-t-laugh': {
        // Billy T iconic staccato giggle pattern: "Huh-huh-huh-huh-huh!"
        const notes = [587.33, 659.25, 587.33, 659.25, 783.99, 880];
        notes.forEach((note, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(note, now + i * 0.08);
          gain.gain.setValueAtTime(0.18, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.07);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.07);
        });
        break;
      }

      case 'fred-dagg': {
        // Rural tractor diesel thud + wind whistle
        const tractor = ctx.createOscillator();
        const tractorGain = ctx.createGain();
        tractor.type = 'sawtooth';
        tractor.frequency.setValueAtTime(65, now);
        tractorGain.gain.setValueAtTime(0.2, now);
        tractorGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        tractor.connect(tractorGain);
        tractorGain.connect(ctx.destination);
        tractor.start(now);
        tractor.stop(now + 0.5);
        break;
      }

      case 'speedo-cop': {
        // Distorted megaphone crackle + high-vis whistle
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.linearRampToValueAtTime(800, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
        break;
      }

      case 'trademe-bid': {
        // Bright electronic cash register chime + victory ping
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.12, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.3);
        });
        break;
      }

      case 'taskmaster-horn': {
        // Loud brassy taskmaster airhorn / buzzer
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';
        osc1.frequency.setValueAtTime(220, now);
        osc2.frequency.setValueAtTime(233.08, now); // dissonance!
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.4);
        osc2.stop(now + 0.4);
        break;
      }

      case 'outrageous-burnout': {
        // Screeching tyre squeal + pub rock guitar hit
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.45);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
        break;
      }

      case 'lynn-tawa': {
        // 1980s shopping mall chime + high nasal squeak
        const notes = [659.25, 523.25, 783.99];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.15, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.2);
        });
        break;
      }

      case 'target-sting': {
        // Dramatic consumer investigative string stab
        const freqs = [185, 220, 277.18, 370];
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.6);
        });
        break;
      }

      case 'no8-wire': {
        // Metallic fencing wire twang
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
        break;
      }

      case 'wellington-paranormal': {
        // Theremin spooky slide
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
        osc.frequency.exponentialRampToValueAtTime(550, now + 0.5);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.55);
        break;
      }

      default: {
        // Subtle comic paper turn / haptic pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }
    }
  } catch (err) {
    console.warn('Audio synthesis warning:', err);
  }
}

/**
 * Speech synthesis assistant for 3-minute Kiwi comedy performance playback
 */
export function speakDialogue(text: string, pitch = 1.0, rate = 1.0) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel(); // Stop prior speech
    const cleanText = text.replace(/[*_#]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.pitch = Math.max(0.6, Math.min(1.8, pitch));
    utterance.rate = Math.max(0.7, Math.min(1.4, rate));

    // Prefer English voices (en-NZ, en-AU, en-GB if available)
    const voices = window.speechSynthesis.getVoices();
    const nzVoice = voices.find(v => v.lang.includes('en-NZ') || v.lang.includes('en-AU')) ||
      voices.find(v => v.lang.includes('en-GB')) ||
      voices[0];

    if (nzVoice) {
      utterance.voice = nzVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis error:', e);
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

