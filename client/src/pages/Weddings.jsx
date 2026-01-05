import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Weddings() {
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/v1/wedding",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setWeddings(data.data || []);
        } else {
          console.error(data.message || "Failed to fetch weddings");
        }
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
        <p className="text-gray-600 text-lg">Loading weddings…</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">
              My Weddings
            </h1>
            <p className="text-gray-500 mt-1">
              Manage and view your created weddings
            </p>
          </div>
        </div>

        {/* EMPTY STATE */}
        {weddings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center">
            <p className="text-xl font-medium text-gray-600">
              No weddings created yet
            </p>
            <p className="text-gray-500 mt-2">
              Start by creating your first wedding
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {weddings.map((wedding) => (
              <div
                key={wedding._id}
                onClick={() => navigate(`/weddings/${wedding._id}`)}
                className="cursor-pointer bg-white rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                {/* CARD HEADER */}
                <div className="h-48 rounded-t-3xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center">
                  <span className="text-white text-xl font-bold text-center px-4">
                    {wedding.bride?.firstName} ❤️ {wedding.groom?.firstName}
                  </span>
                </div>

                {/* CARD BODY */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">
                    {wedding.bride?.firstName} & {wedding.groom?.firstName}
                  </h2>

                  <p className="text-gray-500 text-sm mb-4">
                    Wedding Experience
                  </p>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Status</span>
                    <span className="font-medium text-teal-600 capitalize">
                      {wedding.status}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Events</span>
                    <span>{wedding.events?.length || 0}</span>
                  </div>

                  <button
                    className="mt-6 w-full py-3 rounded-xl bg-slate-700 text-white font-semibold hover:bg-slate-800 transition"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
