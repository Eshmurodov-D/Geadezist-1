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
  const [resData, setResData] = useState(null); // API javobini saqlash uchun

  const handleRegisterNavigation = () => {
    navigate("/register");
  };

  const handleSubmit = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    if (!emailRegex.test(email)) {
      setEmailError("Iltimos, to'g'ri email manzilini kiriting.");
      return;
    } else {
      setEmailError("");
    }

    if (password.length < 6 || password.length > 16) {
      setError("Parol 6 tadan kam va 16 tadan ko'p bo'lmasin.");
      return;
    } else {
      setError("");
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://142.93.106.195:9090/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data && response.data.token && response.data.role) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        toast.success("Siz muvaffaqiyatli tizimga kirdingiz!", {
          position: "top-center",
          autoClose: 2000,
        });
<<<<<<< HEAD
        setResData(response.data); // API javobini saqlash

=======
      
        switch (response.data.role) {
          case "ROLE_ADMIN":
            window.location.pathname = "/admin-dashboard";
            break;
          case "ROLE_SUPER_ADMIN":
            window.location.pathname = "/dashboard";
            break;
          case "ROLE_TESTER":
            window.location.pathname = "/tester-dashboard";
            break;
          case "ROLE_USER":
            window.location.pathname = "/user-dashboard";
            break;
          case "ROLE_CLIENT":
            window.location.pathname = "/test";
            break;
          default:
            window.location.pathname = "/dashboard";
        }
>>>>>>> 2c0f700293039d8b962f2b91c4adfff6ff909f4d
      } else {
        setError("Email yoki parol noto'g'ri.");
      }
      
    } catch (error) {
      console.error(error);
      setError("Tizimda xatolik yuz berdi, iltimos qayta urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  // useEffect faqat resData o'zgarganda ishga tushadi
  useEffect(() => {
    if (resData) {
      setResData(null); // resData ni qayta null qilish
      setEmail('');
      setPassword('');
      const role = localStorage.getItem('role');
      
      if (role === 'ROLE_SUPER_ADMIN') navigate('/result');
      if (role === 'ROLE_TESTER') navigate('/tester-dashboard');
      if (role === 'ROLE_ADMIN') navigate('/admin-dashboard');
      if (role === 'ROLE_CLIENT') navigate('/result');
      else navigate('/register');
    }
  }, [resData]); // resData o'zgarganda faqat ishlaydi

  const isLoginButtonDisabled = !(email && password) || !!error || !!emailError || isLoading;
=======
  const isLoginButtonDisabled =
    !(email && password) || !!error || !!emailError || isLoading;
>>>>>>> 2c0f700293039d8b962f2b91c4adfff6ff909f4d

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#fff", padding: 0, margin: 0 }}>
      <div style={{ width: "100%", maxWidth: "550px", padding: "30px", borderRadius: "8px", backgroundColor: "#fff" }}>
        <h2 style={{ fontSize: "36px", textAlign: "center", fontWeight: "bold", marginBottom: "20px" }}>
          Тизимга кириш
        </h2>

<<<<<<< HEAD
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ fontSize: "16px" }}>Електрон почта</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              marginTop: "5px",
              border: emailError ? "2px solid red" : "1px solid #ccc",
            }}
=======
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          bgcolor: "white",
          height: "100vh",
          padding: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            width: "100%",
            padding: 6,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            fontSize="36px"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Тизимга кириш
          </Typography>

          <TextField
            label="Електрон почта"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            margin="normal"
            sx={{ fontSize: "16px" }}
>>>>>>> 2c0f700293039d8b962f2b91c4adfff6ff909f4d
          />
          {emailError && <small style={{ color: "red", fontSize: "12px" }}>{emailError}</small>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ fontSize: "16px" }}>Парол</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              marginTop: "5px",
              border: error ? "2px solid red" : "1px solid #ccc",
=======
            error={!!error}
            helperText={error}
            margin="normal"
            sx={{ fontSize: "16px" }}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            fullWidth
            disabled={isLoginButtonDisabled}
            sx={{
              marginTop: 3,
              fontSize: "16px",
              backgroundColor: "#5213e7",
              "&:hover": {
                backgroundColor: "#3701b1",
              },
>>>>>>> 2c0f700293039d8b962f2b91c4adfff6ff909f4d
            }}
          />
          {error && <small style={{ color: "red", fontSize: "12px" }}>{error}</small>}
        </div>

<<<<<<< HEAD
        <button
          onClick={handleSubmit}
          disabled={isLoginButtonDisabled}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            backgroundColor: "#5213e7",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: isLoginButtonDisabled ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Kirish..." : "Тизимга кириш"}
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button
            onClick={handleRegisterNavigation}
            style={{ fontSize: "12px", color: "#5213e7", background: "none", border: "none", cursor: "pointer" }}
          >
            Рўйхатдан ўтиш
          </button>
          <button
            onClick={() => navigate("/changepass")}
            style={{ fontSize: "12px", color: "#5213e7", background: "none", border: "none", cursor: "pointer" }}
          >
            Паролни унутдингизми?
          </button>
        </div>
      </div>
=======
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="text"
              color="primary"
              onClick={handleRegisterNavigation}
              sx={{
                fontSize: "12px",
                color: "#5213e7",
                textTransform: "none",
                "&:hover": {
                  color: "#3701b1",
                },
              }}
            >
              Рўйхатдан ўтиш
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() => navigate("/changepass")}
              sx={{
                fontSize: "12px",
                color: "#5213e7",
                textTransform: "none",
                "&:hover": {
                  color: "#3701b1",
                },
              }}
            >
              Паролни унутдингизми?
            </Button>
          </Box>
        </Box>
      </Grid>
>>>>>>> 2c0f700293039d8b962f2b91c4adfff6ff909f4d

      <ToastContainer />
    </div>
  );
}

export default Login;
