import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { MapPin, CalendarDays, Users, Heart, ShieldCheck, Star } from "lucide-react";

// Format a date range like "Apr 19 – Apr 26, 2026"
function formatDateRange(start, end) {
  if (start && start.isValid() && end && end.isValid()) {
    const sameYear = start.year() === end.year();
    const startFmt = sameYear ? "MMM D" : "MMM D, YYYY";
    return `${start.format(startFmt)} – ${end.format("MMM D, YYYY")}`;
  }
  if (start && start.isValid()) return start.format("MMM D, YYYY");
  return null;
}

export default function WeddingCard({ wedding, index = 0 }) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const startDate = wedding.weddingStartDate ? dayjs(wedding.weddingStartDate) : null;
  const endDate = wedding.weddingEndDate ? dayjs(wedding.weddingEndDate) : null;
  const dateRange = formatDateRange(startDate, endDate);

  const spotsTotal = wedding.guestCapacity ?? null;
  const spotsLeft = wedding.spotsLeft ?? (spotsTotal != null ? spotsTotal - (wedding.bookedCount || 0) : null);
  const isFillingUp = spotsTotal != null && spotsLeft != null && spotsLeft <= Math.max(2, Math.round(spotsTotal * 0.15));

  const badgeLabel = wedding.religion || wedding.type || null;
  const coupleNames = `${wedding.bride?.firstName ?? ""} & ${wedding.groom?.firstName ?? ""}`;
  const description = wedding.storyDescription || wedding.description || null;
  const location = [wedding.city, wedding.region].filter(Boolean).join(", ");
  const price = wedding.pricePerPerson;
  const rating = wedding.rating;
  const isVerifiedHost = wedding.hostVerified ?? true;

  const goToDetails = () => navigate(`/weddings/${wedding._id}`);

  return (
    <div
      onClick={goToDetails}
      className="rw-rise group cursor-pointer bg-white rounded-2xl border border-[#EADFD3] overflow-hidden hover:shadow-lg hover:shadow-[#5C1A28]/8 hover:-translate-y-0.5 transition-all duration-300"
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
    >
      {/* IMAGE */}
      <div
        className="relative h-52 w-full overflow-hidden"
        style={
          wedding.listingPhotoURL
            ? {
                backgroundImage: `url(${wedding.listingPhotoURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {
                backgroundColor: "#F1E6DC",
                backgroundImage:
                  "linear-gradient(45deg, #F6EEE4 25%, transparent 25%), linear-gradient(-45deg, #F6EEE4 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #F6EEE4 75%), linear-gradient(-45deg, transparent 75%, #F6EEE4 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
              }
        }
      >
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent transition-opacity group-hover:from-black/70" />

        {badgeLabel && (
          <span className="absolute top-3 left-3 bg-[#C9922E] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
            {badgeLabel}
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setSaved((s) => !s);
          }}
          aria-label={saved ? "Remove from saved" : "Save wedding"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart className={`w-4 h-4 transition-colors ${saved ? "fill-[#A23E4C] text-[#A23E4C]" : "text-[#6B5750]"}`} />
        </button>

        {price != null && (
          <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur text-[#2A1B1E] text-xs font-semibold px-2.5 py-1 rounded-full">
            ₹{Number(price).toLocaleString("en-IN")} / guest
          </span>
        )}

        <h2 className="absolute bottom-3 left-4 right-24 rw-serif font-semibold text-white text-lg leading-snug">
          {coupleNames}
        </h2>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2.5">
          {isVerifiedHost && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#3F7A5D] bg-[#E7F3EC] px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3" /> Verified host
            </span>
          )}
          {rating != null && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C9922E]">
              <Star className="w-3 h-3 fill-[#C9922E]" /> {rating}
            </span>
          )}
        </div>

        {description && (
          <p className="text-[#6B5750] text-sm leading-relaxed line-clamp-2 mb-4">{description}</p>
        )}

        <div className="border-t border-[#F1E6DC] pt-3 space-y-2">
          {location && (
            <div className="flex items-center gap-2 text-[#6B5750] text-sm">
              <MapPin className="w-4 h-4 shrink-0 text-[#C9922E]" />
              <span>{location}</span>
            </div>
          )}

          {dateRange && (
            <div className="flex items-center gap-2 text-[#6B5750] text-sm">
              <CalendarDays className="w-4 h-4 shrink-0 text-[#C9922E]" />
              <span>{dateRange}</span>
            </div>
          )}

          {spotsTotal !== null && (
            <div className={`flex items-center gap-2 text-sm ${isFillingUp ? "text-[#B9691F] font-medium" : "text-[#6B5750]"}`}>
              <Users className="w-4 h-4 shrink-0 text-[#C9922E]" />
              <span>
                {spotsLeft !== null
                  ? isFillingUp
                    ? `Only ${spotsLeft} of ${spotsTotal} spots left`
                    : `${spotsLeft} of ${spotsTotal} spots available`
                  : `${spotsTotal} spots available`}
              </span>
            </div>
          )}
        </div>

        {/* Book Now */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToDetails();
          }}
          className="mt-4 w-full bg-[#5C1A28] hover:bg-[#3C0F1A] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          View &amp; Book
        </button>
      </div>
    </div>
  );
}