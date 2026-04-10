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
            const avgSpeed = speedHistory.current.slice(-5).reduce((a, b) => a + b, 0) / 5;
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

  const stopTracking = () => {
    setIsTracking(false);
    
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }

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
      alert(`✅ Trip Logged!\n📍 ${totalDistance.current.toFixed(2)} km\n🌱 Zero emission!`);
    }
  };

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '16px', color: '#333' }}>🌍 Auto Carbon Meter</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', color: '#777' }}>📍 Distance</p>
          <p style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>
            {distance.toFixed(2)} km
          </p>
        </div>
        <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', color: '#777' }}>🚀 Speed</p>
          <p style={{ fontSize: '24px', fontWeight: '700', color: '#f39c12' }}>
            {speed.toFixed(1)} km/h
          </p>
        </div>
        <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', color: '#777' }}>🎯 Mode</p>
          <p style={{ fontSize: '24px', fontWeight: '700', color: '#27ae60' }}>
            {travelMode === 'idle' ? '⏸️' : travelMode === 'walking' ? '🚶' : 
             travelMode === 'cycling' ? '🚴' : '🚗'}
          </p>
        </div>
      </div>

      <button 
        onClick={isTracking ? stopTracking : startTracking}
        style={{ 
          width: '100%',
          padding: '16px',
          background: isTracking ? '#e74c3c' : '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: '700',
          cursor: 'pointer'
        }}
      >
        {isTracking ? '⏹️ Stop Tracking' : '▶️ Start Tracking'}
      </button>
    </div>
  );
};

export default AutoCarbonMeter;