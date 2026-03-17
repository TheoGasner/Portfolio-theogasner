import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
}: ButtonProps) {
  const baseStyles =
    'font-grotesk font-semibold transition-all duration-300 flex items-center justify-center gap-2 rounded-lg';

  const variantStyles = {
    primary:
      'bg-electric-500 text-white hover:bg-electric-600 hover:shadow-glow active:scale-95',
    secondary:
      'bg-neon-600 text-white hover:bg-neon-700 hover:shadow-glow-neon active:scale-95',
    outline:
      'border-2 border-electric-500 text-electric-400 hover:bg-electric-500 hover:text-white hover:shadow-glow active:scale-95',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedStyles} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}
