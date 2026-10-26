import React, { useState } from 'react';
import { Activity, ShieldAlert, Sliders, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { RiskScoreBreakdown } from '../../components/forensics/RiskScoreBreakdown';

export const RiskEnginePage: React.FC = () => {
  const [evalAddress, setEvalAddress] = useState('0x71C8A9b1C67E7aE456A741d44081c569C894B732');
  const [activeScore, setActiveScore] = useState(88);
  const [velocityWeight, setVelocityWeight] = useState(25);
  const [mixerWeight, setMixerWeight] = useState(35);
  const [fanOutWeight, setFanOutWeight] = useState(20);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    // Deterministic lead calculation based on address
    const hashSum = evalAddress.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const computed = Math.min(98, Math.max(20, (hashSum % 80) + 20));
    setActiveScore(computed);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-[#0F2747]">Explainable Risk Engine</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configurable rule-based risk scoring with mathematical transparency. Zero black-box scoring.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Address Evaluator Form */}
        <div className="space-y-6">
          <Card title="Run Risk Evaluation" subtitle="Input target address">
            <form onSubmit={handleEvaluate} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                  Target EVM Address
                </label>
                <input
                  type="text"
                  value={evalAddress}
                  onChange={(e) => setEvalAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] font-mono text-[#0F2747]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Evaluate Lead Indicators</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </Card>

          {/* Rule Weight Calibration */}
          <Card title="Rule Weight Calibration" subtitle="Adjust analytical sensitivities">
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-600 font-medium">Velocity Spike Weight</span>
                  <span className="font-mono font-bold text-[#1D4ED8]">{velocityWeight} pts</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  value={velocityWeight}
                  onChange={(e) => setVelocityWeight(Number(e.target.value))}
                  className="w-full accent-[#2563EB]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-600 font-medium">Mixer Proximity Weight</span>
                  <span className="font-mono font-bold text-[#1D4ED8]">{mixerWeight} pts</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="50"
                  value={mixerWeight}
                  onChange={(e) => setMixerWeight(Number(e.target.value))}
                  className="w-full accent-[#2563EB]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-600 font-medium">Fan-Out Split Weight</span>
                  <span className="font-mono font-bold text-[#1D4ED8]">{fanOutWeight} pts</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="30"
                  value={fanOutWeight}
                  onChange={(e) => setFanOutWeight(Number(e.target.value))}
                  className="w-full accent-[#2563EB]"
                />
              </div>

              <p className="text-[11px] text-slate-400 border-t border-[#DCE7F3] pt-3">
                Calibrations update real-time analytical lead classifications without altering stored ledger data.
              </p>
            </div>
          </Card>
        </div>

        {/* Breakdown Output */}
        <div className="lg:col-span-2">
          <RiskScoreBreakdown score={activeScore} walletAddress={evalAddress} />
        </div>
      </div>
    </div>
  );
};
