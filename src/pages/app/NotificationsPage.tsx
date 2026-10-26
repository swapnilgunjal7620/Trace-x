import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, AlertTriangle, ShieldCheck, Share2, ArrowRight } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { useForensics } from '../../context/ForensicsContext';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { overlaps } = useForensics();

  const alerts = [
    {
      id: 'alt-01',
      title: 'Address Overlap Detected with State Cyber Division',
      description: 'Identical transit address 0x71C8A9... is actively tracked in another state jurisdiction. Mutual consent request pending.',
      category: 'OVERLAP',
      time: '15 minutes ago',
      actionUrl: '/app/collaboration',
      unread: true,
    },
    {
      id: 'alt-02',
      title: 'High-Risk Exit Ramp Reached: Binance Deposit',
      description: 'Virtual Fund Trace VFT-2026-001-A1 terminated at Binance Hot Wallet 14 ($28,000 USDT). Subpoena affidavit generated.',
      category: 'EXIT_RAMP',
      time: '2 hours ago',
      actionUrl: '/app/cases/CASE-2026-ETH-9021',
      unread: true,
    },
    {
      id: 'alt-03',
      title: 'Mixer Gateway Inflow Alert: Tornado.Cash',
      description: '17,500 USDT routed into Tornado.Cash 100 ETH Vault via transaction 0x9910...2834.',
      category: 'MIXER',
      time: '5 hours ago',
      actionUrl: '/app/cases/CASE-2026-ETH-9021',
      unread: false,
    },
    {
      id: 'alt-04',
      title: 'Evidence Record SHA-256 Vault Seal Verified',
      description: 'New affidavit record sealed by Special Agent Sarah Lin. Checksum verification passed.',
      category: 'EVIDENCE',
      time: '1 day ago',
      actionUrl: '/app/evidence',
      unread: false,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-[#0F2747]">Operational Notification Center</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time alerts for address overlaps, high-risk fund movements, and collaborative case updates.
        </p>
      </div>

      <Card>
        <div className="divide-y divide-[#DCE7F3]/70 -mx-5 -my-5">
          {alerts.map((alt) => (
            <div
              key={alt.id}
              onClick={() => navigate(alt.actionUrl)}
              className={`p-5 hover:bg-[#F0F7FF]/50 transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                alt.unread ? 'bg-[#F7FBFF]' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                  alt.category === 'OVERLAP' ? 'bg-amber-100 text-amber-800' :
                  alt.category === 'EXIT_RAMP' ? 'bg-emerald-100 text-emerald-800' :
                  alt.category === 'MIXER' ? 'bg-purple-100 text-purple-800' :
                  'bg-[#EAF4FF] text-[#1D4ED8]'
                }`}>
                  {alt.category === 'OVERLAP' ? <AlertTriangle className="w-4 h-4" /> :
                   alt.category === 'EXIT_RAMP' ? <ShieldCheck className="w-4 h-4" /> :
                   alt.category === 'MIXER' ? <Share2 className="w-4 h-4" /> :
                   <Bell className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-[#0F2747]">{alt.title}</h3>
                    {alt.unread && (
                      <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                    {alt.description}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {alt.time}
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline shrink-0">
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
