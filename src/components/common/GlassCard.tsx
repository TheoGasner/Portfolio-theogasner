import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  dark?: boolean;
}

export function GlassCard({
  children,
  className = '',
  onClick,
  dark = false,
}: GlassCardProps) {
  const baseStyles =
    'rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:shadow-lg p-6 cursor-default';

  const styleVariant = dark
    ? 'glass-dark'
    : 'glass';

  return (
    <div
      className={`${baseStyles} ${styleVariant} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </div>
  );
}
