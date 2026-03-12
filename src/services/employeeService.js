import { ENDPOINTS } from "../api/api";

// ===============================
// GET ALL EMPLOYEES
// ===============================
export const getEmployees = async () => {
  try {
    const res = await fetch(ENDPOINTS.users);
    return await res.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

// ===============================
// GET EMPLOYEE BY ID
// ===============================
export const getEmployeeById = async (id) => {
  try {
    const res = await fetch(`${ENDPOINTS.users}/${id}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching employee:", error);
  }
};

// ===============================
// SEARCH EMPLOYEE BY NAME
// ===============================
export const searchEmployeeByName = async (name) => {
  try {
    const res = await fetch(`${ENDPOINTS.users}?name=${name}`);
    return await res.json();
  } catch (error) {
    console.error("Error searching employee:", error);
    return [];
  }
};

// ===============================
// CREATE EMPLOYEE
// ===============================
export const createEmployee = async (data) => {
  try {
    const res = await fetch(ENDPOINTS.users, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    console.error("Error creating employee:", error);
  }
};

// ===============================
// UPDATE EMPLOYEE
// ===============================
export const updateEmployee = async (id, data) => {
  try {
    const res = await fetch(`${ENDPOINTS.users}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    console.error("Error updating employee:", error);
  }
};

// ===============================
// DELETE EMPLOYEE
// ===============================
export const deleteEmployee = async (id) => {
  try {
    await fetch(`${ENDPOINTS.users}/${id}`, {
      method: "DELETE",
    });

    return true;
  } catch (error) {
    console.error("Error deleting employee:", error);
    return false;
  }
};