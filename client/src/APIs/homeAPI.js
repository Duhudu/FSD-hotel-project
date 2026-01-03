//API_URL for the backend
const API_URL = "http://localhost:82";

export const homePageApiCalls = {
  //get all the rooms
  getRooms: async () => {
    try {
      //call the backen to get the data
      const response = await fetch(`${API_URL}/api/home/get`, {
        method: "GET",
      });
      //check if the backend sent data
      if (!response.ok) {
        throw new Error("Faild to fetch data");
      }
      //convert the response to a JSON
      const data = await response.json();
      return { success: true, data: data };
    } catch (error) {
      console.error("Booking Error:", error);
      return { success: false, message: "Network Error" };
    }
  },
};
