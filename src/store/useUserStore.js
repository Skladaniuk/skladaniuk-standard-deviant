import { create } from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
  users: JSON.parse(localStorage.getItem("users")) || [],
  fetchUsers: async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      set({ users: response.data });
      localStorage.setItem("users", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
  addUser: async (user) => {
    try {
      set((state) => {
        const newId =
          Math.max(...state.users.map((user) => Number(user.id))) + 1;
        const newUser = { ...user, id: newId };

        return axios
          .post("https://jsonplaceholder.typicode.com/users", newUser)
          .then((response) => {
            const isDuplicate = state.users.some(
              (u) => u.id === response.data.id
            );

            const uniqueUser = isDuplicate
              ? {
                  ...response.data,
                  id: Math.max(...state.users.map((u) => Number(u.id))) + 1,
                }
              : response.data;
            set({
              users: [uniqueUser, ...state.users],
            });
            localStorage.setItem(
              "users",
              JSON.stringify([uniqueUser, ...state.users])
            );
          })
          .catch((error) => {
            console.error("Error adding user:", error);
          });
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  },
  updateUser: async (id, updatedUser) => {
    try {
      if (Number(id) <= 10) {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          updatedUser
        );

        set((state) => {
          const updatedUsers = state.users.map((user) =>
            user.id === Number(id) ? { ...user, ...response.data } : user
          );
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          return { users: updatedUsers };
        });
      } else {
        set((state) => {
          const updatedUsers = state.users.map((user) =>
            user.id === Number(id) ? { ...user, ...updatedUser } : user
          );
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          return { users: updatedUsers };
        });
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  },
  deleteUser: async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      set((state) => {
        const updatedUsers = state.users.filter((user) => user.id !== id);
        localStorage.setItem("users", JSON.stringify(updatedUsers)); // Зберігаємо оновлений список в localStorage
        return { users: updatedUsers };
      });
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  },
}));
