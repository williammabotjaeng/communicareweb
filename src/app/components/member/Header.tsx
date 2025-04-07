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
} from "@mui/material";
import { useCookies } from "react-cookie";
import { useStore } from "zustand";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/state/use-auth-store";
import {
  Public,
  Search,
  Favorite,
  Settings,
  Logout,
  NotificationsOutlined,
  AccountCircle,
  Home,
  History,
  MenuOutlined,
  HealthAndSafety,
  School,
  Groups,
  Event,
  Campaign,
  People,
  CalendarMonth,
  Forum,
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
  },
};

export const MemberDashboardHeader: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "access",
    "refresh",
    "user",
    "user_role",
    "username",
    "displayName",
    "community_name",
  ]);
  const router = useRouter();
  const { clearAuth } = useStore(useAuthStore);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  const { logout, logoutIsLoading } = useAuth();

  // Get user display name from cookies
  const userDisplayName = cookies.displayName || cookies.username || "Member";
  
  // Get community name from cookies
  const communityName = cookies.community_name || "My Community";

  // Example notification count - this would come from your notification system
  const notificationCount = 3;

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };
  
  const handleServicesClick = (event) => {
    setServicesAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setProfileAnchorEl(null);
    setNotificationsAnchorEl(null);
    setServicesAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
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

      {/* User profile summary */}
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
          {userDisplayName.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {userDisplayName}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
            {communityName}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Navigation items */}
      <Link href="/dashboard" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          startIcon={<Home />}
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
          Community
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

      <Link href="/history" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          startIcon={<History />}
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
          Recent Activity
        </Button>
      </Link>

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
            
            <Chip
              label={communityName}
              size="small"
              sx={{
                ml: 2,
                bgcolor: `${theme.colors.primary}15`,
                color: theme.colors.primary,
                fontWeight: 500,
                display: { xs: "none", sm: "flex" }
              }}
            />
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: { md: 1, lg: 2 },
            }}
          >
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 2 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Dashboard
              </Button>
            </Link>

            <Link href="/events" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 2 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Events
              </Button>
            </Link>

            <Link href="/announcements" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 2 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Announcements
              </Button>
            </Link>

            {/* Services Dropdown */}
            <Button
              onClick={handleServicesClick}
              sx={{
                color: theme.colors.text,
                px: { md: 1, lg: 2 },
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
                  href="/directory"
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
              <MenuItem onClick={handleClose}>
                <Link
                  href="/forums"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Forum sx={{ mr: 1.5, fontSize: 20 }} />
                  Community Forums
                </Link>
              </MenuItem>
            </Menu>

            {/* Notifications icon with badge */}
            <IconButton
              color="inherit"
              onClick={handleNotificationsClick}
              sx={{ color: theme.colors.text }}
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
                      sx={{ color: theme.colors.primary, mr: 1 }}
                    />
                    <Typography variant="body2" fontWeight={500}>
                      New Event Added
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.lightText }}
                  >
                    Community Town Hall meeting this Saturday at 10AM.
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.colors.lightText,
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    2 hours ago
                  </Typography>
                </Box>
              </MenuItem>

              <MenuItem sx={{ py: 1.5 }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                    <HealthAndSafety
                      fontSize="small"
                      sx={{ color: theme.colors.secondary, mr: 1 }}
                    />
                    <Typography variant="body2" fontWeight={500}>
                      Health Services
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
                    Yesterday
                  </Typography>
                </Box>
              </MenuItem>
              
              <MenuItem sx={{ py: 1.5 }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                    <Campaign
                      fontSize="small"
                      sx={{ color: theme.colors.accent, mr: 1 }}
                    />
                    <Typography variant="body2" fontWeight={500}>
                      Community Announcement
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.lightText }}
                  >
                    Road maintenance scheduled for Oak Street next Monday.
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
                  {userDisplayName.charAt(0).toUpperCase()}
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
                  {userDisplayName}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: theme.colors.lightText, lineHeight: 1.2 }}
                >
                  Community Member
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
                  {userDisplayName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.colors.lightText }}
                >
                  {communityName}
                </Typography>
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
                  <AccountCircle sx={{ mr: 1.5, fontSize: 20 }} />
                  My Profile
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

export default MemberDashboardHeader;