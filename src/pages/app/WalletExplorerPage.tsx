import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Wallet, 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldAlert, 
  Activity, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Building,
  Waypoints,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useForensics } from '../../context/ForensicsContext';
import { TransactionTable } from '../../components/forensics/TransactionTable';
import { RiskScoreBreakdown } from '../../components/forensics/RiskScoreBreakdown';
import { VftGraphTree } from '../../components/forensics/VftGraphTree';

export const WalletExplorerPage: React.FC = () => {
  const { address } = useParams<{ address?: string }>();
  const navigate = useNavigate();
  const { getWallet, transactions, vftNodes } = useForensics();

  const defaultAddr = address || '0x71C8A9b1C67E7aE456A741d44081c569C894B732';
  const [searchInput, setSearchInput] = useState(defaultAddr);
  const [activeTab, setActiveTab] = useState<'TRANSACTIONS' | 'RISK' | 'VFT' | 'COUNTERPARTIES'>('TRANSACTIONS');
  const [copied, setCopied] = useState(false);

  const wallet = getWallet(defaultAddr);
  const walletTxs = transactions.filter(
    (t) => t.fromAddress.toLowerCase() === defaultAddr.toLowerCase() || t.toAddress.toLowerCase() === defaultAddr.toLowerCase()
  );
  const walletVfts = vftNodes.filter((v) => v.walletAddress.toLowerCase() === defaultAddr.toLowerCase());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    navigate(`/app/wallet/${searchInput.trim()}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(defaultAddr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F2747]">Wallet Deep Dive Explorer</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographic ledger profiling, token balance decomposition, and explainable risk analysis.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Inspect wallet address (0x...)"
            className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] font-mono text-[#0F2747] shadow-xs"
          />
        </form>
      </div>

      {/* Wallet Profile Card */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#DCE7F3] pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#0F2747] break-all select-all bg-[#F7FBFF] px-2.5 py-1 rounded border border-[#DCE7F3]">
                {wallet.address}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 text-slate-400 hover:text-[#2563EB] rounded bg-[#F7FBFF] border border-[#DCE7F3]"
                title="Copy address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <a
                href={`https://etherscan.io/address/${wallet.address}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-slate-400 hover:text-[#2563EB] rounded bg-[#F7FBFF] border border-[#DCE7F3]"
                title="View on Etherscan"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#1D4ED8] bg-[#EAF4FF] px-2 py-0.5 rounded border border-[#ADCFFF]">
                {wallet.entityLabel || 'Unattributed Entity'}
              </span>
              <span className="text-xs text-slate-500">
                Network: <strong className="text-[#0F2747] capitalize">{wallet.chain}</strong>
              </span>
              <span>·</span>
              <span className="text-xs text-slate-500">
                Tx Count: <strong className="text-[#0F2747] font-mono">{wallet.transactionCount}</strong>
              </span>
            </div>
          </div>

          {/* Balance & Risk Score */}
          <div className="flex items-center gap-6 lg:shrink-0">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Total Balance</span>
              <span className="text-xl font-extrabold text-[#0F2747] font-mono tabular-nums">
                ${wallet.totalBalanceUsd.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500 block font-mono">
                {wallet.nativeBalance} ETH
              </span>
            </div>

            <div className="border-l border-[#DCE7F3] pl-6">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Analytical Risk</span>
              <span className={`text-xl font-extrabold font-mono tabular-nums ${wallet.riskScore >= 75 ? 'text-rose-700' : 'text-[#0F2747]'}`}>
                {wallet.riskScore}<span className="text-xs text-slate-400 font-normal">/100</span>
              </span>
              <span className="text-[11px] font-bold block text-rose-700">
                {wallet.riskTier} LEAD
              </span>
            </div>
          </div>
        </div>

        {/* ERC-20 Asset Holdings */}
        <div className="mt-4 pt-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Discovered Token Balances
          </span>
          <div className="flex flex-wrap gap-2">
            {wallet.erc20Balances.map((token, idx) => (
              <div key={idx} className="bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg px-3 py-1.5 text-xs flex items-center gap-3">
                <span className="font-bold text-[#0F2747]">{token.symbol}</span>
                <span className="font-mono text-slate-600 tabular-nums">{token.amount.toLocaleString()}</span>
                <span className="font-mono text-[11px] text-slate-400">(${token.valueUsd.toLocaleString()})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Controls */}
        <div className="mt-6 pt-4 border-t border-[#DCE7F3] flex items-center gap-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('TRANSACTIONS')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'TRANSACTIONS' ? 'bg-[#EAF4FF] text-[#1D4ED8] font-bold border border-[#ADCFFF]' : 'text-slate-600 hover:text-[#0F2747]'
            }`}
          >
            Transaction History ({walletTxs.length})
          </button>
          <button
            onClick={() => setActiveTab('RISK')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'RISK' ? 'bg-[#EAF4FF] text-[#1D4ED8] font-bold border border-[#ADCFFF]' : 'text-slate-600 hover:text-[#0F2747]'
            }`}
          >
            Explainable Risk Signals
          </button>
          <button
            onClick={() => setActiveTab('VFT')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'VFT' ? 'bg-[#EAF4FF] text-[#1D4ED8] font-bold border border-[#ADCFFF]' : 'text-slate-600 hover:text-[#0F2747]'
            }`}
          >
            VFT Lineage Linkages ({walletVfts.length})
          </button>
          <button
            onClick={() => setActiveTab('COUNTERPARTIES')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'COUNTERPARTIES' ? 'bg-[#EAF4FF] text-[#1D4ED8] font-bold border border-[#ADCFFF]' : 'text-slate-600 hover:text-[#0F2747]'
            }`}
          >
            Counterparty Entities
          </button>
        </div>
      </Card>

      {/* Tab 1: TRANSACTIONS */}
      {activeTab === 'TRANSACTIONS' && (
        <Card title="Wallet On-Chain Ledgers" subtitle="Normalized transfer transactions">
          <TransactionTable transactions={walletTxs.length > 0 ? walletTxs : transactions} targetAddress={defaultAddr} />
        </Card>
      )}

      {/* Tab 2: RISK */}
      {activeTab === 'RISK' && (
        <RiskScoreBreakdown score={wallet.riskScore} walletAddress={defaultAddr} />
      )}

      {/* Tab 3: VFT */}
      {activeTab === 'VFT' && (
        <Card title="Virtual Fund Trace Presence" subtitle="Lineages traversing this wallet address">
          {walletVfts.length > 0 ? (
            <VftGraphTree nodes={walletVfts} />
          ) : (
            <div className="py-12 text-center space-y-2">
              <Waypoints className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">
                This wallet has not yet been linked to an active case VFT token.
              </p>
              <button
                onClick={() => navigate('/app/investigations/new')}
                className="text-xs font-semibold text-[#2563EB] hover:underline"
              >
                Launch Investigation Seeding This Address
              </button>
            </div>
          )}
        </Card>
      )}

      {/* Tab 4: COUNTERPARTIES */}
      {activeTab === 'COUNTERPARTIES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Top Funding Sources (Inflow)" subtitle="Addresses sending capital to this wallet">
            <div className="space-y-3">
              <div className="p-3 bg-[#F7FBFF] rounded-lg border border-[#DCE7F3] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#0F2747]">Victim Custodial Vault (Complainant)</span>
                  <p className="font-mono text-slate-400 text-[11px]">0x6B1754...1d0F</p>
                </div>
                <span className="font-mono font-bold text-emerald-700">+$50,000 USDT</span>
              </div>
            </div>
          </Card>

          <Card title="Downstream Transit Destinations (Outflow)" subtitle="Addresses receiving funds from this wallet">
            <div className="space-y-3">
              <div className="p-3 bg-[#F7FBFF] rounded-lg border border-[#DCE7F3] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#0F2747]">Peel Chain Transit #3</span>
                  <p className="font-mono text-slate-400 text-[11px]">0x4838B1...5f97</p>
                </div>
                <span className="font-mono font-bold text-rose-700">-$32,500 USDT</span>
              </div>
              <div className="p-3 bg-[#F7FBFF] rounded-lg border border-[#DCE7F3] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#0F2747]">Tornado.Cash 100 ETH Vault</span>
                  <p className="font-mono text-slate-400 text-[11px]">0x1da582...9b5a</p>
                </div>
                <span className="font-mono font-bold text-rose-700">-$17,500 USDT</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
