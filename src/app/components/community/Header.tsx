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
  Avatar,
  Badge,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { useStore } from "zustand";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/state/use-auth-store";
import {
  Public,
  Dashboard,
  Settings,
  Logout,
  NotificationsOutlined,
  AccountCircle,
  MenuOutlined,
  Groups,
  InsertChart,
  SupervisorAccount,
  AddCircleOutline,
  SettingsApplications,
  Campaign,
  MessageOutlined,
  Help,
  HealthAndSafety,
  School,
  NewReleases,
  CalendarMonth,
  Event,
  People,
} from "@mui/icons-material";
import { useAuth } from "@/providers/auth-providers";
import LogoutLoading from "../CleanUpLoading";

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
    error: "#EF4444",       // Error red
    warning: "#FBBF24",     // Warning yellow
    success: "#34D399",     // Success green
  },
};

export const CommunityDashboardHeader: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "access",
    "refresh",
    "user",
    "user_role",
    "username",
    "displayName",
    "company_name",
    "subscription_tier",
  ]);
  const router = useRouter();
  const { clearAuth } = useStore(useAuthStore);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [eventsAnchorEl, setEventsAnchorEl] = useState(null);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  const { logout, logoutIsLoading } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Get community name from cookies
  const communityName =
    cookies.company_name || cookies.displayName || "My Community";

  // Check if subscription tier is present (would be set during login or profile update)
  const subscriptionTier = cookies.subscription_tier || "basic";

  // Example notification count - this would come from your notification system
  const notificationCount = 5;

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleEventsClick = (event) => {
    setEventsAnchorEl(event.currentTarget);
  };

  const handleServicesClick = (event) => {
    setServicesAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setProfileAnchorEl(null);
    setNotificationsAnchorEl(null);
    setEventsAnchorEl(null);
    setServicesAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // Render subscription badge based on tier
  const renderSubscriptionBadge = () => {
    switch (subscriptionTier) {
      case "premium":
        return (
          <Chip
            size="small"
            label="Premium"
            sx={{
              bgcolor: theme.colors.primary,
              color: theme.colors.white,
              fontWeight: 600,
              fontSize: "0.7rem",
            }}
          />
        );
      case "standard":
        return (
          <Chip
            size="small"
            label="Standard"
            sx={{
              bgcolor: theme.colors.secondary,
              color: theme.colors.white,
              fontWeight: 600,
              fontSize: "0.7rem",
            }}
          />
        );
      default:
        return (
          <Chip
            size="small"
            label="Basic"
            sx={{
              bgcolor: theme.colors.lightText,
              color: theme.colors.white,
              fontWeight: 600,
              fontSize: "0.7rem",
            }}
          />
        );
    }
  };

  // Drawer content for mobile view
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
      {/* Logo and title */}
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

      {/* Community profile summary */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar
          sx={{
            bgcolor: theme.colors.primary,
            color: theme.colors.white,
            width: 40,
            height: 40,
            mr: 2,
          }}
        >
          {communityName.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {communityName}
            </Typography>
            {renderSubscriptionBadge()}
          </Box>
          <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
            Community Admin
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Navigation items */}
      <Link href="/dashboard" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          startIcon={<Dashboard />}
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
          Dashboard
        </Button>
      </Link>

      <Link href="/community" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          startIcon={<People />}
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
          Community Members
        </Button>
      </Link>

      <Link href="/events" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          startIcon={<Event />}
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
          Events
        </Button>
      </Link>

      <Link href="/announcements" style={{ textDecoration: "none" }}>
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
          Announcements
        </Button>
      </Link>

      <Link href="/health" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          startIcon={<HealthAndSafety />}
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
          Health Services
        </Button>
      </Link>

      <Link href="/education" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          startIcon={<School />}
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
          Education
        </Button>
      </Link>

      <Link href="/analytics" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          startIcon={<InsertChart />}
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
          Analytics
        </Button>
      </Link>

      {subscriptionTier === "premium" && (
        <Link href="/ai-agents" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            startIcon={<SettingsApplications />}
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
            AI Agents
          </Button>
        </Link>
      )}

      <Divider sx={{ my: 2 }} />

      <Link href="/settings" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          startIcon={<Settings />}
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
          Settings
        </Button>
      </Link>

      <Button
        fullWidth
        startIcon={<Logout />}
        onClick={handleLogout}
        sx={{
          color: theme.colors.error,
          justifyContent: "flex-start",
          py: 1,
          borderRadius: 2,
          "&:hover": {
            backgroundColor: `${theme.colors.error}10`,
          },
        }}
      >
        Sign Out
      </Button>
    </Box>
  );

  if (logoutIsLoading) return <LogoutLoading />;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
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
              href="/dashboard"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Public
                sx={{
                  color: theme.colors.primary,
                  fontSize: { xs: 30, md: 34 },
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
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

            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, display: { xs: "none", md: "block" } }}
            />

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {communityName}
              </Typography>
              {renderSubscriptionBadge()}
            </Box>
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: { md: 0.5, lg: 1 },
            }}
          >
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 1.5 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Dashboard
              </Button>
            </Link>

            {/* Events Management Dropdown */}
            <Button
              onClick={handleEventsClick}
              sx={{
                color: theme.colors.text,
                px: { md: 1, lg: 1.5 },
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              endIcon={<Box sx={{ fontSize: 10 }}>▼</Box>}
            >
              Events
            </Button>

            <Menu
              anchorEl={eventsAnchorEl}
              open={Boolean(eventsAnchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: { width: 220, mt: 1.5 },
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  href="/events"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Event sx={{ mr: 1.5, fontSize: 20 }} />
                  All Events
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  href="/events/create"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <AddCircleOutline sx={{ mr: 1.5, fontSize: 20 }} />
                  Create New Event
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  href="/events/calendar"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <CalendarMonth sx={{ mr: 1.5, fontSize: 20 }} />
                  Community Calendar
                </Link>
              </MenuItem>
            </Menu>

            {/* Services Dropdown */}
            <Button
              onClick={handleServicesClick}
              sx={{
                color: theme.colors.text,
                px: { md: 1, lg: 1.5 },
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              endIcon={<Box sx={{ fontSize: 10 }}>▼</Box>}
            >
              Services
            </Button>

            <Menu
              anchorEl={servicesAnchorEl}
              open={Boolean(servicesAnchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: { width: 220, mt: 1.5 },
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  href="/health"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <HealthAndSafety sx={{ mr: 1.5, fontSize: 20 }} />
                  Health Services
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  href="/education"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <School sx={{ mr: 1.5, fontSize: 20 }} />
                  Education
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  href="/community/directory"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <People sx={{ mr: 1.5, fontSize: 20 }} />
                  Community Directory
                </Link>
              </MenuItem>
              {subscriptionTier !== "basic" && (
                <MenuItem onClick={handleClose}>
                  <Link
                    href="/ai-agents"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <SettingsApplications sx={{ mr: 1.5, fontSize: 20 }} />
                    AI Agents
                  </Link>
                </MenuItem>
              )}
            </Menu>

            <Link href="/announcements" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 1.5 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Announcements
              </Button>
            </Link>

            <Link href="/analytics" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 1.5 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Analytics
              </Button>
            </Link>

            {/* Notifications icon with badge */}
            <IconButton
              color="inherit"
              onClick={handleNotificationsClick}
              sx={{ color: theme.colors.text, ml: 1 }}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsOutlined />
              </Badge>
            </IconButton>

            {/* Notifications Menu */}
            <Menu
              anchorEl={notificationsAnchorEl}
              open={Boolean(notificationsAnchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  width: 320,
                  maxHeight: 400,
                  overflowY: "auto",
                  mt: 1.5,
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Notifications
                </Typography>
              </Box>
              <Divider />

              {/* Example notification items - replace with your actual notifications */}
              <MenuItem sx={{ py: 1.5 }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                    <Event
                      fontSize="small"
                      sx={{ color: theme.colors.secondary, mr: 1 }}
                    />
                    <Typography variant="body2" fontWeight={500}>
                      New Event
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.lightText }}
                  >
                    Community Town Hall meeting scheduled for Saturday.
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.colors.lightText,
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    5 minutes ago
                  </Typography>
                </Box>
              </MenuItem>

              <MenuItem sx={{ py: 1.5 }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                    <People
                      fontSize="small"
                      sx={{ color: theme.colors.primary, mr: 1 }}
                    />
                    <Typography variant="body2" fontWeight={500}>
                      New Members
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.lightText }}
                  >
                    5 new members have joined your community.
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.colors.lightText,
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    Yesterday
                  </Typography>
                </Box>
              </MenuItem>

              <MenuItem sx={{ py: 1.5 }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                    <HealthAndSafety
                      fontSize="small"
                      sx={{ color: theme.colors.warning, mr: 1 }}
                    />
                    <Typography variant="body2" fontWeight={500}>
                      Health Alert
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.lightText }}
                  >
                    COVID-19 vaccination clinic scheduled for next week.
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.colors.lightText,
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    2 days ago
                  </Typography>
                </Box>
              </MenuItem>

              <Divider />
              <MenuItem sx={{ justifyContent: "center", py: 1 }}>
                <Typography variant="body2" color={theme.colors.secondary}>
                  View All Notifications
                </Typography>
              </MenuItem>
            </Menu>

            {/* Profile Menu Button */}
            <Button
              onClick={handleProfileClick}
              startIcon={
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: theme.colors.primary,
                    color: theme.colors.white,
                    fontSize: 16,
                  }}
                >
                  {communityName.charAt(0).toUpperCase()}
                </Avatar>
              }
              endIcon={<Box sx={{ fontSize: 10 }}>▼</Box>}
              sx={{
                textTransform: "none",
                color: theme.colors.text,
                ml: 1,
                pl: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <Box
                sx={{
                  textAlign: "left",
                  ml: 0.5,
                  display: { xs: "none", lg: "block" },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, lineHeight: 1.2 }}
                >
                  Account
                </Typography>
              </Box>
            </Button>

            {/* Profile Menu */}
            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: { width: 220, mt: 1.5 },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {communityName}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.lightText }}
                  >
                    {subscriptionTier.charAt(0).toUpperCase() +
                      subscriptionTier.slice(1)}{" "}
                    Plan
                  </Typography>
                  {subscriptionTier !== "premium" && (
                    <Link href="/upgrade" style={{ textDecoration: "none" }}>
                      <Typography
                        variant="caption"
                        sx={{ color: theme.colors.primary, fontWeight: 500 }}
                      >
                        Upgrade
                      </Typography>
                    </Link>
                  )}
                </Box>
              </Box>
              <Divider />
              <MenuItem onClick={handleClose}>
                <Link
                  href="/profile"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Public sx={{ mr: 1.5, fontSize: 20 }} />
                  Community Profile
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
                    alignItems: "center",
                  }}
                >
                  <Settings sx={{ mr: 1.5, fontSize: 20 }} />
                  Settings
                </Link>
              </MenuItem>
              {subscriptionTier !== "basic" && (
                <MenuItem onClick={handleClose}>
                  <Link
                    href="/agents"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <SettingsApplications sx={{ mr: 1.5, fontSize: 20 }} />
                    Manage AI Agents
                  </Link>
                </MenuItem>
              )}
              <MenuItem onClick={handleClose}>
                <Link
                  href="/help"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Help sx={{ mr: 1.5, fontSize: 20 }} />
                  Help & Support
                </Link>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
                sx={{ color: theme.colors.error }}
              >
                <Logout sx={{ mr: 1.5, fontSize: 20 }} />
                Sign Out
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile Menu Button */}
          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <IconButton
              color="inherit"
              onClick={handleNotificationsClick}
              sx={{ color: theme.colors.text, mr: 1 }}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsOutlined />
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{
                color: theme.colors.text,
              }}
            >
              <MenuOutlined />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
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

export default CommunityDashboardHeader;