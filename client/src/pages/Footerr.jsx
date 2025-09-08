import React from 'react'
import { Link } from 'react-router-dom';

function Footerr() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-4">
              <span className="text-yellow-400">My</span>
              <span className="text-white">Wedding</span>
              <span className="text-yellow-400">Tour</span>
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">Experience authentic Indian weddings anywhere from the world.</p>
          </div>
          
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link to="/" onClick={scrollToTop} className="text-gray-300 hover:text-yellow-300 text-sm sm:text-base">Home</Link></li>
              <li><Link to="/weddings" onClick={scrollToTop} className="text-gray-300 hover:text-yellow-300 text-sm sm:text-base">Weddings</Link></li>
              <li><Link to="/BecomeHost" onClick={scrollToTop} className="text-gray-300 hover:text-yellow-300 text-sm sm:text-base">Become a Host</Link></li>
              <li><Link to="/FAQ" onClick={scrollToTop} className="text-gray-300 hover:text-yellow-300 text-sm sm:text-base">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Support</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link to="/contact" onClick={scrollToTop} className="text-gray-300 hover:text-yellow-300 text-sm sm:text-base">Contact Us</Link></li>
              <li><Link to="/about-us" onClick={scrollToTop} className="text-gray-300 hover:text-yellow-300 text-sm sm:text-base">About Us</Link></li>
              <li><a href="#" onClick={scrollToTop} className="text-gray-300 hover:text-yellow-300 text-sm sm:text-base">FAQ</a></li>
              <li><a href="#" onClick={scrollToTop} className="text-gray-300 hover:text-yellow-300 text-sm sm:text-base">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect With Us</h4>
            <div className="flex justify-center sm:justify-start space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-yellow-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 384 512">
                  <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z" />
                </svg>
              </a>
            </div>
            <p className="text-gray-300 text-sm sm:text-base mb-2">Subscribe to our newsletter</p>
            <div className="flex flex-col sm:flex-row max-w-xs mx-auto sm:mx-0">
              <input type="email" placeholder="Email" className="px-3 py-2 rounded-t sm:rounded-l sm:rounded-r-none text-black text-sm border-r-0 w-full" />
              <button className="bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded-b sm:rounded-r sm:rounded-l-none text-sm whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center text-gray-400 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} MyWeddingTour. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


export default Footerr
