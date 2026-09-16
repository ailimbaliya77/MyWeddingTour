import React from "react";
import { Routes } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import HostRoutes from "./HostRoutes";
import AppRoutes from "./AppRoutes";

export default function AllRoutes(props) {
  return (
    <Routes>
      <PublicRoutes setLoginOpen={props.setLoginOpen} />

      <AuthRoutes />

      <HostRoutes
        setLoginOpen={props.setLoginOpen}
        googleLoginInProgress={props.googleLoginInProgress}
        formData={props.formData}
        setFormData={props.setFormData}
      />

      <AppRoutes
        setLoginOpen={props.setLoginOpen}
        googleLoginInProgress={props.googleLoginInProgress}
      />
    </Routes>
  );
}