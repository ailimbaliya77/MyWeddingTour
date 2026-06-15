export const fetchWeddings = async () => {

  // Replace this URL when backend developer gives API
  const response = await fetch("http://localhost:3000/api/v1/wedding");

  if (!response.ok) {
    throw new Error("Failed to fetch weddings");
  }

  const data = await response.json();

  return data;
};