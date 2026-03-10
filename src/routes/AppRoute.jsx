import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
 import Signup from "../pages/Signup";
 import Dashboard from "../pages/Dashboard";
 import EmployeeList from "../pages/EmployeeList";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
<Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoute;