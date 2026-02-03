import React, { ReactNode } from 'react';

interface LiveFeedItemProps {
  icon: ReactNode;
  text: string;
  highlight?: string; // Optional brighter text part
}

export const LiveFeedItem: React.FC<LiveFeedItemProps> = ({ icon, text, highlight }) => {
  return (
    <div className="flex items-center gap-3 py-1.5 px-2 rounded hover:bg-white/5 transition-colors">
      <div className="text-pink-500 drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]">
        {icon}
      </div>
      <span className="font-rajdhani font-semibold text-lg text-gray-200 tracking-wide">
        {text} {highlight && <span className="text-cyan-300 ml-1">{highlight}</span>}
      </span>
    </div>
  );
};