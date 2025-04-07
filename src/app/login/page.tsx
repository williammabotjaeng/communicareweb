"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAuth } from "@/providers/auth-providers";
import "@/styles/globals.css";
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import { Public, Email, Lock, Login as LoginIcon } from "@mui/icons-material";
import Link from "next/link";

const Login: React.FC = () => {
  const { login, loginIsLoading, loginError } = useAuth();
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Communicare color theme
  const theme = {
    colors: {
      primary: "#3D8BD3",     // Main blue color
      secondary: "#6E44FF",   // Secondary purple
      accent: "#00CCFF",      // Bright cyan accent
      dark: "#1A1F36",        // Dark background
      light: "#F7F9FC",       // Light background
      text: "#333333",        // Main text
      lightText: "#6B7280",   // Secondary text
      white: "#FFFFFF",       // White
    },
  };

  useEffect(() => {
    // Add animation effect on mount
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Watch for errors from auth provider
  useEffect(() => {
    if (loginError) {
      setSnackbar({
        open: true,
        message: loginError.message || "Login failed. Please try again.",
        severity: "error",
      });
    }
  }, [loginError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Login with email and password using auth provider
      await login({
        email: formData.email,
        password: formData.password,
      });

      // Show success message (though auth provider will redirect)
      setSnackbar({
        open: true,
        message: "Login successful! Redirecting...",
        severity: "success",
      });
    } catch (err) {
      // Error handling is done via the useEffect watching loginError
      console.error("Login submission error:", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa 0%, #E7F2FA 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: "absolute",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(61, 139, 211, 0.05) 0%, rgba(110, 68, 255, 0.05) 100%)",
          top: "-25vw",
          right: "-25vw",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(61, 139, 211, 0.05) 0%, rgba(110, 68, 255, 0.05) 100%)",
          bottom: "-15vw",
          left: "-15vw",
          zIndex: 0,
        }}
      />

      {/* Header Bar */}
      <Box
        sx={{
          py: 2,
          px: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255,255,255,0.8)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          position: "relative",
          zIndex: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Public sx={{ color: theme.colors.primary, fontSize: 32 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          >
            Communicare.world
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: theme.colors.lightText,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            Powered by Fetch.ai AgentVerse
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="xl"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            opacity: isPageLoading ? 0 : 1,
            transform: isPageLoading ? "translateY(20px)" : "translateY(0)",
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Login Form */}
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              width: { xs: "100%", sm: "450px" },
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 1,
                fontWeight: 700,
                color: theme.colors.primary,
                textAlign: "center",
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, color: theme.colors.lightText, textAlign: "center" }}
            >
              Sign in to your Communicare account
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                error={!!errors.email}
                helperText={errors.email || ""}
                sx={{ mb: 2 }}
                disabled={loginIsLoading}
                InputProps={{
                  startAdornment: (
                    <Email
                      sx={{ mr: 1, color: theme.colors.lightText }}
                      fontSize="small"
                    />
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                error={!!errors.password}
                helperText={errors.password || ""}
                sx={{ mb: 3 }}
                disabled={loginIsLoading}
                InputProps={{
                  startAdornment: (
                    <Lock
                      sx={{ mr: 1, color: theme.colors.lightText }}
                      fontSize="small"
                    />
                  ),
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
                <Link href="/forgot-password" passHref>
                  <MuiLink
                    sx={{
                      color: theme.colors.secondary,
                      fontWeight: 500,
                      fontSize: "0.875rem",
                    }}
                  >
                    Forgot password?
                  </MuiLink>
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loginIsLoading}
                startIcon={<LoginIcon />}
                sx={{
                  py: 1.5,
                  backgroundColor: theme.colors.primary,
                  "&:hover": {
                    backgroundColor: "#2e6eb0",
                  },
                }}
              >
                {loginIsLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                Don't have an account yet?{" "}
                <Link href="/register" passHref>
                  <MuiLink sx={{ color: theme.colors.secondary, fontWeight: 500 }}>
                    Sign up
                  </MuiLink>
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          py: 2,
          textAlign: "center",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255,255,255,0.8)",
          position: "relative",
          zIndex: 5,
        }}
      >
        <Typography variant="body2" color={theme.colors.lightText}>
          © {new Date().getFullYear()} Communicare.world — Connect your community with AI
        </Typography>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;