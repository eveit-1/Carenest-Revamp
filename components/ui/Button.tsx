'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  href,
  children,
  className,
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles =
    'px-4 py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary-green text-white hover:bg-opacity-90 focus:ring-primary-green',
    secondary: 'bg-primary-red text-white hover:bg-opacity-90 focus:ring-primary-red',
    outline: 'border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white',
  };

  const classes = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
