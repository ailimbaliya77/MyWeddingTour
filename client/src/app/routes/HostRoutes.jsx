import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../../modules/auth/ProtectedRoute";
import MainLayout from "../../layouts/MainLayout";

import BecomeHost from "../../modules/host/BecomeHost";
import HostLandingPage from "../../modules/host/HostLandingPage";
import HostSingleListing from "../../modules/host/HostSingleListing";
import HostDashboard from "../../modules/host/HostDashboard";
import SubmissionSuccess from "../../modules/host/SubmissionSuccess";
import BookingPage from "..//../modules/host/BookinPage"
import PassVerification from "../../pages/PassVerification";

const HostRoutes = ({
  setLoginOpen,
  googleLoginInProgress,
  // eslint-disable-next-line no-unused-vars
  formData,
  // eslint-disable-next-line no-unused-vars
  setFormData,
}) => {
  return (
    <Routes>
      <Route
        path="/BecomeHost"
        element={
          <MainLayout setLoginOpen={setLoginOpen}>
            <BecomeHost />
          </MainLayout>
        }
      />
      <Route
        path="/host"
        element={
          <ProtectedRoute
            openLogin={setLoginOpen}
            googleLoginInProgress={googleLoginInProgress}
          >
            <MainLayout setLoginOpen={setLoginOpen}>
              <HostLandingPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/list-wedding"
        element={
          <ProtectedRoute
            openLogin={setLoginOpen}
            googleLoginInProgress={googleLoginInProgress}
          >
            <HostSingleListing />
          </ProtectedRoute>
        }
      />

      {/* NEW: host's own listings overview */}
      <Route
        path="/host/dashboard"
        element={
          <ProtectedRoute
            openLogin={setLoginOpen}
            googleLoginInProgress={googleLoginInProgress}
          >
            <HostDashboard />
          </ProtectedRoute>
        }
      />

      {/* NEW: shown after submitting a listing */}
      <Route
        path="/host/success"
        element={
          <ProtectedRoute
            openLogin={setLoginOpen}
            googleLoginInProgress={googleLoginInProgress}
          >
            <SubmissionSuccess />
          </ProtectedRoute>
        }
      />

    <Route path="/booking/:weddingId" element={<BookingPage />} />
    <Route path="/host/verify-pass" element={<PassVerification />} />
    </Routes>
  );
};

export default HostRoutes;