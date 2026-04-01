import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyMember from "./pages/VerifyMember";

// Importing pages
import Home from "./pages/Home";
import About from "./pages/About"; // 1. ADD THIS IMPORT
import Login from "./pages/Login";
import Membership from "./pages/Membership";
import JoinMembership from "./pages/JoinMembership";
import Certificate from "./pages/Certificate";

function App() {
  return (
    <Router>
      <Header /> 
      
      <main style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify/:id" element={<VerifyMember />} />
          {/* 2. ADD THIS ROUTE */}
          <Route path="/about" element={<About />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join-membership" element={<JoinMembership />} />
          
          <Route 
            path="/membership" 
            element={
              <ProtectedRoute>
                <Membership />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;