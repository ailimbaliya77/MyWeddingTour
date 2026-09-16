import { useEffect, useRef, useState } from "react";
// Adjust this path if CelebrationStyles.jsx doesn't sit next to WeddingCard.jsx
// (HomePage imports both as "../../components/X", so they're likely siblings).
import WeddingCard from "./WeddingCard";

const API_URL = import.meta.env.VITE_API_URL;

const Veil = ({ wedding }) => {
  const coupleNames = `${wedding.bride?.firstName ?? ""} & ${wedding.groom?.firstName ?? ""}`;
  const location = [wedding.city, wedding.region].filter(Boolean).join(", ");
  const teaser = wedding.storyDescription || wedding.description || null;
  const chips = [wedding.religion || wedding.type, wedding.city].filter(Boolean);

  return (
    <div className="veil absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF9F0]/95 via-[#F3E4C6]/92 to-[#E8C87A]/90 px-5 text-center">
      <div className="veil-shimmer absolute inset-0" />
      <p className="relative font-serif text-xl font-bold text-[#5C1620]">
        {coupleNames}
      </p>
      {location && (
        <p className="relative mt-2 text-xs text-[#8A6A2F]">{location}</p>
      )}
      {teaser && (
        <p className="relative mt-3 line-clamp-2 text-xs text-[#6B5A3A]">{teaser}</p>
      )}
      {chips.length > 0 && (
        <div className="relative mt-3 flex flex-wrap justify-center gap-1.5">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-white/60 px-2.5 py-1 text-[11px] font-medium text-[#5C1620]"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
      <p className="relative mt-4 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#8A6A2F]">
        Lift the veil
        <span className="veil-hint">↝</span>
      </p>
    </div>
  );
};

const VeiledCard = ({ wedding, index }) => (
  // relative + no fixed height: WeddingCard sets the intrinsic height,
  // the veil (absolute inset-0) fills exactly that.
  <div
    tabIndex={0}
    className="veil-tile group relative overflow-hidden rounded-2xl outline-none"
    style={{ transitionDelay: `${Math.min(index, 8) * 90}ms` }}
  >
    <WeddingCard wedding={wedding} index={index} />
    <Veil wedding={wedding} />
  </div>
);

const SkeletonTile = () => (
  <div className="h-[380px] animate-pulse rounded-2xl border border-[#EADFD3] bg-white">
    <div className="h-52 w-full rounded-t-2xl bg-[#F1E6DC]" />
    <div className="space-y-3 p-5">
      <div className="h-3 w-2/3 rounded bg-[#F1E6DC]" />
      <div className="h-3 w-full rounded bg-[#F1E6DC]" />
      <div className="h-3 w-1/2 rounded bg-[#F1E6DC]" />
    </div>
  </div>
);

const CelebrationStyles = () => {
  const [visible, setVisible] = useState(false);
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const res = await fetch(`${API_URL}/wedding`);
        const data = await res.json();
        if (res.ok) {
          setWeddings((data.data || []).slice(0, 6));
        }
      } catch (err) {
        console.error("Error fetching weddings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeddings();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#FFF9F0] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex flex-col gap-4 transition-all duration-700 md:flex-row md:items-end md:justify-between ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7A1F2B]">
              About That Crown
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#2A1710] md:text-4xl">
              Which Celebration Calls to You?
            </h2>
            <p className="mt-2 text-sm text-[#5C4C42]">
              It's real, and it's yours for a day — in a Gujarati wedding.
            </p>
          </div>
          <p className="max-w-sm text-sm text-[#5C4C42]">
            Every wedding on Reewaayat is real, hosted by a real family. Lift
            the veil to see who's celebrating.
          </p>
        </div>

        <div
          className={`mt-10 grid grid-cols-1 gap-6 transition-all duration-700 sm:grid-cols-2 lg:grid-cols-3 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonTile key={i} />)
            : weddings.length === 0
            ? (
                <p className="col-span-full py-10 text-center text-sm text-[#8A6A2F]">
                  No weddings to preview just yet — check back soon.
                </p>
              )
            : weddings.map((wedding, i) => (
                <VeiledCard key={wedding._id} wedding={wedding} index={visible ? i : 0} />
              ))}
        </div>

        <div
          className={`mt-10 text-center transition-all delay-500 duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <a
            href="/weddings"
            className="inline-flex items-center gap-2 rounded-full border border-[#C89B3C] px-8 py-3.5 text-sm font-semibold text-[#7A1F2B] transition hover:bg-[#7A1F2B] hover:text-white"
          >
            Explore All Weddings
          </a>
        </div>
      </div>

      <style>{`
        .veil {
          transition: opacity 700ms ease, transform 700ms ease;
        }
        .veil-tile:hover .veil,
        .veil-tile:active .veil,
        .veil-tile:focus-within .veil {
          opacity: 0;
          transform: translateY(-14%);
          pointer-events: none;
        }
        .veil-shimmer {
          background: linear-gradient(
            115deg,
            transparent 20%,
            rgba(255, 255, 255, 0.55) 45%,
            transparent 65%
          );
          background-size: 250% 250%;
          animation: veil-shine 3.2s ease-in-out infinite;
        }
        @keyframes veil-shine {
          0% { background-position: 130% 0%; }
          55% { background-position: -30% 0%; }
          100% { background-position: -30% 0%; }
        }
        .veil-hint {
          display: inline-block;
          animation: veil-nudge 1.8s ease-in-out infinite;
        }
        @keyframes veil-nudge {
          0%, 100% { transform: translateX(0); opacity: 0.7; }
          50% { transform: translateX(4px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .veil-shimmer, .veil-hint { animation: none; }
          .veil { transition: none; }
        }
      `}</style>
    </section>
  );
};

export default CelebrationStyles;