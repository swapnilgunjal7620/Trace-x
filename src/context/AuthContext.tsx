import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterPayload } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  switchDemoProfile: (role: 'LEAD_INVESTIGATOR' | 'FORENSIC_ANALYST' | 'COMPLIANCE_OFFICER') => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const DEMO_PROFILES: Record<string, User> = {
  LEAD_INVESTIGATOR: {
    id: 'USR-DEV-001',
    name: 'Sarah Lin',
    email: 'sarah.lin@cybercrime.fiu.gov',
    organization: 'Financial Crimes Enforcement Unit',
    unit: 'Digital Asset Taskforce',
    badgeNumber: 'FC-9482',
    role: 'LEAD_INVESTIGATOR',
    createdAt: '2026-01-15T08:00:00Z',
  },
  FORENSIC_ANALYST: {
    id: 'USR-DEV-002',
    name: 'Marcus Vance',
    email: 'marcus.v@cybercrime.fiu.gov',
    organization: 'State Cyber Intelligence',
    unit: 'Blockchain Forensic Cell',
    badgeNumber: 'CY-1104',
    role: 'FORENSIC_ANALYST',
    createdAt: '2026-02-01T10:30:00Z',
  },
  COMPLIANCE_OFFICER: {
    id: 'USR-DEV-003',
    name: 'Elena Rostova',
    email: 'elena.rostova@aml-watch.org',
    organization: 'International VASP Monitor',
    unit: 'Sanctions & Peeling Chain Audits',
    badgeNumber: 'AML-552',
    role: 'COMPLIANCE_OFFICER',
    createdAt: '2026-02-18T14:15:00Z',
  },
};

const STORAGE_KEY_TOKEN = 'tracex_auth_token';
const STORAGE_KEY_USER = 'tracex_auth_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(STORAGE_KEY_TOKEN);
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);

      if (storedToken && storedUser) {
        setAuthState({
          user: JSON.parse(storedUser),
          token: storedToken,
          isAuthenticated: true,
          isLoading: false,
        });
        return;
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
      localStorage.removeItem(STORAGE_KEY_USER);
    }

    const defaultProfile = DEMO_PROFILES.LEAD_INVESTIGATOR;
    const defaultToken = 'mock-jwt-lead-investigator-2026';
    localStorage.setItem(STORAGE_KEY_TOKEN, defaultToken);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(defaultProfile));

    setAuthState({
      user: defaultProfile,
      token: defaultToken,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    const matchedProfile = Object.values(DEMO_PROFILES).find(
      (p) => p.email.toLowerCase() === credentials.email.toLowerCase()
    ) || {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: credentials.email.split('@')[0].replace('.', ' '),
      email: credentials.email,
      organization: 'Cyber Crime Taskforce',
      unit: 'Special Investigations Unit',
      badgeNumber: 'INV-8800',
      role: 'LEAD_INVESTIGATOR' as const,
      createdAt: new Date().toISOString(),
    };

    const mockToken = `mock-session-token-${Date.now()}`;
    localStorage.setItem(STORAGE_KEY_TOKEN, mockToken);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(matchedProfile));

    setAuthState({
      user: matchedProfile,
      token: mockToken,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const register = async (payload: RegisterPayload): Promise<void> => {
    const newUser: User = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: payload.name,
      email: payload.email,
      organization: payload.organization,
      unit: payload.unit,
      badgeNumber: payload.badgeNumber,
      role: payload.role,
      createdAt: new Date().toISOString(),
    };

    const mockToken = `mock-registered-session-${Date.now()}`;
    localStorage.setItem(STORAGE_KEY_TOKEN, mockToken);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));

    setAuthState({
      user: newUser,
      token: mockToken,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const switchDemoProfile = (role: 'LEAD_INVESTIGATOR' | 'FORENSIC_ANALYST' | 'COMPLIANCE_OFFICER') => {
    const profile = DEMO_PROFILES[role];
    const token = `mock-token-${role.toLowerCase()}`;
    localStorage.setItem(STORAGE_KEY_TOKEN, token);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile));

    setAuthState({
      user: profile,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, switchDemoProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
