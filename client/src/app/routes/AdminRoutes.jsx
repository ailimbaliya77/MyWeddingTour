import { Routes, Route } from "react-router-dom";

import AdminProtectedRoute from "../../modules/admin/AdminProtectedRoute";
import AdminLayout from "../../modules/admin/AdminLayout";

import AdminDashboard from "../../modules/admin/AdminDashboard";
import VerificationDashboard from "../../modules/admin/VerificationDashboard";
import ManagePlanners from "../../modules/admin/ManagePlanners";
import ManageWeddings from "../../modules/admin/ManageWeddings";
import BlogManager from "../../modules/admin/BlogManager";
import AdminSettings from "../../modules/admin/AdminSettings";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/verifications"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <VerificationDashboard />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/planners"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <ManagePlanners />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/weddings"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <ManageWeddings />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/blog"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <BlogManager />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;