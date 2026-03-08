import CarbonChart from "../components/CarbonChart";
import CarbonPieChart from "../components/CarbonPieChart";
import SustainabilitySuggestions from "../components/SustainabilitySuggestions";
import "../App.css";

function Dashboard({ activities }) {

  const emissionFactors = {
    car: 0.21,
    bus: 0.11,
    train: 0.04,
    electricity: 0.82,
    veg_meal: 2,
    nonveg_meal: 6
  };

  let totalEmission = 0;

  activities.forEach((activity) => {
    const emission =
      (activity.distance || activity.units || 1) *
      (emissionFactors[activity.type] || 0);

    totalEmission += emission;
  });

  const carbonScore = Math.max(0, 100 - totalEmission);

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">🌱 Carbon Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-grid">

        <div className="stat-card">
          <h3>Carbon Score</h3>
          <p className="stat-number">{carbonScore.toFixed(0)}</p>
        </div>

        <div className="stat-card">
          <h3>Total Emission</h3>
          <p className="stat-number">{totalEmission.toFixed(2)} kg</p>
        </div>

        <div className="stat-card">
          <h3>Activities</h3>
          <p className="stat-number">{activities.length}</p>
        </div>

        <div className="stat-card">
          <h3>Eco Level</h3>
          <p className="stat-number">
            {carbonScore > 70 ? "🌿 Good" : "⚡ Improve"}
          </p>
        </div>

      </div>

      {/* Chart */}
      <CarbonChart activities={activities} />

      <CarbonPieChart activities={activities}/>

      {/* Suggestions */}
      <SustainabilitySuggestions activities={activities} />

    </div>
  );
}

export default Dashboard;