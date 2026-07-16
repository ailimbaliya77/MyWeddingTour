import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const VerificationDashboard = () => {
  const [pending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: replace with adminApi.getPendingWeddings()
    // fetch weddings where status === "pending"
    setLoading(false);
  }, []);

  const handleApprove = async (id) => {
    // TODO: adminApi.updateWeddingStatus(id, "approved")
  };

  const handleReject = async (id) => {
    // TODO: adminApi.updateWeddingStatus(id, "rejected")
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Verifications</h1>
      <p className="text-sm text-gray-500 mb-6">
        Review wedding listings submitted by hosts before they go live
      </p>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : pending.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-10 text-center text-gray-500">
          Nothing to review right now.
        </div>
      ) : (
        <div className="space-y-3">
          {pending.map((w) => (
            <div
              key={w._id}
              className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {w.bride?.firstName} & {w.groom?.firstName}
                </p>
                <p className="text-sm text-gray-500">{w.city}, {w.country}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(w._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button
                  onClick={() => handleReject(w._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerificationDashboard;