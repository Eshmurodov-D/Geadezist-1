import { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    if (!email) {
      toast.error("Iltimos, emailni kiriting.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put("http://142.93.106.195:9090/auth/forgot-password", { email });

      if (response.status === 200) {
        toast.success("Kod yuborildi, iltimos emailni tekshirib ko'ring.");
        navigate(`/reset-password?email=${email}`); 
      }
    } catch (error: any) {
      toast.error("Email manzilingiz bilan hisob topilmadi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f9f9f9">
      <Box p={4} width={400} bgcolor="white" borderRadius={4} boxShadow={3} display="flex" flexDirection="column" gap={3}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Forgot Password
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSendCode}
          fullWidth
          sx={{
            borderRadius: "12px",
            padding: "10px 0",
            backgroundColor: "#5213e7", 
            "&:hover": {
              backgroundColor: "#3701b1",
            },
            fontSize: '16px',
          }}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Code"}
        </Button>
      </Box>

      <ToastContainer />
    </Box>
  );
}

export default ForgotPassword;
