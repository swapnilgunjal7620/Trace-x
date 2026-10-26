import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FolderKanban, 
  Search, 
  Filter, 
  Plus, 
  ArrowRight, 
  ArrowUpDown, 
  CheckCircle2, 
  Clock, 
  ShieldAlert,
  Wallet
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useForensics } from '../../context/ForensicsContext';
import { CaseStatus } from '../../types/forensics';

export const CasesPage: React.FC = () => {
  const navigate = useNavigate();
  const { cases, setActiveCaseId } = useForensics();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');

  const filteredCases = cases.filter((c) => {
    const matchesSearch = 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.initialSuspectAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.assignedLead.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (priorityFilter !== 'ALL' && c.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F2747]">Case Registry</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage, filter, and inspect registered cryptocurrency fraud complaints and fund traces.
          </p>
        </div>
        <Link
          to="/app/investigations/new"
          className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Case</span>
        </Link>
      </div>

      {/* Main List & Filters */}
      <Card>
        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by Case ID, title, wallet (0x...), or investigator..."
              className="w-full text-xs pl-9 pr-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-[#DCE7F3] rounded-lg text-xs font-medium text-slate-600 bg-white focus:outline-none focus:border-[#2563EB]"
            >
              <option value="ALL">Status: All</option>
              <option value="ACTIVE">Active</option>
              <option value="HIGH_PRIORITY">High Priority</option>
              <option value="OVERLAP_DETECTED">Overlap Detected</option>
              <option value="UNDER_REVIEW">Under Review</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-[#DCE7F3] rounded-lg text-xs font-medium text-slate-600 bg-white focus:outline-none focus:border-[#2563EB]"
            >
              <option value="ALL">Priority: All</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
            </select>
          </div>
        </div>

        {/* Case Dossiers Table */}
        <div className="border border-[#DCE7F3] rounded-xl overflow-x-auto bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7FBFF] text-slate-500 font-semibold border-b border-[#DCE7F3]">
              <tr>
                <th className="py-3 px-4 font-medium">Case Reference</th>
                <th className="py-3 px-4 font-medium">Title & Scope</th>
                <th className="py-3 px-3 font-medium">Target Suspect Address</th>
                <th className="py-3 px-3 font-medium">Status & Priority</th>
                <th className="py-3 px-4 font-medium text-right">Reported Loss</th>
                <th className="py-3 px-3 font-medium">Assigned Lead</th>
                <th className="py-3 px-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE7F3]/70">
              {filteredCases.length > 0 ? (
                filteredCases.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => {
                      setActiveCaseId(c.id);
                      navigate(`/app/cases/${c.id}`);
                    }}
                    className="hover:bg-[#F0F7FF]/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-[#1D4ED8]">
                      {c.id}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {c.complaintNumber}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-sans font-medium text-[#0F2747] max-w-xs">
                      <span className="line-clamp-1">{c.title}</span>
                      <span className="text-[11px] text-slate-400 font-normal block truncate">
                        {c.victimStatementExcerpt}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                      {c.initialSuspectAddress.slice(0, 10)}...{c.initialSuspectAddress.slice(-6)}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-col gap-1 items-start">
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                          c.status === 'OVERLAP_DETECTED' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          c.status === 'HIGH_PRIORITY' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                          'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          {c.status.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {c.priority} Tier
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">
                      <span className="font-bold text-[#0F2747] block">
                        {c.reportedAmount.toLocaleString()} {c.reportedToken}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        ${c.reportedFiatUsd.toLocaleString()} USD
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-sans text-xs">
                      <span className="block font-medium text-[#0F2747]">{c.assignedLead}</span>
                      <span className="text-[10px] text-slate-400">{c.agencyUnit}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline">
                        <span>Open Dossier</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-sans">
                    No cases match the selected search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
