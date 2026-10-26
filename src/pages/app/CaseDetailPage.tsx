import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FolderKanban, 
  ArrowLeft, 
  Waypoints, 
  DatabaseZap, 
  FileCheck, 
  Share2, 
  History, 
  ShieldCheck, 
  Lock, 
  ExternalLink, 
  Plus, 
  FileText, 
  Copy, 
  Check,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useForensics } from '../../context/ForensicsContext';
import { VftGraphTree } from '../../components/forensics/VftGraphTree';
import { TransactionTable } from '../../components/forensics/TransactionTable';
import { EvidenceHasherModal } from '../../components/forensics/EvidenceHasherModal';

type CaseTab = 'OVERVIEW' | 'VFT_LINEAGE' | 'TRANSACTIONS' | 'EVIDENCE' | 'OVERLAPS' | 'AUDIT_LOG';

export const CaseDetailPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { cases, getCase, vftNodes, transactions, evidence, overlaps, respondToOverlap, auditLogs } = useForensics();

  const [activeTab, setActiveTab] = useState<CaseTab>('OVERVIEW');
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const currentCase = (caseId && getCase(caseId)) || cases[0];
  const caseVftNodes = vftNodes.filter((v) => v.caseId === currentCase?.id);
  const caseEvidence = evidence.filter((e) => e.caseId === currentCase?.id);
  const caseOverlaps = overlaps.filter((o) => o.localCaseId === currentCase?.id);
  const caseAudit = auditLogs.filter((a) => !a.caseId || a.caseId === currentCase?.id);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  if (!currentCase) {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="text-sm text-slate-500">Case dossier not found in registry.</p>
        <Link to="/app/cases" className="text-xs font-semibold text-[#2563EB] hover:underline">
          Return to Case Registry
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/app/cases" className="hover:text-[#0F2747] flex items-center gap-1 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Case Registry
        </Link>
        <span>/</span>
        <span className="font-mono text-[#0F2747] font-semibold">{currentCase.id}</span>
      </div>

      {/* Case Header Hero Box */}
      <div className="bg-white border border-[#DCE7F3] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs text-[#1D4ED8] bg-[#EAF4FF] px-2 py-0.5 rounded border border-[#ADCFFF]">
                {currentCase.id}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                currentCase.status === 'OVERLAP_DETECTED' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                currentCase.status === 'HIGH_PRIORITY' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                {currentCase.status.replace('_', ' ')}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Complaint: {currentCase.complaintNumber}
              </span>
            </div>

            <h1 className="text-xl font-extrabold text-[#0F2747] tracking-tight">
              {currentCase.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="font-medium text-[#0F2747]">Lead: {currentCase.assignedLead}</span>
              <span>·</span>
              <span>Unit: {currentCase.agencyUnit}</span>
              <span>·</span>
              <span>Registered: {new Date(currentCase.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Reported Amount Box & Quick Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:shrink-0">
            <div className="p-3 bg-[#F7FBFF] border border-[#DCE7F3] rounded-xl text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Victim-Reported Loss
              </span>
              <span className="text-xl font-extrabold text-[#0F2747] font-mono tabular-nums block">
                {currentCase.reportedAmount.toLocaleString()} {currentCase.reportedToken}
              </span>
              <span className="text-[11px] text-emerald-700 font-mono font-medium">
                ${currentCase.reportedFiatUsd.toLocaleString()} USD
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate(`/app/reports?case=${currentCase.id}`)}
                className="px-3.5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Compile Court Dossier</span>
              </button>
              <button
                onClick={() => navigate(`/app/wallet/${currentCase.initialSuspectAddress}`)}
                className="px-3.5 py-1.5 bg-[#F0F5FA] hover:bg-[#EAF4FF] text-[#0F2747] border border-[#DCE7F3] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Suspect Wallet Deep Dive</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="pt-4 border-t border-[#DCE7F3] flex items-center gap-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'OVERVIEW' ? 'bg-[#EAF4FF] text-[#1D4ED8] font-bold border border-[#ADCFFF]' : 'text-slate-600 hover:text-[#0F2747]'
            }`}
          >
            Intake Overview
          </button>
          <button
            onClick={() => setActiveTab('VFT_LINEAGE')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'VFT_LINEAGE' ? 'bg-[#EAF4FF] text-[#1D4ED8] font-bold border border-[#ADCFFF]' : 'text-slate-600 hover:text-[#0F2747]'
            }`}
          >
            VFT Lineage Engine ({caseVftNodes.length})
          </button>
          <button
            onClick={() => setActiveTab('TRANSACTIONS')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'TRANSACTIONS' ? 'bg-[#EAF4FF] text-[#1D4ED8] font-bold border border-[#ADCFFF]' : 'text-slate-600 hover:text-[#0F2747]'
            }`}
          >
            Normalized Ledgers ({transactions.length})
          </button>
          <button
            onClick={() => setActiveTab('EVIDENCE')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'EVIDENCE' ? 'bg-[#EAF4FF] text-[#1D4ED8] font-bold border border-[#ADCFFF]' : 'text-slate-600 hover:text-[#0F2747]'
            }`}
          >
            Evidence Vault ({caseEvidence.length})
          </button>
          <button
            onClick={() => setActiveTab('OVERLAPS')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'OVERLAPS' ? 'bg-[#EAF4FF] text-[#1D4ED8] font-bold border border-[#ADCFFF]' : 'text-slate-600 hover:text-[#0F2747]'
            }`}
          >
            <span>Cross-Agency Overlaps</span>
            {caseOverlaps.length > 0 && (
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 rounded">
                {caseOverlaps.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('AUDIT_LOG')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'AUDIT_LOG' ? 'bg-[#EAF4FF] text-[#1D4ED8] font-bold border border-[#ADCFFF]' : 'text-slate-600 hover:text-[#0F2747]'
            }`}
          >
            Chain of Custody Logs
          </button>
        </div>
      </div>

      {/* Tab 1: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card title="Victim Complaint & Initial Intake Statement" subtitle="Original sworn intake deposition">
              <p className="text-xs text-slate-700 leading-relaxed bg-[#F7FBFF] p-4 rounded-lg border border-[#DCE7F3] font-sans">
                "{currentCase.victimStatementExcerpt}"
              </p>
              <div className="mt-4 pt-4 border-t border-[#DCE7F3] flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                <span>Complaint Reference: <strong>{currentCase.complaintNumber}</strong></span>
                <span>Jurisdictional Network: <strong>Ethereum Mainnet (EVM)</strong></span>
              </div>
            </Card>

            <Card title="Tracked Suspect Wallets" subtitle="Monitored in this case's scope">
              <div className="space-y-2">
                {currentCase.trackedWallets.map((addr, idx) => (
                  <div key={idx} className="p-3 bg-[#F7FBFF] rounded-lg border border-[#DCE7F3] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#1D4ED8]">#{idx + 1}</span>
                      <span className="font-mono text-[#0F2747]">{addr}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(addr)}
                        className="text-slate-400 hover:text-[#2563EB]"
                        title="Copy address"
                      >
                        {copiedText === addr ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => navigate(`/app/wallet/${addr}`)}
                        className="text-xs font-semibold text-[#2563EB] hover:underline"
                      >
                        Deep Dive
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Evidentiary Guardrails" subtitle="Investigative requirements">
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span><strong>Reported Amount Isolated:</strong> VFT strictly tracks the {currentCase.reportedAmount.toLocaleString()} {currentCase.reportedToken}.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span><strong>Zero Commingled Contamination:</strong> Balance outside of the trace seed is preserved as non-illicit until proven.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span><strong>Subpoena Threshold:</strong> Exit ramps to centralized exchanges flagged for 18 U.S.C. preservation orders.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      )}

      {/* Tab 2: VFT LINEAGE */}
      {activeTab === 'VFT_LINEAGE' && (
        <Card>
          <VftGraphTree nodes={caseVftNodes} />
        </Card>
      )}

      {/* Tab 3: TRANSACTIONS */}
      {activeTab === 'TRANSACTIONS' && (
        <Card title="Normalized Case Transaction Ledgers" subtitle="Standardized on-chain transfer logs">
          <TransactionTable transactions={transactions} />
        </Card>
      )}

      {/* Tab 4: EVIDENCE */}
      {activeTab === 'EVIDENCE' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0F2747]">Case Evidence Vault</h3>
              <p className="text-xs text-slate-500">Cryptographically hashed documents and forensic disclosures.</p>
            </div>
            <button
              onClick={() => setShowEvidenceModal(true)}
              className="px-3.5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Attach & Seal Evidence</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {caseEvidence.map((ev) => (
              <Card key={ev.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono font-bold bg-[#EAF4FF] text-[#1D4ED8] px-2 py-0.5 rounded border border-[#ADCFFF]">
                    {ev.id}
                  </span>
                  {ev.isSealed && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> SEALED
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#0F2747]">{ev.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{ev.fileName}</p>
                </div>

                <div className="p-2 bg-[#F7FBFF] rounded border border-[#DCE7F3] space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">SHA-256 Digest:</span>
                  <p className="font-mono text-[10px] text-slate-700 break-all select-all leading-tight">
                    {ev.sha256Hash}
                  </p>
                </div>

                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Uploaded by: {ev.uploadedBy}</span>
                  <span>{(ev.fileSizeBytes / 1024).toFixed(0)} KB</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: OVERLAPS */}
      {activeTab === 'OVERLAPS' && (
        <Card title="Cross-Agency Address Deduplication" subtitle="Privacy-preserving collaboration requests">
          {caseOverlaps.length > 0 ? (
            <div className="space-y-4">
              {caseOverlaps.map((ov) => (
                <div key={ov.id} className="p-5 bg-[#F7FBFF] border border-[#ADCFFF] rounded-xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-[#0F2747]">
                        Identical Target Address Detected: {ov.targetAddress.slice(0, 12)}...
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      ov.status === 'MUTUAL_CONSENT_GRANTED' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {ov.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Requesting Agency:</strong> {ov.externalAgencyName} ({ov.requestedBy})
                  </p>
                  <p className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-[#DCE7F3]">
                    "{ov.justificationNotes}"
                  </p>

                  {ov.status === 'PENDING_CONSENT' ? (
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => respondToOverlap(ov.id, true)}
                        className="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold shadow-xs"
                      >
                        Grant Mutual Consent & Unlock Contacts
                      </button>
                      <button
                        onClick={() => respondToOverlap(ov.id, false)}
                        className="px-3 py-1.5 bg-white border border-[#DCE7F3] text-slate-600 hover:text-rose-600 rounded-lg text-xs font-semibold"
                      >
                        Decline
                      </button>
                    </div>
                  ) : ov.unlockedContact ? (
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-slate-700 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                        <UserCheck className="w-4 h-4" />
                        <span>Unlocked Inter-Agency Contact Dossier</span>
                      </div>
                      <p>Lead Contact: <strong>{ov.unlockedContact.name}</strong> ({ov.unlockedContact.unit})</p>
                      <p>Email: <a href={`mailto:${ov.unlockedContact.email}`} className="text-[#2563EB] hover:underline">{ov.unlockedContact.email}</a> · Phone: {ov.unlockedContact.phone}</p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-6 text-center">
              No cross-agency address overlaps detected for this case.
            </p>
          )}
        </Card>
      )}

      {/* Tab 6: AUDIT LOG */}
      {activeTab === 'AUDIT_LOG' && (
        <Card title="Chain of Custody Immutable Audit Trail" subtitle="Append-only record of case access and evidence linkage">
          <div className="divide-y divide-[#DCE7F3]/70 font-mono text-xs">
            {caseAudit.map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1D4ED8]">{log.actionType}</span>
                    <span className="text-slate-400 text-[10px]">by {log.operatorName}</span>
                  </div>
                  <p className="font-sans text-xs text-slate-600">{log.details}</p>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Evidence Intake Modal */}
      <EvidenceHasherModal
        isOpen={showEvidenceModal}
        onClose={() => setShowEvidenceModal(false)}
        caseId={currentCase.id}
      />
    </div>
  );
};
