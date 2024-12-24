import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resData, setResData] = useState(null); // API response

  const handleRegisterNavigation = () => {
    navigate("/register");
  };

  const handleSubmit = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
      return;
    } else {
      setEmailError("");
    }

    if (password.length < 6 || password.length > 16) {
      setError("Password must be between 6 and 16 characters.");
      return;
    } else {
      setError("");
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
          "http://142.93.106.195:9090/auth/login",
          { email, password }
      );

      if (response.data && response.data.token && response.data.role) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        toast.success("Successfully logged in!", {
          position: "top-center",
          autoClose: 2000,
        });
        setResData(response.data);
        navigate(`/Header`); // Redirect to a dashboard or relevant page
      } else {
        setError("Incorrect email or password.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      // Handle role-based navigation
      if (role === "ROLE_SUPER_ADMIN") navigate("/result");
      else if (role === "ROLE_TESTER") navigate("/tester-dashboard");
      else if (role === "ROLE_ADMIN") navigate("/admin-dashboard");
      else navigate("/result");
    }
  }, []);

  const isLoginButtonDisabled =
      !(email && password) || !!error || !!emailError || isLoading;

  return (
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
          />
          {emailError && <p className="error-text">{emailError}</p>}
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
          />
          {error && <p className="error-text">{error}</p>}
          <button onClick={handleSubmit} disabled={isLoginButtonDisabled}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <ToastContainer />
        </div>
      </div>
  );
}

export default Login;
