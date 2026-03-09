import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;