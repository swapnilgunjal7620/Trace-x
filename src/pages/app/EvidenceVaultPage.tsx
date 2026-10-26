import React, { useState } from 'react';
import { FileCheck, Plus, Lock, Search, ShieldCheck, Download, Copy, Check } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { useForensics } from '../../context/ForensicsContext';
import { EvidenceHasherModal } from '../../components/forensics/EvidenceHasherModal';

export const EvidenceVaultPage: React.FC = () => {
  const { evidence, activeCaseId } = useForensics();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const filtered = evidence.filter(
    (e) => e.title.toLowerCase().includes(search.toLowerCase()) || e.sha256Hash.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F2747]">Evidence Vault & Chain of Custody</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically hashed judicial evidence records with immutable timestamps and custody logs.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Intake & Seal Evidence</span>
        </button>
      </div>

      <Card>
        <div className="mb-6 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search evidence title or SHA-256 hash..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="p-4 bg-[#F7FBFF] border border-[#DCE7F3] rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#1D4ED8] bg-[#EAF4FF] px-2 py-0.5 rounded border border-[#ADCFFF]">
                  {item.id}
                </span>
                {item.isSealed && (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> SEALED RECORD
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#0F2747]">{item.title}</h4>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">{item.fileName}</p>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-[#DCE7F3] space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="uppercase font-bold tracking-wider">SHA-256 Digest</span>
                  <button
                    onClick={() => handleCopy(item.sha256Hash)}
                    className="hover:text-[#2563EB] flex items-center gap-1"
                  >
                    {copiedHash === item.sha256Hash ? (
                      <span className="text-emerald-600 font-sans">Copied!</span>
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
                <p className="font-mono text-[10px] text-[#0F2747] break-all select-all leading-tight">
                  {item.sha256Hash}
                </p>
              </div>

              <div className="text-[11px] text-slate-500 space-y-1">
                <div>Case: <strong className="font-mono text-[#0F2747]">{item.caseId}</strong></div>
                <div>Recorded By: {item.uploadedBy}</div>
                <div>Date: {new Date(item.uploadedAt).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <EvidenceHasherModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        caseId={activeCaseId}
      />
    </div>
  );
};
