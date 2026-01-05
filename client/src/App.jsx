import React, { useState, useEffect } from 'react';
import Lenis from "@studio-freight/lenis";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Navvbar from './pages/Navvbar';
import Footerr from './pages/Footerr';
import HomePage from './pages/HomePage';
import Weddings from './pages/Weddings';
import WeddingDetailsPage from './pages/WeddingDetails';
import AboutUs from './pages/AboutUs';
import Contact from './pages/ContactPage';
import Login from './pages/Login';
import HostLandingPage from './pages/HostLandingPage';
import FAQ from './pages/FAQ';

import HostStep1 from './pages/HostStep1';
import HostStep2 from './pages/HostStep2';
import HostStep3 from './pages/HostStep3';
import HostStep4 from './pages/HostStep4';
import HostStep5 from './pages/HostStep5';
import HostStep6 from './pages/HostStep6';

import ChatBot from './pages/ChatBot';
import ProtectedRoute from './pages/ProtectedRoute';
import OAuthSuccess from './pages/OAuthSuccess';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {

  const [googleLoginInProgress, setGoogleLoginInProgress] = useState(false);

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
      wheelMultiplier: 1.2,
      gestureOrientation: "vertical",
      normalizeWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, []);

  const [loginOpen, setLoginOpen] = useState(false);

  // FORM DATA (ALL STEPS)
  const [formData, setFormData] = useState({
  role: "Bride",
  bride: { firstName: "", lastName: "", email: "", phone: "" },
  groom: { firstName: "", lastName: "", email: "", phone: "" },
  phone: "",  

  couplePhoto: null,
  storyDescription: "",
  youtube: "",

  days: 1,
  events: [],

  guideFirstName: "",
  guideLastName: "",
  guideEmail: "",
  guideEmailConfirm: "",
  guidePhoneNumber: "",
  guideCoupleRelation: "",
  guideLanguages: [],

  paymentMethod: "",
  paypalEmail: "",
  gpayNumber: "",
  bankName: "",
  accountNumber: "",
  ifsc: "",
  upiId: "",
  otherPayment: "",
});


  return (
    <HashRouter>
      <div className="App">

        <Navvbar setLoginOpen={setLoginOpen} />

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/BecomeHost" element={<HostLandingPage />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />

          {/* WEDDINGS (BACKEND DATA) */}
          <Route path="/weddings" element={<Weddings />} />
          <Route path="/weddings/:id" element={<WeddingDetailsPage />} />

          {/* HOST REGISTRATION STEPS */}
          <Route path="/host/register/step1" element={<ProtectedRoute openLogin={setLoginOpen} googleLoginInProgress={googleLoginInProgress} >
          <HostStep1 formData={formData} setFormData={setFormData} /> </ProtectedRoute> }/>

          <Route
            path="/weddings/register/step2"
            element={
              <ProtectedRoute openLogin={setLoginOpen}>
                <HostStep2 formData={formData} setFormData={setFormData} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/weddings/register/step3"
            element={
              <ProtectedRoute openLogin={setLoginOpen}>
                <HostStep3 formData={formData} setFormData={setFormData} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/weddings/register/step4"
            element={
              <ProtectedRoute openLogin={setLoginOpen}>
                <HostStep4 formData={formData} setFormData={setFormData} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/weddings/register/step5"
            element={
              <ProtectedRoute openLogin={setLoginOpen}>
                <HostStep5 formData={formData} setFormData={setFormData} />
              </ProtectedRoute>
            }
          />

          {/* FINAL SUBMIT (POST TO BACKEND) */}
          <Route
            path="/weddings/register/step6"
            element={
              <ProtectedRoute openLogin={setLoginOpen}>
                <HostStep6 formData={formData} setFormData={setFormData} />
              </ProtectedRoute>
            }
          />

        </Routes>

        <ChatBot />

        <Login
          isOpen={loginOpen}
          onClose={() => setLoginOpen(false)}
          onLoginSuccess={() => {
            setLoginOpen(false);
            alert("Logged in successfully!");
          }}
          setGoogleLoginInProgress={setGoogleLoginInProgress}
        />

        <Footerr />
      </div>
    </HashRouter>
  );
}

export default App;
