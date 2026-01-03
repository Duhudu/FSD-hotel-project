//API_URL for the backend
const API_URL = "http://localhost:82";

export const UserDetails = {
  //Get all users for testing without the login
  getAllUsers: async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/get`);
      //see if data is sent by the backend
      if (!response.ok) {
        throw new Error("Failed to fecth data");
      }
      // Convert response to JSON
      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error("Select update Room Error:", error);
      return { success: false, message: error.message };
    }
  },

  //get selected user
  getUser: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/user/selected/${id}`, {
        method: "GET",
      });
      //see if data is sent by the backend
      if (!response.ok) {
        throw new Error("Failed to fecth data");
      }
      // Convert response to JSON
      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error("Select update Room Error:", error);
      return { success: false, message: error.message };
    }
  },
};
