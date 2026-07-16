import React from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Browse real weddings",
    desc: "Explore weddings hosted by local families across India, each with real photos, dates, and traditions.",
  },
  {
    title: "Connect before you go",
    desc: "Message your ceremony guide to ask questions and understand what to expect and how to dress.",
  },
  {
    title: "Book your seat",
    desc: "Reserve your place at the wedding and events you want to attend, with contributions going to the host family.",
  },
  {
    title: "Experience it fully",
    desc: "Join the celebration, take part in the rituals, and leave with memories and connections that last.",
  },
];

const HowItWorks = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">Your Journey to the Mandap</h1>
      <p className="text-gray-500 text-center mb-14">From browsing to celebrating, here's what to expect</p>

      <div className="space-y-8">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-5">
            <div className="shrink-0 w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold">
              {i + 1}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">{s.title}</h3>
              <p className="text-gray-500 mt-1">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-10">
        <h2 className="text-xl font-bold text-white mb-2">Ready to experience the extraordinary?</h2>
        <Link
          to="/weddings"
          className="inline-block mt-4 px-8 py-3 bg-white text-teal-700 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Browse weddings
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;