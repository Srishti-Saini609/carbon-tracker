import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import * as apiService from './services/api';

import HomePage from './pages/HomePage';
import CarbonMeterPage from './pages/CarbonMeterPage';
import LogActivityPage from './pages/LogActivityPage';
import ProgressPage from './pages/ProgressPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GlobalInsightsPage from './pages/GlobalInsightsPage';

function AppContent() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const data = await apiService.fetchActivities();
        setActivities(data);
      } catch (err) {
        console.error('Failed to fetch activities:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (localStorage.getItem('carbon_user')) {
      loadActivities();
    } else {
      setLoading(false);
    }
  }, []);

  const addActivity = useCallback(async (activityData) => {
    try {
      const newActivity = await apiService.addActivity(activityData);
      setActivities((prev) => [newActivity, ...prev]);
      return newActivity;
    } catch (err) {
      console.error('Failed to add activity:', err);
      throw err;
    }
  }, []);

  const deleteActivity = useCallback(async (id) => {
    try {
      await apiService.deleteActivity(id);
      // Filter by both id and _id for compatibility
      setActivities((prev) => prev.filter((a) => a.id !== id && a._id !== id));
    } catch (err) {
      console.error('Failed to delete activity:', err);
      throw err;
    }
  }, []);

  return (
    <div className="mesh-gradient min-h-screen">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage 
                activities={activities} 
                onAddActivity={addActivity} 
                onDeleteActivity={deleteActivity}
                loading={loading}
                error={error}
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/meter" 
          element={
            <ProtectedRoute>
              <CarbonMeterPage onActivityLogged={addActivity} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/log-activity" 
          element={
            <ProtectedRoute>
              <LogActivityPage onActivityAdded={addActivity} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/progress" 
          element={
            <ProtectedRoute>
              <ProgressPage activities={activities} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/global-insights" 
          element={
            <ProtectedRoute>
              <GlobalInsightsPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;