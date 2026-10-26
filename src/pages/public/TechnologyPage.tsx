import React from 'react';
import { Cpu, Server, Database, Code2, Zap } from 'lucide-react';
import { Card } from '../../components/common/Card';

export const TechnologyPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F2747] tracking-tight">
          Decoupled, Production-Grade Architecture
        </h1>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
          TRACE-X is engineered as a decoupled, multi-tier system with strict boundaries between presentation, orchestration, blockchain RPC ingestion, and mathematical forensic modeling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Frontend Presentation Layer" subtitle="React 19 + TypeScript + Vite + Tailwind CSS">
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <Code2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Strict Type Safety:</strong> Zero `any` policy for forensic data models, preventing runtime UI failures during high-stress operations.</span>
            </li>
            <li className="flex items-start gap-2">
              <Code2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Enterprise Design System:</strong> Light Blue + White + Navy tokens built for all-day operational use without visual fatigue.</span>
            </li>
            <li className="flex items-start gap-2">
              <Code2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Topological Graph Rendering:</strong> Force-directed node-link visualization with edge flow volume weights.</span>
            </li>
          </ul>
        </Card>

        <Card title="Orchestration & Backend Services" subtitle="Node.js + Express API Gateway">
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <Server className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Microservice Modules:</strong> Dedicated modules for Cases, Normalized Transactions, VFT Calculation, and Collaboration.</span>
            </li>
            <li className="flex items-start gap-2">
              <Server className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Session Security:</strong> Role-based access control (Lead Investigator, Forensic Analyst, Compliance Officer, Prosecutor).</span>
            </li>
            <li className="flex items-start gap-2">
              <Server className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Immutable Audit Trails:</strong> Automatic audit logging on every address inspection and evidence seal.</span>
            </li>
          </ul>
        </Card>

        <Card title="Data Persistence & Indexing" subtitle="Document Store with Compound Hash Indexes">
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <Database className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Indexed Wallets & Hashes:</strong> Fast compound lookups across millions of transaction hashes and wallet addresses.</span>
            </li>
            <li className="flex items-start gap-2">
              <Database className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>VFT Lineage Collections:</strong> Immutable parent-child documents modeling recursive provenance trees.</span>
            </li>
            <li className="flex items-start gap-2">
              <Database className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Evidence Checksum Vault:</strong> Permanent SHA-256 digests preserving court-verifiable chain of custody.</span>
            </li>
          </ul>
        </Card>

        <Card title="Blockchain Adapter Layer" subtitle="Public RPC Nodes & Decoupled Normalization">
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Ethereum First:</strong> Native support for EVM transfers, ERC-20 token logs, and internal contract executions.</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Pluggable Adapters:</strong> Extensible interface ready to ingest Polygon and BNB Smart Chain without refactoring core services.</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Non-Custodial Guarantee:</strong> Strictly read-only RPC querying. Never holds or requests private keys.</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
