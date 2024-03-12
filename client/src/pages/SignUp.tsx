import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { useRef, useState } from "react";
import "./Login/Login.css";
import { useFormik } from "formik";
import { Link } from "@tanstack/react-router";
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const passwordhidden = useRef(null);
  const confirmpasswordhidden = useRef(null);

  const changeVisibility = () => {
    setShowPassword(!showPassword);
    if (showPassword) {
      passwordhidden.current.type = "password";
    } else {
      passwordhidden.current.type = "text";
    }
  };

  const changeVisibility2 = () => {
    setShowPassword2(!showPassword2);
    if (showPassword2) {
      confirmpasswordhidden.current.type = "password";
    } else {
      confirmpasswordhidden.current.type = "text";
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="login">
      <div className="containerlogin">
        <div className="box1">
          <div className="headinglogin">Sign Up</div>
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <div className="field">
              <input
                id="fullname"
                type="name"
                className="login-input"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Full Name"
              />
            </div>
            <div className="field">
              <input
                id="username"
                type="name"
                className="login-input"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Username"
              />
            </div>
            <div className="field">
              <input
                id="email"
                type="name"
                className="login-input"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email"
              />
            </div>
            <div className="field">
              <input
                id="password"
                type="password"
                ref={passwordhidden}
                placeholder="Password"
                className="login-input"
                value={formik.values.password}
                onChange={formik.handleChange}
                autoComplete="off"
              />
              <div
                className="eye"
                onClick={() => {
                  changeVisibility();
                }}
              >
                {showPassword ? (
                  <MdVisibilityOff
                    style={{
                      color: "#d7d7d7",
                      fontSize: "20px",
                    }}
                  />
                ) : (
                  <MdVisibility
                    style={{
                      color: "grey",
                      fontSize: "20px",
                    }}
                  />
                )}
              </div>
            </div>
            <div className="field">
              <input
                id="confirm password"
                type="password"
                placeholder="Confirm Password"
                ref={confirmpasswordhidden}
                className="login-input"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                autoComplete="off"
              />
              <div
                className="eye"
                onClick={() => {
                  changeVisibility2();
                }}
              >
                {showPassword2 ? (
                  <MdVisibilityOff
                    style={{
                      color: "#d7d7d7",
                      fontSize: "20px",
                    }}
                  />
                ) : (
                  <MdVisibility
                    style={{
                      color: "grey",
                      fontSize: "20px",
                    }}
                  />
                )}
              </div>
            </div>
            <button className="login-button" title="login" disabled={loading}>
              {loading ? (
                <RotatingLines strokeColor="#fff" height={15} width={15} />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="hother">Sign up to see weather updates, and more</div>
        </div>
        <div className="box1">
          <p>
            Have an account?{" "}
            <Link className="signup" to="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
