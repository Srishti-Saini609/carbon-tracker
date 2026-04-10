import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarbonMeterPage from './pages/CarbonMeterPage';
import LogActivityPage from './pages/LogActivityPage';
import ProgressPage from './pages/ProgressPage';

const SEED_DATA = [
  // Travel Activities (Last 30 Days)
  { id: '1', type: 'travel', category: 'car_petrol', value: 45.5, unit: 'km', co2e: 8.74, date: new Date(Date.now() - 86400000 * 1).toISOString() },
  { id: '2', type: 'travel', category: 'walking', value: 5.2, unit: 'km', co2e: 0, date: new Date(Date.now() - 86400000 * 1).toISOString() },
  { id: '3', type: 'travel', category: 'cycling', value: 12.0, unit: 'km', co2e: 0, date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: '4', type: 'travel', category: 'bus', value: 25.0, unit: 'km', co2e: 2.23, date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: '5', type: 'travel', category: 'train', value: 150.0, unit: 'km', co2e: 6.15, date: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: '6', type: 'travel', category: 'car_diesel', value: 80.0, unit: 'km', co2e: 13.68, date: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: '7', type: 'travel', category: 'flight_domestic', value: 850.0, unit: 'km', co2e: 216.75, date: new Date(Date.now() - 86400000 * 8).toISOString() },
  { id: '8', type: 'travel', category: 'walking', value: 3.5, unit: 'km', co2e: 0, date: new Date(Date.now() - 86400000 * 10).toISOString() },
  { id: '9', type: 'travel', category: 'bus', value: 18.0, unit: 'km', co2e: 1.60, date: new Date(Date.now() - 86400000 * 12).toISOString() },
  { id: '10', type: 'travel', category: 'cycling', value: 8.0, unit: 'km', co2e: 0, date: new Date(Date.now() - 86400000 * 15).toISOString() },
  { id: '11', type: 'travel', category: 'car_petrol', value: 35.0, unit: 'km', co2e: 6.72, date: new Date(Date.now() - 86400000 * 18).toISOString() },
  { id: '12', type: 'travel', category: 'train', value: 200.0, unit: 'km', co2e: 8.20, date: new Date(Date.now() - 86400000 * 22).toISOString() },
  { id: '13', type: 'travel', category: 'bus', value: 40.0, unit: 'km', co2e: 3.56, date: new Date(Date.now() - 86400000 * 25).toISOString() },
  { id: '14', type: 'travel', category: 'walking', value: 6.0, unit: 'km', co2e: 0, date: new Date(Date.now() - 86400000 * 28).toISOString() },
  
  // Energy Activities (Last 30 Days)
  { id: '15', type: 'energy', category: 'electricity', value: 120.0, unit: 'kWh', co2e: 98.4, date: new Date(Date.now() - 86400000 * 1).toISOString() },
  { id: '16', type: 'energy', category: 'natural_gas', value: 35.0, unit: 'm³', co2e: 70.0, date: new Date(Date.now() - 86400000 * 4).toISOString() },
  { id: '17', type: 'energy', category: 'lpg', value: 15.0, unit: 'kg', co2e: 22.5, date: new Date(Date.now() - 86400000 * 7).toISOString() },
  { id: '18', type: 'energy', category: 'electricity', value: 95.0, unit: 'kWh', co2e: 77.9, date: new Date(Date.now() - 86400000 * 11).toISOString() },
  { id: '19', type: 'energy', category: 'natural_gas', value: 28.0, unit: 'm³', co2e: 56.0, date: new Date(Date.now() - 86400000 * 16).toISOString() },
  { id: '20', type: 'energy', category: 'electricity', value: 110.0, unit: 'kWh', co2e: 90.2, date: new Date(Date.now() - 86400000 * 21).toISOString() },
  { id: '21', type: 'energy', category: 'lpg', value: 12.0, unit: 'kg', co2e: 18.0, date: new Date(Date.now() - 86400000 * 26).toISOString() },
  
  // Diet Activities (Last 30 Days)
  { id: '22', type: 'diet', category: 'meat_beef', value: 2.5, unit: 'kg', co2e: 67.5, date: new Date(Date.now() - 86400000 * 1).toISOString() },
  { id: '23', type: 'diet', category: 'meat_chicken', value: 1.8, unit: 'kg', co2e: 12.42, date: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: '24', type: 'diet', category: 'vegetarian', value: 3.0, unit: 'kg', co2e: 7.5, date: new Date(Date.now() - 86400000 * 6).toISOString() },
  { id: '25', type: 'diet', category: 'vegan', value: 2.2, unit: 'kg', co2e: 3.3, date: new Date(Date.now() - 86400000 * 9).toISOString() },
  { id: '26', type: 'diet', category: 'meat_beef', value: 1.5, unit: 'kg', co2e: 40.5, date: new Date(Date.now() - 86400000 * 13).toISOString() },
  { id: '27', type: 'diet', category: 'vegetarian', value: 2.8, unit: 'kg', co2e: 7.0, date: new Date(Date.now() - 86400000 * 17).toISOString() },
  { id: '28', type: 'diet', category: 'vegan', value: 1.9, unit: 'kg', co2e: 2.85, date: new Date(Date.now() - 86400000 * 20).toISOString() },
  { id: '29', type: 'diet', category: 'meat_chicken', value: 2.0, unit: 'kg', co2e: 13.8, date: new Date(Date.now() - 86400000 * 24).toISOString() },
  { id: '30', type: 'diet', category: 'vegetarian', value: 2.5, unit: 'kg', co2e: 6.25, date: new Date(Date.now() - 86400000 * 29).toISOString() },
  
  // Shopping Activities (Last 30 Days)
  { id: '31', type: 'shopping', category: 'clothing', value: 3.0, unit: 'items', co2e: 30.0, date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: '32', type: 'shopping', category: 'electronics', value: 1.0, unit: 'items', co2e: 50.0, date: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: '33', type: 'shopping', category: 'clothing', value: 2.0, unit: 'items', co2e: 20.0, date: new Date(Date.now() - 86400000 * 10).toISOString() },
  { id: '34', type: 'shopping', category: 'electronics', value: 1.0, unit: 'items', co2e: 50.0, date: new Date(Date.now() - 86400000 * 15).toISOString() },
  { id: '35', type: 'shopping', category: 'clothing', value: 1.0, unit: 'items', co2e: 10.0, date: new Date(Date.now() - 86400000 * 23).toISOString() },
  
  // Recent Activities (Today & Yesterday)
  { id: '36', type: 'travel', category: 'car_petrol', value: 22.0, unit: 'km', co2e: 4.22, date: new Date().toISOString() },
  { id: '37', type: 'travel', category: 'walking', value: 4.0, unit: 'km', co2e: 0, date: new Date().toISOString() },
  { id: '38', type: 'energy', category: 'electricity', value: 45.0, unit: 'kWh', co2e: 36.9, date: new Date().toISOString() },
  { id: '39', type: 'diet', category: 'vegetarian', value: 2.5, unit: 'kg', co2e: 6.25, date: new Date().toISOString() },
  { id: '40', type: 'travel', category: 'bus', value: 15.0, unit: 'km', co2e: 1.34, date: new Date(Date.now() - 86400000).toISOString() },
];
  

function App() {
  const [activities, setActivities] = useState(() => {
    try {
      const stored = localStorage.getItem('carbon_activities');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
    return SEED_DATA;
  });

  const addActivity = useCallback((activity) => {
    setActivities((prev) => [activity, ...prev]);
  }, []);

  const deleteActivity = useCallback((id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  }, []);

  useEffect(() => {
    localStorage.setItem('carbon_activities', JSON.stringify(activities));
  }, [activities]);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage activities={activities} onAddActivity={addActivity} onDeleteActivity={deleteActivity} />} 
        />
        <Route 
          path="/meter" 
          element={<CarbonMeterPage onActivityLogged={addActivity} />} 
        />
        <Route 
          path="/log-activity" 
          element={<LogActivityPage onActivityAdded={addActivity} />} 
        />
        <Route path="/progress" element={<ProgressPage activities={activities} />} />
      </Routes>
    </Router>
  );
}

export default App;