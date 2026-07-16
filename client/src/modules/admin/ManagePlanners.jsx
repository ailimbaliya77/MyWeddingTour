import React, { useEffect, useState } from "react";

const ManagePlanners = () => {
  const [planners, setPlanners] = useState([]);

  useEffect(() => {
    // TODO: adminApi.getPlanners()
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Planners</h1>
      <p className="text-sm text-gray-500 mb-6">Everyone who has hosted or is hosting a wedding</p>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Weddings hosted</th>
              <th className="px-4 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {planners.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                  No planners yet.
                </td>
              </tr>
            ) : (
              planners.map((p) => (
                <tr key={p._id} className="border-t border-gray-100">
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3">{p.email}</td>
                  <td className="px-4 py-3">{p.weddingCount}</td>
                  <td className="px-4 py-3">{p.createdAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePlanners;