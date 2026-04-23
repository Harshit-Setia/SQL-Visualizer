import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  isWip?: boolean;
}

export const StatCard = ({ label, value, unit, isWip }: StatCardProps) => (
  <div className="relative bg-surface-low p-6 rounded-lg border border-surface-bright/5">
    
    {/* The actual Card Content */}
    <p className="font-display text-[9px] uppercase tracking-[0.4em] text-white/30 mb-2">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className="font-display text-4xl font-bold text-primary">{value}</span>
      <span className="font-mono text-xs text-primary/50 tracking-tighter">{unit}</span>
    </div>

    {/* THE WORK IN PROGRESS OVERLAY */}
    {isWip && (
      <div className="absolute inset-0 z-20 bg-background/60 backdrop-blur-xs flex flex-col items-center justify-center rounded-lg border border-primary/20 cursor-not-allowed group">
        {/* Caution Pattern Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[repeating-linear-gradient(-45deg,#FF8C00,#FF8C00_10px,transparent_10px,transparent_20px)]" />
        
        {/* WIP Text/Image */}
        <div className="relative z-30 flex flex-col items-center gap-2">
           <span className="text-primary text-xl animate-pulse">⚡</span>
           <span className="font-display text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Work in Progress</span>
        </div>
      </div>
    )}
  </div>
);
