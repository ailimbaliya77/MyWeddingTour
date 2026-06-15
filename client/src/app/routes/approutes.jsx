import { Routes, Route } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import ContactPage from "../../pages/ContactPage";

// eslint-disable-next-line no-unused-vars
const AppRoutes = ({ setLoginOpen, googleLoginInProgress }) => {
  return (
    <Routes>
      <Route
        path="/contact"
        element={
          <MainLayout setLoginOpen={setLoginOpen}>
            <ContactPage />
          </MainLayout>
        }
      />

      {/* Uncomment as you build these modules:

      <Route
        path="/host/dashboard"
        element={
          <ProtectedRoute openLogin={setLoginOpen} googleLoginInProgress={googleLoginInProgress}>
            <HostDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/role-selection"
        element={
          <ProtectedRoute openLogin={setLoginOpen}>
            <RoleSelection />
          </ProtectedRoute>
        }
      />

      <Route path="/admin/dashboard" element={<ProtectedRoute openLogin={setLoginOpen}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/verification" element={<ProtectedRoute openLogin={setLoginOpen}><VerificationPage /></ProtectedRoute>} />
      <Route path="/admin/planners" element={<ProtectedRoute openLogin={setLoginOpen}><ManagePlanners /></ProtectedRoute>} />
      <Route path="/admin/weddings" element={<ProtectedRoute openLogin={setLoginOpen}><ManageWeddings /></ProtectedRoute>} />
      <Route path="/admin/blogs" element={<ProtectedRoute openLogin={setLoginOpen}><BlogManager /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute openLogin={setLoginOpen}><AdminSettings /></ProtectedRoute>} />

      <Route path="/curated" element={<MainLayout setLoginOpen={setLoginOpen}><WeddingCurator /></MainLayout>} />
      <Route path="/diaries" element={<MainLayout setLoginOpen={setLoginOpen}><WeddingDiaries /></MainLayout>} />
      <Route path="/how-it-works" element={<MainLayout setLoginOpen={setLoginOpen}><HowItWorks /></MainLayout>} />
      */}
    </Routes>
  );
};

export default AppRoutes;