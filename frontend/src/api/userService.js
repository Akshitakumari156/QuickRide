import apiClient from "./client";

export const updateProfile = (payload) =>
  apiClient.put("/api/user/profile", payload);

export const updatePassword = (payload) =>
  apiClient.put("/api/user/password", payload);

export const deleteAccount = () =>
  apiClient.delete("/api/user/account");

export const getRideHistory = () =>
  apiClient.get("/api/ride/history");
