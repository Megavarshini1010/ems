import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import EmployeeTable from "../components/dashboard/EmployeeTable";

const EmployeeList = () => {

  return (
    <DashboardLayout>

      <h3 className="mb-3">Employee List</h3>

      <EmployeeTable />

    </DashboardLayout>

  );
};

export default EmployeeList;