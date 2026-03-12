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
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    department: "",
  });

  // ==========================
  // FETCH  EMPLOYEES
  // ==========================

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();

        if (!data) return;

        const expanded = [];

        for (let i = 1; i <= data.length; i++) {
          const user = data[i % data.length];

          expanded.push({
            ...user,
            id: i,
            company: { name: user.company?.name || "HR" },
          });
        }

        setEmployees(expanded);
      } catch (err) {
        toast.error("Failed to load employees");
      }
    };

    fetchEmployees();
  }, []);

  // ==========================
  // SEARCH FILTER
  // ==========================

  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(e.id).includes(searchTerm),
  );

  // ==========================
  // PAGINATION
  // ==========================

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;

  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

  // ==========================
  // EXPORT EXCEL
  // ==========================

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      employees.map((emp) => ({
        ID: emp.id,
        Name: emp.name,
        Email: emp.email,
        Department: emp.company?.name || "General",
      })),
    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    XLSX.writeFile(workbook, "Employees.xlsx");

    toast.success("Excel Downloaded");
  };

  // ==========================
  // EXPORT PDF
  // ==========================

  const downloadPDF = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [["ID", "Name", "Email", "Department"]],

      body: employees.map((e) => [e.id, e.name, e.email, e.company?.name]),
    });

    doc.save("Employees.pdf");
  };

  // ==========================
  // ADD EMPLOYEE
  // ==========================

  const handleOpenAdd = () => {
    setIsEditing(false);

    setNewEmployee({
      name: "",
      email: "",
      department: "",
    });

    setShowModal(true);
  };

  // ==========================
  // EDIT EMPLOYEE
  // ==========================

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

  // ==========================
  // SAVE EMPLOYEE
  // ==========================

  const handleSave = () => {
    if (!newEmployee.name || !newEmployee.email) {
      toast.warning("Fill required fields");

      return;
    }

    if (isEditing) {
      const updated = employees.map((emp) =>
        emp.id === selectedEmployeeId
          ? {
              ...emp,
              name: newEmployee.name,
              email: newEmployee.email,
              company: { name: newEmployee.department },
            }
          : emp,
      );

      setEmployees(updated);

      toast.success("Employee Updated");
    } else {
      const newEmp = {
        id: employees.length + 1,

        name: newEmployee.name,

        email: newEmployee.email,

        company: { name: newEmployee.department },
      };

      setEmployees([newEmp, ...employees]);

      toast.success("Employee Added");
    }

    setShowModal(false);
  };

  // ==========================
  // DELETE EMPLOYEE
  // ==========================

  const handleDelete = (id) => {
    setEmployeeToDelete(id);

    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setEmployees(employees.filter((emp) => emp.id !== employeeToDelete));

    setShowDeleteModal(false);

    toast.success("Employee Deleted");
  };
  return (
    <div className="p-4">
      {/* TOP BAR */}

      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex gap-3">
          <input
            className="form-control border-orange search-input"
            placeholder="Search by name or id"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            className="form-select border-orange rows-select"
            style={{ width: "110px" }}
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
            <option value={20}>20 rows</option>
          </select>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={downloadExcel}>
            Excel
          </button>

          <button className="btn btn-danger" onClick={downloadPDF}>
            PDF
          </button>

          <button className="btn btn-primary" onClick={handleOpenAdd}>
            Add Employee
          </button>
        </div>
      </div>

      {/* TABLE */}

      <div className="table-responsive">
        <table className="table table-orange-zebra table-hover align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.company?.name}</td>

                <td className="text-center">
                  <button
                    className="btn btn-sm btn-light me-2"
                    onClick={() => handleEdit(emp)}
                  >
                    ✏️
                  </button>

                  <button
                    className="btn btn-sm btn-light text-danger"
                    onClick={() => handleDelete(emp.id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}

      <div className="d-flex justify-content-center mt-3">
        <ul className="pagination pagination-orange">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${currentPage === totalPages && "disabled"}`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </div>

      {/* ADD / EDIT MODAL */}

      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? "Edit Employee" : "Add Employee"}
                </h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Name"
                  value={newEmployee.name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, name: e.target.value })
                  }
                />

                <input
                  className="form-control mb-2"
                  placeholder="Email"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, email: e.target.value })
                  }
                />

                <input
                  className="form-control"
                  placeholder="Department"
                  value={newEmployee.department}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      department: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}

      {showDeleteModal && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5>Confirm Delete</h5>

                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>

              <div className="modal-body text-center">
                Delete this employee?
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
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
