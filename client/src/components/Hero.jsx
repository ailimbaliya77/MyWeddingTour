import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "../assets/rajasthani-wedding.jpg";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const bg = useRef(null);
  const title = useRef(null);
  const paragraph = useRef(null);
  const button = useRef(null);
  const containerRef = useRef(null);

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
        scale: 1.4,
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

      // Button pop-in
      tl.from(
        button.current,
        {
          scale: 0.7,
          opacity: 0,
          duration: 0.9,
          ease: "back.out(1.8)",
        },
        "-=0.7"
      );

      gsap.to(bg.current, {
        y: 120,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[90vh] flex items-center justify-center text-pink-800 overflow-hidden"
    >
      {/* Background */}
      <div
        ref={bg}
        className="absolute inset-0 bg-cover bg-center z-[1]"
        style={{
          backgroundImage: `url(${img1})`,
          filter: "brightness(0.35)",
        }}
      >

        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Text Container */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
        <div className="max-w-3xl mx-auto">

          {/* Split Title */}
          <h1
            ref={title}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl leading-tight"
          >
            Experience the Magic of Indian Weddings
          </h1>

          {/* Paragraph */}
          <p
            ref={paragraph}
            className="text-lg sm:text-xl md:text-2xl font-medium mb-10 leading-relaxed text-white/90 max-w-2xl mx-auto"
          >
            Immerse yourself in vibrant colors, beautiful traditions, and joyful
            celebrations as a special guest.
          </p>

          {/* Button */}
          <Link
            ref={button}
            to="/weddings"
            className="relative container mx-auto px-6 sm:px-6 lg:px-8 text-center bg-white/90 hover:bg-pink-600 hover:text-white  text-black font-semibold  rounded-lg text-lg  shadow-xl z-[5]">
            Get Started by Searching a Wedding
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Hero;

