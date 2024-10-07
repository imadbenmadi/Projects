export function objectToFormData(obj) {
  const formData = new FormData();

  // Iterate over the properties of the object
  for (const key in obj) {
    // Check if the property is not inherited from prototype chain
    if (obj.hasOwnProperty(key)) {
      // Append the property and its value to the FormData instance
      formData.append(key, obj[key]);
    }
  }

  return formData;
}

export function objectToFormDataUpdateProduct(obj) {
  const formData = new FormData();

  // Iterate over the properties of the object
  for (const key in obj) {
    // Check if the property is not inherited from prototype chain
    if (obj.hasOwnProperty(key)) {
      // Append the property and its value to the FormData instance
      if (key === "image") {
        formData.append(key, obj[key]);
      }
      if (key === "Telephone") {
        formData.append(key, obj[key]);
      }
      if (key === "StoreName") {
        formData.append(key, obj[key]);
      }
      if (key === "Telephone") {
        formData.append(key, obj[key]);
      }
    }

    return formData;
  }
}
