"use client";

import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { Public, People } from "@mui/icons-material";
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

const CTASection: React.FC = () => {
  return (
    <Box
      sx={{
        py: 12,
        position: "relative",
        background: `linear-gradient(135deg, ${theme.colors.primary}05, ${theme.colors.secondary}05)`,
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "10%",
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${theme.colors.primary}10, transparent 70%)`,
          transform: "translateY(-50%)",
          borderRadius: "50%",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: "10%",
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${theme.colors.secondary}10, transparent 70%)`,
          transform: "translateY(50%)",
          borderRadius: "50%",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            alignItems: "center",
          }}
        >
          {/* Left Content */}
          <Box
            className="stagger-item"
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 calc(58% - 16px)" },
              order: { xs: 1, md: 0 },
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: theme.colors.text,
                fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
              }}
            >
              Ready to{" "}
              <span style={{ color: theme.colors.primary }}>connect</span> your
              community with AI?
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: theme.colors.lightText,
                mb: 4,
                maxWidth: 600,
              }}
            >
              Join the growing network of communities that are using Communicare.world 
              to create stronger connections, improve health outcomes, and enhance 
              quality of life for all residents.
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <Link
                href="/register/community"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Public />}
                  sx={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.white,
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#2e6eb0",
                    },
                  }}
                >
                  Register a Community
                </Button>
              </Link>

              <Link href="/register/member" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<People />}
                  sx={{
                    borderColor: theme.colors.secondary,
                    color: theme.colors.secondary,
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    "&:hover": {
                      borderColor: theme.colors.secondary,
                      backgroundColor: `${theme.colors.secondary}10`,
                    },
                  }}
                >
                  Join a Community
                </Button>
              </Link>
            </Box>
          </Box>

          {/* Right Content */}
          <Box
            className="stagger-item"
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 calc(42% - 16px)" },
              order: { xs: 0, md: 1 },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: theme.colors.text, mb: 1 }}
                >
                  Why Communities Love Communicare.world
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our AI-powered platform delivers real results
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      bgcolor: theme.colors.primary,
                      color: "white",
                      textAlign: "center",
                      lineHeight: "20px",
                      fontSize: "0.8rem",
                      mr: 2,
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </Box>
                  <strong>40% increase</strong> in community participation
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      bgcolor: theme.colors.primary,
                      color: "white",
                      textAlign: "center",
                      lineHeight: "20px",
                      fontSize: "0.8rem",
                      mr: 2,
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </Box>
                  <strong>35% improvement</strong> in health outcomes
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      bgcolor: theme.colors.primary,
                      color: "white",
                      textAlign: "center",
                      lineHeight: "20px",
                      fontSize: "0.8rem",
                      mr: 2,
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </Box>
                  <strong>50% reduction</strong> in communication gaps
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      bgcolor: theme.colors.primary,
                      color: "white",
                      textAlign: "center",
                      lineHeight: "20px",
                      fontSize: "0.8rem",
                      mr: 2,
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </Box>
                  <strong>4.8/5 average</strong> resident satisfaction
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Link href="/features" style={{ textDecoration: "none" }}>
                  <Button
                    variant="text"
                    sx={{
                      color: theme.colors.secondary,
                      "&:hover": {
                        backgroundColor: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    View all features →
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;