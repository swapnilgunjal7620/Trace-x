import React from 'react';
import { 
  FolderKanban, 
  Database, 
  GitFork, 
  Share2, 
  Layers, 
  Activity, 
  FileText, 
  Bell, 
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';

export const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: FolderKanban,
      title: 'Formal Case Registry Dossiers',
      desc: 'Centralized registry indexing victim reports, intake documentation, associated blockchain identifiers, priority tiers, and assigned investigators.'
    },
    {
      icon: Database,
      title: 'Provider-Agnostic Normalization',
      desc: 'Decoupled adapter layer converting diverse raw RPC outputs (Ethereum, Polygon, BSC) into a unified, high-density transaction model.'
    },
    {
      icon: GitFork,
      title: 'Virtual Fund Trace (VFT) Engine',
      desc: 'Mathematical tracking of victim funds through complex splits and multi-source merges, isolating stolen funds from clean balances.'
    },
    {
      icon: Layers,
      title: 'Interactive Graph Visualizer',
      desc: 'Node-link topological canvas highlighting fund velocity, cluster hops, peeling chains, intermediary transit nodes, and exchange exit ramps.'
    },
    {
      icon: Activity,
      title: 'Explainable Rule-Based Risk',
      desc: 'Transparent risk assessment calculating velocity, fan-in/fan-out ratios, mixer interactions, and dormant address awakening with clear explanations.'
    },
    {
      icon: Share2,
      title: 'Privacy-Preserving Overlap Detection',
      desc: 'Automated cryptographic detection when multiple agencies track the same wallet, enabling mutual-consent collaboration and shared workspaces.'
    },
    {
      icon: Bell,
      title: 'Real-Time Investigative Alerts',
      desc: 'Instant notifications when tracked funds move to custodial VASPs, when new evidence is attached, or when co-investigators submit notes.'
    },
    {
      icon: FileText,
      title: 'Court-Ready Evidentiary Reports',
      desc: 'Exportable PDF, CSV, and JSON dossiers containing methodology disclosures, full transaction tables, VFT lineage proofs, and chain-of-custody hashes.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F2747] tracking-tight">
          Comprehensive Forensic Toolset
        </h1>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
          Every tool within TRACE-X is built specifically to address real challenges faced in crypto fraud analysis: peel chains, mixed balances, multi-jurisdiction overlaps, and judicial evidence standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <Card key={idx} className="p-6 space-y-3 hover:border-[#ADCFFF] transition-colors">
              <div className="p-2.5 bg-[#EAF4FF] text-[#1D4ED8] rounded-lg w-fit">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F2747]">{f.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
            </Card>
          );
        })}
      </div>

      <div className="bg-[#0F2747] rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">Inspect the live investigator console</h3>
          <p className="text-xs text-slate-300">
            Access case dossiers, topological graphs, and mathematical fund lineage tools.
          </p>
        </div>
        <Link
          to="/app/dashboard"
          className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-2 shrink-0 transition-colors shadow-xs"
        >
          <span>Open Investigator Console</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
