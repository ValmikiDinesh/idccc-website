import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CertificateTemplate from "./CertificateTemplate"; // Import the template

export default function Certificate() {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) return navigate("/login");
      try {
        const res = await axios.get(`http://localhost:4001/api/members/${storedUser.id}`);
        setMember(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMemberData();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="certificate-page-view">
       {/* Use the template here */}
       <CertificateTemplate member={member} />
       
       <style>{`
          .certificate-page-view {
             display: flex;
             justify-content: center;
             padding: 50px 0;
             background: #f1f5f9;
          }
       `}</style>
    </div>
  );
}