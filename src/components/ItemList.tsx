import React, { useState } from "react";
import { deleteItem } from "../api";
import EditItemModal from "./EditItemModal";

interface Item {
  id: number;
  title: string;
  body: string;
}

const ItemList: React.FC<{
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}> = ({ items, setItems }) => {
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const sortedItems = [...items].sort((a, b) => {
    if (sortOrder === "a-z") return a.title.localeCompare(b.title);
    if (sortOrder === "z-a") return b.title.localeCompare(a.title);
    if (sortOrder === "newest") return b.id - a.id;
    if (sortOrder === "oldest") return a.id - b.id;
    return 0;
  });

  const filteredItems = sortedItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    await deleteItem(id);
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdate = (updatedItem: Item) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Items List</h2>

      <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="newest">Sort by: Newest</option>
          <option value="oldest">Sort by: Oldest</option>
          <option value="a-z">Sort by: A-Z</option>
          <option value="z-a">Sort by: Z-A</option>
        </select>
      </div>
      <ul className="space-y-4">
        {filteredItems.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No matching items found.
          </p>
        ) : (
          filteredItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <h3>
                  <b>
                    {" "}
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {item.title}
                    </p>
                  </b>
                </h3>
                <p className="text-gray-600">{item.body}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 font-semibold hover:text-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ItemList;
