import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function VerifyCode() {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    setError("");
  };

  const handleVerifyCode = async () => {
    if (code.length !== 5) {
      setError("Please enter the 5-digit verification code.");
      return;
    }

    try {
      const response = await axios.put(`http://142.93.106.195:9090/auth/activate?code=${code}`, "");

      if (response.data.success) {
        toast.success("Code verified successfully!");
        window.location.href = `/reset-password?token=${response.data.token}`;
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
    } catch (error: any) {
      toast.error("Error verifying code. Please try again later.");
      console.error("Verification error:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      <Box
        p={4}
        width={400}
        bgcolor="white"
        borderRadius={4}
        boxShadow={3}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Enter Verification Code
        </Typography>

        <Typography variant="body2" align="center" color="textSecondary">
          Please enter the 5-digit verification code sent to your email.
        </Typography>

        <TextField
          label="Verification Code"
          variant="outlined"
          type="text"
          value={code}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleVerifyCode}
          fullWidth
          sx={{
            borderRadius: "12px",
            padding: "10px 0",
            backgroundColor: "#007bff",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          Verify Code
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default VerifyCode;
