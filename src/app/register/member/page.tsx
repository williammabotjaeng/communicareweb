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
  Button,
  TextField,
  Divider,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import {
  Public,
  Groups,
  HealthAndSafety,
  Campaign,
  People,
} from "@mui/icons-material";
import Link from "next/link";
import LoadingScreen from "@/components/LoadingScreen";

// AgentVerse-inspired color scheme
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

const RegisterMember: React.FC = () => {
  const { register, isLoading, error, registerIsLoading } = useAuth();
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    // Add animation effect on mount
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Watch for errors from auth provider
  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: error.message || "Registration failed. Please try again.",
        severity: "error",
      });
    }
  }, [error]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form
    let hasErrors = false;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      hasErrors = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      hasErrors = true;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      hasErrors = true;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      hasErrors = true;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      try {
        // Format data for auth provider
        const registrationData = {
          displayName: formData.name,
          givenName: formData.name.split(" ")[0],
          surname: formData.name.split(" ").slice(1).join(" ") || "",
          email: formData.email,
          password: formData.password,
          user_type: "member", // Community member
        };

        // Call register from auth provider
        await register(registrationData);

        // Success message is handled by the auth provider,
        // which will automatically redirect after successful registration
      } catch (err) {
        console.error("Registration error:", err);
        // Error handling is done via the useEffect watching the error state from auth provider
      }
    }
  };

  // Removed Microsoft login method

  if (registerIsLoading) return <LoadingScreen />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.colors.light} 0%, #e0ebf9 100%)`,
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
          background: `radial-gradient(circle, rgba(61, 139, 211, 0.05) 0%, rgba(110, 68, 255, 0.05) 100%)`,
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
          background: `radial-gradient(circle, rgba(61, 139, 211, 0.05) 0%, rgba(110, 68, 255, 0.05) 100%)`,
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
              color: "#555",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Box
              component="img"
              src="https://img.shields.io/badge/innovationlab-3D8BD3"
              alt="Innovation Lab"
              sx={{ height: 16 }}
            />
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
            gap: 4,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Registration Form */}
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              width: { xs: "100%", md: "50%" },
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 1, fontWeight: 700, color: theme.colors.primary }}
            >
              Join Your Community
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
              Create your account to connect with your community and access AI-powered services
            </Typography>

            <Typography variant="body1" sx={{ mt: 1, mb: 3, color: "text.secondary", textAlign: "center" }}>
              Fill out the form below to join your community platform
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                error={!!errors.name}
                helperText={errors.name || ""}
                sx={{ mb: 2 }}
                disabled={isLoading}
              />

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
                disabled={isLoading}
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
                sx={{ mb: 2 }}
                disabled={isLoading}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword || ""}
                sx={{ mb: 3 }}
                disabled={isLoading}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  backgroundColor: theme.colors.primary,
                  "&:hover": {
                    backgroundColor: "#2e6eb0",
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Already have an account?{" "}
                <Link href="/login" passHref>
                  <MuiLink sx={{ color: theme.colors.secondary, fontWeight: 500 }}>
                    Sign in
                  </MuiLink>
                </Link>
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                Want to create a community?{" "}
                <Link href="/register/community" passHref>
                  <MuiLink sx={{ color: theme.colors.secondary, fontWeight: 500 }}>
                    Register a community
                  </MuiLink>
                </Link>
              </Typography>
            </Box>
          </Paper>

          {/* Benefits Section */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: 700,
                color: theme.colors.secondary,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Discover the Benefits
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: `${theme.colors.primary}15`,
                    p: 1.5,
                    borderRadius: 2,
                    color: theme.colors.primary,
                  }}
                >
                  <Groups />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Connect With Your Community
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Stay informed about community events, announcements, and initiatives through a unified platform.
                  </Typography>
                </Box>
              </Paper>

              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: `${theme.colors.secondary}15`,
                    p: 1.5,
                    borderRadius: 2,
                    color: theme.colors.secondary,
                  }}
                >
                  <HealthAndSafety />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Health & Wellness Support
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Access personalized health monitoring, medical resources, and wellness programs through our AI-powered platform.
                  </Typography>
                </Box>
              </Paper>

              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: `${theme.colors.accent}15`,
                    p: 1.5,
                    borderRadius: 2,
                    color: theme.colors.accent,
                  }}
                >
                  <Campaign />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    AI-Powered Assistance
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Benefit from 30+ specialized AI agents designed to enhance community living, education, safety, and more.
                  </Typography>
                </Box>
              </Paper>

              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  fontStyle: "italic",
                  color: "text.secondary",
                  textAlign: "center",
                }}
              >
                Join Communicare.world today and experience a stronger, more connected community!
              </Typography>
            </Box>
          </Box>
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
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Communicare.world — Transforming communities with AI-powered connectivity
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
          severity={snackbar.severity === "success" ? "success" : "error"}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterMember;