import React, { useEffect, useMemo, useState } from "react";
import WeddingCard from "../../components/WeddingCard";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const regions = ["Rajasthan", "Tamil Nadu", "Kerala", "Goa", "Punjab", "West Bengal"];
const traditions = ["Hindu", "Sikh", "Christian", "Muslim", "Modern", "Other"];

export default function Weddings() {
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const res = await fetch(`${API_URL}/wedding`);
        const data = await res.json();
        if (res.ok) setWeddings(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeddings();
  }, []);

  const filteredWeddings = useMemo(() => {
    let filtered = [...weddings];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((w) => {
        const title = w.title || `${w.bride?.firstName ?? ""} ${w.groom?.firstName ?? ""}`;
        return (
          title.toLowerCase().includes(q) ||
          w.city?.toLowerCase().includes(q) ||
          w.region?.toLowerCase().includes(q)
        );
      });
    }

    if (region) filtered = filtered.filter((w) => w.region === region);
    if (type) filtered = filtered.filter((w) => w.religion === type);

    if (sort === "price-low") filtered.sort((a, b) => (a.pricePerPerson ?? 0) - (b.pricePerPerson ?? 0));
    else if (sort === "price-high") filtered.sort((a, b) => (b.pricePerPerson ?? 0) - (a.pricePerPerson ?? 0));
    else if (sort === "soonest")
      filtered.sort((a, b) => new Date(a.weddingStartDate || 0) - new Date(b.weddingStartDate || 0));
    else if (sort === "rating") filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

    return filtered;
  }, [search, region, type, sort, weddings]);

  const regionCount = useMemo(() => new Set(weddings.map((w) => w.region).filter(Boolean)).size, [weddings]);

  return (
    <section className="min-h-screen bg-[#FBF6EF] pt-24 pb-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .rw-serif { font-family: 'Fraunces', serif; }
        .rw-sans { font-family: 'Inter', sans-serif; }
        @keyframes rwRise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .rw-rise { animation: rwRise 0.6s cubic-bezier(.22,.9,.32,1) both; }
        @media (prefers-reduced-motion: reduce) { .rw-rise { animation: none; } }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 rw-sans">
        {/* Hero banner */}
        <div
          className="relative overflow-hidden rounded-2xl mb-8 px-8 py-9"
          style={{ background: "linear-gradient(120deg, #5C1A28 0%, #3C0F1A 100%)" }}
        >
          <svg className="absolute -right-10 -top-14 w-64 h-64 opacity-[0.08] pointer-events-none" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="95" stroke="#E8C777" strokeWidth="1.2" />
            <circle cx="100" cy="100" r="70" stroke="#E8C777" strokeWidth="1.2" />
            <path d="M100 5 C130 60, 140 100, 100 195 C60 100, 70 60, 100 5Z" stroke="#E8C777" strokeWidth="1.2" />
          </svg>
          <div className="relative flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="rw-serif italic text-sm text-[#E8C777] mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Curated across India
              </p>
              <h1 className="rw-serif text-3xl sm:text-4xl font-semibold text-white mb-2">
                Step into a real Indian wedding
              </h1>
              <p className="text-[#F3E1D8]/85 text-sm max-w-lg">
                Browse hosted celebrations across the country and join a family's biggest day as their guest.
              </p>
            </div>
            <div className="flex gap-6 text-white">
              <div>
                <p className="rw-serif text-2xl font-semibold">{loading ? "…" : weddings.length}</p>
                <p className="text-xs text-[#F3E1D8]/70">weddings listed</p>
              </div>
              <div>
                <p className="rw-serif text-2xl font-semibold">{loading ? "…" : regionCount}</p>
                <p className="text-xs text-[#F3E1D8]/70">regions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A69488]" />
          <input
            type="text"
            placeholder="Search by couple, city or state..."
            className="w-full pl-11 pr-4 py-3 border border-[#EADFD3] rounded-xl bg-white text-sm text-[#2A1B1E] placeholder-[#A69488] focus:outline-none focus:ring-2 focus:ring-[#C9922E]/40 focus:border-[#C9922E]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters + sort */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <select
            className="border border-[#EADFD3] bg-white text-sm text-[#2A1B1E] px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9922E]/40 cursor-pointer"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <select
            className="border border-[#EADFD3] bg-white text-sm text-[#2A1B1E] px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9922E]/40 cursor-pointer"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All traditions</option>
            {traditions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <div className="flex items-center gap-2 ml-auto">
            <SlidersHorizontal className="w-4 h-4 text-[#A69488]" />
            <select
              className="border border-[#EADFD3] bg-white text-sm text-[#2A1B1E] px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9922E]/40 cursor-pointer"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort: Recommended</option>
              <option value="soonest">Soonest first</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rating">Highest rated</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-[#6B5750] mb-6">
          {loading ? "Loading weddings…" : `${filteredWeddings.length} weddings found`}
        </p>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#EADFD3] overflow-hidden animate-pulse">
                <div className="h-52 bg-[#F1E6DC]" />
                <div className="p-5 space-y-2">
                  <div className="h-4 bg-[#F1E6DC] rounded w-2/3" />
                  <div className="h-3 bg-[#F1E6DC] rounded w-1/2" />
                  <div className="h-3 bg-[#F1E6DC] rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredWeddings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#EADFD3]">
            <p className="text-[#6B5750] text-sm mb-4">No weddings found matching your criteria.</p>
            <button
              onClick={() => { setSearch(""); setRegion(""); setType(""); setSort(""); }}
              className="px-5 py-2 bg-[#5C1A28] text-white rounded-lg text-sm font-medium hover:bg-[#3C0F1A] transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWeddings.map((wedding, i) => (
              <WeddingCard key={wedding._id} wedding={wedding} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}