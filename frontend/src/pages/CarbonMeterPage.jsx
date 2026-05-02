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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pb-12 page-enter">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            🌍 Auto Carbon Meter
          </h1>
          <p className="text-white/70 mt-2">Track your travel emissions in real-time</p>
        </div>

        <div className="card text-center py-10 px-5 fade-in-up">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-5 font-medium" role="alert">
              ⚠️ {error}
            </div>
          )}

          <div className="text-5xl font-bold text-gray-800 mb-3 font-mono tracking-wider">
            {formatTime(sessionTime)}
          </div>

          <div className={`inline-block px-8 py-4 rounded-2xl mb-8 transition-colors duration-300 ${modeColorClasses[travelMode]}`}>
            <p className="text-sm text-gray-500 mb-1">Current Mode</p>
            <p className="text-3xl font-bold">
              {getModeIcon()} {getModeLabel()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 mb-8">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
              <p className="text-sm opacity-90 mb-1">📍 Distance</p>
              <p className="text-4xl font-bold">
                {distance.toFixed(2)} <span className="text-base font-normal">km</span>
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-400 to-rose-500 p-6 rounded-2xl text-white shadow-lg">
              <p className="text-sm opacity-90 mb-1">🚀 Speed</p>
              <p className="text-4xl font-bold">
                {speed.toFixed(1)} <span className="text-base font-normal">km/h</span>
              </p>
            </div>
          </div>

          <button 
            onClick={isTracking ? stopTracking : startTracking}
            className={`w-full max-w-md py-5 text-white rounded-2xl text-2xl font-bold cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
              isTracking 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            } ${isTracking ? 'pulse-glow' : ''}`}
          >
            {isTracking ? '⏹️ Stop Tracking' : '▶️ Start Tracking'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarbonMeterPage;