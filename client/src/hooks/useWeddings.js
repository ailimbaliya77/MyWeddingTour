import { useEffect, useState } from "react";
import { fetchWeddings } from "../services/weddingApi";

export const useWeddings = () => {
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeddings = async () => {
      try {
        const data = await fetchWeddings();
        setWeddings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getWeddings();
  }, []);

  return { weddings, loading };
};