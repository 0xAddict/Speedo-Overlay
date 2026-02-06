import React, { useEffect } from 'react';
import { Twitch, Youtube } from 'lucide-react';

// Custom Kick Icon since it's not in Lucide yet
const KickIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 3h4.5v6.5h.5l5-6.5h5.5l-6 7.5 6.5 10.5h-5.5l-5-8h-.5v8h-4.5v-18z" />
  </svg>
);

interface SocialBannerProps {
  standalone?: boolean;
}

export const SocialBanner: React.FC<SocialBannerProps> = ({ standalone = true }) => {
  useEffect(() => {
    // Only apply transparency hacks if running as a standalone overlay
    if (!standalone) return;

    // Force transparency for OBS
    document.body.style.backgroundColor = 'transparent';
    document.documentElement.style.backgroundColor = 'transparent';

    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, [standalone]);

  const bannerContent = (
      <div className="relative group">
        {/* Animated Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
        
        {/* Main Content Box */}
        <div className="relative flex items-center gap-8 px-10 py-5 bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            {/* Decorative Cyber Lines */}
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
            <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
            <div className="absolute right-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-transparent via-pink-500/30 to-transparent"></div>

            {/* Left: Main Name Branding */}
            <div className="flex flex-col items-start mr-4">
                <h1 className="font-orbitron font-black text-5xl text-white italic tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">TIMUR</span>
                    <span className="text-cyan-400 text-glow-cyan">FEARLESS</span>
                </h1>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]"></div>
                    <span className="font-rajdhani font-bold text-red-500 tracking-[0.3em] text-sm uppercase">Live Transmission</span>
                </div>
            </div>

            {/* Vertical Divider */}
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

            {/* Right: Socials Grid */}
            <div className="flex gap-8">
                {/* Twitch */}
                <div className="flex flex-col items-center group/icon cursor-pointer">
                    <div className="p-3 rounded-lg bg-[#9146FF]/10 border border-[#9146FF]/20 group-hover/icon:bg-[#9146FF]/20 group-hover/icon:border-[#9146FF] transition-all duration-300 shadow-[0_0_15px_rgba(145,70,255,0.1)] group-hover/icon:shadow-[0_0_20px_rgba(145,70,255,0.4)]">
                        <Twitch className="w-8 h-8 text-[#9146FF]" />
                    </div>
                    <span className="mt-2 font-rajdhani font-bold text-gray-300 text-sm tracking-wide group-hover/icon:text-white transition-colors">/TimurFearless</span>
                </div>

                {/* YouTube */}
                <div className="flex flex-col items-center group/icon cursor-pointer">
                    <div className="p-3 rounded-lg bg-[#FF0000]/10 border border-[#FF0000]/20 group-hover/icon:bg-[#FF0000]/20 group-hover/icon:border-[#FF0000] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.1)] group-hover/icon:shadow-[0_0_20px_rgba(255,0,0,0.4)]">
                        <Youtube className="w-8 h-8 text-[#FF0000]" />
                    </div>
                    <span className="mt-2 font-rajdhani font-bold text-gray-300 text-sm tracking-wide group-hover/icon:text-white transition-colors">/TimurFearless</span>
                </div>

                {/* Kick */}
                <div className="flex flex-col items-center group/icon cursor-pointer">
                    <div className="p-3 rounded-lg bg-[#53FC18]/10 border border-[#53FC18]/20 group-hover/icon:bg-[#53FC18]/20 group-hover/icon:border-[#53FC18] transition-all duration-300 shadow-[0_0_15px_rgba(83,252,24,0.1)] group-hover/icon:shadow-[0_0_20px_rgba(83,252,24,0.4)]">
                        <KickIcon className="w-8 h-8 text-[#53FC18]" />
                    </div>
                    <span className="mt-2 font-rajdhani font-bold text-gray-300 text-sm tracking-wide group-hover/icon:text-white transition-colors">/TimurFearless</span>
                </div>
            </div>

        </div>
      </div>
  );

  if (standalone) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-transparent">
        {bannerContent}
      </div>
    );
  }

  return bannerContent;
};