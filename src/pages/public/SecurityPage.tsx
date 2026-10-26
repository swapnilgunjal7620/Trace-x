import React from 'react';
import { ShieldCheck, Lock, Database } from 'lucide-react';
import { Card } from '../../components/common/Card';

export const SecurityPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF4FF] border border-[#ADCFFF] rounded-full text-xs font-semibold text-[#1D4ED8]">
          <Lock className="w-3.5 h-3.5" />
          <span>Security & Evidence Standards</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F2747] tracking-tight">
          Strict Evidentiary Standards & Non-Custodial Boundaries
        </h1>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
          TRACE-X is strictly an analytical and forensic intelligence platform. We adhere to rigorous security controls designed to protect sensitive investigations and operator safety.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Zero Custody Guarantee" subtitle="No private key or seed phrase handling">
          <p className="text-xs text-slate-600 leading-relaxed">
            TRACE-X never requests, ingests, or stores private keys, seed phrases, or wallet credentials. The platform operates exclusively on public blockchain ledgers and investigator-submitted case data. It is impossible for TRACE-X to initiate on-chain transactions or seize assets directly.
          </p>
        </Card>

        <Card title="Cryptographic Evidence Provenance" subtitle="SHA-256 hashing on all evidence records">
          <p className="text-xs text-slate-600 leading-relaxed">
            Every piece of evidence uploaded to a case (bank statements, victim emails, exchange subpoena responses) is hashed with SHA-256 upon intake. The hash and timestamp are permanently recorded in the case audit trail, preventing tampering.
          </p>
        </Card>

        <Card title="Operator Privacy Protection" subtitle="No public investigator directories">
          <p className="text-xs text-slate-600 leading-relaxed">
            Investigator contact information is never publicly queryable. Exact geographical locations are never tracked or exposed. Agency affiliations and professional emails are revealed only upon mutual consent during collaboration requests.
          </p>
        </Card>

        <Card title="Tamper-Evident Audit Logging" subtitle="Complete chain of custody records">
          <p className="text-xs text-slate-600 leading-relaxed">
            All system actions—from viewing an address to exporting a report or modifying a VFT lineage—are written to an append-only audit log collection. This ensures that every finding presented in court can be proven authentic.
          </p>
        </Card>
      </div>
    </div>
  );
};
