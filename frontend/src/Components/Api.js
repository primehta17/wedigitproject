import axios from "axios";

const API_BASE_URL = "http://localhost:7000/api";

export const submitClaim = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/claims`, formData);
    return response.data.message;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error submitting claim."
    );
  }
};

export const fetchClaims = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/claims`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching claims.");
  }
};
