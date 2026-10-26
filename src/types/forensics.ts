export type BlockchainNetwork = 'ethereum' | 'polygon' | 'bsc';

export type CaseStatus = 'ACTIVE' | 'HIGH_PRIORITY' | 'UNDER_REVIEW' | 'OVERLAP_DETECTED' | 'ARCHIVED';

export type AttributionStrategy = 'DIRECT_MATCH' | 'PROPORTIONAL' | 'FIFO_CHRONOLOGICAL';

export type AttributionConfidence = 'VERIFIED' | 'PROBABLE' | 'UNATTRIBUTED' | 'DISPUTED';

export type EntityCategory = 
  | 'VICTIM_SOURCE' 
  | 'SUSPECT_TRANSIT' 
  | 'PEEL_CHAIN_NODE' 
  | 'MIXER_GATEWAY' 
  | 'CENTRALIZED_EXCHANGE' 
  | 'DEFI_POOL' 
  | 'BRIDGE_ROUTER' 
  | 'UNKNOWN_UNATTRIBUTED';

export interface VFTNode {
  id: string;
  tokenId: string; // e.g. VFT-2026-001-A
  caseId: string;
  sourceTxHash: string;
  parentVftId?: string;
  walletAddress: string;
  entityName?: string;
  entityCategory: EntityCategory;
  amount: number;
  tokenSymbol: string;
  fiatValueUsd: number;
  hopCount: number;
  attributionStrategy: AttributionStrategy;
  confidenceScore: number; // 0.0 to 1.0
  confidenceTier: AttributionConfidence;
  timestamp: string;
  isExitRamp: boolean;
  notes?: string;
  children?: string[]; // IDs of child VFT nodes
}

export interface NormalizedTransaction {
  id: string;
  hash: string;
  blockNumber: number;
  timestamp: string;
  fromAddress: string;
  fromEntity?: string;
  toAddress: string;
  toEntity?: string;
  value: number;
  tokenSymbol: string;
  tokenContract?: string;
  fiatValueUsd: number;
  feeEth: number;
  methodName: string;
  isSuspectInflow: boolean;
  isSuspectOutflow: boolean;
  vftLineageId?: string;
  riskFlags: string[];
}

export interface WalletProfile {
  address: string;
  chain: BlockchainNetwork;
  totalBalanceUsd: number;
  nativeBalance: number;
  erc20Balances: { symbol: string; amount: number; valueUsd: number }[];
  entityLabel?: string;
  entityCategory: EntityCategory;
  firstSeen: string;
  lastSeen: string;
  transactionCount: number;
  totalInflowUsd: number;
  totalOutflowUsd: number;
  riskScore: number; // 0-100 analytical lead score
  riskTier: 'LOW' | 'MEDIUM' | 'ELEVATED' | 'CRITICAL';
  tags: string[];
  associatedCaseIds: string[];
}

export interface EvidenceRecord {
  id: string;
  caseId: string;
  title: string;
  category: 'VICTIM_AFFIDAVIT' | 'BANK_LEDGER' | 'TX_SNAPSHOT' | 'VASP_RESPONSE' | 'CHAIN_ANALYSIS';
  fileName: string;
  fileSizeBytes: number;
  sha256Hash: string;
  uploadedBy: string;
  uploadedAt: string;
  notes?: string;
  isSealed: boolean;
}

export interface OverlapAlert {
  id: string;
  targetAddress: string;
  localCaseId: string;
  matchedCaseRef: string;
  externalAgencyName: string;
  status: 'PENDING_CONSENT' | 'MUTUAL_CONSENT_GRANTED' | 'DECLINED';
  requestedBy: string;
  requestedAt: string;
  justificationNotes?: string;
  unlockedContact?: {
    name: string;
    email: string;
    phone: string;
    unit: string;
  };
}

export interface ForensicCase {
  id: string; // e.g. CASE-2026-ETH-9021
  title: string;
  complaintNumber: string;
  reportedAmount: number;
  reportedToken: string;
  reportedFiatUsd: number;
  chain: BlockchainNetwork;
  initialSuspectAddress: string;
  status: CaseStatus;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'STANDARD';
  assignedLead: string;
  agencyUnit: string;
  createdAt: string;
  updatedAt: string;
  victimStatementExcerpt: string;
  activeVftCount: number;
  trackedWallets: string[];
  evidenceRecordIds: string[];
}

export interface AuditAction {
  id: string;
  timestamp: string;
  operatorId: string;
  operatorName: string;
  caseId?: string;
  actionType: 'VIEW_WALLET' | 'EXPAND_GRAPH' | 'ATTACH_EVIDENCE' | 'VFT_ATTRIBUTION' | 'EXPORT_REPORT' | 'CONSENT_REQUEST';
  details: string;
}
