import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Check, 
  Copy, 
  RotateCcw, 
  BookOpen, 
  Zap, 
  Quote, 
  Sliders, 
  ChevronRight, 
  Info, 
  ArrowRight, 
  Wand2, 
  ShieldAlert, 
  Layers, 
  Flame,
  ThumbsUp,
  Award
} from 'lucide-react';
import { 
  KIWI_SLANG_RULES, 
  SlangRule, 
  SlangAlternative, 
  DetectedSlangMatch, 
  scanScriptForKiwiSlang, 
  calculateKiwiAuthenticityScore 
} from '../data/kiwiSlangDictionary';
import { ComicPage } from '../types';
import { ANALYZER_SCRATCHPAD_KEY } from '../utils/scriptwriterStorage';

interface KiwiSlangAnalyzerProps {
  currentPage?: ComicPage;
  onUpdatePageDialogue?: (updatedDialogueText: string) => void;
  className?: string;
}

const SAMPLE_SCRIPTS = [
  {
    title: '3:00 AM Dannevirke Pie Incident',
    category: 'Police 10-7 / Pastry Thermodynamics',
    text: `OFFICER MINOGUE: Step away from the glass warmer. This pie is very hot. It is too hot to eat.
OFFICER O'LEARY: Yes, definitely. What is happening with that cheese crust?
SENIOR SGT BALDWIN: Look mate, you know I can't let you eat that. Friend, you need to blow on the pie. She is damaged, so let us fix it with some baling twine.`
  },
  {
    title: 'Wellington Vampire Flat Meeting',
    category: 'What We Do in the Shadows / Domestic Horror',
    text: `VIAGO: Band meeting! Is everyone present? This vampire has not done the dishes for five years.
VLADISLAV: I was bidding on a pine table on TradeMe for twelve dollars! Leave me alone!
DEACON: Yeah nah, that is great, but we don't bite people who pay rent.
MONIQUE: Bro, you know he can't grab your ghost chips. Space head.`
  },
  {
    title: 'Paddock Boundary Fence Crisis',
    category: 'Fred Dagg / No. 8 Wire Ingenuity',
    text: `FRED DAGG: Gidday. Me and Trev were looking at the tractor. The axle is broken.
TREV: Yes, absolutely. Can we repair it?
FRED DAGG: Sweet as. A bit of No. 8 wire and some baling twine, and she'll be right. Nek minnit, we'll head down to the dairy for an ice block.`
  },
  {
    title: 'West Auckland TradeMe Acquisition',
    category: 'Outrageous Fortune / Westie Hustle',
    text: `VAN WEST: Hey cuz, check out this 65-inch television. It is not stealing, it fell off a truck.
TED WEST: Cheryl, did you hear about the neighbours? They are angry about the Holden Commodore burnout.
PASCAL: I am confused. Is this great or what? Hard out bro, let us celebrate.`
  },
  {
    title: 'Central Westside: Poets of Peace-Science',
    category: 'West Auckland Spoken Word & Quantum Classroom Satire',
    text: `SIR MANPHAT: Fark-up, and move away — you can't park here. My funny mates are going to laugh bro. So fark-up, not park-up!
BACKSEAT CREW: Knocka knocka, who is there? It is Sir Manphat-who, he wants to come inside!
QUANTUM POET: Countdown then blow it up. Q-bituary on central WESTSIDE. Poets of peace-science for dummies. I learnt maths just to add it to a list.
NARRATOR: After he had to teach the teachers what it is along with all the kids. Apart from telling a single joke in physics he hardly even spoke.
WESTSIDE SCHOLAR: The kid getting paid Bentley wage had no idea I was his number one guy. What do we expect from kids if we leave them to be alone amongst 'em, blinded by the actual sight, eyelids too tight... Kids go on tonight.`
  }
];

