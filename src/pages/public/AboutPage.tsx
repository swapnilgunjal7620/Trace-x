import React from 'react';
import { Shield, Scale, Users, FileCheck, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/common/Card';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF4FF] border border-[#ADCFFF] rounded-full text-xs font-semibold text-[#1D4ED8]">
          <Shield className="w-3.5 h-3.5" />
          <span>Mission & Governance</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F2747] tracking-tight">
          Purpose-Built Forensics for Real Judicial Outcomes
        </h1>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
          TRACE-X bridges the gap between chaotic on-chain transaction data and court-admissible financial evidence, replacing speculative heuristics with mathematically transparent fund tracing.
        </p>
      </div>

      {/* Core Philosophical Commitments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-3">
          <div className="w-10 h-10 bg-[#EAF4FF] text-[#1D4ED8] rounded-lg flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0F2747]">1. Risk Is Not Legal Proof</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Automated flags and risk scores are leads, not convictions. TRACE-X never claims a wallet is guilty based purely on automated heuristics. We preserve the distinction between an unverified lead and verified fact.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="w-10 h-10 bg-[#EAF4FF] text-[#1D4ED8] rounded-lg flex items-center justify-center">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0F2747]">2. Explainable Provenance</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every dollar or token tracked through a Virtual Fund Trace (VFT) includes a traceable mathematical formula—documenting whether funds were attributed chronologically, proportionally, or directly.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="w-10 h-10 bg-[#EAF4FF] text-[#1D4ED8] rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0F2747]">3. Privacy-First Collaboration</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Law enforcement agencies often unknowingly investigate the same criminal syndicate. TRACE-X facilitates privacy-safe overlap alerts with mutual consent, protecting investigator identity until authorized.
          </p>
        </Card>
      </div>

      {/* Target Audiences */}
      <Card title="Authorized Institutional Users" subtitle="Engineered specifically for certified institutional operators">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">Cyber Crime Units</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              State and national law enforcement tracking victim-reported deposits through peeling chains, mixer hops, and exchange deposit gateways.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">Financial Regulators</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Intelligence officers auditing suspicious transaction clusters, unlicensed money services businesses (MSBs), and non-compliant VASPs.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">Prosecutors & Counsel</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Attorneys requiring clean, timestamped evidentiary reports explaining how victim assets flowed to identified custodial endpoints.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">Institutional Compliance</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              AML teams at regulated exchanges assessing incoming funds without relying on opaque commercial black-box scores.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
