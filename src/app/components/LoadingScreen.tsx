"use client";

import React, { useEffect, useState } from "react";
import { Box, Fade, Typography } from "@mui/material";
import { motion } from "framer-motion";

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

const LoadingScreen = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.white,
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          height: "300px",
        }}
      >
        {/* Community Globe */}
        <Box
          component={motion.div}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          sx={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            backgroundColor: theme.colors.light,
            border: `2px solid ${theme.colors.primary}30`,
            position: "relative",
            mb: 1,
            overflow: "visible",
            boxShadow: `0 0 30px ${theme.colors.primary}20`,
          }}
        >
          {/* Globe Equator */}
          <Box
            component={motion.div}
            sx={{
              position: "absolute",
              width: "120px",
              height: "10px",
              top: "55px",
              left: "0px",
              borderRadius: "20px",
              backgroundColor: `${theme.colors.primary}20`,
            }}
          />

          {/* Connection Line 1 */}
          <Box
            component={motion.div}
            animate={{
              y: [-10, -20, -10],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            sx={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.colors.accent} 0%, transparent 70%)`,
              position: "absolute",
              top: "-25px",
              left: "30px",
            }}
          />

          {/* Connection Line 2 */}
          <Box
            component={motion.div}
            animate={{
              y: [-10, -25, -10],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            sx={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.colors.secondary} 0%, transparent 70%)`,
              position: "absolute",
              top: "-20px",
              left: "60px",
            }}
          />

          {/* Connection Line 3 */}
          <Box
            component={motion.div}
            animate={{
              y: [-5, -20, -5],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
            sx={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.colors.primary} 0%, transparent 70%)`,
              position: "absolute",
              top: "-15px",
              left: "85px",
            }}
          />
        </Box>

        {/* Community Connection */}
        <Box
          component={motion.div}
          initial={{ rotate: -30, x: -50, opacity: 0 }}
          animate={{ rotate: 30, x: 50, opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.4,
          }}
          sx={{
            width: "120px",
            height: "3px",
            background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            borderRadius: "10px",
            position: "absolute",
            top: "80px",
            transformOrigin: "right center",
            zIndex: 1,
            boxShadow: `0 0 10px ${theme.colors.primary}60`,
          }}
        >
          {/* Connection Node */}
          <Box
            sx={{
              width: "15px",
              height: "15px",
              background: `radial-gradient(circle, ${theme.colors.secondary}, ${theme.colors.primary})`,
              borderRadius: "50%",
              position: "absolute",
              top: "-6px",
              left: "-5px",
              boxShadow: `0 0 10px ${theme.colors.secondary}80`,
            }}
          />
        </Box>

        {/* Logo */}
        <Box
          component={motion.div}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          sx={{
            mt: 16,
            display: "flex",
            alignItems: "center",
            backgroundColor: `${theme.colors.primary}15`,
            padding: "10px 20px",
            borderRadius: "30px",
          }}
        >
          <Box
            component="svg"
            sx={{ width: 24, height: 24, mr: 1 }}
            viewBox="0 0 24 24"
          >
            <path
              fill={theme.colors.primary}
              d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M13,9.94L14.06,11L15.12,9.94L16.18,11L17.24,9.94L15.12,7.82L13,9.94M8.88,9.94L9.94,11L11,9.94L8.88,7.82L6.76,9.94L7.82,11L8.88,9.94M12,17.5C14.33,17.5 16.31,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5Z"
            />
          </Box>
          <Typography
            sx={{
              color: theme.colors.primary,
              fontWeight: 600,
              fontSize: "1.25rem",
            }}
          >
            Communicare.world
          </Typography>
        </Box>

        {/* Loading Text */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          sx={{ mt: 3 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: theme.colors.lightText,
              fontWeight: 500,
            }}
          >
            Connecting your community...
          </Typography>
        </Box>

        {/* Loading Progress */}
        <Box
          sx={{
            width: "200px",
            height: "4px",
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: "4px",
            overflow: "hidden",
            mt: 2,
          }}
        >
          <Box
            component={motion.div}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            sx={{
              width: "50%",
              height: "100%",
              background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              borderRadius: "4px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

// Usage in Home component
const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show loading for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading screen */}
      {loading && <LoadingScreen />}

      {/* Main content */}
      <Fade in={!loading} timeout={800}>
        <Box>{/* Your page content here */}</Box>
      </Fade>
    </>
  );
};

export default LoadingScreen;