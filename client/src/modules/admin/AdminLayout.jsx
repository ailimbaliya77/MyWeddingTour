import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  Heart,
  Newspaper,
  Settings,
} from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/verifications", label: "Verifications", icon: ShieldCheck },
  { to: "/admin/planners", label: "Planners", icon: Users },
  { to: "/admin/weddings", label: "Weddings", icon: Heart },
  { to: "/admin/blog", label: "Blog", icon: Newspaper },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100">
          <span className="text-lg font-bold text-teal-700">MyWeddingTour</span>
          <p className="text-xs text-gray-500 mt-0.5">Admin panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Page content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;