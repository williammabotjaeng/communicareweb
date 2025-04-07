"use client";

import React from "react";
import { Box, Container, Typography, Paper, Icon } from "@mui/material";
import {
  Groups,
  HealthAndSafety,
  Campaign,
  Analytics,
  CalendarMonth,
  People,
  Public
} from "@mui/icons-material";

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

interface ServiceProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceSection: React.FC<{ services: ServiceProps[] }> = ({
  services,
}) => {
  // Map string icon names to MUI icon components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "public":
        return <Public fontSize="large" />;
      case "calendar_month":
        return <CalendarMonth fontSize="large" />;
      case "health_and_safety":
        return <HealthAndSafety fontSize="large" />;
      case "groups":
        return <Groups fontSize="large" />;
      default:
        return <Public fontSize="large" />;
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: theme.colors.light,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          left: -100,
          bottom: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.primary}05, transparent 70%)`,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          right: -50,
          top: -50,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.secondary}05, transparent 70%)`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography
            variant="h6"
            component="p"
            sx={{
              color: theme.colors.secondary,
              fontWeight: 600,
              mb: 2,
            }}
          >
            OUR SERVICES
          </Typography>

          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 700,
              color: theme.colors.text,
              maxWidth: "800px",
              mx: "auto",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Everything Your Community Needs to Thrive
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.colors.lightText,
              maxWidth: "750px",
              mx: "auto",
              fontSize: "1.1rem",
            }}
          >
            Communicare.world offers a complete suite of AI-powered solutions to
            help you build stronger, more connected communities through technology.
          </Typography>
        </Box>

        {/* Services Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {services.map((service, index) => (
            <Paper
              key={index}
              elevation={0}
              className="stagger-item"
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 16px)",
                  lg: "1 1 calc(25% - 18px)",
                },
                p: 4,
                borderRadius: 4,
                bgcolor: theme.colors.white,
                border: "1px solid rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                minHeight: "280px",
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor:
                    index % 3 === 0
                      ? `${theme.colors.primary}15`
                      : index % 3 === 1
                      ? `${theme.colors.secondary}15`
                      : `${theme.colors.accent}15`,
                  color:
                    index % 3 === 0
                      ? theme.colors.primary
                      : index % 3 === 1
                      ? theme.colors.secondary
                      : theme.colors.accent,
                  mb: 3,
                }}
              >
                {getIconComponent(service.icon)}
              </Box>

              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: theme.colors.text,
                }}
              >
                {service.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: theme.colors.lightText,
                  mb: "auto",
                }}
              >
                {service.description}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color:
                    index % 3 === 0
                      ? theme.colors.primary
                      : index % 3 === 1
                      ? theme.colors.secondary
                      : theme.colors.accent,
                  fontWeight: 600,
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Learn more
                <Box component="span" sx={{ fontSize: "1.2rem", ml: 0.5 }}>
                  →
                </Box>
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ServiceSection;