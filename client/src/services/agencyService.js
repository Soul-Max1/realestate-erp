import API from "./api";

const getAgencies = async () => {
  const response = await API.get("/agencies");
  return response.data;
};

const createAgency = async (agencyData) => {
  const response = await API.post(
    "/agencies",
    agencyData
  );

  return response.data;
};

const agencyService = {
  getAgencies,
  createAgency,
};

export default agencyService;