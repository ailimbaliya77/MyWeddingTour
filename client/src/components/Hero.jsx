import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from '../assets/rajasthani-wedding.jpg'

function Hero() {
  const headingRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

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
    <div className="relative text-pink-800 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${img1})`,
          filter: 'brightness(0.85)',
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36 flex flex-col items-center justify-center text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg"
          >
            Experience the Magic of Indian Weddings
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-medium mb-8 leading-relaxed text-white/90">
            Immerse yourself in the vibrant colors, rich traditions, and joyful
            celebrations of authentic Indian weddings as a special guest.
          </p>

          <Link
            to="/wedding-types"
            className="bg-white/90 hover:bg-pink-600 hover:text-white text-black font-semibold px-8 py-3 rounded-lg text-base sm:text-lg transition-all duration-300 shadow-lg"
          >
            Get Started by Searching a Wedding
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero