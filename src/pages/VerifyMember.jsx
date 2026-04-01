// frontend/src/pages/VerifyMember.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyMember = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        // Points to your Render backend
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

  if (loading) return <div className="text-center p-10">Verifying Member...</div>;
  if (!member) return <div className="text-center p-10 text-red-500">❌ Invalid ID Card</div>;

  return (
    <div className="flex flex-col items-center p-6 bg-slate-50 min-height-screen">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center border-t-4 border-blue-900">
        <div className="text-green-500 text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-slate-800">Verified Member</h1>
        <p className="text-slate-500 text-sm mb-6">IDCCC Official Registry</p>
        
        <img src={member.profilePhoto} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-md object-cover" />
        
        <h2 className="text-xl font-bold text-blue-900">{member.fullName.toUpperCase()}</h2>
        <p className="text-slate-600 font-semibold">{member.creatorType}</p>
        
        <div className="mt-6 pt-6 border-t border-slate-100 text-left space-y-2">
          <p className="text-xs text-slate-400 uppercase tracking-widest">Registration No</p>
          <p className="text-sm font-mono text-slate-700">{member.regNumber}</p>
          
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-4">Status</p>
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold">
            ACTIVE MEMBER
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerifyMember;