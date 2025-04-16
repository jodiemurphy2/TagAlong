import axiosInstance from "../api/axios"; // Import the Axios instance from axios.js

// API service for Authentication
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data; 
};

export const registerUser = async (userDetails) => {
  const response = await axiosInstance.post("/auth/register", userDetails);
  return response.data; 
};

// API service for Event operations
export const getEvents = async (searchParams) => {
  const response = await axiosInstance.get("/events", { params: searchParams });
  return response.data; 
};

export const createEvent = async (eventData) => {
  try {
    const response = await axiosInstance.post("/events", eventData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const tagAlong = async (eventId) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.post(`/events/${eventId}/tag-along`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getTaggedEvents = async () => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get('/events/tagged', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
 });
  return response.data;
};

export const getMyEvents = async () => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get("/events/my-events", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
   });
  return response.data;
};

export const deleteEvent = async (eventId) => {
  const response = await axiosInstance.delete(`/events/${eventId}`);
  return response.data;
};

// Search events
export const searchEvents = async (name, category, date) => {
  return axiosInstance.get(`/events/search`, {
    params: { name, category, date }
  });
};

// Search events by category and date
export const searchEventsByCategoryAndDate = async (category, date) => {
  return axiosInstance.get(`/events/search`, {
    params: { category, date }
  });
};