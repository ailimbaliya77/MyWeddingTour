import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

/**
 * Requires Cormorant Garamond loaded globally. Add to your index.html <head>:
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 * <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap" rel="stylesheet">
 *
 * Referenced below as font-['Cormorant_Garamond'].
 */

const navLinks = [
  { to: "/weddings", label: "Weddings" },
  { to: "/HowItWorks", label: "How It Works" },
  { to: "/Testimonials", label: "Testimonials" },
  { to: "/FAQ", label: "FAQs" },
  { to: "/contact", label: "Contact Us" },
];

// eslint-disable-next-line no-unused-vars
function Navbar({ setLoginOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrollPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    const t = setTimeout(() => setMounted(true), 60);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t);
    };
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full overflow-hidden transition-all duration-300 ${
        scrolled ? "shadow-[0_2px_20px_rgba(122,31,43,0.12)]" : ""
      }`}
    >
      {/* Animated gradient wash + lattice texture, sits behind everything */}
      <div
        className={`absolute inset-0 -z-10 bg-[length:200%_100%] transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-90"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(110deg, #FFF9F0 0%, #FBEFDC 30%, #FFF9F0 55%, #F6E6CE 80%, #FFF9F0 100%)",
          animation: "reewaayat-wash 14s ease-in-out infinite",
        }}
      />
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.05]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="jaali" width="26" height="26" patternUnits="userSpaceOnUse">
            <path
              d="M13 2 L24 13 L13 24 L2 13 Z"
              fill="none"
              stroke="#7A1F2B"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#jaali)" />
      </svg>
      <div
        className={`absolute inset-x-0 bottom-0 h-px bg-[#523605] transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* backdrop blur layer */}
      <div className="absolute inset-0 -z-10 backdrop-blur-md" />

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <span
            className={`relative flex h-11 w-11 items-center justify-center transition-all duration-700 ease-out ${
              mounted ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-45"
            }`}
          >
            {/* slow rotating dashed ring */}
            <svg
              className="absolute inset-0 h-full w-full"
              style={{ animation: "reewaayat-spin 18s linear infinite" }}
              viewBox="0 0 44 44"
            >
              <circle
                cx="22"
                cy="22"
                r="20"
                fill="none"
                stroke="#C89B3C"
                strokeWidth="1.2"
                strokeDasharray="3 5"
              />
            </svg>
            {/* mandap-arch mark */}
            <svg viewBox="0 0 32 32" className="relative h-6 w-6">
              <path
                d="M6 27 V16 C6 9.5 10.7 5 16 5 C21.3 5 26 9.5 26 16 V27"
                fill="none"
                stroke="#7A1F2B"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line x1="6" y1="27" x2="26" y2="27" stroke="#7A1F2B" strokeWidth="2" strokeLinecap="round" />
              <circle
                cx="16"
                cy="3.2"
                r="1.6"
                fill="#E8B958"
                style={{
                  animation: mounted ? "reewaayat-flame 2.4s ease-in-out infinite" : "none",
                }}
              />
            </svg>
            <span className="absolute inset-0 rounded-full border border-[#E8B958] opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />
          </span>

          <span className="flex flex-col leading-none">
            <span
              className={`font-['Cormorant_Garamond'] text-[28px] font-semibold italic tracking-wide transition-all duration-700 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <span className="text-[#7A1F2B]">Ree</span>
              <span className="text-[#2A1710]">waayat</span>
            </span>
            <span
              className={`h-[2px] bg-gradient-to-r from-[#C89B3C] via-[#E8B958] to-transparent transition-all duration-700 ease-out ${
                mounted ? "w-full delay-300" : "w-0"
              }`}
            />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 text-[15px] font-medium text-[#4A3B34] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group relative flex items-center gap-1.5 py-1 transition-colors duration-200 hover:text-[#7A1F2B]"
            >
              <span className="h-1 w-1 scale-0 rounded-full bg-[#715318] transition-transform duration-200 group-hover:scale-100" />
              {link.label}
              <span className="absolute -bottom-0.5 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-[#C89B3C] to-[#E8B958] transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-6 md:flex">
          <button
            onClick={() => setLoginOpen(true)}
            className="font-medium text-[#4A3B34] transition-colors duration-200 hover:text-[#7A1F2B]"
          >
            Login
          </button>

          <Link
            to="/BecomeHost"
            className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#7A1F2B] to-[#9C2C3A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:shadow-[0_4px_18px_rgba(122,31,43,0.35)] hover:brightness-110"
          >
            <span className="relative z-10">Become a Host</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out hover:translate-x-full" />
          </Link>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="transition-transform duration-200 active:scale-90">
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-[#2A1710]" />
            ) : (
              <Menu className="h-6 w-6 text-[#2A1710]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`relative overflow-hidden border-t border-[#E7D3B1] bg-[#FFF9F0]/95 backdrop-blur-md transition-all duration-300 ease-out md:hidden ${
          mobileMenuOpen ? "max-h-96 px-6 py-5 opacity-100" : "max-h-0 px-6 py-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 text-[15px] font-medium text-[#4A3B34]">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="transition-colors duration-200 hover:text-[#7A1F2B]"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setLoginOpen(true);
              setMobileMenuOpen(false);
            }}
            className="text-left transition-colors duration-200 hover:text-[#7A1F2B]"
          >
            Login
          </button>
          <Link
            to="/BecomeHost"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-1 rounded-lg bg-gradient-to-r from-[#7A1F2B] to-[#9C2C3A] px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Become a Host
          </Link>
        </div>
      </div>

      {/* Scroll progress thread */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#C89B3C] to-[#E8B958] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      <style>{`
        @keyframes reewaayat-wash {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes reewaayat-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reewaayat-flame {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;