import React from 'react';

interface GoalBarProps {
  label: string;
  current: number;
  target: number;
  subLabel: string;
}

export const GoalBar: React.FC<GoalBarProps> = ({ label, current, target, subLabel }) => {
  const percent = Math.min((current / target) * 100, 100);

  return (
    <div className="flex flex-col items-center gap-2 group">
      {/* Target Amount */}
      <span className="font-orbitron text-cyan-400 font-bold text-lg drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">
        €{target}
      </span>

      {/* Bar Container */}
      <div className="relative w-16 h-36 bg-black/40 rounded-lg border border-cyan-500/30 backdrop-blur-sm overflow-hidden box-glow-cyan transition-all duration-300 group-hover:border-cyan-400/60">
        
        {/* Background Grid Lines (Decorative) */}
        <div className="absolute inset-0 flex flex-col justify-between py-2 opacity-20 pointer-events-none">
            <div className="w-full h-[1px] bg-cyan-500"></div>
            <div className="w-full h-[1px] bg-cyan-500"></div>
            <div className="w-full h-[1px] bg-cyan-500"></div>
        </div>

        {/* Fill */}
        <div 
            className="absolute bottom-0 w-full bg-cyan-500/20 rounded-b-lg transition-all duration-1000 ease-out flex items-end justify-center"
            style={{ height: `${percent}%` }}
        >
             {/* The solid fill at the very bottom/top of the percentage */}
             <div className="w-full h-full bg-gradient-to-t from-cyan-600/60 to-transparent absolute bottom-0"></div>
             <div className="w-full h-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] absolute top-0"></div>
        </div>

        {/* Percentage Text centered inside */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
             <span className="font-orbitron font-bold text-white text-xl drop-shadow-md">{Math.round(percent)}%</span>
        </div>
      </div>

      {/* Current Amount */}
      <div className="flex flex-col items-center">
        <span className="font-orbitron text-white font-bold text-xl tracking-wider">
            €{current}
        </span>
        <span className="font-rajdhani text-cyan-500/80 text-xs font-bold uppercase tracking-wider">
            {subLabel}
        </span>
      </div>
    </div>
  );
};