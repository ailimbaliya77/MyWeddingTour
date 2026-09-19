import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  Gift,
  CheckCircle,
  Utensils,
  Music,
  Shirt,
  Phone,
  Mail,
  Languages,
  MapPinned,
  X,
  ShieldCheck,
  Sparkles,
  Camera,
  Info,
  MessageCircleQuestion,
  HeartHandshake,
  Landmark,
  Quote,
  Lock,
  LifeBuoy,
  Globe2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

// Distinct fallback photos used only to fill empty gallery slots —
// never repeats the same image twice in a row like the old gallery did.
const FALLBACK_GALLERY = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1583225214464-9296029910ba?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80",
];

const navSections = [
  { id: "highlights", label: "Overview" },
  { id: "story", label: "Story" },
  { id: "itinerary", label: "Itinerary" },
  { id: "hosts", label: "Hosts" },
  { id: "good-to-know", label: "Good to know" },
];

export default function WeddingDetails() {
  const { weddingId } = useParams();
  const navigate = useNavigate();
  const [wedding, setWedding] = useState(null);
  const [loading, setLoading] = useState(true);

  const [availability, setAvailability] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    seats: 1,
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    message: "",
  });
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const fetchAvailability = async () => {
    try {
      const res = await fetch(`${API_URL}/booking/availability/${weddingId}`);
      const data = await res.json();
      if (res.ok) setAvailability(data.data);
    } catch (err) {
      console.error("Failed to fetch availability", err);
    }
  };

  useEffect(() => {
    const fetchWedding = async () => {
      try {
        const res = await fetch(`${API_URL}/wedding/${weddingId}`);
        const data = await res.json();
        if (res.ok) setWedding(data.data);
      } catch (err) {
        console.error("Failed to fetch wedding", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWedding();
    fetchAvailability();
  }, []);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError("");

    const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (!token) {
      setBookingError("Please log in to book a seat.");
      return;
    }
    if (!bookingForm.guestName.trim() || !bookingForm.guestEmail.trim()) {
      setBookingError("Name and email are required.");
      return;
    }

    setBookingSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          weddingId,
          seats: Number(bookingForm.seats),
          guestName: bookingForm.guestName,
          guestEmail: bookingForm.guestEmail,
          guestPhone: bookingForm.guestPhone,
          message: bookingForm.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error?.message || "Couldn't reserve a seat.");

      setBookingSuccess(true);
      fetchAvailability();
    } catch (err) {
      setBookingError(err.message || "Something went wrong. Please try again.");
    } finally {
      setBookingSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF6EF]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-[#C9922E] mx-auto"></div>
          <p className="text-[#6B5750] text-sm mt-4">Loading wedding details...</p>
        </div>
      </div>
    );
  }

  if (!wedding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF6EF]">
        <div className="text-center">
          <Heart className="w-14 h-14 text-[#D9C4B8] mx-auto mb-4" />
          <p className="text-[#A23E4C] text-lg">Wedding not found</p>
        </div>
      </div>
    );
  }

  const isWeddingCompleted = wedding.weddingEndDate ? new Date(wedding.weddingEndDate) < new Date() : false;

  const capacity = availability?.guestCapacity ?? wedding.guestCapacity ?? null;
  const spotsLeft = availability?.spotsLeft ?? null;
  const seatsBooked = capacity != null && spotsLeft != null ? capacity - spotsLeft : null;
  const percentBooked = capacity ? Math.min(100, Math.round(((seatsBooked ?? 0) / capacity) * 100)) : 0;
  const isFillingFast = capacity != null && spotsLeft != null && spotsLeft > 0 && spotsLeft <= Math.max(3, Math.round(capacity * 0.2));
  const isFull = spotsLeft === 0;

  const languages = Array.isArray(wedding.ceremonyGuide?.spokenLanguages)
    ? wedding.ceremonyGuide.spokenLanguages
    : wedding.ceremonyGuide?.spokenLanguages
    ? [wedding.ceremonyGuide.spokenLanguages]
    : [];
  const speaksEnglish = languages.some((l) => l.toLowerCase().includes("english"));

  const firstEvent = wedding.events?.[0];
  const isVerifiedHost = wedding.hostVerified ?? true;

  // Build a real gallery instead of repeating listingPhotoURL five times.
  // Prefers wedding.gallery (array of URLs or {url}), then any per-event
  // photos, then fills remaining slots with distinct fallbacks — never
  // the same image twice.
  const rawGalleryEntries = [
    wedding.listingPhotoURL,
    ...(Array.isArray(wedding.gallery)
      ? wedding.gallery.map((g) => (typeof g === "string" ? g : g?.url))
      : []),
    ...(Array.isArray(wedding.events)
      ? wedding.events.map((e) => e?.photoURL).filter(Boolean)
      : []),
  ].filter(Boolean);

  const uniqueGalleryEntries = [...new Set(rawGalleryEntries)];

  let galleryImages = uniqueGalleryEntries.slice(0, 5);
  for (const fallback of FALLBACK_GALLERY) {
    if (galleryImages.length >= 5) break;
    if (!galleryImages.includes(fallback)) galleryImages.push(fallback);
  }

  return (
    <div className="bg-[#FBF6EF] min-h-screen rw-sans text-[#2A1B1E] pb-24 lg:pb-0 pt-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .rw-serif { font-family: 'Fraunces', serif; }
        .rw-sans { font-family: 'Inter', sans-serif; }
        @keyframes rwRise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .rw-rise { animation: rwRise 0.6s cubic-bezier(.22,.9,.32,1) both; }
        @media (prefers-reduced-motion: reduce) { .rw-rise { animation: none; } }
      `}</style>

      {/* ================= STICKY JUMP NAV ================= */}
      {!isWeddingCompleted && (
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[#EADFD3]">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 overflow-x-auto no-scrollbar">
            {navSections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="whitespace-nowrap px-4 py-3.5 text-sm font-medium text-[#6B5750] hover:text-[#5C1A28] transition-colors"
              >
                {s.label}
              </button>
            ))}
            <button
              onClick={() => navigate(`/booking/${wedding._id}`)}
              disabled={isFull}
              className="ml-auto shrink-0 my-2 px-5 py-2 bg-[#5C1A28] text-white rounded-full text-sm font-semibold hover:bg-[#3C0F1A] transition-colors disabled:opacity-50"
            >
              {isFull ? "Fully booked" : "Reserve a seat"}
            </button>
          </div>
        </div>
      )}

      {/* ================= HERO GALLERY ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[280px] md:h-[420px]">
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="md:col-span-2 md:row-span-2 relative group overflow-hidden"
          >
            <img
              src={galleryImages[0]}
              alt="Wedding"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {galleryImages.slice(1, 5).map((src, i) => {
            const isLast = i === 3;
            const remaining = Math.max(galleryImages.length - 5, 0);
            return (
              <button
                type="button"
                key={i}
                onClick={() => setLightboxIndex(i + 1)}
                className="hidden md:block relative group overflow-hidden"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {isLast ? (
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors flex items-center justify-center gap-1.5 text-white text-xs font-semibold">
                    <Camera className="w-3.5 h-3.5" />
                    {remaining > 0 ? `+${remaining} more photos` : "View gallery"}
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ================= LIGHTBOX ================= */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white"
            aria-label="Close gallery"
          >
            <X className="w-7 h-7" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
            }}
            className="absolute left-4 md:left-8 text-white/70 hover:text-white text-3xl px-2 select-none"
            aria-label="Previous photo"
          >
            ‹
          </button>

          <img
            src={galleryImages[lightboxIndex]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i + 1) % galleryImages.length);
            }}
            className="absolute right-4 md:right-8 text-white/70 hover:text-white text-3xl px-2 select-none"
            aria-label="Next photo"
          >
            ›
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs font-medium">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      {/* ================= CULTURAL PRIDE BAND ================= */}
      <section className="max-w-5xl mx-auto px-6 pt-10 pb-2 text-center">
        <Landmark className="w-6 h-6 text-[#C9922E] mx-auto mb-3" />
        <p className="rw-serif italic text-lg text-[#8A3B4C] mb-2">You are not just attending a wedding</p>
        <h2 className="rw-serif text-2xl md:text-3xl font-semibold text-[#2A1B1E] max-w-2xl mx-auto leading-snug">
          You are stepping into a living tradition older than most nations on earth.
        </h2>
        <p className="text-[#6B5750] text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
          Indian weddings are among the most vivid, multi-day celebrations of love in the world — a tapestry of
          ritual, colour, music and feasting passed down for generations. Every henna pattern, every processional
          drumbeat, every shared meal carries meaning. Guests aren't seated at the back — they're welcomed in,
          because in India, <span className="italic text-[#5C1A28] font-medium">Atithi Devo Bhava</span>: the guest
          is treated as a form of the divine.
        </p>
      </section>

      {/* ================= TITLE BLOCK ================= */}
      <section id="highlights" className="max-w-7xl mx-auto px-6 pt-6 pb-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: title + at-a-glance */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              {wedding.religion && (
                <span className="bg-[#C9922E] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  {wedding.religion}
                </span>
              )}
              {isVerifiedHost && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#3F7A5D] bg-[#E7F3EC] px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> Verified host
                </span>
              )}
            </div>

            <h1 className="rw-serif text-4xl md:text-5xl font-semibold text-[#2A1B1E] mb-2 leading-tight">
              {wedding.bride?.firstName} &amp; {wedding.groom?.firstName}
            </h1>
            <p className="text-[#6B5750] flex items-center gap-1.5 mb-6">
              <MapPin className="w-4 h-4 text-[#C9922E]" />
              {[wedding.city, wedding.region].filter(Boolean).join(", ")}
            </p>

            {/* At a glance strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {wedding.totalWeddingDays && (
                <div className="rounded-xl border border-[#EADFD3] bg-white p-3.5 text-center">
                  <p className="rw-serif text-xl font-semibold text-[#5C1A28]">{wedding.totalWeddingDays}</p>
                  <p className="text-[11px] text-[#6B5750] mt-0.5">Days of celebration</p>
                </div>
              )}
              {firstEvent?.dressCode && (
                <div className="rounded-xl border border-[#EADFD3] bg-white p-3.5 text-center">
                  <Shirt className="w-4 h-4 text-[#C9922E] mx-auto mb-1" />
                  <p className="text-[11px] text-[#6B5750]">{firstEvent.dressCode}</p>
                </div>
              )}
              {firstEvent?.foodType && (
                <div className="rounded-xl border border-[#EADFD3] bg-white p-3.5 text-center">
                  <Utensils className="w-4 h-4 text-[#C9922E] mx-auto mb-1" />
                  <p className="text-[11px] text-[#6B5750]">{firstEvent.foodType}</p>
                </div>
              )}
              {languages.length > 0 && (
                <div className="rounded-xl border border-[#EADFD3] bg-white p-3.5 text-center">
                  <Languages className="w-4 h-4 text-[#C9922E] mx-auto mb-1" />
                  <p className="text-[11px] text-[#6B5750]">{languages.join(", ")}</p>
                </div>
              )}
            </div>

            {/* Hosted by */}
            <div className="rw-rise flex items-center gap-4 bg-[#F3E1D8]/60 rounded-2xl p-5 mb-6">
              <div className="w-12 h-12 rounded-full bg-white overflow-hidden shrink-0 border-2 border-white shadow-sm">
                {wedding.bride?.photoURL ? (
                  <img src={wedding.bride.photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#5C1A28]">
                    <Users className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-[#2A1B1E] text-sm">
                  Hosted by {wedding.bride?.firstName || "the couple"} &amp; family
                </p>
                <p className="text-[#6B5750] text-sm">
                  {wedding.hostWelcomeMessage ||
                    "We're excited to welcome global guests to experience our traditions."}
                </p>
              </div>
            </div>

            {/* About the experience */}
            {wedding.storyDescription && (
              <div id="story" className="mb-6 scroll-mt-20">
                <h3 className="rw-serif text-lg font-semibold text-[#2A1B1E] mb-3">About the experience</h3>
                <p className="text-[#6B5750] text-sm leading-relaxed whitespace-pre-line">
                  {wedding.storyDescription}
                </p>
                <div className="mt-5 flex gap-3 items-start bg-[#F3E1D8]/40 rounded-xl p-4">
                  <Quote className="w-5 h-5 text-[#C9922E] shrink-0 mt-0.5" />
                  <p className="rw-serif italic text-[#5C1A28] text-base leading-snug">
                    Two families, two histories, one celebration — {wedding.bride?.firstName} &amp; {wedding.groom?.firstName} invite you to witness it firsthand.
                  </p>
                </div>
              </div>
            )}

            {/* Why guests love this */}
            <div className="rw-rise bg-white rounded-2xl border border-[#EADFD3] p-6 mb-2">
              <h3 className="rw-serif text-lg font-semibold text-[#2A1B1E] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C9922E]" /> Why guests are drawn to this celebration
              </h3>
              <ul className="space-y-2.5 text-sm text-[#6B5750]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#3F7A5D] mt-0.5 shrink-0" />
                  {wedding.totalWeddingDays > 1
                    ? `A rare front-row seat to ${wedding.totalWeddingDays} full days of ritual, music and feasting, not just one ceremony.`
                    : "A genuine, single-day ceremony hosted by a real family, not a staged experience."}
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#3F7A5D] mt-0.5 shrink-0" />
                  You're hosted as an honoured guest, with a dedicated ceremony guide to walk you through every ritual.
                </li>
                {speaksEnglish && (
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#3F7A5D] mt-0.5 shrink-0" />
                    English-speaking support on the day, so nothing gets lost in translation.
                  </li>
                )}
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#3F7A5D] mt-0.5 shrink-0" />
                  Set in {wedding.city || "a region"} known for some of India's most vivid wedding traditions.
                </li>
              </ul>
            </div>
          </div>

          {/* Right: sticky booking widget */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20 rw-rise bg-white rounded-2xl border border-[#EADFD3] shadow-sm p-6">
              {isWeddingCompleted ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-[#E7F3EC] flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-[#3F7A5D]" />
                  </div>
                  <h2 className="rw-serif text-xl font-semibold text-[#2A1B1E] mb-2">Wedding celebrated</h2>
                  <p className="text-[#6B5750] text-sm mb-4">
                    {wedding.bride?.firstName} &amp; {wedding.groom?.firstName} have already celebrated their wedding.
                  </p>
                  {wedding.weddingStartDate && (
                    <div className="bg-[#FBF6EF] rounded-xl p-4 text-sm text-[#6B5750] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#C9922E]" /> {formatDate(wedding.weddingStartDate)}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {wedding.pricePerPerson != null && (
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="rw-serif text-3xl font-semibold text-[#2A1B1E]">
                        ₹{Number(wedding.pricePerPerson).toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-[#6B5750]">/ guest</span>
                    </div>
                  )}

                  <div className="space-y-2.5 my-4 text-sm">
                    {wedding.weddingStartDate && (
                      <div className="flex items-center gap-2.5 text-[#6B5750]">
                        <Calendar className="w-4 h-4 text-[#C9922E] shrink-0" />
                        {formatDate(wedding.weddingStartDate)}
                        {wedding.weddingEndDate && wedding.weddingEndDate !== wedding.weddingStartDate
                          ? ` – ${formatDate(wedding.weddingEndDate)}`
                          : ""}
                      </div>
                    )}
                  </div>

                  {capacity != null && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className={isFillingFast ? "text-[#B9691F] font-semibold" : "text-[#6B5750]"}>
                          {isFull
                            ? "Fully booked"
                            : isFillingFast
                            ? `Filling fast — only ${spotsLeft} spots left`
                            : `${spotsLeft} spots left (out of ${capacity})`}
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#F1E6DC] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${isFillingFast || isFull ? "bg-[#B9691F]" : "bg-[#C9922E]"}`}
                          style={{ width: `${percentBooked}%` }}
                        />
                      </div>
                      {seatsBooked > 0 && (
                        <p className="text-[11px] text-[#A69488] mt-1.5">
                          {seatsBooked} seat{seatsBooked === 1 ? "" : "s"} already reserved by guests
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => navigate(`/booking/${wedding._id}`)}
                    disabled={isFull}
                    className="w-full bg-[#5C1A28] hover:bg-[#3C0F1A] disabled:bg-[#D9C4B8] disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors"
                  >
                    {isFull ? "Fully booked" : "Reserve your seat"}
                  </button>

                  <button
                    onClick={() => navigate(`/booking/${wedding._id}`)}
                    disabled={isFull}
                    className="w-full mt-2.5 border border-[#5C1A28] text-[#5C1A28] hover:bg-[#F3E1D8]/50 disabled:opacity-50 font-semibold py-3 rounded-xl transition-colors"
                  >
                    Get Your Invitation
                  </button>

                  {seatsBooked > 0 && (
                    <p className="text-xs text-[#6B5750] text-center mt-3">
                      🌍 {seatsBooked} traveler{seatsBooked === 1 ? "" : "s"} from around the world already said yes
                    </p>
                  )}

                  <p className="text-[11px] text-[#A69488] text-center mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Secure booking · Verified host
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= GET YOUR INVITATION CTA ================= */}
      {!isWeddingCompleted && (
        <section className="max-w-5xl mx-auto px-6 pb-4">
          <div className="relative overflow-hidden rounded-2xl p-8 md:p-10 text-center" style={{ background: "linear-gradient(120deg, #F3E1D8 0%, #FBF0DB 100%)" }}>
            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-4 border-2 border-[#C9922E]/30">
              <Mail className="w-6 h-6 text-[#5C1A28]" />
            </div>
            <h3 className="rw-serif text-2xl md:text-3xl font-semibold text-[#2A1B1E] mb-2">
              Your invitation is waiting
            </h3>
            <p className="text-[#6B5750] text-sm max-w-lg mx-auto mb-6">
              A once-in-a-lifetime seat at a real Indian wedding doesn't come around twice. Claim yours before it's
              gone.
            </p>
            <button
              onClick={() => navigate(`/booking/${wedding._id}`)}
              disabled={isFull}
              className="px-8 py-3.5 bg-[#5C1A28] hover:bg-[#3C0F1A] disabled:bg-[#D9C4B8] disabled:cursor-not-allowed text-white font-semibold rounded-full transition-colors"
            >
              {isFull ? "Fully booked" : "Get Your Invitation"}
            </button>
          </div>
        </section>
      )}

      {/* ================= EVENT TIMELINE ================= */}
      {wedding.events?.length > 0 && (
        <section id="itinerary" className="max-w-5xl mx-auto px-6 py-12 scroll-mt-20">
          <h2 className="rw-serif text-3xl font-semibold text-center text-[#2A1B1E] mb-2">Daily itinerary</h2>
          <p className="text-center text-[#6B5750] text-sm mb-12">
            {wedding.events.length} events across {wedding.totalWeddingDays || wedding.events.length} days
          </p>

          <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-[#EADFD3]">
            {wedding.events.map((event, index) => (
              <div key={event._id || index} className="relative">
                <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-[#5C1A28] text-white text-[11px] font-semibold flex items-center justify-center">
                  {event.day || index + 1}
                </div>
                <div className="bg-white rounded-2xl border border-[#EADFD3] overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="px-7 py-4 border-b border-[#F1E6DC] flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="rw-serif text-xl font-semibold text-[#2A1B1E]">{event.name}</h3>
                      {event.ritualName && <p className="text-[#C9922E] text-sm font-medium">{event.ritualName}</p>}
                    </div>
                    {event.date && (
                      <span className="text-[#6B5750] text-xs">
                        {new Date(event.date).toLocaleString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>

                  <div className="p-7">
                    {event.description && (
                      <div className="bg-[#FBF0DB]/60 rounded-xl p-4 mb-5 text-sm text-[#4A3A35] leading-relaxed">
                        {event.description}
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-5 text-sm">
                      <div className="space-y-3">
                        {event.venueName && (
                          <div className="flex items-start gap-2.5">
                            <MapPin className="w-4 h-4 text-[#C9922E] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[11px] text-[#A69488]">Venue</p>
                              <p className="font-medium text-[#2A1B1E]">{event.venueName}</p>
                            </div>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-start gap-2.5">
                            <MapPinned className="w-4 h-4 text-[#C9922E] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[11px] text-[#A69488]">Location</p>
                              <p className="text-[#4A3A35]">
                                {event.location.street && `${event.location.houseNumber || ""} ${event.location.street}, `}
                                {[event.location.city, event.location.region].filter(Boolean).join(", ")}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        {event.dressCode && (
                          <div className="flex items-start gap-2.5">
                            <Shirt className="w-4 h-4 text-[#C9922E] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[11px] text-[#A69488]">Dress code</p>
                              <p className="text-[#4A3A35]">{event.dressCode}</p>
                            </div>
                          </div>
                        )}
                        {event.foodType && (
                          <div className="flex items-start gap-2.5">
                            <Utensils className="w-4 h-4 text-[#C9922E] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[11px] text-[#A69488]">Food</p>
                              <p className="text-[#4A3A35]">{event.foodType}</p>
                            </div>
                          </div>
                        )}
                        {event.musicAvailable !== undefined && (
                          <div className="flex items-start gap-2.5">
                            <Music className="w-4 h-4 text-[#C9922E] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[11px] text-[#A69488]">Music</p>
                              <p className="text-[#4A3A35]">{event.musicAvailable ? "Yes, live music" : "Not planned"}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {(event.specialPerformance || event.extraNotes) && (
                      <div className="border-t border-[#F1E6DC] pt-4 mt-5 space-y-2 text-sm">
                        {event.specialPerformance && (
                          <p className="text-[#4A3A35]"><span className="text-[#A69488]">Special performance: </span>{event.specialPerformance}</p>
                        )}
                        {event.extraNotes && (
                          <p className="text-[#4A3A35]"><span className="text-[#A69488]">Note: </span>{event.extraNotes}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= WHAT'S INCLUDED ================= */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl border border-[#EADFD3] p-8">
          <h2 className="rw-serif text-2xl font-semibold text-[#2A1B1E] mb-5">What's included</h2>
          <ul className="space-y-3">
            {[
              wedding.totalWeddingDays
                ? `Full access to all ${wedding.totalWeddingDays} day${wedding.totalWeddingDays > 1 ? "s" : ""} of wedding events and rituals`
                : "Full access to the wedding events and rituals",
              wedding.events?.some((e) => e.foodType) && "Meals included on days with a listed food type",
              wedding.ceremonyGuide && "A designated ceremony guide to explain rituals as they happen",
              languages.length > 0 && `On-the-day support in ${languages.join(", ")}`,
              wedding.events?.some((e) => e.musicAvailable) && "Live music and performances at select events",
              "Entry as an honoured guest of the family, not a paying spectator",
            ]
              .filter(Boolean)
              .map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4A3A35]">
                  <CheckCircle className="w-4 h-4 text-[#3F7A5D] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* ================= HOSTS ================= */}
      {(wedding.bride || wedding.groom) && (
        <section id="hosts" className="max-w-6xl mx-auto px-6 py-12 scroll-mt-20">
          <h2 className="rw-serif text-3xl font-semibold text-center text-[#2A1B1E] mb-12">Meet your hosts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { person: wedding.bride, role: "The Bride" },
              { person: wedding.groom, role: "The Groom" },
            ].map(
              ({ person, role }) =>
                person && (
                  <div key={role} className="bg-white rounded-2xl border border-[#EADFD3] p-8">
                    <div className="flex flex-col items-center text-center">
                      {person.photoURL && (
                        <img
                          src={person.photoURL}
                          alt={person.firstName}
                          className="w-32 h-32 rounded-full mb-5 object-cover border-4 border-[#F3E1D8]"
                        />
                      )}
                      <h3 className="rw-serif text-xl font-semibold text-[#2A1B1E] mb-1">
                        {person.firstName} {person.lastName}
                      </h3>
                      <p className="text-[#C9922E] text-sm font-medium mb-4">{role}</p>
                      {person.bio && <p className="text-[#6B5750] text-sm leading-relaxed mb-4">{person.bio}</p>}
                      <div className="w-full space-y-2 text-left mt-2 border-t border-[#F1E6DC] pt-4">
                        {person.email && (
                          <div className="flex items-center gap-2 text-sm text-[#6B5750]">
                            <Mail className="w-3.5 h-3.5 text-[#C9922E]" /> {person.email}
                          </div>
                        )}
                        {person.phoneNumber && (
                          <div className="flex items-center gap-2 text-sm text-[#6B5750]">
                            <Phone className="w-3.5 h-3.5 text-[#C9922E]" /> {person.phoneNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </section>
      )}

      {/* ================= GOOD TO KNOW FOR INTERNATIONAL GUESTS ================= */}
      <section id="good-to-know" className="max-w-5xl mx-auto px-6 py-12 scroll-mt-20">
        <h2 className="rw-serif text-3xl font-semibold text-center text-[#2A1B1E] mb-2">Good to know before you book</h2>
        <p className="text-center text-[#6B5750] text-sm mb-10 max-w-xl mx-auto">
          Attending your first Indian wedding? Here's what most international guests want to know.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-[#EADFD3] p-6">
            <Shirt className="w-5 h-5 text-[#C9922E] mb-3" />
            <h3 className="font-semibold text-[#2A1B1E] mb-1.5">What to wear</h3>
            <p className="text-sm text-[#6B5750] leading-relaxed">
              Bright, festive colours are welcomed and encouraged. White and black are traditionally avoided, as
              they're associated with mourning at Hindu ceremonies.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#EADFD3] p-6">
            <Gift className="w-5 h-5 text-[#C9922E] mb-3" />
            <h3 className="font-semibold text-[#2A1B1E] mb-1.5">Gifting etiquette</h3>
            <p className="text-sm text-[#6B5750] leading-relaxed">
              A small gift or cash in a decorative envelope is customary. It's a gesture, not an obligation — your
              presence is the real gift.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#EADFD3] p-6">
            <Music className="w-5 h-5 text-[#C9922E] mb-3" />
            <h3 className="font-semibold text-[#2A1B1E] mb-1.5">Joining the celebration</h3>
            <p className="text-sm text-[#6B5750] leading-relaxed">
              Dancing, singing and taking part in light-hearted rituals is part of the fun — guests are actively
              encouraged to join in, not just watch.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#EADFD3] p-6">
            <Languages className="w-5 h-5 text-[#C9922E] mb-3" />
            <h3 className="font-semibold text-[#2A1B1E] mb-1.5">Language</h3>
            <p className="text-sm text-[#6B5750] leading-relaxed">
              {languages.length > 0
                ? `Your ceremony guide speaks ${languages.join(", ")}, so you'll always have someone to explain what's happening.`
                : "Most host families and guides speak conversational English, and rituals are explained as they happen."}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm">
          <MessageCircleQuestion className="w-4 h-4 text-[#C9922E]" />
          <Link to="/faq" className="text-[#5C1A28] font-medium hover:underline">
            Read our full guest etiquette guide
          </Link>
        </div>
      </section>

      {/* ================= TRUST & CARE ================= */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <HeartHandshake className="w-6 h-6 text-[#C9922E] mx-auto mb-3" />
          <h2 className="rw-serif text-3xl font-semibold text-[#2A1B1E] mb-2">Your safety, taken seriously</h2>
          <p className="text-[#6B5750] text-sm max-w-xl mx-auto">
            Travelling across the world to attend a stranger's wedding is a big step of trust. Here's how we and
            your hosts take that responsibility seriously.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-[#EADFD3] p-6">
            <ShieldCheck className="w-5 h-5 text-[#3F7A5D] mb-3" />
            <h3 className="font-semibold text-[#2A1B1E] mb-1.5">Verified hosts only</h3>
            <p className="text-sm text-[#6B5750] leading-relaxed">
              Every hosting family is verified before their celebration is listed — this is a real family's wedding,
              not an anonymous listing.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#EADFD3] p-6">
            <Lock className="w-5 h-5 text-[#C9922E] mb-3" />
            <h3 className="font-semibold text-[#2A1B1E] mb-1.5">Your data, protected</h3>
            <p className="text-sm text-[#6B5750] leading-relaxed">
              Your booking and personal details are handled in line with India's Digital Personal Data Protection
              Act, and are only ever shared with the host you're booking with.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#EADFD3] p-6">
            <LifeBuoy className="w-5 h-5 text-[#C9922E] mb-3" />
            <h3 className="font-semibold text-[#2A1B1E] mb-1.5">Support while you travel</h3>
            <p className="text-sm text-[#6B5750] leading-relaxed">
              Your ceremony guide and our team are reachable throughout your visit, and we share relevant embassy
              and emergency contacts for your home country before you arrive.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#EADFD3] p-6">
            <Globe2 className="w-5 h-5 text-[#C9922E] mb-3" />
            <h3 className="font-semibold text-[#2A1B1E] mb-1.5">Guidance built for travelers</h3>
            <p className="text-sm text-[#6B5750] leading-relaxed">
              Our visitor guidance follows published tourism safety practices, so first-time travelers to India
              always know what to expect.
            </p>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-[#A69488]">
          For full details, see our{" "}
          <Link to="/trust" className="text-[#5C1A28] font-medium hover:underline">
            Trust &amp; Safety Portal
          </Link>
          .
        </p>
      </section>

      {/* ================= CEREMONY GUIDE ================= */}
      {wedding.ceremonyGuide && (
        <section className="max-w-3xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl border border-[#EADFD3] p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#F3E1D8] rounded-full flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-[#5C1A28]" />
              </div>
              <div>
                <p className="text-[11px] text-[#A69488] uppercase tracking-wide">Your point of contact</p>
                <h3 className="rw-serif text-xl font-semibold text-[#2A1B1E]">
                  {wedding.ceremonyGuide.firstName} {wedding.ceremonyGuide.lastName}
                </h3>
                {wedding.ceremonyGuide.guideCoupleRelation && (
                  <p className="text-[#C9922E] text-sm font-medium">{wedding.ceremonyGuide.guideCoupleRelation}</p>
                )}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {wedding.ceremonyGuide.email && (
                <div className="flex items-center gap-2.5 p-3.5 bg-[#FBF6EF] rounded-lg text-sm">
                  <Mail className="w-4 h-4 text-[#C9922E]" /> {wedding.ceremonyGuide.email}
                </div>
              )}
              {wedding.ceremonyGuide.phoneNumber && (
                <div className="flex items-center gap-2.5 p-3.5 bg-[#FBF6EF] rounded-lg text-sm">
                  <Phone className="w-4 h-4 text-[#C9922E]" /> {wedding.ceremonyGuide.phoneNumber}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ================= GIFT INFORMATION ================= */}
      {wedding.bankDetails && (
        <section className="max-w-3xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl border border-[#EADFD3] p-8">
            <div className="text-center mb-6">
              <Gift className="w-8 h-8 text-[#C9922E] mx-auto mb-3" />
              <h3 className="rw-serif text-xl font-semibold text-[#2A1B1E] mb-1">Sending a gift</h3>
              <p className="text-[#6B5750] text-sm">Entirely optional — here are the details if you'd like to.</p>
            </div>
            <div className="space-y-2 max-w-sm mx-auto text-sm">
              {[
                ["Account holder", wedding.bankDetails.accountHolderName],
                ["Account number", wedding.bankDetails.accountNumber],
                ["IFSC code", wedding.bankDetails.ifcNumber],
                ["Mobile number", wedding.bankDetails.linkedBankModileNumber],
              ]
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <div key={label} className="flex justify-between p-3 bg-[#FBF6EF] rounded-lg">
                    <span className="text-[#6B5750]">{label}</span>
                    <span className="font-semibold text-[#2A1B1E]">{value}</span>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CTA SECTION ================= */}
      {!isWeddingCompleted && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #5C1A28 0%, #3C0F1A 100%)" }} />
          <svg className="absolute -right-10 -top-10 w-72 h-72 opacity-[0.08] pointer-events-none" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="95" stroke="#E8C777" strokeWidth="1.2" />
            <circle cx="100" cy="100" r="70" stroke="#E8C777" strokeWidth="1.2" />
          </svg>

          <div className="relative max-w-2xl mx-auto text-center">
            <p className="rw-serif italic text-[#E8C777] mb-3">Namaste, and welcome</p>
            <h2 className="text-white text-3xl md:text-4xl rw-serif font-semibold mb-4">
              Come celebrate with {wedding.bride?.firstName} &amp; {wedding.groom?.firstName}
            </h2>
            <p className="text-[#F3E1D8]/90 text-base mb-3 max-w-xl mx-auto">
              {isFillingFast
                ? `Only ${spotsLeft} seats remain — reserve yours before this celebration fills up.`
                : "Your presence would mean the world to them. Reserve your seat in a few minutes."}
            </p>

            <button
              onClick={() => navigate(`/booking/${wedding._id}`)}
              disabled={isFull}
              className="mt-4 px-9 py-3.5 bg-[#C9922E] hover:bg-[#B9821F] text-white font-semibold rounded-full text-base transition-colors disabled:opacity-60"
            >
              {isFull ? "Fully booked" : "Reserve your seat"}
            </button>
          </div>
        </section>
      )}

      {/* ================= MOBILE STICKY CTA ================= */}
      {!isWeddingCompleted && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#EADFD3] px-5 py-3 flex items-center justify-between gap-4">
          <div>
            {wedding.pricePerPerson != null && (
              <p className="rw-serif text-lg font-semibold text-[#2A1B1E]">
                ₹{Number(wedding.pricePerPerson).toLocaleString("en-IN")}
                <span className="text-xs text-[#6B5750] font-sans"> / guest</span>
              </p>
            )}
            {isFillingFast && <p className="text-[11px] text-[#B9691F] font-medium">Only {spotsLeft} seats left</p>}
          </div>
          <button
            onClick={() => navigate(`/booking/${wedding._id}`)}
            disabled={isFull}
            className="px-6 py-2.5 bg-[#5C1A28] disabled:bg-[#D9C4B8] text-white rounded-xl text-sm font-semibold"
          >
            {isFull ? "Fully booked" : "Reserve"}
          </button>
        </div>
      )}

      {/* ================= BOOKING MODAL ================= */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-7 relative rw-sans">
            <button
              onClick={() => setBookingOpen(false)}
              className="absolute top-4 right-4 text-[#A69488] hover:text-[#2A1B1E]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-[#3F7A5D] mx-auto mb-4" />
                <h3 className="rw-serif text-xl font-semibold text-[#2A1B1E] mb-2">Seat reserved</h3>
                <p className="text-[#6B5750] text-sm mb-6">
                  Your spot has been confirmed. The hosts will be in touch with full details.
                </p>
                <button
                  onClick={() => setBookingOpen(false)}
                  className="bg-[#5C1A28] hover:bg-[#3C0F1A] text-white font-semibold px-6 py-2.5 rounded-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <h3 className="rw-serif text-xl font-semibold text-[#2A1B1E]">Reserve your seat</h3>
                  <p className="text-sm text-[#6B5750]">
                    {wedding.bride?.firstName} &amp; {wedding.groom?.firstName}'s wedding
                  </p>
                </div>

                {bookingError && (
                  <div className="bg-[#FBE4E4] text-[#A23E4C] text-sm rounded-lg px-3 py-2">{bookingError}</div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#4A3A35] mb-1">Your name</label>
                  <input
                    name="guestName"
                    value={bookingForm.guestName}
                    onChange={handleBookingChange}
                    required
                    className="w-full border border-[#EADFD3] rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9922E]/40 focus:border-[#C9922E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A3A35] mb-1">Email</label>
                  <input
                    type="email"
                    name="guestEmail"
                    value={bookingForm.guestEmail}
                    onChange={handleBookingChange}
                    required
                    className="w-full border border-[#EADFD3] rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9922E]/40 focus:border-[#C9922E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#4A3A35] mb-1">Phone</label>
                    <input
                      name="guestPhone"
                      value={bookingForm.guestPhone}
                      onChange={handleBookingChange}
                      className="w-full border border-[#EADFD3] rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9922E]/40 focus:border-[#C9922E]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A3A35] mb-1">Seats</label>
                    <input
                      type="number"
                      min={1}
                      max={spotsLeft || undefined}
                      name="seats"
                      value={bookingForm.seats}
                      onChange={handleBookingChange}
                      className="w-full border border-[#EADFD3] rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9922E]/40 focus:border-[#C9922E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A3A35] mb-1">
                    Message to the couple <span className="text-[#A69488] font-normal">(optional)</span>
                  </label>
                  <textarea
                    name="message"
                    value={bookingForm.message}
                    onChange={handleBookingChange}
                    rows={3}
                    className="w-full border border-[#EADFD3] rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9922E]/40 focus:border-[#C9922E]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={bookingSubmitting}
                  className="w-full bg-[#5C1A28] hover:bg-[#3C0F1A] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  {bookingSubmitting ? "Reserving..." : "Confirm reservation"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- HELPERS ---------------- */
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}