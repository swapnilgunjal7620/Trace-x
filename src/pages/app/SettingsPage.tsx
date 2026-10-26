import React, { useState } from 'react';
import { Settings, ShieldCheck, KeyRound, Building, User, Lock, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { useAuth } from '../../hooks/useAuth';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [savedNotice, setSavedNotice] = useState(false);

  const [rpcUrl, setRpcUrl] = useState('https://eth-mainnet.alchemyapi.io/v2/demo-rpc-gateway');
  const [sessionTimeout, setSessionTimeout] = useState('60');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-[#0F2747]">System & Security Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Operator credential profiles, RPC ingestion configuration, and security session controls.
        </p>
      </div>

      <div className="space-y-6">
        {/* Operator Profile */}
        <Card title="Operator Profile & Agency Credentials" subtitle="Cryptographically bound operational role">
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Operator Name</label>
                <input
                  type="text"
                  readOnly
                  value={user?.name || ''}
                  className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg font-semibold text-[#0F2747]"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-medium mb-1">Official Agency Email</label>
                <input
                  type="text"
                  readOnly
                  value={user?.email || ''}
                  className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg font-mono text-[#0F2747]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Agency</label>
                <p className="text-[#0F2747] font-semibold">{user?.organization}</p>
              </div>
              <div>
                <label className="block text-slate-400 font-medium mb-1">Unit</label>
                <p className="text-[#0F2747] font-semibold">{user?.unit}</p>
              </div>
              <div>
                <label className="block text-slate-400 font-medium mb-1">Badge ID</label>
                <p className="font-mono font-bold text-[#1D4ED8]">{user?.badgeNumber}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Blockchain Node & Session Settings */}
        <Card title="EVM RPC Node & Session Governance" subtitle="Data ingestion endpoints">
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                Ethereum Mainnet RPC Gateway
              </label>
              <input
                type="text"
                value={rpcUrl}
                onChange={(e) => setRpcUrl(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg font-mono text-[#0F2747] focus:outline-none focus:border-[#2563EB]"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Used to query block receipts and event logs. Never handles private keys.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                Session Idle Timeout (Minutes)
              </label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg text-[#0F2747] focus:outline-none focus:border-[#2563EB]"
              >
                <option value="15">15 Minutes (Strict Security Tier)</option>
                <option value="30">30 Minutes</option>
                <option value="60">60 Minutes (Standard Taskforce Tier)</option>
                <option value="120">120 Minutes</option>
              </select>
            </div>

            {savedNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Security configuration successfully saved.</span>
              </div>
            )}

            <button
              type="submit"
              className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              Update Configuration
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};
