import React, { useState } from "react";
import { addItem } from "../api";

interface Props {
  onAdd: (item: { id: number; title: string; body: string }) => void;
}

const ItemForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Both fields are required.");
      return;
    }

    try {
      const newItem = await addItem({ title, body: description });
      onAdd(newItem);
      setTitle("");
      setDescription("");
    } catch (error) {
      setError("Failed to add item. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg shadow-xl rounded-xl border border-gray-300 dark:border-gray-700 p-8">
      <h2 className="text-2xl font-extrabold text-center text-gray-800 dark:text-gray-200 mb-6">
        Add New Item
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter Item Title"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter Item Description"
        ></textarea>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-white focus:ring-4 focus:ring-indigo-500"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
