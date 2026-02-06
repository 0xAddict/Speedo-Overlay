import React, { useState, useEffect } from 'react';
import { CyberMap } from './CyberMap';

export const MapOverlay = () => {
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
    // This ensures the overlay has a transparent background in the browser source
    const originalBodyBg = document.body.style.backgroundColor;
    const originalHtmlBg = document.documentElement.style.backgroundColor;
    
    // Override the default dark background from index.html
    document.body.style.backgroundColor = 'transparent';
    document.documentElement.style.backgroundColor = 'transparent';

    // Simulate Heading Rotation (Player turning around)
    const navInterval = setInterval(() => {
        setHeading(prev => (prev + 0.5) % 360);
    }, 50);

    return () => {
      clearInterval(navInterval);
      // Restore background if navigating away
      document.body.style.backgroundColor = originalBodyBg;
      document.documentElement.style.backgroundColor = originalHtmlBg;
    };
  }, []);

  return (
    // The wrapper ensures the content is centered and the background is transparent
    <div className="w-screen h-screen bg-transparent flex items-center justify-center overflow-hidden">
      {/* Scale the map up slightly for better visibility as a standalone widget */}
      <div className="transform scale-150 origin-center">
        <CyberMap 
            heading={heading}
            location={location}
        />
      </div>
    </div>
  );
};