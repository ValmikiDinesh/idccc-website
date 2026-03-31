import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Gavel, 
  ArrowRight, 
  Check, 
  Users, 
  Award 
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Stats from "../components/Stats";
import hero from "../assets/hero-banner.png";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("premium");

  // Logic to handle redirection based on auth status
  const handleRedirect = () => {
    const user = localStorage.getItem("user");
    if (user) {
      // If logged in, go to the Dashboard/Membership page
      navigate("/membership");
    } else {
      // If not logged in, go to the registration page
      navigate("/join-membership");
    }
  };

  return (
    <div className="idccc-indigo-root">
      <Header />

      <main className="indigo-viewport">
        {/* --- HERO SECTION --- */}
        <section className="indigo-hero">
          <div className="container hero-grid-indigo">
            <div className="hero-left">
              <div className="indigo-pill">
                <span>Official Indian Digital Content Creators Council</span>
              </div>
              <h1 className="hero-title-indigo">
                Professional Support for <br/>
                <span className="text-indigo-primary">Indian Digital Content Creators.</span>
              </h1>
              <p className="hero-desc-indigo">
                Join 12K+ members. Get your verified ID card, expert legal support 
                for copyright issues, and grow your network within the IDCCC community.
              </p>
              <div className="hero-buttons">
                {/* Updated Action */}
                <button className="btn-indigo-fill" onClick={handleRedirect}>
                  Register Now (Starts ₹500) <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-img-stack">
                <img src={hero} alt="IDCCC Membership" className="img-main-indigo" />
                <div className="indigo-floating-stat">
                  <ShieldCheck size={20} />
                  <span>Verified Legal Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Stats />

        {/* --- SERVICES SECTION --- */}
        <section className="indigo-pillars">
          <div className="container">
            <div className="section-header">
              <h2>What We Provide</h2>
              <p>Direct support for your digital career.</p>
            </div>

            <div className="pillars-grid">
              <div className="pillar-item">
                <div className="pillar-icon-box"><Gavel /></div>
                <h3>Legal Support</h3>
                <p>Expert guidance on digital content laws and help resolving copyright disputes or strikes.</p>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon-box"><Award /></div>
                <h3>Official Identity</h3>
                <p>A Council-verified ID card that establishes your professional status as a creator.</p>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon-box"><Users /></div>
                <h3>Networking</h3>
                <p>Connect and collaborate with other creators within the private IDCCC member network.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- PRICING SECTION --- */}
        <section className="pricing-section">
          <div className="container">
            <div className="section-header">
              <h2>Membership Plans</h2>
              <p>Choose the plan that fits your needs.</p>
            </div>

            <div className="pricing-grid">
              {/* BASIC PLAN */}
              <div 
                className={`price-card ${selectedPlan === "basic" ? "plan-highlight" : ""}`}
                onClick={() => setSelectedPlan("basic")}
              >
                <div className="price-amount">₹500</div>
                <h3>Basic Membership</h3>
                <ul className="price-features">
                  <li><Check size={16} /> Digital Member ID</li>
                  <li><Check size={16} /> Legal Help Access</li>
                  <li><Check size={16} /> Community Networking</li>
                </ul>
                {/* Updated Action */}
                <button className="btn-indigo-fill" onClick={handleRedirect}>
                  Select Basic
                </button>
              </div>

              {/* PREMIUM PLAN */}
              <div 
                className={`price-card ${selectedPlan === "premium" ? "plan-highlight" : ""}`}
                onClick={() => setSelectedPlan("premium")}
              >
                <div className="popular-badge">Recommended</div>
                <div className="price-amount">₹1000</div>
                <h3>Premium Membership</h3>
                <ul className="price-features">
                  <li><Check size={16} /> Priority Legal Aid</li>
                  <li><Check size={16} /> Verified Press Status</li>
                  <li><Check size={16} /> VIP Networking Access</li>
                </ul>
                {/* Updated Action */}
                <button className="btn-indigo-fill" onClick={handleRedirect}>
                  Select Premium
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="indigo-cta">
          <div className="container">
            <div className="cta-indigo-card">
              <h2>Secure Your Future Today</h2>
              <p>Join the community and secure your digital future today.</p>
              {/* Updated Action */}
              <button className="btn-white-pill" onClick={handleRedirect}>
                Apply for Membership
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}