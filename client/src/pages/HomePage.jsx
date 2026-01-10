import React, { useEffect, useRef, useState } from "react";
import Navvbar from "../pages/Navvbar"
import Hero from "../components/Hero";
import TestimonialCard from "../components/TestimonialCard";
import WeddingCard from "../components/weddingCardHomepage";
import { Link } from "react-router-dom";
import { RiNumber1, RiNumber2, RiNumber3, RiCalendarEventLine, RiMapPinLine, RiStarFill, RiArrowRightLine } from "react-icons/ri";
import { FaGlassCheers, FaHandsHelping, FaPalette, FaMusic, FaUtensils } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {

  const [featuredWeddings, setFeaturedWeddings] = useState([]);
const [loadingWeddings, setLoadingWeddings] = useState(true);

useEffect(() => {
  const fetchWeddings = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/wedding");
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


  const [setLoginOpen] = useState(false);

  // Refs for sections
  const featureRef = useRef(null);
  const howRef = useRef(null);
  const weddingTypesRef = useRef(null);
  const testimonialRef = useRef(null);
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


      // TESTIMONIALS - enhanced animation
      gsap.utils.toArray(".testimonial-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 140, opacity: 0, rotateY: 10 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1.3,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

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

  const testimonials = [
    {
      id: 1,
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      name: "Sarah Johnson",
      location: "USA",
      quote: "Attending an Indian wedding through MyWeddingTour was the most immersive cultural experience I've ever had...",
      ctaText: "Read Sarah's full story",
      ctaLink: "/stories/sarah"
    },
    {
      id: 2,
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      name: "Carlos Rodriguez",
      location: "Spain",
      quote: "I was welcomed like family at the wedding. The ceremonies were fascinating and the food was amazing!",
      ctaText: "Watch Carlos's video diary",
      ctaLink: "/stories/carlos"
    },
    {
      id: 3,
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      name: "Yuki Tanaka",
      location: "Japan",
      quote: "Everything was perfectly organized from start to finish. I learned so much about Indian wedding traditions.",
      ctaText: "See Yuki's photos",
      ctaLink: "/stories/yuki"
    },
  ];

  /* const weddingTypes = [
    {
      id: 1,
      title: "Grand North Indian Wedding",
      icon: <FaGlassCheers />,
      duration: "3-5 days",
      highlight: "Mehndi, Sangeet, Baraat",
      bestFor: "First-time visitors",
      cta: "Explore Northern Weddings"
    },
    {
      id: 2,
      title: "Elegant South Indian Wedding",
      icon: <FaHandsHelping />,
      duration: "1-2 days",
      highlight: "Sacred rituals, Temple ceremonies",
      bestFor: "Spiritual seekers",
      cta: "Explore Southern Weddings"
    },
    {
      id: 3,
      title: "Destination Beach Wedding",
      icon: <FaPalette />,
      duration: "2-3 days",
      highlight: "Fusion style, International crowd",
      bestFor: "Younger travelers",
      cta: "Explore Destination Weddings"
    }
  ]; */

  const features = [
    {
      icon: <FaMusic className="text-3xl" />,
      title: "See the Real India",
      description: "Move beyond monuments to living culture where traditions breathe",
      cta: "Read our cultural philosophy →"
    },
    {
      icon: <FaHandsHelping className="text-3xl" />,
      title: "Be Welcomed as Family",
      description: "Indian hospitality means you're an honored guest, not a tourist",
      cta: "See guest stories of inclusion →"
    },
    {
      icon: <FaUtensils className="text-3xl" />,
      title: "All Your Senses Awaken",
      description: "Vibrant colors, aromatic spices, joyful music create unforgettable memories",
      cta: "Explore wedding elements →"
    }
  ];

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
    <div className="overflow-hidden">
      <div className="relative">
      {/* Hero Background */}
      <Hero />

      {/* Navbar OVER Hero */}
      <Navvbar setLoginOpen={setLoginOpen} />
    </div>

      {/* FEATURE CARDS SECTION */}
      <section ref={featureRef} className="py-16 bg-gradient-to-b from-white to-red-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-red-100">
                <div className="text-red-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <Link to="/culture" className="text-red-600 font-semibold hover:text-red-700 flex items-center gap-2">
                  {feature.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Enhanced */}
      <section ref={howRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-800">
            From Curious to Celebrating in 3 Simple Steps
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
            Experience authentic Indian wedding celebrations with our guided process
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-24 left-1/4 right-1/4 h-1 bg-gradient-to-r from-red-200 to-pink-200"></div>
            
            <div className="step-box text-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-red-100 to-pink-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <RiNumber1 className="text-red-600 text-4xl" />
                </div>
                <div className="absolute -top-2 -right-2 bg-yellow-100 rounded-full p-2">
                  <RiCalendarEventLine className="text-yellow-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">1. Browse & Select</h3>
              <p className="text-gray-600 mb-6">Explore upcoming weddings and choose one that matches your travel dates and interests.</p>
              <Link to="/weddings" className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-6 py-3 rounded-full transition-all duration-300">
                🔍 Browse Upcoming Weddings
              </Link>
            </div>

            <div className="step-box text-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-red-100 to-pink-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <RiNumber2 className="text-red-600 text-4xl" />
                </div>
                <div className="absolute -top-2 -right-2 bg-green-100 rounded-full p-2">
                  <RiMapPinLine className="text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">2. Book & Prepare</h3>
              <p className="text-gray-600 mb-6">Secure your spot and receive our comprehensive guest guide covering attire, etiquette, and logistics.</p>
              <Link to="/guide" className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-6 py-3 rounded-full transition-all duration-300">
                📖 Download Guest Guide
              </Link>
            </div>

            <div className="step-box text-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-red-100 to-pink-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <RiNumber3 className="text-red-600 text-4xl" />
                </div>
                <div className="absolute -top-2 -right-2 bg-purple-100 rounded-full p-2">
                  <RiStarFill className="text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">3. Celebrate & Connect</h3>
              <p className="text-gray-600 mb-6">Immerse yourself in rituals, feast, and festivities as an honored guest of the family.</p>
              <Link to="/experience" className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-6 py-3 rounded-full transition-all duration-300">
                🎬 Watch a 2-Min Experience
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WEDDING TYPES */}
      <section ref={weddingTypesRef} className="py-20 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-800">
            Which Celebration Calls to You?
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
            Discover different wedding styles across India's diverse regions
          </p>

              {loadingWeddings ? (
      <p className="text-center text-gray-500">Loading weddings…</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 wedding-types-wrapper">
        {featuredWeddings.map((wedding) => (
          <WeddingCard key={wedding._id} wedding={wedding} />
        ))}
      </div>
    )}

    <div className="text-center mt-14">
      <Link
        to="/weddings"
        className="inline-block border border-red-500 text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-red-50 transition"
      >
        Explore All Weddings
      </Link>
    </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testimonialRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-800">
            Travelers Share Their Unforgettable Journeys
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
            Hear from guests from around the world who experienced the magic of Indian weddings
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <TestimonialCard 
                  image={t.image} 
                  name={t.name} 
                  location={t.location} 
                  quote={t.quote}
                  ctaText={t.ctaText}
                  ctaLink={t.ctaLink}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/stories" 
              className="inline-flex items-center gap-2 text-red-600 font-bold text-lg hover:text-red-700 border-b-2 border-red-200 hover:border-red-600 pb-1 transition-all duration-300"
            >
              View More Stories from 80+ Countries
              <RiArrowRightLine className="mt-1" />
            </Link>
          </div>
        </div>
      </section>

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
                <Link to="/faq" className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700">
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
      <section ref={ctaRef} className="py-20 bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <div className="cta-inner container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold text-3xl sm:text-4xl mb-6">Your Indian Celebration Awaits</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Whether you're seeking cultural depth or joyful celebration, your perfect wedding experience is one click away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
            <Link 
              to="/weddings" 
              className="bg-white hover:bg-gray-100 text-red-600 font-bold px-10 py-5 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
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