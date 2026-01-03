//API_URL for the backend
const API_URL = "http://localhost:82";

export const serviceAddOnsList = {
  //Add service
  addService: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/api/services/add`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        //Get the error from the backend
        const error = await response.text();
        throw new Error(error || "Failed to add the Service");
      }
      return { success: true, message: "Service Add Successfully" };
    } catch (error) {
      console.error("Add Service Error:", error);
      return { success: false, message: error.message };
    }
  },
  //Get Data
  getService: async () => {
    try {
      //call the db to get the data
      const response = await fetch(`${API_URL}/api/services/get`, {
        method: "GET",
      });
      //chech if the db send the data
      if (!response.ok) {
        throw new Error("Failed to get the data from the backend");
      }
      //Convert the data in to Json
      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error("Get Service Error:", error);
      return { success: false, message: "Network Error" };
    }
  },
  //Delete service
  deleteService: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/services/remove/${id}`, {
        method: "PUT",
      });
      if (response.ok) {
        console.log("Service marked as deleted");
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Remove Service Error:", error);
      return { success: false, message: error.message };
    }
  },
  //get the selected service for edit form
  getOneService: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/services/select/${id}`, {
        method: "GET",
      });
      //convert the data into json
      const data = await response.json();
      return { success: true, data: data };
    } catch (error) {
      console.error("Select update service Error:", error);
      return { success: false, message: error.message };
    }
  },
  //edit service
  updateService: async (id, formData) => {
    try {
      const response = await fetch(`${API_URL}/api/services/update/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        console.log("Service Updated");
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Update service Error:", error);
      return { success: false, message: error.message };
    }
  },
};
