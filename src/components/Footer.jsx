import React from "react";
import { Mail, Shield, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="idccc-footer">
      <div className="container">
        <div className="footer-content">
          
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Shield size={28} color="var(--indigo-primary)" fill="var(--indigo-light)" />
              <h3>IDCCC</h3>
            </div>
            <p>
              The official council supporting Indian digital creators with legal aid, 
              verified identity, and professional networking.
            </p>
          </div>

          {/* Contact Section */}
          <div className="footer-contact">
            <h4>Get In Touch</h4>
            <a href="mailto:support@idccc.in" className="footer-email">
              <Mail size={18} />
              support@idccc.in
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} IDCCC. All rights reserved.</p>
          
          <a 
            href="https://valmikisoftwares.tech/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="powered-by-pill"
          >
            <span>Powered by</span>
            <span className="brand-name">
              Valmiki Softwares <ExternalLink size={12} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}