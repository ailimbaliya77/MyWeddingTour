import React, { useEffect, useState } from "react";
import WeddingCard from "../components/WeddingCard";
const API_URL = import.meta.env.VITE_API_URL;

export default function Weddings() {
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const res = await fetch(`${API_URL}/wedding`);
        const data = await res.json();

        if (res.ok) {
          setWeddings(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch weddings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeddings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading weddings…</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-10">
          Explore Weddings
        </h1>

        {weddings.length === 0 ? (
          <p className="text-gray-500">No weddings found</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {weddings.map((wedding) => (
              <WeddingCard key={wedding._id} wedding={wedding} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
