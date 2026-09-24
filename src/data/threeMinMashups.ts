import { ThreeMinMashUp } from '../types';

export const curatedThreeMinMashups: ThreeMinMashUp[] = [
  {
    id: 'mashup-dannevirke-bp',
    title: 'THE 3:00 AM DANNEVIRKE BP THERMO-NUCLEAR PIE CRISIS',
    tagline: "When Vladislav's TradeMe pickup clashes with Guy Baldwin's pastry thermodynamics.",
    roastTheme: 'Bureaucratic Understatement vs Ancient Vampire Aristocracy',
    targetCulturalTrope: 'Treating Eldritch Horrors with the Mild Disappointment of a Flat White Spill',
    location: 'Dannevirke 24-Hour BP Forecourt & Pie Warmer Carousel',
    totalDurationSeconds: 180,
    characters: [
      {
        name: 'Senior Sgt Guy Baldwin',
        actorRef: 'Police 10-7 (2009)',
        voiceTone: 'Deeply unbothered provincial police authority obsessed with pastry safety',
        avatarEmoji: '👮‍♂️',
        badgeColor: 'bg-blue-600',
        pitch: 0.85,
        rate: 0.95
      },
      {
        name: 'Vladislav the Poker',
        actorRef: 'What We Do in the Shadows',
        voiceTone: 'Melodramatic 800-year-old Romanian tyrant struggling with Kiwi postal codes',
        avatarEmoji: '🧛‍♂️',
        badgeColor: 'bg-purple-600',
        pitch: 1.1,
        rate: 1.05
      },
      {
        name: 'David Correos',
        actorRef: 'Taskmaster NZ (Season 2)',
        voiceTone: '160-decibel hyper-kinetic panic scream fuelled by raw adrenaline and dry pasta',
        avatarEmoji: '⚡',
        badgeColor: 'bg-amber-600',
        pitch: 1.3,
        rate: 1.25
      },
      {
        name: 'Monique the Ghost Chip',
        actorRef: 'NZTA Legend Ad (2011)',
        voiceTone: 'Airy metaphysical teen conscience floating above the magazine aisle',
        avatarEmoji: '👻',
        badgeColor: 'bg-cyan-600',
        pitch: 1.4,
        rate: 1.1
      }
    ],
    acts: [
      {
        actNumber: 1,
        actTitle: 'Act 1: The 3:00 AM Thermal Assessment (0:00 - 0:45)',
        timeRange: '0:00 - 0:45',
        startSecond: 0,
        endSecond: 45,
        sceneNotes: 'Sodium vapor lights buzz in the drizzle. A single microwave oven throbs with metaphysical radiation.',
        beats: [
          {
            id: 'd1-b1',
            second: 5,
            timestamp: '00:05',
            speaker: 'Senior Sgt Guy Baldwin',
            dialogue: "Look mate, step away from the warmer carousel. It is three o'clock in the morning. That mince and cheese has achieved critical mass. It must be blown upon. Safely.",
            deliveryNote: 'Deadpan paternal calm, hands resting on reflective utility belt',
            sfxCue: 'SFX (Police radio squelch & microwave drone): *KRR-CHHK-HUMMM*',
            audioPreset: 'police-pie',
            stageAction: 'Calibrates yellow handheld thermal laser gun at the pasty pastry crust'
          },
          {
            id: 'd1-b2',
            second: 20,
            timestamp: '00:20',
            speaker: 'Vladislav the Poker',
            dialogue: "Silence, night sentry! I have crossed oceans of time and seven hundred kilometers in a 1994 Honda Civic to collect this pine coffee table I won on TradeMe for twelve dollars fifty!",
            deliveryNote: 'High operatic Transylvanian fury, swirling a damp velvet cape into the slushy dispenser',
            sfxCue: 'SFX (Baroque Harpsichord & Dial-Up Modem): *CHUNG-BEEP-BEEP*',
            audioPreset: 'vampire-trademe',
            stageAction: 'Fangs glint against the $2 energy drink display'
          },
          {
            id: 'd1-b3',
            second: 35,
            timestamp: '00:35',
            speaker: 'Monique the Ghost Chip',
            dialogue: "Bro, you know he can't grab your pine coffee table. It's a pickup-only auction from Upper Hutt. Space head.",
            deliveryNote: 'Airy spectral echo drifting behind the car scent tree rack',
            sfxCue: 'SFX (Ethereal potato chip crinkle): *CRRRK-CHIME*',
            audioPreset: 'ghost-chips',
            stageAction: 'Bobs weightlessly next to the 2-for-$5 pie warmer deal'
          }
        ]
      },
      {
        actNumber: 2,
        actTitle: 'Act 2: The Kinetic Taskmaster Escalation (0:45 - 2:00)',
        timeRange: '0:45 - 2:00',
        startSecond: 45,
        endSecond: 120,
        sceneNotes: 'The BP automatic glass sliding doors smash open as David Correos hurdles the oil barrel display.',
        beats: [
          {
            id: 'd1-b4',
            second: 55,
            timestamp: '00:55',
            speaker: 'David Correos',
            dialogue: "JEREMY WELLS HAS TASKED ME WITH DISMANTLING THE FABRIC OF TARARUA DISTRICT USING ONLY RED LIQUORICE STRAPS AND RAW UNCOOKED SPAGHETTI!",
            deliveryNote: 'Roaring at 140 decibels while covered in 20 meters of red barrier tape',
            sfxCue: 'SFX (Taskmaster Buzzer & Pasta Rattle): *HONK-CLATTER*',
            audioPreset: 'correos-meltdown',
            stageAction: 'Pours a bag of penne pasta directly into the windscreen wiper reservoir'
          },
          {
            id: 'd1-b5',
            second: 75,
            timestamp: '01:15',
            speaker: 'Senior Sgt Guy Baldwin',
            dialogue: "David, mate. If you are going to summon an unholy vortex on the concrete forecourt, you must wear a high-visibility singlet and allow the pastry at least four minutes to cool. Safer communities together.",
            deliveryNote: 'Gentle, unflappable guidance, handing David a paper serviette',
            sfxCue: 'SFX (Police radio beep): *CHHK*',
            audioPreset: 'police-pie',
            stageAction: 'Logs the incident in a pocket spiral notebook'
          },
          {
            id: 'd1-b6',
            second: 95,
            timestamp: '01:35',
            speaker: 'Vladislav the Poker',
            dialogue: "Is there no dignity in this hemisphere? In 1450 I turned the Danube red with blood! Now I am held hostage by a ghost chip and a constable who insists on cooling times!",
            deliveryNote: 'Exhausted feudal grief, clutching a lukewarm Big Ben',
            sfxCue: 'SFX (Organ chime): *DUM-DUM*',
            audioPreset: 'vampire-trademe',
            stageAction: 'Slumps against the windshield squeegee bucket'
          }
        ]
      },
      {
        actNumber: 3,
        actTitle: 'Act 3: The No. 8 Wire Resolution (2:00 - 3:00)',
        timeRange: '2:00 - 3:00',
        startSecond: 120,
        endSecond: 180,
        sceneNotes: 'Fred Dagg arrives on a 1974 Ferguson tractor, carrying a spool of fencing wire and two cold Speights.',
        beats: [
          {
            id: 'd1-b7',
            second: 135,
            timestamp: '02:15',
            speaker: 'Senior Sgt Guy Baldwin',
            dialogue: "Notice the internal gravy consistency. We are down to 61.4 degrees Celsius. The pie is now officially certified as safe for oral ingestion.",
            deliveryNote: 'Authoritative satisfaction, giving a brisk thumbs up',
            sfxCue: 'SFX (Cash register & chime): *KA-CHING*',
            audioPreset: 'trademe-bid',
            stageAction: 'Hands the pie to Vladislav with a wooden stirrer'
          },
          {
            id: 'd1-b8',
            second: 155,
            timestamp: '02:35',
            speaker: 'Vladislav the Poker',
            dialogue: "It is... surprisingly savory. The cheese has melted into a protective seal. I shall leave five-star TradeMe feedback: 'Prompt communication, terrifying pastry, would trade again.'",
            deliveryNote: 'Humbled Dracula realization, licking gravy off long pale claws',
            sfxCue: 'SFX (Victory fanfare): *CHIME*',
            audioPreset: 'trademe-bid',
            stageAction: 'Takes a delicate, aristocratic bite of the Big Ben'
          },
          {
            id: 'd1-b9',
            second: 170,
            timestamp: '02:50',
            speaker: 'Monique the Ghost Chip',
            dialogue: "You know I can't eat your ghost chips, but that's a mint finish, bro. Get home safe.",
            deliveryNote: 'Warm farewell drifting up towards the southern cross constellation',
            sfxCue: 'SFX (Ghostly chime): *CHIME-FADE*',
            audioPreset: 'ghost-chips',
            stageAction: 'Fades peacefully into the Dannevirke BP neon sign'
          }
        ]
      }
    ],
    pissTakeBreakdown: "Deconstructs the supreme New Zealand cultural reflex: taking existential, cosmic, and supernatural disasters and treating them with the exact emotional weight of a council parking ticket or a dairy pie temperature warning."
  },
  {
    id: 'mashup-westie-flat',
    title: 'THE WEST AUCKLAND VAMPIRE FLAT CHORE TRIBUNAL',
    tagline: 'When Ted West audits Vladislav and Deacon for overdue rubbish sticker payments.',
    roastTheme: 'Suburban Outlaw Macho Pride vs Supernatural Flatting Sloth',
    targetCulturalTrope: 'The Sacred, Unbreakable Law of the Shared Kiwi Flat Chore Roster',
    location: 'Te Aro Vampire Kitchen & West Auckland Garage Workbench',
    totalDurationSeconds: 180,
    characters: [
      {
        name: 'Ted West',
        actorRef: 'Outrageous Fortune',
        voiceTone: 'Rough gravelly West Auckland patriarch who strictly enforces criminal honor and chore rosters',
        avatarEmoji: '🍻',
        badgeColor: 'bg-emerald-600',
        pitch: 0.8,
        rate: 0.95
      },
      {
        name: 'Vladislav the Poker',
        actorRef: 'What We Do in the Shadows',
        voiceTone: 'Centuries-old tyrant claiming sweeping the kitchen floor violates ancient dark covenants',
        avatarEmoji: '🧛‍♂️',
        badgeColor: 'bg-purple-600',
        pitch: 1.1,
        rate: 1.05
      },
      {
        name: 'Murray Hewitt',
        actorRef: 'Flight of the Conchords',
        voiceTone: 'Diplomatic consular bureaucrat clutching an attendance clipboard in total denial',
        avatarEmoji: '📋',
        badgeColor: 'bg-amber-600',
        pitch: 1.15,
        rate: 1.0
      }
    ],
    acts: [
      {
        actNumber: 1,
        actTitle: 'Act 1: Roll Call & Yellow Council Rubbish Bags (0:00 - 0:45)',
        timeRange: '0:00 - 0:45',
        startSecond: 0,
        endSecond: 45,
        sceneNotes: 'A stained laminate kitchen table. Four empty Lion Red cans and a goblet of arterial plasma.',
        beats: [
          {
            id: 'w1-b1',
            second: 5,
            timestamp: '00:05',
            speaker: 'Murray Hewitt',
            dialogue: "Band meeting / Flat meeting. Present: Murray, Ted, Lord Vladislav of Wallachia. Jemaine and Bret are outside untangling a kite. First agenda item: Who left five pints of human blood in the Tupperware crisper?",
            deliveryNote: 'Brisk bureaucratic pencil-tapping on a clip folder',
            sfxCue: 'SFX (Acoustic twang & pencil scratch): *TWANG-SCRATCH*',
            audioPreset: 'band-meeting',
            stageAction: 'Points at a red-stained plastic container marked Murray (Do Not Touch)'
          },
          {
            id: 'w1-b2',
            second: 22,
            timestamp: '00:22',
            speaker: 'Ted West',
            dialogue: "Right. Listen to me, Count Chocula. Out west, we rob safes and we do burnouts, but we DO NOT skip our week on the recycling bins. You haven't put a yellow council sticker on your torso pile in five hundred years.",
            deliveryNote: 'Growling menace, lighting a cigarette next to an open bottle of turps',
            sfxCue: 'SFX (V8 engine rumble & burnout screech): *VROOM-SKRRRT*',
            audioPreset: 'outrageous-burnout',
            stageAction: 'Slams a heavy metal wrench onto the laminate kitchen table'
          },
          {
            id: 'w1-b3',
            second: 38,
            timestamp: '00:38',
            speaker: 'Vladislav the Poker',
            dialogue: "I was the scourge of the Ottoman Empire! When I entered a village, the rivers boiled! I do not 'do recycling', mortal burglar in denim!",
            deliveryNote: 'Flaring nostrils, hovering three inches above the linoleum flooring',
            sfxCue: 'SFX (Gothic organ swell): *DUN-DUN-DUNNN*',
            audioPreset: 'vampire-trademe',
            stageAction: 'Hisses while bats flutter out from behind the rangehood'
          }
        ]
      },
      {
        actNumber: 2,
        actTitle: 'Act 2: The Dishwasher Detergent Deadlock (0:45 - 2:00)',
        timeRange: '0:45 - 2:00',
        startSecond: 45,
        endSecond: 120,
        sceneNotes: 'Murray attempts to resolve the dispute with an illustrated poster board.',
        beats: [
          {
            id: 'w1-b4',
            second: 55,
            timestamp: '00:55',
            speaker: 'Murray Hewitt',
            dialogue: "Look at the chart, Vlad. Monday: Vacuum dungeon. Tuesday: Disembowelment. Wednesday: Wipe microwave. It's colour-coded. Brett made it using New Zealand Diplomatic highlighters.",
            deliveryNote: 'Earnest diplomatic optimism, pointing at a laminated rainbow poster',
            sfxCue: 'SFX (Ukulele single flat note): *PLINK*',
            audioPreset: 'band-meeting',
            stageAction: 'Presents a poster titled "Vampire / Westie Harmony 2026"'
          },
          {
            id: 'w1-b5',
            second: 75,
            timestamp: '01:15',
            speaker: 'Ted West',
            dialogue: "You listen to Murray, mate. Even my boy Cheryl knows you don't leave crusty forks in the sink. If I catch you shapeshifting into a cat to avoid drying the roasting dish, I'll take a tyre iron to your coffin lid.",
            deliveryNote: 'Unblinking West Auckland disciplinary stare',
            sfxCue: 'SFX (Pub rock guitar stab): *CRASH*',
            audioPreset: 'outrageous-burnout',
            stageAction: 'Taps his knuckles menacingly on a tin of Lion Red'
          },
          {
            id: 'w1-b6',
            second: 95,
            timestamp: '01:35',
            speaker: 'Vladislav the Poker',
            dialogue: "Deacon has not done the dishes for five hundred years! Why do you not persecute Deacon?! He leaves virgin remains all over the sofa and watches Shortland Street reruns on VHS!",
            deliveryNote: 'Whiny, petulant finger-pointing, slumping into a beanbag',
            sfxCue: 'SFX (Theremin moan): *WOOO-WOOO*',
            audioPreset: 'wellington-paranormal',
            stageAction: 'Flings a dirty wooden spatula across the room'
          }
        ]
      },
      {
        actNumber: 3,
        actTitle: 'Act 3: The Lion Red Peace Treaty (2:00 - 3:00)',
        timeRange: '2:00 - 3:00',
        startSecond: 120,
        endSecond: 180,
        sceneNotes: 'Ted slides a frosty beer across the bench. Vladislav inspects the label.',
        beats: [
          {
            id: 'w1-b7',
            second: 135,
            timestamp: '02:15',
            speaker: 'Ted West',
            dialogue: "Tell you what. You wash the roasting dish, and I'll show you how to hotwire a 1986 Ford Falcon to carry your coffin to the drive-thru. Deal?",
            deliveryNote: 'Grudging Westie brotherhood, offering a firm handshake',
            sfxCue: 'SFX (Beer ring-pull pop & hiss): *KSHHH*',
            audioPreset: 'trademe-bid',
            stageAction: 'Pushes a cold draught beer into Vladislavs pale hand'
          },
          {
            id: 'w1-b8',
            second: 155,
            timestamp: '02:35',
            speaker: 'Vladislav the Poker',
            dialogue: "A metal carriage that moves without horses and smells of stale tobacco and pine air freshener? ...I accept your barter, Ted of the West.",
            deliveryNote: 'Regal aristocratic nod of mutual respect',
            sfxCue: 'SFX (Harpsichord minor chord & cash ping): *CHIME*',
            audioPreset: 'vampire-trademe',
            stageAction: 'Puts on a pair of oversized yellow dishwashing gloves'
          },
          {
            id: 'w1-b9',
            second: 170,
            timestamp: '02:50',
            speaker: 'Murray Hewitt',
            dialogue: "Meeting adjourned. Great progress team. Next week: who is eating all the Vogel's toast bread.",
            deliveryNote: 'Closes clipboard with triumphant bureaucratic smugness',
            sfxCue: 'SFX (Pencil tick): *TICK*',
            audioPreset: 'band-meeting',
            stageAction: 'Packs up his briefcase as the credits roll'
          }
        ]
      }
    ],
    pissTakeBreakdown: "Takes the fierce outlaw pride of West Auckland and the centuries-old operatic dread of Wellington vampires, and reduces both to the ultimate Kiwi battleground: who is buying the dishwashing detergent and putting the bins out on Tuesday."
  },
  {
    id: 'mashup-target-fred-dagg',
    title: 'UNDERCOVER TARGET TV STING ON FRED DAGG',
    tagline: 'When consumer investigative cameras try to audit a gumboot and No. 8 wire repair.',
    roastTheme: 'Sensationalist 90s Consumer TV vs Unshakeable Rural Kiwi Non-Answers',
    targetCulturalTrope: 'The Complete Impossibility of Cornering a Kiwi Farmer with Facts',
    location: "Fred Dagg's Top Paddock & Avalon Broadcast Editing Suite",
    totalDurationSeconds: 180,
    characters: [
      {
        name: 'Target Reporter Brooke',
        actorRef: 'Target / Fair Go (1998)',
        voiceTone: 'Hyper-tense dramatic investigative anchor trying to expose a $4 fencing fee',
        avatarEmoji: '🎙️',
        badgeColor: 'bg-red-600',
        pitch: 1.25,
        rate: 1.15
      },
      {
        name: 'Fred Dagg',
        actorRef: 'Fred Dagg & The Trevs (1975)',
        voiceTone: 'Legendary laconic rural philosopher leaning heavily against a fence post',
        avatarEmoji: '🚜',
        badgeColor: 'bg-amber-600',
        pitch: 0.85,
        rate: 0.9
      },
      {
        name: 'Speedo Cop Leigh Hart',
        actorRef: 'Moon TV / Leigh Hart',
        voiceTone: 'Distorted megaphone authority wearing neon swimwear over high-vis socks',
        avatarEmoji: '📢',
        badgeColor: 'bg-blue-600',
        pitch: 1.0,
        rate: 1.1
      }
    ],
    acts: [
      {
        actNumber: 1,
        actTitle: 'Act 1: The Hidden Camera Trap (0:00 - 0:45)',
        timeRange: '0:00 - 0:45',
        startSecond: 0,
        endSecond: 45,
        sceneNotes: 'Paddock wind whips through macrocarpa trees. A hidden camera disguised inside an electric fence insulator.',
        beats: [
          {
            id: 't1-b1',
            second: 5,
            timestamp: '00:05',
            speaker: 'Target Reporter Brooke',
            dialogue: "Tonight on Target: We set a hidden camera trap for rural fencing contractors. We loosened this gate latch by three millimeters. Will contractor 'Fred' charge the fair rate, or rip off our pensioner decoy?",
            deliveryNote: 'Breathless investigative sensationalism, staring intensely into camera 1',
            sfxCue: 'SFX (Dramatic TV investigative string stab): *DUN-DUN-SHING*',
            audioPreset: 'target-sting',
            stageAction: 'Crouches behind a sheep trough with a microphone'
          },
          {
            id: 't1-b2',
            second: 25,
            timestamp: '00:25',
            speaker: 'Fred Dagg',
            dialogue: "Gidday. Yeah, well, me and Trev had a look at the gate. Reckoned she was looking a bit sideways on the hinge. Trev gave it a kick with his left boot and tied it to a macrocarpa stump with baling twine. She'll see you out.",
            deliveryNote: 'Slow, relaxed, leaning on a fence post with gumboot cocked',
            sfxCue: 'SFX (Tractor diesel idle & wind whistle): *PUTT-PUTT-SWOOSH*',
            audioPreset: 'fred-dagg',
            stageAction: 'Spits a piece of rye grass into the gorse bush'
          },
          {
            id: 't1-b3',
            second: 40,
            timestamp: '00:40',
            speaker: 'Target Reporter Brooke',
            dialogue: "Mr. Dagg! Target Consumer Affairs! Are you aware that standard New Zealand Standards 4219 require a galvanized bolt, not baling twine?!",
            deliveryNote: 'Leaping out from the trough with microphone thrust into his face',
            sfxCue: 'SFX (Dramatic sting): *STAB*',
            audioPreset: 'target-sting',
            stageAction: 'Presents a binder full of consumer watchdog graphs'
          }
        ]
      },
      {
        actNumber: 2,
        actTitle: 'Act 2: The Leigh Hart Speedo Intervention (0:45 - 2:00)',
        timeRange: '0:45 - 2:00',
        startSecond: 45,
        endSecond: 120,
        sceneNotes: 'Leigh Hart marches across the paddock in a pair of neon Speedos, carrying a traffic cone.',
        beats: [
          {
            id: 't1-b4',
            second: 55,
            timestamp: '00:55',
            speaker: 'Speedo Cop Leigh Hart',
            dialogue: "Hold on there, television lady. I'm conducting a routine livestock undergarment compliance audit. Has this sheep received adequate buoyancy certification for the flood plain?",
            deliveryNote: 'Nasal, deadpan megaphone broadcast with zero facial expression',
            sfxCue: 'SFX (Megaphone whistle & mic distortion): *BEEP-CRACKLE*',
            audioPreset: 'speedo-cop',
            stageAction: 'Places a high-vis cone on a confused Romney ewe'
          },
          {
            id: 't1-b5',
            second: 75,
            timestamp: '01:15',
            speaker: 'Fred Dagg',
            dialogue: "Well, you see Brooke, that's what Trev was saying. You put a galvanized bolt in there, and the sheep look at it and get nervous. Baling twine has a natural elasticity. We don't know how lucky we are, really.",
            deliveryNote: 'Completely ignores the investigative ambush, gesturing at the clouds',
            sfxCue: 'SFX (Metallic fence wire twang): *TWANGGG*',
            audioPreset: 'no8-wire',
            stageAction: 'Adjusts his black singlet with slow deliberation'
          },
          {
            id: 't1-b6',
            second: 95,
            timestamp: '01:35',
            speaker: 'Target Reporter Brooke',
            dialogue: "You charged our decoy three scones and half a jar of feijoa chutney! Is this taxable agricultural income?! Answer the question, Mr. Dagg!",
            deliveryNote: 'Frustrated investigative panic, heels sinking deep into cow mud',
            sfxCue: 'SFX (Investigative violin screeches): *SCREEECH*',
            audioPreset: 'target-sting',
            stageAction: 'Waves a jar of homemade preserves in the air'
          }
        ]
      },
      {
        actNumber: 3,
        actTitle: 'Act 3: The Paddock Verdict (2:00 - 3:00)',
        timeRange: '2:00 - 3:00',
        startSecond: 120,
        endSecond: 180,
        sceneNotes: 'The entire camera crew ends up drinking tea out of enamel mugs in the shearing shed.',
        beats: [
          {
            id: 't1-b7',
            second: 135,
            timestamp: '02:15',
            speaker: 'Fred Dagg',
            dialogue: "Trev put the kettle on the kerosene burner. Have a scone, love. You look like you haven't seen a decent bit of butter since the 1981 Springbok Tour.",
            deliveryNote: 'Unconditional hospitable warmth that completely neutralizes the sting',
            sfxCue: 'SFX (Kettle boiling whistle & tractor): *WHISTLE-PUTT*',
            audioPreset: 'fred-dagg',
            stageAction: 'Passes a warm scone wrapped in a greasy tea towel'
          },
          {
            id: 't1-b8',
            second: 155,
            timestamp: '02:35',
            speaker: 'Speedo Cop Leigh Hart',
            dialogue: "Target verdict: The gate works. The scone passes structural integrity testing. The sheep is cleared for coastal recreation. Back to the studio.",
            deliveryNote: 'Signing a clip folder while eating the scone in one bite',
            sfxCue: 'SFX (Megaphone click): *CLICK*',
            audioPreset: 'speedo-cop',
            stageAction: 'Waddles backwards into the gorse bushes in speedos'
          },
          {
            id: 't1-b9',
            second: 170,
            timestamp: '02:50',
            speaker: 'Fred Dagg',
            dialogue: "Ah well. That's another half-hour shot to pieces. Trev, go turn the bull out.",
            deliveryNote: 'Chuckles, pulling his floppy bush hat down over his eyes',
            sfxCue: 'SFX (Dagg laugh & paddock wind): *HEH-HEH-SWOOSH*',
            audioPreset: 'fred-dagg',
            stageAction: 'Fade out to Avalon broadcast test pattern'
          }
        ]
      }
    ],
    pissTakeBreakdown: "Takes the breathless, moral panic of 1990s New Zealand consumer sting journalism (Target, Fair Go) and crashes it headfirst into the impenetrable fortress of rural Kiwi unbothered hospitality and DIY baling twine logic."
  },
  {
    id: 'mashup-gore-taskmaster',
    title: 'THE GORE TASKMASTER TROUT MELTDOWN',
    tagline: 'David Correos tasked with relocating the Giant Brown Trout in under 180 seconds.',
    roastTheme: 'Provincial Civic Pride vs Unhinged Reality Game Show Desperation',
    targetCulturalTrope: 'The Terrifying Intensity of Big Things in Small New Zealand Towns',
    location: 'Gore Welcome Sign & Giant Brown Trout Statue Forecourt',
    totalDurationSeconds: 180,
    characters: [
      {
        name: 'David Correos',
        actorRef: 'Taskmaster NZ',
        voiceTone: 'Full unhinged fight-or-flight manic energy screaming at inanimate concrete fish',
        avatarEmoji: '⚡',
        badgeColor: 'bg-amber-600',
        pitch: 1.35,
        rate: 1.3
      },
      {
        name: 'Gore Town Mayor / Official',
        actorRef: 'Havoc & Newsboy (1999)',
        voiceTone: 'Defensive, proud Southland civic administrator clutching a country music CD',
        avatarEmoji: '🤠',
        badgeColor: 'bg-emerald-600',
        pitch: 0.9,
        rate: 0.95
      },
      {
        name: 'Leigh Hart',
        actorRef: 'Late Night Big Breakfast',
        voiceTone: 'Completely unhelpful sports commentator offering misleading fishing advice',
        avatarEmoji: '🎙️',
        badgeColor: 'bg-blue-600',
        pitch: 1.05,
        rate: 1.1
      }
    ],
    acts: [
      {
        actNumber: 1,
        actTitle: 'Act 1: The Golden Task Envelope (0:00 - 0:45)',
        timeRange: '0:00 - 0:45',
        startSecond: 0,
        endSecond: 45,
        sceneNotes: 'Southland frost covers the ground. The giant fiberglass Brown Trout looms like an ancient god.',
        beats: [
          {
            id: 'g1-b1',
            second: 5,
            timestamp: '00:05',
            speaker: 'David Correos',
            dialogue: "TASK ENVELOPE: 'Relocate the Gore Giant Brown Trout to Mataura using only three lengths of garden hose and a copy of the 1997 Southland Yellow Pages. Your time starts now.' ...OH NO. OH GOD NO!",
            deliveryNote: 'Hyperventilating while tearing the red wax seal with his teeth',
            sfxCue: 'SFX (Taskmaster airhorn buzzer): *HONK-HONK*',
            audioPreset: 'taskmaster-horn',
            stageAction: 'Runs in three full frantic circles around the concrete pedestal'
          },
          {
            id: 'g1-b2',
            second: 25,
            timestamp: '00:25',
            speaker: 'Gore Town Mayor / Official',
            dialogue: "Young man, that fiberglass brown trout is the spiritual beating heart of the world capital of brown trout fishing! If you scratch the dorsal fin, the Southland Country Music Awards committee will have your blood!",
            deliveryNote: 'Stiff provincial outrage, clutching an acoustic guitar case',
            sfxCue: 'SFX (Country fiddle squeak & cowbell): *TWANG-CLANG*',
            audioPreset: 'no8-wire',
            stageAction: 'Steps in front of the statue with arms outstretched'
          },
          {
            id: 'g1-b3',
            second: 40,
            timestamp: '00:40',
            speaker: 'Leigh Hart',
            dialogue: "Welcome back to Gore. As we can see, Correos has opted for the traditional Southland offensive strategy: crying openly while wrapping himself in green garden hose.",
            deliveryNote: 'Bored sports presenter voice with zero urgency',
            sfxCue: 'SFX (TV commentary chime): *CHIME*',
            audioPreset: 'speedo-cop',
            stageAction: 'Sips black coffee from a chipped styrofoam cup'
          }
        ]
      },
      {
        actNumber: 2,
        actTitle: 'Act 2: The Kinetic Breakdown (0:45 - 2:00)',
        timeRange: '0:45 - 2:00',
        startSecond: 45,
        endSecond: 120,
        sceneNotes: 'David attempts to lasso the 6-meter fiberglass fish using reinforced duct tape.',
        beats: [
          {
            id: 'g1-b4',
            second: 55,
            timestamp: '00:55',
            speaker: 'David Correos',
            dialogue: "WHY IS IT SO HEAVY?! WHY DID YOU MAKE THE TROUT OUT OF SOLID REINFORCED SOUTHLAND CONCRETE?! PAUL WILLIAMS, HELP ME! HELP ME PAUL!",
            deliveryNote: 'Screaming at the sky while his shoes lose all grip on the frosty grass',
            sfxCue: 'SFX (Pasta rattle & manic bass drop): *RATTLE-THUD*',
            audioPreset: 'correos-meltdown',
            stageAction: 'Slips backwards into a municipal flowerbed of pansies'
          },
          {
            id: 'g1-b5',
            second: 75,
            timestamp: '01:15',
            speaker: 'Gore Town Mayor / Official',
            dialogue: "We have survived Havoc and Newsboy calling us the gay capital of New Zealand in 1999! We will not be humiliated by a man wearing three different colored socks!",
            deliveryNote: 'Patriotic civic defense of Southland heritage',
            sfxCue: 'SFX (Organ blast): *BLAST*',
            audioPreset: 'target-sting',
            stageAction: 'Pulls out a certified Gore Borough Council charter from 1962'
          },
          {
            id: 'g1-b6',
            second: 95,
            timestamp: '01:35',
            speaker: 'Leigh Hart',
            dialogue: "Correos is now attempting to communicate directly with the fish in fluent Bulgarian. Outstanding technique. That's a solid four points from Jeremy Wells right there.",
            deliveryNote: 'Deadpan analytical evaluation of sheer madness',
            sfxCue: 'SFX (Mic distortion): *CRACKLE*',
            audioPreset: 'speedo-cop',
            stageAction: 'Draws an imaginary tactic board in the air'
          }
        ]
      },
      {
        actNumber: 3,
        actTitle: 'Act 3: The 5-Point Award Ceremony (2:00 - 3:00)',
        timeRange: '2:00 - 3:00',
        startSecond: 120,
        endSecond: 180,
        sceneNotes: 'David collapses exhausted on the fish tail. The task timer sounds.',
        beats: [
          {
            id: 'g1-b7',
            second: 135,
            timestamp: '02:15',
            speaker: 'David Correos',
            dialogue: "I moved the shadow! Look! The sun has moved three inches west! The shadow of the trout is now legally inside the Mataura boundary! TIME!",
            deliveryNote: 'Gasping for breath, covered in frost, triumphantly pointing at shadow',
            sfxCue: 'SFX (Taskmaster victory horn): *HONK-FANFARE*',
            audioPreset: 'taskmaster-horn',
            stageAction: 'Collapses in dramatic victory posture onto the asphalt'
          },
          {
            id: 'g1-b8',
            second: 155,
            timestamp: '02:35',
            speaker: 'Gore Town Mayor / Official',
            dialogue: "...Technically compliant with the Mataura River bylaws. We will award you an honorary cheese roll and allow you to depart on the next intercity bus.",
            deliveryNote: 'Grudging Southland respect, handing over a tinfoil-wrapped roll',
            sfxCue: 'SFX (Cash register ping): *KA-CHING*',
            audioPreset: 'trademe-bid',
            stageAction: 'Bestows a golden cheese roll medal'
          },
          {
            id: 'g1-b9',
            second: 170,
            timestamp: '02:50',
            speaker: 'Leigh Hart',
            dialogue: "And that's why Gore remains undefeated. Join us next week when David attempts to eat the Big Carrot in Ohakune.",
            deliveryNote: 'Sign-off to camera with empty thumb gesture',
            sfxCue: 'SFX (Closing chime): *CHIME*',
            audioPreset: 'billy-t-laugh',
            stageAction: 'Cut to black as the Taskmaster score buzzer echoes'
          }
        ]
      }
    ],
    pissTakeBreakdown: "Exploits the eternal tension between provincial town pride (Gore's giant trout, cheese rolls, country music) and the frantic, hyper-adrenalized chaos of modern Kiwi television tasks."
  },
  {
    id: 'mashup-lynn-conchords',
    title: "LYNN OF TAWA'S NYC CONCHORDS TAKEOVER",
    tagline: 'When suburban 1980s Tawa snobbery takes over Bret and Jemaine’s band meeting.',
    roastTheme: 'Suburban Passive-Aggression vs Unassertive Folk Diplomacy',
    targetCulturalTrope: 'The Terrifying Force of a Tawa Matron Judging International Ambition',
    location: 'New Zealand Consulate Basement Office, New York City',
    totalDurationSeconds: 180,
    characters: [
      {
        name: 'Lynn of Tawa',
        actorRef: 'Lynn of Tawa (Ginette McDonald)',
        voiceTone: 'Shrill, hyper-nasal, relentless 1980s suburban gossip and devastating passive judgment',
        avatarEmoji: '💅',
        badgeColor: 'bg-pink-600',
        pitch: 1.45,
        rate: 1.2
      },
      {
        name: 'Murray Hewitt',
        actorRef: 'Flight of the Conchords',
        voiceTone: 'Diplomatic consular bureaucrat trying to retain control of his tiny meeting room',
        avatarEmoji: '📋',
        badgeColor: 'bg-amber-600',
        pitch: 1.15,
        rate: 1.0
      },
      {
        name: 'Jemaine Cleve',
        actorRef: 'Flight of the Conchords',
        voiceTone: 'Monotone deep deadpan New Zealand folk musician with zero energy',
        avatarEmoji: '🎸',
        badgeColor: 'bg-indigo-600',
        pitch: 0.8,
        rate: 0.85
      }
    ],
    acts: [
      {
        actNumber: 1,
        actTitle: 'Act 1: The Tawa Diplomatic Inspection (0:00 - 0:45)',
        timeRange: '0:00 - 0:45',
        startSecond: 0,
        endSecond: 45,
        sceneNotes: 'Fluorescent basement light in Manhattan. A lone map of New Zealand with Tawa circled in red marker.',
        beats: [
          {
            id: 'l1-b1',
            second: 5,
            timestamp: '00:05',
            speaker: 'Lynn of Tawa',
            dialogue: "Oh, hello Fiff! Hello Murray! Well, I took the subway from Queens and I must say the linoleum in this consulate is an absolute disgrace. You can tell they haven't used Janola since Muldoon was in office!",
            deliveryNote: 'Rapid-fire nasal barrage, clutching an oversized vinyl handbag',
            sfxCue: 'SFX (Mall chime & nasal squeak): *BEEP-SQUEAK*',
            audioPreset: 'lynn-tawa',
            stageAction: 'Runs a white-gloved finger over Murray’s consulate filing cabinet'
          },
          {
            id: 'l1-b2',
            second: 25,
            timestamp: '00:25',
            speaker: 'Murray Hewitt',
            dialogue: "Lynn, this is an official closed band meeting for Flight of the Conchords. We are discussing our upcoming gig at the Brooklyn laundromat. Bret is currently in the corner pretending to be a photocopier.",
            deliveryNote: 'Defensive consular authority, tapping a Bic pen on his yellow legal pad',
            sfxCue: 'SFX (Acoustic twang): *TWANG*',
            audioPreset: 'band-meeting',
            stageAction: 'Adjusts his brown consular tie'
          },
          {
            id: 'l1-b3',
            second: 40,
            timestamp: '00:40',
            speaker: 'Jemaine Cleve',
            dialogue: "She called my acoustic bass a glorified ukulele. I feel diminished as an artist.",
            deliveryNote: 'Total deadpan flat monotone, staring directly into the carpet',
            sfxCue: 'SFX (Single flat bass note): *BOOM*',
            audioPreset: 'band-meeting',
            stageAction: 'Plucks one melancholic string on his nylon guitar'
          }
        ]
      },
      {
        actNumber: 2,
        actTitle: 'Act 2: The Wardrobe & Ambition Roast (0:45 - 2:00)',
        timeRange: '0:45 - 2:00',
        startSecond: 45,
        endSecond: 120,
        sceneNotes: 'Lynn unrolls a bolt of floral polyester fabric across the meeting desk.',
        beats: [
          {
            id: 'l1-b4',
            second: 55,
            timestamp: '00:55',
            speaker: 'Lynn of Tawa',
            dialogue: "Well, Jemaine, look at your jersey! It looks like something Mrs. Henderson’s goat chewed through in 1974! If you want to conquer America, you need matching pastel safari suits from the Porirua Shopping Mall!",
            deliveryNote: 'Relentless weaponized suburban critique, gesturing wildly with pink sunglasses',
            sfxCue: 'SFX (Shopping mall elevator chime): *DING-DONG*',
            audioPreset: 'lynn-tawa',
            stageAction: 'Holds up an eye-watering neon yellow safari jacket against Jemaine'
          },
          {
            id: 'l1-b5',
            second: 75,
            timestamp: '01:15',
            speaker: 'Murray Hewitt',
            dialogue: "Now hold on, Lynn. As cultural ambassador, I specifically designed our image to say: 'Subdued, budget-conscious New Zealanders who might leave at any moment.' Safari suits are too aggressive.",
            deliveryNote: 'Trying to preserve his carefully calculated anti-ambition marketing plan',
            sfxCue: 'SFX (Ukulele pluck): *PLINK*',
            audioPreset: 'band-meeting',
            stageAction: 'Holds up a piece of cardboard saying "Conchords: Not Too Loud"'
          },
          {
            id: 'l1-b6',
            second: 95,
            timestamp: '01:35',
            speaker: 'Lynn of Tawa',
            dialogue: "Aggressive?! My cousin Wayne wore a safari suit to the Tawa Rotary Club dinner dance and he was voted Most Approachable Quantity Surveyor of the Year! You boys have no get-up-and-go!",
            deliveryNote: 'Peak self-righteous suburban indignance',
            sfxCue: 'SFX (Nasal chirp): *BEEP*',
            audioPreset: 'lynn-tawa',
            stageAction: 'Dabs perfume behind her ears from a promotional sample bottle'
          }
        ]
      },
      {
        actNumber: 3,
        actTitle: 'Act 3: The Tawa Concordat (2:00 - 3:00)',
        timeRange: '2:00 - 3:00',
        startSecond: 120,
        endSecond: 180,
        sceneNotes: 'Jemaine begins strumming a gentle bossa nova beat underneath Lynn’s complaints.',
        beats: [
          {
            id: 'l1-b7',
            second: 135,
            timestamp: '02:15',
            speaker: 'Jemaine Cleve',
            dialogue: "♪ Lynn from Tawa... judging our sweaters... in the consulate basement... wondering why we don't have real jobs... ♪",
            deliveryNote: 'Soft melodic acoustic ballad with deadpan eyes',
            sfxCue: 'SFX (Acoustic folk strum): *STRUMMM*',
            audioPreset: 'band-meeting',
            stageAction: 'Harmonizes with his own foot-tapping'
          },
          {
            id: 'l1-b8',
            second: 155,
            timestamp: '02:35',
            speaker: 'Lynn of Tawa',
            dialogue: "Well... that’s actually rather catchy, isn't it? Reminds me of John Rowles at the Wellington Town Hall in 1982. Fiff, put me down for twenty percent of the merchandise royalties.",
            deliveryNote: 'Abrupt conversion to ruthless suburban momager',
            sfxCue: 'SFX (Cash register & mall chime): *KA-CHING-DING*',
            audioPreset: 'trademe-bid',
            stageAction: 'Signs Murray’s clipboard with a lipstick pen'
          },
          {
            id: 'l1-b9',
            second: 170,
            timestamp: '02:50',
            speaker: 'Murray Hewitt',
            dialogue: "Band meeting adjourned. We now have a co-manager and four thousand polyester bucket hats arriving from Porirua on Thursday. Band meeting closed.",
            deliveryNote: 'Pencil tap to end the session',
            sfxCue: 'SFX (Pencil tap): *TAP-TAP*',
            audioPreset: 'band-meeting',
            stageAction: 'Turns off the basement light as the folk melody fades'
          }
        ]
      }
    ],
    pissTakeBreakdown: "Contrasts the iconic 1980s New Zealand suburban matriarch (Lynn of Tawa)—whose weapon of choice is devastating, unsolicited domestic judgment—against the painfully fragile, quiet folk modesty of Flight of the Conchords."
  },
  {
    id: 'mashup-paranormal-kfc',
    title: 'WELLINGTON PARANORMAL: THE 20-PIECE BUCKET EXORCISM',
    tagline: "Officers O'Leary and Minogue confront a spectral Billy T giggle at the Basin Reserve drive-thru.",
    roastTheme: 'Bureaucratic Poltergeist Investigation meets Classic Kiwi Vaudeville',
    targetCulturalTrope: 'Investigating Supernatural Apparitions with Standard Traffic Infringement Notices',
    location: 'Basin Reserve KFC Drive-Thru & Wellington Paranormal Squad Car',
    totalDurationSeconds: 180,
    characters: [
      {
        name: "Officer O'Leary",
        actorRef: 'Wellington Paranormal',
        voiceTone: 'Strict, serious, utterly literal police officer who treats ghosts like illegal u-turns',
        avatarEmoji: '👮‍♀️',
        badgeColor: 'bg-blue-600',
        pitch: 0.95,
        rate: 0.95
      },
      {
        name: 'Officer Minogue',
        actorRef: 'Wellington Paranormal',
        voiceTone: 'Endearingly dim-witted partner fascinated by the physics of fried chicken poltergeists',
        avatarEmoji: '👮‍♂️',
        badgeColor: 'bg-sky-600',
        pitch: 1.15,
        rate: 1.05
      },
      {
        name: 'Billy T Apparition',
        actorRef: 'The Billy T James Show (1981)',
        voiceTone: 'Legendary yellow singlet chuckling spirit delivering iconic deadpan punchlines',
        avatarEmoji: '🎭',
        badgeColor: 'bg-amber-500',
        pitch: 1.0,
        rate: 1.1
      }
    ],
    acts: [
      {
        actNumber: 1,
        actTitle: 'Act 1: The Drive-Thru Intercom Anomaly (0:00 - 0:45)',
        timeRange: '0:00 - 0:45',
        startSecond: 0,
        endSecond: 45,
        sceneNotes: 'Wellington horizontal gale drives rain into the patrol car window at the Basin Reserve.',
        beats: [
          {
            id: 'p1-b1',
            second: 5,
            timestamp: '00:05',
            speaker: "Officer O'Leary",
            dialogue: "Dispatch, Unit 44. We are at the Basin Reserve drive-thru. There is a luminous 20-piece family feast bucket hovering three meters above the speaker box. It is refusing to move into the collection bay.",
            deliveryNote: 'Deadpan radio report with total clinical detachment',
            sfxCue: 'SFX (Theremin spooky slide & radio squelch): *WOOO-CHHK*',
            audioPreset: 'wellington-paranormal',
            stageAction: 'Adjusts the squad car dashcam angle'
          },
          {
            id: 'p1-b2',
            second: 25,
            timestamp: '00:25',
            speaker: 'Officer Minogue',
            dialogue: "Look at the drumsticks, O'Leary. They're rotating in reverse chronological order. That means the wicked wings are technically from the 19th century. That's good value.",
            deliveryNote: 'Genuinely intrigued by spectral poultry economics',
            sfxCue: 'SFX (Chicken cluck & theremin): *CLUCK-WOOO*',
            audioPreset: 'wellington-paranormal',
            stageAction: 'Reaches out window trying to grab a levitating chip'
          },
          {
            id: 'p1-b3',
            second: 40,
            timestamp: '00:40',
            speaker: 'Billy T Apparition',
            dialogue: "Huh-huh-huh-huh-huh! Gidday officers! You fellas looking for the Colonel? He’s round the back borrowing my black singlet to fix a puncture on his Holden!",
            deliveryNote: 'Iconic staccato giggle burst echoing through the drive-thru speaker',
            sfxCue: 'SFX (Billy T classic laugh burst): *HUH-HUH-HUH-HUH*',
            audioPreset: 'billy-t-laugh',
            stageAction: 'Apparition materializes holding an invisible saxophone'
          }
        ]
      },
      {
        actNumber: 2,
        actTitle: 'Act 2: The Warrant of Fitness Interrogation (0:45 - 2:00)',
        timeRange: '0:45 - 2:00',
        startSecond: 45,
        endSecond: 120,
        sceneNotes: "O'Leary steps out into the howling wind with her citation notebook.",
        beats: [
          {
            id: 'p1-b4',
            second: 55,
            timestamp: '00:55',
            speaker: "Officer O'Leary",
            dialogue: "Sir, step down from the drive-thru canopy. Are you aware that operating an unauthorized vaudeville manifestation in a 50km/h school zone incurs a two-hundred-dollar infringement fee?",
            deliveryNote: 'Zero tolerance for supernatural shenanigans',
            sfxCue: 'SFX (Police scanner squelch): *CHHK-BEEP*',
            audioPreset: 'police-pie',
            stageAction: 'Clicks her ballpoint pen three times'
          },
          {
            id: 'p1-b5',
            second: 75,
            timestamp: '01:15',
            speaker: 'Billy T Apparition',
            dialogue: "Two hundred bucks?! Jeez, O'Leary, for two hundred bucks I could buy three sheep, a carton of Lion Brown, and an apology from the Auckland City Council! Huh-huh-huh!",
            deliveryNote: 'Beaming smile with infectious eyebrow waggle',
            sfxCue: 'SFX (Billy T giggle & guitar strum): *HUH-HUH-STRUM*',
            audioPreset: 'billy-t-laugh',
            stageAction: 'Spins the hovering KFC bucket like a basketball'
          },
          {
            id: 'p1-b6',
            second: 95,
            timestamp: '01:35',
            speaker: 'Officer Minogue',
            dialogue: "He makes a good point, O'Leary. In 1984, two hundred dollars was enough to purchase the entire South Island. My uncle bought Timaru for forty-five dollars and a packet of minties.",
            deliveryNote: 'Earnest economic defense of the ghost',
            sfxCue: 'SFX (Theremin wobble): *WOO-WOO*',
            audioPreset: 'wellington-paranormal',
            stageAction: 'Nods sagely from the passenger seat'
          }
        ]
      },
      {
        actNumber: 3,
        actTitle: 'Act 3: The Potato & Gravy Offering (2:00 - 3:00)',
        timeRange: '2:00 - 3:00',
        startSecond: 120,
        endSecond: 180,
        sceneNotes: "Sgt Maaka radios in from the paranormal bunker with ancient procedural advice.",
        beats: [
          {
            id: 'p1-b7',
            second: 135,
            timestamp: '02:15',
            speaker: "Officer O'Leary",
            dialogue: "Sgt Maaka advises that ancient comedic entities can be appeased with warm potato and gravy. Minogue, deploy the side order.",
            deliveryNote: 'Procedural military precision applied to fast food sides',
            sfxCue: 'SFX (Radio beep & container lid pop): *POP*',
            audioPreset: 'trademe-bid',
            stageAction: 'Presents a small plastic tub with ceremonial solemnity'
          },
          {
            id: 'p1-b8',
            second: 155,
            timestamp: '02:35',
            speaker: 'Billy T Apparition',
            dialogue: "Choice! You fellas are alright. Tell Maaka I left his jumper in the Avalon tape archives behind the Country Calendar reels! Catch you later, bro! Huh-huh-huh!",
            deliveryNote: 'Joyous spectral ascent into the Wellington drizzle',
            sfxCue: 'SFX (Billy T laugh & theremin shimmer): *HUH-HUH-SHIMMER*',
            audioPreset: 'billy-t-laugh',
            stageAction: 'Fades into a shower of golden potato chips over Kent Terrace'
          },
          {
            id: 'p1-b9',
            second: 170,
            timestamp: '02:50',
            speaker: 'Officer Minogue',
            dialogue: "Case closed, O'Leary. And look, he left us the coleslaw. It's glowing, but the cabbage is crisp.",
            deliveryNote: 'Satisfied grin as they drive off into the night',
            sfxCue: 'SFX (Patrol car siren chirp): *WHEEP-WHEEP*',
            audioPreset: 'police-pie',
            stageAction: 'The squad car turns onto Courtenay Place as the theme music rolls'
          }
        ]
      }
    ],
    pissTakeBreakdown: "Brings together the deadpan administrative realism of Wellington Paranormal and the joyful, irreverent cultural vaudeville of Billy T James, turning a routine fast food drive-thru run into an absurd municipal ghost encounter."
  }
];
