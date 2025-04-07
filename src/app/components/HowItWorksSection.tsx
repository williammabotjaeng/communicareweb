"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Avatar,
} from "@mui/material";
import {
  CloudUpload,
  Groups,
  HealthAndSafety,
  Launch,
  ArrowForward,
  Public,
  Analytics,
  Campaign,
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

const HowItWorksSection: React.FC = () => {
  // Steps data
  const steps = [
    {
      title: "Create Your Community Space",
      description:
        "Register your community and set up your profile with key information. Our platform makes it easy to configure settings and define your community's unique needs.",
      icon: <Public sx={{ fontSize: 30 }} />,
      color: theme.colors.primary,
    },
    {
      title: "Add Community Members",
      description:
        "Invite residents to join your community space. They can create profiles, set preferences, and connect with community resources and other members.",
      icon: <Groups sx={{ fontSize: 30 }} />,
      color: theme.colors.secondary,
    },
    {
      title: "Activate AI Agents",
      description:
        "Select from over 30 specialized AI agents to support your community's needs - from health monitoring to event coordination to educational resources.",
      icon: <HealthAndSafety sx={{ fontSize: 30 }} />,
      color: theme.colors.accent,
    },
    {
      title: "Launch Your Community",
      description:
        "Your community platform is now live! Members can access resources, participate in events, and benefit from AI-powered assistance across all aspects of community life.",
      icon: <Launch sx={{ fontSize: 30 }} />,
      color: theme.colors.primary,
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: theme.colors.white,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%233D8BD3' fill-opacity='1'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 20.83l2.83-2.83 1.41 1.41L1.41 22.24H0v-1.41zM0 3.07l2.83-2.83 1.41 1.41L1.41 4.48H0V3.07zm20.76 35.52l2.83-2.83 1.41 1.41L22.17 40h-1.41v-1.41zm0-17.76l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zm0-17.76l2.83-2.83 1.41 1.41-2.83 2.83h-1.41V3.07zm-9.49 17.76l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zm0-17.76l2.83-2.83 1.41 1.41-2.83 2.83h-1.41V3.07zM20.76 20.83l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h6"
            component="p"
            sx={{
              color: theme.colors.primary,
              fontWeight: 600,
              mb: 2,
            }}
          >
            HOW IT WORKS
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
            Four Simple Steps to{" "}
            <span style={{ color: theme.colors.primary }}>Build</span> Your
            Connected Community
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
            Get your AI-powered community platform up and running quickly with our
            streamlined process. Our system is designed to make implementation
            simple while providing powerful tools for community engagement.
          </Typography>
        </Box>

        {/* Step Process Flow */}
        <Box sx={{ position: "relative", mb: 10 }}>
          {/* Connecting Line */}
          <Box
            sx={{
              position: "absolute",
              top: "100px",
              left: "10%",
              right: "10%",
              height: "4px",
              background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              display: { xs: "none", md: "block" },
              zIndex: 0,
            }}
          />

          {/* Steps */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: 4,
              position: "relative",
              zIndex: 1,
            }}
          >
            {steps.map((step, index) => (
              <Box
                key={index}
                className="stagger-item"
                sx={{
                  flex: "1 1 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "flex-start", md: "center" },
                  textAlign: { xs: "left", md: "center" },
                  position: "relative",
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "white",
                    color: step.color,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    mb: 3,
                    border: `2px solid ${step.color}`,
                  }}
                >
                  {step.icon}
                </Avatar>

                <Box
                  sx={{
                    position: "absolute",
                    top: 30,
                    right: { xs: "auto", md: -30 },
                    left: { xs: 110, md: "auto" },
                    transform: { xs: "none", md: "translateY(-50%)" },
                    display: {
                      xs: index === steps.length - 1 ? "none" : "block",
                      md: index === steps.length - 1 ? "none" : "block",
                    },
                    color: theme.colors.primary,
                    zIndex: 2,
                  }}
                >
                  <ArrowForward
                    sx={{
                      fontSize: 36,
                      transform: { xs: "rotate(90deg)", md: "none" },
                    }}
                  />
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
                  {step.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: theme.colors.lightText,
                    lineHeight: 1.6,
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Key Benefits */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
            alignItems: "center",
            mb: 6,
          }}
        >
          <Box
            sx={{
              flex: "1 1 50%",
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              height: { xs: "300px", md: "400px" },
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1528605105345-5344ea20e269?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Community members collaborating on a project"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          <Box sx={{ flex: "1 1 50%" }}>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: theme.colors.text,
                fontSize: { xs: "1.75rem", md: "2.25rem" },
              }}
            >
              The Benefits of Community Connection with Communicare
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", gap: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: `${theme.colors.primary}15`,
                    color: theme.colors.primary,
                  }}
                >
                  <Public />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Unified Community Platform
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.lightText }}
                  >
                    A single, integrated platform where all community information, resources,
                    and services are accessible to every member, creating a stronger sense
                    of belonging and participation.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: `${theme.colors.secondary}15`,
                    color: theme.colors.secondary,
                  }}
                >
                  <Campaign />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Enhanced Communication
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.lightText }}
                  >
                    Streamlined announcements, events, and crisis alerts ensure everyone 
                    stays informed. Community-wide or targeted messaging reaches the right 
                    people at the right time.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: `${theme.colors.accent}15`,
                    color: theme.colors.accent,
                  }}
                >
                  <Analytics />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Community Insights
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.lightText }}
                  >
                    Gather feedback and analyze community data to identify needs and 
                    opportunities. Make informed decisions about resource allocation 
                    and program development.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* CTA */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: theme.colors.text,
              fontWeight: 600,
              mb: 3,
            }}
          >
            Ready to transform your community connection?
          </Typography>

          <Link href="/register/community" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: theme.colors.primary,
                color: theme.colors.white,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "#2e6eb0",
                },
              }}
            >
              Get Started Today
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;