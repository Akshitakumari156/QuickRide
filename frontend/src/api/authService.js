import apiClient from "./client";


export const loginUser = (email, password) =>
  apiClient.post("/api/user/login", { email, password });

export const loginCaptain = (email, password) =>
  apiClient.post("/api/captain/login", { email, password });

export const registerUser = (payload) =>
  apiClient.post("/api/user/register", payload);

export const registerCaptain = (payload) =>
  apiClient.post("/api/captain/register", payload);

export const fetchProfile = (role) =>
  apiClient.get(role === "captain" ? "/api/captain/profile" : "/api/user/profile");

export const reverseGeocode = (lat, lng) =>
  apiClient.get("/api/location/reverse", { params: { lat, lng } });
