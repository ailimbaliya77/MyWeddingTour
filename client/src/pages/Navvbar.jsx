import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navvbar({ setLoginOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 bg-[#21151c] text-white px-6 md:px-12 h-[62px] z-50 flex items-center">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-xl sm:text-4xl font-bold">
          <span className="text-white">My</span>
          <span className="text-white">Wedding</span>
          <span className="text-red-800">Tour</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-semibold text-sm">
          <Link to="/" className="hover:text-white transition">
            HOME
          </Link>
          <Link to="/weddings" className="hover:text-white transition">
            WEDDINGS
          </Link>
          <Link to="/FAQ" className="hover:text-white transition">
            FAQ
          </Link>
          <Link to="/about-us" className="hover:text-white transition">
            ABOUT US
          </Link>
          <Link to="/contact" className="hover:text-white transition">
            CONTACT US
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          <button
            onClick={() => setLoginOpen(true)}
            className="text-sm lg:text-base text-white hover:text-yellow-300 transition"
          >
            LOGIN
          </button>
          <Link
            to="/BecomeHost"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1.5 lg:px-4 lg:py-2 rounded text-sm lg:text-base transition"
          >
            BECOME A HOST
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-yellow-300 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div>
        {mobileMenuOpen && (
          <div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-[#21151c] text-white z-50 shadow-lg md:hidden"
          >
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col space-y-4 px-6">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-yellow-400 transition"
              >
                Home
              </Link>
              <Link
                to="/weddings"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-yellow-400 transition"
              >
                Weddings
              </Link>
              <Link
                to="/FAQ"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-yellow-400 transition"
              >
                FAQ
              </Link>
              <Link
                to="/about-us"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-yellow-400 transition"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-yellow-400 transition"
              >
                Contact
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="mt-6 border-t border-gray-600 pt-6 flex flex-col space-y-4 px-6">
              <button
                onClick={() => {
                  setLoginOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-lg font-medium hover:text-yellow-400 transition"
              >
                Login
              </button>
              <Link
                to="/BecomeHost"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded text-base font-medium transition text-center"
              >
                Become a Host
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navvbar;
