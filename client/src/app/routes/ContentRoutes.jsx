import { Routes, Route } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

import WeddingCulture from "../../modules/content/WeddingCulture";
import WeddingCultureDetail  from "../../modules/content/WeddingCultureDetails";
import WeddingDiaries from "../../modules/content/WeddingDiaries";
import WeddingDiaryDetail from "../../modules/content/WeddingDiariesDetails";
import HowItWorks from "../../modules/public/HowItWorks";

const ContentRoutes = ({ setLoginOpen }) => {
  return (
    <Routes>
      <Route
        path="/culture"
        element={
          <MainLayout setLoginOpen={setLoginOpen}>
            <WeddingCulture />
          </MainLayout>
        }
      />
      <Route
        path="/culture/:slug"
        element={
          <MainLayout setLoginOpen={setLoginOpen}>
            <WeddingCultureDetail />
          </MainLayout>
        }
      />
      <Route
        path="/diaries"
        element={
          <MainLayout setLoginOpen={setLoginOpen}>
            <WeddingDiaries />
          </MainLayout>
        }
      />
      <Route
        path="/diaries/:slug"
        element={
          <MainLayout setLoginOpen={setLoginOpen}>
            <WeddingDiaryDetail />
          </MainLayout>
        }
      />
      <Route
        path="/how-it-works"
        element={
          <MainLayout setLoginOpen={setLoginOpen}>
            <HowItWorks />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default ContentRoutes;