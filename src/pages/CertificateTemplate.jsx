import React from "react";
// Assets
import IDCCC_Logo from "../assets/idccc-logo.png";
import Complex_Seal_Img from "../assets/complex-seal.png";
import Somasekhar_Sig from "../assets/Somasekhar.png";
import Dinesh_Sig from "../assets/Dinesh.png";
import { Award } from "lucide-react";

export default function CertificateTemplate({ member }) {
  return (
    <div className="render-area">
      <div className="certificate-base">
        <div className="border-navy-outer">
          <div className="border-brass-inner">
            
            <img src={Complex_Seal_Img} alt="" className="watermark-overlay" />

            <div className="header-section">
              <img src={IDCCC_Logo} alt="IDCCC Official" className="org-logo" />
              <h1 className="org-title-main">INDIAN DIGITAL CONTENT CREATORS COUNCIL</h1>
              <p className="org-subtitle">Registered Government of India NGO • IDCCC Foundation</p>
              <div className="divider-brass-gradient"></div>
            </div>

            <div className="content-section">
              <div className="title-box">
                <Award className="brass-accent-icon" size={32} />
                <h2 className="heading-primary">Certificate of Membership</h2>
                <p className="text-italic">This document serves to officially certify that</p>
              </div>

              <div className="member-profile-row">
                <div className="photo-border">
                  <img src={member?.profilePhoto} alt="Member Portrait" className="photo-img" />
                </div>
                <div className="name-details">
                  <h3 className="name-brass-fixed">
                    {member?.fullName?.toUpperCase() || "VALMIKI DINESH"}
                  </h3>
                  <p className="location-tag">
                    {member?.city?.toUpperCase()}, {member?.state?.toUpperCase()} • INDIA
                  </p>
                </div>
              </div>

              <div className="body-statement">
                <p>
                  Has been admitted as a <strong>Verified Professional Member</strong> of the Council.
                </p>
              </div>

              <div className="badge-row">
                <span className="badge-item">GOVT. REGD NGO</span>
              </div>
            </div>

            <div className="footer-section">
              <div className="sig-area">
                <img src={Somasekhar_Sig} alt="Registrar Sig" className="sig-image" />
                <div className="sig-line-brass"></div>
                <p className="sig-name-text">V Somasekhar</p>
                <p className="sig-role-text">Council Registrar</p>
              </div>

              <div className="official-stamp">
                <img src={Complex_Seal_Img} alt="Official Seal" className="stamp-image" />
              </div>

              <div className="sig-area">
                <img src={Dinesh_Sig} alt="Secretary Sig" className="sig-image" />
                <div className="sig-line-brass"></div>
                <p className="sig-name-text">V Dinesh</p>
                <p className="sig-role-text">General Secretary</p>
              </div>
            </div>

            <div className="legal-footer-group">
              <div className="validity-info">
                REG NO: {member?.registrationNo || member?.memberId || "IDCCC-2026-VAL"} | VALID UNTIL: {member?.validity || "DEC 2030"}
              </div>
              <div className="office-address-line">
                8-385, Bandimotu Street, Kurnool Road, Gooty R.S, Anantapuramu, Andhra Pradesh(AP), India. 515402
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@400;700;900&display=swap');

        .render-area { display: flex; justify-content: center; overflow: hidden; padding-bottom: 60px; background: transparent; }
        
        .certificate-base { 
          width: 800px; height: 1100px; background: #fffdf5; padding: 35px; box-sizing: border-box; flex-shrink: 0;
          position: relative;
        }

        .border-navy-outer { border: 14px double #1e3a8a; height: 100%; padding: 6px; box-sizing: border-box; }
        .border-brass-inner { border: 2px solid #996515; height: 100%; padding: 10px; position: relative; display: flex; flex-direction: column; align-items: center; background: #fffdf5; }
        
        .watermark-overlay { position: absolute; width: 550px; top: 55%; left: 50%; transform: translate(-50%, -50%); opacity: 0.04; pointer-events: none; z-index: 1; }

        .header-section { text-align: center; z-index: 5; margin-bottom: 10px; width: 100%; }
        .org-logo { height: 140px; }
        .org-title-main { font-family: 'Cinzel', serif; font-size: 1.55rem; color: #1e3a8a; font-weight: 900; margin: 5px 0; }
        .org-subtitle { font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; margin: 0; }
        .divider-brass-gradient { width: 150px; height: 2px; background: #996515; margin: 15px auto; }

        .content-section { text-align: center; z-index: 5; flex: 1; display: flex; flex-direction: column; justify-content: center; width: 100%; }
        .heading-primary { font-family: 'Cinzel', serif; font-size: 2.1rem; color: #1e3a8a; margin: 10px 0; font-weight: 700; }
        .text-italic { font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.15rem; color: #475569; }

        .member-profile-row { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 35px; 
          margin: 50px 0; 
          width: 100%;
        }

        .photo-border { 
          width: 130px !important; 
          height: 160px !important; 
          flex-shrink: 0 !important;
          border: 4px solid #1e3a8a; 
          padding: 3px; 
          background: white; 
          overflow: hidden;
        }

        .photo-img { width: 100%; height: 100%; object-fit: cover; }
        
        .name-details { 
          text-align: left; 
          background: transparent !important; 
          max-width: 450px;
          word-break: break-word; 
        }
        
        .name-brass-fixed { 
          font-family: 'Inter', sans-serif; 
          font-size: 2.6rem; 
          font-weight: 900; 
          margin: 0; 
          line-height: 1.1;
          color: #996515; 
          text-shadow: 0.5px 0.5px 0px rgba(0,0,0,0.1); 
          background: transparent !important;
        }

        .location-tag { font-weight: 800; color: #1e3a8a; font-size: 0.95rem; margin-top: 4px; }

        .body-statement { padding: 0 60px; line-height: 1.6; color: #1e293b; font-size: 1.05rem; font-family: 'Playfair Display', serif; }
        .badge-row { margin-top: 20px; }
        .badge-item { font-size: 0.65rem; font-weight: 900; color: #94a3b8; border: 1px solid #e2e8f0; padding: 4px 12px; border-radius: 50px; }

        .footer-section { display: flex; justify-content: space-between; align-items: flex-end; width: 100%; padding: 0 20px; margin-top: auto; z-index: 5; }
        .sig-area { width: 180px; text-align: center; }
        .sig-image { height: 75px; object-fit: contain; margin-bottom: -15px; }
        .sig-line-brass { border-top: 1.5px solid #996515; width: 100%; margin-bottom: 8px; }
        .sig-name-text { font-weight: 800; color: #1e3a8a; font-size: 0.85rem; margin: 0; }
        .sig-role-text { font-weight: 700; font-size: 0.65rem; color: #64748b; text-transform: uppercase; }

        .stamp-image { width: 130px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1)); }

        .legal-footer-group { margin-top: 35px; text-align: center; z-index: 5; width: 100%; }
        .validity-info { font-size: 10px; font-weight: 800; color: #94a3b8; margin-bottom: 6px; }
        .office-address-line { font-size: 9px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; opacity: 0.7; }
      `}</style>
    </div>
  );
}