import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, ShieldCheck, ChevronDown, LogOut, Check, ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useAuth } from '../../hooks/useAuth';
import { useForensics } from '../../context/ForensicsContext';

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, switchDemoProfile } = useAuth();
  const { cases, activeCaseId, setActiveCaseId, overlaps } = useForensics();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim();
    // Check if EVM address
    if (query.startsWith('0x') && query.length === 42) {
      navigate(`/app/wallet/${query}`);
    } else if (query.startsWith('CASE-') || query.startsWith('CMP-')) {
      navigate(`/app/cases/${query}`);
    } else if (query.startsWith('0x') && query.length === 66) {
      navigate(`/app/transactions?hash=${query}`);
    } else {
      navigate(`/app/cases?search=${encodeURIComponent(query)}`);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const currentCase = cases.find((c) => c.id === activeCaseId) || cases[0];
  const pendingOverlaps = overlaps.filter((o) => o.status === 'PENDING_CONSENT');

  return (
    <header className="h-16 bg-white border-b border-[#DCE7F3] px-6 flex items-center justify-between sticky top-0 z-20 gap-4">
      {/* Search Input & Quick Case Selector */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search wallet (0x...), case ID, tx hash..."
            className="w-full text-xs pl-9 pr-8 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] focus:bg-white text-[#0F2747] placeholder-slate-400 font-mono transition-colors"
          />
          {searchQuery && (
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2563EB]"
              title="Search"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {/* Active Case Selector Pill */}
        <div className="hidden xl:flex items-center gap-2 border-l border-[#DCE7F3] pl-4 text-xs">
          <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Active Case:</span>
          <select
            value={activeCaseId}
            onChange={(e) => {
              setActiveCaseId(e.target.value);
              navigate(`/app/cases/${e.target.value}`);
            }}
            className="bg-[#F0F7FF] text-[#1D4ED8] border border-[#ADCFFF] rounded-md px-2 py-1 text-xs font-mono font-medium cursor-pointer focus:outline-none"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} — {c.reportedAmount.toLocaleString()} {c.reportedToken}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right Controls: Notifications & Operator Profile */}
      <div className="flex items-center gap-3">
        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 text-slate-500 hover:text-[#0F2747] hover:bg-[#F0F5FA] rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {pendingOverlaps.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2563EB] rounded-full" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#DCE7F3] rounded-xl shadow-lg py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-[#DCE7F3] flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F2747]">Operational Alerts</span>
                <span className="text-[10px] text-slate-500 font-mono">{pendingOverlaps.length} pending</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-[#DCE7F3]/50">
                {pendingOverlaps.length > 0 ? (
                  pendingOverlaps.map((ov) => (
                    <div 
                      key={ov.id} 
                      className="p-3 hover:bg-[#F7FBFF] cursor-pointer transition-colors"
                      onClick={() => {
                        setNotifOpen(false);
                        navigate('/app/collaboration');
                      }}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                          Cross-Agency Overlap
                        </span>
                        <span className="text-slate-400">Recent</span>
                      </div>
                      <p className="text-xs text-[#0F2747] font-medium leading-tight">
                        {ov.externalAgencyName} matches address {ov.targetAddress.slice(0, 8)}...
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                        {ov.justificationNotes}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No unread operational notifications.
                  </div>
                )}
              </div>
              <div className="pt-2 px-3 border-t border-[#DCE7F3]">
                <button
                  onClick={() => {
                    setNotifOpen(false);
                    navigate('/app/notifications');
                  }}
                  className="w-full text-center text-xs font-semibold text-[#2563EB] hover:underline py-1"
                >
                  View All Alerts Center
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-4 w-px bg-[#DCE7F3]" />

        {/* Dynamic Authenticated Investigator Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 pl-2 border-l border-[#DCE7F3] hover:opacity-90 transition-opacity"
            aria-expanded={profileOpen}
          >
            <div className="w-8 h-8 rounded-full bg-[#EAF4FF] border border-[#ADCFFF] flex items-center justify-center text-[#1D4ED8] font-bold text-xs">
              {user ? getInitials(user.name) : 'OP'}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-[#0F2747] leading-tight">
                {user?.name || 'Authorized Operator'}
              </p>
              <p className="text-[10px] text-slate-500 leading-tight font-mono">
                {user?.badgeNumber || 'ID: PENDING'}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-[#DCE7F3] rounded-xl shadow-lg py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-[#DCE7F3]">
                <p className="text-xs font-bold text-[#0F2747]">{user?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span className="text-[10px] font-medium text-[#1D4ED8] bg-[#EAF4FF] px-1.5 py-0.2 rounded border border-[#ADCFFF]">
                    {user?.role.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              <div className="px-4 py-2 text-[11px] text-slate-600 border-b border-[#DCE7F3] space-y-1">
                <div><strong>Agency:</strong> {user?.organization}</div>
                <div><strong>Unit:</strong> {user?.unit}</div>
              </div>

              {/* Demo Profile Switcher */}
              <div className="px-4 py-2 border-b border-[#DCE7F3]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Operational Identity
                </span>
                <div className="space-y-1 mt-1.5">
                  <button
                    onClick={() => {
                      switchDemoProfile('LEAD_INVESTIGATOR');
                      setProfileOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between ${user?.role === 'LEAD_INVESTIGATOR' ? 'bg-[#EAF4FF] text-[#1D4ED8] font-semibold' : 'text-slate-600 hover:bg-[#F0F5FA]'}`}
                  >
                    <span>Sarah Lin (Lead Investigator)</span>
                    {user?.role === 'LEAD_INVESTIGATOR' && <Check className="w-3 h-3 text-[#2563EB]" />}
                  </button>
                  <button
                    onClick={() => {
                      switchDemoProfile('FORENSIC_ANALYST');
                      setProfileOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between ${user?.role === 'FORENSIC_ANALYST' ? 'bg-[#EAF4FF] text-[#1D4ED8] font-semibold' : 'text-slate-600 hover:bg-[#F0F5FA]'}`}
                  >
                    <span>Marcus Vance (Forensic Analyst)</span>
                    {user?.role === 'FORENSIC_ANALYST' && <Check className="w-3 h-3 text-[#2563EB]" />}
                  </button>
                  <button
                    onClick={() => {
                      switchDemoProfile('COMPLIANCE_OFFICER');
                      setProfileOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between ${user?.role === 'COMPLIANCE_OFFICER' ? 'bg-[#EAF4FF] text-[#1D4ED8] font-semibold' : 'text-slate-600 hover:bg-[#F0F5FA]'}`}
                  >
                    <span>Elena Rostova (Compliance)</span>
                    {user?.role === 'COMPLIANCE_OFFICER' && <Check className="w-3 h-3 text-[#2563EB]" />}
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Terminate Session (Sign Out)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
