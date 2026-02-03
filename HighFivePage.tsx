import React, { useState, useEffect } from 'react';
import { Hand, Zap } from 'lucide-react';

export const HighFivePage = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [energy, setEnergy] = useState(0); 

  // Simulation: Random triggers to demonstrate the effect
  useEffect(() => {
    const interval = setInterval(() => {
       if (Math.random() > 0.7) triggerAnimation();
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  // Energy Decay logic to simulate "cooling down"
  useEffect(() => {
     const decay = setInterval(() => setEnergy(p => Math.max(0, p - 1.5)), 50);
     return () => clearInterval(decay);
  }, []);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setEnergy(p => Math.min(100, p + 20)); // Boost energy
    setTimeout(() => setIsAnimating(false), 200);
  };

  const getHandColor = () => {
     if (energy > 80) return 'text-red-500 drop-shadow-[0_0_35px_rgba(239,68,68,0.9)]';
     if (energy > 50) return 'text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.7)]';
     return 'text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]';
  };

  return (
    <div className="relative w-screen h-screen bg-[url('https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center overflow-hidden flex items-center justify-end p-8">
       
       {/* Dark Overlay for contrast */}
       <div className="absolute inset-0 bg-black/40 pointer-events-none" />

       {/* Sidebar Container */}
       <div className="relative z-10 w-[380px] h-[60vh] flex flex-col items-center justify-center">
          
          {/* Glass Panel */}
          <div 
            className="w-full h-full bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(6,182,212,0.1)] flex flex-col items-center justify-center relative overflow-hidden cursor-pointer active:scale-95 transition-transform duration-100"
            onClick={triggerAnimation}
          >
             {/* Background decorative pulsing grid */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none"></div>

             {/* The Hand Animation Container */}
             <div className={`relative transition-all duration-150 ease-out z-20 ${isAnimating ? 'scale-150 -rotate-12' : 'scale-100 rotate-0'}`}>
                {/* The Hand Icon */}
                <Hand 
                    className={`w-64 h-64 transition-colors duration-300 ${getHandColor()}`}
                    strokeWidth={1}
                />
                
                {/* Visual Impact Ripple Effect */}
                {isAnimating && (
                    <div className="absolute inset-0 -m-8 border-[6px] border-white/40 rounded-full animate-ping pointer-events-none"></div>
                )}
             </div>

             {/* Dynamic Light Background flash on trigger */}
             <div className={`absolute inset-0 bg-white/10 transition-opacity duration-75 pointer-events-none ${isAnimating ? 'opacity-100' : 'opacity-0'}`}></div>

             {/* Bottom Status / Energy Bar (Hype Meter) */}
             <div className="absolute bottom-10 w-3/4 flex flex-col gap-2 z-20">
                 <div className="flex justify-between items-center text-xs font-orbitron text-white/50 tracking-widest uppercase">
                    <span className="flex items-center gap-1">
                        <Zap size={12} className={energy > 80 ? 'text-red-500 animate-pulse' : 'text-cyan-500'}/> 
                        {energy > 80 ? 'OVERDRIVE' : 'SYNCED'}
                    </span>
                 </div>
                 <div className="h-1.5 w-full bg-gray-800/50 rounded-full overflow-hidden border border-white/5">
                    <div 
                        className={`h-full transition-all duration-200 ease-linear ${energy > 80 ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-cyan-400 shadow-[0_0_10px_cyan]'}`}
                        style={{ width: `${energy}%` }}
                    />
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
};