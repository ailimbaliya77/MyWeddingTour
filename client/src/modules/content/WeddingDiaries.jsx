import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const WeddingDiaries = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: blogApi.getPosts("diaries")
    fetch(`${API_URL}/blog?category=diaries`)
      .then((res) => res.json())
      .then((data) => setPosts(data.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Royal Rajasthan Wedding Diaries</h1>
      <p className="text-gray-500 mb-10">Real stories, straight from the couples and travelers who lived them</p>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400">No diary entries yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link
              key={p._id}
              to={`/diaries/${p.slug}`}
              className="block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition"
            >
              {p.coverImage && (
                <img src={p.coverImage} alt={p.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{p.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeddingDiaries;