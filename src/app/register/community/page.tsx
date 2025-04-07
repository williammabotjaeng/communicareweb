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
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";

import {
  Public,
  HealthAndSafety,
  Campaign,
  Groups,
  School,
  People,
} from "@mui/icons-material";
import Link from "next/link";
import LoadingScreen from "@/components/LoadingScreen";

// Environment variables
const ENV = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_HELP_BOT_URL: process.env.NEXT_PUBLIC_HELP_BOT_URL,
};

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

const RegisterCommunity = () => {
  const { register, isLoading, error, registerIsLoading } = useAuth(); // Use auth hook functions
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Community info
    communityName: "",
    communityEmail: "",
    phoneNumber: "",
    address: "",
    // Admin info
    adminName: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    communityName: "",
    communityEmail: "",
    phoneNumber: "",
    address: "",
    adminName: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const steps = ["Community Information", "Admin Account Details"];

  useEffect(() => {
    // Add animation effect on mount
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show snackbar for auth errors
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

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const validateCommunityInfo = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formData.communityName.trim()) {
      newErrors.communityName = "Community name is required";
      isValid = false;
    }

    if (!formData.communityEmail.trim()) {
      newErrors.communityEmail = "Community email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.communityEmail)) {
      newErrors.communityEmail = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateAccountDetails = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formData.adminName.trim()) {
      newErrors.adminName = "Name is required";
      isValid = false;
    }

    if (!formData.adminEmail.trim()) {
      newErrors.adminEmail = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) {
      newErrors.adminEmail = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (activeStep === 0 && validateCommunityInfo()) {
      setActiveStep(1);
    }
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!validateAccountDetails()) {
      setLoading(false);
      return;
    }

    try {
      // Create formatted registration data for auth provider
      const registrationData = {
        displayName: formData.adminName,
        givenName: formData.adminName.split(" ")[0],
        surname: formData.adminName.split(" ").slice(1).join(" "),
        email: formData.adminEmail,
        password: formData.password,
        user_type: "admin",
        mobile_number: formData.phoneNumber,
        company_name: formData.communityName,
        business_address: formData.address,
      };

      // Use the register function from auth provider
      await register(registrationData);

      // Show success message
      setSnackbar({
        open: true,
        message: "Registration successful! Redirecting to Dashboard...",
        severity: "success",
      });

      setLoading(false);

      // Note: no need to manually redirect - the auth provider will handle this
    } catch (err) {
      // Error handling is now done via the useEffect watching the error state
      console.error("Registration error:", err);
      setLoading(false);
    }
  };

  const handleHome = () => {
    router.replace("/");
  };

  // Render form based on active step
  const renderForm = () => {
    if (activeStep === 0) {
      return (
        <form>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Tell us about your community
          </Typography>

          <TextField
            fullWidth
            label="Community Name"
            name="communityName"
            value={formData.communityName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.communityName}
            helperText={errors.communityName || ""}
            sx={{ mb: 2 }}
            disabled={isLoading}
          />

          <TextField
            fullWidth
            label="Community Email"
            name="communityEmail"
            type="email"
            value={formData.communityEmail}
            onChange={handleChange}
            margin="normal"
            error={!!errors.communityEmail}
            helperText={errors.communityEmail || ""}
            sx={{ mb: 2 }}
            disabled={isLoading}
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            margin="normal"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber || ""}
            sx={{ mb: 2 }}
            disabled={isLoading}
          />

          <TextField
            fullWidth
            label="Community Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
            error={!!errors.address}
            helperText={errors.address || ""}
            sx={{ mb: 3 }}
            disabled={isLoading}
          />

          <Button
            variant="contained"
            onClick={handleNext}
            disabled={isLoading}
            sx={{
              py: 1.5,
              px: 4,
              backgroundColor: theme.colors.primary,
              "&:hover": {
                backgroundColor: "#2e6eb0",
              },
            }}
          >
            Continue
          </Button>
        </form>
      );
    } else {
      return (
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Create admin account
          </Typography>

          <TextField
            fullWidth
            label="Admin Name"
            name="adminName"
            value={formData.adminName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.adminName}
            helperText={errors.adminName || ""}
            sx={{ mb: 2 }}
            disabled={isLoading}
          />

          <TextField
            fullWidth
            label="Admin Email"
            name="adminEmail"
            type="email"
            value={formData.adminEmail}
            onChange={handleChange}
            margin="normal"
            error={!!errors.adminEmail}
            helperText={errors.adminEmail || ""}
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

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={isLoading}
              sx={{
                py: 1.5,
                px: 3,
                borderColor: theme.colors.secondary,
                color: theme.colors.secondary,
              }}
            >
              Back
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                py: 1.5,
                px: 4,
                backgroundColor: theme.colors.primary,
                "&:hover": {
                  backgroundColor: "#2e6eb0",
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register Community"
              )}
            </Button>
          </Box>
        </form>
      );
    }
  };

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
            onClick={handleHome}
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
              width: { xs: "100%", md: "60%" },
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 1, fontWeight: 700, color: theme.colors.primary }}
            >
              Register Your Community
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
              Create a Communicare.world community space to enhance connection with AI-powered tools
            </Typography>

            <Typography variant="body1" sx={{ mt: 1, mb: 3, color: "text.secondary", textAlign: "center" }}>
              Complete the two-step registration process below
            </Typography>

            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Render the appropriate form based on active step */}
            {renderForm()}

            <Box sx={{ mt: 4, textAlign: "center" }}>
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
                Want to join an existing community?{" "}
                <Link href="/register/member" passHref>
                  <MuiLink sx={{ color: theme.colors.secondary, fontWeight: 500 }}>
                    Register as a member
                  </MuiLink>
                </Link>
              </Typography>
            </Box>
          </Paper>

          {/* Benefits Section */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 3,
                mb: 4,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: 700, color: theme.colors.secondary }}
              >
                Our AI-Powered Solutions
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Campaign sx={{ color: theme.colors.primary, mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Community Coordination
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Streamline community announcements, events, and meetings with AI-powered organization tools.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <HealthAndSafety sx={{ color: theme.colors.primary, mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Health & Wellness Monitoring
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Support community health with monitoring tools, medical resources, and emergency assistance.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <School sx={{ color: theme.colors.primary, mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Education Support Services
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Provide tutoring assistance and educational resources for all community members.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <People sx={{ color: theme.colors.primary, mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Community Connection
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Foster stronger relationships with tools to connect residents, service providers, and community leaders.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>

            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: `rgba(61, 139, 211, 0.05)`,
                backdropFilter: "blur(10px)",
                border: `1px solid rgba(61, 139, 211, 0.1)`,
              }}
            >
              <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: 700, color: theme.colors.primary }}
              >
                How Communicare.world Works
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      bgcolor: theme.colors.primary,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    1
                  </Box>
                  <Typography variant="body1">
                    <strong>Register your community</strong> and set up your profile with essential information
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      bgcolor: theme.colors.primary,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    2
                  </Box>
                  <Typography variant="body1">
                    <strong>Select AI agents</strong> that match your community's specific needs from our library of 30+ specialized agents
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      bgcolor: theme.colors.primary,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    3
                  </Box>
                  <Typography variant="body1">
                    <strong>Invite community members</strong> to join your Communicare.world platform
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      bgcolor: theme.colors.primary,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    4
                  </Box>
                  <Typography variant="body1">
                    <strong>Monitor community engagement</strong> with analytics and insights on your community's health and activities
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                >
                  Create your community today and enhance quality of life with our AI-powered platform!
                </Typography>
              </Box>
            </Paper>
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
          © {new Date().getFullYear()} Communicare.world — AI-powered solutions for stronger communities
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

export default RegisterCommunity;