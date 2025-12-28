export const EditFormValidation = (formData) => {
  //create an object to store the errors
  const errors = {};
  //Check Validation
  //Type section
  if (!formData.roomType || formData.roomType.trim() === "") {
    errors.roomType = "Room Type is required";
  }
  //Name section
  if (!formData.roomName || formData.roomName.trim() === "") {
    errors.roomName = "Room Name is required";
  }
  //Location Section
  if (!formData.roomLocation || formData.roomLocation.trim() === "") {
    errors.roomLocation = "Room Location is required";
  }
  //Description section
  if (!formData.roomDescription || formData.roomDescription.trim() === "") {
    errors.roomDescription = "Room Description is required";
  }
  //Price section
  if (
    !formData.roomPrice ||
    formData.roomPrice === "" ||
    isNaN(formData.roomPrice) ||
    Number(formData.roomPrice) < 0
  ) {
    errors.roomPrice = "Room Price must be a valid positive number";
  }
  //Capacity Section
  if (!formData.roomCapacity || formData.roomCapacity === "") {
    errors.roomCapacity = "Room Capacity is required";
  }
  //Floor Section
  if (
    !formData.floor ||
    formData.floor === "" ||
    isNaN(formData.floor) ||
    Number(formData.floor) < 0
  ) {
    errors.floor = "Room Floor must be a valid positive number";
  }
  //Size Section
  if (
    !formData.roomSize ||
    formData.roomSize === "" ||
    isNaN(formData.roomSize) ||
    Number(formData.roomSize) < 0
  ) {
    errors.roomSize = "Room Size must be a valid positive number";
  }
  //View Section
  if (!formData.roomView || formData.roomView.trim() === "") {
    errors.roomView = "Room View is required";
  }
  //Room Status Section
  if (!formData.defaultStatus || formData.defaultStatus.trim() === "") {
    errors.defaultStatus = "Room Status is required";
  }
  //Images Section

  const existingCount = formData.existingImages?.length || 0;
  const newCount = formData.newImages?.length || 0;
  const totalImages = existingCount + newCount;

  // At least one image required
  if (totalImages === 0) {
    errors.roomImages = "At least one image is required";
  }

  // Maximum 5 images allowed
  else if (totalImages > 5) {
    errors.roomImages = "The maximum number of images you can upload is 5";
  }
  //Check if the location and view can match
  if (
    (formData.roomLocation === "Kandy" && formData.roomView === "Sea") ||
    (formData.roomLocation === "Kandy" && formData.roomView === "Beach side")
  ) {
    errors.roomImages =
      "The selected location and view cannot be linked togather";
  }
  //Check if there are any errors
  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
};
