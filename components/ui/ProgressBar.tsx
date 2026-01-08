'use client';

import React from 'react';

interface ProgressBarProps {
  percent?: number;
  children: React.ReactNode;
}

interface StepProps {
  children: (props: { accomplished: boolean }) => React.ReactNode;
  transition?: string;
}

export function ProgressBar({ percent = 0, children }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-primary-red transition-all duration-300"
          style={{ width: `${Math.max(0, Math.min(100, percent || 0))}%` }}
        />
      </div>
      <div className="flex justify-between mt-4">{children}</div>
    </div>
  );
}

export function Step({ children, transition }: StepProps) {
  return <>{children({ accomplished: false })}</>;
}
