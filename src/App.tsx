import React, { useState, useEffect } from "react";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import { fetchItems } from "./api";

interface Item {
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const handleAddItem = (newItem: Item) => {
    setItems((prevItems) => [newItem, ...prevItems]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          React CRUD App
        </h1>
        <ItemForm onAdd={handleAddItem} />
        <ItemList items={items} setItems={setItems} />
      </div>
    </div>
  );
};

export default App;
