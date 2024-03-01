import { useState, useRef } from "react";
import "./Login.css";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="containerlogin">
        <div className="box1">
          <div className="headinglogin">Login</div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="field">
              <input
                id="username"
                type="text"
                className="login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Phone number, username, or email"
              />
            </div>
            <div className="field">
              <input
                id="password"
                value={password}
                className="login-input"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                ref={passwordhidden}
                placeholder="Password"
                autoComplete="on"
              />
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
            {/* <div className="separator">
              <div className="line"></div>
              <p>OR</p>
              <div className="line"></div>
            </div> */}
            <div className="other">
              {/* <button className="fb-login-btn" type="button">
                <i className="fa fa-facebook-official fb-icon"></i>
                <span className="facebooklogin">Log in with Facebook</span>
              </button> */}
              {/* <Link className="forgot-password" to="">
                Forgot password?
              </Link> */}
            </div>
          </form>
        </div>
        <div className="box1">
          <p>
            Don&apos;t have an account?{" "}
            <a className="signup" to="/signup">
              Sign Up
            </a>
          </p>
        </div>
        <div className="footer">Developed and Designed by Garv Aggarwal</div>
      </div>
    </div>
  );
}

export default Login;
