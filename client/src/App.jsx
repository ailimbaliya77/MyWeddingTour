import React, { useState, useEffect } from 'react';
import Lenis from "@studio-freight/lenis";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navvbar from './pages/Navvbar';
import Footerr from './pages/Footerr';
import HomePage from './pages/HomePage';
import Weddings from './pages/Weddings';
import WeddingDetailsPage from './pages/WeddingDetailsPage';
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
import ProtectedRoute from './components/protectedRoute';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {

useEffect(() => {

  const hash = window.location.hash; 

  const queryString = hash.split("?")[1]; 
  if (!queryString) return;

  const params = new URLSearchParams(queryString);
  const token = params.get("token") || params.get("accessToken");

  if (token) {
    localStorage.setItem("token", token);
    console.log("SAVED TOKEN:", token);

    window.location.hash = "/host/register/step1";
  }
}, []);



  //  LENIS SMOOTH SCROLL
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

  const [weddings, setWeddings] = useState(() => {
    const saved = localStorage.getItem("weddings");
    return saved ? JSON.parse(saved) : [];
  });

  const addWedding = (wedding) => {
    setWeddings((prev) => {
      const newWedding = { ...wedding, id: Date.now().toString() };
      const updated = [...prev, newWedding];
      localStorage.setItem("weddings", JSON.stringify(updated));
      return updated;
    });
  };

  const removeWedding = (id) => {
    setWeddings((prev) => {
      const updated = prev.filter((w) => w.id !== id);
      localStorage.setItem("weddings", JSON.stringify(updated));
      return updated;
    });
  };

  const [formData, setFormData] = useState({
    brideFirst: '',
    brideLast: '',
    groomFirst: '',
    groomLast: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    venue: '',
    description: '',
    image: '',
    story: '',
    videoLink: '',
    days: '',
    food: '',
    alcohol: '',
    languages: '',
    events: [],
    guideFirst: '',
    guideLast: '',
    guideEmail: '',
    guidePhone: '',
    guideRelation: '',
    guideLanguages: [],
    paymentMethod: '',
    paypalEmail: '',
    gpayNumber: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    upiId: '',
    otherPayment: '',
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

          <Route path="/weddings" element={<Weddings weddings={weddings} removeWedding={removeWedding} />} />
          <Route path="/weddings/:id" element={<WeddingDetailsPage weddings={weddings} />} />

          {/* ================================
                PROTECTED STEP ROUTES
          ================================= */}

          <Route
            path="/host/register/step1"
            element={
              <ProtectedRoute openLogin={setLoginOpen}>
                <HostStep1 formData={formData} setFormData={setFormData} />
              </ProtectedRoute>
            }
          />

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
                <HostStep5 formData={formData} addWedding={addWedding} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/weddings/register/step6"
            element={
              <ProtectedRoute openLogin={setLoginOpen}>
                <HostStep6 formData={formData} addWedding={addWedding} />
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
        />

        <Footerr />
      </div>
    </HashRouter>
  );
}

export default App;
