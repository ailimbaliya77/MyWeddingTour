import React, { useState } from "react";

const AdminSettings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: adminApi.updateProfile({ name, email })
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-6">Your admin account details</p>

      <form onSubmit={handleSave} className="bg-white border border-gray-100 rounded-xl p-6 max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700"
        >
          Save changes
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;