import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./VerifyMember.css";
import IDCCC_Logo from "../assets/idccc-logo.png";

const VerifyMember = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`https://idccc-backend.onrender.com/api/members/public/${id}`);
        setMember(res.data);
      } catch (err) {
        console.error("Verification error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (loading) return (
    <div className="verify-container">
      <p style={{ color: '#fff', opacity: 0.3, letterSpacing: '4px', fontSize: '10px' }}>ESTABLISHING SECURE CONNECTION...</p>
    </div>
  );

  if (!member) return (
    <div className="verify-container">
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#ef4444', fontWeight: '900', letterSpacing: '2px' }}>UNAUTHORIZED ACCESS</p>
        <p style={{ color: '#fff', opacity: 0.4, fontSize: '12px' }}>Member record not found in central registry.</p>
      </div>
    </div>
  );

  return (
    <div className="verify-container">
      <div className="glass-card">
        
        {/* Top Registry Header */}
       <p className="registry-title">IDCCC DIGITAL REGISTRY</p>

        {/* Profile Section */}
        <div className="photo-wrapper">
          <img src={member.profilePhoto} className="profile-img" alt={member.fullName} />
          <div className={`status-pill ${member.isActive ? 'status-active' : 'status-inactive'}`}>
  <div className="dot"></div>
  {member.isActive ? 'Active Member' : 'Inactive'}
</div>
        </div>

        {/* Identification Section */}
        <h1 className="member-name">{member.fullName}</h1>
        <p className="creator-tag">{member.creatorType}</p>

        {/* Verification Footer */}
        <div className="verify-footer">
          <p className="verified-label">VERIFIED MEMBER</p>
          <p className="reg-code">{member.regNumber}</p>
          
          <div className="brand-footer">
  <img src={IDCCC_Logo} alt="IDCCC" />
  
</div>
<div className="brand-footer">
<span>SECURED BY IDCCC INDIA</span>
</div>

        </div>
      </div>
    </div>
  );
};

export default VerifyMember;