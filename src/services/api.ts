import axios, { AxiosInstance } from "axios";
import { User, CreateUserDto, Activity, CreateActivityDto } from "../types/User";

const API_BASE_URL = "http://localhost:3000";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

// Fetch a specific user
export const fetchUser = async (userId: string): Promise<User> => {
  const response = await api.get<User>(`/users/${userId}`);
  return response.data;
};

// Create a new user
export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const response = await api.post<User>("/users", userData);
  return response.data;
};

// Fetch all activities
export const fetchActivities = async (): Promise<Activity[]> => {
  const response = await api.get<Activity[]>("/activities");
  console.log("fetchActivities", response.data);
  return response.data;
};

//Fetch all activities for a specific user
/* export const fetchUserActivities = async (userId: string): Promise<any[]> => {
  const response = await api.get(`/activities/user/${userId}`);
  return response.data;
}; */

export const fetchUserActivities = async (userId: string): Promise<Activity[]> => {
  try {
    const response = await api.get<Activity[]>(`/activities/user/${userId}`);
    console.log("fetchUserActivities", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching activities for user ${userId}:`, error);
    throw error;
  }
};

//Create a new activity for a specific user
export const createActivity = async (userId: string, activityData: CreateActivityDto): Promise<Activity> => {
  const response = await api.post<Activity>(`/activities?${userId}`, activityData);
  console.log("createActivity", response.data);
  console.log("createActivity userId", userId);
  return response.data;
};

// Update a specific activity
export const updateActivity = async (activityId: string, activityData: Partial<CreateActivityDto>): Promise<Activity> => {
  const response = await api.put<Activity>(`/activities/${activityId}`, activityData);
  console.log("updateActivity", response.data);
  console.log("updateActivity activityId", activityId);
  return response.data;
};

//Delete a specific activity
/* export const deleteActivity = async (activityId: string): Promise<any> => {
  const response = await api.delete(`/activities/${activityId}`);
  return response.data;
}; */

// Delete a specific activity
export const deleteActivity = async (activityId: string): Promise<void> => {
  await api.delete(`/activities/${activityId}`);
};

export default api;
