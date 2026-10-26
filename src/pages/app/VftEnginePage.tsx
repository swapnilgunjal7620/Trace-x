import React from 'react';
import { Waypoints, ShieldCheck, Scale, GitFork } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { VftGraphTree } from '../../components/forensics/VftGraphTree';
import { useForensics } from '../../context/ForensicsContext';

export const VftEnginePage: React.FC = () => {
  const { vftNodes } = useForensics();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-[#0F2747]">Virtual Fund Trace (VFT) Engine</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Mathematical fund provenance tracking isolating reported victim losses from overall wallet balances across peeling chains.
        </p>
      </div>

      <Card>
        <VftGraphTree nodes={vftNodes} />
      </Card>

      {/* Attribution Strategy Documentation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 space-y-2">
          <h4 className="text-xs font-bold text-[#0F2747] uppercase tracking-wider">Direct Matching (1:1)</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Applied when an outgoing transfer occurs within a narrow temporal delta (&lt;10m) with value matching the incoming sum (within 2% fee tolerance). Yields highest judicial confidence (&gt;0.90).
          </p>
        </Card>

        <Card className="p-5 space-y-2">
          <h4 className="text-xs font-bold text-[#0F2747] uppercase tracking-wider">Proportional Fractional</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            When stolen funds are co-mingled into an existing wallet balance, downstream transfers are attributed proportionally based on the ratio of illicit funds to total balance at that block height.
          </p>
        </Card>

        <Card className="p-5 space-y-2">
          <h4 className="text-xs font-bold text-[#0F2747] uppercase tracking-wider">FIFO Chronological</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Treats the first funds deposited into a transit wallet as the first funds disbursed. Configurable based on the evidentiary standards of the prosecuting jurisdiction.
          </p>
        </Card>
      </div>
    </div>
  );
};
