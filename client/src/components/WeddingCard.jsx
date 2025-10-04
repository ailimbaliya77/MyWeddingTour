import React from "react";
import { Link } from "react-router-dom";

const WeddingCard = ({ wedding }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link to={`/weddings/${wedding._id}`}>
        <img
          src={wedding.coverImage || "/placeholder.jpg"}
          alt={wedding.coupleNames}
          className="w-full h-60 object-cover"
        />
      </Link>
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          {wedding.coupleNames}
        </h2>
        <p className="text-sm text-gray-600 mb-2">{wedding.location}</p>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {wedding.description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <p className="text-pink-600 font-medium">
            {new Date(wedding.date).toLocaleDateString()}
          </p>
          <Link
            to={`/weddings/${wedding._id}`}
            className="text-sm text-white bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeddingCard;
