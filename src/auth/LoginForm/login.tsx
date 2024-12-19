import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, TextField, Grid } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        console.log("Login muvaffaqiyatli:", response.data); // Qo'shilgan log
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("role", response.data.role);
        toast.success("Siz muvaffaqiyatli tizimga kirdingiz!", {
          position: "top-center",
          autoClose: 2000,
        });
      
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

  const isLoginButtonDisabled =
    !(email && password) || !!error || !!emailError || isLoading;

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        bgcolor: "#fff",
        padding: 0,
        margin: 0,
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          bgcolor: "#fff",
          height: "100vh",
          padding: 0,
        }}
      ></Grid>

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
          />

          <TextField
            label="Парол"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            }}
          >
            {isLoading ? "Kirish..." : "Тизимга кириш"}
          </Button>

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

      <ToastContainer />
    </Grid>
  );
}

export default Login;
