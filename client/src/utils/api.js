export const api = async (url, method = "GET", body = null) => {
  const token = localStorage.getItem("access-token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  // If token expired (401), handle refresh here later
  if (response.status === 401) {
    console.warn("Access token expired or invalid.");
  }

  return response.json();
};
