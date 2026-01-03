//API_URL for the backend
const API_URL = "http://localhost:82";

export const bookingDataApi = {
  //Get the selected room
  selectedRoom: async (roomId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/booking/rooms/selected/${roomId}`,
        {
          method: "GET",
        }
      );
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
  //Check Availability
  checkAvailability: async (typeId, checkIn, checkOut) => {
    try {
      const response = await fetch(
        `${API_URL}/api/booking/rooms/check-availability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            typeId: typeId,
            checkInDate: checkIn,
            checkOutDate: checkOut,
          }),
        }
      );
      if (response.ok) {
        console.log("Rooms available");
        const data = await response.json();
        return {
          success: true,
          data: data,
        };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Check Availability Error:", error);
      return { success: false, message: error.message };
    }
  },
};
