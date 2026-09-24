import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side Gemini client with proper user-agent telemetry
  let ai: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    if (!ai && process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return ai;
  }

  // AI 3-Minute Kiwi Comedy Mash-Up Generator (Piss-Take Engine)
  app.post('/api/gemini/generate-mashup', async (req, res) => {
    try {
      const { 
        protagonist, 
        antagonist, 
        location, 
        catalyst, 
        intensity, 
        customTopic 
      } = req.body;

      const client = getGeminiClient();

      if (!client) {
        // Return a rich, hilarious fallback mash-up if API key is not present
        const fallbackId = `mashup-fallback-${Date.now()}`;
        return res.json({
          success: true,
          isFallback: true,
          mashup: {
            id: fallbackId,
            title: `THE 3:00 AM DANNEVIRKE BP SUPER-NATURAL HOSTAGE CRISIS`,
            tagline: "When Vladislav's TradeMe pine table arrives at the BP service station warmer drawer.",
            roastTheme: "Suburban Bureaucracy vs Ancient Supernatural Royalty & Thermal Pastry Hazards",
            targetCulturalTrope: "Unshakable Kiwi Deadpan Under-Reaction to Eldritch Horrors",
            location: location || "Dannevirke BP Forecourt & Pie Warming Console",
            totalDurationSeconds: 180,
            characters: [
              {
                name: protagonist || "Senior Sgt Guy Baldwin",
                actorRef: "Police 10-7 (2009)",
                voiceTone: "Authoritative, deeply concerned uncle who only cares about mince pastry thermodynamics",
                avatarEmoji: "👮‍♂️",
                badgeColor: "bg-blue-500",
                pitch: 0.85,
                rate: 0.95
              },
              {
                name: antagonist || "Vladislav the Poker",
                actorRef: "What We Do in the Shadows",
                voiceTone: "Melodramatic ancient Romanian tyrant furious about TradeMe pickup terms",
                avatarEmoji: "🧛‍♂️",
                badgeColor: "bg-purple-500",
                pitch: 1.1,
                rate: 1.05
              },
              {
                name: "Monique the Ghost Chip",
                actorRef: "NZTA Safety Ad (2011)",
                voiceTone: "Ethereal, high-pitched teen conscience offering unwanted potato chips",
                avatarEmoji: "👻",
                badgeColor: "bg-cyan-500",
                pitch: 1.35,
                rate: 1.1
              }
            ],
            acts: [
              {
                actNumber: 1,
                actTitle: "Act 1: The 3:00 AM Routine Assessment (0:00 - 0:45)",
                timeRange: "0:00 - 0:45",
                startSecond: 0,
                endSecond: 45,
                sceneNotes: "The fluorescent hum of the pie warmer drawer in a deserted Dannevirke BP forecourt. Rain drips softly on a Holden Commodore bonnet.",
                beats: [
                  {
                    id: "b1",
                    second: 5,
                    timestamp: "00:05",
                    speaker: "Senior Sgt Guy Baldwin",
                    dialogue: "Look mate, step away from the Big Ben mince and cheese. It is three in the morning. That pastry has been absorbing sodium light since Tuesday. It is fundamentally thermo-nuclear.",
                    deliveryNote: "Deadpan paternal concern, hands hooked into stab vest",
                    sfxCue: "SFX (Police squelch & microwave hum): *KRR-CHHK-HUMMM*",
                    audioPreset: "police-pie",
                    stageAction: "Pulls out yellow thermal laser gun pointing at the pastry display"
                  },
                  {
                    id: "b2",
                    second: 20,
                    timestamp: "00:20",
                    speaker: "Vladislav the Poker",
                    dialogue: "Silence, mortal night watchman! I have crossed oceans of time and seven hundred kilometers in a 1994 Honda Civic to collect this pine coffee table I won on TradeMe for twelve dollars fifty!",
                    deliveryNote: "Full theatrical operatic fury, flourishing a damp velvet cape over a slushy machine",
                    sfxCue: "SFX (Gothic Harpsichord & Dial-Up Modem): *BEEP-BOOP-CHUNG*",
                    audioPreset: "vampire-trademe",
                    stageAction: "Fangs glint under neon price tags"
                  },
                  {
                    id: "b3",
                    second: 35,
                    timestamp: "00:35",
                    speaker: "Monique the Ghost Chip",
                    dialogue: "Bro, you know he can't grab your pine coffee table. It's a pickup-only auction from Upper Hutt. Space head.",
                    deliveryNote: "Airy supernatural echo floating above the magazine rack",
                    sfxCue: "SFX (Ethereal chip crinkle): *CRRRK-CHIME*",
                    audioPreset: "ghost-chips",
                    stageAction: "Bobs weightlessly next to the $1 lolly mix"
                  }
                ]
              },
              {
                actNumber: 2,
                actTitle: "Act 2: The Bureaucratic Escalation (0:45 - 2:00)",
                timeRange: "0:45 - 2:00",
                startSecond: 45,
                endSecond: 120,
                sceneNotes: "David Correos crashes through the servo automatic doors wearing 30 meters of caution tape, holding an unpeeled banana as a task weapon.",
                beats: [
                  {
                    id: "b4",
                    second: 55,
                    timestamp: "00:55",
                    speaker: "David Correos",
                    dialogue: "TASKMASTER HAS ORDERED ME TO DISSECT THE PAST-PRESENT CONTINUUM USING ONLY RED RASPBERRY TWISTS AND A REPAIR CERTIFICATE!",
                    deliveryNote: "Screaming at 160dB while pouring dry pasta into the BP coffee dispenser",
                    sfxCue: "SFX (Taskmaster Buzzer & Tape Ripping): *HONK-SHRRRRK*",
                    audioPreset: "taskmaster-horn",
                    stageAction: "Trips over a stack of firewood bundles"
                  },
                  {
                    id: "b5",
                    second: 75,
                    timestamp: "01:15",
                    speaker: "Senior Sgt Guy Baldwin",
                    dialogue: "Calm down, David. If you're going to transform into a demonic noodle storm on council forecourt, you need a high-visibility singlet and you must allow the pie at least four minutes to vent. Safer communities together.",
                    deliveryNote: "Gentle coaching voice, entirely ignoring the roaring hellfire",
                    sfxCue: "SFX (Radio squelch): *CHHK*",
                    audioPreset: "police-pie",
                    stageAction: "Passes David a paper napkin with extreme calm"
                  },
                  {
                    id: "b6",
                    second: 95,
                    timestamp: "01:35",
                    speaker: "Vladislav the Poker",
                    dialogue: "Is there no respect for ancient aristocrats in the Manawatu? In 1450 I impaled armies on stakes! Now I am held hostage by a ghost chip and a man who refuses to blow on his molten pastry!",
                    deliveryNote: "Deep existential exhaustion, checking his TradeMe buyer feedback on a Nokia 3310",
                    sfxCue: "SFX (Organ chime): *DUM-DUM*",
                    audioPreset: "vampire-trademe",
                    stageAction: "Rubs temples in despair"
                  }
                ]
              },
              {
                actNumber: 3,
                actTitle: "Act 3: The Thermal Resolution & Deadpan Truce (2:00 - 3:00)",
                timeRange: "2:00 - 3:00",
                startSecond: 120,
                endSecond: 180,
                sceneNotes: "Fred Dagg pulls up in a Ferguson tractor, holding a spool of No. 8 wire. The pie reaches safe edible temperature.",
                beats: [
                  {
                    id: "b7",
                    second: 135,
                    timestamp: "02:15",
                    speaker: "Fred Dagg",
                    dialogue: "Gidday. Me and Trev saw the cosmic vortex from the top paddock. Reckoned someone had left the gate open. If you wrap a bit of fencing wire round that TradeMe table, she'll fit right on the tray of the Delica, no worries.",
                    deliveryNote: "Classic laconic rural drawl, leaning on gumboot",
                    sfxCue: "SFX (Tractor rumble & wire twang): *PUTT-PUTT-TWANG*",
                    audioPreset: "no8-wire",
                    stageAction: "Tightens the spacetime rift with pliers"
                  },
                  {
                    id: "b8",
                    second: 155,
                    timestamp: "02:35",
                    speaker: "Senior Sgt Guy Baldwin",
                    dialogue: "Notice the steam dispersion. We are down to 59.2 degrees Celsius. That pastry is now officially certified for consumption. Good work team.",
                    deliveryNote: "Giving an approving nod to the supernatural entity",
                    sfxCue: "SFX (Victory fanfare): *CHIME*",
                    audioPreset: "trademe-bid",
                    stageAction: "Takes a modest, unhurried bite"
                  },
                  {
                    id: "b9",
                    second: 170,
                    timestamp: "02:50",
                    speaker: "Monique the Ghost Chip",
                    dialogue: "Legend. Puzzle is proud of you bro. Now grab your ghost chips and get home safely.",
                    deliveryNote: "Fades into the glowing pie warmer with a smile",
                    sfxCue: "SFX (Ghostly chime): *CHIME-FADE*",
                    audioPreset: "ghost-chips",
                    stageAction: "Credits roll across the Dannevirke BP canopy"
                  }
                ]
              }
            ],
            pissTakeBreakdown: "Deconstructs the supreme New Zealand cultural reflex: taking existential, cosmic, and supernatural disasters and treating them with the exact emotional weight of a council parking ticket or a dairy pie review."
          }
        });
      }

      const systemPrompt = `You are the absolute master of New Zealand satirical comedy, Kiwi cultural piss-takes, and deadpan absurdist timing.
Your task is to write an unhinged, laugh-out-loud, razor-sharp 3-MINUTE COMEDY MASH-UP SKETCH (Total duration: exactly 180 seconds / 3 acts) that takes the absolute piss out of iconic New Zealand cultural tropes, famous personalities, institutions, and television moments.

The sketch MUST follow this exact 3-minute structure:
- Total runtime: 180 seconds
- Act 1: The Setup (0:00 - 0:45) - Mundane Kiwi setting, deadpan under-reaction meeting absurd conflict
- Act 2: The Escalation & Chaos (0:45 - 2:00) - Unhinged personality clash, DIY mayhem, conflicting Kiwi subtexts
- Act 3: The Climax & Resolution (2:00 - 3:00) - Climax resolved by mundane pragmatism (No. 8 wire, tea towel, blowing on the pie, TradeMe feedback, council form)

OUTPUT MUST BE STRICT JSON MATCHING THIS EXACT SCHEMA:
{
  "id": string,
  "title": string (Punchy uppercase Kiwi comedy title),
  "tagline": string,
  "roastTheme": string,
  "targetCulturalTrope": string,
  "location": string,
  "totalDurationSeconds": 180,
  "characters": [
    {
      "name": string,
      "actorRef": string,
      "voiceTone": string,
      "avatarEmoji": string,
      "badgeColor": string (e.g. "bg-blue-500", "bg-purple-500", "bg-amber-500", "bg-emerald-500"),
      "pitch": number (0.7 to 1.4),
      "rate": number (0.8 to 1.3)
    }
  ],
  "acts": [
    {
      "actNumber": 1,
      "actTitle": string,
      "timeRange": "0:00 - 0:45",
      "startSecond": 0,
      "endSecond": 45,
      "sceneNotes": string,
      "beats": [
        {
          "id": string,
          "second": number (0 to 45),
          "timestamp": string (e.g. "00:15"),
          "speaker": string,
          "dialogue": string (Hilarious, culturally authentic Kiwi lines),
          "deliveryNote": string,
          "sfxCue": string,
          "audioPreset": string (one of: 'police-pie', 'ghost-chips', 'vampire-trademe', 'band-meeting', 'correos-meltdown', 'billy-t-laugh', 'fred-dagg', 'speedo-cop', 'trademe-bid', 'taskmaster-horn', 'outrageous-burnout', 'lynn-tawa', 'target-sting', 'no8-wire', 'wellington-paranormal'),
          "stageAction": string
        }
      ]
    },
    {
      "actNumber": 2,
      "actTitle": string,
      "timeRange": "0:45 - 2:00",
      "startSecond": 45,
      "endSecond": 120,
      "sceneNotes": string,
      "beats": [
        {
          "id": string,
          "second": number (45 to 120),
          "timestamp": string (e.g. "01:10"),
          "speaker": string,
          "dialogue": string,
          "deliveryNote": string,
          "sfxCue": string,
          "audioPreset": string,
          "stageAction": string
        }
      ]
    },
    {
      "actNumber": 3,
      "actTitle": string,
      "timeRange": "2:00 - 3:00",
      "startSecond": 120,
      "endSecond": 180,
      "sceneNotes": string,
      "beats": [
        {
          "id": string,
          "second": number (120 to 180),
          "timestamp": string (e.g. "02:30"),
          "speaker": string,
          "dialogue": string,
          "deliveryNote": string,
          "sfxCue": string,
          "audioPreset": string,
          "stageAction": string
        }
      ]
    }
  ],
  "pissTakeBreakdown": string
}`;

      const userMessage = `Write the funniest 3-Minute Kiwi Cultural Comedy Mash-Up Sketch:
- Protagonist / Main Figure: ${protagonist || 'Senior Sgt Guy Baldwin / Police 10-7'}
- Antagonist / Challenger: ${antagonist || 'Vladislav the Poker / What We Do in the Shadows'}
- Location / Arena: ${location || '24-hour Dannevirke BP Forecourt'}
- Absurd Catalyst / Piss-Take: ${catalyst || 'Thermo-Nuclear Pie Hazard meets TradeMe Auction Dispute'}
- Satirical Intensity: ${intensity || 'Maximum Unhinged DIY Kiwi Mayhem'}
- Custom Twist: ${customTopic || 'Include ghost chips, Taskmaster panic, and No. 8 wire philosophy'}`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: userMessage,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
        },
      });

      const mashupData = JSON.parse(response.text || '{}');
      if (!mashupData.id) mashupData.id = `mashup-${Date.now()}`;
      mashupData.totalDurationSeconds = 180;

      return res.json({
        success: true,
        mashup: mashupData,
      });

    } catch (error: any) {
      console.error('Error generating 3-minute mashup:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to generate 3-minute comedy mash-up',
      });
    }
  });


  // AI Text Analysis & Kiwi Cultural Phrasing Doctor
  app.post('/api/gemini/analyze-slang', async (req, res) => {
    try {
      const { text, targetArchetype, tonePreference } = req.body;
      const client = getGeminiClient();

      if (!client) {
        // High quality fallback analysis if GEMINI_API_KEY is not configured
        return res.json({
          success: true,
          isFallback: true,
          analysis: {
            overallVerdict: "Strong raw comedic premise with room for deeper Aotearoa archival sharpness.",
            kiwiScore: 78,
            primaryToneDetected: tonePreference || "Deadpan Provincial Realism",
            enhancementSuggestions: [
              {
                originalLine: "The pie is very hot.",
                enhancedLine: "Look mate, that pastry has been residing in the warmer drawer since Tuesday. It is fundamentally thermo-nuclear.",
                iconicSource: "Police 10-7 (2009) / Guy Baldwin",
                comedicReasoning: "Transforms a flat statement of fact into a paternal public safety advisory with high thermodynamic stakes."
              },
              {
                originalLine: "Can you help me fix this?",
                enhancedLine: "Me and Trev reckon a bit of No. 8 wire and some baling twine will sort her right out.",
                iconicSource: "Fred Dagg (1975) / John Clarke",
                comedicReasoning: "Injects the ubiquitous rural Trev companion trope and unshakeable improvised DIY optimism."
              },
              {
                originalLine: "I don't believe you.",
                enhancedLine: "Bro, you know I can't grab your ghost chips. Space head.",
                iconicSource: "NZTA Legend Ad (2011)",
                comedicReasoning: "Uses surreal peer-pressure diffusion rather than direct confrontation."
              }
            ],
            fullScriptRewrite: text 
              ? `${text}\n\n[DIRECTOR'S NOTE: Paced with maximum deadpan under-reaction. Let the silence hang for three seconds while characters stare at a pine table on TradeMe.]`
              : "Officer Minogue looks at the microwave. 'O\'Leary, is that pie communicating via Morse code, or is it just the cheese pocket venting?'"
          }
        });
      }

      const systemPrompt = `You are the ultimate New Zealand Cultural Comedy Phrasing Doctor, literary editor, and master of Aotearoa deadpan satire (spanning Fred Dagg, Billy T James, Police 10-7, Outrageous Fortune, What We Do in the Shadows, Flight of the Conchords, Hunt for the Wilderpeople, Taskmaster NZ, and Moon TV).

Your mission is to analyze a comic script or dialogue passage, identify flat/generic phrasing or under-utilized Kiwi slang opportunities, and suggest iconic, razor-sharp cultural phrasing alternatives directly rooted in New Zealand's comedic archive.

Return STRICT JSON matching this schema:
{
  "overallVerdict": string (2-3 sentences analyzing the comedic rhythm and cultural specificity),
  "kiwiScore": number (1 to 100),
  "primaryToneDetected": string,
  "enhancementSuggestions": [
    {
      "originalLine": string,
      "enhancedLine": string,
      "iconicSource": string (e.g. "What We Do in the Shadows (2014)", "Police 10-7 (2009)", "Outrageous Fortune", "Fred Dagg"),
      "comedicReasoning": string
    }
  ],
  "fullScriptRewrite": string (A masterfully rewritten version of the text maintaining the original narrative arc but dialed up to 100% authentic Kiwi comic delivery, deadpan under-reaction, and archival callbacks)
}`;

      const userPrompt = `Analyze and Kiwi-fy this script text:
"""
${text || 'Hey friend, this pie is very hot. What should we do with this vampire? Let us fix the fence and steal a car.'}
"""

Desired Cultural Archetype / Lens: ${targetArchetype || 'All-Archive Kiwi Comedy Blend'}
Tone Preference: ${tonePreference || 'Quintessential Deadpan Understatement & Piss-Take Timing'}`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
        },
      });

      const parsedData = JSON.parse(response.text || '{}');
      return res.json({
        success: true,
        analysis: parsedData,
      });

    } catch (error: any) {
      console.error('Error analyzing slang:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to analyze script text',
      });
    }
  });

  // AI Living Comic Script & Archive Generator
  app.post('/api/gemini/generate-script', async (req, res) => {
    try {
      const { prompt, momentTitle, style } = req.body;
      const client = getGeminiClient();

      if (!client) {
        // Return a graceful rich generated script fallback if API key is not configured yet
        return res.json({
          success: true,
          isFallback: true,
          pageScript: {
            pageNumber: 3,
            pageTitle: "THE NIGHT RAID ON MINOGUE'S PIE WARMER",
            theme: "Supernatural Deadpan / Avalon Archives",
            panels: [
              {
                panelNumber: 1,
                visualDescription: "Officer O'Leary and Officer Minogue parked outside a 24-hour BP in Petone. Fluorescent sodium light glints off the patrol car bonnet. A phantom meat pie hovers three inches above the dashboard.",
                livingDirective: "[Panel State: Continuous Loop / Thermal Glow] [Audio Layer: Faint police scanner static + distance dog barking] [Tactile Depth: Tilt reveals internal meat temperature gauge hovering at 83°C - Safer Communities Together]",
                dialogue: [
                  { speaker: "OFFICER O'LEARY", text: "Minogue. You can't let the spectral pastry achieve critical mass without thermal verification." },
                  { speaker: "OFFICER MINOGUE", text: "It's blowing on itself, O'Leary. Look at it. It's self-cooling. That's poltergeist efficiency right there." }
                ],
                sfx: "SFX (Thermodynamic Hum): *Fzzzzzz-whooosh*"
              },
              {
                panelNumber: 2,
                visualDescription: "Close-up on the pie. A tiny apparition of Leigh Hart wearing a neon Speedo peeks out through the gravy crust.",
                livingDirective: "[Panel State: Trigger on Tap / Pie Crust Flakes Bleed into Panel 3] [Audio Layer: Leigh Hart deadpan commercial voiceover whisper]",
                dialogue: [
                  { speaker: "SPEEDO COP (IN PIE)", text: "Look mate, I'm just conducting a routine undergarment survey inside this mince and cheese." }
                ],
                sfx: "SFX (Radio Crunch): *Krrr-chchch-crust*"
              }
            ]
          }
        });
      }

      const systemPrompt = `You are a master New Zealand cultural archivist, dry satirical comedy writer, and Living Comic Book scriptwriter.
Your task is to generate a professional, culturally authentic comic script page in the "Living Comic Book" architecture (resembling a Harry Potter moving newspaper on steroids with dynamic Living Canvas Directives).

Output MUST be strictly JSON format matching this schema:
{
  "pageNumber": number,
  "pageTitle": string,
  "theme": string,
  "culturalSubtext": string,
  "panels": [
    {
      "panelNumber": number,
      "visualDescription": string,
      "livingDirective": string (must include [Panel State: ...], [Audio Layer: ...], [Tactile/Interactive Depth: ...], [Cross-Panel Bleed: ...]),
      "dialogue": [
        { "speaker": string, "text": string }
      ],
      "sfx": string
    }
  ]
}`;

      const userMessage = `Create a brand new Living Comic Script Page based on:
Moment / Scenario: ${momentTitle || prompt || 'Fred Dagg meeting Wellington Paranormal at a remote dairy in Dannevirke'}
Style & Focus: ${style || 'Quintessential Kiwi deadpan, DIY ingenuity, and metaphysical archival chaos'}`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: userMessage,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
        },
      });

      const scriptData = JSON.parse(response.text || '{}');
      return res.json({
        success: true,
        pageScript: scriptData,
      });
    } catch (error: any) {
      console.error('Error generating script:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to generate living comic script',
      });
    }
  });

  // AI Character Visual Concept Reference Generator
  app.post('/api/gemini/generate-character-concept', async (req, res) => {
    try {
      const { characterName, sceneContext, visualDescription, dialogueSnippet, artStyle } = req.body;
      const client = getGeminiClient();

      if (!client) {
        // High quality fallback model sheet data if API key is not configured
        const fallbackName = characterName || "Senior Sgt Guy Baldwin";
        return res.json({
          success: true,
          isFallback: true,
          concept: {
            characterName: fallbackName,
            archetypeRole: "Paternal Deadpan Law Enforcement & Thermal Pastry Specialist",
            iconicQuote: dialogueSnippet || "Look mate, that pastry is fundamentally thermo-nuclear. You must always blow on the pie.",
            visualAnatomy: {
              build: "Stocky, sturdy 1980s Kiwi provincial frame, upright posture with paternal calm.",
              facialFeatures: "Thick bristling brown police moustache, heavy furrowed brow of perpetual practical concern, intense eye contact.",
              posture: "Hands hooked firmly into tactical high-vis vest; arms angled in instructional stance."
            },
            costumeBreakdown: {
              headwear: "Standard issue 1980s checkerboard police peaked cap or bareheaded with practical side-part.",
              upperBody: "Fluorescent yellow-green high-visibility police vest over crisp dark navy patrol shirt.",
              lowerBody: "Dark navy tactical wool trousers with sturdy reinforced belt and radio holster.",
              footwear: "High-shine black leather police boots suitable for gravel forecourts."
            },
            iconicProps: [
              "Yellow laser infrared temperature gun calibrated for minced beef pastries (display reads 88.4°C)",
              "Laminated 'Safer Communities Together' advisory pamphlet",
              "Standard issue notebook with stubby HB pencil"
            ],
            colorPalette: [
              { name: "High-Vis Neon Yellow", hex: "#ccff00", usage: "Safety vest & thermal laser casing" },
              { name: "Police Patrol Navy", hex: "#0a192f", usage: "Shirt, trousers & cap band" },
              { name: "Thermonuclear Pastry Amber", hex: "#f59e0b", usage: "Steaming pie filling glow" },
              { name: "Manawatu Asphalt Slate", hex: "#334155", usage: "Forecourt background tone" }
            ],
            expressionSheet: [
              { label: "Paternal Warning", description: "Deadpan raised eyebrow, mouth slightly pursed, calm eye contact." },
              { label: "Thermal Dismay", description: "Squinting at laser thermometer reading with slight head shake." },
              { label: "Satisfied Certification", description: "Modest nod of approval as steam dissipates to safe consumption levels." }
            ],
            comicArtStylePrompt: `Character model sheet turnaround of ${fallbackName}, a deadpan New Zealand police officer wearing high-vis tactical vest and police cap, holding a yellow digital laser thermometer pointing at a steaming meat pie. 1980s retro comic book art style, bold ink brush lines, Ben-Day halftone screen dot shading, expressive character design, color swatch sidebar, pristine comic book concept art.`
          }
        });
      }

      const systemPrompt = `You are a master comic book visual character designer, concept artist, and New Zealand satirical cultural archivist.
Your job is to take a character name, scene visual description, dialogue snippets, and preferred art style from a Living Comic Book script, and generate a comprehensive, highly detailed CHARACTER VISUAL REFERENCE & MODEL SHEET breakdown.

The visual reference must reflect authentic New Zealand comedic archetypes (e.g. 1980s TVNZ television archives, deadpan provincial cops, gothic suburban flatmate vampires, laconic gumboot farmers, Westie rascals, retro suburban gossip aunts).

RETURN STRICT JSON matching this schema:
{
  "characterName": string,
  "archetypeRole": string,
  "iconicQuote": string,
  "visualAnatomy": {
    "build": string,
    "facialFeatures": string,
    "posture": string
  },
  "costumeBreakdown": {
    "headwear": string,
    "upperBody": string,
    "lowerBody": string,
    "footwear": string
  },
  "iconicProps": [
    string (3 distinct props)
  ],
  "colorPalette": [
    { "name": string, "hex": string, "usage": string }
  ],
  "expressionSheet": [
    { "label": string, "description": string }
  ],
  "comicArtStylePrompt": string (A highly detailed, professional prompt suitable for image generation models to render this character turnaround model sheet with halftone textures, ink outlines, and comic book aesthetic)
}`;

      const userPrompt = `Generate a Character Visual Model Sheet:
- Character Name: ${characterName || 'Unknown Character'}
- Scene Context / Visual Description: ${visualDescription || sceneContext || 'A quirky scene in an Aotearoa comedy script'}
- Dialogue Snippet: ${dialogueSnippet || ''}
- Target Art Style: ${artStyle || '1980s Vintage Kiwi Comic Book Halftone & Ink Line Art'}`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
        },
      });

      const conceptData = JSON.parse(response.text || '{}');
      return res.json({
        success: true,
        concept: conceptData,
      });

    } catch (error: any) {
      console.error('Error generating character concept:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to generate character visual concept',
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NZ Comedy Living Comic Archivist Server running on port ${PORT}`);
  });
}

startServer();
