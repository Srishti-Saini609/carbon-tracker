import { useState, useRef } from 'react';

const AutoCarbonMeter = ({ onActivityLogged }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [travelMode, setTravelMode] = useState('idle');

  const watchId = useRef(null);
  const lastPosition = useRef(null);
  const totalDistance = useRef(0);
  const speedHistory = useRef([]);

  const detectTravelMode = (speedKmh) => {
    if (speedKmh < 0.5) return 'idle';
    if (speedKmh < 6) return 'walking';
    if (speedKmh < 25) return 'cycling';
    return 'driving';
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos((lat1*Math.PI)/180) * Math.cos((lat2*Math.PI)/180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported by your browser');
      return;
    }

    setIsTracking(true);
    totalDistance.current = 0;
    speedHistory.current = [];
    lastPosition.current = null;
    setDistance(0);
    setSpeed(0);
    setTravelMode('idle');

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (lastPosition.current) {
          const dist = calculateDistance(
            lastPosition.current.lat,
            lastPosition.current.lng,
            latitude,
            longitude
          );
          totalDistance.current += dist;
          setDistance(parseFloat(totalDistance.current.toFixed(3)));

          const timeDiff = (position.timestamp - lastPosition.current.time) / 1000;
          if (timeDiff > 0) {
            const speedKmh = (dist * 1000) / timeDiff * 3.6;
            speedHistory.current.push(speedKmh);
            const recentSpeeds = speedHistory.current.slice(-5);
            const avgSpeed = recentSpeeds.reduce((a, b) => a + b, 0) / recentSpeeds.length;
            setSpeed(parseFloat(avgSpeed.toFixed(1)));
            setTravelMode(detectTravelMode(avgSpeed));
          }
        }

        lastPosition.current = { lat: latitude, lng: longitude, time: position.timestamp };
      },
      (err) => console.error('GPS Error:', err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const stopTracking = async () => {
    setIsTracking(false);
    
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }

    if (totalDistance.current > 0.1) {
      const category = travelMode === 'walking' ? 'walking' : 
                       travelMode === 'cycling' ? 'cycling' : 'car_petrol';
      
      const activity = {
        type: 'travel',
        category,
        value: parseFloat(totalDistance.current.toFixed(3)),
        unit: 'km',
        co2e: (travelMode === 'walking' || travelMode === 'cycling') ? 0 : 
              parseFloat((totalDistance.current * 0.192).toFixed(3)),
        date: new Date().toISOString()
      };

      try {
        await onActivityLogged(activity);
      } catch {
        console.error('Failed to save auto-tracked activity');
      }
    }
  };

  const modeIcons = { idle: '⏸️', walking: '🚶', cycling: '🚴', driving: '🚗' };

  return (
    <div className="card overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-green/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="text-left">
          <h2 className="text-2xl font-black text-primary tracking-tight mb-2">Auto Carbon Meter</h2>
          <p className="text-gray-400 text-sm font-medium">Real-time GPS emission intelligence</p>
        </div>

        <div className="flex-1 w-full grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 text-center">
            <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-1">Distance</p>
            <p className="text-xl font-black text-primary">
              {distance.toFixed(2)} <span className="text-[10px] text-gray-400">km</span>
            </p>
          </div>
          <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 text-center">
            <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-1">Velocity</p>
            <p className="text-xl font-black text-primary">
              {speed.toFixed(1)} <span className="text-[10px] text-gray-400">km/h</span>
            </p>
          </div>
          <div className="p-4 bg-accent-green/10 rounded-2xl border border-accent-green/20 text-center">
            <p className="text-[10px] font-black tracking-widest uppercase text-accent-green mb-1">Status</p>
            <p className="text-xl">{modeIcons[travelMode]}</p>
          </div>
        </div>

        <button 
          onClick={isTracking ? stopTracking : startTracking}
          className={`w-full md:w-auto px-10 py-4 text-white rounded-2xl text-lg font-black tracking-tight transition-all duration-300 shadow-xl ${
            isTracking 
              ? 'bg-red-500 shadow-red-500/20 hover:bg-red-600' 
              : 'bg-primary shadow-primary/20 hover:bg-slate-800'
          } hover:-translate-y-0.5 active:translate-y-0`}
        >
          {isTracking ? 'Stop Tracking' : 'Start Meter'}
        </button>
      </div>
    </div>
  );
};

export default AutoCarbonMeter;