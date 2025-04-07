import { Box, Typography, keyframes } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Public,
  Groups,
  People,
  Campaign,
  HealthAndSafety,
} from "@mui/icons-material";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LogoutLoading = () => {
  const [dots, setDots] = useState(".");
  const [loadingMessage, setLoadingMessage] = useState("Securing your community data");

  // Communicare theme
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

  // Community-related loading messages
  const loadingMessages = [
    "Securing your community data",
    "Saving your preferences",
    "Finalizing community updates",
    "Storing your contributions",
    "Updating community resources",
    "See you again soon!",
  ];

  useEffect(() => {
    // Cycle through loading messages
    const messageInterval = setInterval(() => {
      setLoadingMessage((prev) => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2000);

    // Animate the dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <Box sx={styles(theme).container}>
      <Box sx={styles(theme).contentWrapper}>
        {/* Logo */}
        <Box sx={styles(theme).logoContainer}>
          <Public sx={styles(theme).logoIcon} />
          <Typography variant="h3" sx={styles(theme).logoText}>
            <span style={{ color: theme.colors.primary }}>Communi</span>
            <span style={{ color: theme.colors.secondary }}>care</span>
          </Typography>
        </Box>

        {/* Community icon circle with icons */}
        <Box sx={styles(theme).plateContainer}>
          <Box sx={styles(theme).plate}>
            <Box sx={styles(theme).plateInner}>
              {/* Rotating community-related icons */}
              <Box sx={styles(theme).cleaningIconsContainer}>
                <Groups
                  sx={{ ...styles(theme).cleaningIcon, animationDelay: "0s" }}
                />
                <People
                  sx={{ ...styles(theme).cleaningIcon, animationDelay: "0.5s" }}
                />
                <Campaign sx={{ ...styles(theme).cleaningIcon, animationDelay: "1s" }} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Typography variant="h5" sx={styles(theme).loadingText}>
          {loadingMessage}
          {dots}
        </Typography>

        <Box sx={styles(theme).progressBar}>
          <Box sx={styles(theme).progressFill}></Box>
        </Box>

        <Typography variant="body2" sx={styles(theme).subText}>
          Thank you for using Communicare.world
        </Typography>
      </Box>

      {/* Decorative elements representing community bubbles */}
      <Box sx={styles(theme).decorativeBubble1}></Box>
      <Box sx={styles(theme).decorativeBubble2}></Box>
      <Box sx={styles(theme).decorativeBubble3}></Box>
      <Box sx={styles(theme).decorativeBubble4}></Box>
      <Box sx={styles(theme).decorativeBubble5}></Box>

      {/* Sparkle effect */}
      <Box sx={styles(theme).sparkleContainer}>
        <Box sx={{ ...styles(theme).sparkle, animationDelay: "0.2s" }}></Box>
        <Box
          sx={{ ...styles(theme).sparkle, animationDelay: "0.8s", left: "60%" }}
        ></Box>
        <Box
          sx={{ ...styles(theme).sparkle, animationDelay: "1.5s", left: "40%" }}
        ></Box>
      </Box>

      {/* Fetch.ai branding */}
      <Box sx={styles(theme).fetchContainer}>
        <Typography
          variant="body2"
          sx={styles(theme).fetchText}
        >
          Powered by Fetch.ai AgentVerse
        </Typography>
      </Box>
    </Box>
  );
};

const styles = (theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #f8f9fa 0%, #E7F2FA 100%)",
    position: "relative",
    overflow: "hidden",
    animation: `${fadeIn} 0.5s ease-in-out`,
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    padding: "2rem",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem",
    animation: `${float} 3s infinite ease-in-out`,
  },
  logoIcon: {
    fontSize: 40,
    marginRight: 1,
    color: theme.colors.primary,
  },
  logoText: {
    fontFamily: '"Segoe UI", sans-serif',
    fontWeight: 700,
    letterSpacing: "-0.5px",
  },
  plateContainer: {
    position: "relative",
    marginBottom: "2rem",
  },
  plate: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    backgroundColor: "white",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      width: "90%",
      height: "90%",
      borderRadius: "50%",
      border: "2px solid rgba(0, 0, 0, 0.05)",
    },
  },
  plateInner: {
    width: "80%",
    height: "80%",
    borderRadius: "50%",
    backgroundColor: "rgba(240, 240, 240, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cleaningIconsContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    animation: `${rotate} 8s infinite linear`,
  },
  cleaningIcon: {
    position: "absolute",
    fontSize: 28,
    color: theme.colors.primary,
    animation: `${float} 2s infinite ease-in-out`,
    "&:nth-of-type(1)": {
      top: "10%",
      left: "50%",
      transform: "translateX(-50%)",
    },
    "&:nth-of-type(2)": {
      bottom: "15%",
      left: "15%",
      color: theme.colors.secondary,
    },
    "&:nth-of-type(3)": {
      bottom: "15%",
      right: "15%",
      color: theme.colors.accent,
    },
  },
  loadingText: {
    color: theme.colors.primary,
    marginBottom: "1.5rem",
    fontFamily: "Segoe UI, sans-serif",
    fontWeight: 600,
    textAlign: "center",
  },
  subText: {
    color: theme.colors.secondary,
    marginTop: "1rem",
    fontFamily: "Segoe UI, sans-serif",
    opacity: 0.9,
  },
  progressBar: {
    width: "250px",
    height: "4px",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    width: "100%",
    backgroundImage:
      `linear-gradient(90deg, transparent, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.primary}, transparent)`,
    backgroundSize: "200% 100%",
    animation: `${shimmer} 2s infinite linear`,
  },
  decorativeBubble1: {
    position: "absolute",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background:
      `radial-gradient(circle, rgba(61, 139, 211, 0.15) 0%, rgba(61, 139, 211, 0) 70%)`,
    top: "20%",
    left: "15%",
    zIndex: 1,
    animation: `${float} 4s infinite ease-in-out`,
  },
  decorativeBubble2: {
    position: "absolute",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background:
      `radial-gradient(circle, rgba(110, 68, 255, 0.15) 0%, rgba(110, 68, 255, 0) 70%)`,
    top: "30%",
    left: "25%",
    zIndex: 1,
    animation: `${float} 3s infinite ease-in-out 0.5s`,
  },
  decorativeBubble3: {
    position: "absolute",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background:
      `radial-gradient(circle, rgba(0, 204, 255, 0.15) 0%, rgba(0, 204, 255, 0) 70%)`,
    top: "25%",
    right: "20%",
    zIndex: 1,
    animation: `${float} 5s infinite ease-in-out 1s`,
  },
  decorativeBubble4: {
    position: "absolute",
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    background:
      `radial-gradient(circle, rgba(61, 139, 211, 0.15) 0%, rgba(61, 139, 211, 0) 70%)`,
    bottom: "30%",
    right: "30%",
    zIndex: 1,
    animation: `${float} 4s infinite ease-in-out 1.5s`,
  },
  decorativeBubble5: {
    position: "absolute",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    background:
      `radial-gradient(circle, rgba(110, 68, 255, 0.15) 0%, rgba(110, 68, 255, 0) 70%)`,
    bottom: "25%",
    left: "30%",
    zIndex: 1,
    animation: `${float} 3.5s infinite ease-in-out 0.7s`,
  },
  sparkleContainer: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "120px",
    height: "100px",
    zIndex: 1,
  },
  sparkle: {
    position: "absolute",
    width: "15px",
    height: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    transform: "rotate(45deg) translateX(-50%)",
    filter: "blur(3px)",
    animation: `${float} 2s infinite ease-out`,
    opacity: 0.6,
  },
  fetchContainer: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    zIndex: 10,
  },
  fetchText: {
    color: theme.colors.lightText,
    fontWeight: 400,
  },
});

export default LogoutLoading;