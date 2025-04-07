"use client";

import React from "react";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import {
  PlayArrow,
  HealthAndSafety,
  Groups,
  School,
  People,
} from "@mui/icons-material";
import Link from "next/link";

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

const FeatureShowcase: React.FC = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          right: -100,
          top: "20%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.primary}10, transparent 70%)`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl">
        {/* Headline */}
        <Box sx={{ mb: 8, position: "relative", zIndex: 1 }}>
          <Typography
            variant="h6"
            component="p"
            align="center"
            sx={{
              color: theme.colors.primary,
              fontWeight: 600,
              mb: 2,
            }}
          >
            TRANSFORM YOUR COMMUNITY EXPERIENCE
          </Typography>

          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              fontWeight: 700,
              color: theme.colors.text,
              maxWidth: "800px",
              mx: "auto",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Bring Your Community Together with Communicare
          </Typography>

          <Typography
            variant="h6"
            component="p"
            align="center"
            sx={{
              color: theme.colors.lightText,
              maxWidth: "800px",
              mx: "auto",
              mb: 5,
            }}
          >
            Our platform helps communities create interactive, AI-powered spaces that
            connect residents and provide the tools they need to build stronger, healthier
            neighborhoods.
          </Typography>
        </Box>

        {/* Main Feature Showcase */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            mb: 8,
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Video preview */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 50%" },
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              height: { xs: "250px", sm: "350px", md: "450px" },
            }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Community members collaborating"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* Play button overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.3)",
              }}
            >
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                sx={{
                  bgcolor: "rgba(255,255,255,0.9)",
                  color: theme.colors.primary,
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,1)",
                  },
                }}
              >
                Watch Demo
              </Button>
            </Box>
          </Box>

          {/* Feature description */}
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" } }}>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontWeight: 700,
                color: theme.colors.text,
                mb: 3,
                fontSize: { xs: "1.75rem", md: "2.25rem" },
              }}
            >
              AI Agents That Connect Your 
              <span style={{ color: theme.colors.primary }}> Community</span>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: theme.colors.lightText,
                mb: 4,
                fontSize: "1.1rem",
                lineHeight: 1.6,
              }}
            >
              Our platform employs over 30 specialized AI agents working together to create seamless 
              community experiences. From health monitoring to education support, from event coordination
              to emergency services - our research shows that communities using Communicare see a 40% 
              increase in resident engagement and participation.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Box
                  sx={{
                    bgcolor: `${theme.colors.primary}15`,
                    color: theme.colors.primary,
                    p: 1,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 0.5,
                  }}
                >
                  <People />
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: theme.colors.text, mb: 0.5 }}
                  >
                    Community Coordination
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.lightText }}
                  >
                    Organize events, meetings, and announcements with AI-powered scheduling
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Box
                  sx={{
                    bgcolor: `${theme.colors.secondary}15`,
                    color: theme.colors.secondary,
                    p: 1,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 0.5,
                  }}
                >
                  <HealthAndSafety />
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: theme.colors.text, mb: 0.5 }}
                  >
                    Health & Wellness
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.lightText }}
                  >
                    Monitor health metrics and connect with community health resources
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Box
                  sx={{
                    bgcolor: `${theme.colors.accent}15`,
                    color: theme.colors.accent,
                    p: 1,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 0.5,
                  }}
                >
                  <School />
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: theme.colors.text, mb: 0.5 }}
                  >
                    Educational Support
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.lightText }}
                  >
                    Access tutoring, skill exchanges, and lifelong learning resources
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Call to action */}
        <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Link href="/features" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: theme.colors.secondary,
                color: theme.colors.secondary,
                py: 1.5,
                px: 4,
                borderRadius: 2,
                "&:hover": {
                  borderColor: theme.colors.secondary,
                  backgroundColor: `${theme.colors.secondary}10`,
                },
              }}
            >
              Explore All Features
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default FeatureShowcase;