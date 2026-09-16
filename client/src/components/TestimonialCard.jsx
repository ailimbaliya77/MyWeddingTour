import { Link } from "react-router-dom";
import { RiStarFill } from "react-icons/ri";

function TestimonialCard({
  image,
  name,
  location,
  worry,
  reality,
  ctaText,
  ctaLink,
}) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E7D3B1] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-12px_rgba(122,31,43,0.18)]">
      {/* worry */}
      <div className="border-b border-dashed border-[#E7D3B1] bg-[#FFF9F0] px-6 py-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A6A2F]">
          Worried about
        </p>
        <p className="mt-1.5 font-serif text-lg font-semibold leading-snug text-[#2A1710]">
          {worry}
        </p>
      </div>

      {/* reality */}
      <div className="flex flex-1 flex-col px-6 py-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#7A1F2B]">
          What actually happened
        </p>
        <p className="mt-1.5 flex-grow text-[15px] leading-relaxed text-[#4A3B34]">
          {reality}
        </p>

        <div className="mt-5 flex items-center gap-3 border-t border-[#F3E4C6] pt-4">
          <img
            src={image}
            alt={name}
            className="h-11 w-11 rounded-full border-2 border-[#C89B3C]/50 object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-bold text-[#2A1710]">{name}</p>
            <p className="text-xs text-[#8A6A2F]">{location}</p>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <RiStarFill key={i} className="text-xs text-[#C89B3C]" />
            ))}
          </div>
        </div>

        {ctaText && ctaLink && (
          <Link
            to={ctaLink}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7A1F2B] transition hover:text-[#5C1620]"
          >
            {ctaText} →
          </Link>
        )}
      </div>
    </div>
  );
}

export default TestimonialCard;