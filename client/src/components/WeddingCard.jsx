import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// Format a date range like "Apr 19, 2026 – Apr 26, 2026"
function formatDateRange(start, end) {
  const fmt = "MMM D, YYYY";
  if (start && start.isValid() && end && end.isValid()) {
    return `${start.format(fmt)} – ${end.format(fmt)}`;
  }
  if (start && start.isValid()) return start.format(fmt);
  return null;
}

export default function WeddingCard({ wedding }) {
  const navigate = useNavigate();

  const startDate = wedding.weddingStartDate ? dayjs(wedding.weddingStartDate) : null;
  const endDate   = wedding.weddingEndDate   ? dayjs(wedding.weddingEndDate)   : null;
  const dateRange = formatDateRange(startDate, endDate);

  const spotsTotal = wedding.guestCapacity ?? null;
  const spotsLeft  = wedding.spotsLeft ?? null;

  const badgeLabel = wedding.religion || wedding.type || null;

  const title =
    wedding.title ||
    `${wedding.bride?.firstName ?? ""} & ${wedding.groom?.firstName ?? ""}`;

  const description = wedding.storyDescription || wedding.description || null;

  const location = [wedding.city, wedding.region].filter(Boolean).join(", ");

  return (
    <div
      onClick={() => navigate(`/weddings/${wedding._id}`)}
      className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* IMAGE */}
      <div
        className="relative h-52 w-full"
        style={
          wedding.listingPhotoURL
            ? {
                backgroundImage: `url(${wedding.listingPhotoURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {
                backgroundColor: "#e5e7eb",
                backgroundImage:
                  "linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f3f4f6 75%), linear-gradient(-45deg, transparent 75%, #f3f4f6 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
              }
        }
      >
        {badgeLabel && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">
            {badgeLabel}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h2 className="font-serif font-bold text-gray-900 text-lg leading-snug mb-1.5">
          {title}
        </h2>

        {description && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>
        )}

        <div className="border-t border-gray-100 pt-3 space-y-2">
          {location && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>{location}</span>
            </div>
          )}

          {dateRange && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{dateRange}</span>
            </div>
          )}

          {spotsTotal !== null && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>
                {spotsLeft !== null
                  ? `${spotsLeft} of ${spotsTotal} spots available`
                  : `${spotsTotal} spots available`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}