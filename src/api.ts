import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchItems = async () => {
  const response = await axios.get(API_URL);
  return response.data.slice(0, 10);
};

export const addItem = async (newItem: { title: string; body: string }) => {
  try {
    const response = await axios.post(API_URL, newItem, {
      headers: { "Content-Type": "application/json" },
    });

    return {
      ...newItem,
      id: response.data.id || Math.floor(Math.random() * 10000),
    }; // Ensure new items get an id
  } catch (error) {
    console.error("Failed to add item:", error);
    throw error;
  }
};


export const updateItem = async (
  id: number,
  updatedItem: { title: string; body: string },
) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedItem, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const deleteItem = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
