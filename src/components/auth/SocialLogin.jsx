import React from "react";
import googleIcon from "../../assets/images/google.png";
import githubIcon from "../../assets/images/github.png";

const SocialLogin = () => {
  return (
    <>
      <div className="text-center my-3">
        <span className="text-muted">or continue with</span>
      </div>
<div className="d-grid gap-2">
        <button 
          type="button" 
          className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2 rounded-3"
        >
          <img src={googleIcon} alt="Google" width="20" height="20" />
          Google
        </button>
   <button 
          type="button" 
          className="btn btn-outline-dark d-flex align-items-center justify-content-center gap-2 rounded-3"
        >
          <img src={githubIcon} alt="GitHub" width="20" height="20" />
           GitHub
        </button>
      </div>
    </>
  );
};
export default SocialLogin;