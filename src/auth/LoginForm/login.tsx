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
      setEmailError("Iltimos, to'g'ri email kiriting.");
      return;
    } else {
      setEmailError("");
    }

    if (password.length < 6 || password.length > 16) {
      setError("Parol uzunligi 6-16 belgidan iborat bo'lishi kerak.");
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
        toast.success("Muvaffaqiyatli tizimga kirdingiz!", {
          position: "top-center",
          autoClose: 2000,
        });
        setResData(response.data);
        navigate(`/Header`); // Redirect to a dashboard or relevant page
      } else {
        setError("Email yoki parol noto'g'ri.");
      }
    } catch (error) {
      console.error(error);
      setError("Xatolik yuz berdi. Qayta urinib ko'ring.");
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
      <div className="login-container" style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
        <div className="login-form" style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Tizimga kirish</h2>
          <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Elektron pochtangizni kiriting"
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {emailError && <p className="error-text" style={{ color: 'red', fontSize: '14px' }}>{emailError}</p>}
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parolni kiriting"
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {error && <p className="error-text" style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
          <button
              onClick={handleSubmit}
              disabled={isLoginButtonDisabled}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: isLoginButtonDisabled ? '#ccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isLoginButtonDisabled ? 'not-allowed' : 'pointer',
                fontSize: '16px',
              }}
          >
            {isLoading ? "Kirish..." : "Tizimga kirish"}
          </button>
          <p style={{ marginTop: '10px' }}>
            <a href="#" onClick={handleRegisterNavigation} style={{ color: '#4CAF50', textDecoration: 'none' }}>Ro'yxatdan o'tish</a>
          </p>
          <ToastContainer />
        </div>
      </div>
  );
}

export default Login;
