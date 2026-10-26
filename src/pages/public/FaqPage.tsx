import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does TRACE-X prove that a wallet owner committed a crime?',
      a: 'No. TRACE-X provides analytical leads and mathematical fund provenance tracing. A high risk score or interaction with a suspicious entity is not legal proof of guilt. All analytical outputs must be independently corroborated through evidentiary subpoenas and formal law enforcement investigation.'
    },
    {
      q: 'What makes Virtual Fund Trace (VFT) different from simple wallet balance tracing?',
      a: 'Traditional tools often conflate the entire balance of an intermediate wallet with stolen funds. VFT isolates only the reported victim amount, creating child tokens that track exact fractional allocations through splits and merges without falsely labeling clean funds as criminal.'
    },
    {
      q: 'How does TRACE-X protect investigator privacy during collaboration?',
      a: 'When an address overlap occurs between two agencies, neither investigator sees the other’s name, agency, or contact details initially. Only a neutral alert is shown. Identities are shared only after both parties accept a formal collaboration request.'
    },
    {
      q: 'What blockchains are supported?',
      a: 'Ethereum Mainnet (ETH and ERC-20 tokens) is the primary target. The platform also supports Polygon PoS and BNB Smart Chain via its modular normalization pipeline.'
    },
    {
      q: 'Can TRACE-X freeze or seize stolen cryptocurrency?',
      a: 'No. TRACE-X is strictly an analytical intelligence platform with zero custody. It generates the forensic evidence dossiers required by law enforcement to request freezes directly from regulated VASPs or through court orders.'
    },
    {
      q: 'How are known entities attributed?',
      a: 'TRACE-X maintains an entity intelligence registry categorizing exchanges, VASPs, bridges, and DeFi protocols. Every attribution includes its source, verification date, and confidence level (Verified, Probable, or Unattributed). Unlabeled addresses are never assumed to be criminal.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF4FF] border border-[#ADCFFF] rounded-full text-xs font-semibold text-[#1D4ED8]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0F2747] tracking-tight">
          Investigative & Architectural FAQ
        </h1>
        <p className="text-xs text-slate-600">
          Clear answers to common questions regarding data integrity, legal admissibility, and platform operations.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <Card key={idx} className="overflow-hidden">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F7FBFF] transition-colors"
              >
                <span className="text-sm font-bold text-[#0F2747]">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-[#DCE7F3] pt-3">
                  {faq.a}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
