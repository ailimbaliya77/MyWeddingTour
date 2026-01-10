import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGlobe, FaShieldAlt, FaHeart } from "react-icons/fa";
import video1 from "../assets/157657-815175893_small.mp4"
import video2 from "../assets/189020-884234925_small.mp4"
import video3 from "../assets/242464_small.mp4"

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const bg = useRef(null);
  const title = useRef(null);
  const paragraph = useRef(null);
  const ctaContainer = useRef(null);
  const trustBadges = useRef(null);
  const containerRef = useRef(null);

  const videos = [video1, video2, video3];
const videoRef = useRef(null);
const [currentVideo, setCurrentVideo] = useState(0);

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const handleEnded = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  video.addEventListener("ended", handleEnded);
  return () => video.removeEventListener("ended", handleEnded);
}, []);

useEffect(() => {
  if (videoRef.current) {
    videoRef.current.load();
    videoRef.current.play().catch(() => {});
  }
}, [currentVideo]);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitType(title.current, {
        types: "lines, words",
        lineClass: "split-line",
        wordClass: "split-word",
      });

      const tl = gsap.timeline({ delay: 0.1, ease: "power2.out" });

      // Cinematic background zoom-out + fade
      tl.from(bg.current, {
  scale: 1.15,
  opacity: 0,
  duration: 2,
  ease: "power3.out",
});


      // Split text animation
      tl.from(
        split.words,
        {
          opacity: 0,
          y: 40,
          stagger: 0.03,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1.4"
      );

      // Paragraph fade-up
      tl.from(
        paragraph.current,
        {
          y: 60,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        },
        "-=1"
      );

      // CTAs animation
      tl.from(
        ctaContainer.current.children,
        {
          y: 50,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.7"
      );

      // Trust badges animation
      if (trustBadges.current && trustBadges.current.children) {
        tl.from(
          trustBadges.current.children,
          {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      // Parallax effect - only on desktop
      if (window.innerWidth > 768) {
        gsap.to(bg.current, {
          y: 80,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center pt-40">

{/* Background Video */}
<div ref={bg} className="absolute inset-0 overflow-hidden">
  <video
    ref={videoRef}
    className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-105 saturate-105"
    autoPlay
    muted
    playsInline
  >
    <source src={videos[currentVideo]} type="video/mp4" />
  </video>

  {/* Dark cinematic overlay */}
  <div className="absolute inset-0 bg-black/40" />
</div>

     {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-full flex flex-col items-center justify-center">
          
          {/* Title */}
          <h1
            ref={title}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-4 sm:mb-6 text-white drop-shadow-lg tracking-tight px-2"
          >
            Don't Just See India. Live Its biggest Celebration
          </h1>

          {/* Subtitle */}
          <p
            ref={paragraph}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-6 sm:mb-8 text-white/80 max-w-3xl mx-auto px-4 leading-relaxed"
          >
            Go Beyond The Tourist Trail. Step Inside A real Indian Wedding - An Explosion Of Colour, Emotion And Tradition, As An Honoured Guest, Not Just A Spectator.
          </p>

          {/* CTA Buttons */}
          <div 
  ref={ctaContainer} 
  className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-2xl mx-auto mb-10 px-4 z-[999] relative p-4 rounded-lg" // Yellow debug background
>
  {/* Debug message */}
  <div className="text-black text-sm font-bold mb-2 sm:hidden">
    CTA Buttons Debug Mode
  </div>

  {/* Primary CTA - DEBUG */}
  <Link
    to="/weddings"
    className="bg-white text-black px-8 py-4 rounded-full font-semibold"
    style={{ 
      opacity: 1,
      visibility: 'visible',
      transform: 'none' // Remove transform to debug
    }}
  >
    🎉 Find a Wedding to Join
  </Link>

  {/* Secondary CTA - DEBUG */}
  <Link
    to="/BecomeHost"
    className="border border-white/60 text-white px-8 py-4 rounded-full"
    style={{ 
      opacity: 1,
      visibility: 'visible',
      transform: 'none' // Remove transform to debug
    }}
  >
    🏠 Become a Host 
  </Link>
</div>

          {/* Trust Badges - Responsive Grid */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4">
                <FaGlobe className="text-yellow-300 text-xl sm:text-2xl flex-shrink-0" />
                <div className="text-left">
                  <p className="font-bold text-sm sm:text-base">5,000+ Travelers</p>
                  <p className="text-white/80 text-xs sm:text-sm">From 80+ countries</p>
                </div>
              </div>

              <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4">
                <FaShieldAlt className="text-green-300 text-xl sm:text-2xl flex-shrink-0" />
                <div className="text-left">
                  <p className="font-bold text-sm sm:text-base">Verified Hosts</p>
                  <p className="text-white/80 text-xs sm:text-sm">Secure & trusted</p>
                </div>
              </div>

              <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4">
                <FaHeart className="text-red-300 text-xl sm:text-2xl flex-shrink-0" />
                <div className="text-left">
                  <p className="font-bold text-sm sm:text-base">Cultural Immersion</p>
                  <p className="text-white/80 text-xs sm:text-sm">Authentic experiences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Only show on desktop */}
      <div className="hidden md:block absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;