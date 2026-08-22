import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    foods: 0,
    orders: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/admin/dashboard");

      setStats(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="container">

      <h1>Admin Dashboard</h1>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h2>{stats.users}</h2>
          <p>Total Users</p>
        </div>

        <div className="dashboard-card">
          <h2>{stats.foods}</h2>
          <p>Total Foods</p>
        </div>

        <div className="dashboard-card">
          <h2>{stats.orders}</h2>
          <p>Total Orders</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;