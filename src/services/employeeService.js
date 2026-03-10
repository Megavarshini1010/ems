const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const getEmployees = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};