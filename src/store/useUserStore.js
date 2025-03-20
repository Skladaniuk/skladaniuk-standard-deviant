import { create } from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      set({ users: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
  adduser: async (user) => {
    try {
      const response = await axios.post(
        ("https://jsonplaceholder.typicode.com/users", user)
      );
      set((state) => ({ users: [...state.users, response.data] }));
    } catch (error) {
      console.log("Error adding user:", error);
    }
  },
  updateUser: async (id, updatedUser) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        updatedUser
      );
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...state.user, ...response.data } : user
        ),
      }));
    } catch (error) {
      console.log("Error updating user:", error);
    }
  },
  deleteUser: async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      console.log("Erorr deleting user:", error);
    }
  },
}));
