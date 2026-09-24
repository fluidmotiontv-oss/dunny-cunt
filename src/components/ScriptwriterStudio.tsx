import React, { useState, useEffect, useRef } from 'react';
import { COMIC_PAGES } from '../data/comicScripts';
import { ComicPage, ComicPanel, ArchivalEntry, LivingCanvasDirective } from '../types';
import { AudioAtmosphereMixer } from './AudioAtmosphereMixer';
import { KiwiSlangAnalyzer } from './KiwiSlangAnalyzer';
import { CharacterVisualReferenceStudio } from './CharacterVisualReferenceStudio';
import { KiwiNarrationVoiceStudio } from './KiwiNarrationVoiceStudio';
import { 
  loadScriptwriterProgress, 
  saveScriptwriterProgress, 
  clearScriptwriterProgress,
  formatRelativeSavedTime 
} from '../utils/scriptwriterStorage';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Tv, 
  Layers, 
  Radio, 
  Send, 
  RefreshCw,
  PlusCircle,
  BookOpen,
  Save,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Edit3,
  Trash2,
  Plus,
  Sliders,
  Eye,
  FileCode,
  UploadCloud,
  History,
  X
} from 'lucide-react';

interface ScriptwriterStudioProps {
  initialMoment?: ArchivalEntry | null;
  onViewInLivingReader: () => void;
}

