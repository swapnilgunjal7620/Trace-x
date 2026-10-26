import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, CheckCircle2 } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#DCE7F3] text-[#0F2747] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Identity & Legal Stance */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0F2747] flex items-center justify-center text-white">
                <Shield className="w-3.5 h-3.5 text-[#75ACFF]" />
              </div>
              <span className="font-extrabold text-[#0F2747] tracking-tight text-base">TRACE-X</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              TRACE-X is a dedicated cryptocurrency fraud investigation, fund provenance, and cross-agency collaboration platform. Engineered specifically for certified forensic operators and financial intelligence taskforces.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-600 bg-[#F7FBFF] p-2.5 rounded-lg border border-[#DCE7F3] max-w-sm">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Non-custodial analysis. Zero private key ingestion. Court-verifiable provenance.</span>
            </div>
          </div>

          {/* Investigation Pillars */}
          <div>
            <h4 className="text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link to="/about" className="hover:text-[#2563EB] transition-colors">Mission & Ethics</Link></li>
              <li><Link to="/features" className="hover:text-[#2563EB] transition-colors">Forensic Capabilities</Link></li>
              <li><Link to="/how-it-works" className="hover:text-[#2563EB] transition-colors">Investigation Lifecycle</Link></li>
              <li><Link to="/technology" className="hover:text-[#2563EB] transition-colors">System Architecture</Link></li>
              <li><Link to="/vft" className="hover:text-[#2563EB] transition-colors">VFT Specification</Link></li>
            </ul>
          </div>

          {/* Governance & Standards */}
          <div>
            <h4 className="text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-3">Governance</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link to="/collaboration" className="hover:text-[#2563EB] transition-colors">Investigator Network</Link></li>
              <li><Link to="/security" className="hover:text-[#2563EB] transition-colors">Security Principles</Link></li>
              <li><Link to="/faq" className="hover:text-[#2563EB] transition-colors">Evidentiary FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-[#2563EB] transition-colors">Agency Intake</Link></li>
            </ul>
          </div>

          {/* Evidentiary Axiom Box */}
          <div className="bg-[#F0F7FF] border border-[#ADCFFF] rounded-xl p-4 text-[#0F2747] space-y-2">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
              Evidentiary Axiom
            </h5>
            <p className="text-[11px] text-slate-600 leading-snug">
              Risk indicators produced by TRACE-X are investigative leads designed to direct formal inquiry. They require independent corroboration via subpoenas before judicial presentation.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#DCE7F3] flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© 2026 TRACE-X Platform. Engineered for authorized forensic intelligence operations.</p>
          <div className="flex items-center gap-6">
            <Link to="/security" className="hover:text-[#0F2747] transition-colors">Security Disclosure</Link>
            <Link to="/about" className="hover:text-[#0F2747] transition-colors">Methodology Standard</Link>
            <Link to="/contact" className="hover:text-[#0F2747] transition-colors">Agency Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
