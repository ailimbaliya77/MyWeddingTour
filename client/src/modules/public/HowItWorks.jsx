import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/istockphoto-2232665349-612x612.jpg"
import img2 from "../../assets/communication-chat-message-contact-social-260nw-2673729553.webp"
import img3 from "../../assets/pngtree-book-now-banner-in-hanging-style-png-image_3954940.png"
import img4 from "../../assets/punjabi-engagement-ceremony-3.jpg"

const steps = [
  {
    title: "Browse real weddings",
    desc: "Explore weddings hosted by local families across India, each with real photos, dates, and traditions.",
    img: img1,
  },
  {
    title: "Connect before you go",
    desc: "Message your ceremony guide to ask questions and understand what to expect and how to dress.",
    img: img2,
  },
  {
    title: "Book your seat",
    desc: "Reserve your place at the wedding and events you want to attend, with contributions going to the host family.",
    img: img3,
  },
  {
    title: "Experience it fully",
    desc: "Join the celebration, take part in the rituals, and leave with memories and connections that last.",
    img: img4,
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-[#FBF1EF]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3 text-center">
          Your Journey to the Mandap
        </h1>
        <p className="text-[#8B807C] text-center mb-16">
          From browsing to celebrating, here's what to expect
        </p>

        <div className="space-y-14">
          {steps.map((s, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  reversed ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Text card */}
                <div className="relative flex-1 bg-white border border-[#F0DDD8] rounded-2xl shadow-sm p-8 w-full">
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#E1614A] text-white font-bold text-sm flex items-center justify-center shadow-md ${
                      reversed ? "-right-4 md:-left-4 md:right-auto" : "-right-4"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-serif font-bold text-gray-900 text-xl mb-2">
                    {s.title}
                  </h3>
                  <p className="text-[#8B807C] leading-relaxed">{s.desc}</p>
                </div>

                {/* Image placeholder */}
                <div
                  className="flex-1 h-64 rounded-2xl bg-cover bg-center shadow-sm"
                  style={{
                    backgroundImage: `url(${s.img})`,
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center bg-[#241A16] rounded-2xl p-10">
          <h2 className="font-serif text-2xl font-bold text-white mb-2">
            Ready to experience the extraordinary?
          </h2>
          <p className="text-[#C9B8B0] max-w-md mx-auto mb-6">
            Join thousands of global travelers who have transformed their
            understanding of culture through the magic of an Indian wedding.
          </p>
          <Link
            to="/weddings"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#E1614A] text-white rounded-xl font-semibold hover:bg-[#C74E39] transition"
          >
            Browse weddings
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              className="w-4 h-4"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;