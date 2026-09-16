import { useEffect, useRef, useState } from "react";
import {
  RiShieldCheckLine,
  RiFileShieldLine,
  RiGlobalLine,
  RiPhoneLine,
} from "react-icons/ri";

const trustPoints = [
  {
    icon: RiFileShieldLine,
    title: "Registered Indian Business",
    // Replace with your real registration type once incorporated,
    // e.g. "Private Limited Company, CIN U00000XX0000..."
    detail: "Operating as a legally registered company in India.",
  },
  {
    icon: RiShieldCheckLine,
    title: "Data Privacy Compliant",
    detail:
      "Guest data is handled in line with India's Digital Personal Data Protection Act, 2023.",
  },
  {
    icon: RiGlobalLine,
    title: "Tourism-Safety Aligned",
    detail:
      "Guest guidance follows published Ministry of Tourism visitor safety practices.",
  },
  {
    icon: RiPhoneLine,
    title: "Embassy-Aware Support",
    detail:
      "Our concierge shares the relevant embassy and emergency contacts for every guest's home country.",
  },
];

const TrustGovernance = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="border-y border-[#E7D3B1] bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7A1F2B]">
            Built On Real Compliance, Not Just Promises
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#2A1710] md:text-4xl">
            Trusted By Guests. Accountable Under Indian Law.
          </h2>
          <p className="mt-3 text-[15px] text-[#5C4C42]">
            We're a registered Indian business, not an anonymous listing
            site — here's what that means for you.
          </p>
        </div>

        <div
          className={`mt-12 grid grid-cols-1 gap-6 transition-all delay-150 duration-700 sm:grid-cols-2 lg:grid-cols-4 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          
          {trustPoints.map(({  title, detail }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#E7D3B1] bg-[#FFF9F0] p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#7A1F2B] shadow-sm">
              </div>
              <h3 className="mt-4 text-[15px] font-bold text-[#2A1710]">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#5C4C42]">
                {detail}
              </p>
            </div>
          ))}
        </div>

        <p
          className={`mt-8 text-center text-xs text-[#8A6A2F] transition-opacity delay-300 duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          For full details, see our{" "}
          <a href="/trust" className="underline hover:text-[#7A1F2B]">
            Trust &amp; Safety Portal
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default TrustGovernance;