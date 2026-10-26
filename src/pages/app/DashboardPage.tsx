import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FolderKanban, 
  Waypoints, 
  Share2, 
  Plus, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  DatabaseZap,
  Wallet
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useForensics } from '../../context/ForensicsContext';
import { useAuth } from '../../hooks/useAuth';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cases, transactions, vftNodes, overlaps, setActiveCaseId } = useForensics();

  const totalReportedLoss = cases.reduce((sum, c) => sum + c.reportedFiatUsd, 0);
  const pendingOverlaps = overlaps.filter((o) => o.status === 'PENDING_CONSENT');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F2747]">
            Investigator Operations Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time case intelligence, active fund lineages, and cross-agency deduplication alerts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/app/investigations/new"
            className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Investigation</span>
          </Link>
        </div>
      </div>

      {/* Cross-Agency Overlap Alert Banner */}
      {pendingOverlaps.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-900">
                  Privacy-Safe Address Overlap Detected ({pendingOverlaps.length})
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded text-amber-800 font-mono border border-amber-200">
                  MUTUAL CONSENT REQUIRED
                </span>
              </div>
              <p className="text-xs text-amber-800/90 mt-0.5">
                {pendingOverlaps[0].externalAgencyName} is investigating identical address{' '}
                <span className="font-mono font-semibold">{pendingOverlaps[0].targetAddress.slice(0, 10)}...</span>
              </p>
            </div>
          </div>
          <Link
            to="/app/collaboration"
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors flex items-center gap-1 shadow-xs"
          >
            <span>Review Overlap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Forensic KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Cases</span>
            <div className="p-2 bg-[#EAF4FF] text-[#1D4ED8] rounded-md">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-[#0F2747] font-mono tabular-nums">
              {cases.length}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              {cases.filter((c) => c.priority === 'CRITICAL' || c.priority === 'HIGH').length} flagged high priority
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Tracked Fraud Loss</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-md">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-[#0F2747] font-mono tabular-nums">
              ${(totalReportedLoss / 1000).toFixed(0)}k
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              Isolated victim complaint sums
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">VFT Lineage Nodes</span>
            <div className="p-2 bg-[#EAF4FF] text-[#1D4ED8] rounded-md">
              <Waypoints className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-[#0F2747] font-mono tabular-nums">
              {vftNodes.length}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              {vftNodes.filter((v) => v.isExitRamp).length} custodial exit ramps identified
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Overlap Alerts</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-md">
              <Share2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-[#0F2747] font-mono tabular-nums">
              {overlaps.length}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              {pendingOverlaps.length} pending mutual handshake
            </p>
          </div>
        </Card>
      </div>

      {/* Main Operational Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Cases Registry */}
        <div className="lg:col-span-2 space-y-4">
          <Card 
            title="Active Investigations Dossiers" 
            subtitle="Registered crypto fraud complaints under ongoing forensic tracing"
            action={
              <Link to="/app/cases" className="text-xs text-[#2563EB] font-semibold hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          >
            <div className="divide-y divide-[#DCE7F3]/70 -mx-5 -my-5">
              {cases.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setActiveCaseId(c.id);
                    navigate(`/app/cases/${c.id}`);
                  }}
                  className="p-5 hover:bg-[#F0F7FF]/50 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#1D4ED8] bg-[#EAF4FF] px-2 py-0.5 rounded border border-[#ADCFFF]">
                        {c.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        c.priority === 'CRITICAL' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                        c.priority === 'HIGH' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {c.priority} PRIORITY
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#0F2747] leading-snug">
                      {c.title}
                    </h4>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                      <span>Target: {c.initialSuspectAddress.slice(0, 10)}...</span>
                      <span>·</span>
                      <span>Assigned: {c.assignedLead}</span>
                    </div>
                  </div>

                  <div className="text-right sm:shrink-0">
                    <span className="text-sm font-extrabold text-[#0F2747] font-mono block tabular-nums">
                      {c.reportedAmount.toLocaleString()} {c.reportedToken}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      ${c.reportedFiatUsd.toLocaleString()} USD
                    </span>
                    <div className="mt-2 flex items-center justify-end gap-1 text-[11px] text-[#2563EB] font-semibold">
                      <span>Inspect Dossier</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar: Quick Actions & Live Trace Activity */}
        <div className="space-y-6">
          <Card title="Quick Investigative Tooling" subtitle="Direct forensic utilities">
            <div className="space-y-2 text-xs">
              <Link
                to="/app/investigations/new"
                className="w-full p-2.5 rounded-lg bg-[#F7FBFF] hover:bg-[#EAF4FF] border border-[#DCE7F3] flex items-center justify-between text-[#0F2747] font-semibold transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#2563EB]" />
                  <span>Launch New Investigation</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/app/wallet"
                className="w-full p-2.5 rounded-lg bg-[#F7FBFF] hover:bg-[#EAF4FF] border border-[#DCE7F3] flex items-center justify-between text-[#0F2747] font-semibold transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-[#2563EB]" />
                  <span>Wallet Deep Dive Explorer</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/app/graph"
                className="w-full p-2.5 rounded-lg bg-[#F7FBFF] hover:bg-[#EAF4FF] border border-[#DCE7F3] flex items-center justify-between text-[#0F2747] font-semibold transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Waypoints className="w-4 h-4 text-[#2563EB]" />
                  <span>Open Interactive Graph Canvas</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </Card>

          <Card title="Investigative Axioms" subtitle="Evidentiary operational rules">
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span><strong>Risk is not legal proof:</strong> Analytical lead only.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span><strong>Unknown ≠ Criminal:</strong> Unlabeled addresses are tagged as Unattributed.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span><strong>Wallet balance ≠ Fraud sum:</strong> VFT tracks only attributable portions.</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
