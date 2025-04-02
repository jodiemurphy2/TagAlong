import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

export const getUserByEmail = async (email) => {
  return await axios.get(`${API_URL}/users/${email}`);
};
