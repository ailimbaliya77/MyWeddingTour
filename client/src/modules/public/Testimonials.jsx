import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";
import TestimonialCard from "../../components/TestimonialCard";

const testimonials = [
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    name: "Sarah Johnson",
    location: "USA",
    worry: "\"I won't know anyone there. Won't I just be in the way?\"",
    reality:
      "Within an hour the groom's cousins had pulled me into the mehendi circle and taught me the songs. By the sangeet, three different aunties had adopted me for the night.",
    ctaText: "Read Sarah's full story",
    ctaLink: "/stories/sarah",
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    name: "Carlos Rodriguez",
    location: "Spain",
    worry: "\"What if I wear the wrong thing or do something disrespectful?\"",
    reality:
      "My host coordinator sent a simple attire guide the week before, and the family laughed off my one wardrobe mistake. Nobody expected me to get it perfect — just to show up and try.",
    ctaText: "Watch Carlos's video diary",
    ctaLink: "/stories/carlos",
  },
  {
    id: 3,
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Yuki Tanaka",
    location: "Japan",
    worry:
      "\"I don't speak Hindi. Will I understand any of what's happening?\"",
    reality:
      "Most of the family spoke English, and when a ritual needed explaining, someone always leaned over to translate. I understood more of the meaning than I expected to.",
    ctaText: "See Yuki's photos",
    ctaLink: "/stories/yuki",
  },
];

const Testimonials = () => {
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
    <section ref={sectionRef} className="bg-[#FFF9F0] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7A1F2B]">
            Every First-Timer Has The Same Questions
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#2A1710] md:text-4xl">
            What Guests Worried About — And What Happened Instead
          </h2>
          <p className="mt-3 text-[15px] text-[#5C4C42]">
            You're not the first foreigner to hesitate. Here's what past
            guests actually found.
          </p>
        </div>

        <div
          className={`mt-12 grid grid-cols-1 gap-8 transition-all delay-150 duration-700 md:grid-cols-3 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.id}
              image={t.image}
              name={t.name}
              location={t.location}
              worry={t.worry}
              reality={t.reality}
              ctaText={t.ctaText}
              ctaLink={t.ctaLink}
            />
          ))}
        </div>

        <div
          className={`mt-12 text-center transition-all delay-300 duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 border-b-2 border-[#C89B3C]/40 pb-1 text-lg font-bold text-[#7A1F2B] transition-all duration-300 hover:border-[#C89B3C] hover:text-[#5C1620]"
          >
            View More Stories from 80+ Countries
            <RiArrowRightLine className="mt-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;