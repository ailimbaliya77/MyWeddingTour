import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

const BlogManager = () => {
  const [tab, setTab] = useState("culture"); // "culture" | "diaries"
  // eslint-disable-next-line no-unused-vars
  const [posts, setPosts] = useState([]);

  // TODO: useEffect to load posts by category via blogApi.getPosts(tab)

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-gray-800">Blog</h1>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700">
          <Plus className="w-4 h-4" /> New post
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-6">Manage Wedding Culture and Wedding Diaries content</p>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-gray-200">
        {["culture", "diaries"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition ${
              tab === t
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "culture" ? "Wedding Culture" : "Wedding Diaries"}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        {posts.length === 0 ? (
          <div className="px-4 py-10 text-center text-gray-400 text-sm">
            No {tab === "culture" ? "culture" : "diary"} posts yet.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Published</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p._id} className="border-t border-gray-100">
                  <td className="px-4 py-3">{p.title}</td>
                  <td className="px-4 py-3">{p.publishedAt}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button className="p-1.5 rounded hover:bg-gray-100 inline-flex">
                      <Pencil className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-red-50 inline-flex">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BlogManager;