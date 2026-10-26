import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  GitFork, 
  FileSearch, 
  Users2, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Waypoints, 
  Activity, 
  Building,
  Scale
} from 'lucide-react';
import { Card } from '../../components/common/Card';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF4FF] border border-[#ADCFFF] rounded-full text-xs font-semibold text-[#1D4ED8]">
          <Shield className="w-3.5 h-3.5" />
          <span>Enterprise Forensic Intelligence Platform</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F2747] tracking-tight leading-tight max-w-4xl mx-auto">
          Intelligent Crypto Fraud Investigation & Fund Provenance Tracing
        </h1>

        <p className="text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Reconstruct stolen fund lineages through mathematical Virtual Fund Traces (VFT), detect overlapping cross-agency cases, and collaborate with verified investigators under strict privacy and evidentiary guarantees.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            to="/app/dashboard"
            className="px-6 py-3 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <span>Launch Investigator Console</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/technology"
            className="px-6 py-3 rounded-lg bg-white border border-[#DCE7F3] text-[#0F2747] font-semibold text-xs hover:bg-[#F0F5FA] transition-colors"
          >
            Inspect System Architecture
          </Link>
        </div>

        {/* Clean metadata strip */}
        <div className="pt-4 flex items-center justify-center gap-3 text-xs text-slate-500">
          <span>Non-Custodial</span>
          <span aria-hidden="true">·</span>
          <span>Zero Private Key Ingestion</span>
          <span aria-hidden="true">·</span>
          <span>Court-Admissible Provenance</span>
          <span aria-hidden="true">·</span>
          <span>EVM Multi-Chain</span>
        </div>
      </section>

      {/* Conceptual Workflow Diagram */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-b from-white to-[#F0F7FF]/50 border border-[#DCE7F3] rounded-2xl p-8 shadow-xs space-y-8">
          <div className="text-center space-y-1">
            <h2 className="text-xs font-bold text-[#1D4ED8] tracking-wider uppercase">
              End-to-End Forensic Workflow
            </h2>
            <p className="text-xl font-bold text-[#0F2747]">
              From Victim Complaint to Subpoena Enforcement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#DCE7F3] shadow-xs space-y-2">
              <span className="text-xs font-bold font-mono text-[#2563EB]">01. INTAKE</span>
              <h3 className="text-sm font-bold text-[#0F2747]">Wallet Target Isolation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Victim complaint recorded. The reported sum is isolated as the trace seed—the suspect's total wallet balance is never assumed wholly fraudulent.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#DCE7F3] shadow-xs space-y-2">
              <span className="text-xs font-bold font-mono text-[#2563EB]">02. NORMALIZATION</span>
              <h3 className="text-sm font-bold text-[#0F2747]">Ledger Ingestion</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                RPC blocks ingested and normalized into high-density transfer schemas, resolving ERC-20 token contracts and native coin executions.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#DCE7F3] shadow-xs space-y-2">
              <span className="text-xs font-bold font-mono text-[#2563EB]">03. VFT ENGINE</span>
              <h3 className="text-sm font-bold text-[#0F2747]">Lineage Reconstruction</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Downstream peeling chains tracked via parent-child VFT tokens, preserving mathematical fractions across splits and merges.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#DCE7F3] shadow-xs space-y-2">
              <span className="text-xs font-bold font-mono text-[#2563EB]">04. COLLABORATION</span>
              <h3 className="text-sm font-bold text-[#0F2747]">Cross-Agency Handshake</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Privacy-preserving overlap detection triggers mutual consent alerts, connecting investigators targeting the same crime syndicate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-1">
          <h2 className="text-xs font-bold text-[#1D4ED8] tracking-wider uppercase">
            Investigative Rigor
          </h2>
          <p className="text-2xl font-bold text-[#0F2747]">
            Built to Evidentiary Standards, Not Commercial Black-Boxes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#EAF4FF] text-[#1D4ED8] flex items-center justify-center">
              <Waypoints className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F2747]">Virtual Fund Trace (VFT)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Maintains full lineage metadata across splits, merges, and partial hops without falsely assuming an entire wallet balance consists of illicit proceeds.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#EAF4FF] text-[#1D4ED8] flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F2747]">Explainable Risk Indicators</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every risk marker and attribution confidence metric is grounded in explicit transaction mechanics (velocity, fan-out, mixer proximity) rather than opaque scores.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#EAF4FF] text-[#1D4ED8] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F2747]">Privacy-Safe Overlap</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When two taskforces investigate the same target address, mutual consent is enforced before exposing contact information or confidential case dossiers.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};