export const KiwiSlangAnalyzer: React.FC<KiwiSlangAnalyzerProps> = ({
  currentPage,
  onUpdatePageDialogue,
  className = ''
}) => {
  // Mode: 'page-script' | 'scratchpad' | 'dictionary'
  const [activeMode, setActiveMode] = useState<'page-script' | 'scratchpad' | 'dictionary'>('scratchpad');
  
  // Script text in scratchpad with auto-save persistence
  const [scratchpadText, setScratchpadText] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(ANALYZER_SCRATCHPAD_KEY);
      if (saved && saved.trim()) return saved;
    } catch (e) {
      console.warn('Could not load scratchpad from localStorage', e);
    }
    return SAMPLE_SCRIPTS[0].text;
  });

  // Auto-save scratchpad changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ANALYZER_SCRATCHPAD_KEY, scratchpadText);
    } catch (e) {
      console.warn('Could not save scratchpad to localStorage', e);
    }
  }, [scratchpadText]);
  
  // Selected match for inspection
  const [selectedMatchIndex, setSelectedMatchIndex] = useState<number | null>(0);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [dictionarySearch, setDictionarySearch] = useState<string>('');

  // AI Gemini Doctor State
  const [isAiAnalyzing, setIsAiAnalyzing] = useState<boolean>(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Status feedback toast
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Derive current text to analyze based on active mode
  const currentActiveText = useMemo(() => {
    if (activeMode === 'page-script' && currentPage) {
      const dialogueLines = currentPage.panels
        .flatMap((p) => p.dialogue.map((d) => `${d.speaker}: ${d.text}`))
        .join('\n');
      const visualNotes = currentPage.panels.map((p) => `[Panel ${p.panelNumber}]: ${p.visualDescription}`).join('\n');
      return `${dialogueLines}\n\n${visualNotes}`;
    }
    return scratchpadText;
  }, [activeMode, currentPage, scratchpadText]);

  // Scan text for slang matches
  const detectedMatches = useMemo(() => {
    return scanScriptForKiwiSlang(currentActiveText);
  }, [currentActiveText]);

  // Authenticity & Piss-Take Scores
  const authenticityScores = useMemo(() => {
    return calculateKiwiAuthenticityScore(currentActiveText, detectedMatches);
  }, [currentActiveText, detectedMatches]);

  // Replace text with chosen alternative
  const handleApplyAlternative = (match: DetectedSlangMatch, alt: SlangAlternative) => {
    if (activeMode === 'scratchpad') {
      const before = scratchpadText.substring(0, match.index);
      const after = scratchpadText.substring(match.index + match.length);
      const newText = before + alt.text + after;
      setScratchpadText(newText);
      showToast(`Applied archival phrasing: "${alt.text}" (${alt.sourceArchive})`);
    } else if (activeMode === 'page-script' && onUpdatePageDialogue) {
      onUpdatePageDialogue(alt.text);
      showToast(`Injected "${alt.text}" into active comic page dialogue!`);
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(alt.text);
      showToast(`Copied "${alt.text}" to clipboard!`);
    }
  };

  const showToast = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  // Run AI Deep Scan with Gemini
  const handleRunAiDoctor = async () => {
    setIsAiAnalyzing(true);
    setAiError(null);

    try {
      const response = await fetch('/api/gemini/analyze-slang', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: currentActiveText,
          targetArchetype: 'Kiwi Comedy Cult Classics (What We Do in the Shadows, Police 10-7, Fred Dagg)',
          tonePreference: 'Authentic Deadpan Under-Reaction & Archival Satire'
        })
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        setAiAnalysisResult(data.analysis);
        showToast('AI Cultural Phrasing Doctor completed deep scan!');
      } else {
        setAiError(data.error || 'Failed to complete AI phrasing analysis.');
      }
    } catch (err: any) {
      setAiError(err.message || 'Network error during AI scan.');
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const handleApplyFullAiRewrite = () => {
    if (aiAnalysisResult?.fullScriptRewrite) {
      setScratchpadText(aiAnalysisResult.fullScriptRewrite);
      setActiveMode('scratchpad');
      showToast('Applied full AI Kiwi-fied script rewrite to scratchpad!');
    }
  };

  // Filtered slang rules for dictionary browser tab
  const filteredDictionaryRules = useMemo(() => {
    return KIWI_SLANG_RULES.filter((r) => {
      const matchesSearch = 
        r.matchedLabel.toLowerCase().includes(dictionarySearch.toLowerCase()) ||
        r.keywords.some((k) => k.toLowerCase().includes(dictionarySearch.toLowerCase())) ||
        r.alternatives.some((a) => a.text.toLowerCase().includes(dictionarySearch.toLowerCase()) || a.sourceArchive.toLowerCase().includes(dictionarySearch.toLowerCase()));
      const matchesCat = filterCategory === 'All' || r.category === filterCategory;
      return matchesSearch && matchesCat;
    });
  }, [dictionarySearch, filterCategory]);

  return (
    <div className={`rounded-3xl bg-neutral-900/95 border-2 border-emerald-500/40 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 ${className}`}>
      
      {/* Top Header Bar */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-b border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/10">
            <Wand2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-emerald-400 text-neutral-950 font-bold font-['Bangers'] text-xs tracking-wider">
                KIWI SLANG DOCTOR
              </span>
              <span className="text-[11px] font-mono text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded border border-neutral-700">
                Aotearoa Cultural Text Analysis
              </span>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                {detectedMatches.length} Opportunities Detected
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-100 mt-1">
              Kiwi Slang Analyzer & Archival Phrasing Doctor
            </h3>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-2xl border border-neutral-800 self-start md:self-auto">
          <button
            id="slang-mode-scratchpad-btn"
            onClick={() => setActiveMode('scratchpad')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeMode === 'scratchpad'
                ? 'bg-emerald-400 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Script Scratchpad
          </button>
          
          {currentPage && (
            <button
              id="slang-mode-pagescript-btn"
              onClick={() => setActiveMode('page-script')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeMode === 'page-script'
                  ? 'bg-emerald-400 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Scan Active Page {currentPage.pageNumber}
            </button>
          )}

          <button
            id="slang-mode-dict-btn"
            onClick={() => setActiveMode('dictionary')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeMode === 'dictionary'
                ? 'bg-emerald-400 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Archive Vault ({KIWI_SLANG_RULES.length})
          </button>
        </div>
      </div>

      {/* Action Toast */}
      {actionFeedback && (
        <div className="bg-emerald-950/90 border-b border-emerald-500/40 px-6 py-2.5 text-xs font-mono text-emerald-300 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionFeedback}</span>
          </div>
        </div>
      )}

      {/* Main Container Content */}
      <div className="p-5 sm:p-6 space-y-6">
        
        {/* Authenticity Score Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-neutral-800 grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
          
          {/* Main Dial / Score */}
          <div className="flex items-center gap-4 lg:border-r lg:border-neutral-800 lg:pr-6">
            <div className="relative w-16 h-16 rounded-2xl bg-neutral-900 border-2 border-emerald-400/40 flex flex-col items-center justify-center shadow-inner">
              <span className="text-2xl font-black font-['Bangers'] text-emerald-400 tracking-wide">
                {authenticityScores.overallScore}%
              </span>
              <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-tight">Authenticity</span>
            </div>
            <div>
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                Cultural Piss-Take Rating
              </div>
              <div className="text-sm sm:text-base font-bold text-neutral-100">
                {authenticityScores.overallScore >= 80 ? 'Peak Aotearoa Icon' : authenticityScores.overallScore >= 55 ? 'Provincial Resonance' : 'Mainland Emerging'}
              </div>
              <div className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                {authenticityScores.feedback}
              </div>
            </div>
          </div>

          {/* Sub-Meters */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Deadpan Index */}
            <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800/80 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-400">Deadpan Level</span>
                <span className="text-cyan-400 font-bold">{authenticityScores.deadpanIndex}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${authenticityScores.deadpanIndex}%` }}
                />
              </div>
            </div>

            {/* Archival Density */}
            <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800/80 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-400">Archival Quotes</span>
                <span className="text-amber-400 font-bold">{authenticityScores.archivalDensity}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${authenticityScores.archivalDensity}%` }}
                />
              </div>
            </div>

            {/* Pastry Hazard Awareness */}
            <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800/80 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-400">Pastry Thermal Risk</span>
                <span className="text-rose-400 font-bold">{authenticityScores.hazardAwareness}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full transition-all duration-500"
                  style={{ width: `${authenticityScores.hazardAwareness}%` }}
                />
              </div>
            </div>

            {/* DIY Ingenuity */}
            <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800/80 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-400">No. 8 Wire Ratio</span>
                <span className="text-emerald-400 font-bold">{authenticityScores.diyIngenuity}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500"
                  style={{ width: `${authenticityScores.diyIngenuity}%` }}
                />
              </div>
            </div>

          </div>

        </div>

        {/* DICTIONARY VAULT VIEW */}
        {activeMode === 'dictionary' && (
          <div className="space-y-4">
            
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search slang terms, quotes, or iconic characters (e.g. Guy Baldwin, Fred Dagg)..."
                  value={dictionarySearch}
                  onChange={(e) => setDictionarySearch(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {['All', 'Pastry Thermodynamics', 'Deadpan Understatement', 'Provincial / Rural', 'Westie Slang', 'Supernatural Casual'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-colors ${
                      filterCategory === cat
                        ? 'bg-emerald-400 text-neutral-950 font-bold'
                        : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Dictionary Rules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDictionaryRules.map((rule) => (
                <div 
                  key={rule.id}
                  className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500/40 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${rule.categoryColor}`}>
                        {rule.category}
                      </span>
                      <h4 className="text-base font-bold text-neutral-100 mt-1">
                        {rule.matchedLabel}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      {rule.alternatives.length} Iconic Upgrades
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {rule.culturalSubtext}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-neutral-900">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                      Archival Phrasing Replacements:
                    </span>
                    <div className="space-y-1.5">
                      {rule.alternatives.map((alt) => (
                        <div 
                          key={alt.id}
                          className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 flex items-center justify-between gap-3 group hover:border-emerald-500/40 transition-all"
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-emerald-300 truncate">
                              "{alt.text}"
                            </div>
                            <div className="text-[10px] font-mono text-neutral-400 truncate">
                              {alt.speaker} • {alt.sourceArchive}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setScratchpadText((prev) => `${prev}\n\n[Iconic Line: "${alt.text}"]`);
                              setActiveMode('scratchpad');
                              showToast(`Inserted "${alt.text}" into scratchpad!`);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-emerald-400 hover:text-neutral-950 text-neutral-300 text-[11px] font-mono transition-all shrink-0"
                          >
                            Insert
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* SCRATCHPAD & PAGE-SCRIPT VIEW */}
        {activeMode !== 'dictionary' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Script Editor / Interactive Highlighter (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Presets Strip (Scratchpad only) */}
              {activeMode === 'scratchpad' && (
                <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5 font-bold text-neutral-300">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Load Iconic Archival Test Scenes:
                    </span>
                    <span>Click to test analysis</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {SAMPLE_SCRIPTS.map((sample, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setScratchpadText(sample.text);
                          setSelectedMatchIndex(0);
                          showToast(`Loaded "${sample.title}" scene!`);
                        }}
                        className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-800 hover:border-emerald-500/40 text-left transition-all"
                      >
                        <div className="text-[11px] font-bold text-neutral-200 truncate">
                          {sample.title}
                        </div>
                        <div className="text-[9px] font-mono text-neutral-400 truncate">
                          {sample.category}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Text Input / Editor Box */}
              <div className="rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-inner flex flex-col">
                <div className="px-4 py-2.5 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    {activeMode === 'scratchpad' ? 'Live Script Editor' : `Page ${currentPage?.pageNumber} Script Feed`}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentActiveText);
                        showToast('Script copied to clipboard!');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-mono flex items-center gap-1 transition-colors"
                      title="Copy script"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                    {activeMode === 'scratchpad' && (
                      <button
                        onClick={() => setScratchpadText('')}
                        className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-rose-950 hover:text-rose-300 text-neutral-400 text-[11px] font-mono transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Text Area */}
                {activeMode === 'scratchpad' ? (
                  <textarea
                    id="slang-script-scratchpad-input"
                    rows={8}
                    value={scratchpadText}
                    onChange={(e) => setScratchpadText(e.target.value)}
                    placeholder="Type or paste comic script dialogue here to scan for Kiwi slang and upgrade with iconic archival phrasing..."
                    className="w-full p-4 bg-transparent text-sm font-mono text-neutral-100 placeholder-neutral-600 focus:outline-none resize-y leading-relaxed"
                  />
                ) : (
                  <div className="p-4 text-xs font-mono text-neutral-300 max-h-56 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {currentActiveText}
                  </div>
                )}

                {/* Scanned Highlight Badges Bar */}
                <div className="p-3 bg-neutral-900/60 border-t border-neutral-800 flex items-center gap-2 overflow-x-auto text-xs font-mono">
                  <span className="text-neutral-500 uppercase shrink-0">Detected Phrases:</span>
                  {detectedMatches.length === 0 ? (
                    <span className="text-neutral-500 italic">No common generic or slang triggers detected</span>
                  ) : (
                    detectedMatches.map((m, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedMatchIndex(idx)}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono shrink-0 transition-all ${
                          selectedMatchIndex === idx
                            ? 'bg-emerald-400 text-neutral-950 font-bold border-emerald-300 shadow-sm'
                            : `${m.rule.categoryColor} hover:opacity-100 opacity-85`
                        }`}
                      >
                        "{m.matchedText}"
                      </button>
                    ))
                  )}
                </div>

              </div>

              {/* AI Deep Scan Action Panel */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-neutral-950 via-cyan-950/40 to-neutral-950 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-100">
                      Gemini Cultural Phrasing Doctor
                    </h4>
                    <p className="text-[11px] text-neutral-400">
                      Deep AI scan with line-by-line comedic timing enhancements
                    </p>
                  </div>
                </div>

                <button
                  id="ai-doctor-scan-btn"
                  onClick={handleRunAiDoctor}
                  disabled={isAiAnalyzing}
                  className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-cyan-400/20 shrink-0 disabled:opacity-50"
                >
                  {isAiAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing Slang...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Deep Scan Script</span>
                    </>
                  )}
                </button>
              </div>

              {/* AI Doctor Analysis Result Box */}
              {aiAnalysisResult && (
                <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                        AI Phrasing Doctor Diagnosis
                      </span>
                    </div>
                    <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                      Score: {aiAnalysisResult.kiwiScore || 85}%
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed font-sans italic">
                    "{aiAnalysisResult.overallVerdict}"
                  </p>

                  {/* AI Line-by-Line Suggestions */}
                  {aiAnalysisResult.enhancementSuggestions?.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                        Targeted Archival Dialogue Upgrades:
                      </span>
                      <div className="space-y-2">
                        {aiAnalysisResult.enhancementSuggestions.map((sug: any, idx: number) => (
                          <div key={idx} className="p-3 rounded-xl bg-neutral-950/80 border border-cyan-500/20 space-y-1.5">
                            <div className="flex items-center gap-2 text-xs font-mono">
                              <span className="text-neutral-400 line-through">"{sug.originalLine}"</span>
                              <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
                              <span className="text-emerald-300 font-bold">"{sug.enhancedLine}"</span>
                            </div>
                            <div className="text-[10px] font-mono text-neutral-400 flex items-center justify-between">
                              <span className="text-amber-400">Archive: {sug.iconicSource}</span>
                              <button
                                onClick={() => {
                                  setScratchpadText((prev) => prev.replace(sug.originalLine, sug.enhancedLine));
                                  showToast(`Upgraded line with ${sug.iconicSource}!`);
                                }}
                                className="text-cyan-400 hover:underline"
                              >
                                Apply Line
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Full Script Rewrite Button */}
                  {aiAnalysisResult.fullScriptRewrite && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleApplyFullAiRewrite}
                        className="px-3 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Apply Complete AI Script Rewrite</span>
                      </button>
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* Right Column: Archival Alternatives Inspector (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Quote className="w-3.5 h-3.5 text-emerald-400" />
                  Archival Phrasing Inspector
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  {detectedMatches.length} matches
                </span>
              </div>

              {detectedMatches.length === 0 ? (
                <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-neutral-200">
                    No Slang Triggers in View
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                    Type or paste dialogue containing terms like "very hot", "yes", "cool", "broken", "friend", or "cops" to explore authentic Kiwi comedic alternatives.
                  </p>
                  <button
                    onClick={() => setScratchpadText(SAMPLE_SCRIPTS[0].text)}
                    className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-emerald-400 border border-neutral-800 text-xs font-mono transition-colors"
                  >
                    Load Sample 3AM Pie Scene
                  </button>
                </div>
              ) : (
                (() => {
                  const match = detectedMatches[selectedMatchIndex || 0] || detectedMatches[0];
                  if (!match) return null;

                  return (
                    <div className="space-y-4">
                      
                      {/* Active Match Card */}
                      <div className="p-5 rounded-2xl bg-neutral-950 border-2 border-emerald-500/50 shadow-xl space-y-4">
                        
                        {/* Header */}
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${match.rule.categoryColor}`}>
                              {match.rule.category}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400">
                              Trigger: "{match.matchedText}"
                            </span>
                          </div>
                          
                          <h4 className="text-base font-bold text-neutral-100 mt-2">
                            {match.rule.matchedLabel}
                          </h4>
                          <p className="text-xs text-neutral-400 leading-relaxed mt-1">
                            {match.rule.culturalSubtext}
                          </p>
                        </div>

                        {/* Alternatives List */}
                        <div className="space-y-2.5 pt-3 border-t border-neutral-900">
                          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-emerald-400" />
                            Iconic Archival Phrasing Upgrades:
                          </span>

                          <div className="space-y-2.5">
                            {match.rule.alternatives.map((alt) => (
                              <div
                                key={alt.id}
                                className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/60 transition-all space-y-2 group"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <div className="text-sm font-bold text-emerald-300 font-sans">
                                      "{alt.text}"
                                    </div>
                                    <div className="text-[10px] font-mono text-neutral-400 mt-0.5">
                                      {alt.speaker} • <span className="text-amber-400">{alt.sourceArchive}</span>
                                    </div>
                                  </div>

                                  <button
                                    id={`apply-alt-${alt.id}`}
                                    onClick={() => handleApplyAlternative(match, alt)}
                                    className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-neutral-950 text-xs font-mono font-bold flex items-center gap-1 transition-all shadow-sm shrink-0 cursor-pointer"
                                    title="Replace in script"
                                  >
                                    <span>Apply</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                </div>

                                <div className="text-[11px] text-neutral-400 font-sans italic bg-neutral-950/80 p-2 rounded-lg border border-neutral-800/80">
                                  {alt.exampleSentence}
                                </div>

                                <div className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                                  <Info className="w-3 h-3 text-neutral-400 shrink-0" />
                                  <span>{alt.contextNote}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>

                      </div>

                    </div>
                  );
                })()
              )}

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
