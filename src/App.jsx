import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoute from "./routes/AppRoute";

function App() {
  return (
    <>
      <AppRoute />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;