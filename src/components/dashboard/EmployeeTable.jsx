import React, { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeService";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 5;

const indexOfLast = currentPage * rowsPerPage;
const indexOfFirst = indexOfLast - rowsPerPage;

const currentEmployees = employees.slice(indexOfFirst, indexOfLast);

const totalPages = Math.ceil(employees.length / rowsPerPage);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    department: "",
  });
useEffect(() => {
  const empData = [];

  for (let i = 1; i <= 40; i++) {
    empData.push({
      id: i,
      name: `Employee ${i}`,
      email: `employee${i}@mail.com`,
      department: "HR"
    });
  }

  setEmployees(empData);
}, []);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data || []);
      } catch (error) {
        toast.error("Failed to load data");
      }
    };
    fetchEmployees();
  }, []);

  // --- Export Functions ---
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      employees.map((emp) => ({
        ID: emp.id,
        Name: emp.name,
        Email: emp.email,
        Dept: emp.company?.name || "N/A",
      })),
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "Employees.xlsx");
    toast.success("Excel Downloaded!");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["ID", "Name", "Email", "Dept"]],
      body: employees.map((e) => [e.id, e.name, e.email, e.company?.name]),
    });
    doc.save("Employees.pdf");
  };
  // add
  const handleOpenAdd = () => {
    setIsEditing(false);
    setNewEmployee({ name: "", email: "", department: "" });
    setShowModal(true);
  };
  // edit
  const handleEdit = (emp) => {
    setIsEditing(true);
    setSelectedEmployeeId(emp.id);
    setNewEmployee({
      name: emp.name,
      email: emp.email,
      department: emp.company?.name || "",
    });
    setShowModal(true);
  };
  // save
  const handleSave = () => {
    if (!newEmployee.name || !newEmployee.email) {
      toast.warning("Please fill required fields");
      return;
    }

    if (isEditing) {
      const updatedEmployees = employees.map((emp) =>
        emp.id === selectedEmployeeId
          ? {
              ...emp,
              name: newEmployee.name,
              email: newEmployee.email,
              company: { name: newEmployee.department },
            }
          : emp,
      );

      setEmployees(updatedEmployees);
      toast.success("Employee Updated Successfully!");
    } else {
      const freshEmployee = {
        id: Date.now(),
        name: newEmployee.name,
        email: newEmployee.email,
        company: { name: newEmployee.department },
      };

      setEmployees([freshEmployee, ...employees]);
      toast.success("Employee Added Successfully!");
    }

    setShowModal(false);
  };
  const handleDelete = (id) => {
    setEmployeeToDelete(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    const filteredEmployees = employees.filter(
      (emp) => emp.id !== employeeToDelete,
    );
    setEmployees(filteredEmployees);
    setShowDeleteModal(false);
    toast.success("Employee Deleted Successfully!");
  };
  return (
    <div className="orange-shadow-card p-4 animate-fade">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div
          className="d-flex align-items-center gap-2"
          style={{ maxWidth: "400px" }}
        >
          {/* Search */}
          <div className="input-group">
            <span className="input-group-text bg-white border-orange">
              <i className="bi bi-search"></i>
            </span>

            <input
              type="text"
              className="form-control border-orange"
              placeholder="Search by ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-success" onClick={downloadExcel}>
            <i className="bi bi-file-earmark-excel"></i> Excel
          </button>
          <button className="btn btn-outline-danger" onClick={downloadPDF}>
            <i className="bi bi-file-earmark-pdf"></i> PDF
          </button>
          <button
            className="btn btn-primary px-4 fw-bold"
            onClick={handleOpenAdd}
          >
            + Add Employee
          </button>
        </div>
      </div>

      <div className="table-responsive rounded-3">
        <table className="table table-orange-zebra align-middle">
          <thead>
            <tr>
              <th className="py-3 ps-3 text-white">ID</th>
              <th className="py-3 text-white">Name</th>
              <th className="py-3 text-white">Email</th>
              <th className="py-3 text-white">Department</th>
              <th className="py-3 text-center text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter(
                (e) =>
                  e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  String(e.id).includes(searchTerm),
              )
            
              .map((emp) => (
                <tr key={emp.id}>
                  <td className="ps-3 fw-bold">#{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>
                    <span className="badge bg-white text-dark border">
                      {emp.company?.name || "General"}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-light text-primary me-2"
                      onClick={() => handleEdit(emp)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      className="btn btn-sm btn-light text-danger"
                      onClick={() => handleDelete(emp.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* --- Pagination --- */}
<div className="d-flex justify-content-center mt-3">
  <nav>
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
      </li>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</div>
      </div>

      {/* --- ADD EMPLOYEE MODAL --- */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content border-0 shadow-lg"
              style={{ borderRadius: "15px" }}
            >
              <div
                className="modal-header bg-primary text-white"
                style={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              >
                <h5 className="modal-title fw-bold">
                  {isEditing ? "Edit Employee" : "Add New Employee"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label fw-bold small">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmployee.name}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, name: e.target.value })
                    }
                    placeholder="Enter name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold small">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={newEmployee.email}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, email: e.target.value })
                    }
                    placeholder="Enter email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold small">Department</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmployee.department}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        department: e.target.value,
                      })
                    }
                    placeholder="e.g. IT, HR, Sales"
                  />
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn btn-light"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary px-4" onClick={handleSave}>
                  Save Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content border-0 shadow-lg"
              style={{ borderRadius: "15px" }}
            >
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title fw-bold">Confirm Delete</h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>

              <div className="modal-body text-center p-4">
                <p className="fw-semibold">
                  Do you want to delete this employee?
                </p>
              </div>

              <div className="modal-footer border-0 justify-content-center">
                <button
                  className="btn btn-light"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-danger px-4" onClick={confirmDelete}>
                  Yes, Delete
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
