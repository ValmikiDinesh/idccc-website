import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  User, Mail, Phone, MapPin, 
  CheckCircle, Clock, XCircle, LogOut, Loader2 
} from "lucide-react";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    // Optional: Fetch latest status from backend
    const fetchUserStatus = async () => {
      try {
        const res = await axios.get(`https://idccc-backend.onrender.com/api/members/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        // If fetch fails, use local storage data as fallback
        setUser(storedUser);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatus();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return (
    <div className="loader-screen">
      <Loader2 className="animate-spin" size={40} color="#6366f1" />
    </div>
  );
    
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Sidebar/Header */}
        <header className="dash-header glass-card">
          <div className="user-brand">
            <div className="avatar-circle">
              {user?.fullName?.charAt(0)}
            </div>
            <div>
              <h1>Welcome, {user?.fullName}</h1>
              <p>Member Dashboard</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} /> Logout
          </button>
        </header>

        <div className="dash-grid">
          {/* Status Card */}
          <div className="status-card glass-card">
            <h3>Application Status</h3>
            <div className={`status-badge ${user?.status}`}>
              {user?.status === "approved" && <CheckCircle size={20} />}
              {user?.status === "pending" && <Clock size={20} />}
              {user?.status === "rejected" && <XCircle size={20} />}
              <span>{user?.status?.toUpperCase()}</span>
            </div>
            <p className="status-note">
              {user?.status === "pending" && "Your application is under review by the admin panel."}
              {user?.status === "approved" && "Congratulations! Your membership is active."}
            </p>
          </div>

          {/* Details Card */}
          <div className="details-card glass-card">
            <h3>Profile Information</h3>
            <div className="info-row"><Mail size={16}/> <span>{user?.email}</span></div>
            <div className="info-row"><Phone size={16}/> <span>{user?.mobile}</span></div>
            <div className="info-row"><MapPin size={16}/> <span>{user?.city}, {user?.state}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}