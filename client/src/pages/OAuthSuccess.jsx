import { useEffect } from "react";

export default function OAuthSuccess() {

  useEffect(() => {
    // Read full URL after the hash
    const hash = window.location.hash; 
    // Example: "#/oauth-success?accessToken=xxx"

    const query = hash.split("?")[1];
    const params = new URLSearchParams(query);

    const token = params.get("token") || params.get("accessToken");

    if (token) {
      localStorage.setItem("token", token);
      console.log("OAuth token saved:", token);

      // Redirect to Step1
      window.location.hash = "/host/register/step1";
    } else {
      console.error("Token not found in URL");
    }
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Logging you in...</h2>
      <p>Please wait...</p>
    </div>
  );
}
