import React from "react";
import { Navigate } from "react-router-dom";

/**
 * AdminProtectedRoute
 * -------------------
 * Wraps admin-only pages. Assumes the logged-in user object (stored in
 * localStorage under "user" after login) has a `role` field, e.g.
 *   { "_id": "...", "email": "...", "role": "admin" }
 *
 * ⚠️ If your backend's user model doesn't have a `role` field yet, you'll
 * need to add one (e.g. role: { type: String, enum: ["traveler", "host", "admin"], default: "traveler" })
 * and set it manually in MongoDB for your own admin account before this works.
 */
const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;