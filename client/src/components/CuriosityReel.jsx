import { useEffect, useRef, useState } from "react";
import { RiArrowDownLine } from "react-icons/ri";

const rowOne = [
  {
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=700&q=80",
    question: "What does it feel like to be crowned for a day?",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80",
    question: "Why does the whole street stop for the baraat?",
  },
  {
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=700&q=80",
    question: "What's hidden in a hundred shades of mehendi?",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512914890251-bfb2e4547588?auto=format&fit=crop&w=700&q=80",
    question: "Why do strangers dance like family by nightfall?",
  },
];

const rowTwo = [
  {
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=700&q=80",
    question: "What does a blessing sound like in Punjabi?",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581704723043-70c2216277de?auto=format&fit=crop&w=700&q=80",
    question: "What's on a 28-course coastal banquet table?",
  },
  {
    image:
      "https://images.unsplash.com/photo-1598875206191-5f88198c0a35?auto=format&fit=crop&w=700&q=80",
    question: "What do a thousand oil lamps look like on water?",
  },
  {
    image:
      "https://images.unsplash.com/photo-1671531776382-f32dff368120?auto=format&fit=crop&w=700&q=80",
    question: "Why does the drummer never seem to tire?",
  },
];

const Card = ({ image, question }) => (
  <div className="curiosity-card group relative h-72 w-52 shrink-0 overflow-hidden rounded-2xl border border-white/10 md:h-80 md:w-56">
    <img
      src={image}
      alt=""
      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-500 group-hover:from-black/95" />
    <div className="absolute inset-0 rounded-2xl opacity-0 shadow-[0_0_0_1px_rgba(255,166,90,0.6),0_0_28px_rgba(255,140,60,0.35)] transition-opacity duration-500 group-hover:opacity-100" />
    <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border border-white/25 bg-white/10 text-[11px] font-bold text-white/70 backdrop-blur-sm">
      ?
    </span>
    <p className="absolute inset-x-4 bottom-5 font-serif text-lg font-semibold leading-snug text-white/95 transition-transform duration-500 group-hover:-translate-y-1">
      {question}
    </p>
  </div>
);

const CuriosityReel = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#120A08] py-20"
    >
      {/* ambient glow blobs */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-orange-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-rose-800/25 blur-[120px]" />

      <div
        className={`relative mx-auto max-w-3xl px-6 text-center transition-all duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
          Before You Scroll Further
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-white md:text-4xl">
          Every Indian wedding is asking you a question.
        </h2>
        <p className="mt-3 text-sm text-white/50">
          Wander through a few. The answers are further down.
        </p>
      </div>

      <div
        className={`relative mt-12 space-y-5 transition-all delay-200 duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="marquee-row">
          <div className="marquee-track marquee-left">
            {[...rowOne, ...rowOne].map((m, i) => (
              <Card key={`r1-${i}`} {...m} />
            ))}
          </div>
        </div>

        <div className="marquee-row">
          <div className="marquee-track marquee-right">
            {[...rowTwo, ...rowTwo].map((m, i) => (
              <Card key={`r2-${i}`} {...m} />
            ))}
          </div>
        </div>

        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#120A08] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#120A08] to-transparent" />
      </div>

      <div className="relative mt-12 flex flex-col items-center gap-1 text-white/40">
        <RiArrowDownLine className="animate-bounce text-xl" />
        <p className="text-xs font-medium uppercase tracking-[0.15em]">
          Keep scrolling
        </p>
      </div>

      <style>{`
        .marquee-row {
          overflow: hidden;
          width: 100%;
        }
        .marquee-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation-duration: 42s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .marquee-left { animation-name: scroll-left; }
        .marquee-right { animation-name: scroll-right; }
        .marquee-row:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default CuriosityReel;