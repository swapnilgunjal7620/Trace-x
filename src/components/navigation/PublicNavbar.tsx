import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Shield, ArrowRight, Menu, X } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { label: 'Overview', href: '/' },
    { label: 'Architecture', href: '/technology' },
    { label: 'VFT Engine', href: '/vft' },
    { label: 'Collaboration', href: '/collaboration' },
    { label: 'Security & Ethics', href: '/security' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="bg-white border-b border-[#DCE7F3] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark with subtle brand icon */}
        <Link to="/" className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#0F2747] flex items-center justify-center text-white shadow-xs">
            <Shield className="w-4 h-4 text-[#75ACFF]" />
          </div>
          <span className="font-extrabold text-[#0F2747] tracking-tight text-base">TRACE-X</span>
        </Link>

        {/* Zone 2: 4-6 clean single-line text nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-600">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) => `
                hover:text-[#0F2747] transition-colors whitespace-nowrap shrink-0
                ${isActive ? 'text-[#2563EB] font-semibold border-b-2 border-[#2563EB] py-1' : ''}
              `}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <Link
            to="/login"
            className="text-xs font-semibold text-slate-600 hover:text-[#0F2747] transition-colors whitespace-nowrap shrink-0"
          >
            Investigator Sign In
          </Link>
          <Link
            to="/app/dashboard"
            className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg flex items-center gap-1.5 transition-colors shadow-xs whitespace-nowrap shrink-0"
          >
            <span>Launch Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-[#0F2747]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DCE7F3] px-6 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-xs font-medium">
            {links.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `
                  py-1.5 transition-colors
                  ${isActive ? 'text-[#2563EB] font-semibold' : 'text-slate-600 hover:text-[#0F2747]'}
                `}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="pt-3 border-t border-[#DCE7F3] flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold text-slate-700 py-2 text-center"
            >
              Investigator Sign In
            </Link>
            <Link
              to="/app/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold bg-[#2563EB] text-white px-4 py-2 rounded-lg text-center"
            >
              Launch Console
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
