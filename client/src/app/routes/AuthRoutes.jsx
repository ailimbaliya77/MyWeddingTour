import { Routes, Route } from "react-router-dom";

import OAuthSuccess from "../../modules/auth/OAuthSuccess";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route
        path="/oauth-success"
        element={<OAuthSuccess />}
      />
    </Routes>
  );
};

export default AuthRoutes;