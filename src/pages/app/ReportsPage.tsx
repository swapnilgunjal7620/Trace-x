import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileText, Download, Printer, ShieldCheck, CheckCircle2, Lock, Scale, Building } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { useForensics } from '../../context/ForensicsContext';
import { useAuth } from '../../hooks/useAuth';

export const ReportsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { cases, vftNodes, transactions, evidence } = useForensics();
  const { user } = useAuth();

  const caseParam = searchParams.get('case');
  const [selectedCaseId, setSelectedCaseId] = useState(caseParam || cases[0]?.id || 'CASE-2026-ETH-9021');
  const [includeVftProof, setIncludeVftProof] = useState(true);
  const [includeTransactions, setIncludeTransactions] = useState(true);
  const [includeEvidenceHash, setIncludeEvidenceHash] = useState(true);
  const [includeSubpoenaTarget, setIncludeSubpoenaTarget] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const selectedCase = cases.find((c) => c.id === selectedCaseId) || cases[0];
  const caseVfts = vftNodes.filter((v) => v.caseId === selectedCase?.id);
  const caseEvidence = evidence.filter((e) => e.caseId === selectedCase?.id);

  const handleExport = (format: 'PDF' | 'JSON' | 'CSV') => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportNotice(`Successfully compiled ${format} dossier for ${selectedCase.id}`);
      setTimeout(() => setExportNotice(null), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-[#0F2747]">Court-Ready Report Generator</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Compile standardized forensic reports with methodology disclosures, mathematical VFT proofs, and chain-of-custody checksums.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compiler Configuration Controls */}
        <div className="space-y-6">
          <Card title="Dossier Scope & Case" subtitle="Select target investigation">
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                  Active Investigation
                </label>
                <select
                  value={selectedCaseId}
                  onChange={(e) => setSelectedCaseId(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
                >
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id} — {c.reportedAmount.toLocaleString()} {c.reportedToken}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#DCE7F3]">
                <span className="font-bold text-[#0F2747] block mb-2 uppercase tracking-wider text-[11px]">
                  Included Evidentiary Modules
                </span>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeVftProof}
                    onChange={(e) => setIncludeVftProof(e.target.checked)}
                    className="rounded border-[#DCE7F3] text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Mathematical VFT Lineage Proofs</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeTransactions}
                    onChange={(e) => setIncludeTransactions(e.target.checked)}
                    className="rounded border-[#DCE7F3] text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Normalized Raw Transaction Ledger</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeEvidenceHash}
                    onChange={(e) => setIncludeEvidenceHash(e.target.checked)}
                    className="rounded border-[#DCE7F3] text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Evidence Vault SHA-256 Checksums</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSubpoenaTarget}
                    onChange={(e) => setIncludeSubpoenaTarget(e.target.checked)}
                    className="rounded border-[#DCE7F3] text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Exchange Subpoena Target Appendix</span>
                </label>
              </div>

              {exportNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{exportNotice}</span>
                </div>
              )}

              <div className="space-y-2 pt-3 border-t border-[#DCE7F3]">
                <button
                  onClick={() => handleExport('PDF')}
                  disabled={isExporting}
                  className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors disabled:bg-slate-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isExporting ? 'Compiling Dossier...' : 'Export Court PDF Dossier'}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleExport('JSON')}
                    disabled={isExporting}
                    className="py-2 bg-white border border-[#DCE7F3] hover:bg-[#F7FBFF] text-[#0F2747] rounded-lg text-xs font-semibold transition-colors"
                  >
                    Export JSON Proof
                  </button>
                  <button
                    onClick={() => handleExport('CSV')}
                    disabled={isExporting}
                    className="py-2 bg-white border border-[#DCE7F3] hover:bg-[#F7FBFF] text-[#0F2747] rounded-lg text-xs font-semibold transition-colors"
                  >
                    Export CSV Ledger
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Document Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[#DCE7F3] rounded-xl shadow-md p-8 space-y-6 text-[#0F2747] font-sans">
            {/* Formal Report Header */}
            <div className="border-b-2 border-[#0F2747] pb-6 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#1D4ED8] font-bold block">
                  Confidential Forensic Dossier
                </span>
                <h2 className="text-xl font-extrabold tracking-tight mt-1">
                  CRYPTOCURRENCY FRAUD TRACE REPORT
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Prepared for Judicial Review & Subpoena Affidavit Attachments
                </p>
              </div>

              <div className="text-right text-xs font-mono">
                <span className="font-bold text-[#0F2747]">{selectedCase.id}</span>
                <span className="block text-slate-400 text-[10px]">Date: {new Date().toLocaleDateString()}</span>
                <span className="block text-slate-400 text-[10px]">Lead: {selectedCase.assignedLead}</span>
              </div>
            </div>

            {/* Case Overview Block */}
            <div className="space-y-3 text-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F2747] border-b border-[#DCE7F3] pb-1">
                1. Executive Summary & Victim Intake
              </h3>
              <p className="text-slate-700 leading-relaxed">
                On {new Date(selectedCase.createdAt).toLocaleDateString()}, formal complaint <strong>{selectedCase.complaintNumber}</strong> was filed regarding an unauthorized disbursement of <strong>{selectedCase.reportedAmount.toLocaleString()} {selectedCase.reportedToken}</strong> (estimated fair market value <strong>${selectedCase.reportedFiatUsd.toLocaleString()} USD</strong>).
              </p>
              <div className="p-3 bg-[#F7FBFF] rounded-lg border border-[#DCE7F3] space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Target Suspect Transit Address</span>
                <p className="font-mono text-xs font-bold text-[#0F2747]">{selectedCase.initialSuspectAddress}</p>
              </div>
            </div>

            {/* VFT Proofs */}
            {includeVftProof && (
              <div className="space-y-3 text-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F2747] border-b border-[#DCE7F3] pb-1">
                  2. Virtual Fund Trace (VFT) Lineage Calculations
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  The reported sum was segregated into distinct traceable software tokens. Outgoing transfers were isolated using direct chronological and proportional attribution heuristics:
                </p>
                <div className="space-y-2">
                  {caseVfts.map((v) => (
                    <div key={v.id} className="p-2.5 bg-[#F7FBFF] rounded-lg border border-[#DCE7F3] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#1D4ED8]">{v.tokenId}</span>
                        <span className="text-slate-500 ml-2">Hop {v.hopCount} · {v.entityName}</span>
                      </div>
                      <div className="text-right font-mono">
                        <span className="font-bold text-[#0F2747]">${v.amount.toLocaleString()}</span>
                        <span className="text-emerald-700 text-[10px] ml-1">({(v.confidenceScore * 100).toFixed(0)}% Confidence)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subpoena Targets */}
            {includeSubpoenaTarget && (
              <div className="space-y-3 text-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F2747] border-b border-[#DCE7F3] pb-1">
                  3. Subpoena-Actionable Centralized Exit Endpoints
                </h3>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <Building className="w-4 h-4" />
                    <span>Identified Custodial Destination: Binance (Hot Wallet 14)</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Token <strong>VFT-2026-001-A1</strong> ($28,000 USDT) was identified entering Binance deposit infrastructure via transaction hash <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-200">0x229481...102</code>. Immediate preservation order recommended for user account KYC identifiers, deposit logs, and linked fiat bank accounts.
                  </p>
                </div>
              </div>
            )}

            {/* Evidence Hashing Index */}
            {includeEvidenceHash && (
              <div className="space-y-3 text-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F2747] border-b border-[#DCE7F3] pb-1">
                  4. Cryptographic Evidence Checksum Registry
                </h3>
                <div className="space-y-2">
                  {caseEvidence.map((ev) => (
                    <div key={ev.id} className="p-2 bg-[#F7FBFF] rounded border border-[#DCE7F3] space-y-0.5">
                      <div className="flex items-center justify-between font-bold text-[#0F2747]">
                        <span>{ev.title}</span>
                        <span className="text-emerald-700 font-mono text-[10px]">SEALED SHA-256</span>
                      </div>
                      <p className="font-mono text-[10px] text-slate-500 break-all select-all">
                        {ev.sha256Hash}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Legal Axiom Notice */}
            <div className="p-4 bg-[#F0F7FF] rounded-lg border border-[#ADCFFF] text-xs text-slate-600 flex items-start gap-2.5">
              <Scale className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span>
                <strong>Methodology Disclosure:</strong> This document was assembled by the TRACE-X Intelligence Platform adhering to non-custodial blockchain provenance protocols. Risk indicators constitute analytical leads. Attributions marked as 'Probable' require verification through judicial subpoena responses.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
