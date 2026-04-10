import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
            const avgSpeed = speedHistory.current.slice(-5).reduce((a, b) => a + b, 0) / 5;
            setSpeed(parseFloat(avgSpeed.toFixed(1)));
            setTravelMode(detectTravelMode(avgSpeed));
          }
        }

        lastPosition.current = { lat: latitude, lng: longitude, time: position.timestamp };
      },
      (err) => {
        if (err.code === 1) setError('Location permission denied');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const stopTracking = () => {
    setIsTracking(false);
    
    if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    if (timerRef.current) clearInterval(timerRef.current);

    if (totalDistance.current > 0.1) {
      const category = travelMode === 'walking' ? 'walking' : 
                       travelMode === 'cycling' ? 'cycling' : 'car_petrol';
      
      const activity = {
        id: Date.now().toString(),
        type: 'travel',
        category,
        value: parseFloat(totalDistance.current.toFixed(3)),
        unit: 'km',
        co2e: (travelMode === 'walking' || travelMode === 'cycling') ? 0 : 
              parseFloat((totalDistance.current * 0.192).toFixed(3)),
        date: new Date().toISOString()
      };

      onActivityLogged(activity);
      alert(`✅ Trip Logged!\n📍 ${totalDistance.current.toFixed(2)} km\n⏱️ ${formatTime(sessionTime)}`);
      navigate('/');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    return () => {
      if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const getModeColor = () => {
    switch(travelMode) {
      case 'walking': return '#27ae60';
      case 'cycling': return '#3498db';
      case 'driving': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getModeIcon = () => {
    switch(travelMode) {
      case 'walking': return '🚶';
      case 'cycling': return '🚴';
      case 'driving': return '🚗';
      default: return '⏸️';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            ← Back
          </button>
          <h1 style={{ color: 'white', margin: 0, fontSize: '28px' }}>
            🌍 Auto Carbon Meter
          </h1>
          <div style={{ width: '80px' }}></div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          {error && (
            <div style={{ 
              background: '#fee', 
              color: '#e74c3c', 
              padding: '12px', 
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ 
            fontSize: '48px', 
            fontWeight: '700', 
            color: '#333',
            marginBottom: '10px',
            fontFamily: 'monospace'
          }}>
            {formatTime(sessionTime)}
          </div>

          <div style={{ 
            padding: '16px 32px',
            background: travelMode === 'idle' ? '#f8f9fa' : `${getModeColor()}20`,
            borderRadius: '12px',
            marginBottom: '30px',
            display: 'inline-block'
          }}>
            <p style={{ fontSize: '14px', color: '#777', marginBottom: '4px' }}>Current Mode</p>
            <p style={{ 
              fontSize: '32px', 
              fontWeight: '700',
              color: travelMode === 'idle' ? '#95a5a6' : getModeColor()
            }}>
              {getModeIcon()} {travelMode === 'idle' ? 'Idle' : 
                             travelMode === 'walking' ? 'Walking' : 
                             travelMode === 'cycling' ? 'Cycling' : 'Driving'}
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '24px',
              borderRadius: '12px',
              color: 'white'
            }}>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>📍 Distance</p>
              <p style={{ fontSize: '36px', fontWeight: '700' }}>
                {distance.toFixed(2)} <span style={{ fontSize: '16px' }}>km</span>
              </p>
            </div>

            <div style={{ 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              padding: '24px',
              borderRadius: '12px',
              color: 'white'
            }}>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>🚀 Speed</p>
              <p style={{ fontSize: '36px', fontWeight: '700' }}>
                {speed.toFixed(1)} <span style={{ fontSize: '16px' }}>km/h</span>
              </p>
            </div>
          </div>

          <button 
            onClick={isTracking ? stopTracking : startTracking}
            style={{ 
              width: '100%',
              maxWidth: '400px',
              padding: '20px',
              background: isTracking ? '#e74c3c' : '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '24px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            {isTracking ? '⏹️ Stop Tracking' : '▶️ Start Tracking'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarbonMeterPage;