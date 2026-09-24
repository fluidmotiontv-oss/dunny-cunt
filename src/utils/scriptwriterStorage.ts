import { ComicPage } from '../types';

export const SCRIPTWRITER_STORAGE_KEY = 'nz_living_comic_scriptwriter_progress_v1';
export const ANALYZER_SCRATCHPAD_KEY = 'nz_living_comic_analyzer_scratchpad_v1';

export interface ScriptwriterStudioSaveState {
  version: number;
  savedAt: number;
  selectedPageIndex: number;
  customPrompt: string;
  customStyle: string;
  generatedPages: ComicPage[];
  pageOverrides: Record<number, ComicPage>; // Keyed by pageNumber
  scratchpadDraft?: string;
}

/**
 * Loads the saved scriptwriter progress from local storage.
 * Returns null if no state exists or if parsing fails.
 */
export function loadScriptwriterProgress(): ScriptwriterStudioSaveState | null {
  try {
    const raw = localStorage.getItem(SCRIPTWRITER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.version) {
      return parsed as ScriptwriterStudioSaveState;
    }
    return null;
  } catch (err) {
    console.warn('[ScriptwriterStorage] Failed to load auto-save state from localStorage:', err);
    return null;
  }
}

/**
 * Saves the current scriptwriter studio state to local storage.
 */
export function saveScriptwriterProgress(state: Omit<ScriptwriterStudioSaveState, 'version' | 'savedAt'>): boolean {
  try {
    const payload: ScriptwriterStudioSaveState = {
      ...state,
      version: 1,
      savedAt: Date.now(),
    };
    localStorage.setItem(SCRIPTWRITER_STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.error('[ScriptwriterStorage] Failed to auto-save scriptwriter progress:', err);
    return false;
  }
}

/**
 * Clears the saved scriptwriter progress from local storage.
 */
export function clearScriptwriterProgress(): void {
  try {
    localStorage.removeItem(SCRIPTWRITER_STORAGE_KEY);
  } catch (err) {
    console.error('[ScriptwriterStorage] Failed to clear auto-save state:', err);
  }
}

/**
 * Formats a timestamp into a human-readable relative time string.
 */
export function formatRelativeSavedTime(timestamp: number): string {
  if (!timestamp) return 'Never';
  const diffSec = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  
  if (diffSec < 5) return 'Just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const date = new Date(timestamp);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
