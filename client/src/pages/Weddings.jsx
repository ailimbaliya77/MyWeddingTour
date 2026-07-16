import React, { useEffect, useState } from "react";
import WeddingCard from "../../components/WeddingCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function Weddings() {
  const [weddings, setWeddings] = useState([]);
  const [filteredWeddings, setFilteredWeddings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const res = await fetch(`${API_URL}/wedding`);
        const data = await res.json();
        if (res.ok) {
          setWeddings(data.data || []);
          setFilteredWeddings(data.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeddings();
  }, []);

  useEffect(() => {
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

    if (region) {
      filtered = filtered.filter((w) => w.region === region);
    }

    if (type) {
      filtered = filtered.filter((w) => w.religion === type);
    }

    if (price === "low") {
      filtered.sort((a, b) => (a.pricePerPerson ?? 0) - (b.pricePerPerson ?? 0));
    } else if (price === "high") {
      filtered.sort((a, b) => (b.pricePerPerson ?? 0) - (a.pricePerPerson ?? 0));
    }

    setFilteredWeddings(filtered);
  }, [search, region, type, price, weddings]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#f8f6f3]">
        <p className="text-gray-500 text-sm">Loading weddings...</p>
      </div>
    );
  }

  return (
    <section className="bg-[#f8f6f3] min-h-screen py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-1">
            Browse Weddings
          </h1>
          <p className="text-gray-500 text-sm">
            Discover upcoming Indian wedding experiences across the country.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, city or state..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            className="border border-gray-200 bg-white text-sm text-gray-700 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Kerala">Kerala</option>
            <option value="Goa">Goa</option>
            <option value="Punjab">Punjab</option>
            <option value="West Bengal">West Bengal</option>
          </select>

          <select
            className="border border-gray-200 bg-white text-sm text-gray-700 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Traditions</option>
            <option value="Hindu">Hindu</option>
            <option value="Sikh">Sikh</option>
            <option value="Christian">Christian</option>
            <option value="Muslim">Muslim</option>
            <option value="Modern">Modern</option>
            <option value="Other">Other</option>
          </select>

          <select
            className="border border-gray-200 bg-white text-sm text-gray-700 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="">Any Price</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {filteredWeddings.length} weddings found
        </p>

        {/* Grid */}
        {filteredWeddings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">No weddings found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWeddings.map((wedding) => (
              <WeddingCard key={wedding._id} wedding={wedding} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}