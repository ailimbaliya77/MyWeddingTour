import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  List,
  CalendarCheck2,
  Wallet,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  MapPin,
  Calendar,
  Users,
  Pencil,
  Eye,
  Plus,
  Heart,
  UserCircle2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const statusStyles = {
  approved: { label: "Live", cls: "bg-green-100 text-green-700" },
  pending: { label: "Under Review", cls: "bg-amber-100 text-amber-700" },
  draft: { label: "Draft", cls: "bg-gray-100 text-gray-600" },
  rejected: { label: "Rejected", cls: "bg-red-100 text-red-700" },
};

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: List, label: "My Listings" },
  { icon: CalendarCheck2, label: "Bookings" },
  { icon: Wallet, label: "Earnings" },
  { icon: MessageSquare, label: "Messages" },
];

const HostDashboard = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    const userRaw = localStorage.getItem("user");
    if (userRaw) {
      try { setUser(JSON.parse(userRaw)); } catch { /* ignore */ }
    }

    // TODO: your backend currently has no "my listings" endpoint —
    // only GET /wedding (all approved) and GET /wedding/:id exist.
    // Add a host-scoped route (e.g. GET /wedding/mine, filtered by
    // hostId = req.user.id, returning all statuses not just "approved")
    // for this to show real data.
    fetch(`${API_URL}/wedding/mine`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setListings(data.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const totalListings = listings.length;
  const upcomingGuests = listings.reduce((sum, w) => sum + (w.bookedCount || 0), 0);
  // TODO: total earnings needs a real bookings/payments aggregate from the backend
  const totalEarnings = "—";

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-orange-50/60 border-r border-orange-100 flex flex-col">
        <div className="px-6 py-6 flex items-center gap-2">
          <Heart className="w-5 h-5 text-orange-500 fill-orange-500" />
          <span className="text-lg font-bold text-orange-600">MyWeddingTour</span>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(({  label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition text-left ${
                active
                  ? "bg-orange-100 text-orange-700"
                  : "text-gray-600 hover:bg-orange-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-3 pb-6 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-orange-50 text-left">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("accessToken");
              navigate("/");
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-orange-50 text-left"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">Overview</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2">
              <UserCircle2 className="w-8 h-8 text-gray-300" />
              <span className="text-sm font-medium text-gray-700">
                {user?.firstName || "Host"} {user?.lastName?.charAt(0) || ""}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Welcome */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Welcome back, {user?.firstName || "Host"}!
              </h2>
              <p className="text-gray-500 text-sm">
                Here's a quick overview of your hosted weddings and bookings.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <UserCircle2 className="w-4 h-4" />
              Edit Profile Details
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">Total Listings</p>
                <MapPin className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{loading ? "…" : totalListings}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">Upcoming Guests</p>
                <Users className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{loading ? "…" : upcomingGuests}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">Total Earnings</p>
                <Wallet className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalEarnings}</p>
            </div>
          </div>

          {/* Listings */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">My Listings</h3>
            <button
              onClick={() => navigate("/host/list-wedding")}
              className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600"
            >
              <Plus className="w-4 h-4" /> Add New Listing
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500 text-sm">Loading…</p>
          ) : listings.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
              <p className="text-gray-500 mb-4">You haven't listed a wedding yet.</p>
              <button
                onClick={() => navigate("/host/list-wedding")}
                className="px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600"
              >
                Create your first listing
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((w) => {
                const status = statusStyles[w.status] || statusStyles.draft;
                return (
                  <div key={w._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="h-40 bg-gray-100">
                      {w.listingPhotoURL && (
                        <img src={w.listingPhotoURL} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm leading-snug">
                          {w.bride?.firstName} & {w.groom?.firstName} Wedding
                        </h4>
                        <span className={`shrink-0 px-2 py-0.5 rounded-full text-[11px] font-medium ${status.cls}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                        <MapPin className="w-3 h-3" /> {w.city}, {w.region}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3" />
                        {w.weddingStartDate?.slice(0, 10)} - {w.weddingEndDate?.slice(0, 10)}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mb-4">
                        <Users className="w-3 h-3" />
                        {w.bookedCount || 0} / {w.guestCapacity || "—"} Spots Booked
                      </p>
                      <div className="flex gap-2 pt-3 border-t border-gray-100">
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-orange-50 text-orange-600 rounded-lg text-xs font-medium hover:bg-orange-100">
                          <Pencil className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-50 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-100">
                          <Eye className="w-3.5 h-3.5" />
                          {w.status === "approved" ? "Bookings" : "Preview"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HostDashboard;