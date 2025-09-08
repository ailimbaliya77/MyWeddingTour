import React from "react";
import { useParams, Link } from "react-router-dom";

const WeddingDetailsPage = ({ weddings }) => {
  const { id } = useParams();
  const wedding = weddings.find((w) => w.id === id);

  if (!wedding) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-6">
        <p className="text-red-600 font-bold">Wedding not found.</p>
        <Link to="/weddings" className="text-teal-600 underline">
          ← Back to Weddings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* Image */}
      {wedding.image && (
        <img
          src={wedding.image}
          alt="Wedding"
          className="w-full h-72 object-cover rounded-lg mb-6"
        />
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">
        {wedding.brideFirst} {wedding.brideLast} & {wedding.groomFirst} {wedding.groomLast}
      </h1>

      {/* Basic Info */}
      <p className="text-gray-700 mb-2">📅 {wedding.date}</p>
      <p className="text-gray-700 mb-2">📍 {wedding.location} — {wedding.venue}</p>

    {/* Back button */}
      <div className="mt-6">
        <Link to="/weddings" className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700">
          ← Back to Weddings
        </Link>
      </div>
    </div>
  );
};

export default WeddingDetailsPage;
