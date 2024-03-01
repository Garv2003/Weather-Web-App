import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { useRef, useState } from "react";
import "./Login.css";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [name, setname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          confirmpassword,
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
          <div className="headinglogin">Sign Up</div>
          <form className="login-form" onSubmit={handleSignUp}>
            <div className="field">
              <input
                id="fullname"
                type="name"
                value={name}
                className="login-input"
                onChange={(e) => setname(e.target.value)}
                placeholder="Full Name"
              />
            </div>
            <div className="field">
              <input
                id="username"
                type="name"
                value={username}
                className="login-input"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div className="field">
              <input
                id="email"
                type="name"
                value={email}
                className="login-input"
                onChange={(e) => setemail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            <a className="signup" to="/login">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
