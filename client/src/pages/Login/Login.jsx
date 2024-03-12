import { useState, useRef } from "react";
import "./Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "@tanstack/react-router";

function Login() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Required")
        .email("Invalid email address"),
      password: Yup.string()
        .required("Required")
        .min(8, "Must be 8 characters or more")
        .max(20, "Must be 20 characters or less"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const passwordhidden = useRef(null);

  const changeVisibility = () => {
    setShowPassword(!showPassword);
    if (showPassword) {
      passwordhidden.current.type = "password";
    } else {
      passwordhidden.current.type = "text";
    }
  };

  return (
    <div className="login">
      <div className="containerlogin">
        <div className="box1">
          <div className="headinglogin">Login</div>
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <div className="field">
              <input
                id="username"
                type="text"
                className="login-input"
                placeholder="Phone number, username, or email"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="error">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="field">
              <input
                id="password"
                value={formik.values.password}
                className="login-input"
                onChange={formik.handleChange}
                type="password"
                ref={passwordhidden}
                placeholder="Password"
                autoComplete="on"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
              <div className="eye" onClick={() => changeVisibility()}>
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
            <button
              className="login-button"
              type="submit"
              title="Login"
              disabled={loading}
            >
              {loading ? (
                <RotatingLines strokeColor="#fff" height={15} width={15} />
              ) : (
                "Log In"
              )}
            </button>
            <div className="other">
              {/* <Link className="forgot-password" to="">
                Forgot password?
              </Link> */}
            </div>
          </form>
        </div>
        <div className="box1">
          <p>
            Don&apos;t have an account?{" "}
            <Link className="signup" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="footer">Developed and Designed by Garv Aggarwal</div>
      </div>
    </div>
  );
}

export default Login;
