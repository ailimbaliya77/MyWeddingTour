import React, { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import TestimonialCard from "../components/TestimonialCard";
import { Link } from "react-router-dom";
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const [setImagesLoaded] = useState(false);

  // Refs for sections
  const featureRef = useRef(null);
  const howRef = useRef(null);
  const testimonialRef = useRef(null);
  const ctaRef = useRef(null);

 useEffect(() => {
  const ctx = gsap.context(() => {

    // FEATURE SECTION
    gsap.utils.toArray(".fade-up").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    // HOW IT WORKS
    gsap.utils.toArray(".step-box").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 120, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    // TESTIMONIALS
    gsap.utils.toArray(".testimonial-card").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 140, opacity: 0, rotateX: 6 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    // CTA
    gsap.fromTo(
      ".cta-inner",
      { scale: 0.85, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.3,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".cta-inner",
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

  });

  return () => ctx.revert();
}, []);


  const testimonials = [
    {
      id: 1,
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      name: "Sarah Johnson",
      location: "USA",
      quote:
        "Attending an Indian wedding through MyWeddingTour was the most immersive cultural experience I've ever had.…",
    },
    {
      id: 2,
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      name: "Carlos Rodriguez",
      location: "Spain",
      quote: "I was welcomed like family at the wedding. The ceremonies were fascinating and the food was amazing!",
    },
    {
      id: 3,
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      name: "Yuki Tanaka",
      location: "Japan",
      quote:
        "Everything was perfectly organized from start to finish. I learned so much about Indian wedding traditions.",
    },
  ];

  return (
    <div>
      <Hero />

      {/* FEATURE SECTION */}
      <section ref={featureRef} className="py-10 sm:py-16 bg-white-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="fade-up text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">
            BEYOND TOURISM – A TRUE CULTURAL CONNECTION
          </h2>

          <p className="fade-up bg-white text-black font-roboto text-[18px] leading-[1.5] tracking-[0.4px] mt-6">
            Travel often shows you places, but a wedding shows you people – their values, their stories, their traditions...
          </p>

          <p className="fade-up bg-white text-black font-roboto text-[18px] leading-[1.5] tracking-[0.4px] mt-6">
            A traditional Indian wedding is nothing short of a festival – a fusion of rituals, music, dance, and food...
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section ref={howRef} className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">How It Works</h2>
          <p className="text-gray-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Experience authentic Indian wedding celebrations in just a few steps
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="step-box text-center">
              <div className="bg-red-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <RiNumber1 className="text-red-600 text-2xl sm:text-3xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">1. Browse & Select</h3>
              <p className="text-gray-600 text-sm sm:text-base">Explore upcoming weddings and choose one that matches your travel dates and interests.</p>
            </div>

            <div className="step-box text-center">
              <div className="bg-red-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <RiNumber2 className="text-red-600 text-2xl sm:text-3xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">2. Book Your Experience</h3>
              <p className="text-gray-600 text-sm sm:text-base">Secure your spot at the wedding with our various attendance packages.</p>
            </div>

            <div className="step-box text-center">
              <div className="bg-red-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <RiNumber3 className="text-red-600 text-2xl sm:text-3xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">3. Celebrate & Enjoy</h3>
              <p className="text-gray-600 text-sm sm:text-base">Attend the wedding as a special guest and immerse yourself in the celebrations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testimonialRef} className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">Guest Testimonials</h2>
          <p className="text-gray-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">Hear from travelers who have experienced the magic of Indian weddings through MyWeddingTour</p>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <TestimonialCard image={t.image} name={t.name} location={t.location} quote={t.quote} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-10 sm:py-16 bg-red-300 text-black">
        <div className="cta-inner container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold text-2xl sm:text-3xl mb-4">Ready to Experience an Indian Wedding?</h2>
          <p className="text-base sm:text-xl mb-6 max-w-2xl mx-auto">Join us for a cultural experience like no other. Create an account now to get started!</p>
          <Link to="/signup" className="bg-purple-500 hover:bg-red-600 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded text-sm sm:text-lg inline-block transition cta-inner">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
