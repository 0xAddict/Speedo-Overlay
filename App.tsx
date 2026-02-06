import React, { useState, useEffect } from 'react';
import { CyberMap } from './components/CyberMap';
import { GoalBar } from './components/GoalBar';
import { RotaryFeed, FeedItemData } from './components/RotaryFeed';
import { MapOverlay } from './components/MapOverlay';
import { MapBox } from './components/MapBox';
import { 
  Box, 
  TrendingUp, 
  Clock, 
  User,
  Heart,
  Zap,
  Coins,
  MessageSquare,
  Users
} from 'lucide-react';

const App = () => {
  // ROUTING LOGIC: Check for query params
  const params = new URLSearchParams(window.location.search);
  const isMapOverlay = params.get('overlay') === 'map';
  const isMapBox = params.get('overlay') === 'mapbox';

  // Simulating live data
  const [time, setTime] = useState(new Date());
  
  // Navigation State
  const [heading, setHeading] = useState(0);
  // Helsinki Coordinates
  const location = {
      lat: 60.1699,
      lng: 24.9384,
      city: "NEO-HELSINKI",
      sector: "KAMPI_DISTRICT"
  };

  // State for Events (Data Stream)
  const [events, setEvents] = useState<FeedItemData[]>([
    { id: '1', icon: <Heart size={20} />, text: 'Neon_Rider', highlight: 'New Follower' },
    { id: '2', icon: <Zap size={20} />, text: 'CyberPunk_X', highlight: 'Subscribed x3' },
    { id: '3', icon: <Coins size={20} />, text: 'Glitch_01', highlight: 'Cheered 100 Bits' },
    { id: '4', icon: <Users size={20} />, text: 'NightCity_Host', highlight: 'Raided (45)' },
    { id: '5', icon: <Heart size={20} />, text: 'V_The_Merc', highlight: 'New Follower' },
  ]);

  useEffect(() => {
    // Only run main app simulation if we are NOT in an overlay mode that handles its own data
    if (isMapOverlay || isMapBox) return;

    // Clock interval
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Simulate Heading Rotation (Player turning around)
    const navInterval = setInterval(() => {
        setHeading(prev => (prev + 0.5) % 360);
    }, 50);

    // EVENT SIMULATION (Replacing the fetch)
    const eventInterval = setInterval(() => {
      const eventTypes = [
        { icon: <Heart size={20} />, label: 'New Follower' },
        { icon: <Zap size={20} />, label: 'Subscribed' },
        { icon: <Coins size={20} />, label: 'Donated €5.00' },
        { icon: <MessageSquare size={20} />, label: 'Resub x6' },
      ];
      
      const randomUsernames = ['Zero_Cool', 'Acid_Burn', 'Cereal_Killer', 'Molly_Millions', 'Case_Tessier'];
      
      const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const user = randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
      
      const newEvent: FeedItemData = {
        id: Date.now().toString(),
        icon: type.icon,
        text: user,
        highlight: type.label
      };

      setEvents(prev => [newEvent, ...prev.slice(0, 9)]); // Keep last 10
    }, 15000); // Add new event every 15 seconds

    return () => {
      clearInterval(timer);
      clearInterval(navInterval);
      clearInterval(eventInterval);
    };
  }, [isMapOverlay, isMapBox]);

  // RENDER OVERLAYS IF REQUESTED
  if (isMapOverlay) {
    return <MapOverlay />;
  }

  if (isMapBox) {
    return <MapBox />;
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour12: false });
  };

  return (
    // Mock Background to simulate "Game" view - In production this would be transparent
    <div className="relative w-screen h-screen bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center overflow-hidden flex items-center justify-start p-4">
      
      {/* Overlay darkening layer (simulating game darkening if needed, or just removes for transparent overlay) */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* SIDEBAR CONTAINER - Adjusted to fill available height minus padding */}
      <div className="relative z-10 w-[360px] h-full max-h-full flex flex-col">
        
        {/* HUD Glass Panel */}
        <div className="flex-1 bg-black/70 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden relative">
            
            {/* Top Decoration Lines & Status Header */}
            <div className="flex justify-between items-start p-4 pb-0 relative z-20">
               {/* Time & Viewers Status - Moved here from RotaryFeed */}
               <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Clock size={14} />
                    <span className="font-orbitron text-xs tracking-wider font-bold">{formatTime(time)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-pink-500">
                    <User size={14} />
                    <span className="font-orbitron text-xs tracking-wider font-bold">4,203 VIEWERS</span>
                  </div>
               </div>

               {/* Deco Dots */}
               <div className="flex gap-1.5 pt-1">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
                  <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#d946ef]"></div>
               </div>
            </div>

            {/* SECTION 1: CYBER MINIMAP */}
            <div className="border-b border-white/5 pb-1 relative flex-shrink-0">
                {/* Subtle cyber background grid for this section */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_70%)] pointer-events-none"></div>
                
                <CyberMap 
                    heading={heading}
                    location={location}
                />
            </div>

            {/* SECTION 2: LIVE DATA STREAM (Merged Stats & Events) */}
            <div className="flex-1 flex flex-col min-h-0 border-b border-white/5 relative overflow-hidden bg-black/20">
                
                {/* Static Stats Header */}
                <div className="px-5 py-4 flex-shrink-0 bg-black/30 backdrop-blur-sm z-20 border-b border-white/5">
                    <h3 className="text-cyan-400/80 font-orbitron text-[10px] tracking-[0.3em] font-bold uppercase mb-3 text-center">
                        Data Stream
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
                </div>

                {/* Event Feed (Rotary) - Fills remaining space in this section */}
                <div className="flex-1 relative w-full">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
                     <RotaryFeed items={events} />
                </div>
                
                {/* Decorative corner accent for the whole section */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/30 rounded-br-lg z-20"></div>
            </div>

            {/* SECTION 3: GOALS */}
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
            </div>

        </div>
      </div>
    </div>
  );
};

export default App;