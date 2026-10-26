import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  FolderKanban, 
  Compass, 
  Layers, 
  Share2, 
  FileText, 
  Bell, 
  Settings, 
  Activity, 
  Waypoints, 
  DatabaseZap, 
  FileCheck,
  Wallet
} from 'lucide-react';
import { useForensics } from '../../context/ForensicsContext';

interface NavSection {
  title: string;
  items: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

export const AppSidebar: React.FC = () => {
  const { overlaps, cases } = useForensics();
  const pendingOverlaps = overlaps.filter((o) => o.status === 'PENDING_CONSENT').length;

  const navSections: NavSection[] = [
    {
      title: 'Core Workflows',
      items: [
        { name: 'Operations Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
        { name: 'Case Registry', href: '/app/cases', icon: FolderKanban, badge: `${cases.length}` },
        { name: 'New Investigation', href: '/app/investigations/new', icon: Compass },
      ],
    },
    {
      title: 'Forensics & Lineage',
      items: [
        { name: 'Wallet Deep Dive', href: '/app/wallet', icon: Wallet },
        { name: 'Transaction Explorer', href: '/app/transactions', icon: DatabaseZap },
        { name: 'VFT Lineage Engine', href: '/app/vft', icon: Waypoints },
        { name: 'Interactive Graph', href: '/app/graph', icon: Layers },
        { name: 'Explainable Risk', href: '/app/risk', icon: Activity },
      ],
    },
    {
      title: 'Records & Agency Hub',
      items: [
        { 
          name: 'Collaboration Hub', 
          href: '/app/collaboration', 
          icon: Share2, 
          badge: pendingOverlaps > 0 ? `${pendingOverlaps} Alert` : undefined 
        },
        { name: 'Evidence Vault', href: '/app/evidence', icon: FileCheck },
        { name: 'Court Reports', href: '/app/reports', icon: FileText },
        { name: 'Notification Center', href: '/app/notifications', icon: Bell },
      ],
    },
    {
      title: 'Governance',
      items: [
        { name: 'Settings & Security', href: '/app/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#DCE7F3] flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      <div className="flex flex-col h-full">
        {/* Brand identity header */}
        <div className="h-16 px-6 border-b border-[#DCE7F3] flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#0F2747] flex items-center justify-center text-white shadow-xs">
            <Shield className="w-4 h-4 text-[#75ACFF]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[#0F2747] tracking-tight text-sm">TRACE-X</span>
              <span className="text-[10px] bg-[#EAF4FF] text-[#1D4ED8] font-mono font-bold px-1.5 py-0.2 rounded border border-[#ADCFFF]">
                INTEL
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Crypto Fraud Forensics</p>
          </div>
        </div>

        {/* Navigation items */}
        <div className="p-4 space-y-6 overflow-y-auto flex-1">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                {section.title}
              </h4>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) => `
                      flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors
                      ${isActive 
                        ? 'bg-[#EAF4FF] text-[#1D4ED8] font-semibold border border-[#ADCFFF]' 
                        : 'text-slate-600 hover:text-[#0F2747] hover:bg-[#F0F5FA]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-1.5 py-0.5 rounded border border-slate-200">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Investigative Principle footer note */}
        <div className="p-4 border-t border-[#DCE7F3] bg-[#F7FBFF] shrink-0">
          <p className="text-[11px] font-bold text-[#0F2747] leading-tight">
            Investigative Axiom:
          </p>
          <p className="text-[10px] text-slate-500 leading-tight mt-1">
            "Risk scores represent analytical leads, not judicial proof."
          </p>
        </div>
      </div>
    </aside>
  );
};
