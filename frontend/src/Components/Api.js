import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;;

export const submitClaim = async (formData) => {
  try {
    // Send the POST request with the formData object
    const response = await axios.post(`${API_BASE_URL}/claims`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.message;
  } catch (error) {
    // Extract error message from response or default to a generic message
    const errorMessage = error.response?.data?.error || 'Error submitting claim.';
    throw new Error(errorMessage);
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
