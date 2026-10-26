import React from 'react';
import { Share2, Lock, ShieldCheck, UserCheck } from 'lucide-react';
import { Card } from '../../components/common/Card';

export const CollaborationPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF4FF] border border-[#ADCFFF] rounded-full text-xs font-semibold text-[#1D4ED8]">
          <Share2 className="w-3.5 h-3.5" />
          <span>Inter-Agency Deduplication</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F2747] tracking-tight">
          Privacy-Preserving Cross-Case Deduplication
        </h1>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
          Cryptocurrency crime is rarely isolated to one jurisdiction. TRACE-X connects authorized investigators tracking identical addresses without compromising agency privacy or ongoing covert operations.
        </p>
      </div>

      <Card title="The Mutual-Consent Handshake Flow" subtitle="Zero exposure of private details without explicit consent">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center p-2">
          <div className="p-4 bg-[#F7FBFF] rounded-xl border border-[#DCE7F3] space-y-2">
            <span className="text-xs font-mono font-bold text-[#2563EB]">STEP 1</span>
            <h4 className="text-xs font-bold text-[#0F2747]">Overlap Detected</h4>
            <p className="text-[11px] text-slate-500">Investigator B enters an address already tracked in an active case by Investigator A.</p>
          </div>
          <div className="p-4 bg-[#F7FBFF] rounded-xl border border-[#DCE7F3] space-y-2">
            <span className="text-xs font-mono font-bold text-[#2563EB]">STEP 2</span>
            <h4 className="text-xs font-bold text-[#0F2747]">Neutral Alert</h4>
            <p className="text-[11px] text-slate-500">Both see a notice: "Address is subject to another active investigation." No names or emails shown.</p>
          </div>
          <div className="p-4 bg-[#F7FBFF] rounded-xl border border-[#DCE7F3] space-y-2">
            <span className="text-xs font-mono font-bold text-[#2563EB]">STEP 3</span>
            <h4 className="text-xs font-bold text-[#0F2747]">Consent Handshake</h4>
            <p className="text-[11px] text-slate-500">Investigator B sends a collaboration request with an optional agency justification note.</p>
          </div>
          <div className="p-4 bg-[#F7FBFF] rounded-xl border border-[#DCE7F3] space-y-2">
            <span className="text-xs font-mono font-bold text-[#2563EB]">STEP 4</span>
            <h4 className="text-xs font-bold text-[#0F2747]">Shared Workspace</h4>
            <p className="text-[11px] text-slate-500">Upon acceptance, contact credentials unlock and a synchronized evidence workspace is formed.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
