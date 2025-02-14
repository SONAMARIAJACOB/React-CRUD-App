import React, { useState } from "react";
import { updateItem } from "../api";

interface EditItemModalProps {
  item: { id: number; title: string; body: string };
  onClose: () => void;
  onUpdate: (updatedItem: { id: number; title: string; body: string }) => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
  item,
  onClose,
  onUpdate,
}) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.body);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Both fields are required.");
      return;
    }

    try {
       if (item.id && item.id <= 100) {
         const updatedItem = await updateItem(item.id, {
           title,
           body: description,
         });
         onUpdate(updatedItem);
       } else {
         onUpdate({ ...item, title, body: description });
       }

      onClose();
    } catch (error) {
      setError("Failed to update item. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-extrabold mb-4 text-gray-800 dark:text-gray-200 text-center">
          Edit Item
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 hover:shadow-xl"
          placeholder="Enter Title"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 hover:shadow-xl h-24 mt-2 resize-none"
          placeholder="Enter Description"
        ></textarea>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md transform hover:scale-105 hover:shadow-2xl"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;
