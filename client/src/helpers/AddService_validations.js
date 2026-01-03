export const validateServiceData = (formData) => {
  //create an object to store the error
  const errors = {};
  //Check validation
  if (!formData.name || formData.name.trim() === "") {
    errors.name = "Service Name is required";
  }
  if (!formData.description || formData.description.trim() === "") {
    errors.description = "Service Description is required";
  }
  //Price sectino
  if (
    !formData.price ||
    formData.price.trim() === "" ||
    isNaN(formData.price) ||
    Number(formData.price) < 0
  ) {
    errors.price = "Service Price must be a valid positive number";
  }

  //Check if there are any errors
  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
};
