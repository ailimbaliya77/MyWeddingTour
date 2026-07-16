import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const WeddingCultureDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: blogApi.getPostBySlug(slug)
    fetch(`${API_URL}/blog/${slug}`)
      .then((res) => res.json())
      .then((data) => setPost(data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-12 text-gray-500">Loading…</div>;
  if (!post) return <div className="max-w-3xl mx-auto px-4 py-12 text-gray-500">Article not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/culture" className="inline-flex items-center gap-1.5 text-sm text-teal-700 mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Wedding Culture
      </Link>

      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="w-full h-72 object-cover rounded-xl mb-6" />
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <div className="prose max-w-none text-gray-700 whitespace-pre-line">{post.content}</div>
    </div>
  );
};

export default WeddingCultureDetail;