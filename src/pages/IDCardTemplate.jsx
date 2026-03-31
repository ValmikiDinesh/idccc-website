import React from "react";
import IDCCC_Logo from "../assets/idccc-logo.png";
import Complex_Seal_Img from "../assets/complex-seal.png";
import { ShieldCheck, MapPin, Globe } from "lucide-react";

export default function IDCardTemplate({ member }) {
  // Format the Registration Number or show placeholder
  const registrationNo = member?.registrationNo || "IDCCC-2026-PENDING";

  return (
    <div className="id-card-canvas">
      {/* Front of the Card */}
      <div className="id-card-front">
        {/* Navy Header */}
        <div className="id-header">
          <img src={IDCCC_Logo} alt="Logo" className="id-logo-small" />
          <div className="id-header-text">
            <h1>IDCCC</h1>
            <p>Official Member Card</p>
          </div>
          <div className="id-status-badge">
            <ShieldCheck size={14} /> VERIFIED
          </div>
        </div>

        {/* Member Photo Section */}
        <div className="id-photo-section">
          <div className="id-photo-ring">
            <img 
              src={member?.profilePhoto || "https://via.placeholder.com/150"} 
              alt="Profile" 
              className="id-photo-main" 
            />
          </div>
        </div>

        {/* Member Details */}
        <div className="id-details">
          <h2 className="id-member-name">{member?.fullName?.toUpperCase() || "MEMBER NAME"}</h2>
          <p className="id-member-type">{member?.creatorType?.toUpperCase() || "DIGITAL CREATOR"}</p>
          
          <div className="id-reg-number">
            <span className="reg-label">REG NO:</span>
            <span className="reg-value">{registrationNo}</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="id-footer-strip">
          <div className="id-footer-item">
            <MapPin size={10} /> {member?.city?.toUpperCase() || "INDIA"}
          </div>
          <div className="id-footer-item">
            <Globe size={10} /> IDCCC.TECH
          </div>
          <img src={Complex_Seal_Img} alt="Seal" className="id-seal-overlay" />
        </div>
      </div>

      <style>{`
        .id-card-canvas {
          width: 350px;
          height: 520px;
          background: #ffffff;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .id-card-front {
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* Header Styling */
        .id-header {
          background: #1e3a8a;
          padding: 20px 15px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          position: relative;
        }
        .id-logo-small { width: 45px; height: 45px; object-fit: contain; }
        .id-header-text h1 { font-size: 1.2rem; font-weight: 900; margin: 0; letter-spacing: 1px; }
        .id-header-text p { font-size: 0.6rem; margin: 0; opacity: 0.8; text-transform: uppercase; font-weight: 700; }
        .id-status-badge { 
          margin-left: auto; background: #10b981; font-size: 10px; font-weight: 900; 
          padding: 4px 8px; border-radius: 50px; display: flex; align-items: center; gap: 4px;
        }

        /* Photo Area */
        .id-photo-section {
          padding-top: 35px;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 2;
        }
        .id-photo-ring {
          width: 150px;
          height: 180px;
          border: 5px solid #1e3a8a;
          border-radius: 12px;
          overflow: hidden;
          background: #f8fafc;
          box-shadow: 0 8px 15px rgba(0,0,0,0.1);
        }
        .id-photo-main { width: 100%; height: 100%; object-fit: cover; }

        /* Details Area */
        .id-details {
          flex: 1;
          text-align: center;
          padding: 20px 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .id-member-name { font-size: 1.4rem; font-weight: 900; color: #1e3a8a; margin: 0; line-height: 1.2; }
        .id-member-type { font-size: 0.85rem; font-weight: 800; color: #996515; margin: 8px 0; letter-spacing: 0.5px; }
        
        .id-reg-number {
          margin-top: 15px;
          background: #f1f5f9;
          padding: 8px 20px;
          border-radius: 10px;
          border: 1px dashed #cbd5e1;
        }
        .reg-label { font-size: 10px; font-weight: 800; color: #64748b; margin-right: 8px; }
        .reg-value { font-size: 0.9rem; font-weight: 900; color: #1e3a8a; }

        /* Footer Strip */
        .id-footer-strip {
          background: #f8fafc;
          padding: 15px;
          display: flex;
          justify-content: center;
          gap: 20px;
          border-top: 1px solid #e2e8f0;
          position: relative;
        }
        .id-footer-item { font-size: 10px; font-weight: 800; color: #64748b; display: flex; align-items: center; gap: 5px; }
        .id-seal-overlay {
          position: absolute;
          width: 50px;
          right: 15px;
          bottom: 10px;
          opacity: 0.8;
          filter: grayscale(1);
        }
      `}</style>
    </div>
  );
}