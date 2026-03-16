import { API_ENDPOINTS } from "../api/api";

export const loginUser = async (username, password) => {
  try {

    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data.data;

  } catch (error) {
    throw error;
  }
};