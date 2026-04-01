import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import axios from "axios";
import DatePicker from "react-datepicker";
import toast, { Toaster } from "react-hot-toast";
import { 
  User, MapPin, IdCard, Video, Check, 
  ChevronRight, ChevronLeft, Upload, ShieldCheck, 
  X, Briefcase, Lock, KeyRound
} from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/join.css";

export default function JoinMembership() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newMemberId, setNewMemberId] = useState("");
  const [passwords, setPasswords] = useState({ password: "", confirm: "" });

  const [form, setForm] = useState({
    fullName: "", parentName: "", gender: "", mobile: "", email: "",
    address: "", city: "", district: "", state: "", pincode: "",
    aadhaarNumber: "", creatorType: "", 
    channelName: "", youtube: "", instagram: "", facebook: "", x: "", 
    website: "", experience: "",
    membershipPlan: "", purpose: ""
  });
  
  const [files, setFiles] = useState({});
  const [previews, setPreviews] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles({ ...files, [e.target.name]: file });
      setPreviews({ ...previews, [e.target.name]: URL.createObjectURL(file) });
    }
  };

  const removeImage = (fieldName) => {
    const updatedFiles = { ...files };
    const updatedPreviews = { ...previews };
    delete updatedFiles[fieldName];
    delete updatedPreviews[fieldName];
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  // --- VALIDATION LOGIC ---
  const validateStep = () => {
    const stepFields = {
      1: ['fullName', 'parentName', 'gender', 'mobile', 'email'],
      2: ['address', 'city', 'district', 'state', 'pincode'],
      3: ['aadhaarNumber'],
      4: ['creatorType', 'membershipPlan', 'purpose'],
    };

    const currentFields = stepFields[step] || [];
    const missing = [];

    currentFields.forEach(f => {
      if (!form[f] || form[f].trim() === "") missing.push(f);
    });

    if (step === 1 && !dob) missing.push("dob");
    if (step === 3) {
      if (!files.aadhaarFrontImage) missing.push("aadhaarFrontImage");
      if (!files.aadhaarBackImage) missing.push("aadhaarBackImage");
      if (!files.profilePhoto) missing.push("profilePhoto");
    }

    if (missing.length > 0) {
      toast.error("Please fill all mandatory fields!", { position: "bottom-right" });
      const firstMissing = document.getElementsByName(missing[0])[0];
      if (firstMissing) firstMissing.focus();
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  // --- SUBMISSION LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(form).forEach((key) => { if (form[key]) data.append(key, form[key]); });
    if (dob) data.append("dob", dob.toISOString());
    if (files.aadhaarFrontImage) data.append("aadhaarFrontImage", files.aadhaarFrontImage);
    if (files.aadhaarBackImage) data.append("aadhaarBackImage", files.aadhaarBackImage);
    if (files.profilePhoto) data.append("profilePhoto", files.profilePhoto);

    try {
      const res = await axios.post(`https://idccc-backend.onrender.com/api/members/register`, data);
      setNewMemberId(res.data.memberId || res.data.member._id);
      setIsSubmitted(true);
      toast.success("Application Details Verified!", { position: "bottom-right" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed", { position: "bottom-right" });
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirm) return toast.error("Passwords do not match!", { position: "bottom-right" });
    if (passwords.password.length < 6) return toast.error("Password must be at least 6 characters", { position: "bottom-right" });

    setLoading(true);
    try {
      await axios.put(`https://idccc-backend.onrender.com/api/members/set-password/${newMemberId}`, {
        password: passwords.password
      });
      toast.success("Account Secured Successfully!", { position: "bottom-right" });
      setTimeout(() => window.location.href = "/login", 2000);
    } catch (err) {
      toast.error("Failed to set password", { position: "bottom-right" });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: "Personal", icon: <User size={18} /> },
    { id: 2, title: "Address", icon: <MapPin size={18} /> },
    { id: 3, title: "Identity", icon: <IdCard size={18} /> },
    { id: 4, title: "Creator", icon: <Video size={18} /> },
    { id: 5, title: "Review", icon: <ShieldCheck size={18} /> },
  ];

  return (
    <div className="premium-page">
      <Toaster position="bottom-right" reverseOrder={false} />

      <style>{`
        input:invalid, select:invalid { border: 1.5px solid #fee2e2 !important; }
        input:focus:invalid, select:focus:invalid { border: 1.5px solid #ef4444 !important; background: #fff1f2 !important; }
      `}</style>

      <div className="form-container">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div key="form-container" exit={{ opacity: 0, y: -20 }}>
              <nav className="stepper">
                {steps.map((s) => (
                  <div key={s.id} className={`step-item ${step >= s.id ? "active" : ""} ${step > s.id ? "completed" : ""}`}>
                    <div className="step-dot">{step > s.id ? <Check size={14} /> : s.icon}</div>
                    <span>{s.title}</span>
                    {s.id !== 5 && <div className="step-line"></div>}
                  </div>
                ))}
              </nav>

              <form className="glass-card" onSubmit={handleSubmit}>
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} key="s1">
                    <div className="header-mini"><h2>Personal Details</h2><p>Basic identity and contact information.</p></div>
                    <div className="input-grid">
                      <div className="field"><label>Full Name</label><input name="fullName" value={form.fullName} onChange={handleChange} required /></div>
                      <div className="field"><label>Parent Name</label><input name="parentName" value={form.parentName} onChange={handleChange} required /></div>
                      <div className="field"><label>DOB</label><DatePicker selected={dob} onChange={(date) => setDob(date)} dateFormat="dd/MM/yyyy" className="custom-picker" placeholderText="DD/MM/YYYY" required /></div>
                      <div className="field"><label>Gender</label><select name="gender" value={form.gender} onChange={handleChange} required><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div>
                      <div className="field"><label>Mobile</label><input name="mobile" value={form.mobile} onChange={handleChange} required /></div>
                      <div className="field"><label>Email</label><input name="email" type="email" value={form.email} onChange={handleChange} required /></div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} key="s2">
                    <div className="header-mini"><h2>Address Details</h2><p>Provide your residential location.</p></div>
                    <div className="field full"><label>Street Address</label><input name="address" value={form.address} onChange={handleChange} required /></div>
                    <div className="input-grid mt-15">
                      <div className="field"><label>City</label><input name="city" value={form.city} onChange={handleChange} required /></div>
                      <div className="field"><label>District</label><input name="district" value={form.district} onChange={handleChange} required /></div>
                      <div className="field"><label>State</label><input name="state" value={form.state} onChange={handleChange} required /></div>
                      <div className="field"><label>Pincode</label><input name="pincode" value={form.pincode} onChange={handleChange} required /></div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} key="s3">
                    <div className="header-mini"><h2>Identity Verification</h2><p>Upload Aadhaar and your Profile Photo.</p></div>
                    <div className="field full"><label>Aadhaar Number</label><input name="aadhaarNumber" value={form.aadhaarNumber} placeholder="12 Digit Number" onChange={handleChange} required /></div>
                    <div className="upload-section">
                      {[{ id: "aadhaarFrontImage", label: "Aadhaar Front" }, { id: "aadhaarBackImage", label: "Aadhaar Back" }, { id: "profilePhoto", label: "Profile Photo" }].map((img) => (
                        <div className="upload-box" key={img.id}>
                          {previews[img.id] ? (
                            <div className="preview-container"><img src={previews[img.id]} alt="Preview" className="preview-img" /><button type="button" className="remove-btn" onClick={() => removeImage(img.id)}><X size={14}/></button></div>
                          ) : (
                            <div className="upload-placeholder"><Upload size={18} /><span>{img.label}</span><input type="file" name={img.id} onChange={handleFile} accept="image/*" required /></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} key="s4">
                    <div className="header-mini"><h2>Creator Details</h2><p>Your digital presence and membership plan.</p></div>
                    <div className="input-grid">
                      <div className="field"><label>Creator Type</label><select name="creatorType" value={form.creatorType} onChange={handleChange} required><option value="">Select</option><option value="YouTuber">YouTuber</option><option value="Journalist">Journalist</option><option value="Influencer">Influencer</option></select></div>
                      <div className="field"><label>Brand Name</label><input name="channelName" value={form.channelName} onChange={handleChange} /></div>
                      <div className="field"><label>YouTube</label><input name="youtube" value={form.youtube} onChange={handleChange} /></div>
                      <div className="field"><label>Instagram</label><input name="instagram" value={form.instagram} onChange={handleChange} /></div>
                      <div className="field"><label>Facebook</label><input name="facebook" value={form.facebook} onChange={handleChange} /></div>
                      <div className="field"><label>X (Twitter)</label><input name="x" value={form.x} onChange={handleChange} /></div>
                      <div className="field"><label>Website</label><input name="website" value={form.website} onChange={handleChange} /></div>
                      <div className="field"><label>Experience</label><input name="experience" value={form.experience} onChange={handleChange} /></div>
                      <div className="field"><label>Plan</label><select name="membershipPlan" value={form.membershipPlan} onChange={handleChange} required><option value="">Select Plan</option><option value="Basic">Basic Membership (₹500)</option><option value="Premium">Premium Membership (₹1000)</option></select></div>
                      <div className="field"><label>Purpose</label><select name="purpose" value={form.purpose} onChange={handleChange} required><option value="">Select</option><option value="Legal Support">Legal Support</option><option value="Networking">Networking</option></select></div>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key="s5">
                    <div className="header-mini text-center">
                      <div className="success-icon-wrapper"><ShieldCheck size={32} /></div>
                      <h2>Application Review</h2>
                      <p>Verify your information before final submission.</p>
                    </div>
                    <div className="review-grid">
                      <div className="review-section">
                        <h3><User size={14} /> Contact Information</h3>
                        <div className="review-item"><span>Full Name</span><strong>{form.fullName || "—"}</strong></div>
                        <div className="review-item"><span>Mobile</span><strong>{form.mobile || "—"}</strong></div>
                      </div>
                      <div className="review-section">
                        <h3><Briefcase size={14} /> Membership Detail</h3>
                        <div className="review-item"><span>Plan</span><strong className="badge-plan">{form.membershipPlan || "—"}</strong></div>
                        <div className="review-item"><span>Purpose</span><strong>{form.purpose || "—"}</strong></div>
                      </div>
                      <div className="review-section full-width">
                        <h3><MapPin size={14} /> Identity & Location</h3>
                        <div className="review-item"><span>Aadhaar Number</span><strong>{form.aadhaarNumber || "—"}</strong></div>
                        <div className="review-item"><span>Current Address</span><strong>{form.city ? `${form.address}, ${form.city}, ${form.state}` : "—"}</strong></div>
                      </div>
                    </div>
                    <div className="declaration-box">
                      <input type="checkbox" id="confirm" required />
                      <label htmlFor="confirm">I confirm that all the details provided above are accurate.</label>
                    </div>
                  </motion.div>
                )}

                <div className="footer-actions">
                  {step > 1 && <button type="button" onClick={prevStep} className="btn-secondary" disabled={loading}><ChevronLeft size={18}/> Back</button>}
                  {step < 5 ? (
                    <button type="button" onClick={nextStep} className="btn-primary">Continue <ChevronRight size={18}/></button>
                  ) : (
                    <button type="submit" className="btn-submit" disabled={loading}>
                      {loading ? "Processing..." : "Submit Application"}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div key="password-card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card text-center">
              <div className="success-icon-wrapper" style={{background: '#10b981'}}><KeyRound size={32} color="white"/></div>
              <h2>Secure Your Account</h2>
              <p>Create a password to track your application status later.</p>
              <form onSubmit={handleSetPassword} className="mt-20" style={{textAlign: 'left'}}>
                <div className="field">
                  <label><Lock size={14}/> Create Password</label>
                  <input type="password" placeholder="••••••••" required onChange={(e) => setPasswords({...passwords, password: e.target.value})} />
                </div>
                <div className="field mt-15">
                  <label><Check size={14}/> Confirm Password</label>
                  <input type="password" placeholder="••••••••" required onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} />
                </div>
                <button type="submit" className="btn-submit mt-20" disabled={loading}>{loading ? "Saving..." : "Create Account & Finish"}</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}