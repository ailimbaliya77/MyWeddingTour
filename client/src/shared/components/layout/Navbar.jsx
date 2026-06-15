import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";


// eslint-disable-next-line no-unused-vars
function Navvbar({ setLoginOpen, }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 40);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
        <nav
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
  ${scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-md"}`}
>
  <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">

    {/* Logo */}
    <Link to="/" className="text-2xl font-semibold tracking-wide">
      <span className="text-orange-500">Ree</span>
      <span className="text-gray-800">waayat</span>
    </Link>

    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-700">
      <Link to="/weddings" className="hover:text-orange-500 transition">
        Weddings
      </Link>

      <Link to="/Testimonials" className="hover:text-orange-500 transition">
        Testimonials
      </Link>

      <Link to="/FAQ" className="hover:text-orange-500 transition">
        FAQs
      </Link>

      <Link to="/contact" className="hover:text-orange-500 transition">
        Contact Us
      </Link>
    </div>

    {/* Right Side */}
    <div className="hidden md:flex items-center gap-6">

      <button
        onClick={() => setLoginOpen(true)}
        className="text-gray-700 hover:text-orange-500 font-medium"
      >
        Login
      </button>

      <Link
        to="/BecomeHost"
        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
      >
        Become a Host
      </Link>
    </div>

    {/* Mobile Button */}
    <div className="md:hidden">
      <button onClick={toggleMobileMenu}>
        {mobileMenuOpen ? (
          <X className="h-6 w-6 text-gray-800" />
        ) : (
          <Menu className="h-6 w-6 text-gray-800" />
        )}
      </button>
    </div>
  </div>
</nav>
  );
}

export default Navvbar;
