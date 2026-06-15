import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../../modules/auth/ProtectedRoute";
import MainLayout from "../../layouts/MainLayout";

import BecomeHost from "../../modules/host/BecomeHost";
import HostLandingPage from "../../modules/host/HostLandingPage";
import HostSingleListing from "../../modules/host/HostSingleListing";

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
    </Routes>
  );
};

export default HostRoutes;