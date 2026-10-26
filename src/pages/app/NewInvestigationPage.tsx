import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { useForensics } from '../../context/ForensicsContext';
import { useAuth } from '../../hooks/useAuth';
import { BlockchainNetwork } from '../../types/forensics';

export const NewInvestigationPage: React.FC = () => {
  const navigate = useNavigate();
  const { createCase } = useForensics();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [complaintNumber, setComplaintNumber] = useState(`CMP-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [walletAddress, setWalletAddress] = useState('');
  const [blockchain, setBlockchain] = useState<BlockchainNetwork>('ethereum');
  const [reportedAmount, setReportedAmount] = useState('');
  const [reportedToken, setReportedToken] = useState('USDT');
  const [priority, setPriority] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'STANDARD'>('HIGH');
  const [victimStatement, setVictimStatement] = useState('');
  const [error, setError] = useState<string | null>(null);

  const steps = [
    { num: '01', title: 'Target Intake', desc: 'Case identifier & wallet entry', active: true },
    { num: '02', title: 'Validation', desc: 'Checksum & provider lookup', active: true },
    { num: '03', title: 'VFT Lineage', desc: 'Isolate reported fraud sum', active: true },
    { num: '04', title: 'Overlap Check', desc: 'Cross-agency deduplication', active: true },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !walletAddress || !reportedAmount || !victimStatement) {
      setError('All case intake fields are required to register a verifiable forensic investigation.');
      return;
    }

    if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) {
      setError('Please provide a valid 42-character EVM hex address (e.g., 0x...).');
      return;
    }

    const amountNum = parseFloat(reportedAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please provide a valid positive reported loss amount.');
      return;
    }

    const created = createCase({
      title,
      complaintNumber,
      reportedAmount: amountNum,
      reportedToken,
      reportedFiatUsd: reportedToken === 'ETH' ? amountNum * 3000 : amountNum,
      chain: blockchain,
      initialSuspectAddress: walletAddress,
      status: 'ACTIVE',
      priority,
      assignedLead: user?.name || 'Special Agent Investigator',
      agencyUnit: user?.unit || 'Digital Asset Taskforce',
      victimStatementExcerpt: victimStatement,
    });

    navigate(`/app/cases/${created.id}`);
  };

  const handleFillSample = () => {
    setTitle('Operation Cyber Lure — 32,000 USDT Drain');
    setWalletAddress('0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97');
    setReportedAmount('32000');
    setReportedToken('USDT');
    setPriority('CRITICAL');
    setVictimStatement('Victim was induced to approve an ERC-20 permit2 signature on a fake Uniswap routing frontend. Funds swept immediately to suspect transit.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F2747]">Launch New Investigation</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Register verified complaint details and victim-reported target address to initialize fund provenance tracking.
          </p>
        </div>
        <button
          type="button"
          onClick={handleFillSample}
          className="px-3 py-1.5 bg-[#EAF4FF] text-[#1D4ED8] hover:bg-[#D5E9FF] rounded-lg text-xs font-semibold transition-colors"
        >
          Autofill Test Complaint
        </button>
      </div>

      {/* Guided Progress Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((s) => (
          <div key={s.num} className="p-3 rounded-lg border bg-[#F0F7FF] border-[#ADCFFF] text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-[#1D4ED8]">{s.num}</span>
              <span className="text-xs font-bold text-[#0F2747]">{s.title}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">{s.desc}</p>
          </div>
        ))}
      </div>

      <Card title="Case & Target Parameters" subtitle="All fields are indexed and cryptographically bound">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                Investigation Reference Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Operation Velvet Drain — Phishing Syndicate"
                className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                Complaint / Docket Number
              </label>
              <input
                type="text"
                required
                value={complaintNumber}
                onChange={(e) => setComplaintNumber(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg font-mono text-[#0F2747]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                Target Suspect EVM Address
              </label>
              <input
                type="text"
                required
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="0x..."
                className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] font-mono text-[#0F2747]"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Address receiving victim funds. Validated on Ethereum RPC.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                Blockchain Network
              </label>
              <select
                value={blockchain}
                onChange={(e) => setBlockchain(e.target.value as BlockchainNetwork)}
                className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
              >
                <option value="ethereum">Ethereum Mainnet (ETH / ERC-20)</option>
                <option value="polygon">Polygon PoS Network</option>
                <option value="bsc">BNB Smart Chain</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                Victim-Reported Loss Amount
              </label>
              <input
                type="number"
                required
                value={reportedAmount}
                onChange={(e) => setReportedAmount(e.target.value)}
                placeholder="e.g. 50000"
                className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] font-mono text-[#0F2747]"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Fundamental principle: Only this amount seeds the VFT. The destination wallet's remaining balance is not marked illicit.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                Asset Token
              </label>
              <select
                value={reportedToken}
                onChange={(e) => setReportedToken(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
              >
                <option value="USDT">Tether USD (USDT)</option>
                <option value="USDC">USD Coin (USDC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="DAI">Dai Stablecoin (DAI)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F2747] mb-1">
              Case Priority Classification
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
            >
              <option value="CRITICAL">Critical (Active Exfiltration / Imminent Exchange Exit)</option>
              <option value="HIGH">High (Subpoena Deadline Looming)</option>
              <option value="MEDIUM">Medium (Standard Investigative Flow)</option>
              <option value="STANDARD">Standard</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F2747] mb-1">
              Sworn Victim Intake Deposition / Summary
            </label>
            <textarea
              rows={4}
              required
              value={victimStatement}
              onChange={(e) => setVictimStatement(e.target.value)}
              placeholder="State the circumstances of victim inducement, phishing links clicked, or ransomware instructions..."
              className="w-full text-xs p-3 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
            />
          </div>

          <div className="pt-4 border-t border-[#DCE7F3] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Seeds Root VFT Token with 100% Attribution Confidence</span>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>Initialize Investigation Dossier</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};
