import React, { useEffect, useState } from "react";
import { Trash2, Eye } from "lucide-react";

const statusColors = {
  draft: "bg-gray-100 text-gray-600",
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const ManageWeddings = () => {
  const [weddings, setWeddings] = useState([]);

  useEffect(() => {
    // TODO: adminApi.getAllWeddings()
  }, []);

  const handleDelete = async (id) => {
    // TODO: adminApi.deleteWedding(id) — should soft-delete (isDeleted: true) per your schema
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Weddings</h1>
      <p className="text-sm text-gray-500 mb-6">All wedding listings on the platform</p>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Couple</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {weddings.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                  No weddings yet.
                </td>
              </tr>
            ) : (
              weddings.map((w) => (
                <tr key={w._id} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    {w.bride?.firstName} & {w.groom?.firstName}
                  </td>
                  <td className="px-4 py-3">{w.city}, {w.country}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[w.status] || statusColors.draft}`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button className="p-1.5 rounded hover:bg-gray-100 inline-flex">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(w._id)}
                      className="p-1.5 rounded hover:bg-red-50 inline-flex"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageWeddings;