import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  List,
  CalendarCheck2,
  Wallet,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  MapPin,
  Calendar,
  Users,
  Pencil,
  Eye,
  Plus,
  Sparkles,
  UserCircle2,
  CircleCheck,
  Star,
  ArrowUpRight,
  Radio,
  Globe2,
  Mail,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;
const REFRESH_INTERVAL_MS = 30000;

const statusStyles = {
  approved: { label: "Live", cls: "bg-[#E7F3EC] text-[#3F7A5D]" },
  pending: { label: "Under Review", cls: "bg-[#FCEEDD] text-[#B9691F]" },
  draft: { label: "Draft", cls: "bg-[#F1EAE6] text-[#8A7A73]" },
  rejected: { label: "Rejected", cls: "bg-[#FBE4E4] text-[#A23E4C]" },
};

const guestStatusStyles = {
  confirmed: { label: "Confirmed", cls: "bg-[#E7F3EC] text-[#3F7A5D]" },
  pending: { label: "Pending", cls: "bg-[#FCEEDD] text-[#B9691F]" },
};

const navItems = [
  { key: "dashboard", icon: LayoutGrid, label: "Dashboard" },
  { key: "listings", icon: List, label: "My Listings" },
  { key: "bookings", icon: CalendarCheck2, label: "Bookings" },
  { key: "earnings", icon: Wallet, label: "Earnings" },
  { key: "messages", icon: MessageSquare, label: "Messages" },
];

// A few lines that rotate on load — meant to make the dashboard feel
// like a partner cheering the host on, not just a data table.
const motivatingHeadlines = [
  "Every seat you fill is a story someone will carry home.",
  "Your traditions are exactly what travelers are searching for.",
  "Small details, unforgettable journeys — that's what you're building.",
  "Guests don't remember perfect events. They remember being welcomed.",
  "Somewhere right now, a guest is packing their bags for your wedding.",
];

// Fallback so the dashboard always looks complete, even before
// the API is wired up or when a host has no listings yet.
const demoListings = [
  {
    _id: "demo-1",
    bride: { firstName: "Ananya" },
    groom: { firstName: "Rohan" },
    city: "Udaipur",
    region: "Rajasthan",
    weddingStartDate: "2026-04-15",
    weddingEndDate: "2026-04-18",
    bookedCount: 14,
    guestCapacity: 20,
    status: "approved",
    rating: 4.9,
    listingPhotoURL:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80",
  },
  {
    _id: "demo-2",
    bride: { firstName: "Meera" },
    groom: { firstName: "Arjun" },
    city: "Alleppey",
    region: "Kerala",
    weddingStartDate: "2026-05-10",
    weddingEndDate: "2026-05-12",
    bookedCount: 8,
    guestCapacity: 15,
    status: "approved",
    rating: 4.7,
    listingPhotoURL:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=700&q=80",
  },
  {
    _id: "demo-3",
    bride: { firstName: "Simran" },
    groom: { firstName: "Karan" },
    city: "Ludhiana",
    region: "Punjab",
    weddingStartDate: "2025-11-20",
    weddingEndDate: "2025-11-23",
    bookedCount: 0,
    guestCapacity: 30,
    status: "pending",
    rating: null,
    listingPhotoURL:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=700&q=80",
  },
];

// Shown only if a guest-bookings endpoint isn't available yet —
// gives hosts a preview of what per-guest tracking will look like.
const demoGuests = [
  { id: "g1", name: "Sarah Mitchell", country: "USA", wedding: "Royal Udaipur Wedding", seats: 2, status: "confirmed", daysAgo: 0 },
  { id: "g2", name: "Lukas Weber", country: "Germany", wedding: "Kerala Backwater Wedding", seats: 1, status: "confirmed", daysAgo: 1 },
  { id: "g3", name: "Yuki Tanaka", country: "Japan", wedding: "Royal Udaipur Wedding", seats: 3, status: "pending", daysAgo: 1 },
  { id: "g4", name: "Emma Clarke", country: "UK", wedding: "Punjabi Farmhouse Wedding", seats: 2, status: "confirmed", daysAgo: 3 },
  { id: "g5", name: "Marco Rossi", country: "Italy", wedding: "Kerala Backwater Wedding", seats: 1, status: "confirmed", daysAgo: 5 },
];

const formatDate = (d) => {
  if (!d) return "—";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const daysUntil = (d) => {
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return null;
  const diff = Math.ceil((date.setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000);
  return diff;
};

const relativeTime = (daysAgo) => {
  if (daysAgo === 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  return `${daysAgo} days ago`;
};

// Animated count-up for stat figures. Respects prefers-reduced-motion.
const useCountUp = (target, duration = 1100) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !target) {
      setValue(target || 0);
      return;
    }
    let start = null;
    let frame;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
};

const formatINR = (amount) => `₹${Number(amount || 0).toLocaleString("en-IN")}`;

const HostDashboard = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingDemoData, setUsingDemoData] = useState(false);
  const [user, setUser] = useState(null);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [totalEarnings, setTotalEarnings] = useState(0);

  const [guests, setGuests] = useState([]);
  const [usingDemoGuests, setUsingDemoGuests] = useState(false);

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [secondsAgo, setSecondsAgo] = useState(0);

  const headline = useState(() => motivatingHeadlines[Math.floor(Math.random() * motivatingHeadlines.length)])[0];

  const token = () => localStorage.getItem("token") || localStorage.getItem("accessToken");

  const loadListings = async () => {
    try {
      if (!API_URL) throw new Error("No API URL configured");
      const res = await fetch(`${API_URL}/wedding/mine`, {
        headers: token() ? { Authorization: `Bearer ${token()}` } : {},
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Request failed");

      let fetchedListings = [];
      let earnings = 0;
      if (Array.isArray(data.data)) {
        fetchedListings = data.data;
      } else if (data.data) {
        fetchedListings = data.data.listings || [];
        earnings = data.data.totalEarnings || 0;
      }

      if (fetchedListings.length === 0) {
        setListings(demoListings);
        setUsingDemoData(true);
        setTotalEarnings(450000);
      } else {
        setListings(fetchedListings);
        setTotalEarnings(earnings);
        setUsingDemoData(false);
      }
    } catch (err) {
      console.error("Error fetching weddings, showing demo data:", err.message);
      setListings(demoListings);
      setUsingDemoData(true);
      setTotalEarnings(450000);
    } finally {
      setLoading(false);
    }
  };

  // Separate, lighter-weight fetch for per-guest activity so the dashboard
  // can refresh "who just booked" without re-fetching entire listings.
  const loadGuests = async () => {
    try {
      if (!API_URL) throw new Error("No API URL configured");
      const res = await fetch(`${API_URL}/booking/host`, {
        headers: token() ? { Authorization: `Bearer ${token()}` } : {},
      });
      const data = await res.json();
      if (!res.ok || !Array.isArray(data.data)) throw new Error("No guest data available yet");
      setGuests(data.data);
      setUsingDemoGuests(false);
    } catch {
      setGuests(demoGuests);
      setUsingDemoGuests(true);
    } finally {
      setLastUpdated(new Date());
    }
  };

  useEffect(() => {
    const userRaw = localStorage.getItem("user");
    if (userRaw) {
      try {
        setUser(JSON.parse(userRaw));
      } catch {
        /* ignore malformed cache */
      }
    }

    loadListings();
    loadGuests();

    // Poll periodically so the host sees new bookings without refreshing the page.
    const refresh = setInterval(() => {
      loadListings();
      loadGuests();
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(refresh);
  }, []);

  // Ticks the "updated Xs ago" label every second, independent of the data refresh.
  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - lastUpdated.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(tick);
  }, [lastUpdated]);

  const totalListings = listings.length;
  const upcomingGuests = listings.reduce((sum, w) => sum + (w.bookedCount || 0), 0);
  const animatedEarnings = useCountUp(loading ? 0 : totalEarnings);
  const animatedListings = useCountUp(loading ? 0 : totalListings);
  const animatedGuests = useCountUp(loading ? 0 : upcomingGuests);

  const hostTier = useMemo(() => {
    if (totalEarnings >= 400000) return { label: "Gold Host", cls: "bg-[#3C0F1A] text-[#F0C777]" };
    if (totalEarnings >= 150000) return { label: "Silver Host", cls: "bg-[#3C0F1A] text-[#D9D9D9]" };
    return { label: "New Host", cls: "bg-[#3C0F1A] text-[#E8C6A0]" };
  }, [totalEarnings]);

  const checklist = useMemo(() => {
    const hasPhoto = listings.some((w) => !!w.listingPhotoURL);
    const hasLiveListing = listings.some((w) => w.status === "approved");
    const hasMultipleListings = listings.length > 1;
    return [
      { id: "photo", label: "Add real photos to every listing", done: hasPhoto },
      { id: "live", label: "Get your first listing approved", done: hasLiveListing },
      { id: "profile", label: "Complete your host profile", done: !!user?.firstName },
      { id: "more", label: "List a second wedding to widen reach", done: hasMultipleListings },
    ];
  }, [listings, user]);
  const checklistDone = checklist.filter((c) => c.done).length;

  const nextCelebration = useMemo(() => {
    return listings
      .map((w) => ({ ...w, days: daysUntil(w.weddingStartDate) }))
      .filter((w) => w.days !== null && w.days >= 0)
      .sort((a, b) => a.days - b.days)[0];
  }, [listings]);

  // Weekly momentum: bucket guest bookings from the last 7 days for a mini bar chart.
  const weeklyBuckets = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => 6 - i); // oldest to newest
    return days.map((daysAgo) => {
      const count = guests.filter((g) => g.daysAgo === daysAgo).length;
      const label = daysAgo === 0 ? "Today" : new Date(Date.now() - daysAgo * 86400000).toLocaleDateString("en-IN", { weekday: "short" });
      return { label, count };
    });
  }, [guests]);
  const weeklyTotal = weeklyBuckets.reduce((s, b) => s + b.count, 0);
  const maxBucket = Math.max(1, ...weeklyBuckets.map((b) => b.count));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-[#FBF6EF] text-[#2A1B1E]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .rw-serif { font-family: 'Fraunces', serif; }
        .rw-sans { font-family: 'Inter', sans-serif; }
        @keyframes rwRise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .rw-rise { animation: rwRise 0.6s cubic-bezier(.22,.9,.32,1) both; }
        @keyframes rwPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .rw-pulse { animation: rwPulse 1.8s ease-in-out infinite; }
        @keyframes rwGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .rw-grow { animation: rwGrow 0.6s cubic-bezier(.22,.9,.32,1) both; transform-origin: bottom; }
        @media (prefers-reduced-motion: reduce) {
          .rw-rise, .rw-pulse, .rw-grow { animation: none; }
        }
      `}</style>

      {/* Sidebar */}
      <aside className="w-64 shrink-0 rw-sans flex flex-col text-[#F3E1D8]" style={{ background: "linear-gradient(190deg, #5C1A28 0%, #3C0F1A 100%)" }}>
        <div className="px-6 py-7 flex items-center gap-2 border-b border-white/10">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#C9922E]/20">
            <Sparkles className="w-4 h-4 text-[#E8C777]" />
          </div>
          <span className="rw-serif text-xl font-semibold text-[#F6E9D8]">Reewaayat</span>
        </div>

        <nav className="flex-1 px-3 pt-5 space-y-1">
          {navItems.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveNav(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                activeNav === key ? "bg-[#C9922E]/20 text-[#F0C777]" : "text-[#E9D3C8]/80 hover:bg-white/5 hover:text-[#F3E1D8]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="mx-4 mb-5 rounded-xl bg-white/5 px-4 py-3.5">
          <p className="text-[11px] uppercase tracking-wide text-[#E9D3C8]/60 mb-1">Host status</p>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${hostTier.cls}`}>{hostTier.label}</span>
        </div>

        <div className="px-3 pb-6 space-y-1 border-t border-white/10 pt-3">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#E9D3C8]/70 hover:bg-white/5 hover:text-[#F3E1D8] text-left">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#E9D3C8]/70 hover:bg-white/5 hover:text-[#F3E1D8] text-left">
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 rw-sans">
        {/* Top bar */}
        <div className="bg-white/80 backdrop-blur border-b border-[#EADFD3] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="rw-serif text-lg font-semibold text-[#2A1B1E]">Overview</h1>
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#A69488]">
              <Radio className="w-3 h-3 text-[#3F7A5D] rw-pulse" />
              Live · updated {secondsAgo < 5 ? "just now" : `${secondsAgo}s ago`}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <button aria-label="Notifications" className="relative text-[#8A7A73] hover:text-[#5C1A28] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#C9922E] rw-pulse" />
            </button>
            <div className="flex items-center gap-2">
              <UserCircle2 className="w-8 h-8 text-[#D9C4B8]" />
              <span className="text-sm font-medium text-[#2A1B1E]">
                {user?.firstName || "Host"} {user?.lastName?.charAt(0) || ""}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          {usingDemoData && (
            <div className="mb-6 rounded-lg border border-[#E9CFA0] bg-[#FBF0DB] px-4 py-3 text-xs text-[#8A6A2F]">
              Showing sample data — connect your API to see live listings and earnings here.
            </div>
          )}

          {/* Welcome banner with motivating headline */}
          <div className="relative overflow-hidden rounded-2xl mb-8 px-7 py-7 flex items-start justify-between flex-wrap gap-4" style={{ background: "linear-gradient(120deg, #F3E1D8 0%, #FBF6EF 65%)" }}>
            <svg className="absolute -right-6 -top-10 w-56 h-56 opacity-[0.12] pointer-events-none" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="95" stroke="#5C1A28" strokeWidth="1.2" />
              <circle cx="100" cy="100" r="70" stroke="#5C1A28" strokeWidth="1.2" />
              <path d="M100 5 C130 60, 140 100, 100 195 C60 100, 70 60, 100 5Z" stroke="#5C1A28" strokeWidth="1.2" />
            </svg>
            <div className="relative">
              <p className="rw-serif italic text-sm text-[#8A3B4C] mb-1.5">Namaste, {user?.firstName || "Host"}</p>
              <h2 className="rw-serif text-3xl font-semibold text-[#2A1B1E] mb-1.5 max-w-xl">{headline}</h2>
              <p className="text-[#6B5750] text-sm max-w-md">Here's how your hosted weddings are performing, and who's about to join you.</p>
            </div>
            <button
              onClick={() => navigate("/host/profile")}
              className="relative flex items-center gap-2 px-4 py-2.5 bg-white border border-[#EADFD3] rounded-lg text-sm font-medium text-[#2A1B1E] hover:border-[#C9922E] transition-colors"
            >
              <UserCircle2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Stats: hero card + supporting cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <div className="rw-rise lg:col-span-2 rounded-2xl p-6 relative overflow-hidden text-[#F6E9D8]" style={{ background: "linear-gradient(135deg, #5C1A28 0%, #3C0F1A 100%)", animationDelay: "0ms" }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-[#E9D3C8]/80">Total Earnings</p>
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-[#E8C777]" />
                </div>
              </div>
              <p className="rw-serif text-4xl font-semibold text-white mb-2">{loading ? "…" : formatINR(animatedEarnings)}</p>
              <p className="text-xs text-[#E8C777] flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> 12% more than last month
              </p>
            </div>

            <div className="rw-rise bg-white rounded-2xl border border-[#EADFD3] p-6" style={{ animationDelay: "90ms" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[#6B5750]">Total Listings</p>
                <MapPin className="w-4 h-4 text-[#C9922E]" />
              </div>
              <p className="rw-serif text-3xl font-semibold text-[#2A1B1E]">{loading ? "…" : animatedListings}</p>
            </div>

            <div className="rw-rise bg-white rounded-2xl border border-[#EADFD3] p-6" style={{ animationDelay: "160ms" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[#6B5750]">Upcoming Guests</p>
                <Users className="w-4 h-4 text-[#C9922E]" />
              </div>
              <p className="rw-serif text-3xl font-semibold text-[#2A1B1E]">{loading ? "…" : animatedGuests}</p>
            </div>
          </div>

          {/* Weekly momentum chart */}
          <div className="rw-rise bg-white rounded-2xl border border-[#EADFD3] p-6 mb-10" style={{ animationDelay: "220ms" }}>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
              <div>
                <h3 className="rw-serif text-lg font-semibold text-[#2A1B1E]">This week's momentum</h3>
                <p className="text-xs text-[#6B5750]">
                  {weeklyTotal > 0 ? `${weeklyTotal} new guest${weeklyTotal === 1 ? "" : "s"} booked in the last 7 days` : "No new bookings yet this week — your next guest could be today."}
                </p>
              </div>
              {usingDemoGuests && <span className="text-[11px] text-[#A69488] bg-[#F1E6DC] px-2 py-1 rounded-full">Sample data</span>}
            </div>
            <div className="flex items-end justify-between gap-2 h-28">
              {weeklyBuckets.map((b, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center h-20">
                    <div
                      className="rw-grow w-full max-w-[28px] rounded-t-md bg-gradient-to-t from-[#5C1A28] to-[#C9922E]"
                      style={{ height: `${Math.max(8, (b.count / maxBucket) * 100)}%`, animationDelay: `${260 + i * 60}ms` }}
                      title={`${b.count} bookings`}
                    />
                  </div>
                  <span className="text-[10px] text-[#A69488]">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Body: listings + right rail */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Listings */}
            <div className="xl:col-span-2">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h3 className="rw-serif text-xl font-semibold text-[#2A1B1E]">My Listings</h3>
                <button onClick={() => navigate("/host/list-wedding")} className="flex items-center gap-1.5 px-4 py-2 bg-[#5C1A28] text-white rounded-lg text-sm font-medium hover:bg-[#3C0F1A] transition-colors">
                  <Plus className="w-4 h-4" /> Add New Listing
                </button>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-[#EADFD3] overflow-hidden animate-pulse">
                      <div className="h-40 bg-[#F1E6DC]" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-[#F1E6DC] rounded w-3/4" />
                        <div className="h-3 bg-[#F1E6DC] rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : listings.length === 0 ? (
                <div className="bg-white border border-[#EADFD3] rounded-2xl p-12 text-center">
                  <p className="text-[#6B5750] mb-4">You haven't listed a wedding yet — your first listing is one click away.</p>
                  <button onClick={() => navigate("/host/list-wedding")} className="px-5 py-2 bg-[#5C1A28] text-white rounded-lg text-sm font-medium hover:bg-[#3C0F1A] transition-colors">
                    Create your first listing
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {listings.map((w, i) => {
                    const status = statusStyles[w.status] || statusStyles.draft;
                    return (
                      <div
                        key={w._id}
                        className="rw-rise group bg-white rounded-2xl border border-[#EADFD3] overflow-hidden hover:shadow-lg hover:shadow-[#5C1A28]/5 hover:-translate-y-0.5 transition-all"
                        style={{ animationDelay: `${300 + i * 80}ms` }}
                      >
                        <div className="relative h-44 bg-[#F1E6DC]">
                          {w.listingPhotoURL ? (
                            <img src={w.listingPhotoURL} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#C4B3A8] text-xs">No photo yet</div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />
                          <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold ${status.cls}`}>{status.label}</span>
                          <h4 className="absolute bottom-3 left-4 right-4 rw-serif text-white font-medium text-base leading-snug">
                            {w.bride?.firstName} &amp; {w.groom?.firstName} Wedding
                          </h4>
                        </div>
                        <div className="p-4">
                          <p className="text-xs text-[#6B5750] flex items-center gap-1 mb-1">
                            <MapPin className="w-3 h-3" /> {w.city}, {w.region}
                          </p>
                          <p className="text-xs text-[#6B5750] flex items-center gap-1 mb-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(w.weddingStartDate)} - {formatDate(w.weddingEndDate)}
                          </p>
                          <p className="text-xs text-[#6B5750] flex items-center gap-1 mb-4">
                            <Users className="w-3 h-3" />
                            {w.bookedCount || 0} / {w.guestCapacity || "—"} spots booked
                            {w.rating ? (
                              <span className="ml-auto flex items-center gap-1 text-[#C9922E] font-medium">
                                <Star className="w-3 h-3 fill-[#C9922E]" /> {w.rating}
                              </span>
                            ) : null}
                          </p>
                          <div className="flex gap-2 pt-3 border-t border-[#F1E6DC]">
                            <button onClick={() => navigate(`/host/list-wedding/${w._id}`)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#FBF0DB] text-[#8A6A2F] rounded-lg text-xs font-medium hover:bg-[#F6E4BE] transition-colors">
                              <Pencil className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                              onClick={() => navigate(w.status === "approved" ? `/host/bookings/${w._id}` : `/wedding/${w._id}`)}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#F5F0EA] text-[#5C1A28] rounded-lg text-xs font-medium hover:bg-[#EFE6DA] transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              {w.status === "approved" ? "Bookings" : "Preview"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right rail: checklist, countdown, live guest feed */}
            <div className="space-y-6">
              {/* Checklist */}
              <div className="rw-rise bg-white rounded-2xl border border-[#EADFD3] p-5" style={{ animationDelay: "340ms" }}>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="rw-serif text-base font-semibold text-[#2A1B1E]">Get more bookings</h4>
                  <span className="text-xs text-[#6B5750]">{checklistDone}/{checklist.length}</span>
                </div>
                <div className="h-1.5 bg-[#F1E6DC] rounded-full overflow-hidden mb-4 mt-2">
                  <div className="h-full bg-[#C9922E] rounded-full transition-all duration-700" style={{ width: `${(checklistDone / checklist.length) * 100}%` }} />
                </div>
                <ul className="space-y-2.5">
                  {checklist.map((item) => (
                    <li key={item.id} className="flex items-start gap-2.5 text-sm">
                      <CircleCheck className={`w-4 h-4 mt-0.5 shrink-0 ${item.done ? "text-[#3F7A5D]" : "text-[#D9C4B8]"}`} />
                      <span className={item.done ? "text-[#6B5750] line-through decoration-[#D9C4B8]" : "text-[#2A1B1E]"}>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next celebration countdown */}
              {nextCelebration && (
                <div className="rw-rise rounded-2xl p-5 text-white" style={{ animationDelay: "400ms", background: "linear-gradient(135deg, #8A3B4C 0%, #5C1A28 100%)" }}>
                  <p className="text-xs text-[#F0C6C6] mb-1">Next celebration</p>
                  <p className="rw-serif text-lg font-semibold mb-1">
                    {nextCelebration.bride?.firstName} &amp; {nextCelebration.groom?.firstName}
                  </p>
                  <p className="text-sm text-[#F3E1D8]/90 mb-3">{nextCelebration.city}, {nextCelebration.region}</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="rw-serif text-3xl font-semibold">{nextCelebration.days}</span>
                    <span className="text-sm text-[#F3E1D8]/80">days to go</span>
                  </div>
                </div>
              )}

              {/* Live guest feed */}
              <div className="rw-rise bg-white rounded-2xl border border-[#EADFD3] p-5" style={{ animationDelay: "460ms" }}>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="rw-serif text-base font-semibold text-[#2A1B1E]">Recent guests</h4>
                  <span className="flex items-center gap-1 text-[10px] text-[#3F7A5D]">
                    <Radio className="w-2.5 h-2.5 rw-pulse" /> Live
                  </span>
                </div>
                <p className="text-xs text-[#A69488] mb-4">Updates automatically as guests reserve seats.</p>
                <ul className="space-y-4">
                  {guests.slice(0, 5).map((g) => {
                    const gs = guestStatusStyles[g.status] || guestStatusStyles.pending;
                    return (
                      <li key={g.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F3E1D8] flex items-center justify-center text-[#5C1A28] text-xs font-semibold shrink-0">
                          {g.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-medium text-[#2A1B1E] truncate">{g.name}</p>
                            <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium ${gs.cls}`}>{gs.label}</span>
                          </div>
                          <p className="text-xs text-[#6B5750] truncate">{g.wedding}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#A69488]">
                            <span className="flex items-center gap-1">
                              <Globe2 className="w-3 h-3" /> {g.country}
                            </span>
                            <span>·</span>
                            <span>{g.seats} seat{g.seats > 1 ? "s" : ""}</span>
                            <span>·</span>
                            <span>{relativeTime(g.daysAgo)}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <button
                  onClick={() => navigate("/host/bookings")}
                  className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 bg-[#FBF6EF] text-[#5C1A28] rounded-lg text-xs font-medium hover:bg-[#F3E1D8] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> View all bookings
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostDashboard;