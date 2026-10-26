import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, UserCheck } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { useAuth } from '../../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, switchDemoProfile } = useAuth();

  const [email, setEmail] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/app/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !passphrase) {
      setError('Please provide both institutional email credentials and your secure passphrase.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('A valid institutional or agency email address is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ email, passphrase });
      navigate(from, { replace: true });
    } catch {
      setError('Authentication failed. Check credentials or verify agency status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickProfileSelect = (role: 'LEAD_INVESTIGATOR' | 'FORENSIC_ANALYST' | 'COMPLIANCE_OFFICER') => {
    switchDemoProfile(role);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#0F2747] text-[#75ACFF] flex items-center justify-center mx-auto shadow-xs">
            <Shield className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F2747]">Investigator Access Portal</h1>
          <p className="text-xs text-slate-500">
            Sign in with verified institutional credentials to access active case intelligence.
          </p>
        </div>

        <Card className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                Official Agency / Professional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investigator@agency.gov"
                  className="w-full text-xs pl-9 pr-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                Access Passphrase
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs pl-9 pr-10 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors mt-2 disabled:bg-slate-300"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Authorize Session'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick-Switch Evaluation Profiles */}
          <div className="mt-6 pt-5 border-t border-[#DCE7F3]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Evaluation Test Credentials
              </span>
              <span className="text-[10px] bg-[#F0F5FA] text-slate-600 px-1.5 py-0.2 rounded border border-[#DCE7F3]">
                DEV MODE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              Click any verified identity to test role-specific workspace views:
            </p>
            <div className="space-y-1.5 text-xs">
              <button
                type="button"
                onClick={() => handleQuickProfileSelect('LEAD_INVESTIGATOR')}
                className="w-full text-left p-2.5 rounded-lg bg-[#F7FBFF] hover:bg-[#EAF4FF] border border-[#DCE7F3] flex items-center justify-between transition-colors"
              >
                <div>
                  <span className="font-semibold text-[#0F2747]">Sarah Lin</span>
                  <span className="text-slate-500 text-[11px] ml-2 font-mono">Lead Case Investigator</span>
                </div>
                <UserCheck className="w-4 h-4 text-[#2563EB]" />
              </button>
              <button
                type="button"
                onClick={() => handleQuickProfileSelect('FORENSIC_ANALYST')}
                className="w-full text-left p-2.5 rounded-lg bg-[#F7FBFF] hover:bg-[#EAF4FF] border border-[#DCE7F3] flex items-center justify-between transition-colors"
              >
                <div>
                  <span className="font-semibold text-[#0F2747]">Marcus Vance</span>
                  <span className="text-slate-500 text-[11px] ml-2 font-mono">Forensic Analyst</span>
                </div>
                <UserCheck className="w-4 h-4 text-[#2563EB]" />
              </button>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-[#DCE7F3] mt-4">
            <span className="text-xs text-slate-500">Need agency verification? </span>
            <Link to="/register" className="text-xs font-semibold text-[#2563EB] hover:underline">
              Request Agency Credentials
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
