import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Compass, Navigation, WifiOff } from 'lucide-react';

// !IMPORTANT: Replace this with your own Mapbox Public Token
const MAPBOX_TOKEN = 'pk.eyJ1Ijoic29ha2xpdmUiLCJhIjoiY21rbzEzYThmMDE3NTNmc2V5djU2bm0xYSJ9.SKul_Un2oWYDLQVfLn2kwA'; 

interface CyberMapProps {
  heading: number; // 0-360 degrees
  location: {
    lat: number;
    lng: number;
    city: string;
    sector: string;
  };
}

export const CyberMap: React.FC<CyberMapProps> = ({ heading, location }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    if (!mapContainer.current) return;
    
    if (MAPBOX_TOKEN.includes('example')) {
        setMapError(true);
        setErrorMessage("TOKEN INVALID");
        return;
    }

    const initializeMap = async () => {
        // FIX: Worker Handling for Sandbox Environments
        // We strictly define the worker URL to avoid blob/eval issues if possible,
        // or use the blob approach if CDN access is allowed.
        if (!(mapboxgl as any).workerUrl) {
            const workerCdnUrl = "https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl-csp-worker.js";
            (mapboxgl as any).workerUrl = workerCdnUrl;
        }

        if (!isMounted) return;

        mapboxgl.accessToken = MAPBOX_TOKEN;

        try {
            // FIX: "Blocked a frame" SecurityError often happens when checking window.top
            // `trackResize: false` is essential.
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/dark-v11', 
                center: [location.lng, location.lat],
                zoom: 15,
                pitch: 0, 
                bearing: heading,
                interactive: false, 
                attributionControl: false,
                trackResize: false, // CRITICAL FIX for iframe security errors
                refreshExpiredTiles: false,
                cooperativeGestures: false,
                collectResourceTiming: false, 
                crossSourceCollisions: false
            });

            // Manual resize observer since trackResize is false
            const resizeObserver = new ResizeObserver(() => {
                try {
                   if (map.current) map.current.resize();
                } catch(e) {
                   // Ignore resize errors
                }
            });
            resizeObserver.observe(mapContainer.current);

        } catch (e: any) {
            console.error("Mapbox init failed", e);
            if (e.name === 'SecurityError' || e.message?.includes('Blocked a frame') || e.message?.includes('Location')) {
                setErrorMessage("SECURITY BLOCK");
            } else {
                setErrorMessage("SYSTEM ERROR");
            }
            setMapError(true);
            return;
        }

        if (!map.current) return;

        map.current.on('load', () => {
            if(!map.current) return;
            try {
                const layers = map.current.getStyle().layers;
                const labelLayerId = layers?.find(
                    (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
                )?.id;

                if (map.current.getLayer('add-3d-buildings')) return;

                map.current.addLayer(
                    {
                        'id': 'add-3d-buildings',
                        'source': 'composite',
                        'source-layer': 'building',
                        'filter': ['==', 'extrude', 'true'],
                        'type': 'fill-extrusion',
                        'minzoom': 15,
                        'paint': {
                            'fill-extrusion-color': '#111',
                            'fill-extrusion-height': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'height']
                            ],
                            'fill-extrusion-base': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'min_height']
                            ],
                            'fill-extrusion-opacity': 0.8
                        }
                    },
                    labelLayerId
                );
            } catch(e) {
                console.log("Could not add 3D buildings", e);
            }
        });

        map.current.on('error', (e) => {
            // Suppress unhandled errors that don't break the map
            if (e.error?.message?.includes('Forbidden') || e.error?.message?.includes('Unauthorized')) {
                setMapError(true);
                setErrorMessage("AUTH FAILED");
            }
        });
    };

    initializeMap();

    return () => {
      isMounted = false;
      map.current?.remove();
    };
  }, []);

  // Update Bearing (Rotation) and Center when props change
  useEffect(() => {
    if (!map.current) return;
    try {
        map.current.setBearing(heading);
        map.current.setCenter([location.lng, location.lat]);
    } catch (e) {
        // Ignored
    }
  }, [heading, location]);

  return (
    <div className="relative w-full h-[280px] flex items-center justify-center">
      
      {/* MAP CONTAINER (THE ORB) */}
      <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.4)] bg-black z-10">
        
        {/* The Actual Map */}
        {mapError ? (
            <div className="w-full h-full bg-gray-950 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-10 bg-cover mix-blend-overlay pointer-events-none"></div>
                <div className="absolute inset-0 bg-red-900/20 animate-pulse pointer-events-none"></div>
                
                <WifiOff className="text-red-500 w-8 h-8 mb-2 animate-bounce" />
                <span className="text-red-500 font-bold font-orbitron text-xs tracking-widest mb-1">OFFLINE</span>
                <span className="text-red-400/70 text-[10px] font-mono border border-red-500/30 px-2 py-0.5 rounded">
                    {errorMessage || "CONNECTION LOST"}
                </span>
            </div>
        ) : (
            <div 
                ref={mapContainer} 
                className="w-full h-full grayscale contrast-125 brightness-110 sepia-[.5] hue-rotate-[160deg]" 
                style={{ 
                    filter: 'invert(1) grayscale(1) brightness(0.7) sepia(1) hue-rotate(130deg) saturate(3) contrast(1.5)' 
                }}
            />
        )}

        {/* HUD OVERLAY: GRID & SCANLINES */}
        <div className="absolute inset-0 pointer-events-none rounded-full z-20">
             <div className="absolute inset-0 bg-[radial-gradient(transparent_30%,_rgba(6,182,212,0.2)_31%,_transparent_32%,_transparent_60%,_rgba(6,182,212,0.2)_61%,_transparent_62%)]"></div>
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/30"></div>
             <div className="absolute top-0 left-1/2 w-[1px] h-full bg-cyan-500/30"></div>
             <div className="absolute inset-0 bg-[radial-gradient(transparent_50%,_black_100%)]"></div>
        </div>

        {!mapError && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-white drop-shadow-[0_0_8px_rgba(255,255,255,1)]">
                <Navigation size={24} fill="currentColor" className="text-white" />
            </div>
        )}
      </div>

      <div className={`absolute w-[240px] h-[240px] rounded-full border border-dashed ${mapError ? 'border-red-500/20' : 'border-cyan-500/20'} animate-spin-slow z-0 pointer-events-none`}></div>
      <div className={`absolute w-[260px] h-[260px] rounded-full border border-dotted ${mapError ? 'border-red-500/20' : 'border-pink-500/20'} z-0 pointer-events-none opacity-50`}></div>

      {!mapError && (
          <div 
            className="absolute w-64 h-64 rounded-full pointer-events-none z-10 flex justify-center pt-1"
            style={{ transform: `rotate(${-heading}deg)`, transition: 'transform 0.1s linear' }}
          >
             <div className="flex flex-col items-center">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_red]"></div>
                <span className="font-orbitron font-bold text-red-500 text-[10px] mt-0.5">N</span>
             </div>
          </div>
      )}

      <div className="absolute bottom-2 right-4 flex flex-col items-end z-30 pointer-events-none">
            <span className="font-orbitron text-white font-bold text-lg leading-none tracking-widest drop-shadow-md">
                {location.sector}
            </span>
            <span className={`font-rajdhani ${mapError ? 'text-red-400' : 'text-cyan-400'} text-xs font-bold uppercase`}>
                {location.city}
            </span>
      </div>

      {!mapError && (
        <div className="absolute top-4 left-4 flex items-center gap-1 z-30 opacity-80">
            <Compass size={14} className="text-cyan-400" />
            <span className="font-mono text-xs text-cyan-300 font-bold">{Math.round(heading)}°</span>
        </div>
      )}

    </div>
  );
};