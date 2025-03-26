import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const getUserByEmail = async (email) => {
  return await axios.get(`${API_URL}/${email}`);
};
