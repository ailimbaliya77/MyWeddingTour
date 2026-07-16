import React, { useState, useEffect } from "react";
import { HashRouter } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// Route groups
import PublicRoutes from "./app/routes/PublicRoutes";
import AuthRoutes from "./app/routes/AuthRoutes";
import HostRoutes from "./app/routes/HostRoutes";
import AppRoutes from "./app/routes/AppRoutes";
import ContentRoutes from "./app/routes/ContentRoutes";
import AdminRoutes from "./app/routes/AdminRoutes";

// Global components
import Login from "./modules/auth/Login";
import RoleSelectionModal from "./modules/auth/RoleSelectionModal";
import CreateAccountModal from "./modules/auth/CreateAccountModal"; // NEW
import ChatBot from "./pages/ChatBot";

import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [googleLoginInProgress, setGoogleLoginInProgress] = useState(false);

  // Existing trigger used by Navbar/ProtectedRoute — opens Role Selection first.
  const [loginOpen, setLoginOpen] = useState(false);

  // Real email/password + Google login form, reached via "Log in instead".
  const [loginFormOpen, setLoginFormOpen] = useState(false);

  // Create Account modal (Gmail / mobile OTP) — opened when someone picks
  // "Wedding Planner" in Role Selection. "Bride/Groom" skips this entirely
  // and goes straight to Google (handled inside RoleSelectionModal itself).
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [pendingRole, setPendingRole] = useState("planner");

  const [formData, setFormData] = useState({
    role: "Bride",
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <HashRouter>
      <PublicRoutes setLoginOpen={setLoginOpen} />

      <AuthRoutes />

      <HostRoutes
        setLoginOpen={setLoginOpen}
        googleLoginInProgress={googleLoginInProgress}
        formData={formData}
        setFormData={setFormData}
      />

      <AppRoutes
        setLoginOpen={setLoginOpen}
        googleLoginInProgress={googleLoginInProgress}
      />

      <ContentRoutes setLoginOpen={setLoginOpen} />

      <AdminRoutes />

      {/* ── GLOBAL COMPONENTS ── */}
      <ChatBot />

      {/* Step 1: clicking "Login" anywhere opens this */}
      <RoleSelectionModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        setGoogleLoginInProgress={setGoogleLoginInProgress}
        onSwitchToLogin={() => {
          setLoginOpen(false);
          setLoginFormOpen(true);
        }}
        onContinue={(role) => {
          // Only reaches here for "planner" — "couple" redirects to Google
          // directly from inside RoleSelectionModal.
          setPendingRole(role);
          setCreateAccountOpen(true);
        }}
      />

      {/* Step 2a: Wedding Planner path */}
      <CreateAccountModal
        isOpen={createAccountOpen}
        onClose={() => setCreateAccountOpen(false)}
        role={pendingRole}
        setGoogleLoginInProgress={setGoogleLoginInProgress}
      />

      {/* Step 2b: "Log in instead" path */}
      <Login
        isOpen={loginFormOpen}
        onClose={() => setLoginFormOpen(false)}
        onLoginSuccess={() => setLoginFormOpen(false)}
        setGoogleLoginInProgress={setGoogleLoginInProgress}
      />
    </HashRouter>
  );
}

export default App;