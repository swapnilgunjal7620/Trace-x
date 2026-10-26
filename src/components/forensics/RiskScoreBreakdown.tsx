import React from 'react';
import { ShieldAlert, Activity, CheckCircle2, AlertTriangle, Info, Scale } from 'lucide-react';
import { Card } from '../common/Card';

interface RiskRule {
  name: string;
  weight: number;
  triggered: boolean;
  explanation: string;
  category: 'VELOCITY' | 'TOPOLOGY' | 'ANONYMITY' | 'TEMPORAL';
}

interface RiskScoreBreakdownProps {
  score: number;
  walletAddress: string;
}

export const RiskScoreBreakdown: React.FC<RiskScoreBreakdownProps> = ({ score, walletAddress }) => {
  const rules: RiskRule[] = [
    {
      name: 'High-Velocity Rapid Forwarding',
      weight: 25,
      triggered: true,
      explanation: 'Outgoing transfer occurred within 170 seconds of initial victim deposit (threshold: < 300s). Consistent with automated peel scripts.',
      category: 'VELOCITY',
    },
    {
      name: 'Downstream Anonymity Mixer Proximity',
      weight: 35,
      triggered: true,
      explanation: 'Hop 2 edge terminates at Tornado.Cash 100 ETH Vault. Strong indicator of intentional obfuscation.',
      category: 'ANONYMITY',
    },
    {
      name: 'Fan-Out Splitting Topology',
      weight: 20,
      triggered: true,
      explanation: 'Incoming sum split into 2 divergent branches (65% peel, 35% mixer) without merchant or smart contract invocation.',
      category: 'TOPOLOGY',
    },
    {
      name: 'Dormant Address Awakening',
      weight: 15,
      triggered: false,
      explanation: 'Address was active within the past 30 days. No long-term multi-month hibernation pattern detected.',
      category: 'TEMPORAL',
    },
  ];

  const getTier = (s: number) => {
    if (s >= 80) return { label: 'CRITICAL RISK LEAD', color: 'text-rose-700 bg-rose-50 border-rose-200' };
    if (s >= 60) return { label: 'ELEVATED LEAD', color: 'text-amber-800 bg-amber-50 border-amber-200' };
    if (s >= 30) return { label: 'MODERATE INQUIRY', color: 'text-blue-800 bg-blue-50 border-blue-200' };
    return { label: 'LOW CONCERN', color: 'text-emerald-800 bg-emerald-50 border-emerald-200' };
  };

  const tier = getTier(score);

  return (
    <div className="space-y-4">
      {/* Header Metric Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DCE7F3] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-sm font-bold text-[#0F2747]">Explainable Risk Composition</h3>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Evaluated on {walletAddress}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block uppercase font-bold tracking-wider">Analytical Score</span>
              <span className="text-3xl font-extrabold text-[#0F2747] font-mono tabular-nums leading-none">
                {score}<span className="text-base text-slate-400 font-normal">/100</span>
              </span>
            </div>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${tier.color}`}>
              {tier.label}
            </span>
          </div>
        </div>

        {/* Explainable Rules Breakdown */}
        <div className="mt-5 space-y-3">
          <span className="text-xs font-bold text-[#0F2747] uppercase tracking-wider block">
            Transparent Heuristic Breakdown (Anti-Blackbox)
          </span>

          <div className="space-y-2.5">
            {rules.map((rule, idx) => (
              <div 
                key={idx}
                className={`p-3.5 rounded-lg border text-xs transition-colors ${
                  rule.triggered 
                    ? 'bg-[#F7FBFF] border-[#ADCFFF]' 
                    : 'bg-white border-[#DCE7F3] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {rule.triggered ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="font-bold text-[#0F2747]">{rule.name}</span>
                  </div>
                  <span className="font-mono font-bold text-[#1D4ED8]">
                    {rule.triggered ? `+${rule.weight} pts` : '0 pts'}
                  </span>
                </div>
                <p className="text-slate-600 mt-1 pl-6 leading-relaxed">
                  {rule.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer Footer */}
        <div className="mt-5 p-3 bg-[#F0F7FF] rounded-lg border border-[#ADCFFF] flex items-start gap-2.5 text-xs text-slate-600">
          <Scale className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
          <span>
            <strong>Judicial Precaution:</strong> This risk score is an algorithmic lead generated to prioritize forensic focus. In accordance with judicial standards, this indicator cannot be introduced as direct evidence of criminal intent without corroborating transaction records and subpoenas.
          </span>
        </div>
      </Card>
    </div>
  );
};
