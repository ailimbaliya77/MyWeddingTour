import React, { useEffect, useState } from "react";
import { Users, Heart, ShieldCheck, Newspaper } from "lucide-react";

// eslint-disable-next-line no-unused-vars
const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${accent}`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

const AdminDashboard = () => {
  // TODO: replace with a real call, e.g. adminApi.getDashboardStats()
  // eslint-disable-next-line no-unused-vars
  const [stats, setStats] = useState({
    pendingVerifications: "—",
    activeWeddings: "—",
    hosts: "—",
    blogPosts: "—",
  });

  useEffect(() => {
    // adminApi.getDashboardStats().then(setStats);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">Overview of platform activity</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ShieldCheck} label="Pending verifications" value={stats.pendingVerifications} accent="bg-amber-500" />
        <StatCard icon={Heart} label="Active weddings" value={stats.activeWeddings} accent="bg-rose-500" />
        <StatCard icon={Users} label="Hosts" value={stats.hosts} accent="bg-teal-600" />
        <StatCard icon={Newspaper} label="Blog posts" value={stats.blogPosts} accent="bg-indigo-500" />
      </div>
    </div>
  );
};

export default AdminDashboard;