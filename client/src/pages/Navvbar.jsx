import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navvbar({setLoginOpen}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-[#21151c] text-white px-6 md:px-12 py-4 flex items-center h-[56px] justify-between">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-xl sm:text-4xl border-white font-bold">
          <span className="text-white-900">My</span>
          <span className="text-white-900">Wedding</span>
          <span className="text-red-800">Tour</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-semibold text-sm">
          <Link to="/" className="text-sm lg:text-base hover:text-white transition">HOME</Link>
          <Link to="/weddings" className="text-sm lg:text-base hover:text-white transition">WEDDINGS</Link>
          <Link to="/FAQ" className="text-sm lg:text-base hover:text-white transition">FAQ</Link>
          <Link to="/about-us" className="text-sm lg:text-base hover:text-white transition">ABOUT US</Link>
          <Link to="/contact" className="text-sm lg:text-base hover:text-white transition">CONTACT US</Link>
        </div>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          <button onClick={() => setLoginOpen(true)} className="text-sm lg:text-base text-white hover:text-yellow-300 transition">LOGIN</button>
          <Link to="/BecomeHost" className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1.5 lg:px-4 lg:py-2 rounded text-sm lg:text-base transition">BECOME A HOST</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMobileMenu}
            className="text-black hover:text-yellow-300 focus:outline-none"
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
      {mobileMenuOpen && (
        <div className="md:hidden bg-purple-50 text-black absolute top-full left-0 right-0 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/celeb-Ind" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-100 hover:text-pink-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/weddings" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-100 hover:text-pink-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Weddings
            </Link>
            <Link 
              to="/FAQ" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-100 hover:text-pink-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              to="/about-us" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-100 hover:text-pink-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-100 hover:text-pink-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {/* <Link 
              to="/TourismPlaces" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-100 hover:text-pink-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tourism
            </Link> */}
          </div>
            
            
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4 px-4">
              <Link 
                to="/login" 
                className="text-black hover:text-pink-600 transition px-4 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded text-base font-medium transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navvbar
