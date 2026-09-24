import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Quote, 
  Flame, 
  Compass, 
  Tv, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface GlossaryTerm {
  term: string;
  literalDefinition: string;
  kiwiComedyFunction: string;
  canonicalExample: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Deadpan Under-Reaction',
    literalDefinition: 'Delivering lines with flat vocal inflection and zero facial expression regardless of emotional gravity.',
    kiwiComedyFunction: 'The bedrock of NZ comedy. If a UFO lands or a vampire bites someone, the Kiwi response must strictly resemble a council rubbish collection enquiry.',
    canonicalExample: '"Minogue, is that an alien entity?" "No O\'Leary, it\'s just a bloke with a KFC bucket stuck firmly on his head."'
  },
  {
    term: 'Thermo-Nuclear Pie',
    literalDefinition: 'A meat-and-cheese pastry that has resided in a service station glass warming drawer for 8+ hours at temperatures surpassing 85°C.',
    kiwiComedyFunction: 'Acts as both an authentic cultural hazard and an unsolicited vector for deadpan law enforcement counseling.',
    canonicalExample: '"3:00am in the morning, that pie has probably been in the warming drawer for twelve hours. It will be thermo-nuclear. Always blow on the pie."'
  },
  {
    term: 'Tall Poppy Deflation',
    literalDefinition: 'The cultural instinct to cut down anyone displaying excessive ambition, self-aggrandizement, or Hollywood-style melodrama.',
    kiwiComedyFunction: 'Any character who tries to be high-status or grandiose is immediately undercut by mundane suburban reality (e.g. Vladislav the medieval tyrant having to do the dishes or bid on a pine table).',
    canonicalExample: '"I am bidding on a table on TradeMe."'
  },
  {
    term: 'Ghost Chips',
    literalDefinition: 'Ethereal spectral snacks consumed in imaginary scenarios.',
    kiwiComedyFunction: 'A mechanism to diffuse severe social peer pressure through surreal, non-confrontational internal absurdity.',
    canonicalExample: '"You know I can\'t grab your ghost chips."'
  },
  {
    term: 'No. 8 Wire Ingenuity',
    literalDefinition: 'A gauge of steel fencing wire traditionally used by farmers for improvised repairs.',
    kiwiComedyFunction: 'The philosophical belief that any cosmic, mechanical, or narrative crisis can be solved with gaffer tape, baling twine, and stubbies.',
    canonicalExample: 'Fred Dagg fixing the boundary fence while having a philosophical debate with Trev.'
  },
  {
    term: 'The Dairy',
    literalDefinition: 'A corner convenience store selling milk, newspapers, $1 lolly bags, and hot pies.',
    kiwiComedyFunction: 'The supreme civic nexus of provincial New Zealand where inter-dimensional meetings and local gossip converge.',
    canonicalExample: 'Boy counting coins for an ice block in Waihau Bay.'
  },
  {
    term: 'O For Awesome',
    literalDefinition: 'Phonetic misunderstanding turned cultural badge of honor.',
    kiwiComedyFunction: 'Pure earnest unpretentious optimism triumphing over rigid gameshow rules.',
    canonicalExample: 'David Tua on Wheel of Fortune.'
  },
  {
    term: 'Band Meeting: Present',
    literalDefinition: 'Taking roll-call attendance for a two-person folk duo sitting across a small coffee table.',
    kiwiComedyFunction: 'Highlighting the tragicomic obsession with bureaucratic administrative formality in small-time artistic ambition.',
    canonicalExample: 'Murray Hewitt with Bret and Jemaine at the NYC consulate.'
  }
];

export const KiwiComedyGlossary: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredTerms = GLOSSARY_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(query.toLowerCase()) ||
      t.literalDefinition.toLowerCase().includes(query.toLowerCase()) ||
      t.kiwiComedyFunction.toLowerCase().includes(query.toLowerCase()) ||
      t.canonicalExample.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="bg-neutral-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded bg-amber-400 text-neutral-950 font-bold font-['Bangers'] text-sm tracking-wide">
            CULTURAL DECODER
          </span>
          <span className="text-xs font-mono text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded border border-neutral-700">
            Aotearoa Comedy Archetypes & Slang
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-['Bangers'] text-amber-400 tracking-wide">
          KIWI COMEDY CULTURAL GLOSSARY
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-2 max-w-2xl leading-relaxed">
          The essential cultural handbook for understanding the subtle thermodynamics, self-deprecations, and deadpan subtexts driving the Living Comic scripts.
        </p>

        {/* Search */}
        <div className="relative mt-6 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search slang, comedic terms, examples..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm focus:outline-none focus:border-amber-400 font-sans"
          />
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTerms.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 transition-all shadow-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-['Bangers'] text-xl text-neutral-100 tracking-wide text-amber-400">
                {item.term}
              </h2>
              <span className="text-[10px] font-mono text-neutral-500 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                RULE #{idx + 1}
              </span>
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-neutral-400 block mb-0.5">
                LITERAL DEFINITION:
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                {item.literalDefinition}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
              <span className="text-xs font-mono font-bold text-cyan-400 block mb-0.5">
                COMEDIC FUNCTION IN SCRIPT:
              </span>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                {item.kiwiComedyFunction}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/20">
              <span className="text-[11px] font-mono font-bold text-amber-400 block mb-0.5">
                CANONICAL BEAT:
              </span>
              <p className="text-xs text-amber-200 italic font-sans">
                {item.canonicalExample}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
