import React, { useState, useEffect } from 'react';
import { CyberMap } from './CyberMap';

export const MapBox = () => {
  const [heading, setHeading] = useState(0);
  
  // Default Location (Neo-Helsinki)
  const location = {
      lat: 60.1699,
      lng: 24.9384,
      city: "NEO-HELSINKI",
      sector: "KAMPI_DISTRICT"
  };

  useEffect(() => {
    // CRITICAL FOR OBS: Force transparency on the document body
    const originalBodyBg = document.body.style.backgroundColor;
    const originalHtmlBg = document.documentElement.style.backgroundColor;
    
    document.body.style.backgroundColor = 'transparent';
    document.documentElement.style.backgroundColor = 'transparent';

    // Simulate Heading Rotation
    const navInterval = setInterval(() => {
        setHeading(prev => (prev + 0.5) % 360);
    }, 50);

    return () => {
      clearInterval(navInterval);
      document.body.style.backgroundColor = originalBodyBg;
      document.documentElement.style.backgroundColor = originalHtmlBg;
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-transparent flex items-center justify-center">
        {/* The "Box" Container - A stylized frame around the map */}
        <div className="relative p-6 pt-8 bg-black/80 border border-cyan-500/30 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.2)] backdrop-blur-md">
            
            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400 -translate-x-[1px] -translate-y-[1px]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400 translate-x-[1px] -translate-y-[1px]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400 -translate-x-[1px] translate-y-[1px]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400 translate-x-[1px] translate-y-[1px]"></div>
            
            {/* Header / Label Tag */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-4 py-0.5 border border-cyan-500/50 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.4)] z-20">
                <span className="font-orbitron text-[10px] text-cyan-400 tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                    Tactical Map
                </span>
            </div>

            {/* Inner Content */}
            <div className="transform scale-90">
                <CyberMap heading={heading} location={location} />
            </div>

            {/* Bottom Status Decoration */}
            <div className="absolute bottom-2 left-0 w-full flex justify-center opacity-50">
                 <div className="flex gap-1">
                    <div className="w-12 h-1 bg-cyan-500/20 rounded-full"></div>
                    <div className="w-2 h-1 bg-cyan-500/40 rounded-full"></div>
                    <div className="w-2 h-1 bg-cyan-500/40 rounded-full"></div>
                    <div className="w-12 h-1 bg-cyan-500/20 rounded-full"></div>
                 </div>
            </div>
        </div>
    </div>
  );
};