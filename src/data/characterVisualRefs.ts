import baldwinImg from '../assets/images/baldwin_character_ref_1788010975220.jpg';
import vladImg from '../assets/images/vlad_character_ref_1788010991928.jpg';
import fredDaggImg from '../assets/images/fred_dagg_character_ref_1788011006033.jpg';
import billyTImg from '../assets/images/billy_t_character_ref_1788011022752.jpg';
import sirManphatImg from '../assets/images/sir_manphat_character_ref_1788013189277.jpg';

export interface CharacterVisualConcept {
  id: string;
  characterName: string;
  archetypeRole: string;
  iconicQuote: string;
  referenceImageUrl?: string;
  visualAnatomy: {
    build: string;
    facialFeatures: string;
    posture: string;
  };
  costumeBreakdown: {
    headwear: string;
    upperBody: string;
    lowerBody: string;
    footwear: string;
  };
  iconicProps: string[];
  colorPalette: {
    name: string;
    hex: string;
    usage: string;
  }[];
  expressionSheet: {
    label: string;
    description: string;
  }[];
  comicArtStylePrompt: string;
}

export const CANONICAL_CHARACTER_VISUAL_REFS: CharacterVisualConcept[] = [
  {
    id: 'char-baldwin',
    characterName: 'Senior Sgt Guy Baldwin',
    archetypeRole: 'Paternal Deadpan Law Enforcement & Thermal Pastry Specialist',
    iconicQuote: 'Look mate, that pastry has been residing in the warmer since Tuesday. It is fundamentally thermo-nuclear. You must always blow on the pie.',
    referenceImageUrl: baldwinImg,
    visualAnatomy: {
      build: 'Stocky, sturdy 1980s provincial police build, upright posture with calm paternal authority.',
      facialFeatures: 'Bristling thick brown police moustache, intense deadpan eye contact, furrowed brow of civic safety concern.',
      posture: 'Hands hooked firmly into stab-vest / high-vis straps, chin slightly tucked in diagnostic gaze.'
    },
    costumeBreakdown: {
      headwear: 'Standard issue checkerboard band peaked police cap or side-parted sensible hair.',
      upperBody: 'Fluorescent yellow-green high-visibility patrol vest over dark navy police shirt with radio epaulettes.',
      lowerBody: 'Heavy dark navy patrol trousers with reinforced belt and pouch accessories.',
      footwear: 'High-shine black leather police boots ready for damp BP forecourts.'
    },
    iconicProps: [
      'Yellow laser digital infrared temperature gun calibrated for minced beef pastries (display: 88.4°C)',
      'Laminated "Safer Communities Together" advisory card',
      'Stubby HB pencil and standard issue police notebook'
    ],
    colorPalette: [
      { name: 'High-Vis Safety Yellow', hex: '#ccff00', usage: 'Patrol vest & thermal laser casing' },
      { name: 'Patrol Navy Blue', hex: '#0a192f', usage: 'Police uniform shirt and trousers' },
      { name: 'Thermonuclear Pastry Amber', hex: '#f59e0b', usage: 'Molten pie filling glow' },
      { name: 'Forecourt Asphalt Slate', hex: '#334155', usage: 'Background concrete tone' }
    ],
    expressionSheet: [
      { label: 'Paternal Warning', description: 'Deadpan raised eyebrow, mouth slightly pursed, calm gaze.' },
      { label: 'Thermal Assessment', description: 'Squinting at laser thermometer reading with slight disapproving head shake.' },
      { label: 'Safer Communities Approval', description: 'Modest nod as steam dissipates to safe consumption temperature.' }
    ],
    comicArtStylePrompt: 'Retro 1980s comic book character reference sheet of Senior Sergeant Guy Baldwin, a deadpan New Zealand police officer with moustache in high visibility police vest holding a yellow digital laser thermometer pointing at a steaming meat pie, comic ink lines, halftone dot texture, crisp character turnaround model sheet style'
  },
  {
    id: 'char-vladislav',
    characterName: 'Vladislav the Poker',
    archetypeRole: 'Ancient Romanian Vampire Aristocrat in Suburban NZ Exile',
    iconicQuote: 'I have crossed oceans of time to win this pine coffee table on TradeMe for twelve dollars fifty!',
    referenceImageUrl: vladImg,
    visualAnatomy: {
      build: 'Tall, aristocratic, slightly gaunt medieval frame with flamboyant gothic hand gestures.',
      facialFeatures: 'Dark sharp goatee, piercing hypnotic gaze, pale undead complexion under neon tube lights.',
      posture: 'Melodramatic cape flourish contrasted with holding modern paper receipts.'
    },
    costumeBreakdown: {
      headwear: 'Wild dark curls, occasionally dusted with ancient European castle cobwebs.',
      upperBody: 'Lush dark red velvet cape with gold brocade trim over ruffled Renaissance chemise.',
      lowerBody: 'Black tailored velvet breeches or leather pants.',
      footwear: 'Pointed gothic boots with silver buckles.'
    },
    iconicProps: [
      'Printed TradeMe pickup invoice with $1 reserve highlight',
      'Chore wheel grievance ledger from Wellington flat',
      'Gothic ornate candelabra adapted for BP forecourt'
    ],
    colorPalette: [
      { name: 'Vampiric Crimson Velvet', hex: '#881337', usage: 'Outer cape and lining' },
      { name: 'Undead Midnight Black', hex: '#09090b', usage: 'Gothic breeches and under-vest' },
      { name: 'TradeMe Cyber Cyan', hex: '#06b6d4', usage: 'Screen glow of auction listing' },
      { name: 'Antique Gold Trim', hex: '#eab308', usage: 'Brocade embroidery and fangs glint' }
    ],
    expressionSheet: [
      { label: 'Feudal Fury', description: 'Hissing with elongated fangs while waving paper auction terms.' },
      { label: 'Suburban Flatmate Fatigue', description: 'Rubbing temples over chore wheel disputes and unwashed dishes.' },
      { label: 'Hypnotic Bargaining', description: 'Widened mystic eyes trying to hypnotize a dairy clerk.' }
    ],
    comicArtStylePrompt: 'Retro comic book character model sheet of Vladislav the vampire, dramatic ancient European vampire aristocrat with ruffled collar and velvet cloak holding a printed TradeMe pickup receipt inside a neon lit New Zealand convenience store, comic book ink style, bold outlines, halftone dots, vivid expressive illustration'
  },
  {
    id: 'char-fred-dagg',
    characterName: 'Fred Dagg',
    archetypeRole: 'Laconic Rural Philosopher & Improvised No. 8 Wire Mastermind',
    iconicQuote: 'Gidday. Me and Trev reckon a bit of No. 8 wire will sort her right out. Not bad at all, relatively speaking.',
    referenceImageUrl: fredDaggImg,
    visualAnatomy: {
      build: 'Weathered, broad-shouldered dairy farmer stance, leaning casually on one gumboot.',
      facialFeatures: 'Sun-crinkled eyes with permanent laconic squint, dry understated smirk, weathered jawline.',
      posture: 'Hands slung casually into stubbies pockets or holding fencing pliers with relaxed ease.'
    },
    costumeBreakdown: {
      headwear: 'Floppy torn canvas sun hat or faded woolen bush beanie.',
      upperBody: 'Faded, fraying black wool singlet (sleeveless) exposing sunburnt shoulders.',
      lowerBody: 'Classic dark cotton stubbies shorts.',
      footwear: 'Heavy black rubber Skellerup Red Band gumboots with white socks peeking out.'
    },
    iconicProps: [
      'Heavy coil of high-tensile No. 8 galvanized fencing wire',
      'Fencing pliers and roll of weathered baling twine',
      'Enamel tin mug of lukewarm billy tea'
    ],
    colorPalette: [
      { name: 'Dagg Black Singlet', hex: '#18181b', usage: 'Torn work singlet & gumboot rubber' },
      { name: 'Red Band Trim', hex: '#dc2626', usage: 'Iconic top band of farmer gumboots' },
      { name: 'Galvanized Wire Silver', hex: '#94a3b8', usage: 'No. 8 fencing wire coils & pliers' },
      { name: 'Pasture Clover Green', hex: '#15803d', usage: 'Waikato / Taihape farm backdrop' }
    ],
    expressionSheet: [
      { label: 'Laconic "Gidday"', description: 'Half-smirk with a slow chin tilt greeting.' },
      { label: 'Trev Assessment', description: 'Looking off to the middle distance wondering what Trev broke today.' },
      { label: 'DIY Revelation', description: 'Quietly tapping wire spool with complete pragmatic certainty.' }
    ],
    comicArtStylePrompt: '1980s New Zealand vintage comic book illustration character turnaround model sheet of Fred Dagg, rugged laconic Kiwi farmer wearing torn black singlet, floppy bucket hat, stubbies shorts and heavy black gumboots, holding a coil of fencing No. 8 wire and fencing pliers, comic ink hatching, vivid colors'
  },
  {
    id: 'char-billy-t',
    characterName: 'Billy T James',
    archetypeRole: 'Iconic Master of Warmth, Piss-Takes & Infectious Laughter',
    iconicQuote: '*infectious trademark snicker* ... Hey bro, check this out, special discount at the dairy!',
    referenceImageUrl: billyTImg,
    visualAnatomy: {
      build: 'Lively, expressive comedic energy, open posture radiating instant charisma.',
      facialFeatures: 'Iconic wide beaming grin, twinkling eyes of mischief, ready to burst into his trademark snicker laugh.',
      posture: 'Leaning forward towards the viewer with conspiratorial comedic energy.'
    },
    costumeBreakdown: {
      headwear: 'Cheeky tilted police peaked cap or 1980s retro newsman hat.',
      upperBody: 'Bright yellow cotton tea-towel scarf draped around the collar over casual shirt.',
      lowerBody: 'Relaxed 1980s retro slacks or denim.',
      footwear: 'Classic jandals (flip-flops) or comfortable leather shoes.'
    },
    iconicProps: [
      'Signature yellow-and-white checked tea-towel scarf',
      'Cardboard cardboard cutout sign for "Billy\'s Quick Cash & Pawn"',
      'Acoustic guitar ready for a comic waiata parody'
    ],
    colorPalette: [
      { name: 'Tea-Towel Yellow', hex: '#facc15', usage: 'Signature scarf and sunny warmth' },
      { name: 'Police Cap Royal Blue', hex: '#1e3a8a', usage: 'Cap fabric and jacket accent' },
      { name: 'Radiant Smile White', hex: '#f8fafc', usage: 'Teeth and highlight gleam' },
      { name: 'Retro 80s Magenta', hex: '#d946ef', usage: 'Television variety backdrop' }
    ],
    expressionSheet: [
      { label: 'Signature Snicker', description: 'Eyes crinkled shut, head tilted back in irresistible giggles.' },
      { label: 'Conspiratorial Wink', description: 'One eye shut whispering a classic dairy negotiation tip.' },
      { label: 'Deadpan Disbelief', description: 'Mock-serious look of absolute astonishment at Pakeha formalities.' }
    ],
    comicArtStylePrompt: 'Vintage 1980s pop comic book character concept art of Billy T James, warm beaming New Zealand Maori comedian wearing a yellow tea-towel scarf draped over his neck and a cheerful police cap, laughing with infectious wide smile, bold retro comic pen outlines, halftone dot shading, vibrant screenprint aesthetic'
  },
  {
    id: 'char-sir-manphat',
    characterName: 'Sir Manphat (The Quantum Poet)',
    archetypeRole: 'Central Westside Street Rhapsodist & Quantum Physics Subverter',
    iconicQuote: 'Fark-up, and move away — you can\'t park here. My funny mates are going to laugh bro. So fark-up, not park-up. Countdown then blow it up... Q-bituary on central WESTSIDE.',
    referenceImageUrl: sirManphatImg,
    visualAnatomy: {
      build: 'Charismatic, lean West Auckland silhouette in relaxed oversized streetwear, natural rhythm in hand gestures.',
      facialFeatures: 'Sharp observant gaze, subtle knowing smirk, eyebrows arched with poetic authority.',
      posture: 'Leaning casually against the bonnet of a slammed Japanese sedan under buzzing sodium vapor lights.'
    },
    costumeBreakdown: {
      headwear: 'Pulled-up dark zip hoodie hood or backward flat-brim cap.',
      upperBody: 'Heavy black zip-up hoodie over oversized vintage band/graphic tee.',
      lowerBody: 'Dark relaxed-fit cargo pants with deep notebook pockets.',
      footwear: 'Classic low-top street sneakers with scuffed white soles from asphalt pacing.'
    },
    iconicProps: [
      'Dog-eared high-school physics notebook scribbled with quantum wave equations and rhyme schemes',
      'Glowing green holographic chalk formulas hovering over asphalt',
      'Keys to a 1993 slammed Nissan Cefiro idling on the kerb'
    ],
    colorPalette: [
      { name: 'Sodium Vapor Amber', hex: '#f59e0b', usage: 'Streetlight halo and night reflections' },
      { name: 'Westside Midnight Ink', hex: '#0f172a', usage: 'Hoodie shadows and asphalt tarmac' },
      { name: 'Quantum Green Phosphor', hex: '#10b981', usage: 'Holographic chalkboard formulas & countdown' },
      { name: 'Asphalt Concrete Gray', hex: '#475569', usage: 'Superette forecourt and car paint' }
    ],
    expressionSheet: [
      { label: 'The Park-Up Challenge', description: 'Deadpan hand wave commanding cars to move along before the punchline.' },
      { label: 'Quantum Countdown Focus', description: 'Ticking off numbers on fingers while equations glow.' },
      { label: 'Classroom Physics Smirk', description: 'Quiet amusement after delivering a single joke that baffles the teachers.' }
    ],
    comicArtStylePrompt: 'Retro 1980s 1990s comic book character turnaround model sheet of Sir Manphat, charismatic West Auckland New Zealand street poet and quantum physics student in oversized black zip hoodie leaning against a vintage Japanese sedan under glowing amber sodium streetlights, holding a chalk scribbled physics notebook, bold comic book ink lines, halftone screen dots, authentic street style turnaround illustration'
  }
];

