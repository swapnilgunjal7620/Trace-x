import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, Shield, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { UserRole } from '../../types/auth';
import { useAuth } from '../../hooks/useAuth';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    passphrase: '',
    organization: '',
    unit: '',
    badgeNumber: '',
    role: 'LEAD_INVESTIGATOR' as UserRole,
  });

  const [acceptedAxioms, setAcceptedAxioms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasMinLength = formData.passphrase.length >= 8;
  const hasNumber = /\d/.test(formData.passphrase);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.organization || !formData.badgeNumber) {
      setError('All institutional onboarding fields are mandatory for identity validation.');
      return;
    }

    if (!hasMinLength || !hasNumber) {
      setError('Passphrase does not satisfy minimum security complexity (8+ chars, 1+ number).');
      return;
    }

    if (!acceptedAxioms) {
      setError('You must acknowledge adherence to the TRACE-X Evidentiary Code of Ethics.');
      return;
    }

    try {
      setIsSubmitting(true);
      await register(formData);
      navigate('/app/dashboard', { replace: true });
    } catch {
      setError('Registration failed. Please contact your system administrator.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center space-y-2 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#0F2747] text-[#75ACFF] flex items-center justify-center mx-auto shadow-xs">
          <Building className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold text-[#0F2747]">Agency Onboarding & Credentialing</h1>
        <p className="text-xs text-slate-500">
          Provision authorized investigator credentials with cryptographically bound access roles.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Agent Marcus Vance"
                className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">Official Agency Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="m.vance@agency.gov"
                className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">Organization / Agency</label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="State Cyber Crimes Division"
                className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">Assigned Unit</label>
              <input
                type="text"
                required
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="Digital Asset Forensics"
                className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">Badge / Officer ID</label>
              <input
                type="text"
                required
                value={formData.badgeNumber}
                onChange={(e) => setFormData({ ...formData, badgeNumber: e.target.value })}
                placeholder="CY-88102"
                className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] font-mono text-[#0F2747]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2747] mb-1">Investigative Operational Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
              >
                <option value="LEAD_INVESTIGATOR">Lead Case Investigator</option>
                <option value="FORENSIC_ANALYST">Forensic Intelligence Analyst</option>
                <option value="COMPLIANCE_OFFICER">AML / Compliance Officer</option>
                <option value="PROSECUTOR_VIEWER">Prosecutor / Legal Counsel (Read-Only)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F2747] mb-1">Master Access Passphrase</label>
            <input
              type="password"
              required
              value={formData.passphrase}
              onChange={(e) => setFormData({ ...formData, passphrase: e.target.value })}
              placeholder="••••••••••••••••"
              className="w-full text-xs px-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
            />
            <div className="flex gap-4 mt-2 text-[11px] text-slate-500">
              <span className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-600' : 'text-slate-400'}`}>
                <CheckCircle2 className="w-3.5 h-3.5" /> 8+ Characters
              </span>
              <span className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-600' : 'text-slate-400'}`}>
                <CheckCircle2 className="w-3.5 h-3.5" /> Contains Number
              </span>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedAxioms}
                onChange={(e) => setAcceptedAxioms(e.target.checked)}
                className="mt-0.5 rounded border-[#DCE7F3] text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-[11px] text-slate-600 leading-snug">
                I certify that I am an authorized institutional operator. I acknowledge that automated risk indicators represent analytical leads rather than conclusive proof, and agree to handle all shared data in compliance with chain-of-custody protocols.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors disabled:bg-slate-300 mt-2"
          >
            <span>{isSubmitting ? 'Registering Identity...' : 'Provision Investigator Credentials'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-[#DCE7F3] mt-4">
          <span className="text-xs text-slate-500">Already credentialed? </span>
          <Link to="/login" className="text-xs font-semibold text-[#2563EB] hover:underline">
            Sign In to Investigator Console
          </Link>
        </div>
      </Card>
    </div>
  );
};
