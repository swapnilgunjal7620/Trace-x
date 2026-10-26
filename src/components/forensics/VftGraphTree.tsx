import React, { useState } from 'react';
import { 
  Waypoints, 
  GitFork, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  ArrowRight, 
  ShieldCheck,
  Calculator,
  Building,
  Shuffle
} from 'lucide-react';
import { VFTNode, AttributionStrategy } from '../../types/forensics';
import { Badge } from '../common/Badge';
import { useForensics } from '../../context/ForensicsContext';

interface VftGraphTreeProps {
  nodes: VFTNode[];
  onSelectNode?: (node: VFTNode) => void;
}

export const VftGraphTree: React.FC<VftGraphTreeProps> = ({ nodes, onSelectNode }) => {
  const { simulateVftSplit } = useForensics();
  const [selectedNode, setSelectedNode] = useState<VFTNode>(nodes[0] || null);
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [destAddress, setDestAddress] = useState('');
  const [splitAmount, setSplitAmount] = useState('');
  const [strategy, setStrategy] = useState<AttributionStrategy>('DIRECT_MATCH');

  const rootNodes = nodes.filter((n) => !n.parentVftId);

  const getChildren = (parentId: string) => {
    return nodes.filter((n) => n.parentVftId === parentId);
  };

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNode || !destAddress || !splitAmount) return;

    const amt = parseFloat(splitAmount);
    if (isNaN(amt) || amt <= 0) return;

    simulateVftSplit({
      sourceVftId: selectedNode.id,
      splits: [
        {
          destinationAddress: destAddress,
          amount: amt,
          strategy,
        },
      ],
    });

    setDestAddress('');
    setSplitAmount('');
    setShowSimulateModal(false);
  };

  const renderNode = (node: VFTNode, depth: number = 0) => {
    const children = getChildren(node.id);
    const isSelected = selectedNode?.id === node.id;

    return (
      <div key={node.id} className="relative">
        <div 
          onClick={() => {
            setSelectedNode(node);
            if (onSelectNode) onSelectNode(node);
          }}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            isSelected 
              ? 'bg-[#F0F7FF] border-[#2563EB] shadow-sm ring-1 ring-[#2563EB]/30' 
              : 'bg-white border-[#DCE7F3] hover:border-[#ADCFFF]'
          } ${node.isExitRamp ? 'border-amber-300' : ''}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#1D4ED8] bg-[#EAF4FF] px-2 py-0.5 rounded border border-[#ADCFFF]">
                {node.tokenId}
              </span>
              <span className="text-xs text-slate-400">Hop {node.hopCount}</span>
              {node.isExitRamp && (
                <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-1.5 py-0.2 rounded border border-amber-200">
                  Exit Ramp Identified
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-[#0F2747]">
                ${node.amount.toLocaleString()} {node.tokenSymbol}
              </span>
            </div>
          </div>

          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#0F2747]">{node.entityName || 'Unattributed Node'}</span>
              <span className="text-[11px] font-mono text-slate-500">
                Confidence: {(node.confidenceScore * 100).toFixed(0)}% ({node.confidenceTier})
              </span>
            </div>
            <p className="font-mono text-[11px] text-slate-400 truncate">
              {node.walletAddress}
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-[#DCE7F3]/70 flex items-center justify-between text-[11px] text-slate-500">
            <span>Method: {node.attributionStrategy.replace('_', ' ')}</span>
            <span className="text-[#2563EB] hover:underline font-medium">Click to inspect math</span>
          </div>
        </div>

        {/* Downstream Child Nodes */}
        {children.length > 0 && (
          <div className="ml-8 mt-3 pl-4 border-l-2 border-[#DCE7F3] space-y-3 relative">
            <div className="absolute -left-2 top-3 w-4 h-0.5 bg-[#DCE7F3]" />
            {children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Visual Tree Column */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F2747]">Virtual Fund Trace (VFT) Lineage Tree</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tracks only victim-reported sums through downstream splits, merges, and exit gateways.
            </p>
          </div>
          <button
            onClick={() => setShowSimulateModal(true)}
            className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simulate Hop / Split</span>
          </button>
        </div>

        <div className="space-y-4">
          {rootNodes.map((root) => renderNode(root))}
        </div>
      </div>

      {/* Mathematical Detail Inspector */}
      <div className="space-y-4">
        <div className="bg-white border border-[#DCE7F3] rounded-xl p-5 shadow-xs space-y-4">
          <div className="border-b border-[#DCE7F3] pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#2563EB]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F2747]">
                Attribution Methodology
              </h4>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Mathematical proof recorded on token {selectedNode?.tokenId}.
            </p>
          </div>

          {selectedNode ? (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#F7FBFF] rounded-lg border border-[#DCE7F3] space-y-1">
                <span className="text-slate-400 font-medium">Attribution Strategy</span>
                <p className="font-bold text-[#0F2747]">{selectedNode.attributionStrategy}</p>
                <p className="text-[11px] text-slate-600 mt-1">
                  {selectedNode.attributionStrategy === 'DIRECT_MATCH' 
                    ? 'Transfer amount and timing window directly correlate with prior hop (<10 min delta, <2% fee variance).'
                    : 'Proportional fractional allocation based on suspect wallet co-mingled ratio at block height.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white border border-[#DCE7F3] rounded-lg">
                  <span className="text-slate-400 text-[11px]">Attributed Amount</span>
                  <p className="text-base font-extrabold text-[#0F2747] font-mono mt-0.5">
                    ${selectedNode.amount.toLocaleString()}
                  </p>
                  <span className="text-[10px] text-slate-500 font-sans">
                    {selectedNode.tokenSymbol} (100% Attributable)
                  </span>
                </div>

                <div className="p-3 bg-white border border-[#DCE7F3] rounded-lg">
                  <span className="text-slate-400 text-[11px]">Confidence Score</span>
                  <p className="text-base font-extrabold text-[#1D4ED8] font-mono mt-0.5">
                    {(selectedNode.confidenceScore * 100).toFixed(0)}%
                  </p>
                  <span className="text-[10px] text-emerald-700 font-sans font-medium">
                    Tier: {selectedNode.confidenceTier}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[11px] font-medium">Lineage Path Notes</span>
                <p className="p-2.5 bg-[#F0F5FA] rounded-md text-slate-700 text-xs leading-relaxed">
                  {selectedNode.notes}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[11px] font-medium">Source Transaction Hash</span>
                <p className="font-mono text-[11px] text-[#0F2747] break-all select-all bg-[#F7FBFF] p-2 rounded border border-[#DCE7F3]">
                  {selectedNode.sourceTxHash}
                </p>
              </div>

              {selectedNode.isExitRamp && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                    <Building className="w-3.5 h-3.5" />
                    <span>Subpoena Recommended</span>
                  </div>
                  <p className="text-[11px] text-amber-900 leading-snug">
                    This hop terminates at a registered centralized VASP. Prepare preservation order under 18 U.S.C. § 2703(f) for KYC account records.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400">Select a VFT token to view attribution proofs.</p>
          )}
        </div>
      </div>

      {/* Simulate Hop Modal */}
      {showSimulateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2747]/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-[#DCE7F3] w-full max-w-md p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#0F2747]">Simulate Downstream VFT Split</h3>
            <p className="text-xs text-slate-500">
              Split funds from parent token <strong>{selectedNode?.tokenId}</strong> (${selectedNode?.amount.toLocaleString()}) to test attribution models.
            </p>

            <form onSubmit={handleSimulate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                  Destination Wallet / Entity
                </label>
                <input
                  type="text"
                  required
                  value={destAddress}
                  onChange={(e) => setDestAddress(e.target.value)}
                  placeholder="0x... or Binance Deposit Hub"
                  className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] font-mono text-[#0F2747]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                  Split Amount ({selectedNode?.tokenSymbol})
                </label>
                <input
                  type="number"
                  required
                  max={selectedNode?.amount}
                  value={splitAmount}
                  onChange={(e) => setSplitAmount(e.target.value)}
                  placeholder="e.g. 15000"
                  className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] font-mono text-[#0F2747]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                  Attribution Heuristic Strategy
                </label>
                <select
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value as AttributionStrategy)}
                  className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
                >
                  <option value="DIRECT_MATCH">Direct Transfer Matching (High Confidence)</option>
                  <option value="PROPORTIONAL">Proportional Balance Allocation</option>
                  <option value="FIFO_CHRONOLOGICAL">FIFO Chronological Allocation</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#DCE7F3]">
                <button
                  type="button"
                  onClick={() => setShowSimulateModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-[#0F2747]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  Calculate Split
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
