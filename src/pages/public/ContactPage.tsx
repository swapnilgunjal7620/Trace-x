import React, { useState } from 'react';
import { Mail, Building, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '../../components/common/Card';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [agency, setAgency] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold text-[#0F2747] tracking-tight">
          Institutional & Agency Verification
        </h1>
        <p className="text-xs text-slate-600">
          Connect with the TRACE-X architecture team for agency onboarding inquiries, security reviews, or academic research partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-2">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0F2747]">Inquiry Received</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Your agency inquiry has been logged. Credentials verification takes 1-2 business days for accredited cyber units.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-semibold text-[#2563EB] hover:underline pt-2 block mx-auto"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#0F2747] mb-1">Agency or Taskforce Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    placeholder="e.g., Regional Financial Crimes Taskforce"
                    className="w-full text-xs pl-9 pr-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F2747] mb-1">Official Agency Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="officer@agency.gov"
                    className="w-full text-xs pl-9 pr-3 py-2 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F2747] mb-1">Inquiry Scope</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your unit's jurisdictional scope and evaluation requirements..."
                  className="w-full text-xs p-3 bg-[#F7FBFF] border border-[#DCE7F3] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#0F2747]"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>Submit Agency Verification Request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </Card>

        {/* Verification Standards */}
        <Card title="Accreditation Standards" subtitle="Authorized access criteria">
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span>Government or law enforcement domain verification required.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span>Compliance officers require registered VASP identifier.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span>Strict non-commercial usage agreement enforced.</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
