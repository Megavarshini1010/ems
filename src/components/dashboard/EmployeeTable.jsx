import React, { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeService";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const EmployeeTable = () => {

  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };

    fetchEmployees();

  }, []);

  // PDF DOWNLOAD
  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.text("Employee List", 20, 10);

    employees.forEach((emp, index) => {
      doc.text(
        `${emp.id}  ${emp.name}  ${emp.email}`,
        10,
        20 + index * 10
      );
    });

    doc.save("employees.pdf");
  };

  // EXCEL DOWNLOAD
  const downloadExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    XLSX.writeFile(workbook, "employees.xlsx");
  };

  return (

    <div className="card shadow-sm p-3">

      {/* Top Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">

        <div>
          <button
            className="btn btn-danger me-2"
            onClick={downloadPDF}
          >
            PDF
          </button>

          <button
            className="btn btn-success"
            onClick={downloadExcel}
          >
            Excel
          </button>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Add Employee
        </button>

      </div>

      {/* Responsive Table */}
      <div className="table-responsive">

        <table className="table table-bordered table-striped">

          <thead className="table-dark">

            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>

          </thead>

          <tbody>

            {employees.map(emp => (

              <tr key={emp.id}>

                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.company.name}</td>

                <td>
                  <button className="btn btn-warning btn-sm">
                    Edit
                  </button>
                </td>

                <td>
                  <button className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Add Employee Modal */}
      {showModal && (

        <div className="modal show d-block">

          <div className="modal-dialog">

            <div className="modal-content">

              <div className="modal-header">

                <h5 className="modal-title">
                  Add Employee
                </h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>

              </div>

              <div className="modal-body">

                <input
                  className="form-control mb-2"
                  placeholder="Employee Name"
                />

                <input
                  className="form-control mb-2"
                  placeholder="Email"
                />

                <input
                  className="form-control mb-2"
                  placeholder="Department"
                />

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>

                <button className="btn btn-primary">
                  Save
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );
};

export default EmployeeTable;