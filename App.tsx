import React, { useState, useEffect } from 'react';
import { SpeedGauge } from './components/SpeedGauge';
import { GoalBar } from './components/GoalBar';
import { RotaryFeed, FeedItemData } from './components/RotaryFeed';
import { 
  Box, 
  TrendingUp, 
  Clock, 
  Calendar, 
  Timer,
  Activity,
  Heart,
  Zap,
  User,
  Radio
} from 'lucide-react';

const App = () => {
  // Simulating live data
  const [speed, setSpeed] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Clock interval
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Fake speed simulation
    const speedInterval = setInterval(() => {
      setSpeed(prev => {
        const change = Math.floor(Math.random() * 10) - 4; // fluctuates
        const newSpeed = prev + change;
        return newSpeed < 0 ? 0 : newSpeed > 99 ? 99 : newSpeed;
      });
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(speedInterval);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour12: false });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB'); // DD.MM.YYYY format
  };

  // Static Data for SpeedGauge Callouts
  const weatherData = {
      temp: "11°C",
      condition: "ACID RAIN",
      wind: "2 M/S"
  };

  const locationData = {
      city: "NEO-HELSINKI",
      sector: "SECTOR 4"
  };

  // Prepare data for the Rotary Feed
  // Removed Location, Weather, Wind as they are now in the gauge
  const feedItems: FeedItemData[] = [
    { 
      id: 'follower', 
      icon: <Heart size={20} />, 
      text: "New Follower", 
      highlight: "CyberSamurai_2077" 
    },
    { 
      id: 'sub', 
      icon: <Zap size={20} />, 
      text: "Subscribed", 
      highlight: "x2 Months - Thank you!" 
    },
    { 
      id: 'time', 
      icon: <Clock size={20} />, 
      text: "Local Time", 
      highlight: formatTime(time)
    },
    { 
      id: 'date', 
      icon: <Calendar size={20} />, 
      text: "Date", 
      highlight: formatDate(time) 
    },
    { 
      id: 'uptime', 
      icon: <Timer size={20} />, 
      text: "Stream Uptime", 
      highlight: "02:34:58" 
    },
    { 
      id: 'viewers', 
      icon: <User size={20} />, 
      text: "Live Viewers", 
      highlight: "4,203 Netrunners" 
    }
  ];

  return (
    // Mock Background to simulate "Game" view - In production this would be transparent
    <div className="relative w-screen h-screen bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center overflow-hidden flex items-center justify-start p-4">
      
      {/* Overlay darkening layer (simulating game darkening if needed, or just removes for transparent overlay) */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* SIDEBAR CONTAINER - Adjusted to fill available height minus padding */}
      <div className="relative z-10 w-[360px] h-full max-h-full flex flex-col">
        
        {/* HUD Glass Panel */}
        <div className="flex-1 bg-black/70 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden relative">
            
            {/* Top Decoration Lines */}
            <div className="absolute top-0 right-0 p-4 flex gap-1.5 z-20">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
                <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#d946ef]"></div>
            </div>

            {/* SECTION 1: VELOCITY & ENV DATA */}
            <div className="border-b border-white/5 pb-1 relative flex-shrink-0">
                {/* Subtle cyber background grid for this section */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_70%)] pointer-events-none"></div>
                <SpeedGauge 
                    speed={speed} 
                    weather={weatherData}
                    location={locationData}
                />
            </div>

            {/* SECTION 2: TODAY'S STATS */}
            <div className="px-5 py-4 border-b border-white/5 relative overflow-hidden flex-shrink-0">
                <h3 className="text-cyan-400/80 font-orbitron text-[10px] tracking-[0.3em] font-bold uppercase mb-3 text-center">
                    Today's Stats
                </h3>
                
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                        <Box className="text-pink-500 w-5 h-5 drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]" />
                        <span className="font-rajdhani font-bold text-gray-400 text-lg uppercase tracking-wider">Deliveries</span>
                    </div>
                    <span className="font-orbitron text-2xl font-bold text-white drop-shadow-md">9</span>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="text-green-400 w-5 h-5 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]" />
                        <span className="font-rajdhani font-bold text-gray-400 text-lg uppercase tracking-wider">Earnings</span>
                    </div>
                    <span className="font-orbitron text-3xl font-bold text-green-400 text-glow-green">€35.12</span>
                </div>
                
                {/* Decorative corner accent */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/30 rounded-br-lg"></div>
            </div>

            {/* SECTION 3: LIVE FEED (Dual Card Stream) */}
            <div className="flex-1 flex flex-col min-h-0 border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-2 left-0 w-full z-20 flex justify-center items-center gap-2">
                    <Radio className="w-3 h-3 text-cyan-500 animate-pulse" />
                    <h3 className="text-cyan-400/80 font-orbitron text-[10px] tracking-[0.3em] font-bold uppercase">
                        Data Stream
                    </h3>
                </div>

                {/* Rotary Feed Component */}
                <div className="flex-1 w-full relative">
                   <RotaryFeed items={feedItems} />
                </div>
                 
                 {/* Decorative background element */}
                 <Activity className="absolute bottom-4 right-4 text-white/5 w-24 h-24 stroke-1 pointer-events-none" />
            </div>

            {/* SECTION 4: GOALS */}
            <div className="px-5 py-4 bg-gradient-to-t from-cyan-900/20 to-transparent flex-shrink-0">
                 <h3 className="text-pink-500 font-orbitron text-[10px] tracking-[0.3em] font-bold uppercase mb-4 text-center drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">
                    Goals
                </h3>
                
                <div className="flex justify-center gap-6">
                    <GoalBar 
                        label="Daily"
                        current={35}
                        target={200}
                        subLabel="Daily Goal"
                    />
                    <GoalBar 
                        label="Monthly"
                        current={35}
                        target={3000}
                        subLabel="Monthly Goal"
                    />
                </div>

                {/* Bottom Dots */}
                <div className="flex justify-center gap-2 mt-4">
                     <div className="w-2 h-2 bg-cyan-400 rounded-sm animate-pulse"></div>
                     <div className="w-2 h-2 bg-pink-500 rounded-sm animate-pulse delay-75"></div>
                     <div className="w-2 h-2 bg-yellow-400 rounded-sm animate-pulse delay-150"></div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default App;