/**
 * Searches and finds a matching canonical character visual concept by name
 */
export function findMatchingCharacterRef(name: string): CharacterVisualConcept | undefined {
  if (!name) return undefined;
  const clean = name.toLowerCase();
  
  if (clean.includes('baldwin') || clean.includes('police') || clean.includes('officer') || clean.includes('cop')) {
    return CANONICAL_CHARACTER_VISUAL_REFS.find(c => c.id === 'char-baldwin');
  }
  if (clean.includes('vlad') || clean.includes('vampire') || clean.includes('shadows')) {
    return CANONICAL_CHARACTER_VISUAL_REFS.find(c => c.id === 'char-vladislav');
  }
  if (clean.includes('dagg') || clean.includes('fred') || clean.includes('farmer') || clean.includes('trev')) {
    return CANONICAL_CHARACTER_VISUAL_REFS.find(c => c.id === 'char-fred-dagg');
  }
  if (clean.includes('billy') || clean.includes('james') || clean.includes('tea-towel')) {
    return CANONICAL_CHARACTER_VISUAL_REFS.find(c => c.id === 'char-billy-t');
  }
  if (clean.includes('manphat') || clean.includes('westside') || clean.includes('poet') || clean.includes('quantum')) {
    return CANONICAL_CHARACTER_VISUAL_REFS.find(c => c.id === 'char-sir-manphat');
  }
  
  return undefined;
}
