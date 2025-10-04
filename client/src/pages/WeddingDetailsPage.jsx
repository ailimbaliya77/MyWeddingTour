import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const WeddingDetails = () => {
  const { id } = useParams();
  const [wedding, setWedding] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeddingDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/weddings/${id}`); // ✅ adjust base URL if needed
        const data = await res.json();
        setWedding(data.wedding);
      } catch (error) {
        console.error("Error fetching wedding:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeddingDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-600 text-lg">Loading wedding details...</p>
      </div>
    );
  }

  if (!wedding) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-500 text-lg">Wedding not found 😔</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-10">
        <Link
          to="/weddings"
          className="text-pink-500 hover:underline text-sm font-medium"
        >
          ← Back to Weddings
        </Link>

        <div className="bg-white rounded-2xl shadow-md mt-6 p-6 md:p-10">
          <img
            src={wedding.coverImage || "/placeholder.jpg"}
            alt={wedding.coupleNames}
            className="w-full h-[400px] object-cover rounded-xl mb-6"
          />

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {wedding.coupleNames}
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            📍 {wedding.location}
          </p>
          <p className="text-gray-600 text-lg mb-4">
            📅 {new Date(wedding.date).toLocaleDateString()}
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">
            {wedding.description}
          </p>

          {/* Host Information Section */}
          <div className="bg-gray-100 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              About the Hosts
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Host Name:</span>{" "}
              {wedding.hostName}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Contact Email:</span>{" "}
              {wedding.email}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Phone:</span>{" "}
              {wedding.phone || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;
