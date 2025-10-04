import React, { useEffect, useState } from "react";
import WeddingCard from "../components/WeddingCard";

const Weddings = () => {
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const res = await fetch("backend url"); 
        const data = await res.json();
        setWeddings(data.weddings || []);
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
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-600 text-lg">Loading weddings...</p>
      </div>
    );
  }

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Explore Real Weddings
        </h1>

        {weddings.length === 0 ? (
          <p className="text-center text-gray-500">No weddings found yet.</p>
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
};

export default Weddings;
