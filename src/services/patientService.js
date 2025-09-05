import api from "./apiService";

export const registerPatient = async (patientData) => {
  const response = await api.post("/patients/register", patientData);
  return response.data;
};

export const getPatients = async () => {
  const response = await api.get("/patients");
  return response.data;
};