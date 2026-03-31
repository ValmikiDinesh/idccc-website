import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Lock, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import "../styles/login.css"; // We'll add some glassmorphism styles below

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`https://idccc-backend.onrender.com/api/members/login`, {
        email,
        password,
      });

      if (res.data.success) {
        // Store token and user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success(`Welcome back, ${res.data.user.fullName}!`);
        
        // Redirect based on status
        setTimeout(() => {
          navigate("/membership");
        }, 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Toaster position="top-center" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-card glass-effect"
      >
        <div className="login-header">
          <div className="logo-icon">
            <ShieldCheck size={40} color="#6366f1" />
          </div>
          <h1>Member Login</h1>
          <p>Access your IDCCC dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label><Mail size={16} /> Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group mt-4">
            <div className="flex-label">
              <label><Lock size={16} /> Password</label>
              <Link to="/forgot-password" size={14} className="forgot-link">Forgot?</Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className="login-footer">
          <p>Not a member yet? <Link to="/join-membership">Apply Now</Link></p>
        </div>
      </motion.div>
    </div>
  );
}