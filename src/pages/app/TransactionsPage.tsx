import React from 'react';
import { DatabaseZap } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { TransactionTable } from '../../components/forensics/TransactionTable';
import { useForensics } from '../../context/ForensicsContext';

export const TransactionsPage: React.FC = () => {
  const { transactions } = useForensics();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-[#0F2747]">Transaction Explorer</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          High-density normalized ledger across EVM RPC nodes. Filter by hash, block height, asset contract, or flagged risk indicators.
        </p>
      </div>

      <Card>
        <TransactionTable transactions={transactions} />
      </Card>
    </div>
  );
};
