import React from 'react';
import { Waypoints, GitFork, GitMerge, Calculator } from 'lucide-react';
import { Card } from '../../components/common/Card';

export const VftSpecificationPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF4FF] border border-[#ADCFFF] rounded-full text-xs font-semibold text-[#1D4ED8]">
          <Waypoints className="w-3.5 h-3.5" />
          <span>Core Forensic Methodology</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F2747] tracking-tight">
          Virtual Fund Trace (VFT) Specification
        </h1>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
          The mathematical foundation of TRACE-X. A software object that tracks the downstream provenance of a victim's stolen funds without assuming the destination wallet's entire balance is criminal.
        </p>
      </div>

      <Card title="The Fundamental Distinction" subtitle="Why traditional balances fail in court">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
          <div className="p-4 bg-red-50/50 border border-red-200 rounded-lg space-y-2">
            <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Flawed Legacy Approach</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Assuming that if Victim sends $10,000 to Wallet A, and Wallet A has $100,000 total balance, that any $50,000 transfer out of Wallet A is entirely victim funds. This gets rejected by defense counsel in judicial proceedings.
            </p>
          </div>
          <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">TRACE-X VFT Standard</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              TRACE-X creates a mathematical object (`VFT-001`) tracking strictly the $10,000. When funds move downstream, it records whether they split, calculate attribution confidence, and explicitly marks clean vs. attributable balances.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="VFT Split Mechanics" subtitle="Handling peeling chains">
          <div className="space-y-4">
            <div className="p-3 bg-[#F7FBFF] rounded-lg font-mono text-xs text-[#0F2747] border border-[#DCE7F3]">
              Reported Loss: $50,000 (VFT-001)<br />
              ├── $32,500 → Transit Node (VFT-001-A, 65%)<br />
              └── $17,500 → Mixer Gateway (VFT-001-B, 35%)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              When a suspect splits funds across multiple addresses, TRACE-X generates child tokens preserving the lineage back to the root complaint. Each child token carries its specific attributable fraction.
            </p>
          </div>
        </Card>

        <Card title="VFT Merge Mechanics" subtitle="Handling consolidation into exchanges">
          <div className="space-y-4">
            <div className="p-3 bg-[#F7FBFF] rounded-lg font-mono text-xs text-[#0F2747] border border-[#DCE7F3]">
              VFT-001-A ($32,500) ──┐<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──→ Binance Hot Wallet ($50,000)<br />
              VFT-002-C ($17,500) ──┘
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              When funds from multiple victims converge into an exchange deposit gateway, both parent lineages are preserved without overwriting provenance.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
