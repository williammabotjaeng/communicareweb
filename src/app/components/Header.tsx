"use client";

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
  Box,
  IconButton,
  Drawer,
  MenuItem,
  Menu,
  Container,
  Chip,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { useStore } from "zustand";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Public,
  Groups,
  Elderly,
  HealthAndSafety,
  Login as LoginIcon,
  HelpOutline,
  Assignment,
  People,
  Campaign,
  MedicalServices,
} from "@mui/icons-material";
import useAuthStore from "@/state/use-auth-store";
import { useState } from "react";
import { useAuth } from "@/providers/auth-providers";

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

export const Header: React.FC = () => {
  const [cookies] = useCookies(["access"]);
  const isLoggedIn = !!cookies["access"];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [solutionsAnchorEl, setSolutionsAnchorEl] = useState(null);
  const [registerAnchorEl, setRegisterAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleSolutionsClick = (event) => {
    setSolutionsAnchorEl(event.currentTarget);
  };

  const handleRegisterClick = (event) => {
    setRegisterAnchorEl(event.currentTarget);
  };

  const handleAccountClick = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSolutionsAnchorEl(null);
    setRegisterAnchorEl(null);
    setAccountAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = (
    <Box
      sx={{
        width: 280,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Public sx={{ color: theme.colors.primary, fontSize: 32, mr: 1 }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Communicare.world
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Link href="/" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          startIcon={<Campaign />}
          sx={{
            color: theme.colors.text,
            justifyContent: "flex-start",
            py: 1,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: `${theme.colors.primary}10`,
            },
          }}
        >
          Home
        </Button>
      </Link>

      <Button
        fullWidth
        startIcon={<Groups />}
        sx={{
          color: theme.colors.text,
          justifyContent: "flex-start",
          py: 1,
          borderRadius: 2,
          "&:hover": {
            backgroundColor: `${theme.colors.primary}10`,
          },
        }}
      >
        Community Tools
      </Button>

      <Link href="#features" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          startIcon={<People />}
          sx={{
            color: theme.colors.text,
            justifyContent: "flex-start",
            py: 1,
            borderRadius: 2,
            pl: 4,
            "&:hover": {
              backgroundColor: `${theme.colors.primary}10`,
            },
          }}
        >
          Community Coordination
        </Button>
      </Link>

      <Link href="#service" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          startIcon={<HealthAndSafety />}
          sx={{
            color: theme.colors.text,
            justifyContent: "flex-start",
            py: 1,
            borderRadius: 2,
            pl: 4,
            "&:hover": {
              backgroundColor: `${theme.colors.primary}10`,
            },
          }}
        >
          Health Services
        </Button>
      </Link>

      <Link href="#howitworks" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          startIcon={<Assignment />}
          sx={{
            color: theme.colors.text,
            justifyContent: "flex-start",
            py: 1,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: `${theme.colors.primary}10`,
            },
          }}
        >
          How it Works
        </Button>
      </Link>

      <Link href="/help" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          startIcon={<HelpOutline />}
          sx={{
            color: theme.colors.text,
            justifyContent: "flex-start",
            py: 1,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: `${theme.colors.primary}10`,
            },
          }}
        >
          Help Center
        </Button>
      </Link>

      <Divider sx={{ my: 2 }} />

      {!isLoggedIn ? (
        <>
          <Button
            fullWidth
            variant="contained"
            onClick={handleRegisterClick}
            sx={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.white,
              py: 1.5,
              borderRadius: 2,
              mb: 1,
              "&:hover": {
                backgroundColor: "#2e6eb0",
              },
            }}
          >
            Register
          </Button>

          <Menu
            anchorEl={registerAnchorEl}
            open={Boolean(registerAnchorEl)}
            onClose={handleClose}
            elevation={3}
            sx={{ mt: 1.5 }}
          >
            <MenuItem
              sx={{
                textDecoration: "none",
                color: theme.colors.primary,
                backgroundColor: theme.colors.white,
                width: "100%",
                "&:hover": {
                  textDecoration: "none",
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.white,
                },
              }}
              onClick={handleClose}
            >
              <Link
                href="/register/community"
                sx={{
                  color: theme.colors.primary,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  "&:hover": {
                    color: theme.colors.white,
                    textDecoration: "none",
                  },
                }}
              >
                <Public sx={{ mr: 1.5 }} />
                Register a Community
              </Link>
            </MenuItem>
            <MenuItem
              sx={{
                textDecoration: "none",
                color: theme.colors.secondary,
                backgroundColor: theme.colors.white,
                width: "100%",
                "&:hover": {
                  textDecoration: "none",
                  backgroundColor: theme.colors.secondary,
                  color: theme.colors.white,
                },
              }}
              onClick={handleClose}
            >
              <Link
                href="/register/member"
                sx={{
                  color: theme.colors.secondary,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  "&:hover": {
                    color: theme.colors.white,
                    textDecoration: "none",
                  },
                }}
              >
                <People sx={{ mr: 1.5 }} />
                Join a Community
              </Link>
            </MenuItem>
          </Menu>

          <Link href="/login" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LoginIcon />}
              sx={{
                borderColor: theme.colors.secondary,
                color: theme.colors.secondary,
                py: 1.5,
                borderRadius: 2,
                "&:hover": {
                  borderColor: theme.colors.secondary,
                  backgroundColor: `${theme.colors.secondary}10`,
                },
              }}
            >
              Sign In
            </Button>
          </Link>
        </>
      ) : (
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: theme.colors.secondary,
              color: theme.colors.white,
              py: 1.5,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#5a35d9",
              },
            }}
          >
            My Community
          </Button>
        </Link>
      )}
    </Box>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            padding: { xs: "8px 0", md: "12px 0" },
          }}
          disableGutters
        >
          {/* Logo and Title Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Public
                sx={{
                  color: theme.colors.primary,
                  fontSize: { xs: 34, md: 38 },
                  mr: 1,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  display: { xs: "none", sm: "block" },
                  background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Communicare.world
              </Typography>
            </Link>
          </Box>

          {/* Navigation Menu for larger screens */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: { md: 1, lg: 2 },
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 2 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Home
              </Button>
            </Link>

            <Button
              sx={{
                color: theme.colors.text,
                px: { md: 1, lg: 2 },
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              onClick={handleSolutionsClick}
              endIcon={<Box sx={{ fontSize: 10 }}>▼</Box>}
            >
              Community Tools
            </Button>

            <Menu
              anchorEl={solutionsAnchorEl}
              open={Boolean(solutionsAnchorEl)}
              onClose={handleClose}
              elevation={3}
              sx={{ mt: 1.5 }}
              transformOrigin={{ horizontal: "center", vertical: "top" }}
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose} sx={{ minWidth: 220 }}>
                <Link
                  href="#features"
                  style={{
                    textDecoration: "none",
                    color: theme.colors.text,
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <People sx={{ mr: 1.5, color: theme.colors.primary }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Community Coordination
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.colors.lightText }}
                    >
                      Events, announcements, meetings
                    </Typography>
                  </Box>
                </Link>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Link
                  href="#service"
                  style={{
                    textDecoration: "none",
                    color: theme.colors.text,
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <MedicalServices sx={{ mr: 1.5, color: theme.colors.secondary }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Health Services
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.colors.lightText }}
                    >
                      Monitoring, assistance, resources
                    </Typography>
                  </Box>
                </Link>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Link
                  href="#howitworks"
                  style={{
                    textDecoration: "none",
                    color: theme.colors.text,
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Elderly sx={{ mr: 1.5, color: theme.colors.accent }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Elder Support
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.colors.lightText }}
                    >
                      Care coordination and resources
                    </Typography>
                  </Box>
                </Link>
              </MenuItem>
            </Menu>

            <Link href="/help" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 2 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Help
              </Button>
            </Link>

            {!isLoggedIn ? (
              <>
                <Button
                  variant="contained"
                  onClick={handleRegisterClick}
                  sx={{
                    ml: { md: 1, lg: 2 },
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.white,
                    px: { md: 2, lg: 3 },
                    "&:hover": {
                      backgroundColor: "#2e6eb0",
                    },
                  }}
                >
                  Register
                </Button>

                <Menu
                  anchorEl={registerAnchorEl}
                  open={Boolean(registerAnchorEl)}
                  onClose={handleClose}
                  elevation={3}
                  sx={{ mt: 1.5 }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/register/community"
                      style={{
                        textDecoration: "none",
                        color: theme.colors.text,
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Public
                        sx={{ mr: 1.5, color: theme.colors.primary }}
                      />
                      Register a Community
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/register/member"
                      style={{
                        textDecoration: "none",
                        color: theme.colors.text,
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <People
                        sx={{ mr: 1.5, color: theme.colors.secondary }}
                      />
                      Join a Community
                    </Link>
                  </MenuItem>
                </Menu>

                <Link href="/login" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    startIcon={<LoginIcon />}
                    sx={{
                      ml: 1,
                      borderColor: theme.colors.secondary,
                      color: theme.colors.secondary,
                      "&:hover": {
                        borderColor: theme.colors.secondary,
                        backgroundColor: `${theme.colors.secondary}10`,
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button
                  sx={{
                    ml: 2,
                    color: theme.colors.text,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                  onClick={handleAccountClick}
                  endIcon={<Box sx={{ fontSize: 10 }}>▼</Box>}
                >
                  My Account
                </Button>

                <Menu
                  anchorEl={accountAnchorEl}
                  open={Boolean(accountAnchorEl)}
                  onClose={handleClose}
                  elevation={3}
                  sx={{ mt: 1.5 }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/dashboard"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      My Community
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/settings"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      Settings
                    </Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <Link
                      onClick={handleLogout}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      Sign Out
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>

          {/* Hamburger Menu Icon */}
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              display: { xs: "flex", md: "none" },
              color: theme.colors.text,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Drawer for mobile menu */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          },
        }}
      >
        {menuItems}
      </Drawer>
    </AppBar>
  );
};