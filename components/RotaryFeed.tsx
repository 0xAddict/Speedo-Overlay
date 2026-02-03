import React, { useState, useEffect, ReactNode } from 'react';

export interface FeedItemData {
  id: string;
  icon: ReactNode;
  text: string;
  highlight?: string;
}

interface RotaryFeedProps {
  items: FeedItemData[];
}

export const RotaryFeed: React.FC<RotaryFeedProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Rotate every 30 seconds as requested
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [items.length]);

  // Calculate circular distance
  const getCircularDistance = (index: number, active: number, length: number) => {
    let diff = index - active;
    if (diff > length / 2) diff -= length;
    if (diff < -length / 2) diff += length;
    return diff;
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center mask-fade-vertical">
      
      {/* Decorative center divider (optional, subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {items.map((item, index) => {
        const offset = getCircularDistance(index, activeIndex, items.length);
        
        // We want to show TWO items: offset 0 (Top) and offset 1 (Bottom)
        // Offset -1 is leaving (above), Offset 2 is entering (below)
        const isVisible = offset >= -1 && offset <= 2;
        
        // Items 0 and 1 are "Active" (fully visible)
        const isActivePair = offset === 0 || offset === 1;

        // Position Logic:
        // We center the PAIR. 
        // Offset 0 -> -50% (Above Center)
        // Offset 1 -> +50% (Below Center)
        // Base formula: (offset - 0.5) centers the pair 0 and 1 around 0
        // INCREASED SPACING: 100% allows full separation
        const spacingPercent = 100; 
        const translateY = (offset - 0.5) * spacingPercent;

        const opacity = isActivePair ? 1 : 0; 
        const scale = isActivePair ? 1 : 0.9;
        const blur = isActivePair ? 0 : 4;

        return (
          <div
            key={item.id}
            className="absolute w-full px-5 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
            style={{
              transform: `translateY(${translateY}%) scale(${scale})`,
              opacity: isVisible ? opacity : 0,
              zIndex: 10,
              filter: `blur(${blur}px)`,
              top: '50%', 
              marginTop: '-30px', // Center alignment adjustment based on item height
              visibility: isVisible ? 'visible' : 'hidden',
            }}
          >
            <div className={`
              flex items-center gap-4 w-full justify-start p-3 rounded-xl 
              bg-black/40 border border-white/5 backdrop-blur-sm
              transition-colors duration-500
              ${isActivePair ? 'hover:border-cyan-500/30 hover:bg-black/60' : ''}
            `}>
              <div className="text-pink-500 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]">
                {item.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-rajdhani font-bold tracking-wide leading-none truncate text-gray-300 text-lg">
                  {item.text}
                </span>
                {item.highlight && (
                  <span className="font-orbitron text-[10px] text-cyan-400 tracking-wider mt-1.5 truncate">
                    {item.highlight}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};