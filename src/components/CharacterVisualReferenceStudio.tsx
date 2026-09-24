import React, { useState, useEffect } from 'react';
import { ComicPage, ComicPanel } from '../types';
import { 
  CharacterVisualConcept, 
  CANONICAL_CHARACTER_VISUAL_REFS, 
  findMatchingCharacterRef 
} from '../data/characterVisualRefs';
import { 
  Palette, 
  User, 
  Sparkles, 
  Layers, 
  Copy, 
  Check, 
  Eye, 
  Download, 
  RefreshCw, 
  Shirt, 
  Smile, 
  Wrench, 
  Compass, 
  Camera, 
  Maximize2, 
  X, 
  CheckCircle2, 
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface CharacterVisualReferenceStudioProps {
  currentPage?: ComicPage;
}

const ART_STYLES = [
  { id: '1980s-comic', label: '1980s Kiwi Comic Book (Halftone Dots & Heavy Ink Lines)' },
  { id: 'satirical-strip', label: 'Satirical Newspaper Strip (Screenprint & Punchy Outlines)' },
  { id: 'indie-noir', label: 'Underground Indie Graphic Novel (Atmospheric Noir & High Contrast)' },
  { id: 'animated-storyboard', label: 'Living Canvas Moving Turnaround (Cell-Shaded)' },
];

const LOCAL_STORAGE_SAVED_CONCEPTS_KEY = 'nz_living_comic_character_concepts_v1';

export const CharacterVisualReferenceStudio: React.FC<CharacterVisualReferenceStudioProps> = ({
  currentPage
}) => {
  // Extract unique character names from current page dialogue
  const detectedCharacters = React.useMemo(() => {
    if (!currentPage) return [];
    const names = new Set<string>();
    currentPage.panels.forEach(p => {
      p.dialogue.forEach(d => {
        if (d.speaker && d.speaker.trim()) {
          // Normalize speaker name
          const cleanName = d.speaker.trim();
          names.add(cleanName);
        }
      });
    });
    return Array.from(names);
  }, [currentPage]);

  // Combined scene context from page panels
  const combinedSceneDescription = React.useMemo(() => {
    if (!currentPage) return '';
    return currentPage.panels.map(p => `Panel ${p.panelNumber}: ${p.visualDescription}`).join(' | ');
  }, [currentPage]);

  // Selected or active character state
  const [selectedCharacterName, setSelectedCharacterName] = useState<string>(() => {
    return detectedCharacters[0] || 'Senior Sgt Guy Baldwin';
  });

  const [customCharacterInput, setCustomCharacterInput] = useState<string>('');
  const [selectedArtStyle, setSelectedArtStyle] = useState<string>(ART_STYLES[0].label);
  const [customSceneContext, setCustomSceneContext] = useState<string>('');

  // Loaded & Generated Concepts list
  const [characterConcepts, setCharacterConcepts] = useState<CharacterVisualConcept[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SAVED_CONCEPTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge canonical with saved
          const merged = [...CANONICAL_CHARACTER_VISUAL_REFS];
          parsed.forEach((item: CharacterVisualConcept) => {
            if (!merged.some(m => m.id === item.id)) {
              merged.push(item);
            }
          });
          return merged;
        }
      }
    } catch (e) {
      console.warn('Could not load character concepts from storage', e);
    }
    return CANONICAL_CHARACTER_VISUAL_REFS;
  });

  // Current active concept being inspected
  const [activeConceptId, setActiveConceptId] = useState<string>(CANONICAL_CHARACTER_VISUAL_REFS[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [expandedImageModal, setExpandedImageModal] = useState<string | null>(null);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Sync with detected characters when page changes
  useEffect(() => {
    if (detectedCharacters.length > 0) {
      const firstDetected = detectedCharacters[0];
      setSelectedCharacterName(firstDetected);
      
      // Check if we already have a concept for this character
      const match = characterConcepts.find(c => 
        c.characterName.toLowerCase().includes(firstDetected.toLowerCase()) || 
        firstDetected.toLowerCase().includes(c.characterName.toLowerCase())
      ) || findMatchingCharacterRef(firstDetected);

      if (match) {
        setActiveConceptId(match.id);
      }
    }
  }, [detectedCharacters, characterConcepts]);

  // Auto-save generated concepts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SAVED_CONCEPTS_KEY, JSON.stringify(characterConcepts));
    } catch (e) {
      console.warn('Could not save character concepts to localStorage', e);
    }
  }, [characterConcepts]);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    showToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const activeConcept = characterConcepts.find(c => c.id === activeConceptId) || characterConcepts[0];

  // Handler to generate a new character visual reference concept
  const handleGenerateCharacterConcept = async () => {
    const targetName = customCharacterInput.trim() || selectedCharacterName || 'Kiwi Character';
    setIsGenerating(true);
    setGenerationError(null);

    // Find relevant dialogue snippet from current page
    let relevantDialogue = '';
    if (currentPage) {
      for (const p of currentPage.panels) {
        const dMatch = p.dialogue.find(d => d.speaker.toLowerCase().includes(targetName.toLowerCase()));
        if (dMatch) {
          relevantDialogue = `"${dMatch.text}"`;
          break;
        }
      }
    }

    const sceneDesc = customSceneContext.trim() || combinedSceneDescription || 'A high-contrast comedic scene in a New Zealand living comic script.';

    try {
      const res = await fetch('/api/gemini/generate-character-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterName: targetName,
          sceneContext: sceneDesc,
          visualDescription: sceneDesc,
          dialogueSnippet: relevantDialogue,
          artStyle: selectedArtStyle,
        }),
      });

      const data = await res.json();
      if (data.success && data.concept) {
        const raw = data.concept;
        const newId = `char-gen-${Date.now()}`;
        
        // Match existing image reference if canonical name matches, or fallback
        const matchingCanonical = findMatchingCharacterRef(targetName);
        const refImg = matchingCanonical?.referenceImageUrl;

        const newConcept: CharacterVisualConcept = {
          id: newId,
          characterName: raw.characterName || targetName,
          archetypeRole: raw.archetypeRole || 'Living Comic Book Archetype',
          iconicQuote: raw.iconicQuote || relevantDialogue || 'Safer communities together.',
          referenceImageUrl: refImg,
          visualAnatomy: {
            build: raw.visualAnatomy?.build || 'Stocky provincial build, deadpan posture.',
            facialFeatures: raw.visualAnatomy?.facialFeatures || 'Distinctive comedic expression, intense eye contact.',
            posture: raw.visualAnatomy?.posture || 'Characteristic stance with iconic comedic weight.'
          },
          costumeBreakdown: {
            headwear: raw.costumeBreakdown?.headwear || 'Signature practical headwear.',
            upperBody: raw.costumeBreakdown?.upperBody || 'Layered iconic Kiwi apparel.',
            lowerBody: raw.costumeBreakdown?.lowerBody || 'Practical trousers or shorts.',
            footwear: raw.costumeBreakdown?.footwear || 'Rubber gumboots or sturdy boots.'
          },
          iconicProps: raw.iconicProps || [
            'Digital thermal laser thermometer',
            'No. 8 galvanized fencing wire coil',
            'Printed TradeMe invoice'
          ],
          colorPalette: raw.colorPalette || [
            { name: 'Primary Accent', hex: '#ccff00', usage: 'Main focal clothing' },
            { name: 'Contrast Shadow', hex: '#0f172a', usage: 'Deep ink shadows' },
            { name: 'Highlight Tone', hex: '#f59e0b', usage: 'Warm lighting glint' },
            { name: 'Suburban Neutral', hex: '#475569', usage: 'Background context' }
          ],
          expressionSheet: raw.expressionSheet || [
            { label: 'Deadpan Stare', description: 'Unfazed calm under-reaction to absurdity.' },
            { label: 'Pragmatic Warning', description: 'Instructional parental concern.' },
            { label: 'Iconic Smirk', description: 'Mischievous Aotearoa wit.' }
          ],
          comicArtStylePrompt: raw.comicArtStylePrompt || `Character model sheet turnaround of ${targetName}, 1980s retro comic book art style, bold ink lines, halftone screen dot shading, pristine character concept art.`
        };

        setCharacterConcepts(prev => [newConcept, ...prev]);
        setActiveConceptId(newId);
        showToast(`Created Character Model Sheet for "${newConcept.characterName}"!`);
      } else {
        setGenerationError(data.error || 'Could not generate character visual reference.');
      }
    } catch (err: any) {
      setGenerationError(err.message || 'Network error while generating character concept.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-neutral-900/95 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6 relative">
      
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed bottom-6 left-6 z-50 px-4 py-3 rounded-2xl bg-neutral-900 border border-amber-400 shadow-2xl flex items-center gap-2.5 text-xs font-mono text-amber-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Header & Feature Intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded bg-amber-400 text-neutral-950 font-bold font-['Bangers'] text-xs tracking-wider">
              IMAGE GENERATION & VISUAL CONCEPT STUDIO
            </span>
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px] font-mono border border-neutral-700">
              Character Model Sheets & Turnarounds
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-['Bangers'] text-neutral-100 tracking-wide flex items-center gap-2">
            <Palette className="w-6 h-6 text-amber-400" />
            CHARACTER VISUAL REFERENCE GENERATOR
          </h2>
          <p className="text-xs text-neutral-400 font-sans mt-1 max-w-2xl leading-relaxed">
            Generate authentic comic book character visual references, turnarounds, wardrobe breakdowns, and halftone prompt recipes tailored directly to the scene descriptions in your script.
          </p>
        </div>

        {/* Character Concept Switcher Badges */}
        <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
          {characterConcepts.map(concept => (
            <button
              key={concept.id}
              onClick={() => setActiveConceptId(concept.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeConceptId === concept.id
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{concept.characterName.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Character Generator Controls Box */}
      <div className="bg-neutral-950/80 rounded-2xl p-5 border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            1. EXTRACT & GENERATE FROM CURRENT SCRIPT SCENE
          </span>
          {currentPage && (
            <span className="text-[11px] font-mono text-neutral-400">
              Active Script: <strong className="text-neutral-200">Page {currentPage.pageNumber} ({currentPage.pageTitle})</strong>
            </span>
          )}
        </div>

        {/* Detected Characters Quick Selector */}
        {detectedCharacters.length > 0 && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-neutral-400">
              Detected Speakers on Current Page:
            </label>
            <div className="flex flex-wrap gap-2">
              {detectedCharacters.map(char => (
                <button
                  key={char}
                  type="button"
                  onClick={() => {
                    setSelectedCharacterName(char);
                    setCustomCharacterInput(char);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1 ${
                    selectedCharacterName === char
                      ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-semibold'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                  }`}
                >
                  <span>{char}</span>
                  <ChevronRight className="w-3 h-3 opacity-60" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-mono text-neutral-400 mb-1">
              Target Character Name:
            </label>
            <input
              type="text"
              value={customCharacterInput || selectedCharacterName}
              onChange={(e) => {
                setCustomCharacterInput(e.target.value);
                setSelectedCharacterName(e.target.value);
              }}
              placeholder="e.g. Officer Minogue, Vladislav, Fred Dagg"
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-mono focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-400 mb-1">
              Visual Comic Art Style:
            </label>
            <select
              value={selectedArtStyle}
              onChange={(e) => setSelectedArtStyle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-mono focus:outline-none focus:border-amber-400"
            >
              {ART_STYLES.map(style => (
                <option key={style.id} value={style.label}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerateCharacterConcept}
              disabled={isGenerating || !(customCharacterInput || selectedCharacterName)}
              className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-neutral-950 font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Model Sheet...</span>
                </>
              ) : (
                <>
                  <Camera className="w-3.5 h-3.5" />
                  <span>Generate Visual Reference</span>
                </>
              )}
            </button>
          </div>
        </div>

        {generationError && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 font-mono">
            {generationError}
          </div>
        )}
      </div>

      {/* Active Character Visual Model Sheet Inspector */}
      {activeConcept && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Visual Concept Card & Turnaround Artwork (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
            
            {/* Concept Artwork Image Display */}
            <div className="relative aspect-square bg-neutral-900 overflow-hidden group">
              {activeConcept.referenceImageUrl ? (
                <>
                  <img
                    src={activeConcept.referenceImageUrl}
                    alt={`${activeConcept.characterName} Visual Concept Reference`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                  <button
                    onClick={() => setExpandedImageModal(activeConcept.referenceImageUrl || null)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-neutral-950/80 hover:bg-neutral-900 text-amber-300 border border-neutral-700 shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Expand high-res model sheet"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-neutral-500 space-y-3 bg-gradient-to-b from-neutral-900 to-neutral-950">
                  <Palette className="w-12 h-12 text-amber-400/40 animate-pulse" />
                  <div>
                    <div className="text-sm font-['Bangers'] text-neutral-300 tracking-wide">
                      VISUAL BLUEPRINT READY
                    </div>
                    <div className="text-[11px] font-mono text-neutral-400 mt-1 max-w-xs">
                      Prompt and wardrobe specifications generated below.
                    </div>
                  </div>
                </div>
              )}

              {/* Character Role Tag Floating over Artwork */}
              <div className="absolute bottom-3 left-3 right-3">
                <span className="px-2.5 py-1 rounded-md bg-amber-400 text-neutral-950 text-[10px] font-bold font-['Bangers'] tracking-wide uppercase inline-block mb-1 shadow-md">
                  {activeConcept.archetypeRole}
                </span>
                <h3 className="text-xl sm:text-2xl font-['Bangers'] text-white tracking-wide drop-shadow-md">
                  {activeConcept.characterName}
                </h3>
              </div>
            </div>

            {/* Iconic Dialogue Quote */}
            <div className="p-4 bg-neutral-900/60 border-t border-neutral-800">
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                Iconic Dialogue Delivery Note:
              </div>
              <p className="text-xs font-serif italic text-amber-200/90 leading-relaxed">
                "{activeConcept.iconicQuote}"
              </p>
            </div>

            {/* Color Swatch Palette Bar */}
            <div className="p-4 border-t border-neutral-800 space-y-2 bg-neutral-950">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  Color Palette Swatches:
                </span>
                <span className="text-[10px] text-neutral-400">Click to copy HEX</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {activeConcept.colorPalette.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCopyText(col.hex, `color ${col.name}`)}
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 transition-colors text-left group"
                  >
                    <span 
                      className="w-5 h-5 rounded-md border border-white/20 shrink-0 shadow-sm"
                      style={{ backgroundColor: col.hex }}
                    />
                    <div className="overflow-hidden">
                      <div className="text-[11px] font-mono font-medium text-neutral-200 truncate group-hover:text-amber-300">
                        {col.name}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">
                        {col.hex}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Model Sheet Anatomy, Wardrobe, Expressions & Generation Recipe (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Visual Anatomy & Posture Card */}
            <div className="bg-neutral-950 rounded-2xl p-5 border border-neutral-800 space-y-3">
              <h4 className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-400" />
                Visual Anatomy & Body Language
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800">
                  <span className="text-[10px] font-mono text-neutral-400 block mb-1">PROVINCIAL BUILD:</span>
                  <span className="text-neutral-200 font-sans leading-relaxed">{activeConcept.visualAnatomy.build}</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800">
                  <span className="text-[10px] font-mono text-neutral-400 block mb-1">FACIAL ANATOMY:</span>
                  <span className="text-neutral-200 font-sans leading-relaxed">{activeConcept.visualAnatomy.facialFeatures}</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800">
                  <span className="text-[10px] font-mono text-neutral-400 block mb-1">DEADPAN POSTURE:</span>
                  <span className="text-neutral-200 font-sans leading-relaxed">{activeConcept.visualAnatomy.posture}</span>
                </div>
              </div>
            </div>

            {/* Costume & Wardrobe Breakdown */}
            <div className="bg-neutral-950 rounded-2xl p-5 border border-neutral-800 space-y-3">
              <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Shirt className="w-4 h-4 text-cyan-400" />
                Costume & Wardrobe Specifications
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                  <span className="text-[10px] font-mono text-neutral-400 block mb-0.5">HEADWEAR:</span>
                  <span className="text-neutral-300 text-[11px] font-sans">{activeConcept.costumeBreakdown.headwear}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                  <span className="text-[10px] font-mono text-neutral-400 block mb-0.5">UPPER BODY:</span>
                  <span className="text-neutral-300 text-[11px] font-sans">{activeConcept.costumeBreakdown.upperBody}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                  <span className="text-[10px] font-mono text-neutral-400 block mb-0.5">LOWER BODY:</span>
                  <span className="text-neutral-300 text-[11px] font-sans">{activeConcept.costumeBreakdown.lowerBody}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                  <span className="text-[10px] font-mono text-neutral-400 block mb-0.5">FOOTWEAR:</span>
                  <span className="text-neutral-300 text-[11px] font-sans">{activeConcept.costumeBreakdown.footwear}</span>
                </div>
              </div>
            </div>

            {/* Iconic Props & Artifacts */}
            <div className="bg-neutral-950 rounded-2xl p-5 border border-neutral-800 space-y-3">
              <h4 className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-emerald-400" />
                Signature Iconic Props & Tactile Artifacts
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {activeConcept.iconicProps.map((prop, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-start gap-2 text-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] flex items-center justify-center shrink-0 font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-neutral-200 font-sans leading-relaxed">{prop}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expression Model Sheet */}
            <div className="bg-neutral-950 rounded-2xl p-5 border border-neutral-800 space-y-3">
              <h4 className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-amber-400" />
                Expression & Delivery Model Sheet
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {activeConcept.expressionSheet.map((exp, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-1">
                    <div className="text-[11px] font-mono font-bold text-amber-300">
                      • {exp.label}
                    </div>
                    <p className="text-[11px] text-neutral-300 font-sans leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Generation Prompt Recipe Card */}
            <div className="bg-neutral-950 rounded-2xl p-5 border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-cyan-400" />
                  Image Generation Prompt Recipe (1980s Comic Halftone)
                </h4>
                <button
                  onClick={() => handleCopyText(activeConcept.comicArtStylePrompt, 'Image Generation Prompt')}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-cyan-300 text-xs font-mono flex items-center gap-1 transition-colors border border-cyan-500/20"
                >
                  {copiedField === 'Image Generation Prompt' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                  <span>{copiedField === 'Image Generation Prompt' ? 'Copied' : 'Copy Prompt'}</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 leading-relaxed">
                {activeConcept.comicArtStylePrompt}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Expanded Image Modal */}
      {expandedImageModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setExpandedImageModal(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-neutral-900 rounded-3xl p-4 border border-amber-400/40 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  HIGH-RES CHARACTER MODEL SHEET REFERENCE
                </span>
                <h3 className="text-lg font-['Bangers'] text-white">
                  {activeConcept?.characterName}
                </h3>
              </div>
              <button
                onClick={() => setExpandedImageModal(null)}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-square rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={expandedImageModal}
                alt="High Resolution Character Model Sheet"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>Aspect Ratio: 1:1 • Vintage 1980s Halftone Ink Model Sheet</span>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = expandedImageModal;
                  link.download = `${activeConcept?.characterName.toLowerCase().replace(/\s+/g, '_')}_ref.jpg`;
                  link.click();
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Artwork</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
