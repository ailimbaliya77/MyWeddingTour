import { Link } from "react-router-dom";

export default function WeddingCard({ wedding }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image */}
      <div className="h-56 w-full overflow-hidden">
        <img
          src={wedding.coverImage}
          alt={wedding.coupleName}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {wedding.coupleName}
        </h3>

        <p className="text-gray-600 text-sm mb-4">
          {wedding.city}, {wedding.country}
        </p>

        <div className="flex gap-2 mb-4">
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
            {wedding.ceremonyType}
          </span>
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-semibold">
            {wedding.weddingDate}
          </span>
        </div>

        <Link
          to={`/weddings/${wedding._id}`}
          className="block text-center bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-xl transition"
        >
          View Wedding
        </Link>
      </div>
    </div>
  );
}
