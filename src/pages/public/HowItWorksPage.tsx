import React from 'react';
import { 
  FilePlus2, 
  SearchCheck, 
  GitBranch, 
  Waypoints, 
  ShieldAlert, 
  FileCheck2 
} from 'lucide-react';
import { Card } from '../../components/common/Card';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Victim Intake & Case Registration',
      icon: FilePlus2,
      desc: 'The investigator creates a case dossier, entering the victim complaint, target wallet address, victim-reported sum, and selected blockchain.',
      principle: 'The victim-reported amount is isolated as the "Trace Seed"—the system does not treat the wallet\'s entire historical balance as stolen.'
    },
    {
      num: '02',
      title: 'Blockchain Validation & Ingestion',
      icon: SearchCheck,
      desc: 'TRACE-X queries EVM RPC providers, validates the checksum address, and normalizes raw transaction blocks into standardized internal schema models.',
      principle: 'Data normalization handles native coin transfers, ERC-20 token movements, and internal contract execution logs.'
    },
    {
      num: '03',
      title: 'Interactive Graph Construction',
      icon: GitBranch,
      desc: 'The engine parses all incoming and outgoing edges from the root wallet, building an interactive force-directed graph with volume weights and hop counts.',
      principle: 'Graph edges represent real on-chain transfers. No synthetic or speculative connections are injected.'
    },
    {
      num: '04',
      title: 'Virtual Fund Trace (VFT) Attribution',
      icon: Waypoints,
      desc: 'The VFT engine traverses downstream hops. If funds split into multiple wallets, child VFT tokens are created preserving parent lineage and attribution percentages.',
      principle: 'Attribution strategies (Direct, Proportional, FIFO) are recorded transparently with confidence scores.'
    },
    {
      num: '05',
      title: 'Overlap Detection & Entity Intelligence',
      icon: ShieldAlert,
      desc: 'The address is matched against known entity registries (VASPs, exchanges, mixers) and cross-checked across all active investigations for cross-agency overlap.',
      principle: 'If another investigator is tracking the same address, privacy-safe notifications allow mutual-consent collaboration.'
    },
    {
      num: '06',
      title: 'Court-Ready Evidentiary Reporting',
      icon: FileCheck2,
      desc: 'The investigator compiles a complete forensic report containing VFT lineages, normalized transaction ledgers, risk indicators, and exportable PDF/JSON formats.',
      principle: 'Includes strict legal disclaimers: analytical leads require corroboration via subpoenas to custodial endpoints.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F2747] tracking-tight">
          The 6-Stage Investigation Lifecycle
        </h1>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
          From first victim intake to final evidentiary reporting, TRACE-X follows an audited, repeatable methodology designed to withstand judicial scrutiny.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <Card key={idx} className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-5">
                <div className="w-12 h-12 bg-[#EAF4FF] border border-[#ADCFFF] text-[#1D4ED8] rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#2563EB] bg-[#EAF4FF] px-2 py-0.5 rounded border border-[#ADCFFF]">
                      STAGE {step.num}
                    </span>
                    <h3 className="text-base font-bold text-[#0F2747]">{step.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  
                  <div className="mt-3 bg-[#F7FBFF] p-3 rounded-lg border border-[#DCE7F3] text-xs text-[#0F2747]">
                    <strong className="text-[#1D4ED8] font-semibold">Investigative Guardrail: </strong>
                    <span className="text-slate-600">{step.principle}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
