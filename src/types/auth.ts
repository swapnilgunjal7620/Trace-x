export type UserRole = 
  | 'LEAD_INVESTIGATOR'
  | 'FORENSIC_ANALYST'
  | 'COMPLIANCE_OFFICER'
  | 'PROSECUTOR_VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  unit: string;
  badgeNumber: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  passphrase: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  passphrase: string;
  organization: string;
  unit: string;
  badgeNumber: string;
  role: UserRole;
}
