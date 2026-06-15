import React, { useState, useEffect } from "react";
import { HashRouter } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// Route groups
import PublicRoutes from "./app/routes/publicroutes";
import AuthRoutes from "./app/routes/authRoutes";
import HostRoutes from "./app/routes/hostRoutes";
import AppRoutes from "./app/routes/approutes";

// Global components
import Login from "./modules/auth/Login";
import ChatBot from "./pages/ChatBot";

import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [googleLoginInProgress, setGoogleLoginInProgress] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

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
      {/*
        Each route group now manages its own <Routes> internally.
        App.jsx just mounts them — no <Routes> wrapper needed here.
      */}
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

      {/* ── GLOBAL COMPONENTS ── */}
      <ChatBot />

      <Login
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={() => setLoginOpen(false)}
        setGoogleLoginInProgress={setGoogleLoginInProgress}
      />
    </HashRouter>
  );
}

export default App;