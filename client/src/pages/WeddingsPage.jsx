import React, { useState } from "react";
import { Link } from "react-router-dom";

const WeddingsPage = ({ weddings, removeWedding }) => {
  const [filterDate, setFilterDate] = useState("");

  // Filter weddings: show only those on/after filterDate
  const filteredWeddings = weddings.filter((w) => {
    if (!filterDate) return true; // no filter applied
    const weddingDate = new Date(w.date);
    const selected = new Date(filterDate);
    return weddingDate >= selected;
  });

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-4">All Weddings</h1>
      <p className="text-gray-600 mb-6">
        Choose the wedding you would like to join. Planning to travel on a specific date?
      </p>

      {/* 🔥 Single Date Filter */}
      <div className="flex gap-4 mb-10">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-3 rounded-lg w-full sm:w-1/3"
        />
        {filterDate && (
          <button
            onClick={() => setFilterDate("")}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Clear
          </button>
        )}
      </div>

      {/* Wedding Cards */}
      {filteredWeddings.length === 0 ? (
        <p className="text-gray-500 text-lg">No weddings found for this date.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWeddings.map((w) => (
            <div
              key={w.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <Link to={`/weddings/${w.id}`}>
                {w.image ? (
                  <img
                    src={w.image}
                    alt="Wedding"
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </Link>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-1">
                  {w.brideFirst} {w.brideLast} & {w.groomFirst} {w.groomLast}
                </h3>
                <p className="text-gray-600 mb-1">📍 {w.location} — {w.venue}</p>
                <p className="text-gray-600 mb-2">📅 {w.date}</p>

                {/* Delete Button */}
                <button
                  onClick={() => removeWedding && removeWedding(w.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeddingsPage;
