import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { LivingComicReader } from './components/LivingComicReader';
import { ArchivalVault } from './components/ArchivalVault';
import { ScriptwriterStudio } from './components/ScriptwriterStudio';
import { ThreeMinMashupStudio } from './components/ThreeMinMashupStudio';
import { FramingLoreDossier } from './components/FramingLoreDossier';
import { KiwiComedyGlossary } from './components/KiwiComedyGlossary';
import { BrandHeroMotto } from './components/BrandHeroMotto';
import { ArchivalEntry } from './types';
import { NZ_ARCHIVAL_MOMENTS } from './data/archiveMoments';
import { Tv, Sparkles, Heart, Radio, Flame } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('mashups');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [crtFilterActive, setCrtFilterActive] = useState<boolean>(false);
  const [showDirectivesHUD, setShowDirectivesHUD] = useState<boolean>(false);
  const [selectedMomentForScript, setSelectedMomentForScript] = useState<ArchivalEntry | null>(null);
  const [selectedVaultMomentId, setSelectedVaultMomentId] = useState<string | null>(null);

  const handleInspectMomentInVault = (momentId: string) => {
    setSelectedVaultMomentId(momentId);
    setActiveTab('archive');
  };

  const handleSendToScriptwriter = (moment: ArchivalEntry) => {
    setSelectedMomentForScript(moment);
    setActiveTab('script');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        crtFilterActive={crtFilterActive}
        setCrtFilterActive={setCrtFilterActive}
        showDirectivesHUD={showDirectivesHUD}
        setShowDirectivesHUD={setShowDirectivesHUD}
      />

      {/* Prominent Stylized Brand Motto Hero Header */}
      <BrandHeroMotto
        soundEnabled={soundEnabled}
        onNavigateToTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'mashups' && (
          <ThreeMinMashupStudio
            soundEnabled={soundEnabled}
            onSendToReader={() => setActiveTab('reader')}
          />
        )}

        {activeTab === 'reader' && (
          <LivingComicReader
            showDirectivesHUD={showDirectivesHUD}
            soundEnabled={soundEnabled}
            crtFilterActive={crtFilterActive}
            onInspectMoment={handleInspectMomentInVault}
            onSwitchToScriptwriter={() => setActiveTab('script')}
          />
        )}

        {activeTab === 'archive' && (
          <ArchivalVault
            soundEnabled={soundEnabled}
            onSendToScriptwriter={handleSendToScriptwriter}
            selectedMomentId={selectedVaultMomentId}
            onClearSelectedMoment={() => setSelectedVaultMomentId(null)}
          />
        )}

        {activeTab === 'script' && (
          <ScriptwriterStudio
            initialMoment={selectedMomentForScript}
            onViewInLivingReader={() => setActiveTab('reader')}
          />
        )}

        {activeTab === 'lore' && (
          <FramingLoreDossier
            onStartReading={() => setActiveTab('reader')}
          />
        )}

        {activeTab === 'glossary' && (
          <KiwiComedyGlossary />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-neutral-950 border-t border-neutral-900 py-8 px-4 sm:px-6 lg:px-8 text-xs font-mono text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber-400/20 flex items-center justify-center border border-amber-400/30">
              <Tv className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div>
              <span className="text-neutral-200 font-bold">PROJECT MICROFICHE-89</span> • Avalon Broadcasting Sub-Level 4
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-amber-400/80">"Always blow on the pie. Safer communities together."</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline text-neutral-500">20 Curated Kiwi Comedy Artifacts</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
