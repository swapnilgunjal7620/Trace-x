import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Layers, 
  ShieldAlert, 
  ArrowRight, 
  Building, 
  Shuffle, 
  Wallet, 
  ExternalLink,
  Info
} from 'lucide-react';
import { useForensics } from '../../context/ForensicsContext';
import { Badge } from '../common/Badge';

interface GraphNode {
  id: string;
  label: string;
  category: 'VICTIM' | 'SUSPECT' | 'PEEL' | 'MIXER' | 'EXCHANGE';
  x: number;
  y: number;
  balanceUsd: number;
  riskScore: number;
  tag: string;
}

interface GraphEdge {
  id: string;
  source: string;
  target: string;
  amount: number;
  token: string;
  txHash: string;
}

export const ForceGraphCanvas: React.FC = () => {
  const navigate = useNavigate();
  const { setActiveCaseId } = useForensics();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [minAmountFilter, setMinAmountFilter] = useState(0);

  const nodes: GraphNode[] = [
    {
      id: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      label: 'Victim Vault (Complainant)',
      category: 'VICTIM',
      x: 100,
      y: 220,
      balanceUsd: 1200,
      riskScore: 5,
      tag: 'Victim Source',
    },
    {
      id: '0x71C8A9b1C67E7aE456A741d44081c569C894B732',
      label: 'Suspect Transit Hub Alpha',
      category: 'SUSPECT',
      x: 320,
      y: 220,
      balanceUsd: 84320,
      riskScore: 88,
      tag: 'Suspect Root (VFT-001)',
    },
    {
      id: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
      label: 'Peel Chain Transit #3',
      category: 'PEEL',
      x: 540,
      y: 130,
      balanceUsd: 14200,
      riskScore: 74,
      tag: 'Peel Forwarder (VFT-001-A)',
    },
    {
      id: '0x1da5821544e25c636c1417ba96ade4cf6d2f9b5a',
      label: 'Tornado.Cash 100 ETH Vault',
      category: 'MIXER',
      x: 540,
      y: 330,
      balanceUsd: 31200000,
      riskScore: 96,
      tag: 'Mixer Gateway (VFT-001-B)',
    },
    {
      id: '0x28C6c06298d514Db089934071355E5743bf21d60',
      label: 'Binance: Hot Wallet 14',
      category: 'EXCHANGE',
      x: 780,
      y: 130,
      balanceUsd: 14850000,
      riskScore: 24,
      tag: 'Exit Ramp (VFT-001-A1)',
    },
    {
      id: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4df',
      label: 'Intermediate Transit Node #4',
      category: 'PEEL',
      x: 780,
      y: 250,
      balanceUsd: 4500,
      riskScore: 68,
      tag: 'Unattributed Transit',
    },
  ];

  const edges: GraphEdge[] = [
    {
      id: 'e1',
      source: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      target: '0x71C8A9b1C67E7aE456A741d44081c569C894B732',
      amount: 50000,
      token: 'USDT',
      txHash: '0x8f2a1b9487cd4e1a0b59381e4b3910c85012e731428905bce298137a892b1049',
    },
    {
      id: 'e2',
      source: '0x71C8A9b1C67E7aE456A741d44081c569C894B732',
      target: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
      amount: 32500,
      token: 'USDT',
      txHash: '0x3c9901ae456f91823bcda98012e4587fa9201832049182740192847593021948',
    },
    {
      id: 'e3',
      source: '0x71C8A9b1C67E7aE456A741d44081c569C894B732',
      target: '0x1da5821544e25c636c1417ba96ade4cf6d2f9b5a',
      amount: 17500,
      token: 'USDT',
      txHash: '0x9910248aef01827364b918204918274819203810294819284710293847192834',
    },
    {
      id: 'e4',
      source: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
      target: '0x28C6c06298d514Db089934071355E5743bf21d60',
      amount: 28000,
      token: 'USDT',
      txHash: '0x2294810293847102938471029384710293847102938471029384710293847102',
    },
    {
      id: 'e5',
      source: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
      target: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4df',
      amount: 4500,
      token: 'USDT',
      txHash: '0x7749102837491827364510293847102938471029384710293847102938471029',
    },
  ];

  const getNodeColor = (cat: GraphNode['category']) => {
    switch (cat) {
      case 'VICTIM':
        return { fill: '#ECFDF5', stroke: '#10B981', text: '#065F46' };
      case 'SUSPECT':
        return { fill: '#FEF2F2', stroke: '#EF4444', text: '#991B1B' };
      case 'MIXER':
        return { fill: '#FAF5FF', stroke: '#A855F7', text: '#6B21A8' };
      case 'EXCHANGE':
        return { fill: '#FFFBEB', stroke: '#F59E0B', text: '#92400E' };
      default:
        return { fill: '#EFF6FF', stroke: '#3B82F6', text: '#1E40AF' };
    }
  };

  const filteredEdges = edges.filter((e) => e.amount >= minAmountFilter);

  return (
    <div className="relative bg-white border border-[#DCE7F3] rounded-xl overflow-hidden shadow-xs">
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/95 backdrop-blur-xs p-1.5 rounded-lg border border-[#DCE7F3] shadow-xs text-xs">
        <span className="text-[11px] font-bold text-slate-500 uppercase px-2">Flow Controls:</span>
        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
          className="p-1.5 text-slate-600 hover:text-[#0F2747] hover:bg-[#F0F5FA] rounded"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.6))}
          className="p-1.5 text-slate-600 hover:text-[#0F2747] hover:bg-[#F0F5FA] rounded"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          className="p-1.5 text-slate-600 hover:text-[#0F2747] hover:bg-[#F0F5FA] rounded"
          title="Reset Zoom"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-[#DCE7F3]" />

        <div className="flex items-center gap-1.5 px-2">
          <span className="text-slate-500 text-[11px]">Min Flow:</span>
          <select
            value={minAmountFilter}
            onChange={(e) => setMinAmountFilter(Number(e.target.value))}
            className="bg-[#F7FBFF] border border-[#DCE7F3] rounded px-1.5 py-0.5 text-[11px] font-mono text-[#0F2747]"
          >
            <option value={0}>All Transfers ($0+)</option>
            <option value={10000}>&ge; $10,000</option>
            <option value={25000}>&ge; $25,000</option>
          </select>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-3 bg-white/95 backdrop-blur-xs px-3 py-2 rounded-lg border border-[#DCE7F3] text-[11px] shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-slate-600">Victim Origin</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span className="text-slate-600">Suspect Transit</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-slate-600">Peel Node</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
          <span className="text-slate-600">Anonymity Mixer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-slate-600">Exchange Exit Ramp</span>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="w-full h-[540px] bg-[#F7FBFF] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing">
        <svg
          viewBox="0 0 920 440"
          className="w-full h-full transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="22"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748B" />
            </marker>
            <marker
              id="arrowhead-active"
              markerWidth="10"
              markerHeight="7"
              refX="22"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#2563EB" />
            </marker>
          </defs>

          {/* Grid background dots */}
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#E2E8F0" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Edges */}
          {filteredEdges.map((edge) => {
            const sourceNode = nodes.find((n) => n.id === edge.source);
            const targetNode = nodes.find((n) => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            const isSelected = selectedNode?.id === edge.source || selectedNode?.id === edge.target;
            const midX = (sourceNode.x + targetNode.x) / 2;
            const midY = (sourceNode.y + targetNode.y) / 2;

            return (
              <g key={edge.id} className="cursor-pointer group">
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isSelected ? '#2563EB' : '#94A3B8'}
                  strokeWidth={Math.max(2, Math.min(edge.amount / 8000, 5))}
                  markerEnd={isSelected ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                  strokeDasharray={edge.token === 'MIXER' ? '4 3' : 'none'}
                  className="transition-colors"
                />
                {/* Edge Volume Pill */}
                <rect
                  x={midX - 32}
                  y={midY - 10}
                  width="64"
                  height="20"
                  rx="4"
                  fill="#FFFFFF"
                  stroke={isSelected ? '#2563EB' : '#DCE7F3'}
                  strokeWidth="1"
                />
                <text
                  x={midX}
                  y={midY + 4}
                  textAnchor="middle"
                  className="font-mono text-[10px] font-bold fill-[#0F2747] select-none"
                >
                  ${(edge.amount / 1000).toFixed(1)}k
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const colors = getNodeColor(node.category);
            const isSelected = selectedNode?.id === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer transition-transform duration-100 hover:scale-105"
              >
                {/* Outer Ring for Selected */}
                {isSelected && (
                  <circle
                    r="32"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    className="animate-spin-slow"
                  />
                )}

                {/* Node Circle */}
                <circle
                  r="24"
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={isSelected ? '3' : '2'}
                  className="shadow-sm"
                />

                {/* Center Icon/Letter */}
                <text
                  textAnchor="middle"
                  dy="5"
                  className="text-xs font-mono font-bold"
                  fill={colors.text}
                >
                  {node.category === 'EXCHANGE' ? 'CEX' : node.category === 'MIXER' ? 'MIX' : node.category.slice(0, 3)}
                </text>

                {/* Label text */}
                <text
                  y="38"
                  textAnchor="middle"
                  className="text-[11px] font-sans font-bold fill-[#0F2747]"
                >
                  {node.label}
                </text>
                <text
                  y="50"
                  textAnchor="middle"
                  className="text-[9px] font-mono fill-slate-500"
                >
                  ${(node.balanceUsd / 1000).toFixed(0)}k · Risk: {node.riskScore}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Inspector Drawer */}
      {selectedNode && (
        <div className="p-5 border-t border-[#DCE7F3] bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0F2747]">{selectedNode.label}</span>
              <span className="text-[10px] font-mono bg-[#EAF4FF] text-[#1D4ED8] px-1.5 py-0.2 rounded border border-[#ADCFFF]">
                {selectedNode.tag}
              </span>
            </div>
            <p className="font-mono text-xs text-slate-500 break-all select-all">
              {selectedNode.id}
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Current Balance</span>
              <span className="font-mono font-bold text-[#0F2747]">
                ${selectedNode.balanceUsd.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Analytical Risk</span>
              <span className={`font-mono font-bold ${selectedNode.riskScore >= 80 ? 'text-rose-700' : 'text-slate-700'}`}>
                {selectedNode.riskScore}/100
              </span>
            </div>

            <button
              onClick={() => navigate(`/app/wallet/${selectedNode.id}`)}
              className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Full Wallet Deep Dive</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
