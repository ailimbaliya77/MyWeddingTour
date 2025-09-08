import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import img1 from '../assets/India-Owen-3The-Ceremony-75-scaled.jpg'

function Hero() {
  const headingRef = useRef(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.from(headingRef.current, {
  y: -100,
  opacity: 0,
  duration: 4,
  ease: 'bounce.out',
});
      gsap.to(headingRef.current, {
        y: 0,
        opacity: 1,
        duration: 6,
        ease: 'bounce.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: headingRef.current,}
      });

    }
  }, []);

  return (
    <div className="relative text-pink-800 overflow-x-scroll">
      <div className="absolute inset-0  bg-transparent transform transition-transform duration-500 ease-out" style={{ backgroundImage: `url(${img1})`}} ></div>
      <div className="container mx-auto px-4  sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 relative">
        <div className="text-center max-w-3xl mx-auto">
          <h1
          ref={headingRef}
          className="text-3xl sm:text-4xl  md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-black">Experience the Magic of Indian Weddings</h1>
          <p 
          className="text-base sm:text-lg font-bold md:text-xl mb-7 sm:mb-8 px-4 text-black leading-relaxed ">
            Immerse yourself in the vibrant colors, rich traditions, and joyful celebrations of authentic Indian weddings as a special guest.
          </p>
          <Link 
            to="/wedding-types" 
            className="bg-white hover:bg-blue-300 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded text-base sm:text-lg transition inline-block"
          >
            Get Started by Searching a Wedding
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero