import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./VerifyMember.css";

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
        console.error("Verification failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (loading) return (
    <div className="verify-container">
      <p style={{color: 'white', opacity: 0.5}}>Checking Registry...</p>
    </div>
  );

  if (!member) return (
    <div className="verify-container">
      <p style={{color: '#f87171'}}>Member Not Found</p>
    </div>
  );

  return (
    <div className="verify-container">
      {/* Background glow to enable the glass transparency look */}
      <div className="glow-effect"></div>

      <div className="glass-card">
        <header style={{marginBottom: '20px', opacity: 0.3}}>
          <span style={{color: 'white', fontSize: '8px', letterSpacing: '5px', fontWeight: 'bold'}}>IDCCC INDIA</span>
        </header>

        <img src={member.profilePhoto} className="profile-img" alt="Member" />
        
        <h1 className="member-name">{member.fullName}</h1>
        <p className="creator-type">{member.creatorType}</p>

        <div className="status-box">
          <p className="status-text text-green-400">VERIFIED MEMBER</p>
          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '20px', marginTop: '10px', fontFamily: 'monospace'}}>
            {member.regNumber}
          </p>
        </div>

      
      </div>
    </div>
  );
};

export default VerifyMember;