export const ScriptwriterStudio: React.FC<ScriptwriterStudioProps> = ({
  initialMoment,
  onViewInLivingReader,
}) => {
  // Load saved state from Local Storage (if any exists)
  const initialSavedState = useRef(loadScriptwriterProgress()).current;

  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(() => {
    if (initialSavedState && typeof initialSavedState.selectedPageIndex === 'number') {
      return initialSavedState.selectedPageIndex;
    }
    return 0;
  });

  const [copied, setCopied] = useState(false);
  const [showDirectivesOnly, setShowDirectivesOnly] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [focusedPanelNumber, setFocusedPanelNumber] = useState<number | null>(null);

  // AI Generator Form State
  const [customPrompt, setCustomPrompt] = useState<string>(() => {
    if (initialMoment) {
      return `${initialMoment.momentTitle} - ${initialMoment.iconicQuote}`;
    }
    if (initialSavedState?.customPrompt) {
      return initialSavedState.customPrompt;
    }
    return '';
  });

  const [customStyle, setCustomStyle] = useState<string>(() => {
    return initialSavedState?.customStyle || 'Classic Kiwi Deadpan & DIY Chaos';
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPages, setGeneratedPages] = useState<ComicPage[]>(() => {
    return initialSavedState?.generatedPages || [];
  });
  const [pageOverrides, setPageOverrides] = useState<Record<number, ComicPage>>(() => {
    return initialSavedState?.pageOverrides || {};
  });
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Auto-Save Status tracking
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'restored'>('saved');
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState<number>(() => {
    return initialSavedState?.savedAt || Date.now();
  });
  const [showRestoredNotice, setShowRestoredNotice] = useState<boolean>(() => {
    return !!initialSavedState;
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Combine default COMIC_PAGES with generatedPages and apply any pageOverrides
  const basePages = [...COMIC_PAGES, ...generatedPages];
  const allPages: ComicPage[] = basePages.map((page) => {
    if (pageOverrides[page.pageNumber]) {
      return pageOverrides[page.pageNumber];
    }
    return page;
  });

  const safePageIndex = Math.min(Math.max(0, selectedPageIndex), Math.max(0, allPages.length - 1));
  const currentPage = allPages[safePageIndex] || COMIC_PAGES[0];

  // Auto-save effect with debounce
  useEffect(() => {
    setSaveStatus('saving');
    const timer = setTimeout(() => {
      saveScriptwriterProgress({
        selectedPageIndex: safePageIndex,
        customPrompt,
        customStyle,
        generatedPages,
        pageOverrides,
      });
      setSaveStatus('saved');
      setLastSavedTimestamp(Date.now());
    }, 600);

    return () => clearTimeout(timer);
  }, [safePageIndex, customPrompt, customStyle, generatedPages, pageOverrides]);

  // Handle incoming initialMoment prop changes from Vault
  useEffect(() => {
    if (initialMoment) {
      setCustomPrompt(`${initialMoment.momentTitle} - ${initialMoment.iconicQuote}`);
    }
  }, [initialMoment]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleManualSave = () => {
    saveScriptwriterProgress({
      selectedPageIndex: safePageIndex,
      customPrompt,
      customStyle,
      generatedPages,
      pageOverrides,
    });
    setSaveStatus('saved');
    setLastSavedTimestamp(Date.now());
    showToast('Saved script draft to Local Storage!');
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all script modifications and clear local storage draft? This will revert scripts to default.')) {
      clearScriptwriterProgress();
      setGeneratedPages([]);
      setPageOverrides({});
      setCustomPrompt('');
      setSelectedPageIndex(0);
      setSaveStatus('saved');
      setLastSavedTimestamp(Date.now());
      setShowRestoredNotice(false);
      showToast('Reset scripts to default archive templates.');
    }
  };

  const handleGenerateScript = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const res = await fetch('/api/gemini/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt,
          momentTitle: customPrompt,
          style: customStyle,
        }),
      });

      const data = await res.json();
      if (data.success && data.pageScript) {
        const raw = data.pageScript;
        const newPageNumber = allPages.length + 1;
        const newPage: ComicPage = {
          pageNumber: newPageNumber,
          pageTitle: raw.pageTitle || `PAGE ${newPageNumber}: ${customPrompt.toUpperCase()}`,
          locationHeader: 'LOCATION: AVALON ARCHIVE / GENERATED CONTINUUM',
          temporalCoordinate: 'TEMPORAL COORDINATE: REAL-TIME BROADCAST FLUX',
          pageNotes: raw.culturalSubtext || 'Generated by Gemini 3.7 Flash Archivist Engine with Living Canvas Architecture.',
          panels: (raw.panels || []).map((p: any, idx: number) => ({
            panelNumber: p.panelNumber || idx + 1,
            title: `PANEL ${p.panelNumber || idx + 1}`,
            visualDescription: p.visualDescription || '',
            livingDirective: {
              panelState: p.livingDirective?.includes('[Panel State:')
                ? p.livingDirective.split('[Audio Layer:')[0]
                : p.livingDirective || '[Panel State: Continuous Loop (4s)]',
              audioLayer: p.livingDirective?.includes('[Audio Layer:')
                ? p.livingDirective.split('[Audio Layer:')[1]?.split('[Tactile Depth:')[0] || ''
                : '[Audio Layer: Ambient CRT hum & room room noise]',
              tactileDepth: p.livingDirective?.includes('[Tactile Depth:')
                ? p.livingDirective.split('[Tactile Depth:')[1]?.split('[Cross-Panel Bleed:')[0] || ''
                : '[Tactile Depth: Parallax tilt with slight lens distortion]',
              crossPanelBleed: p.livingDirective?.includes('[Cross-Panel Bleed:')
                ? p.livingDirective.split('[Cross-Panel Bleed:')[1] || ''
                : '[Cross-Panel Bleed: None]'
            },
            dialogue: p.dialogue || [],
            sfx: p.sfx || 'SFX: *BZZZZT*'
          }))
        };

        setGeneratedPages((prev) => [...prev, newPage]);
        setSelectedPageIndex(allPages.length);
        setCustomPrompt('');
        showToast(`Generated & Auto-saved Page ${newPageNumber}!`);
      } else {
        setGenerationError(data.error || 'Failed to generate script page.');
      }
    } catch (err: any) {
      setGenerationError(err.message || 'Network error during script generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddNewBlankPage = () => {
    const newPageNumber = allPages.length + 1;
    const blankPage: ComicPage = {
      pageNumber: newPageNumber,
      pageTitle: `PAGE ${newPageNumber}: CUSTOM LIVING SCENE`,
      locationHeader: 'LOCATION: AVALON ARCHIVE / STAGE 4',
      temporalCoordinate: 'TEMPORAL COORDINATE: 1989 BROADCAST CONTINUUM',
      pageNotes: 'User-authored comic script created in Scriptwriter Studio.',
      panels: [
        {
          panelNumber: 1,
          title: 'PANEL 1',
          visualDescription: 'Wide cinematic establishing shot of a quiet provincial service station at 2:45 AM.',
          livingDirective: {
            panelState: '[Panel State: Loop (3s), pulse on click]',
            audioLayer: '[Audio Layer: Fluorescent light hum + distant rain on corrugated iron]',
            tactileDepth: '[Tactile Depth: Foreground asphalt depth displacement]',
            crossPanelBleed: '[Cross-Panel Bleed: Steam drift bleeds into Panel 2]'
          },
          dialogue: [
            { speaker: 'CHARACTER 1', text: 'Yeah nah, check out the pie warmer.' },
            { speaker: 'CHARACTER 2', text: 'Mate, you must always blow on the pie.' }
          ],
          sfx: 'SFX: *HUMMMMMM*'
        }
      ]
    };

    setGeneratedPages((prev) => [...prev, blankPage]);
    setSelectedPageIndex(allPages.length);
    setIsEditMode(true);
    showToast(`Added custom blank Page ${newPageNumber} (Auto-saved)`);
  };

  const handleDeleteGeneratedPage = (pageIdxToDelete: number) => {
    if (pageIdxToDelete < COMIC_PAGES.length) {
      alert('Default canonical archive pages cannot be deleted. You can edit their text or reset.');
      return;
    }
    const generatedIdx = pageIdxToDelete - COMIC_PAGES.length;
    if (window.confirm('Delete this generated script page?')) {
      const pageToDelete = generatedPages[generatedIdx];
      setGeneratedPages((prev) => prev.filter((_, i) => i !== generatedIdx));
      
      // Clean up override if any
      if (pageToDelete) {
        setPageOverrides((prev) => {
          const next = { ...prev };
          delete next[pageToDelete.pageNumber];
          return next;
        });
      }

      setSelectedPageIndex((prev) => Math.max(0, prev - 1));
      showToast('Page deleted and draft auto-saved.');
    }
  };

  // Mutate current active page
  const updateCurrentPage = (updater: (prev: ComicPage) => ComicPage) => {
    const updated = updater(currentPage);
    setPageOverrides((prev) => ({
      ...prev,
      [currentPage.pageNumber]: updated
    }));
  };

  // Direct edit handlers for current page
  const handleUpdatePageField = (field: keyof ComicPage, value: any) => {
    updateCurrentPage((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdatePanelField = (panelIndex: number, field: keyof ComicPanel, value: any) => {
    updateCurrentPage((prev) => {
      const newPanels = [...prev.panels];
      newPanels[panelIndex] = {
        ...newPanels[panelIndex],
        [field]: value
      };
      return { ...prev, panels: newPanels };
    });
  };

  const handleUpdateLivingDirective = (panelIndex: number, key: keyof LivingCanvasDirective, value: string) => {
    updateCurrentPage((prev) => {
      const newPanels = [...prev.panels];
      newPanels[panelIndex] = {
        ...newPanels[panelIndex],
        livingDirective: {
          ...newPanels[panelIndex].livingDirective,
          [key]: value
        }
      };
      return { ...prev, panels: newPanels };
    });
  };

  const handleUpdateDialogueLine = (panelIndex: number, lineIndex: number, field: 'speaker' | 'text', value: string) => {
    updateCurrentPage((prev) => {
      const newPanels = [...prev.panels];
      const newDialogue = [...newPanels[panelIndex].dialogue];
      newDialogue[lineIndex] = {
        ...newDialogue[lineIndex],
        [field]: value
      };
      newPanels[panelIndex] = {
        ...newPanels[panelIndex],
        dialogue: newDialogue
      };
      return { ...prev, panels: newPanels };
    });
  };

  const handleAddDialogueLine = (panelIndex: number) => {
    updateCurrentPage((prev) => {
      const newPanels = [...prev.panels];
      const newDialogue = [
        ...newPanels[panelIndex].dialogue,
        { speaker: 'SPEAKER', text: 'New dialogue line...' }
      ];
      newPanels[panelIndex] = {
        ...newPanels[panelIndex],
        dialogue: newDialogue
      };
      return { ...prev, panels: newPanels };
    });
  };

  const handleRemoveDialogueLine = (panelIndex: number, lineIndex: number) => {
    updateCurrentPage((prev) => {
      const newPanels = [...prev.panels];
      const newDialogue = newPanels[panelIndex].dialogue.filter((_, idx) => idx !== lineIndex);
      newPanels[panelIndex] = {
        ...newPanels[panelIndex],
        dialogue: newDialogue
      };
      return { ...prev, panels: newPanels };
    });
  };

  const handleAddPanel = () => {
    updateCurrentPage((prev) => {
      const nextNum = prev.panels.length + 1;
      const newPanel: ComicPanel = {
        panelNumber: nextNum,
        title: `PANEL ${nextNum}`,
        visualDescription: 'Describe the visual composition, framing, and action here...',
        livingDirective: {
          panelState: '[Panel State: Continuous Loop (3s)]',
          audioLayer: '[Audio Layer: Subtle room ambience]',
          tactileDepth: '[Tactile Depth: Dynamic focus layer]',
          crossPanelBleed: '[Cross-Panel Bleed: None]'
        },
        dialogue: [
          { speaker: 'CHARACTER', text: 'Yeah nah, sweet as.' }
        ],
        sfx: 'SFX: *CRACKLE*'
      };
      return {
        ...prev,
        panels: [...prev.panels, newPanel]
      };
    });
    showToast('Added new panel to active page.');
  };

  const handleDeletePanel = (panelIndex: number) => {
    if (currentPage.panels.length <= 1) {
      alert('A comic page must contain at least one panel.');
      return;
    }
    updateCurrentPage((prev) => {
      const filtered = prev.panels.filter((_, idx) => idx !== panelIndex);
      // Renumber panels
      const renumbered = filtered.map((p, idx) => ({
        ...p,
        panelNumber: idx + 1,
        title: `PANEL ${idx + 1}`
      }));
      return {
        ...prev,
        panels: renumbered
      };
    });
    showToast('Panel removed and page renumbered.');
  };

  // Injected phrase from KiwiSlangAnalyzer into active page
  const handleInjectSlangToCurrentPage = (injectedText: string) => {
    updateCurrentPage((prev) => {
      const newPanels = [...prev.panels];
      if (newPanels.length > 0) {
        const lastPanel = newPanels[newPanels.length - 1];
        const newDialogue = [
          ...lastPanel.dialogue,
          { speaker: 'KIWI DOCTOR', text: injectedText }
        ];
        newPanels[newPanels.length - 1] = {
          ...lastPanel,
          dialogue: newDialogue
        };
      }
      return { ...prev, panels: newPanels };
    });
    showToast(`Injected archival dialogue: "${injectedText}" (Auto-saved)`);
  };

  const generateMarkdownScript = (): string => {
    let md = `# NZ COMEDY LIVING COMIC BOOK SCRIPT\n`;
    md += `## ARCHIVAL CONTINUUM: PROJECT MICROFICHE-89\n`;
    md += `*Auto-saved local version • Exported on ${new Date().toLocaleString()}*\n\n`;

    allPages.forEach((page) => {
      md += `---\n\n`;
      md += `### PAGE ${page.pageNumber}\n`;
      md += `**Title:** ${page.pageTitle}\n`;
      md += `**Location:** ${page.locationHeader}\n`;
      md += `**Temporal Sync:** ${page.temporalCoordinate}\n`;
      md += `**Notes:** ${page.pageNotes}\n\n`;

      page.panels.forEach((p) => {
        md += `#### PANEL ${p.panelNumber}\n`;
        md += `* **Visual Description:** ${p.visualDescription}\n`;
        md += `* **Living Canvas Directive:**\n`;
        md += `  * ${p.livingDirective.panelState}\n`;
        md += `  * ${p.livingDirective.audioLayer}\n`;
        md += `  * ${p.livingDirective.tactileDepth}\n`;
        md += `  * ${p.livingDirective.crossPanelBleed}\n`;
        md += `* **Dialogue & Audio:**\n`;
        p.dialogue.forEach((d) => {
          md += `  * **${d.speaker}:** "${d.text}"\n`;
        });
        md += `  * **${p.sfx}**\n\n`;
      });
    });

    return md;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownScript());
    setCopied(true);
    showToast('Copied full script markdown to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadScript = () => {
    const text = generateMarkdownScript();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nz-comedy-living-comic-script-p${currentPage.pageNumber}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded script .MD file.');
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-neutral-900 border border-amber-400/50 shadow-2xl flex items-center gap-2.5 text-xs font-mono text-amber-300 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Auto-Save Restored Notice Banner */}
      {showRestoredNotice && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-between gap-3 text-xs font-mono text-amber-200 shadow-lg">
          <div className="flex items-center gap-2.5">
            <History className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-amber-300">Auto-Save Active:</span> Restored your saved script session from local storage ({formatRelativeSavedTime(lastSavedTimestamp)}). Edits auto-save continuously.
            </div>
          </div>
          <button 
            onClick={() => setShowRestoredNotice(false)}
            className="p-1 rounded-lg hover:bg-amber-900/50 text-amber-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Banner & Header */}
      <div className="bg-neutral-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded bg-amber-400 text-neutral-950 font-bold font-['Bangers'] text-sm tracking-wide">
              PHASE 2 SCRIPTWRITER STUDIO
            </span>
            
            {/* Auto-Save Status Live Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-700 text-[11px] font-mono">
              {saveStatus === 'saving' ? (
                <>
                  <RefreshCw className="w-3 h-3 text-amber-400 animate-spin" />
                  <span className="text-amber-300 font-semibold">Saving draft...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-neutral-300">
                    Auto-saved <span className="text-neutral-400">({formatRelativeSavedTime(lastSavedTimestamp)})</span>
                  </span>
                </>
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-['Bangers'] text-amber-400 tracking-wide">
            LIVING COMIC SCRIPTWRITER STUDIO
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-2 max-w-2xl leading-relaxed">
            Professional comic book scripts with Living Canvas Directives, instant Local Storage auto-saving, and real-time archival phrase injection.
          </p>
        </div>

        {/* Global Script Actions */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleManualSave}
            title="Save draft immediately to local storage"
            className="px-3.5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-400/30 text-xs font-mono flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-mono flex items-center gap-2 transition-colors shadow-md"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
            <span>{copied ? 'Copied' : 'Copy MD'}</span>
          </button>

          <button
            onClick={handleDownloadScript}
            className="px-3.5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-mono flex items-center gap-2 transition-colors shadow-md"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download .MD</span>
          </button>

          <button
            onClick={handleResetToDefaults}
            title="Reset to factory templates"
            className="p-2.5 rounded-xl bg-neutral-800 hover:bg-rose-950/80 text-neutral-400 hover:text-rose-400 border border-neutral-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onViewInLivingReader}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold font-mono text-xs flex items-center gap-1.5 shadow-lg shadow-amber-400/20"
          >
            <BookOpen className="w-4 h-4" />
            <span>View Reader</span>
          </button>
        </div>
      </div>

      {/* NZ Audio Atmosphere Mixer */}
      <AudioAtmosphereMixer currentPage={currentPage} />

      {/* Kiwi Slang Text Analyzer & Archival Phrasing Doctor */}
      <KiwiSlangAnalyzer 
        currentPage={currentPage}
        onUpdatePageDialogue={handleInjectSlangToCurrentPage}
      />

      {/* Character Visual Reference & Model Sheet Studio */}
      <CharacterVisualReferenceStudio 
        currentPage={currentPage}
      />

      {/* Web Speech API Living Script Narration Voice Studio */}
      <KiwiNarrationVoiceStudio 
        currentPage={currentPage}
        highlightedPanelIndex={focusedPanelNumber ? focusedPanelNumber - 1 : null}
        onPanelFocus={(panelNum) => setFocusedPanelNumber(panelNum)}
      />

      {/* AI Living Script Generator Form */}
      <div className="bg-neutral-900/70 rounded-3xl p-6 border border-cyan-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="font-['Bangers'] text-xl text-neutral-100 tracking-wide">
              GENERATE NEW LIVING COMIC SCRIPT PAGE
            </h2>
          </div>
          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
            Gemini 3.7 Flash Engine
          </span>
        </div>

        <form onSubmit={handleGenerateScript} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-neutral-400 mb-1.5 font-medium">
                Kiwi Comedy Moment, Sketch or Wild Multi-Dimensional Crossover:
              </label>
              <input
                type="text"
                placeholder="e.g. Lynn of Tawa meets Flight of the Conchords at a Dannevirke dairy"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-cyan-400 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1.5 font-medium">
                Comedic Tone & Directive Style:
              </label>
              <select
                value={customStyle}
                onChange={(e) => setCustomStyle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm focus:outline-none focus:border-cyan-400 font-sans"
              >
                <option value="Classic Kiwi Deadpan & DIY Chaos">Classic Kiwi Deadpan & DIY Chaos</option>
                <option value="Supernatural Police Procedural / Wellington Paranormal">Supernatural Police Procedural</option>
                <option value="Absurdist Taskmaster NZ Physical Mayhem">Absurdist Taskmaster NZ Mayhem</option>
                <option value="Suburban Satire & Gossip / Lynn of Tawa">Suburban Satire & Gossip</option>
                <option value="Rural No. 8 Wire Farm Philosophy / Fred Dagg">Rural No. 8 Wire Philosophy</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-neutral-400 font-mono">
              Generates fully compliant PAGE [X], PANEL [Y] script with auto-save persistence.
            </p>

            <button
              type="submit"
              disabled={isGenerating || !customPrompt.trim()}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all ${
                isGenerating
                  ? 'bg-neutral-800 text-neutral-500 cursor-wait'
                  : 'bg-cyan-400 hover:bg-cyan-300 text-neutral-950 shadow-lg shadow-cyan-400/20'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scripting Living Panels...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Script Page</span>
                </>
              )}
            </button>
          </div>
        </form>

        {generationError && (
          <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-mono">
            {generationError}
          </div>
        )}
      </div>

      {/* Page Tabs Switcher & Editor Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-neutral-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-thin">
          {allPages.map((page, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPageIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                safePageIndex === idx
                  ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
              }`}
            >
              <span>PAGE {page.pageNumber}</span>
              {pageOverrides[page.pageNumber] && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" title="Custom edits saved" />
              )}
              {idx >= COMIC_PAGES.length && (
                <span className="text-[10px] text-cyan-800 font-sans">(Custom)</span>
              )}
            </button>
          ))}

          {/* Add Blank Script Page */}
          <button
            onClick={handleAddNewBlankPage}
            title="Create a new custom blank script page"
            className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-dashed border-amber-400/50 text-xs font-mono flex items-center gap-1 whitespace-nowrap transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Page</span>
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Edit Script Mode Toggle */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              isEditMode
                ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditMode ? 'Editing Mode Active' : 'Edit Script Text'}</span>
          </button>

          {/* Directives Filter Toggle */}
          <button
            onClick={() => setShowDirectivesOnly(!showDirectivesOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors shrink-0 ${
              showDirectivesOnly
                ? 'bg-purple-950 text-purple-300 border border-purple-800'
                : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200'
            }`}
          >
            {showDirectivesOnly ? 'Directives Only' : 'Full Script'}
          </button>

          {/* Delete Page button if user-generated */}
          {safePageIndex >= COMIC_PAGES.length && (
            <button
              onClick={() => handleDeleteGeneratedPage(safePageIndex)}
              title="Delete this custom script page"
              className="p-2 rounded-xl bg-neutral-900 hover:bg-rose-950 text-neutral-400 hover:text-rose-400 border border-neutral-800 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Professional Comic Script Document Layout */}
      <div className="bg-neutral-950 rounded-3xl p-6 sm:p-10 border-2 border-neutral-800 shadow-2xl font-mono text-neutral-200 space-y-8 relative">
        
        {/* Document Page Header */}
        <div className="pb-6 border-b-2 border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-amber-400 font-bold text-lg sm:text-xl tracking-wider">
              PAGE {currentPage.pageNumber}
            </div>
            {isEditMode && (
              <span className="text-[11px] font-mono text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-400/40">
                ✏️ Live Auto-Saving Active
              </span>
            )}
          </div>

          {isEditMode ? (
            <div className="space-y-3 pt-1">
              <div>
                <label className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">Page Title:</label>
                <input
                  type="text"
                  value={currentPage.pageTitle}
                  onChange={(e) => handleUpdatePageField('pageTitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-100 text-sm font-bold focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-cyan-400 uppercase tracking-widest block mb-1">Location Header:</label>
                  <input
                    type="text"
                    value={currentPage.locationHeader}
                    onChange={(e) => handleUpdatePageField('locationHeader', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-cyan-300 text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-purple-400 uppercase tracking-widest block mb-1">Temporal Sync:</label>
                  <input
                    type="text"
                    value={currentPage.temporalCoordinate}
                    onChange={(e) => handleUpdatePageField('temporalCoordinate', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-purple-300 text-xs focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">Page Notes & Cultural Subtext:</label>
                <textarea
                  rows={2}
                  value={currentPage.pageNotes}
                  onChange={(e) => handleUpdatePageField('pageNotes', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-sans focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="text-sm sm:text-base font-bold text-neutral-100">
                {currentPage.pageTitle}
              </div>
              <div className="text-xs text-cyan-400">
                {currentPage.locationHeader}
              </div>
              <div className="text-xs text-purple-400">
                {currentPage.temporalCoordinate}
              </div>
              <div className="text-xs text-neutral-400 font-sans italic pt-1">
                <strong>Page Notes:</strong> {currentPage.pageNotes}
              </div>
            </>
          )}
        </div>

        {/* Panel Blocks */}
        <div className="space-y-8">
          {currentPage.panels.map((panel, panelIdx) => {
            const isPanelFocused = focusedPanelNumber === panel.panelNumber;

            return (
              <div 
                key={panel.panelNumber} 
                className={`p-5 sm:p-6 rounded-2xl space-y-4 shadow-md transition-all duration-300 ${
                  isPanelFocused
                    ? 'bg-neutral-900/90 border-2 border-cyan-400 shadow-cyan-500/10 ring-1 ring-cyan-400/50'
                    : 'bg-neutral-900/70 border border-neutral-800'
                }`}
              >
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-['Bangers'] text-amber-400 text-lg tracking-wide flex items-center gap-2">
                      PANEL {panel.panelNumber}
                      {isEditMode && (
                        <span className="text-xs font-mono text-neutral-400 font-normal">
                          (Editable)
                        </span>
                      )}
                    </span>
                    {isPanelFocused && (
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-800 animate-pulse">
                        ▶ Active Speech Focus
                      </span>
                    )}
                  </div>
                
                <div className="flex items-center gap-2">
                  {panel.iconicMomentRefId && (
                    <span className="text-[11px] text-neutral-500 font-mono">
                      Ref: {panel.iconicMomentRefId}
                    </span>
                  )}
                  {isEditMode && currentPage.panels.length > 1 && (
                    <button
                      onClick={() => handleDeletePanel(panelIdx)}
                      title="Delete this panel"
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Visual Description */}
              {!showDirectivesOnly && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                    Visual Description:
                  </span>
                  {isEditMode ? (
                    <textarea
                      rows={3}
                      value={panel.visualDescription}
                      onChange={(e) => handleUpdatePanelField(panelIdx, 'visualDescription', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs sm:text-sm font-sans focus:border-amber-400 focus:outline-none"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed pl-3 border-l-2 border-amber-400/50">
                      {panel.visualDescription}
                    </p>
                  )}
                </div>
              )}

              {/* Living Canvas Directives */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-cyan-500/30 space-y-2 text-xs">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Living Canvas Directives:
                </span>
                
                {isEditMode ? (
                  <div className="space-y-2 pt-1">
                    <div>
                      <label className="text-[10px] text-amber-300 font-bold block mb-0.5">Panel State:</label>
                      <input
                        type="text"
                        value={panel.livingDirective.panelState}
                        onChange={(e) => handleUpdateLivingDirective(panelIdx, 'panelState', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-purple-300 font-bold block mb-0.5">Audio Layer:</label>
                      <input
                        type="text"
                        value={panel.livingDirective.audioLayer}
                        onChange={(e) => handleUpdateLivingDirective(panelIdx, 'audioLayer', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-emerald-300 font-bold block mb-0.5">Tactile Depth:</label>
                      <input
                        type="text"
                        value={panel.livingDirective.tactileDepth}
                        onChange={(e) => handleUpdateLivingDirective(panelIdx, 'tactileDepth', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-rose-300 font-bold block mb-0.5">Cross-Panel Bleed:</label>
                      <input
                        type="text"
                        value={panel.livingDirective.crossPanelBleed}
                        onChange={(e) => handleUpdateLivingDirective(panelIdx, 'crossPanelBleed', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs focus:border-rose-400 focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5 pl-3 border-l-2 border-cyan-500/40 text-[11px] sm:text-xs">
                    <div>
                      <strong className="text-amber-300">Panel State:</strong>{' '}
                      <span className="text-neutral-300">{panel.livingDirective.panelState}</span>
                    </div>
                    <div>
                      <strong className="text-purple-300">Audio Layer:</strong>{' '}
                      <span className="text-neutral-300">{panel.livingDirective.audioLayer}</span>
                    </div>
                    <div>
                      <strong className="text-emerald-300">Tactile Depth:</strong>{' '}
                      <span className="text-neutral-300">{panel.livingDirective.tactileDepth}</span>
                    </div>
                    <div>
                      <strong className="text-rose-300">Cross-Panel Bleed:</strong>{' '}
                      <span className="text-neutral-300">{panel.livingDirective.crossPanelBleed}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Dialogue & SFX */}
              {!showDirectivesOnly && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                    Dialogue & Spatial Captions:
                  </span>
                  
                  {isEditMode ? (
                    <div className="space-y-2">
                      {panel.dialogue.map((line, lineIdx) => (
                        <div key={lineIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="SPEAKER"
                            value={line.speaker}
                            onChange={(e) => handleUpdateDialogueLine(panelIdx, lineIdx, 'speaker', e.target.value)}
                            className="w-1/3 px-2.5 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-amber-400 text-xs font-bold focus:border-amber-400 focus:outline-none uppercase"
                          />
                          <input
                            type="text"
                            placeholder="Dialogue line..."
                            value={line.text}
                            onChange={(e) => handleUpdateDialogueLine(panelIdx, lineIdx, 'text', e.target.value)}
                            className="flex-1 px-3 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 text-xs font-sans focus:border-amber-400 focus:outline-none"
                          />
                          <button
                            onClick={() => handleRemoveDialogueLine(panelIdx, lineIdx)}
                            className="p-1.5 rounded text-neutral-500 hover:text-rose-400"
                            title="Remove line"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => handleAddDialogueLine(panelIdx)}
                          className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-neutral-700 text-[11px] font-mono flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Line</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-rose-400 font-bold uppercase">SFX:</span>
                          <input
                            type="text"
                            value={panel.sfx}
                            onChange={(e) => handleUpdatePanelField(panelIdx, 'sfx', e.target.value)}
                            className="px-2 py-1 rounded bg-neutral-950 border border-neutral-700 text-rose-300 text-xs font-mono focus:border-rose-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 pl-4">
                      {panel.dialogue.map((line, idx) => (
                        <div key={idx} className="text-xs sm:text-sm">
                          <span className="font-bold text-amber-400 uppercase tracking-wide mr-2">
                            {line.speaker}:
                          </span>
                          <span className="text-neutral-200 font-sans">
                            "{line.text}"
                          </span>
                        </div>
                      ))}

                      <div className="pt-2 text-xs font-bold text-rose-400 font-mono">
                        {panel.sfx}
                      </div>
                    </div>
                  )}
                </div>
              )}

              </div>
            );
          })}
        </div>

        {/* Add Panel Action Button (When in Edit Mode) */}
        {isEditMode && (
          <div className="pt-4 flex justify-center">
            <button
              onClick={handleAddPanel}
              className="px-5 py-2.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-amber-400 border-2 border-dashed border-amber-400/50 hover:border-amber-400 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Panel {currentPage.panels.length + 1} to Page {currentPage.pageNumber}</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
