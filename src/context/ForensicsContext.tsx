import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  ForensicCase, 
  WalletProfile, 
  NormalizedTransaction, 
  VFTNode, 
  EvidenceRecord, 
  OverlapAlert, 
  AuditAction,
  AttributionStrategy
} from '../types/forensics';
import { 
  INITIAL_CASES, 
  INITIAL_WALLETS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_VFT_NODES, 
  INITIAL_EVIDENCE, 
  INITIAL_OVERLAPS, 
  INITIAL_AUDIT_LOG 
} from '../data/mockForensics';

interface ForensicsContextType {
  cases: ForensicCase[];
  wallets: Record<string, WalletProfile>;
  transactions: NormalizedTransaction[];
  vftNodes: VFTNode[];
  evidence: EvidenceRecord[];
  overlaps: OverlapAlert[];
  auditLogs: AuditAction[];
  activeCaseId: string;
  setActiveCaseId: (id: string) => void;
  getCase: (id: string) => ForensicCase | undefined;
  getWallet: (address: string) => WalletProfile;
  createCase: (newCase: Omit<ForensicCase, 'id' | 'createdAt' | 'updatedAt' | 'activeVftCount' | 'trackedWallets' | 'evidenceRecordIds'>) => ForensicCase;
  addEvidence: (record: Omit<EvidenceRecord, 'id' | 'uploadedAt'>) => void;
  respondToOverlap: (overlapId: string, accept: boolean) => void;
  logAuditAction: (actionType: AuditAction['actionType'], details: string, caseId?: string) => void;
  simulateVftSplit: (params: {
    sourceVftId: string;
    splits: { destinationAddress: string; amount: number; strategy: AttributionStrategy }[];
  }) => VFTNode[];
}

const ForensicsContext = createContext<ForensicsContextType | undefined>(undefined);

