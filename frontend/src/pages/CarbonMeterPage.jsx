import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CarbonMeterPage = ({ onActivityLogged }) => {
  const navigate = useNavigate();
  const [isTracking, setIsTracking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [travelMode, setTravelMode] = useState('idle');
  const [sessionTime, setSessionTime] = useState(0);
  const [error, setError] = useState('');

  const watchId = useRef(null);
  const lastPosition = useRef(null);
  const totalDistance = useRef(0);
  const speedHistory = useRef([]);
  const timerRef = useRef(null);
  const sessionStart = useRef(null);

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

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    setIsTracking(true);
    totalDistance.current = 0;
    speedHistory.current = [];
    lastPosition.current = null;
    sessionStart.current = Date.now();
    setDistance(0);
    setSpeed(0);
    setTravelMode('idle');
    setSessionTime(0);
    setError('');

    timerRef.current = setInterval(() => {
      setSessionTime(Math.floor((Date.now() - sessionStart.current) / 1000));
    }, 1000);

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
            const avgSpeed = speedHistory.current.slice(-5).reduce((a, b) => a + b, 0) / Math.min(speedHistory.current.length, 5);
            setSpeed(parseFloat(avgSpeed.toFixed(1)));
            setTravelMode(detectTravelMode(avgSpeed));
          }
        }

        lastPosition.current = { lat: latitude, lng: longitude, time: position.timestamp };
      },
      (err) => {
        if (err.code === 1) setError('Location permission denied');
        else if (err.code === 2) setError('Location unavailable');
        else setError('Location request timed out');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const stopTracking = async () => {
    setIsTracking(false);
    
    if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    if (timerRef.current) clearInterval(timerRef.current);

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
        alert(`✅ Trip Logged!\n📍 ${totalDistance.current.toFixed(2)} km\n⏱️ ${formatTime(sessionTime)}`);
      } catch {
        alert('Failed to save trip. Please try again.');
      }
    }
    navigate('/');
  };

  useEffect(() => {
    return () => {
      if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const getModeIcon = () => {
    switch(travelMode) {
      case 'walking': return '🚶';
      case 'cycling': return '🚴';
      case 'driving': return '🚗';
      default: return '⏸️';
    }
  };

  const getModeLabel = () => {
    switch(travelMode) {
      case 'walking': return 'Walking';
      case 'cycling': return 'Cycling';
      case 'driving': return 'Driving';
      default: return 'Idle';
    }
  };

  const modeColorClasses = {
    idle: 'bg-gray-100 text-gray-400',
    walking: 'bg-green-50 text-green-600',
    cycling: 'bg-blue-50 text-blue-600',
    driving: 'bg-red-50 text-red-600',
  };

  return (
    <div className="min-h-screen mesh-gradient">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 sm:px-10 pb-20 page-enter">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-2">Live Carbon Meter</h1>
            <p className="text-gray-500 font-medium">Real-time emission intelligence for your journey.</p>
          </div>
          <div className="flex bg-white/50 backdrop-blur-xl p-1.5 rounded-2xl border border-white shadow-sm">
            <div className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-500 ${isTracking ? 'bg-accent-green/10 text-accent-green animate-pulse' : 'bg-gray-100 text-gray-400'}`}>
              {isTracking ? '📡 System Active' : '⚪ System Standby'}
            </div>
          </div>
        </div>

        <div className="card overflow-hidden relative p-0 fade-in-up">
          <div className="p-12 text-center relative z-10">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-8 font-bold border border-red-100 text-sm" role="alert">
                ⚠️ {error}
              </div>
            )}

            <div className="mb-12">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400 mb-4 block">Session Duration</span>
              <div className="text-7xl font-black text-primary tracking-tighter">
                {formatTime(sessionTime)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-4">Travel Mode</p>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{getModeIcon()}</span>
                  <span className={`text-lg font-black tracking-tight ${modeColorClasses[travelMode].split(' ')[1]}`}>
                    {getModeLabel()}
                  </span>
                </div>
              </div>

              <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                <p className="text-[10px] font-black tracking-widest uppercase text-white/40 mb-4">Distance Covered</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-black">{distance.toFixed(2)}</span>
                  <span className="text-sm font-bold text-white/30">km</span>
                </div>
              </div>

              <div className="bg-accent-gold p-8 rounded-[2.5rem] text-white shadow-2xl shadow-accent-gold/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                <p className="text-[10px] font-black tracking-widest uppercase text-white/60 mb-4">Est. Emissions</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-black">
                    {((travelMode === 'walking' || travelMode === 'cycling') ? 0 : (distance * 0.192)).toFixed(2)}
                  </span>
                  <span className="text-sm font-bold text-white/50">kg</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={isTracking ? stopTracking : startTracking}
                className={`w-full max-w-md py-6 rounded-[2rem] text-xl font-black tracking-tight transition-all duration-500 shadow-2xl ${
                  isTracking 
                    ? 'bg-red-500 text-white shadow-red-500/30 hover:bg-red-600' 
                    : 'bg-accent-green text-white shadow-accent-green/30 hover:bg-emerald-600'
                } hover:-translate-y-1 hover:shadow-3xl active:translate-y-0`}
              >
                {isTracking ? 'Stop Intelligence' : 'Initialize Tracking'}
              </button>
              
              <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-green"></div> GPS Optimized
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-gold"></div> Low Battery Impact
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50/50 p-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-xl">🛰️</div>
              <div>
                <p className="text-xs font-black text-primary tracking-tight">System Status</p>
                <p className="text-[10px] font-medium text-gray-400">High-precision geolocation engaged</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-xl">🔋</div>
              <div>
                <p className="text-xs font-black text-primary tracking-tight">Energy Profile</p>
                <p className="text-[10px] font-medium text-gray-400">Optimized background processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonMeterPage;