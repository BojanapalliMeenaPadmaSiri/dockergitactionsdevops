// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Landing Page
import LandingPage from "./pages/LandingPage";

// Auth Pages
import AdminLogin from "./pages/admin/AdminLogin";
// import AdminSignup from "./pages/admin/AdminSignup";
import FacultyLogin from "./pages/faculty/FacultyLogin";
import FacultySignup from "./pages/faculty/FacultySignup";
import StudentLogin from "./pages/student/StudentLogin";
import StudentSignup from "./pages/student/StudentSignup";
import ParentLogin from "./pages/parent/ParentLogin";
import ParentSignup from "./pages/parent/ParentSignup";

// Dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import ParentDashboard from "./pages/parent/ParentDashboard";

// Footer
import Footer from "./components/Footer";

// Layout wrapper to decide when to show Footer
function Layout({ children }) {
  const location = useLocation();

  // List of routes where footer should NOT be shown
  const hideFooterRoutes = [
    "/login/admin",
    //"/signup/admin",
    "/login/faculty",
    "/signup/faculty",
    "/login/student",
    "/signup/student",
    "/login/parent",
    "/signup/parent",
    "/admin/dashboard",
    "/faculty/dashboard",
    "/student/dashboard",
    "/parent/dashboard",
  ];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="app-wrapper">
      {children}
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin */}
          <Route path="/login/admin" element={<AdminLogin />} />
          {/*<Route path="/signup/admin" element={<AdminSignup />} /> */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Faculty */}
          <Route path="/login/faculty" element={<FacultyLogin />} />
          <Route path="/signup/faculty" element={<FacultySignup />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />

          {/* Student */}
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/signup/student" element={<StudentSignup />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />

          {/* Parent */}
          <Route path="/login/parent" element={<ParentLogin />} />
          <Route path="/signup/parent" element={<ParentSignup />} />
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
