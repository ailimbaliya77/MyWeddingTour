import React, { useEffect, useRef, useState } from "react";
import Hero from "../../components/Hero";
import Testimonials from "./Testimonials";
import WeddingCard from "../../components/WeddingCard";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GuestPass from "../../components/GuestPass";
import CelebrationStyles from "../../components/CelebrationStyles";
import CuriosityReel from "../../components/CuriosityReel";
import TrustGovernance from "../../components/TrustGovernance";
const API_URL = import.meta.env.VITE_API_URL;

gsap.registerPlugin(ScrollTrigger);

function HomePage() {

  const [, setFeaturedWeddings] = useState([]);
  const [, setLoadingWeddings] = useState(true);

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const res = await fetch(`${API_URL}/wedding`);
        const data = await res.json();

        if (res.ok) {
          setFeaturedWeddings((data.data || []).slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching weddings", err);
      } finally {
        setLoadingWeddings(false);
      }
    };

    fetchWeddings();
  }, []);



  // Refs for sections
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // FEATURE SECTION - staggered animation for cards
      gsap.utils.toArray(".feature-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // HOW IT WORKS - enhanced animation
      gsap.utils.toArray(".step-box").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 120, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: i * 0.2,
            ease: "back.out(1.3)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // WEDDING TYPES – step-by-step floating cards
      const weddingCards = gsap.utils.toArray(".wedding-type-card");

      gsap.fromTo(
        weddingCards,
        {
          y: 120,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: {
            each: 0.25,
          },
          scrollTrigger: {
            trigger: ".wedding-types-wrapper",
            start: "top 75%",
            end: "bottom 60%",
            scrub: false,
            toggleActions: "play none none reverse",
          },
        }
      );

      // CTA - enhanced animation
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

      // FAQ items animation
      gsap.utils.toArray(".faq-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

    });

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      question: "Is it appropriate for foreigners to attend?",
      answer: "Absolutely! Indian families love sharing their joy with international guests.",
      cta: "📘 Read Our Etiquette Guide"
    },
    {
      question: "What should I wear and bring?",
      answer: "We provide detailed guidance based on wedding type and region.",
      cta: "👗 See Attire Inspiration"
    },
    {
      question: "How do I communicate without knowing Hindi?",
      answer: "Most families speak English, and we provide translation guides.",
      cta: "🗣️ Learn Basic Wedding Phrases"
    }
  ];

  return (
    <div className="overflow-hidden bg-[#f8f6f3]">
      <div className="relative h-screen">

  {/* HERO */}
  <Hero />

</div>

      {/* CURATED COLLECTION SECTION */}
      
      <CuriosityReel />

      <GuestPass />

      <CelebrationStyles />
      
      <Testimonials />

      <TrustGovernance /> 

      {/* FAQ SECTION */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">
            Curious? Let's Answer Your Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600 mb-4">{faq.answer}</p>
                <Link to="/faq" className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-red-700">
                  {faq.cta}
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/faq" 
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              📊 Read more FAQ's
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="cta-inner container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold text-3xl sm:text-4xl mb-6">Your Indian Celebration Awaits</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Whether you're seeking cultural depth or joyful celebration, your perfect wedding experience is one click away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
            <Link 
              to="/weddings" 
              className="bg-white hover:bg-gray-100 text-orange-500 font-bold px-10 py-5 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              🎫 Find Your Wedding Invitation
            </Link>
            <Link 
              to="/BecomeHost" 
              className="bg-transparent hover:bg-white/20 border-2 border-white text-white font-bold px-10 py-5 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              💸 Start Hosting
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mt-8 text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              Secure booking
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              24/7 support
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              Verified hosts
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              Money-back guarantee
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;