export const ForensicsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<ForensicCase[]>(INITIAL_CASES);
  const [wallets, setWallets] = useState<Record<string, WalletProfile>>(INITIAL_WALLETS);
  const [transactions, setTransactions] = useState<NormalizedTransaction[]>(INITIAL_TRANSACTIONS);
  const [vftNodes, setVftNodes] = useState<VFTNode[]>(INITIAL_VFT_NODES);
  const [evidence, setEvidence] = useState<EvidenceRecord[]>(INITIAL_EVIDENCE);
  const [overlaps, setOverlaps] = useState<OverlapAlert[]>(INITIAL_OVERLAPS);
  const [auditLogs, setAuditLogs] = useState<AuditAction[]>(INITIAL_AUDIT_LOG);
  const [activeCaseId, setActiveCaseId] = useState<string>('CASE-2026-ETH-9021');

  const getCase = (id: string) => cases.find((c) => c.id === id);

  const getWallet = (address: string) => {
    const normalized = address.toLowerCase();
    const matchKey = Object.keys(wallets).find((k) => k.toLowerCase() === normalized);
    if (matchKey) return wallets[matchKey];

    // Fallback on-the-fly dynamically generated profile for any search query
    const fallbackProfile: WalletProfile = {
      address,
      chain: 'ethereum',
      totalBalanceUsd: 18450,
      nativeBalance: 0.85,
      erc20Balances: [{ symbol: 'USDT', amount: 15900, valueUsd: 15900 }],
      entityLabel: 'Unattributed Transit Address',
      entityCategory: 'UNKNOWN_UNATTRIBUTED',
      firstSeen: '2026-02-01T10:00:00Z',
      lastSeen: '2026-02-24T12:00:00Z',
      transactionCount: 14,
      totalInflowUsd: 45000,
      totalOutflowUsd: 26550,
      riskScore: 42,
      riskTier: 'MEDIUM',
      tags: ['Unattributed', 'Analytical Review Required'],
      associatedCaseIds: [],
    };
    return fallbackProfile;
  };

  const createCase = (
    newCaseData: Omit<ForensicCase, 'id' | 'createdAt' | 'updatedAt' | 'activeVftCount' | 'trackedWallets' | 'evidenceRecordIds'>
  ): ForensicCase => {
    const newId = `CASE-2026-ETH-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();
    
    // Seed initial root VFT Node for the new case
    const rootVftId = `VFT-${newId.slice(-4)}-001`;
    const rootNode: VFTNode = {
      id: rootVftId,
      tokenId: rootVftId,
      caseId: newId,
      sourceTxHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      walletAddress: newCaseData.initialSuspectAddress,
      entityName: 'Target Suspect Wallet',
      entityCategory: 'SUSPECT_TRANSIT',
      amount: newCaseData.reportedAmount,
      tokenSymbol: newCaseData.reportedToken,
      fiatValueUsd: newCaseData.reportedFiatUsd,
      hopCount: 1,
      attributionStrategy: 'DIRECT_MATCH',
      confidenceScore: 0.95,
      confidenceTier: 'VERIFIED',
      timestamp: now,
      isExitRamp: false,
      notes: `Root victim complaint seed of ${newCaseData.reportedAmount} ${newCaseData.reportedToken}.`,
    };

    const created: ForensicCase = {
      ...newCaseData,
      id: newId,
      createdAt: now,
      updatedAt: now,
      activeVftCount: 1,
      trackedWallets: [newCaseData.initialSuspectAddress],
      evidenceRecordIds: [],
    };

    setCases((prev) => [created, ...prev]);
    setVftNodes((prev) => [rootNode, ...prev]);
    setActiveCaseId(newId);

    logAuditAction('VFT_ATTRIBUTION', `Created new case ${newId} and seeded root VFT ${rootVftId}`, newId);

    return created;
  };

  const addEvidence = (record: Omit<EvidenceRecord, 'id' | 'uploadedAt'>) => {
    const newEvidence: EvidenceRecord = {
      ...record,
      id: `EV-${Date.now().toString().slice(-6)}`,
      uploadedAt: new Date().toISOString(),
    };

    setEvidence((prev) => [newEvidence, ...prev]);
    setCases((prev) =>
      prev.map((c) =>
        c.id === record.caseId
          ? { ...c, evidenceRecordIds: [...c.evidenceRecordIds, newEvidence.id] }
          : c
      )
    );

    logAuditAction('ATTACH_EVIDENCE', `Attached evidence "${record.title}" (SHA-256 verified)`, record.caseId);
  };

  const respondToOverlap = (overlapId: string, accept: boolean) => {
    setOverlaps((prev) =>
      prev.map((ov) =>
        ov.id === overlapId
          ? {
              ...ov,
              status: accept ? 'MUTUAL_CONSENT_GRANTED' : 'DECLINED',
            }
          : ov
      )
    );

    const targetOverlap = overlaps.find((o) => o.id === overlapId);
    if (targetOverlap) {
      logAuditAction(
        'CONSENT_REQUEST',
        `${accept ? 'Granted' : 'Declined'} mutual collaboration with ${targetOverlap.externalAgencyName}`,
        targetOverlap.localCaseId
      );
    }
  };

  const logAuditAction = (actionType: AuditAction['actionType'], details: string, caseId?: string) => {
    const log: AuditAction = {
      id: `AUD-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString(),
      operatorId: 'USR-DEV-001',
      operatorName: 'Special Agent Sarah Lin',
      caseId,
      actionType,
      details,
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const simulateVftSplit = (params: {
    sourceVftId: string;
    splits: { destinationAddress: string; amount: number; strategy: AttributionStrategy }[];
  }): VFTNode[] => {
    const parent = vftNodes.find((v) => v.id === params.sourceVftId);
    if (!parent) return [];

    const now = new Date().toISOString();
    const createdNodes: VFTNode[] = params.splits.map((s, idx) => {
      const suffix = String.fromCharCode(65 + idx); // 'A', 'B', 'C'
      const childTokenId = `${parent.tokenId}-${suffix}`;
      const isExit = s.destinationAddress.toLowerCase().includes('binance') || s.destinationAddress === '0x28C6c06298d514Db089934071355E5743bf21d60';
      
      return {
        id: childTokenId,
        tokenId: childTokenId,
        caseId: parent.caseId,
        parentVftId: parent.id,
        sourceTxHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        walletAddress: s.destinationAddress,
        entityName: isExit ? 'Centralized Exchange (Exit Ramp)' : `Transit Hop Node ${suffix}`,
        entityCategory: isExit ? 'CENTRALIZED_EXCHANGE' : 'PEEL_CHAIN_NODE',
        amount: s.amount,
        tokenSymbol: parent.tokenSymbol,
        fiatValueUsd: s.amount,
        hopCount: parent.hopCount + 1,
        attributionStrategy: s.strategy,
        confidenceScore: s.strategy === 'DIRECT_MATCH' ? 0.93 : 0.81,
        confidenceTier: s.strategy === 'DIRECT_MATCH' ? 'VERIFIED' : 'PROBABLE',
        timestamp: now,
        isExitRamp: isExit,
        notes: `Simulated split allocation from ${parent.tokenId}.`,
      };
    });

    setVftNodes((prev) => [...createdNodes, ...prev]);
    logAuditAction('VFT_ATTRIBUTION', `Calculated split on ${parent.tokenId} into ${createdNodes.length} downstream branches`, parent.caseId);

    return createdNodes;
  };

  return (
    <ForensicsContext.Provider
      value={{
        cases,
        wallets,
        transactions,
        vftNodes,
        evidence,
        overlaps,
        auditLogs,
        activeCaseId,
        setActiveCaseId,
        getCase,
        getWallet,
        createCase,
        addEvidence,
        respondToOverlap,
        logAuditAction,
        simulateVftSplit,
      }}
    >
      {children}
    </ForensicsContext.Provider>
  );
};

export const useForensics = () => {
  const context = useContext(ForensicsContext);
  if (!context) {
    throw new Error('useForensics must be consumed within a ForensicsProvider');
  }
  return context;
};
