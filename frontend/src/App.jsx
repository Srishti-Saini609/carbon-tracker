import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import AddActivity from "./pages/AddActivity";
import Insights from "./pages/Insights";
import Learn from "./pages/Learn";
import Achievements from "./pages/Achievements";
import Progress from "./pages/progress";
import Leaderboard from "./pages/Leaderboard";
import Guides from "./pages/Guides";

function App() {

  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const res = await axios.get("http://localhost:5000/activities");
    setActivities(res.data);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <Router>

      <Navbar />

      <div className="container">

        <h1> Carbon Footprint Tracker</h1>

        <Routes>

          <Route
            path="/"
            element={
              <Dashboard
                activities={activities}
                fetchActivities={fetchActivities}
              />
            }
          />


         
          <Route
  path="/progress"
  element={<Progress activities={activities} />}
/>

<Route
 path="/leaderboard"
 element={<Leaderboard activities={activities} />}
/>

<Route
  path="/achievements"
  element={<Achievements activities={activities} />}
/>
<Route path="/guides" element={<Guides />} />
    <Route
    path="/add"
    element={
      <AddActivity
        fetchActivities={fetchActivities}
      />
    }
  />


           <Route
    path="/insights"
    element={<Insights activities={activities} />}
  />

      <Route
    path="/learn"
    element={<Learn activities={activities} />}
  />

          

        </Routes>

      </div>

    </Router>
  );
}

export default App;