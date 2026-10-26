import React, { useState } from 'react';
import { Share2, Lock, ShieldCheck, UserCheck, CheckCircle2, AlertTriangle, MessageSquare, Send } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useForensics } from '../../context/ForensicsContext';
import { useAuth } from '../../hooks/useAuth';

export const CollaborationHubPage: React.FC = () => {
  const { user } = useAuth();
  const { overlaps, respondToOverlap } = useForensics();
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([
    {
      sender: 'David Miller (State Financial Crimes)',
      text: 'Thanks for accepting the handshake. We have a pending Grand Jury subpoena with Binance for this deposit cluster.',
      time: '10:45 AM',
    },
    {
      sender: 'Special Agent Sarah Lin',
      text: 'Understood. We are tracking 50k USDT that entered the cluster on Feb 10. Attaching our VFT proof dossier to the vault.',
      time: '11:02 AM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: user?.name || 'Operator',
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setNewMessage('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-[#0F2747]">Inter-Agency Collaboration Hub</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Privacy-preserving cross-case deduplication with mutual-consent cryptographic disclosure.
        </p>
      </div>

      {/* Active Overlap Alert Dossiers */}
      <div className="space-y-4">
        {overlaps.map((ov) => (
          <Card key={ov.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#DCE7F3] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#1D4ED8] bg-[#EAF4FF] px-2 py-0.5 rounded border border-[#ADCFFF]">
                    {ov.id}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                    ov.status === 'MUTUAL_CONSENT_GRANTED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {ov.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F2747]">
                  Target Address Overlap: <span className="font-mono text-xs">{ov.targetAddress}</span>
                </h3>
              </div>

              {ov.status === 'PENDING_CONSENT' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => respondToOverlap(ov.id, true)}
                    className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                  >
                    Grant Mutual Consent
                  </button>
                  <button
                    onClick={() => respondToOverlap(ov.id, false)}
                    className="px-4 py-2 bg-white border border-[#DCE7F3] text-slate-600 hover:text-rose-600 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Decline Handshake
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
              <div className="p-3 bg-[#F7FBFF] rounded-lg border border-[#DCE7F3] space-y-1">
                <span className="text-slate-400 font-medium">Requesting Taskforce</span>
                <p className="font-bold text-[#0F2747]">{ov.externalAgencyName}</p>
                <p className="text-[11px] text-slate-500">Officer Lead: {ov.requestedBy}</p>
              </div>

              <div className="p-3 bg-[#F7FBFF] rounded-lg border border-[#DCE7F3] space-y-1">
                <span className="text-slate-400 font-medium">Associated Local Case</span>
                <p className="font-bold text-[#1D4ED8] font-mono">{ov.localCaseId}</p>
                <p className="text-[11px] text-slate-500">External Docket: {ov.matchedCaseRef}</p>
              </div>
            </div>

            <div className="mt-3 p-3 bg-white rounded-lg border border-[#DCE7F3] text-xs">
              <span className="text-slate-400 font-medium block mb-1">Collaboration Justification</span>
              <p className="text-slate-700 leading-relaxed font-sans">
                "{ov.justificationNotes}"
              </p>
            </div>

            {/* Unlocked Credentials */}
            {ov.status === 'MUTUAL_CONSENT_GRANTED' && ov.unlockedContact && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <UserCheck className="w-4 h-4" />
                  <span>Verified Operator Contact Channels (Mutual Consent Active)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <span className="text-emerald-900/60 block text-[10px]">Lead Investigator</span>
                    <strong className="text-emerald-950">{ov.unlockedContact.name}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-900/60 block text-[10px]">Official Agency Email</span>
                    <a href={`mailto:${ov.unlockedContact.email}`} className="text-[#2563EB] font-mono hover:underline">
                      {ov.unlockedContact.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-emerald-900/60 block text-[10px]">Direct Desk Phone</span>
                    <strong className="text-emerald-950 font-mono">{ov.unlockedContact.phone}</strong>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Shared Inter-Agency Channel */}
      <Card title="Synchronized Case Collaboration Channel" subtitle="End-to-end encrypted messaging for verified co-investigators">
        <div className="space-y-4">
          <div className="p-4 bg-[#F7FBFF] rounded-xl border border-[#DCE7F3] h-64 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0F2747]">{msg.sender}</span>
                  <span className="text-[10px] text-slate-400">{msg.time}</span>
                </div>
                <p className="bg-white p-2.5 rounded-lg border border-[#DCE7F3] text-slate-700 leading-relaxed max-w-xl">
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type message to co-investigators..."
              className="flex-1 text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Note</span>
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};
