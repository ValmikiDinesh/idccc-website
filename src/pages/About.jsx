import React, { useState } from "react";
import { 
  Target, Eye, ShieldCheck, Users, Zap, Scale, 
  Award, ArrowRight, CheckCircle2, Globe, HelpCircle, Plus, Minus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/home.css"; 

export default function About() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  // LOGIC TO REDIRECT BASED ON AUTH STATUS
  const handleRedirect = () => {
    const user = localStorage.getItem("user");
    if (user) {
      // If logged in, go to the Dashboard
      navigate("/membership");
    } else {
      // If not logged in, go to the registration page
      navigate("/join-membership");
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { q: "Is IDCCC a government body?", a: "IDCCC is an independent professional council. While we work closely with policy-making bodies, we are a non-profit organization dedicated solely to the welfare of digital creators." },
    { q: "Who is eligible for the ID card?", a: "Any Indian citizen who creates original digital content (YouTube, Instagram, Podcasts, etc.) and has a minimum of 1,000 followers/subscribers across platforms." },
    { q: "How does the legal aid work?", a: "Members get access to our panel of tech-law experts who provide consultation on copyright strikes, data privacy, and brand contract reviews." }
  ];

  return (
    <div className="idccc-indigo-root">
      <Header />

      <main className="indigo-viewport">
        
        {/* --- HERO SECTION --- */}
        <section className="indigo-hero" style={{ padding: '25px 0 60px' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="indigo-pill">
              <span>About the Council</span>
            </div>
            <h1 className="hero-title-indigo">
              The Voice of India's <br />
              <span className="text-indigo-primary">Digital Creator Economy.</span>
            </h1>
            <p className="hero-desc-indigo" style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
              The Indian Digital Content Creators Council (IDCCC) is the premier 
              professional body dedicated to the legal protection, social security, 
              and professional growth of independent digital creators across India.
            </p>
            <div className="hero-buttons" style={{ justifyContent: 'center' }}>
              {/* UPDATED ACTION */}
              <button className="btn-indigo-fill" onClick={handleRedirect}>
                Become a Member <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* --- IMPACT NUMBERS --- */}
        <section style={{ padding: '40px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--indigo-primary)', fontWeight: '900' }}>450+</h2>
                <p style={{ fontWeight: '700', fontSize: '0.8rem', color: 'var(--slate-600)' }}>LEGAL CASES RESOLVED</p>
              </div>
              <div>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--indigo-primary)', fontWeight: '900' }}>28+</h2>
                <p style={{ fontWeight: '700', fontSize: '0.8rem', color: 'var(--slate-600)' }}>STATES COVERED</p>
              </div>
              <div>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--indigo-primary)', fontWeight: '900' }}>₹2Cr+</h2>
                <p style={{ fontWeight: '700', fontSize: '0.8rem', color: 'var(--slate-600)' }}>MEMBER BENEFITS DISBURSED</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- MISSION & VISION --- */}
        <section className="indigo-pillars" style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="pillars-grid">
              <div className="pillar-item" style={{ textAlign: 'left', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div className="pillar-icon-box" style={{ margin: '0' }}><Target size={28} /></div>
                <div>
                  <h3 style={{ color: 'var(--indigo-dark)', marginBottom: '10px' }}>Our Mission</h3>
                  <p style={{ fontSize: '0.95rem' }}>To formalize the creator economy by providing institutional support, legal aid, and health benefits to every verified digital creator in India.</p>
                </div>
              </div>

              <div className="pillar-item" style={{ textAlign: 'left', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div className="pillar-icon-box" style={{ margin: '0' }}><Eye size={28} /></div>
                <div>
                  <h3 style={{ color: 'var(--indigo-dark)', marginBottom: '10px' }}>Our Vision</h3>
                  <p style={{ fontSize: '0.95rem' }}>To see "Content Creation" recognized as a professional career path with the same legal rights and protections as any traditional industry.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- WHY WE ARE DIFFERENT --- */}
        <section style={{ padding: '80px 0' }}>
          <div className="container">
            <div className="section-header">
              <h2>What Sets Us Apart</h2>
              <p>We are built by creators, for creators.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {[
                { title: "Non-Profit Ethics", desc: "Every rupee from membership goes back into legal funds and member welfare programs." },
                { title: "Pan-India Reach", desc: "Regional support cells available in 12 Indian languages to assist creators from all backgrounds." },
                { title: "Official Recognition", desc: "Our ID cards are recognized by several state press guilds and event organizers." }
              ].map((item, i) => (
                <div key={i} style={{ padding: '30px', background: 'var(--indigo-light)', borderRadius: '20px' }}>
                  <CheckCircle2 color="var(--indigo-primary)" style={{ marginBottom: '10px' }} />
                  <h4 style={{ marginBottom: '10px', color: 'var(--indigo-dark)' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- STORY & PARTNERSHIP SECTION --- */}
        <section style={{ padding: '80px 0', background: 'var(--white)' }}>
          <div className="container">
            <div className="hero-grid-indigo">
              <div className="hero-left">
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '20px' }}>
                  Technological Excellence <br/> meets <span className="text-indigo-primary">Social Impact.</span>
                </h2>
                <p style={{ color: 'var(--slate-600)', fontSize: '1.1rem' }}>
                  IDCCC was founded to bridge the gap between individual talent and institutional power. We believe that no creator should have to face legal hurdles alone.
                </p>
                <div style={{ padding: '20px', background: 'var(--indigo-light)', borderRadius: '16px', borderLeft: '4px solid var(--indigo-primary)', marginTop: '30px' }}>
                  <p style={{ fontStyle: 'italic', color: 'var(--slate-900)' }}>
                    "Our platform infrastructure is proudly maintained by <strong>Valmiki Softwares</strong>, ensuring a secure experience for our 12,000+ members."
                  </p>
                </div>
              </div>
              <div className="hero-right">
                <div style={{ position: 'relative' }}>
                  <div className="pillar-item" style={{ border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '3.5rem', color: 'var(--indigo-primary)', fontWeight: '900' }}>12K+</h2>
                    <p style={{ fontWeight: '800', color: 'var(--slate-600)' }}>ACTIVE MEMBERS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section style={{ padding: '80px 0', background: '#f8fafc' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="section-header">
              <h2>Common Questions</h2>
            </div>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: 'var(--white)', marginBottom: '15px', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(i)}
                  style={{ width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontWeight: '700', color: 'var(--indigo-dark)' }}>{faq.q}</span>
                  {activeFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                {activeFaq === i && (
                  <div style={{ padding: '0 20px 20px', color: 'var(--slate-600)', fontSize: '0.95rem' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="indigo-cta">
          <div className="container">
            <div className="cta-indigo-card">
              <h2>Ready to Join the Movement?</h2>
              <p>Secure your professional identity and legal rights today.</p>
              {/* UPDATED ACTION */}
              <button className="btn-white-pill" onClick={handleRedirect}>
                Apply for ID Card
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}