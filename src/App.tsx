import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Providers & Guards
import { AuthProvider } from './context/AuthContext';
import { ForensicsProvider } from './context/ForensicsContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AppLayout } from './layouts/AppLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { TechnologyPage } from './pages/public/TechnologyPage';
import { VftSpecificationPage } from './pages/public/VftSpecificationPage';
import { CollaborationPage } from './pages/public/CollaborationPage';
import { SecurityPage } from './pages/public/SecurityPage';
import { FaqPage } from './pages/public/FaqPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Authenticated Workspace Pages
import { DashboardPage } from './pages/app/DashboardPage';
import { CasesPage } from './pages/app/CasesPage';
import { CaseDetailPage } from './pages/app/CaseDetailPage';
import { NewInvestigationPage } from './pages/app/NewInvestigationPage';
import { WalletExplorerPage } from './pages/app/WalletExplorerPage';
import { TransactionsPage } from './pages/app/TransactionsPage';
import { GraphVisualizerPage } from './pages/app/GraphVisualizerPage';
import { VftEnginePage } from './pages/app/VftEnginePage';
import { RiskEnginePage } from './pages/app/RiskEnginePage';
import { CollaborationHubPage } from './pages/app/CollaborationHubPage';
import { EvidenceVaultPage } from './pages/app/EvidenceVaultPage';
import { ReportsPage } from './pages/app/ReportsPage';
import { NotificationsPage } from './pages/app/NotificationsPage';
import { SettingsPage } from './pages/app/SettingsPage';

export default function App() {
  return (
    <AuthProvider>
      <ForensicsProvider>
        <Routes>
          {/* Public Portal & Architecture Documentation */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/vft" element={<VftSpecificationPage />} />
            <Route path="/collaboration" element={<CollaborationPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Authenticated Workspace Shell */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="cases" element={<CasesPage />} />
            <Route path="cases/:caseId" element={<CaseDetailPage />} />
            <Route path="investigations/new" element={<NewInvestigationPage />} />
            <Route path="wallet" element={<WalletExplorerPage />} />
            <Route path="wallet/:address" element={<WalletExplorerPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="vft" element={<VftEnginePage />} />
            <Route path="graph" element={<GraphVisualizerPage />} />
            <Route path="risk" element={<RiskEnginePage />} />
            <Route path="collaboration" element={<CollaborationHubPage />} />
            <Route path="evidence" element={<EvidenceVaultPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ForensicsProvider>
    </AuthProvider>
  );
}
