import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../auth/Login";
import bgImage from "../../assets/brebeach-wedding.webp";
import bgimage2 from "../../assets/wedding-portrait-770x515.jpg";

export default function HostLandingPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleRegisterClick = () => {
    if (!isLoggedIn) setShowLogin(true);
    else navigate("/host/register/step1");
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    navigate("/host/register/step1");
  };

  const benefits = [
    {
      title: "Earn extra income",
      desc: "Create meaningful connections while you celebrate. Guests can help cover venue or honeymoon costs.",
    },
    {
      title: "Cultural Exchange",
      desc: "Share Indian rituals with travelers while learning traditions from around the world.",
    },
    {
      title: "Trusted & Secure",
      desc: "All guests are verified and you decide exactly who attends your special day.",
    },
  ];

  const steps = [
    {
      n: "1",
      title: "List your wedding",
      desc: "Create your listing in minutes and add your location and ceremony details.",
    },
    {
      n: "2",
      title: "Review requests",
      desc: "Chat with travelers and accept the guests who best match your celebration.",
    },
    {
      n: "3",
      title: "Welcome guests",
      desc: "Our support team helps guide guests so you can enjoy your wedding stress‑free.",
    },
  ];

  return (
    <>
      <div className="bg-[#FBF7F4] text-[#1A1713] font-sans">

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 py-16 pt-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#D95F2B] font-semibold uppercase mb-4">
              Become a host
            </p>

            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">
              Invite the world to your wedding celebration
            </h1>

            <p className="text-[#6B6560] text-sm leading-relaxed mb-8 max-w-md">
              Turn your wedding into a global cultural exchange. Welcome respectful
              travelers, share your traditions, and earn money to support your new
              journey together.
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleRegisterClick}
                className="bg-[#D95F2B] hover:opacity-90 text-white text-sm font-semibold px-6 py-3 rounded-md"
              >
                List Your Wedding →
              </button>

              <button className="border border-gray-300 text-sm px-6 py-3 rounded-md">
                Learn More
              </button>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={bgImage}
              alt="Wedding"
              className="w-full h-[360px] object-cover"
            />
          </div>
        </section>

        {/* BENEFITS */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-center mb-4">
              Why host with Reewaayat?
            </h2>

            <p className="text-center text-[#6B6560] text-sm max-w-lg mx-auto mb-12">
              Joining our community gives you the opportunity to showcase Indian
              hospitality while receiving financial support.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#FBF7F4] border border-[#EDE4DC] rounded-xl p-6"
                >
                  <div className="w-12 h-12 rounded-full bg-[#F7D9C4] mb-4" />

                  <h3 className="font-semibold mb-2">{item.title}</h3>

                  <p className="text-sm text-[#6B6560] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-center mb-4">
              How it works
            </h2>

            <p className="text-center text-[#6B6560] text-sm mb-12">
              Hosting is simple and fully supported by our team
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={i}>
                  <div className="w-9 h-9 rounded-full bg-[#EDE0D6] flex items-center justify-center text-[#9C8478] font-bold mb-4">
                    {step.n}
                  </div>

                  <h3 className="font-semibold mb-2">{step.title}</h3>

                  <p className="text-sm text-[#6B6560] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="pb-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 bg-[#2C1A0E] rounded-2xl overflow-hidden">
            <div className="p-10 flex flex-col justify-center text-[#F0E4D8]">
              <p className="italic font-serif text-lg leading-relaxed mb-6">
                We were initially hesitant, but hosting Mark and Sarah became the
                highlight of our reception. The money we earned covered our
                entire Sangeet night!
              </p>

              <div>
                <p className="font-semibold">Priya & Rahul</p>
                <p className="text-sm text-[#C8B8AE]">
                  Married in Mumbai, 2024
                </p>
              </div>
            </div>

            <img
              src={bgimage2}
              alt="Couple"
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      </div>

      <Login
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
