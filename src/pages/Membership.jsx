import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  User, Phone, MapPin, CreditCard, 
  Clock, CheckCircle, Loader2, Award,
  Youtube, Briefcase, ShieldCheck, FileText,
  Mail, Globe, Sparkles, Lock
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";

export default function Membership() {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  // 1. Fetch Member Data on Load
  const fetchData = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return navigate("/login");
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      // Ensure this port matches your Backend (4001)
      const res = await axios.get(`${API_URL}/api/members/${storedUser.id}`);
      setMember(res.data);
    } catch (err) {
      toast.error("Session expired. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  // 2. Fixed Handle Generate (No more setInterval)
  const handleGenerate = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    const toastId = toast.loading("Council is processing your documents...");
    
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      // Trigger the Puppeteer engine
      const res = await axios.post(`${API_URL}/api/members/generate-docs/${member._id}`);
      
      if (res.data.success) {
        // Update local state with the new Cloudinary URLs and Reg Number
        setMember(prev => ({
          ...prev,
          certificateUrl: res.data.certUrl,
          idCardUrl: res.data.idCardUrl,
          regNumber: res.data.regNumber
        }));
        
        toast.success("Documents Verified & Ready!", { id: toastId });
      }
    } catch (err) {
      console.error("Generation Error:", err);
      toast.error("Generation failed. Please try again.", { id: toastId });
    } finally {
      // This stops the spinning loader on the button
      setIsGenerating(false);
    }
  };

  // 3. Helper for Force Download
  const downloadFile = (url, fileName) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      })
      .catch(() => window.open(url, '_blank')); // Fallback
  };

  if (loading) return (
    <div className="loader-wrapper">
      <Loader2 className="spinner" size={40} />
      <p style={{ marginTop: '15px', fontWeight: '800', letterSpacing: '1px' }}>SYNCING COUNCIL RECORDS...</p>
    </div>
  );

  const isApproved = member?.status === "approved";
  const isPending = member?.status === "pending";
  const isPaid = member?.paymentStatus === "paid";
  const hasDocs = member?.certificateUrl && member?.idCardUrl;

  return (
    <div className="membership-root">
      <Toaster position="top-right" />
      <Header />

      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <style>{`
        .membership-root { --primary: #4f46e5; --success: #10b981; background: #fdfdfd; min-height: 100vh; padding-top: 50px; padding-bottom: 60px; font-family: 'Inter', sans-serif; position: relative; overflow-x: hidden; }
        .bg-blob { position: fixed; border-radius: 50%; filter: blur(120px); z-index: 0; opacity: 0.3; }
        .blob-1 { width: 600px; height: 600px; background: #c7d2fe; top: -10%; right: -5%; }
        .blob-2 { width: 500px; height: 500px; background: #ede9fe; bottom: -5%; left: -5%; }

        .dashboard { width: 100%; max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 360px 1fr; gap: 2.5rem; position: relative; z-index: 1; padding: 0 1.5rem; }
        .glass-panel { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 30px; box-shadow: 0 15px 35px rgba(0,0,0,0.03); }

        .sidebar { padding: 3rem 2rem; text-align: center; height: fit-content; position: sticky; top: 120px; transition: 0.3s; }
        .profile-img-container { position: relative; width: 140px; height: 140px; margin: 0 auto 1.5rem; }
        .profile-img { width: 100%; height: 100%; border-radius: 40px; object-fit: cover; border: 6px solid white; box-shadow: 0 12px 25px rgba(0,0,0,0.1); }
        .verified-badge { position: absolute; bottom: -5px; right: -5px; background: var(--success); color: white; border-radius: 50%; padding: 6px; border: 4px solid white; }

        .status-tag { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.4rem; border-radius: 100px; font-size: 0.75rem; font-weight: 900; text-transform: uppercase; margin: 1.2rem 0; letter-spacing: 1.2px; }
        .approved { background: #d1fae5; color: #065f46; }
        .pending { background: #fee2e2; color: #991b1b; }

        .btn-glass-green {
            width: 100%; padding: 1.1rem; border-radius: 18px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.8rem; transition: all 0.4s ease; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.8px;
            background: rgba(16, 185, 129, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(16, 185, 129, 0.3); color: #065f46; margin-bottom: 12px;
        }
        
        .btn-locked { background: #1e293b !important; color: #94a3b8 !important; cursor: not-allowed !important; opacity: 0.8; border: none !important; }

        .btn-generate { background: linear-gradient(135deg, #10b981, #059669) !important; color: white !important; border: none !important; box-shadow: 0 10px 20px rgba(16, 185, 129, 0.25); }

        .main-content { display: flex; flex-direction: column; gap: 2rem; }
        .info-card { padding: 2.5rem; transition: 0.3s; }
        .section-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .section-header h3 { font-size: 0.95rem; font-weight: 900; color: #1e293b; text-transform: uppercase; letter-spacing: 1.5px; }
        
        .data-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.5rem; }
        .data-item { display: flex; flex-direction: column; gap: 6px; }
        .label { color: #94a3b8; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
        .value { color: #1e293b; font-size: 1.05rem; font-weight: 700; line-height: 1.4; }
        .uppercase-text { text-transform: uppercase; }

        .loader-wrapper { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--primary); background: #fff; }
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media (max-width: 900px) {
            .dashboard { grid-template-columns: 1fr; padding: 0 1rem; }
            .sidebar { position: relative; top: 0; }
            .data-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dashboard">
        <aside className="sidebar glass-panel">
          <div className="profile-img-container">
            <img src={member?.profilePhoto} alt="Official" className="profile-img" />
            {isApproved && isPaid && <div className="verified-badge"><ShieldCheck size={22} /></div>}
          </div>
          
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }}>
            {member?.fullName}
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
             <Youtube size={18} color="#ef4444" />
             <p style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
               {member?.creatorType}
             </p>
          </div>

          <div className={`status-tag ${member?.status}`}>
            {isApproved ? <CheckCircle size={18} /> : <Clock size={18} />}
            {member?.status}
          </div>

          <div className="action-zone" style={{ marginTop: '1rem' }}>
            {/* 1. PAYMENT ZONE */}
            {!isPaid && (
              <button 
                className={`btn-glass-green ${isPending ? 'btn-locked' : ''}`} 
                style={!isPending ? { background: 'var(--primary)', color: 'white', border: 'none' } : {}}
                onClick={() => !isPending && navigate("/payment")}
                disabled={isPending}
              >
                {isPending ? <Lock size={20} /> : <CreditCard size={20} />}
                {isPending ? "PAYMENT LOCKED" : "COMPLETE PAYMENT"}
              </button>
            )}
            
            {/* 2. GENERATION/DOWNLOAD ZONE */}
            {isApproved && isPaid && (
              <>
                {!hasDocs ? (
                  <button 
                    className="btn-glass-green btn-generate" 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    {isGenerating ? <Loader2 className="spinner" size={20} /> : <Sparkles size={20} />}
                    {isGenerating ? "COUNCIL VERIFYING..." : "GENERATE DOCUMENTS"}
                  </button>
                ) : (
                  <>
                    <button className="btn-glass-green" onClick={() => downloadFile(member?.idCardUrl, 'IDCCC_ID_Card.png')}>
                      <Award size={20} /> Download Council ID
                    </button>
                    <button className="btn-glass-green" onClick={() => downloadFile(member?.certificateUrl, 'IDCCC_Certificate.png')}>
                      <FileText size={20} /> Download Certificate
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </aside>

        <main className="main-content">
          <section className="info-card glass-panel">
            <div className="section-header">
              <User size={22} color="var(--primary)" />
              <h3>Identity & Guardianship</h3>
            </div>
            <div className="data-grid">
              <div className="data-item">
                <span className="label">Full Legal Name</span>
                <span className="value uppercase-text">{member?.fullName}</span>
              </div>
              <div className="data-item">
                <span className="label">Reg Number</span>
                <span className="value">{member?.regNumber || "Pending Generation"}</span>
              </div>
              <div className="data-item">
                <span className="label">Date of Birth</span>
                <span className="value">
                  {member?.dob ? new Date(member.dob).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : "N/A"}
                </span>
              </div>
              <div className="data-item">
                <span className="label">Gender</span>
                <span className="value uppercase-text">{member?.gender}</span>
              </div>
            </div>
          </section>

          <section className="info-card glass-panel">
            <div className="section-header">
              <Briefcase size={22} color="var(--primary)" />
              <h3>Professional Records</h3>
            </div>
            <div className="data-grid">
              <div className="data-item">
                <span className="label">Creator Category</span>
                <span className="value uppercase-text" style={{color: 'var(--primary)'}}>{member?.creatorType}</span>
              </div>
              <div className="data-item">
                <span className="label">Membership Plan</span>
                <span className="value uppercase-text">{member?.membershipPlan}</span>
              </div>
              <div className="data-item">
                <span className="label">Primary Purpose</span>
                <span className="value">{member?.purpose}</span>
              </div>
              <div className="data-item">
                <span className="label">Payment Status</span>
                <span className="value" style={{color: isPaid ? 'var(--success)' : '#ef4444'}}>
                    {isPaid ? "✔ VERIFIED & PAID" : "✘ PENDING"}
                </span>
              </div>
            </div>
          </section>

          <section className="info-card glass-panel">
            <div className="section-header">
              <Mail size={22} color="var(--primary)" />
              <h3>Contact Details</h3>
            </div>
            <div className="data-grid">
              <div className="data-item">
                <span className="label">Official Email</span>
                <span className="value">{member?.email}</span>
              </div>
              <div className="data-item">
                <span className="label">Mobile Number</span>
                <span className="value">+91 {member?.mobile}</span>
              </div>
            </div>
            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
              <div className="data-item">
                 <span className="label">Residential Address</span>
                 <span className="value uppercase-text" style={{ fontSize: '0.9rem' }}>
                    {member?.address}, {member?.city}, {member?.state} - {member?.pincode}
                 </span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}