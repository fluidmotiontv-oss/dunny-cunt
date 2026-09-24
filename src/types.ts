export type NZCategory = 'Classic TV/Film' | 'Modern TV/Satire' | 'Radio/Viral/Niche' | 'Stand-up & Ads';

export type KiwiTheme = 
  | 'Deadpan Awkwardness'
  | 'Tall Poppy Satire'
  | 'Self-Deprecating Understatement'
  | 'DIY Absurdity & Mayhem'
  | 'Bureaucratic Earnestness'
  | 'Suburban Surrealism';

export interface ArchivalEntry {
  id: string;
  momentTitle: string;
  sourceAndYear: string;
  year: number;
  category: NZCategory;
  keyCharacters: string[];
  iconicQuote: string;
  visualPunchline: string;
  culturalSubtext: string;
  livingComicMechanic: {
    panelState: string;
    audioLayer: string;
    tactileDepth: string;
    crossPanelBleed: string;
  };
  audioPresetKey?: string;
  badgeColor?: string;
}

export interface DialogueLine {
  speaker: string;
  text: string;
  note?: string;
}

export interface LivingCanvasDirective {
  panelState: string;
  audioLayer: string;
  tactileDepth: string;
  crossPanelBleed: string;
}

export interface ComicPanel {
  panelNumber: number;
  layoutSpan?: 'col-span-1' | 'col-span-2' | 'col-span-3' | 'row-span-2';
  title?: string;
  visualDescription: string;
  livingDirective: LivingCanvasDirective;
  dialogue: DialogueLine[];
  sfx: string;
  interactiveTriggerLabel?: string;
  branchOptions?: {
    id: string;
    label: string;
    dialogue: DialogueLine[];
    visualState: string;
  }[];
  activeBranch?: string;
  iconicMomentRefId?: string;
}

export interface ComicPage {
  pageNumber: number;
  pageTitle: string;
  locationHeader: string;
  temporalCoordinate: string;
  panels: ComicPanel[];
  pageNotes: string;
}

export interface FramingLore {
  title: string;
  codename: string;
  originYear: string;
  location: string;
  premise: string;
  centralArtifact: string;
  mainCharacters: {
    name: string;
    role: string;
    description: string;
    icon: string;
  }[];
  multiverseRules: string[];
}

export interface MashUpCharacter {
  name: string;
  actorRef: string;
  voiceTone: string;
  avatarEmoji: string;
  badgeColor: string;
  pitch: number;
  rate: number;
}

export interface MashUpBeat {
  id: string;
  second: number;
  timestamp: string; // e.g. "00:15"
  speaker: string;
  dialogue: string;
  deliveryNote: string;
  sfxCue?: string;
  audioPreset?: string;
  stageAction?: string;
  visualGlitch?: string;
}

export interface MashUpAct {
  actNumber: 1 | 2 | 3;
  actTitle: string;
  timeRange: string; // e.g. "0:00 - 0:45"
  startSecond: number;
  endSecond: number;
  sceneNotes: string;
  beats: MashUpBeat[];
}

export interface ThreeMinMashUp {
  id: string;
  title: string;
  tagline: string;
  roastTheme: string;
  targetCulturalTrope: string;
  characters: MashUpCharacter[];
  location: string;
  totalDurationSeconds: number; // 180
  acts: MashUpAct[];
  pissTakeBreakdown: string;
  comicPanelPreview?: ComicPanel;
  userCreated?: boolean;
}

