import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle, action }) => {
  return (
    <div className={`bg-white border border-[#DCE7F3] rounded-xl shadow-[0_1px_3px_rgba(15,39,71,0.04)] overflow-hidden ${className}`}>
      {(title || action) && (
        <div className="px-5 py-4 border-b border-[#DCE7F3] flex items-center justify-between gap-4">
          <div>
            {title && <h3 className="text-sm font-semibold text-[#0F2747] tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};
