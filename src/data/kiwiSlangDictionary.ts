export interface SlangAlternative {
  id: string;
  text: string;
  sourceArchive: string;
  speaker: string;
  tone: string;
  contextNote: string;
  exampleSentence: string;
}

export interface SlangRule {
  id: string;
  keywords: string[];
  regex: RegExp;
  matchedLabel: string;
  category: 'Deadpan Understatement' | 'Pastry Thermodynamics' | 'Affirmation & Negation' | 'Westie Slang' | 'Provincial / Rural' | 'Police & Bureaucracy' | 'Supernatural Casual' | 'Suburban Conflict';
  categoryColor: string;
  explanation: string;
  culturalSubtext: string;
  alternatives: SlangAlternative[];
}

export const KIWI_SLANG_RULES: SlangRule[] = [
  {
    id: 'very-hot',
    keywords: ['very hot', 'boiling', 'super hot', 'burning', 'scorching', 'hot pie', 'too hot', 'scalding'],
    regex: /\b(very hot|boiling hot|super hot|burning hot|scorching|too hot|scalding|hot pie)\b/gi,
    matchedLabel: 'Generic Heat Descriptor',
    category: 'Pastry Thermodynamics',
    categoryColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    explanation: 'Standard English heat descriptions lack the existential civic dread of late-night service station pastry physics.',
    culturalSubtext: 'In NZ lore, heat is never just a temperature; it is a public safety hazard requiring calm roadside policing and thermodynamic cooling protocols.',
    alternatives: [
      {
        id: 'thermo-nuclear',
        text: 'fundamentally thermo-nuclear',
        sourceArchive: 'Police 10-7 (2009)',
        speaker: 'Senior Sgt Guy Baldwin',
        tone: 'Deadpan Paternal Law Enforcement Concern',
        contextNote: 'The gold standard for describing meat pies that have sat in a service station warmer drawer for 8+ hours.',
        exampleSentence: '"Look mate, step away from the mince and cheese. That pastry is fundamentally thermo-nuclear."'
      },
      {
        id: 'blow-on-pie',
        text: 'requiring mandatory thermal blowing protocols',
        sourceArchive: 'Police 10-7 (2009)',
        speaker: 'Senior Sgt Guy Baldwin',
        tone: 'Calm Civic Guidance',
        contextNote: 'Emphasizes proactive caution before consuming high-temperature dairy gravy.',
        exampleSentence: '"It is 3:00 AM. Always blow on the pie. Safer communities together."'
      },
      {
        id: 'molten-magma-filling',
        text: 'suburban molten magma core',
        sourceArchive: 'Wellington Paranormal (2018)',
        speaker: 'Officer Minogue',
        tone: 'Earnest Speculative Analysis',
        contextNote: 'Treating a service station pie like an active vulcanological phenomenon in the Bay of Plenty.',
        exampleSentence: '"O\'Leary, the cheese pocket has formed an active tectonic subduction zone."'
      }
    ]
  },
  {
    id: 'agreement-yes',
    keywords: ['yes', 'definitely', 'i agree', 'sure thing', 'absolutely', 'okay', 'yep', 'alright'],
    regex: /\b(yes|definitely|i agree|sure thing|absolutely|yep)\b/gi,
    matchedLabel: 'Direct Affirmation',
    category: 'Affirmation & Negation',
    categoryColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    explanation: 'Direct affirmative statements in dialogue sound too decisive and un-Kiwi.',
    culturalSubtext: 'Kiwi conversational rhythm relies on dialectical hedging—simultaneously agreeing and disagreeing to avoid conflict and maintain casual detachment.',
    alternatives: [
      {
        id: 'yeah-nah',
        text: 'yeah nah definitely',
        sourceArchive: 'Everyday Aotearoa Dialect',
        speaker: 'Universal Kiwi Archetype',
        tone: 'Casual Ambivalent Agreement',
        contextNote: 'Starts with affirmative, retreats into negative, lands back on complete agreement.',
        exampleSentence: '"Yeah nah definitely, she\'ll be right once we wrap a bit of wire round it."'
      },
      {
        id: 'hard-out-bro',
        text: 'hard out, full credit to the boys',
        sourceArchive: 'Post-Match Rugby Press Conference',
        speaker: 'Provincial Prop / Captain',
        tone: 'Humble Collective Solidarity',
        contextNote: 'Deflects personal praise and reaffirms absolute agreement with the premise.',
        exampleSentence: '"Hard out bro, gave it 110% out there in the second half."'
      },
      {
        id: 'sweet-as-gold',
        text: 'sweet as, no dramas whatsoever',
        sourceArchive: 'DIY Kiwi Workshop Culture',
        speaker: 'Fred Dagg & The Trevs',
        tone: 'Laconic Problem Dissolution',
        contextNote: 'Instantly reduces any cataclysmic crisis to zero drama.',
        exampleSentence: '"Sweet as, we\'ll just shove the tractor back into gear and have a cuppa tea."'
      }
    ]
  },
  {
    id: 'cool-great',
    keywords: ['great', 'cool', 'awesome', 'fantastic', 'amazing', 'superb', 'excellent'],
    regex: /\b(great|cool|awesome|fantastic|amazing|superb|excellent)\b/gi,
    matchedLabel: 'Enthusiastic Generic Superlative',
    category: 'Deadpan Understatement',
    categoryColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    explanation: 'High-energy American-style superlatives sound forced in Kiwi comic dialogue.',
    culturalSubtext: 'Kiwi comedy deflates overt enthusiasm into iconic provincial understated catchphrases.',
    alternatives: [
      {
        id: 'o-for-awesome',
        text: 'O for Awesome',
        sourceArchive: 'Wheel of Fortune NZ (1992)',
        speaker: 'David Tua',
        tone: 'Unshakeable Earnest Optimism',
        contextNote: 'The legendary phonetic masterpiece that conquered New Zealand daytime television.',
        exampleSentence: '"I\'d like to buy a vowel, Phillip... O for Awesome."'
      },
      {
        id: 'not-bad-actually',
        text: 'not bad at all, relatively speaking',
        sourceArchive: 'Fred Dagg (1975)',
        speaker: 'Fred Dagg',
        tone: 'Maximum Allowed Praise',
        contextNote: 'The absolute ceiling of positive verbal feedback permitted on a South Island sheep farm.',
        exampleSentence: '"Well, the wool clip didn\'t completely ruin us, so she\'s not bad actually."'
      },
      {
        id: 'pretty-mean-bro',
        text: 'pretty mean, choice as',
        sourceArchive: 'Boy (Taika Waititi, 2010)',
        speaker: 'Alamein / Boy',
        tone: 'Youthful East Coast Swagger',
        contextNote: 'Quintessential retro 1980s East Coast casual approval.',
        exampleSentence: '"Check out this Michael Jackson dance move, choice as."'
      }
    ]
  },
  {
    id: 'friend-mate',
    keywords: ['friend', 'pal', 'buddy', 'companion', 'associate', 'dude', 'comrade'],
    regex: /\b(friend|pal|buddy|companion|associate|dude)\b/gi,
    matchedLabel: 'Generic Companion Term',
    category: 'Provincial / Rural',
    categoryColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    explanation: 'Calling someone "pal" or "buddy" sounds like a 1990s US sitcom script.',
    culturalSubtext: 'Kiwi relationships are defined by collective kinship ("cuz", "bro", "Trev", "mate") that carries deep unspoken loyalty or mild passive-aggressive tension.',
    alternatives: [
      {
        id: 'trev-and-the-boys',
        text: 'me and Trev',
        sourceArchive: 'Fred Dagg & The Trevs',
        speaker: 'Fred Dagg',
        tone: 'Rural Collective Default',
        contextNote: 'Every farm worker, brother, cousin, and neighbour in Fred Dagg’s universe is named Trev.',
        exampleSentence: '"Me and Trev were looking at the paddock and we thought we\'d better have a word."'
      },
      {
        id: 'ghost-chip-bro',
        text: 'bro / cuz',
        sourceArchive: 'NZTA Ghost Chips (2011)',
        speaker: 'Monique & Puzzle',
        tone: 'Ethereal Teenage Kinship',
        contextNote: 'The universal term of fraternal endearment across Aotearoa.',
        exampleSentence: '"You know I can\'t grab your ghost chips, bro."'
      },
      {
        id: 'chur-my-cuz',
        text: 'cuz / legend',
        sourceArchive: 'Outrageous Fortune / West Auckland',
        speaker: 'Van West',
        tone: 'Warm Westie Affection',
        contextNote: 'Honest West Auckland term for family, co-conspirators, and mates.',
        exampleSentence: '"Chur cuz, appreciate you picking up the crate."'
      }
    ]
  },
  {
    id: 'police-cop',
    keywords: ['police', 'policeman', 'cop', 'officer', 'law enforcement', 'constable'],
    regex: /\b(policeman|cops|police officer|law enforcement|the fuzz)\b/gi,
    matchedLabel: 'Generic Law Enforcement',
    category: 'Police & Bureaucracy',
    categoryColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    explanation: 'Generic crime drama references ignore the unique charm of NZ provincial policing.',
    culturalSubtext: 'NZ police comedy focuses on low-stakes bylaws, pie temperature enforcement, high-vis compliance, and supernatural confusion handled like a noise complaint.',
    alternatives: [
      {
        id: 'speedo-cop',
        text: 'Speedo Cop on undercover council duty',
        sourceArchive: 'Moon TV / Late Night Big Breakfast (Leigh Hart)',
        speaker: 'Leigh Hart',
        tone: 'Deadpan Absurdist Authority',
        contextNote: 'Enforcing nonsensical maritime parking regulations in full neon Speedos.',
        exampleSentence: '"Step aside citizen, Speedo Cop is conducting an unannounced footwear inspection."'
      },
      {
        id: 'paranormal-unit',
        text: 'Wellington Paranormal Special Unit (O\'Leary & Minogue)',
        sourceArchive: 'Wellington Paranormal (2018)',
        speaker: 'Sgt Ruawai Maaka',
        tone: 'Deadpan Bureaucratic Investigation',
        contextNote: 'Investigating shapeshifters, aliens, and ghosts with standard police forms and high-vis vests.',
        exampleSentence: '"We received a 111 call about an aggressive floating bucket on Cuba Street."'
      },
      {
        id: 'safer-communities',
        text: 'Safer Communities Together patrol',
        sourceArchive: 'Police 10-7 (2000s)',
        speaker: 'Guy Baldwin',
        tone: 'Community Policing Earnestness',
        contextNote: 'The official NZ Police motto, delivered while lecturing citizens on pie thermodynamics.',
        exampleSentence: '"Remember team: Safer Communities Together, and always blow on the pie."'
      }
    ]
  },
  {
    id: 'broken-fix',
    keywords: ['broken', 'repair', 'fix', 'damaged', 'mended', 'solve', 'engineer'],
    regex: /\b(broken|repair it|fix it|damaged|mended|engineer a solution)\b/gi,
    matchedLabel: 'Formal Engineering/Repair',
    category: 'Provincial / Rural',
    categoryColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    explanation: 'Formal repair language neglects the sacred Kiwi philosophy of improvised rustic ingenuity.',
    culturalSubtext: 'No problem in New Zealand requires high-tech parts; all physical, structural, and temporal rifts yield to baling twine and No. 8 wire.',
    alternatives: [
      {
        id: 'no8-wire-baling-twine',
        text: 'fixed with a length of No. 8 wire and baling twine',
        sourceArchive: 'Fred Dagg (1975)',
        speaker: 'Fred Dagg',
        tone: 'Unshakable Improvised Competence',
        contextNote: 'The foundational myth of New Zealand engineering.',
        exampleSentence: '"She had a broken axle, but a coil of No. 8 wire and some baling twine sorted her right out."'
      },
      {
        id: 'tap-with-hammer',
        text: 'given a firm technical tap with a fence post',
        sourceArchive: 'DIY Mitre 10 Lore',
        speaker: 'Provincial DIY Builder',
        tone: 'Pragmatic Percussive Maintenance',
        contextNote: 'Fixing complex electronics by whacking them with timber.',
        exampleSentence: '"Just gave the carburetor a firm tap with a fence batten and she roared into life."'
      },
      {
        id: 'shell-be-right',
        text: 'left alone because she\'ll be right',
        sourceArchive: 'Classic Kiwi Vernacular',
        speaker: 'Universal Kiwi',
        tone: 'Complete Resignation to Fate',
        contextNote: 'The ultimate acceptance that imperfect machinery is good enough.',
        exampleSentence: '"The exhaust is dragging a bit, but she\'ll be right till warrant of fitness time."'
      }
    ]
  },
  {
    id: 'stealing-theft',
    keywords: ['stealing', 'theft', 'stole', 'robbery', 'heist', 'shoplifting', 'burglary'],
    regex: /\b(stealing|theft|stole|robbery|heist|shoplifting|burglary)\b/gi,
    matchedLabel: 'Conventional Crime Terminology',
    category: 'Westie Slang',
    categoryColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    explanation: 'Formal crime terminology misses the West Auckland comedic code of family heists, Holden Commodores, and pub rules.',
    culturalSubtext: 'Outrageous Fortune framed burglary not as antisocial crime, but as a family trade passed down through generations in Henderson.',
    alternatives: [
      {
        id: 'westie-earning',
        text: 'doing a bit of freelance Westie procurement',
        sourceArchive: 'Outrageous Fortune (2005)',
        speaker: 'Ted West',
        tone: 'Old-School Criminal Code of Honour',
        contextNote: 'Ted West’s distinction between honest thieving and dirty drug dealing.',
        exampleSentence: '"We don\'t steal from our own, Cheryl. We do proper Westie procurement from insurance companies."'
      },
      {
        id: 'fell-off-truck',
        text: 'obtained via a TradeMe $1 reserve no-questions-asked deal',
        sourceArchive: 'TradeMe Suburban Folklore',
        speaker: 'Van West',
        tone: 'Shady Innocence',
        contextNote: 'The classic excuse for acquiring suspicious home electronics.',
        exampleSentence: '"Mate, that 65-inch plasma was listed on TradeMe with $1 reserve, pick-up only."'
      },
      {
        id: 'five-finger-discount',
        text: 'liberated from the Mitre 10 garden centre',
        sourceArchive: 'Outrageous Fortune',
        speaker: 'Jethro West',
        tone: 'Westie Legal Technicality',
        contextNote: 'Justifying petty theft through unhinged legalistic semantics.',
        exampleSentence: '"Technically under the bylaws, those shade sails were abandoned on council property."'
      }
    ]
  },
  {
    id: 'go-away-leave',
    keywords: ['go away', 'leave me alone', 'get lost', 'get out', 'scram', 'depart'],
    regex: /\b(go away|leave me alone|get lost|get out of here|scram)\b/gi,
    matchedLabel: 'Aggressive Dismissal',
    category: 'Deadpan Understatement',
    categoryColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    explanation: 'Standard dismissals sound too American or confrontational.',
    culturalSubtext: 'Kiwi dismissals blend dry resignation, rural metaphors, or supernatural non-sequiturs.',
    alternatives: [
      {
        id: 'bugger-off',
        text: 'rattle your dags and bugger off',
        sourceArchive: 'Footrot Flats / Murray Ball',
        speaker: 'Wal Footrot',
        tone: 'Grumpy Pastoral Impatience',
        contextNote: 'Classic rural sheep-farming command to hurry up and depart.',
        exampleSentence: '"Rattle your dags, Dog, we haven\'t got all day to check the boundary."'
      },
      {
        id: 'you-know-i-cant-grab',
        text: 'you know I can\'t grab your ghost chips',
        sourceArchive: 'NZTA Ghost Chips (2011)',
        speaker: 'Monique',
        tone: 'Ethereal Reality Check',
        contextNote: 'Diffusing an unwanted interaction by pointing out physical/spectral impossibility.',
        exampleSentence: '"Mate, you know I can\'t grab your ghost chips. Space head."'
      },
      {
        id: 'band-meeting-dismissed',
        text: 'band meeting adjourned: absent',
        sourceArchive: 'Flight of the Conchords (2007)',
        speaker: 'Murray Hewitt',
        tone: 'Consular Bureaucratic Dismissal',
        contextNote: 'Ending a conversation by formal roll-call cancellation.',
        exampleSentence: '"Band meeting adjourned. Bret: gone. Jemaine: departed. Murray: still present."'
      }
    ]
  },
  {
    id: 'vampire-monster',
    keywords: ['vampire', 'monster', 'demon', 'creature', 'undead', 'bloodsucker', 'alien'],
    regex: /\b(vampire|monster|demon|creature of the night|undead|alien entity)\b/gi,
    matchedLabel: 'Gothic / Sci-Fi Horror Tropes',
    category: 'Supernatural Casual',
    categoryColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    explanation: 'Traditional dramatic horror labels clash with the mundane domestic realism of NZ supernatural comedy.',
    culturalSubtext: 'In Taika Waititi & Jemaine Clement’s Wellington, vampires are just flatmates arguing about who did the dishes or who swept the hallway with newspaper.',
    alternatives: [
      {
        id: 'flat-roster-vampire',
        text: 'immortal flatmate currently behind on the chore wheel',
        sourceArchive: 'What We Do in the Shadows (2014)',
        speaker: 'Viago',
        tone: 'Polite Domestic Frustration',
        contextNote: 'Dealing with 800-year-old vampires through flat cleaning disputes.',
        exampleSentence: '"Vladislav has not done the dishes for five years. There is bloody crockery everywhere."'
      },
      {
        id: 'we-dont-bite-rent',
        text: 'un-dead tenant (we don\'t bite people who pay rent)',
        sourceArchive: 'What We Do in the Shadows (2014)',
        speaker: 'Deacon',
        tone: 'Pragmatic Rental Economics',
        contextNote: 'The fundamental rule of vampire house-sharing in suburban Wellington.',
        exampleSentence: '"We leave the landlord alone because he lets us sleep in the basement."'
      },
      {
        id: 'bloke-with-bucket',
        text: 'local resident having an unusual Friday night encounter',
        sourceArchive: 'Wellington Paranormal (2018)',
        speaker: 'Officer O\'Leary',
        tone: 'Deflating Paranormal Phenomenon to Mundane Council Event',
        contextNote: 'Downplaying terrifying apparitions as routine public nuisance.',
        exampleSentence: '"It\'s not a demonic possession, Minogue, just a gentleman who had too much L&P."'
      }
    ]
  },
  {
    id: 'suburban-gossip',
    keywords: ['gossip', 'did you hear', 'you wont believe', 'rumour', 'scandal', 'neighbour'],
    regex: /\b(did you hear|you won\'t believe|rumour has it|scandal|the neighbours)\b/gi,
    matchedLabel: 'Standard Neighbourhood Gossip',
    category: 'Suburban Conflict',
    categoryColor: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
    explanation: 'Generic gossip lacks the ultra-specific, polyester-clad 1980s suburban passive-aggression of Tawa.',
    culturalSubtext: 'Lynn of Tawa turned shopping centre carpets, Tupperware, and driveway etiquette into razor-sharp social satire.',
    alternatives: [
      {
        id: 'lynn-tawa-driveway',
        text: 'as I said to Kevin on the concrete driveway in Tawa',
        sourceArchive: 'Lynn of Tawa (Ginette McDonald)',
        speaker: 'Lynn of Tawa',
        tone: 'Shrill Suburban Condescension',
        contextNote: 'The supreme voice of provincial Wellington middle-class social anxiety.',
        exampleSentence: '"Well, as I said to Kevin, if they\'re going to park the trailer on the berm, honestly."'
      },
      {
        id: 'porirua-mall-special',
        text: 'spotted near the escalators in the Porirua shopping mall',
        sourceArchive: 'Lynn of Tawa (1980s)',
        speaker: 'Lynn of Tawa',
        tone: 'High-Status Suburban Judgment',
        contextNote: 'Evaluating someone’s character based on their shopping centre wardrobe.',
        exampleSentence: '"Wearing a safari suit on a Wednesday afternoon? Honestly, what will the church group think."'
      }
    ]
  },
  {
    id: 'confusion-what',
    keywords: ['what is happening', 'what is this', 'i am confused', 'what do you mean', 'how come', 'what the hell'],
    regex: /\b(what is happening|what is this|i am confused|what do you mean|what the hell|what is going on)\b/gi,
    matchedLabel: 'Generic Dramatic Confusion',
    category: 'Deadpan Understatement',
    categoryColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    explanation: 'Dramatic expressions of confusion sound too theatrical.',
    culturalSubtext: 'Kiwi characters react to reality-bending absurdities with mild bewilderment and understated administrative curiosity.',
    alternatives: [
      {
        id: 'nek-minnit',
        text: 'and then... nek minnit',
        sourceArchive: 'Viral NZ Skate Culture (2011)',
        speaker: 'Levi Hawken',
        tone: 'Epic Deadpan Causal Shift',
        contextNote: 'The national shorthand for sudden, unexpected catastrophic changes in circumstance.',
        exampleSentence: '"Left my scooter outside the dairy... nek minnit."'
      },
      {
        id: 'correos-pasta-panic',
        text: 'TASKMASTER DID NOT PREPARE ME FOR THIS PSYCHIC COLLAPSE',
        sourceArchive: 'Taskmaster NZ (Season 2)',
        speaker: 'David Correos',
        tone: '160dB Unhinged Panic Dissolution',
        contextNote: 'Transforming minor task confusion into full kinetic hysteria.',
        exampleSentence: '"WHY ARE THERE NINE PINCH-POINTS ON A CONCRETE BROWN TROUT?!"'
      },
      {
        id: 'space-head-check',
        text: 'are you a space head or what bro',
        sourceArchive: 'NZTA Ghost Chips (2011)',
        speaker: 'Puzzle',
        tone: 'Friendly Confrontation of Nonsense',
        contextNote: 'A gentle reminder that someone has completely lost touch with reality.',
        exampleSentence: '"Bro, why are you bidding $400 on a pine table? Space head."'
      }
    ]
  },
  {
    id: 'funny-comedian-challenge',
    keywords: ['think youre funny', 'think you are funny', 'funny guy', 'check this out', 'bit of a comedian', 'smartass', 'trying to be funny'],
    regex: /\b(think you\'?re funny|think you are funny|funny guy|check this out|bit of a comedian|trying to be funny)\b/gi,
    matchedLabel: 'Comedic Confrontation / Banter Challenge',
    category: 'Westie Slang',
    categoryColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    explanation: 'Standard confrontational comedy prompts miss the raw West Auckland / K Rd pub-brawl comedic edge.',
    culturalSubtext: 'The iconic Kiwi "think you\'re funny" challenge is the ultimate prompt before dropping a devastating deadpan one-liner or archival classic.',
    alternatives: [
      {
        id: 'think-youre-funny-westie',
        text: '"Think you\'re funny? Check this out, mate."',
        sourceArchive: 'Outrageous Fortune / West Auckland Lore',
        speaker: 'Van & Jethro West',
        tone: 'Gritty Street Banter & Unshakable Confidence',
        contextNote: 'The official intro motto of the Avalon Living Archive: challenging anyone to out-joke fifty years of NZ comedy history.',
        exampleSentence: '"Think you\'re funny? Check this out — three crates in the boot and a Holden Commodore with no rego."'
      },
      {
        id: 'step-away-comedian',
        text: 'look mate, step away from the mic before the pastry combusts',
        sourceArchive: 'Police 10-7 (2009)',
        speaker: 'Senior Sgt Guy Baldwin',
        tone: 'Deadpan Law Enforcement De-escalation',
        contextNote: 'Calmly diffusing comedic arrogance with thermodynamic police advice.',
        exampleSentence: '"Look mate, step away from the mic. You\'re dealing with a fundamentally thermo-nuclear audience."'
      },
      {
        id: 'billy-t-giggle',
        text: '*infectious Billy T snicker* ... check this out, bro',
        sourceArchive: 'The Billy T James Show (1985)',
        speaker: 'Billy T James',
        tone: 'Mischievous Unstoppable Warmth',
        contextNote: 'The signature trademark laugh that instantly wins every comedic exchange in Aotearoa history.',
        exampleSentence: '"*infectious Billy T snicker* ... check this out bro, I got a special discount at the dairy."'
      }
    ]
  },
  {
    id: 'fark-up-park-up',
    keywords: ['fark-up', 'fark up', 'park-up', 'park up', 'move away', 'cant park', 'parkea', 'pakeha'],
    regex: /\b(fark-up|fark up|park-up|park up|move away|cant park|parkea)\b/gi,
    matchedLabel: 'Westside Park-Up / Fark-Up Cadence',
    category: 'Westie Slang',
    categoryColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    explanation: 'Classic Central West Auckland linguistic wordplay contrasting parking up (chilling in a car) with packing up or clearing out.',
    culturalSubtext: 'In West Auckland suburban folklore, car parks outside superettes and late-night dairies are contested quantum territory between mates laughing and security guards.',
    alternatives: [
      {
        id: 'westside-parkup',
        text: 'fark-up, not park-up — move the wagon along bro',
        sourceArchive: 'Central Westside Street Archives (2026)',
        speaker: 'Sir Manphat / Westside Quantum Poet',
        tone: 'Rhythmic Westie Spoken Word',
        contextNote: 'Telling someone to clear the forecourt so the crew can drop verses.',
        exampleSentence: '"Fark-up and move away — my funny mates are going to laugh bro. So fark-up, not park-up."'
      },
      {
        id: 'park-the-cefiro',
        text: 'park up the Cefiro by the kerb and crack a cold one',
        sourceArchive: 'Outrageous Fortune (2005)',
        speaker: 'Van West',
        tone: 'Casual Westie Chill',
        contextNote: 'The classic act of idling in a Japanese import with the stereo on.',
        exampleSentence: '"Park up by the takeaway shop, Pascal\'s grabbing the scoop of chips."'
      }
    ]
  },
  {
    id: 'peace-science-physics',
    keywords: ['peace-science', 'peace science', 'physics joke', 'learnt maths', 'teach the teachers', 'q-bituarry', 'q-bituary', 'bentley wage'],
    regex: /\b(peace-science|peace science|physics joke|learnt maths|teach the teachers|q-bituarry|q-bituary|bentley wage)\b/gi,
    matchedLabel: 'Westside Quantum Physics & Classroom Satire',
    category: 'Suburban Conflict',
    categoryColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    explanation: 'Subverting classroom academic authority through spontaneous deadpan comedy and quantum street wit.',
    culturalSubtext: 'The legendary Kiwi high school phenomenon of teaching the teachers while only delivering a single devastating physics joke during fifth period.',
    alternatives: [
      {
        id: 'quantum-peace-science',
        text: 'poets of peace-science for dummies and quantum q-bituaries',
        sourceArchive: 'Central Westside Street Archives (2026)',
        speaker: 'Sir Manphat / The Physics Comedian',
        tone: 'Philosophical Street Cadence',
        contextNote: 'Blending quantum physics with West Auckland urban realities.',
        exampleSentence: '"Q-bituary on central WESTSIDE: poets of peace-science for dummies. I learnt maths just to add it to a list."'
      },
      {
        id: 'physics-single-joke',
        text: 'dropping a single devastating physics joke while corporate kids scramble',
        sourceArchive: 'Central Westside Street Archives (2026)',
        speaker: 'The Quiet Westside Genius',
        tone: 'Deadpan High-School Legend',
        contextNote: 'Winning the entire academic term with one silent observation.',
        exampleSentence: '"Apart from telling a single joke in physics I hardly even spoke — the kid getting paid Bentley wage had no idea I was his number one guy."'
      }
    ]
  }
];

export interface DetectedSlangMatch {
  ruleId: string;
  rule: SlangRule;
  matchedText: string;
  index: number;
  length: number;
}

export function scanScriptForKiwiSlang(scriptText: string): DetectedSlangMatch[] {
  const matches: DetectedSlangMatch[] = [];

  KIWI_SLANG_RULES.forEach((rule) => {
    // Reset regex state
    const regex = new RegExp(rule.regex.source, 'gi');
    let match: RegExpExecArray | null;

    while ((match = regex.exec(scriptText)) !== null) {
      matches.push({
        ruleId: rule.id,
        rule,
        matchedText: match[0],
        index: match.index,
        length: match[0].length
      });
    }
  });

  return matches.sort((a, b) => a.index - b.index);
}

export function calculateKiwiAuthenticityScore(scriptText: string, matches: DetectedSlangMatch[]): {
  overallScore: number;
  deadpanIndex: number;
  archivalDensity: number;
  hazardAwareness: number;
  diyIngenuity: number;
  feedback: string;
} {
  const textLower = scriptText.toLowerCase();
  const wordCount = scriptText.split(/\s+/).filter(Boolean).length;
  if (wordCount < 5) {
    return {
      overallScore: 20,
      deadpanIndex: 20,
      archivalDensity: 15,
      hazardAwareness: 10,
      diyIngenuity: 15,
      feedback: "Type or load more dialogue to begin comprehensive Kiwi cultural analysis."
    };
  }

  // Check iconic keywords in text
  const iconicTerms = [
    'thermo-nuclear', 'pie', 'ghost chip', 'nek minnit', 'o for awesome', 'yeah nah',
    'no. 8 wire', 'trev', 'trademe', 'dagg', 'vladislav', 'monique', 'minogue', 'o\'leary',
    'chur', 'sweet as', 'bugger', 'stubbies', 'dairy', 'togs', 'jandals', 'hard out',
    'baling twine', 'lynn', 'tawa', 'westie', 'correos', 'taskmaster', 'speedo cop'
  ];

  let iconicHits = 0;
  iconicTerms.forEach(t => {
    if (textLower.includes(t)) iconicHits++;
  });

  // Calculate scores
  const matchRatio = matches.length / Math.max(1, wordCount / 20);
  const deadpanIndex = Math.min(100, Math.round(25 + (iconicHits * 12) + (textLower.includes('yeah nah') ? 15 : 0)));
  const archivalDensity = Math.min(100, Math.round(15 + (iconicHits * 14)));
  const hazardAwareness = Math.min(100, Math.round(20 + (textLower.includes('pie') || textLower.includes('thermo') ? 35 : 0) + (textLower.includes('ghost') ? 25 : 0)));
  const diyIngenuity = Math.min(100, Math.round(20 + (textLower.includes('wire') || textLower.includes('trev') || textLower.includes('twine') ? 40 : 0)));

  const overallScore = Math.min(100, Math.round((deadpanIndex * 0.3) + (archivalDensity * 0.3) + (hazardAwareness * 0.2) + (diyIngenuity * 0.2)));

  let feedback = "Decent start. Upgrading generic phrases to iconic Kiwi archival lines will elevate this to peak deadpan comedy.";
  if (overallScore >= 80) {
    feedback = "Exceptional Aotearoa cultural mastery! Razor-sharp deadpan timing and flawless archival reference density.";
  } else if (overallScore >= 55) {
    feedback = "Solid provincial rhythm! Replace the remaining generic English expressions with authentic Kiwi archive alternatives.";
  }

  return {
    overallScore,
    deadpanIndex,
    archivalDensity,
    hazardAwareness,
    diyIngenuity,
    feedback
  };
}
