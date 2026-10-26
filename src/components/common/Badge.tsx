import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'neutral' | 'warning' | 'success' | 'alert' | 'critical';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'neutral',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-[#EAF4FF] text-[#1D4ED8] border-[#ADCFFF]',
    neutral: 'bg-[#F0F5FA] text-slate-700 border-[#DCE7F3]',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    alert: 'bg-rose-50 text-rose-800 border-rose-200',
    critical: 'bg-red-50 text-red-800 border-red-300 font-semibold',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs font-medium',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-md border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};
