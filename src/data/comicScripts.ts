import { ComicPage } from '../types';

export const COMIC_PAGES: ComicPage[] = [
  {
    pageNumber: 1,
    pageTitle: 'PAGE 1: THE 3:00 AM DANNEVIRKE CONVERGENCE & THE THERMAL RUPTURE',
    locationHeader: 'LOCATION: LOWER HUTT AVALON ARCHIVE / TRANS-DIMENSIONAL DANNEVIRKE BP FORECOURT',
    temporalCoordinate: 'TEMPORAL COORDINATE: 03:00 HRS (NON-LINEAR BROADCAST FLUX)',
    pageNotes: 'Layout: 4-Panel Grid with dynamic gutter bleed and thermal scan overlays. Introduces the Living Comic mechanics with instant kinetic life.',
    panels: [
      {
        panelNumber: 1,
        layoutSpan: 'col-span-2',
        title: 'PANEL 1: THE GRAVY RUPTURE AT AVALON',
        visualDescription: 'Extreme close-up on the dashboard of a 1989 Mitsubishi Delica parked inside a subterranean concrete vault. A 2-inch Quadruplex video reel spins furiously next to an illuminated 1980s microfiche screen. A Big Ben mince-and-cheese pie sits on the primary temporal sync clock, glowing with ominous red thermal radiation. Gravy bubbles and spurts onto the master circuit board.',
        livingDirective: {
          panelState: '[Panel State: Continuous Loop / Thermal Infrared Pulse] Red and orange heat-map rings pulse through the pastry crust. Small electronic sparks pop in synchronization with the tape reel.',
          audioLayer: '[Audio Layer: 50Hz CRT monitor hum + bubbling gravy hiss + distant chorus of crickets in Avalon]',
          tactileDepth: '[Tactile Depth: Hovering or dragging reveals the microfiche schematic blueprint beneath the grease-stained circuit board]',
          crossPanelBleed: '[Cross-Panel Bleed: Plumes of thick, radioactive mince-and-cheese steam rise through the top panel border into the header margin]'
        },
        dialogue: [
          { speaker: 'CAPTION (NARRATOR / KEVIN)', text: 'Tuesday, 3:02 AM. Lower Hutt. In archival science, they tell you never to eat lunch over the 1982 master broadcast archive. They never said anything about 3:00 AM breakfast.' },
          { speaker: 'RADIO ANNOUNCER (VHF BURST)', text: '...and now on TVNZ, Philip Leishman welcomes you to tonight\'s Wheel of Fortune...' }
        ],
        sfx: 'SFX (Gravy Sizzle & Quantum Arc): *FZZZZZZT-GLUB-GLUB-KAPOW!*',
        iconicMomentRefId: 'always-blow-pie'
      },
      {
        panelNumber: 2,
        layoutSpan: 'col-span-1',
        title: 'PANEL 2: ENTER THE ARCHIVIST',
        visualDescription: 'Medium shot inside the Delica cabin. ARCHIVIST KEVIN (52, beige cardigan, heavy bifocals held together with insulation tape, unamused deadpan grimace) grips the steering wheel as the windshield displays a vortex of spinning TV test patterns, Billy T James chuckle waveforms, and vintage Lotto balls.',
        livingDirective: {
          panelState: '[Panel State: Parallax Shiver] The test pattern background rotates slowly at 12 RPM while Kevin\'s cardigan threads vibrate.',
          audioLayer: '[Audio Layer: Vintage 1980s TVNZ channel startup fanfare played on an out-of-tune synthesiser + Kevin\'s long, exhausted sigh]',
          tactileDepth: '[Tactile Depth: Tapping Kevin\'s glasses toggles between standard vision and 4:3 cathode-ray TV scanlines]',
          crossPanelBleed: '[Cross-Panel Bleed: Test pattern color bars (Yellow, Cyan, Green, Magenta) leak into the left gutter of Panel 3]'
        },
        dialogue: [
          { speaker: 'KEVIN', text: 'Right. That\'s just classic. The entire cultural memory of New Zealand is collapsing into a dynamic four-color comic book print, and I haven\'t even put the wheelie bins out.' },
          { speaker: 'MONIQUE (SPECTRAL VOICE FROM DASHBOARD)', text: 'Kevin. Don\'t stress bro. Just grab a ghost chip.' }
        ],
        sfx: 'SFX (VTR Tape Fast-Forward): *WHIRRRRRR-CH-CH-CH-BZZZ*'
      },
      {
        panelNumber: 3,
        layoutSpan: 'col-span-1',
        title: 'PANEL 3: MONIQUE & THE SPECTRAL READY-SALTED',
        visualDescription: 'Floating above the passenger glovebox is MONIQUE THE GHOST CHIP—a semi-translucent, glowing blue-foil potato chip radiating ethereal pale cyan halos and wearing a backward 1990s snapback hat. DARREN (DoC trainee) sits beside it, rigidly holding a council clipboard.',
        livingDirective: {
          panelState: '[Panel State: Levitation Cycle] Monique bobs weightlessly up and down. Ethereal chip crumbs float like glowing fireflies.',
          audioLayer: '[Audio Layer: Crinkling blue chip packet sound with a hollow supernatural reverb + Darren\'s ballpoint pen clicking]',
          tactileDepth: '[Tactile Depth: Dragging the cursor across Monique creates a watery ripple distortion in the air]',
          crossPanelBleed: '[Cross-Panel Bleed: Ghost chip particles drift across the right panel border into Panel 4]'
        },
        dialogue: [
          { speaker: 'DARREN (DoC)', text: 'Under Territorial Council Bylaw 14-B, spectral snacks operating in moving vehicles require a certified warrant of fitness.' },
          { speaker: 'MONIQUE', text: 'Bro, you know I can\'t grab your ghost chips. I\'m an inter-dimensional metaphor for positive social peer influence.' }
        ],
        sfx: 'SFX (Supernatural Crunch): *CRRRR-UNCH (ECHOING IN 5.1)*',
        iconicMomentRefId: 'ghost-chips'
      },
      {
        panelNumber: 4,
        layoutSpan: 'col-span-2',
        title: 'PANEL 4: THE SAFER COMMUNITIES INTERCEPT',
        visualDescription: 'Wide cinematic panel. The Delica materializes onto the rain-slicked asphalt forecourt of a rural 24-hour BP station in Dannevirke. Standing under the humming yellow canopy is SENIOR SERGEANT GUY BALDWIN, leaning casually on the hood of a Holden Commodore police patrol car. He holds a steaming foil pie with extreme procedural authority.',
        livingDirective: {
          panelState: '[Panel State: Continuous Loop / Strobe] Police red and blue lights pulse against the wet pavement. Rain droplets slide down the panel surface in real-time.',
          audioLayer: '[Audio Layer: Real-time rain on corrugated iron roof + radio squelch: "10-7 to base, suspect vehicle is currently defying Euclidean geometry, over."]',
          tactileDepth: '[Tactile Depth: Interactive Thermal Scanner: Clicking Officer Baldwin\'s pie activates a digital temperature gauge hovering at 89.4°C]',
          crossPanelBleed: '[Cross-Panel Bleed: Police light reflections cast blue and red flashing strobes down into the Page 2 header]'
        },
        dialogue: [
          { speaker: 'OFFICER BALDWIN', text: 'Vehicle occupants. Step out of the continuum. 3:00 AM in Dannevirke, you\'ve got a rupture in the spacetime fabric. That temporal vortex has probably been in the warming drawer for twelve hours. It will be thermo-nuclear.' },
          { speaker: 'KEVIN', text: 'Officer, with all due respect, we\'re on an urgent mission to rescue John Clarke\'s gumboots from 1975.' },
          { speaker: 'OFFICER BALDWIN', text: 'Doesn\'t matter mate. Always blow on the vortex. Safer communities together.' }
        ],
        sfx: 'SFX (Police Scanner / Rain): *KRRR-CHHK... BLOW ON IT... CHHK*',
        iconicMomentRefId: 'always-blow-pie'
      }
    ]
  },
  {
    pageNumber: 2,
    pageTitle: 'PAGE 2: THE CITADEL OF DEADPAN (WELLINGTON DIPLOMATIC & PASTRY DIVISION)',
    locationHeader: 'LOCATION: SUB-LEVEL NZ CONSULATE NYC / WELLINGTON STREET CORNER INTERSECTION',
    temporalCoordinate: 'TEMPORAL COORDINATE: 2007–2021 MERGED BROADCAST OVERLAY',
    pageNotes: 'Layout: 4 Multi-Layered Panels featuring interactive roll-calls, gothic auctions, and kinetic parcel tape meltdowns.',
    panels: [
      {
        panelNumber: 1,
        layoutSpan: 'col-span-1',
        title: 'PANEL 1: THE DIPLOMATIC BAND MEETING',
        visualDescription: 'Inside a drab wood-paneled room in the NZ Consulate. MURRAY HEWITT stands behind a small desk with a flipchart titled "NEW ZEALAND: LIKE SCOTLAND ONLY FURTHER". BRET and JEMAINE sit on folding plastic chairs with acoustic guitars. Kevin\'s Delica bumper has crashed halfway through the consulate wall.',
        livingDirective: {
          panelState: '[Panel State: Interactive Trigger] Clicking the roll call clipboard plays Murray ticking items off.',
          audioLayer: '[Audio Layer: Faint single ukulele strum in G-minor + Murray\'s clipped voice: "Bret? Jemaine? Murray... Present."]',
          tactileDepth: '[Tactile Depth: Peelable flipchart: Click to flip through Murray’s proposed tourism slogans ("New Zealand... Why not?")]',
          crossPanelBleed: '[Cross-Panel Bleed: Photocopied band gig flyers flutter across into Panel 2]'
        },
        dialogue: [
          { speaker: 'MURRAY', text: 'Right, band meeting. Bret?' },
          { speaker: 'BRET', text: 'Present.' },
          { speaker: 'MURRAY', text: 'Jemaine?' },
          { speaker: 'JEMAINE', text: 'Present.' },
          { speaker: 'MURRAY', text: 'Kevin from the 1989 TVNZ Delica crash?' },
          { speaker: 'KEVIN', text: 'Present, but desperately seeking a soldering iron.' }
        ],
        sfx: 'SFX (Pen Scratch & Ukulele Pluck): *SCRIT-SCRATCH... TWANG!*',
        iconicMomentRefId: 'fotc-band-meeting'
      },
      {
        panelNumber: 2,
        layoutSpan: 'col-span-1',
        title: 'PANEL 2: VLADISLAV\'S TRADEME AUCTION CRISIS',
        visualDescription: 'Cut to the gothic basement flat in Te Aro. VLADISLAV THE POKER, draped in baroque vampire velvet, hunches angrily over a glowing CRT monitor. Bats hang from the ceiling. A TradeMe auction page is reflected in his fangs.',
        livingDirective: {
          panelState: '[Panel State: Screen Flicker & Cape Wave] The TradeMe bidding timer counts down dynamically from 00:42 seconds in glowing green text.',
          audioLayer: '[Audio Layer: 56k dialup handshake hiss + gothic organ crescendo + mouse clicking frenzy]',
          tactileDepth: '[Tactile Depth: Interactive TradeMe screen: Tap "Place Auto-Bid on Coffee Table" to trigger Vladislav’s victory roar]',
          crossPanelBleed: '[Cross-Panel Bleed: Gothic bats fly out of the panel border and circle the header title]'
        },
        dialogue: [
          { speaker: 'VLADISLAV', text: 'Leave me! I am doing my dark bidding on the internet!' },
          { speaker: 'VIAGO (OFF-PANEL)', text: 'What are you bidding on, Vladislav?' },
          { speaker: 'VLADISLAV', text: 'I am bidding on a second-hand pine coffee table in Upper Hutt! Someone named "Westie77" is driving up the reserve!' }
        ],
        sfx: 'SFX (Dialup Modem / Hiss): *BEEP-BOOP-KRRRRSH-CHUNG*',
        iconicMomentRefId: 'what-we-do-shadows-dark-bidding'
      },
      {
        panelNumber: 3,
        layoutSpan: 'col-span-1',
        title: 'PANEL 3: DAVID CORREOS ENTERS KINETIC HYPER-SPACE',
        visualDescription: 'Explosive kinetic panel. DAVID CORREOS, wrapped in 40 meters of heavy-duty yellow parcel tape and clutching raw spaghetti, explodes out of a kitchen cupboard in a cloud of flour and loose red grapes. PAUL WILLIAMS stands in the background in a brown suit holding a stopwatch with zero facial expression.',
        livingDirective: {
          panelState: '[Panel State: High-Frequency Jitter / Particle Explosion] The panel border physically rattles with screen shake. Grapes bounce continuously off the bottom border.',
          audioLayer: '[Audio Layer: David\'s operatic roar of pure DIY frenzy + Paul Williams\' whispered timer: "Three seconds, David."]',
          tactileDepth: '[Tactile Depth: Tap the screen to pop individual grapes with haptic and audio feedback]',
          crossPanelBleed: '[Cross-Panel Bleed: Flying strands of raw pasta penetrate the right gutter into Panel 4]'
        },
        dialogue: [
          { speaker: 'DAVID CORREOS', text: 'I WILL DISSOLVE THE FABRIC OF SPACE-TIME WITH PURE CARBS! ...Oh, I\'m terribly sorry Jeremy, is this task timed?' },
          { speaker: 'PAUL WILLIAMS', text: 'All information was on the task, David.' }
        ],
        sfx: 'SFX (Tape Ripping & Grape Squish): *SHRRRRK-SPLAT-BOOM!*',
        iconicMomentRefId: 'taskmaster-david-correos'
      },
      {
        panelNumber: 4,
        layoutSpan: 'col-span-1',
        title: 'PANEL 4: BILLY T & FRED DAGG AT THE NO. 8 CROSSROADS',
        visualDescription: 'Wide sunset panel. The Delica reaches a dusty gravel crossroads in the Rangitikei. On one side of the fence stands FRED DAGG in black singlet and gumboots, holding a fencing wire strainer. On the other side stands BILLY T JAMES in a yellow singlet with a tea towel over his shoulder, grinning with an infectious chuckle that sends golden comedic shockwaves across the countryside.',
        livingDirective: {
          panelState: '[Panel State: Golden Comedic Bloom] Billy T\'s chuckle pulses golden halftone comic dots that illuminate the rural landscape. Fred Dagg\'s gumboot taps in real-time.',
          audioLayer: '[Audio Layer: Billy T\'s unmistakable staccato chuckle ("He-he-he-he-he!") + John Clarke\'s dry voice: "Gidday mate, we don\'t know how lucky we are."]',
          tactileDepth: '[Tactile Depth: No. 8 Wire tightener: Click to twist the wire and align the temporal frequencies of the two Kiwi comedy legends]',
          crossPanelBleed: '[Cross-Panel Bleed: Golden laugh waves radiate outward into the reader\'s UI navigation buttons]'
        },
        dialogue: [
          { speaker: 'BILLY T JAMES', text: 'He-he-he-he-he! Gidday mate! You blokes look like you\'ve had a bit of a ding in the old temporal manifold!' },
          { speaker: 'FRED DAGG', text: 'Yeah well, me and Trev were just telling the sheep here that if you\'re gonna cross a dimension, you\'ve gotta have the proper fencing permits.' },
          { speaker: 'KEVIN (FROM DELICA)', text: 'Gentlemen... welcome to the living archive. We\'ve got a country to keep funny.' }
        ],
        sfx: 'SFX (Billy T Giggle & Paddock Gale): *HE-HE-HE-HE-HE-HOOOOO!*',
        iconicMomentRefId: 'billy-t-james-giggle'
      }
    ]
  },
  {
    pageNumber: 3,
    pageTitle: 'PAGE 3: WELLINGTON PARANORMAL & THE SPEEDO STING (BONUS LIVING SANDBOX)',
    locationHeader: 'LOCATION: COURTENAY PLACE / SUBURBAN TAWA DRIVEWAY',
    temporalCoordinate: 'TEMPORAL COORDINATE: 2005–2018 PARANORMAL MERGE',
    pageNotes: 'Layout: 3-Panel Deep Interaction featuring Minogue, O\'Leary, Leigh Hart, and Lynn of Tawa.',
    panels: [
      {
        panelNumber: 1,
        layoutSpan: 'col-span-1',
        title: 'PANEL 1: THE BUCKET HEAD INCIDENT',
        visualDescription: 'Officer Minogue and Officer O\'Leary inspect a glowing green minotaur trapped inside a suburban recycling bin with an upside-down KFC bucket over its horns.',
        livingDirective: {
          panelState: '[Panel State: Flashlight Beam Interactive] Reader’s cursor controls O\'Leary\'s patrol flashlight, revealing hidden alien runes on the wheelie bin.',
          audioLayer: '[Audio Layer: Wellington wind whistling + Minogue: "O\'Leary, is this bin council-approved?"]',
          tactileDepth: '[Tactile Depth: Tap the KFC bucket to lift it and reveal the confused minotaur blinking]',
          crossPanelBleed: '[Cross-Panel Bleed: Ectoplasmic green slime drips across the bottom panel border]'
        },
        dialogue: [
          { speaker: 'OFFICER MINOGUE', text: 'O\'Leary, this mythological beast is breaching the noise control curfew.' },
          { speaker: 'OFFICER O\'LEARY', text: 'Step back Minogue. I\'m issuing a formal verbal caution to the entity.' }
        ],
        sfx: 'SFX (Supernatural Moan): *MOOOOO-BOO-CHIRP!*',
        iconicMomentRefId: 'wellington-paranormal-bucket'
      },
      {
        panelNumber: 2,
        layoutSpan: 'col-span-1',
        title: 'PANEL 2: SPEEDO COP ON ROUTINE SURVEILLANCE',
        visualDescription: 'Leigh Hart in red budgie smugglers and high-vis cap conducts an intense interrogation of a garden gnome on a lawn in Tawa.',
        livingDirective: {
          panelState: '[Panel State: VHS Tracking Jitter] Tracking lines scan vertically with authentic 1990s video distortion.',
          audioLayer: '[Audio Layer: Wind buffeting microphone (*whump-whump*) + Leigh Hart\'s clipped authoritative deadpan]',
          tactileDepth: '[Tactile Depth: Tap the clipboard to switch surveillance angles]',
          crossPanelBleed: '[Cross-Panel Bleed: Red speedo fabric neon glare radiates into Panel 3]'
        },
        dialogue: [
          { speaker: 'SPEEDO COP', text: 'Look mate, this garden ornament has no warrant of fitness and is clearly loitering with intent.' }
        ],
        sfx: 'SFX (Excessive Mic Distortion): *WHUMP-CLACK-CRUNCH*',
        iconicMomentRefId: 'moon-tv-speedo-cop'
      },
      {
        panelNumber: 3,
        layoutSpan: 'col-span-1',
        title: 'PANEL 3: LYNN OF TAWA\'S SUBURBAN CRITIQUE',
        visualDescription: 'Lynn of Tawa leans out of a pastel blue weatherboard window, adjusting frosted sunglasses, looking disdainfully at the Delica time-van.',
        livingDirective: {
          panelState: '[Panel State: Gum Chewing Loop] Lynn rhythmically chews bubblegum while her frosted hair catches the suburban sunlight.',
          audioLayer: '[Audio Layer: Nasal Wellington accent: "Actually, frankly, quite honestly!"]',
          tactileDepth: '[Tactile Depth: Interactive hair spray burst on tap]',
          crossPanelBleed: '[Cross-Panel Bleed: Blue hairspray sparkle drifts into the bottom reader toolbar]'
        },
        dialogue: [
          { speaker: 'LYNN OF TAWA', text: 'Hello Fiff! I told them that time-travel van totally clashes with my new roller blinds from the Plaza!' }
        ],
        sfx: 'SFX (Hairspray Pssht): *PSSSSSSSH-POP!*',
        iconicMomentRefId: 'lynn-of-tawa'
      }
    ]
  },
  {
    pageNumber: 4,
    pageTitle: 'PAGE 4: CENTRAL WESTSIDE — POETS OF PEACE-SCIENCE & THE QUANTUM COUNTDOWN',
    locationHeader: 'LOCATION: CENTRAL WESTSIDE FORECOURT / HENDERSON HIGH SCHOOL PHYSICS LAB',
    temporalCoordinate: 'TEMPORAL COORDINATE: 21:45 HRS (WEST AUCKLAND QUANTUM CADENCE)',
    pageNotes: 'Layout: 3-Panel Deep Street Poetry Grid with neon sodium glow, quantum blackboard chalk dust, and split-screen classroom physics satire.',
    panels: [
      {
        panelNumber: 1,
        layoutSpan: 'col-span-2',
        title: 'PANEL 1: FARK-UP VS PARK-UP (THE WESTSIDE INTERSECTION)',
        visualDescription: 'A slammed 1993 Nissan Cefiro idles under buzzing sodium vapor streetlights outside a West Auckland superette. SIR MANPHAT / THE QUANTUM POET leans against the bonnet in a heavy zip hoodie, gesturing rhythmically while his mates in the backseat erupt into infectious laughter.',
        livingDirective: {
          panelState: '[Panel State: Bass Heavy Rumble & Sodium Flicker] Streetlight pulses in slow amber sync with the sub-bass notes of the idling engine.',
          audioLayer: '[Audio Layer: Deep 808 sub-bass idle + streetlight filament buzz + laughter echoing: "Knocka knocka, who is there!"]',
          tactileDepth: '[Tactile Depth: Tap the car headlight to toggle high-beam reflection on wet tarmac]',
          crossPanelBleed: '[Cross-Panel Bleed: Amber sodium light flares across the gutter into Panel 2]'
        },
        dialogue: [
          { speaker: 'SIR MANPHAT', text: 'Fark-up, and move away — you can\'t park here. My funny mates are going to laugh bro. So fark-up, not park-up!' },
          { speaker: 'FUNNY MATES (BACKSEAT)', text: 'Knocka knocka, who is there? It is Sir Manphat-who! He wants to come inside!' }
        ],
        sfx: 'SFX (Bass Rumble & Door Clatter): *THUMP-THUMP-SKRRRR-CLACK*',
        iconicMomentRefId: 'central-westside-poetry'
      },
      {
        panelNumber: 2,
        layoutSpan: 'col-span-1',
        title: 'PANEL 2: COUNTDOWN & THE QUANTUM Q-BITUARY',
        visualDescription: 'Close-up on a glowing holographic chalkboard floating over the superette asphalt, calculating quantum wave functions superimposed over a Countdown supermarket receipt. Chalk dust shimmers in the dark.',
        livingDirective: {
          panelState: '[Panel State: Digital Countdown Pulse] Green phosphor numbers count down backwards from 10 to 0 with quantum particle sparks.',
          audioLayer: '[Audio Layer: Synthesizer arpeggio + digital countdown beep + crisp chalk scraping blackboard]',
          tactileDepth: '[Tactile Depth: Drag across the equation to trigger a cosmic particle wave dispersion]',
          crossPanelBleed: '[Cross-Panel Bleed: Glowing green equation symbols drift into the right margin]'
        },
        dialogue: [
          { speaker: 'QUANTUM POET', text: 'Countdown then blow it up. Q-bituary on central WESTSIDE. Poets of peace-science for dummies. I learnt maths just to add it to a list.' },
          { speaker: 'TEACHER (FLASHBACK VOICE)', text: 'After he had to teach the teachers what it is along with all the kids...' }
        ],
        sfx: 'SFX (Digital Quantum Zap): *BEEP-BEEP-BEEP-KZZZZT!*'
      },
      {
        panelNumber: 3,
        layoutSpan: 'col-span-3',
        title: 'PANEL 3: THE PHYSICS CLASSROOM JOKE & THE BENTLEY WAGE',
        visualDescription: 'Wide split-screen perspective: On the left, a 1990s high school physics lab with blue Bunsen burner flames and a quiet student delivering one devastating punchline. On the right, twilight over the Westside where a corporate executive in a luxury sedan stares out into the neon mist.',
        livingDirective: {
          panelState: '[Panel State: Dual Parallax Shift] The Bunsen burner flame flickers on the left while rain streaks down the car window on the right.',
          audioLayer: '[Audio Layer: Classroom silence broken by explosive sudden laughter + gentle West Auckland rain]',
          tactileDepth: '[Tactile Depth: Tapping the Bunsen burner adjusts flame temperature; tapping the right pane wipes rain condensation]',
          crossPanelBleed: '[Cross-Panel Bleed: Raindrops trickle across the bottom panel border into the footer]'
        },
        dialogue: [
          { speaker: 'WESTSIDE POET', text: 'Apart from telling a single joke in physics I hardly even spoke. The kid getting paid Bentley wage had no idea I was his number one guy.' },
          { speaker: 'CAPTION (OUTRO)', text: 'What do we expect from kids if we leave them to be alone amongst \'em, blinded by the actual sight, eyelids too tight... Kids go on tonight.' }
        ],
        sfx: 'SFX (Rain on Glass & Blue Flame): *HSSSSSS-PITTER-PATTER*'
      }
    ]
  }
];
