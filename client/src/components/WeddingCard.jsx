import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function WeddingCard({ wedding }) {
  const navigate = useNavigate();

  const weddingDate = wedding.weddingDate
    ? dayjs(wedding.weddingDate)
    : null;

  const daysLeft =
    weddingDate && weddingDate.isValid()
      ? weddingDate.diff(dayjs(), "day")
      : null;

  return (
    <div
      onClick={() => navigate(`/weddings/${wedding._id}`)}
      className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
    >
      {/* IMAGE */}
      <div className="relative h-56">
        <img
          src={wedding.listingPhotoURL}
          alt="Wedding"
          className="w-full h-full object-cover"
        />

        {/* STATUS CHIP */}
        {daysLeft !== null && (
          <span className="absolute top-4 right-4 bg-white/90 px-4 py-1 rounded-full text-sm font-semibold shadow">
            {daysLeft > 0 ? `${daysLeft} Days to go` : "Married ❤️"}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 text-center space-y-2">
        <h2 className="font-serif text-xl text-gray-800">
          {wedding.bride?.firstName} & {wedding.groom?.firstName}
        </h2>

        {weddingDate?.isValid() ? (
          <p className="text-gray-600 text-sm">
            {weddingDate.format("DD MMMM YYYY")}
          </p>
        ) : (
          <p className="text-gray-400 text-sm">Date not announced</p>
        )}

        <p className="text-gray-500 text-sm">
          {wedding.location?.city}, {wedding.location?.country}
        </p>

        <span className="inline-block pt-2 text-sm font-semibold text-[#0F766E]">
          View Wedding Hub →
        </span>
      </div>
    </div>
  );
}
