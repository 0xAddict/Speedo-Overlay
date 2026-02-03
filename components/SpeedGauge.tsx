import React from 'react';
import { Cloud, MapPin, Wind } from 'lucide-react';

interface SpeedGaugeProps {
  speed: number;
  weather: {
    temp: string;
    condition: string;
    wind: string;
  };
  location: {
    city: string;
    sector: string;
  };
}

export const SpeedGauge: React.FC<SpeedGaugeProps> = ({ speed, weather, location }) => {
  const radius = 65; 
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // 75% of the circle is used for the gauge (open at bottom)
  const strokeDashoffset = circumference - (0.75 * circumference); 
  
  // Animation for the "active" part
  const speedPercent = Math.min(speed / 100, 1);
  const activeOffset = circumference - (speedPercent * 0.75 * circumference);

  return (
    <div className="relative w-full h-[240px] flex items-center justify-center overflow-hidden">
      
      {/* TOP LEFT CALLOUT: WEATHER */}
      <div className="absolute top-4 left-4 flex flex-col items-start z-20">
        <div className="flex items-center gap-2 mb-1">
             <Cloud className="text-cyan-400 w-5 h-5" />
             <span className="font-orbitron text-2xl font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                 {weather.temp}
             </span>
        </div>
        <div className="flex flex-col items-start pl-1">
             <span className="font-rajdhani text-cyan-300 text-xs font-bold uppercase tracking-wider leading-none mb-1">
                 {weather.condition}
             </span>
             <div className="flex items-center gap-1 text-gray-400 text-[10px] font-rajdhani font-semibold">
                 <Wind size={10} /> {weather.wind}
             </div>
        </div>
        
        {/* Connecting Line (Diagonal Down-Right) */}
        <div className="absolute top-[45px] left-[80px] w-[60px] h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent rotate-[30deg] origin-left"></div>
        <div className="absolute top-[45px] left-[80px] w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_#22d3ee]"></div>
      </div>

      {/* CENTER GAUGE */}
      <div className="relative flex flex-col items-center justify-center mx-auto z-10 pt-4">
        <h2 className="text-cyan-400 font-orbitron text-[10px] tracking-[0.2em] font-bold mb-1 uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
            Velocity
        </h2>

        <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Background SVG Ring */}
            <svg
            height={radius * 2.5}
            width={radius * 2.5}
            className="rotate-[135deg] absolute"
            >
            <circle
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={stroke}
                fill="transparent"
                r={normalizedRadius}
                cx={radius * 1.25}
                cy={radius * 1.25}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
            />
            {/* Active Gradient Track */}
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d946ef" /> 
                <stop offset="100%" stopColor="#06b6d4" /> 
                </linearGradient>
                <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
                </filter>
            </defs>
            <circle
                stroke="url(#gradient)"
                strokeWidth={stroke}
                fill="transparent"
                r={normalizedRadius}
                cx={radius * 1.25}
                cy={radius * 1.25}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset: activeOffset, transition: 'stroke-dashoffset 0.5s ease-out' }}
                strokeLinecap="round"
                filter="url(#glow)"
            />
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 mt-2">
            <div className="font-orbitron text-4xl font-black italic text-white text-glow-pink flex">
                {speed < 10 ? `0${speed}` : speed}
            </div>
            <span className="text-pink-500 font-orbitron text-[10px] tracking-widest font-bold mt-1 drop-shadow-md">
                KM/H
            </span>
            </div>
        </div>
      </div>

      {/* BOTTOM RIGHT CALLOUT: LOCATION */}
      <div className="absolute bottom-4 right-4 flex flex-col items-end z-20">
        
        {/* Connecting Line (Diagonal Up-Left) */}
        <div className="absolute bottom-[45px] right-[100px] w-[60px] h-[1px] bg-gradient-to-l from-pink-500/50 to-transparent rotate-[30deg] origin-right"></div>
        <div className="absolute bottom-[45px] right-[100px] w-1 h-1 bg-pink-500 rounded-full shadow-[0_0_5px_#ec4899]"></div>

        <div className="flex items-center gap-2 mb-1">
             <span className="font-orbitron text-lg font-bold text-white leading-tight text-right">
                 {location.city}
             </span>
             <MapPin className="text-pink-500 w-5 h-5 drop-shadow-[0_0_5px_#ec4899]" />
        </div>
        <span className="font-rajdhani text-pink-400/80 text-xs font-bold uppercase tracking-wider mr-1">
             {location.sector}
        </span>
      </div>

      {/* Decorative Grid Background for Gauge Area */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.05)_0%,_transparent_60%)] pointer-events-none"></div>
    </div>
  );
};