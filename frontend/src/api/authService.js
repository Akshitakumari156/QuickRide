import apiClient from "./client";

/**
 * All auth-related network calls in one place.
 * Every function returns { data } on success and throws the axios error on failure,
 * so callers handle UI/error messaging with a single try/catch.
 */

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
