import { Routes, Route } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import HomePage from "../../modules/public/HomePage";
import Weddings from "../../modules/public/Weddings";
import WeddingDetailsPage from "../../modules/public/WeddingDetails";
import AboutUs from "../../modules/public/AboutUs";
import FAQ from "../../modules/public/FAQ";
import Testimonials from "../../modules/public/Testimonials";

const PublicRoutes = ({ setLoginOpen }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout setLoginOpen={setLoginOpen}>
            <HomePage setLoginOpen={setLoginOpen} />
          </MainLayout>
        }
      />
      <Route
        path="/weddings"
        element={
          <MainLayout setLoginOpen={setLoginOpen}>
            <Weddings />
          </MainLayout>
        }
      />
      <Route
        path="/weddings/:weddingId"
        element={
          <MainLayout setLoginOpen={setLoginOpen}>
            <WeddingDetailsPage />
          </MainLayout>
        }
      />
      <Route
        path="/about-us"
        element={
          <MainLayout setLoginOpen={setLoginOpen}>
            <AboutUs />
          </MainLayout>
        }
      />
      <Route
        path="/FAQ"
        element={
          <MainLayout setLoginOpen={setLoginOpen}>
            <FAQ />
          </MainLayout>
        }
      />
      <Route
        path="/Testimonials"
        element={
          <MainLayout setLoginOpen={setLoginOpen}>
            <Testimonials />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default PublicRoutes;