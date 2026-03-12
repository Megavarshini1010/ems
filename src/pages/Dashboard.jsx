import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getEmployees } from "../services/employeeService";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await getEmployees();
      setEmployeeCount(data.length);
    };

    loadEmployees();
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-bg">
        <div className="dashboard-card">
          <div className="card-icon">
            <i className="bi bi-people-fill"></i>
          </div>

          <div>
            <h6>Total Employees</h6>
            <h2 className="count-number">{employeeCount}</h2>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
