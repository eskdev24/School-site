import React from 'react';
import { SITE_INFO } from '../data/siteData';

interface BrandLogoProps {
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  showIcon?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  theme = 'light',
  size = 'md',
  showTagline = true,
  showIcon = true,
  className = '',
}) => {
  // Color configuration:
  // SAMATHS = Book a Session color (Warm vibrant Amber #f59e0b)
  // SOLUTIONS = Register Your Child color (Deep rich Emerald #059669 / #10b981)

  const samathsColor = theme === 'dark' ? 'text-amber-400' : 'text-amber-500';
  const solutionsColor = theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700';
  const taglineColor = theme === 'dark' ? 'text-emerald-400/90' : 'text-emerald-600';

  const iconSizes = {
    sm: 'w-9 h-9 text-base rounded-lg',
    md: 'w-11 h-11 sm:w-12 sm:h-12 text-lg sm:text-xl rounded-xl',
    lg: 'w-14 h-14 text-2xl rounded-2xl',
  };

  const textSizes = {
    sm: 'text-lg tracking-tight',
    md: 'text-xl sm:text-2xl tracking-tight',
    lg: 'text-2xl sm:text-3xl tracking-tight',
  };

  const taglineSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {showIcon && (
        <div
          className={`${iconSizes[size]} relative shrink-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white flex items-center justify-center font-bold shadow-md border border-emerald-500/50 overflow-hidden group-hover:scale-105 transition-transform`}
        >
          {/* Abacus dual-tone subtle accent background glow */}
          <div className="absolute top-0 right-0 w-6 h-6 bg-amber-400/20 blur-sm rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-6 h-6 bg-emerald-400/20 blur-sm rounded-full pointer-events-none" />
          
          <div className="relative z-10 font-logo font-black flex items-center tracking-tighter">
            <span className="text-amber-400">S</span>
            <span className="text-emerald-400">S</span>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center">
        <div className={`font-logo font-black leading-none uppercase ${textSizes[size]}`}>
          <span className={`${samathsColor} transition-colors drop-shadow-xs`}>
            SAMATHS
          </span>{' '}
          <span className={`${solutionsColor} transition-colors drop-shadow-xs`}>
            SOLUTIONS
          </span>
        </div>

        {showTagline && (
          <div className={`font-sans font-semibold italic tracking-wide mt-1 ${taglineColor} ${taglineSizes[size]}`}>
            ({SITE_INFO.tagline})
          </div>
        )}
      </div>
    </div>
  );
};
