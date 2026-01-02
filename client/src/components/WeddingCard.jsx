import { useNavigate } from "react-router-dom";

export default function WeddingCard({ wedding }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/weddings/${wedding.id}`)}
      className="cursor-pointer bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
    >
      <img
        src={wedding.coverImage}
        alt="Wedding Cover"
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold">
          {wedding.brideName} & {wedding.groomName}
        </h2>

        <p className="text-gray-500 text-sm mt-1">{wedding.location}</p>

        <p className="text-gray-600 text-sm mt-1">
          Wedding Date: <strong>{wedding.date}</strong>
        </p>
      </div>
    </div>
  );
}
