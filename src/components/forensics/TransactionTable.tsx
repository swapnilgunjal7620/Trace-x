import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldAlert, 
  Copy, 
  Check, 
  ChevronRight,
  FileCheck,
  X
} from 'lucide-react';
import { NormalizedTransaction } from '../../types/forensics';
import { Badge } from '../common/Badge';
import { useForensics } from '../../context/ForensicsContext';

interface TransactionTableProps {
  transactions: NormalizedTransaction[];
  targetAddress?: string;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, targetAddress }) => {
  const { addEvidence, activeCaseId } = useForensics();
  const [filterType, setFilterType] = useState<'ALL' | 'INFLOW' | 'OUTFLOW' | 'SUSPECT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTx, setSelectedTx] = useState<NormalizedTransaction | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [evidenceSaved, setEvidenceSaved] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const filtered = transactions.filter((tx) => {
    const matchesSearch = 
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.fromAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.toAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.tokenSymbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tx.fromEntity && tx.fromEntity.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tx.toEntity && tx.toEntity.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterType === 'INFLOW') return tx.isSuspectInflow;
    if (filterType === 'OUTFLOW') return tx.isSuspectOutflow;
    if (filterType === 'SUSPECT') return tx.riskFlags.length > 0;
    return true;
  });

  const handleAttachEvidence = (tx: NormalizedTransaction) => {
    addEvidence({
      caseId: activeCaseId,
      title: `Transaction Evidence Snapshot [${tx.hash.slice(0, 10)}...]`,
      category: 'TX_SNAPSHOT',
      fileName: `tx_${tx.hash.slice(0, 12)}.json`,
      fileSizeBytes: 1420,
      sha256Hash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      uploadedBy: 'Analyst Investigator',
      notes: `Normalized ledger record for ${tx.value.toLocaleString()} ${tx.tokenSymbol} transfer at block ${tx.blockNumber}.`,
      isSealed: true,
    });
    setEvidenceSaved(true);
    setTimeout(() => setEvidenceSaved(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter hash, sender, recipient, method..."
            className="w-full text-xs pl-8 pr-3 py-1.5 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747] font-mono"
          />
        </div>

        {/* Segmented Filter Control */}
        <div className="flex items-center gap-1 p-1 bg-[#F0F5FA] rounded-lg text-xs font-medium shrink-0">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1 rounded-md transition-colors ${filterType === 'ALL' ? 'bg-white text-[#0F2747] shadow-xs font-semibold' : 'text-slate-600 hover:text-[#0F2747]'}`}
          >
            All Transfers ({transactions.length})
          </button>
          <button
            onClick={() => setFilterType('INFLOW')}
            className={`px-3 py-1 rounded-md transition-colors ${filterType === 'INFLOW' ? 'bg-white text-emerald-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-[#0F2747]'}`}
          >
            Inflow
          </button>
          <button
            onClick={() => setFilterType('OUTFLOW')}
            className={`px-3 py-1 rounded-md transition-colors ${filterType === 'OUTFLOW' ? 'bg-white text-rose-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-[#0F2747]'}`}
          >
            Outflow
          </button>
          <button
            onClick={() => setFilterType('SUSPECT')}
            className={`px-3 py-1 rounded-md transition-colors ${filterType === 'SUSPECT' ? 'bg-white text-[#1D4ED8] shadow-xs font-semibold' : 'text-slate-600 hover:text-[#0F2747]'}`}
          >
            Flagged Risk
          </button>
        </div>
      </div>

      {/* High-Density Ledger Table */}
      <div className="border border-[#DCE7F3] rounded-xl overflow-x-auto bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F7FBFF] text-slate-500 font-semibold border-b border-[#DCE7F3]">
            <tr>
              <th className="py-2.5 px-4 font-medium">Tx Hash</th>
              <th className="py-2.5 px-3 font-medium">Block</th>
              <th className="py-2.5 px-3 font-medium">Timestamp</th>
              <th className="py-2.5 px-3 font-medium">Direction</th>
              <th className="py-2.5 px-3 font-medium">Counterparty</th>
              <th className="py-2.5 px-4 font-medium text-right">Amount</th>
              <th className="py-2.5 px-3 font-medium">Risk Leads</th>
              <th className="py-2.5 px-3 font-medium text-center">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCE7F3]/70 font-mono">
            {filtered.length > 0 ? (
              filtered.map((tx) => (
                <tr 
                  key={tx.id} 
                  onClick={() => setSelectedTx(tx)}
                  className={`hover:bg-[#F0F7FF]/70 cursor-pointer transition-colors ${selectedTx?.id === tx.id ? 'bg-[#EAF4FF]/80' : ''}`}
                >
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-1.5 font-mono text-[#0F2747]">
                      <span>{tx.hash.slice(0, 10)}...{tx.hash.slice(-6)}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(tx.hash);
                        }}
                        className="text-slate-400 hover:text-[#2563EB]"
                        title="Copy hash"
                      >
                        {copiedHash === tx.hash ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 tabular-nums">
                    {tx.blockNumber}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 text-[11px] tabular-nums font-sans">
                    {new Date(tx.timestamp).toLocaleString(undefined, { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </td>
                  <td className="py-2.5 px-3">
                    {tx.isSuspectInflow ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-sans font-medium border border-emerald-200">
                        <ArrowDownLeft className="w-3 h-3" /> Inflow
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px] font-sans font-medium border border-rose-200">
                        <ArrowUpRight className="w-3 h-3" /> Outflow
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-sans text-xs">
                    <div className="max-w-xs truncate">
                      <span className="font-medium text-[#0F2747]">
                        {tx.isSuspectInflow ? (tx.fromEntity || tx.fromAddress.slice(0, 10) + '...') : (tx.toEntity || tx.toAddress.slice(0, 10) + '...')}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-4 text-right tabular-nums">
                    <span className="font-bold text-[#0F2747]">
                      {tx.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-slate-500 ml-1 text-[11px]">{tx.tokenSymbol}</span>
                  </td>
                  <td className="py-2.5 px-3 font-sans">
                    {tx.riskFlags.length > 0 ? (
                      <span className="text-amber-700 bg-amber-50 border border-amber-200 text-[11px] px-1.5 py-0.5 rounded">
                        {tx.riskFlags[0]}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Normal Transfer</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <ChevronRight className="w-4 h-4 text-slate-400 inline-block" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-10 text-center text-slate-500 font-sans">
                  No normalized transactions match the current filter parameters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Transaction Details Inspector Drawer */}
      {selectedTx && (
        <div className="bg-[#F7FBFF] border border-[#ADCFFF] rounded-xl p-5 space-y-4 shadow-sm animate-in fade-in duration-150">
          <div className="flex items-start justify-between border-b border-[#DCE7F3] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1D4ED8] bg-[#EAF4FF] px-2 py-0.5 rounded border border-[#ADCFFF]">
                  Transaction Inspector
                </span>
                <span className="text-xs font-mono text-slate-500">{selectedTx.hash}</span>
              </div>
              <h4 className="text-sm font-bold text-[#0F2747] mt-1">
                {selectedTx.value.toLocaleString()} {selectedTx.tokenSymbol} ({selectedTx.methodName})
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAttachEvidence(selectedTx)}
                disabled={evidenceSaved}
                className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:bg-emerald-600"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>{evidenceSaved ? 'Attached to Vault!' : 'Save as Evidence'}</span>
              </button>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-1.5 text-slate-400 hover:text-[#0F2747] rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-3 rounded-lg border border-[#DCE7F3] space-y-1">
              <span className="text-slate-400 font-medium">Origin Address</span>
              <p className="font-mono text-[#0F2747] break-all select-all">{selectedTx.fromAddress}</p>
              {selectedTx.fromEntity && (
                <span className="inline-block text-[11px] text-[#1D4ED8] font-sans font-medium mt-1">
                  Tag: {selectedTx.fromEntity}
                </span>
              )}
            </div>

            <div className="bg-white p-3 rounded-lg border border-[#DCE7F3] space-y-1">
              <span className="text-slate-400 font-medium">Destination Address</span>
              <p className="font-mono text-[#0F2747] break-all select-all">{selectedTx.toAddress}</p>
              {selectedTx.toEntity && (
                <span className="inline-block text-[11px] text-[#1D4ED8] font-sans font-medium mt-1">
                  Tag: {selectedTx.toEntity}
                </span>
              )}
            </div>

            <div className="bg-white p-3 rounded-lg border border-[#DCE7F3] space-y-1">
              <span className="text-slate-400 font-medium">VFT Lineage Linkage</span>
              {selectedTx.vftLineageId ? (
                <div>
                  <span className="font-mono font-bold text-[#1D4ED8]">{selectedTx.vftLineageId}</span>
                  <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                    Attributed downstream from complaint root.
                  </p>
                </div>
              ) : (
                <p className="text-slate-400 font-sans">No VFT token assigned yet.</p>
              )}
            </div>
          </div>

          {selectedTx.riskFlags.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <strong className="text-amber-800">Investigative Alert: </strong>
                <span className="text-slate-700">{selectedTx.riskFlags.join(' · ')}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
