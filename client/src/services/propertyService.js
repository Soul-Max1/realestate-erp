import API from "./api";

const getProperties = async () => {
  const response = await API.get(
    "/properties"
  );

  return response.data;
};

const createProperty = async (
  propertyData
) => {
  const response = await API.post(
    "/properties",
    propertyData
  );

  return response.data;
};

const updateProperty = async (
  id,
  propertyData
) => {
  const response = await API.put(
    `/properties/${id}`,
    propertyData
  );

  return response.data;
};

const deleteProperty = async (
  id
) => {
  const response = await API.delete(
    `/properties/${id}`
  );

  return response.data;
};

const propertyService = {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
};


export default propertyService;