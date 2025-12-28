//API_URL for the backend
const API_URL = "http://localhost:82";

export const allRoomsList = {
  //Get Rooms API call logic
  getRooms: async () => {
    try {
      //call the backend and get data
      const response = await fetch(`${API_URL}/get`, {
        method: "GET",
      });
      //see if data is sent by the backend
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Convert response to JSON
      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error("Booking Error:", error);
      return { success: false, message: "Network Error" };
    }
  },
  //Add (post) rooms API call logic
  addRooms: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        // Try to get the error message from the backend
        const errorText = await response.text();
        throw new Error(errorText || "Failed to add room");
      }
      return { success: true, message: "Room Data Added Successfully" };
    } catch (error) {
      console.error("Add Room Error:", error);
      return { success: false, message: error.message };
    }
  },
  //"Remove" the room (change status from Ready to Delete
  removeRooms: async (id) => {
    try {
      const response = await fetch(`${API_URL}/remove/${id}`, {
        method: "PUT",
      });
      if (response.ok) {
        console.log("Room marked as deleted");
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Remove Room Error:", error);
      return { success: false, message: error.message };
    }
  },
  //Select Room for Edit From
  getUpdateRoom: async (id) => {
    try {
      const response = await fetch(`${API_URL}/select/${id}`, {
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
  //Update Room
  updateRooms: async (typeId, formData) => {
    try {
      const response = await fetch(`${API_URL}/update/${typeId}`, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        console.log("Rooms Updated");
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Update Room Error:", error);
      return { success: false, message: error.message };
    }
  },
};
