import { Box, Typography, keyframes } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Public, Groups, HealthAndSafety, Campaign, School, People } from '@mui/icons-material';

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

const LoadingScreen = () => {
  const [dots, setDots] = useState('.');
  const [loadingMessage, setLoadingMessage] = useState('Connecting your community');
  
  // Community-related loading messages
  const loadingMessages = [
    'Connecting your community',
    'Activating AI agents',
    'Building digital bridges',
    'Creating shared spaces',
    'Enhancing community health',
    'Setting up engagement tools'
  ];
  
  useEffect(() => {
    // Cycle through loading messages
    const messageInterval = setInterval(() => {
      setLoadingMessage(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 3000);
    
    // Animate the dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.');
    }, 500);
    
    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.contentWrapper}>
        {/* Logo */}
        <Box sx={styles.logoContainer}>
          <Public sx={styles.logoIcon} />
          <Typography 
            variant="h3" 
            sx={styles.logoText}
          >
            <span style={{ color: theme.colors.primary }}>Communi</span>
            <span style={{ color: theme.colors.secondary }}>care</span>
          </Typography>
        </Box>
        
        {/* Community Globe with AI agent icons */}
        <Box sx={styles.globeContainer}>
          <Box sx={styles.globe}>
            <Box sx={styles.globeInner}>
              {/* Rotating community icons */}
              <Box sx={styles.agentIconsContainer}>
                <Groups sx={{ ...styles.agentIcon, animationDelay: '0s' }} />
                <HealthAndSafety sx={{ ...styles.agentIcon, animationDelay: '0.5s' }} />
                <School sx={{ ...styles.agentIcon, animationDelay: '1s' }} />
              </Box>
            </Box>
          </Box>
        </Box>
        
        <Typography variant="h5" sx={styles.loadingText}>
          {loadingMessage}{dots}
        </Typography>
        
        <Box sx={styles.progressBar}>
          <Box sx={styles.progressFill}></Box>
        </Box>
        
        <Typography variant="body2" sx={styles.subText}>
          Your community platform powered by Fetch.ai AgentVerse
        </Typography>
      </Box>
      
      {/* Decorative elements representing community nodes and connections */}
      <Box sx={styles.decorativeCircle1}></Box>
      <Box sx={styles.decorativeCircle2}></Box>
      <Box sx={{
        ...styles.decorativeCircle3,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          backgroundColor: `rgba(61, 139, 211, 0.1)`,
          transform: 'translate(-50%, -50%)'
        }
      }}></Box>
      
      {/* Connection lines effect */}
      <Box sx={styles.connectionsContainer}>
        <Box sx={{...styles.connection, animationDelay: '0.2s'}}></Box>
        <Box sx={{...styles.connection, animationDelay: '0.8s', left: '60%'}}></Box>
        <Box sx={{...styles.connection, animationDelay: '1.5s', left: '40%'}}></Box>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    background: `linear-gradient(135deg, ${theme.colors.light} 0%, #e0ebf9 100%)`,
    position: 'relative',
    overflow: 'hidden',
    animation: `${fadeIn} 0.5s ease-in-out`,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    padding: '2rem',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
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
    letterSpacing: '-0.5px',
  },
  globeContainer: {
    position: 'relative',
    marginBottom: '2rem',
  },
  globe: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '90%',
      height: '90%',
      borderRadius: '50%',
      border: '2px solid rgba(0, 0, 0, 0.05)',
    },
  },
  globeInner: {
    width: '80%',
    height: '80%',
    borderRadius: '50%',
    backgroundColor: `rgba(61, 139, 211, 0.1)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentIconsContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    animation: `${rotate} 8s infinite linear`,
  },
  agentIcon: {
    position: 'absolute',
    fontSize: 28,
    color: theme.colors.secondary,
    animation: `${float} 2s infinite ease-in-out`,
    '&:nth-of-type(1)': {
      top: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    '&:nth-of-type(2)': {
      bottom: '15%',
      left: '15%',
    },
    '&:nth-of-type(3)': {
      bottom: '15%',
      right: '15%',
    },
  },
  loadingText: {
    color: theme.colors.primary,
    marginBottom: '1.5rem',
    fontFamily: 'Segoe UI, sans-serif',
    fontWeight: 600,
    textAlign: 'center',
  },
  subText: {
    color: theme.colors.secondary,
    marginTop: '1rem',
    fontFamily: 'Segoe UI, sans-serif',
    opacity: 0.9,
  },
  progressBar: {
    width: '250px',
    height: '4px',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '100%',
    backgroundImage: `linear-gradient(90deg, transparent, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.primary}, transparent)`,
    backgroundSize: '200% 100%',
    animation: `${shimmer} 2s infinite linear`,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: `radial-gradient(circle, rgba(61, 139, 211, 0.1) 0%, rgba(61, 139, 211, 0) 70%)`,
    top: '-100px',
    left: '-100px',
    zIndex: 1,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: `radial-gradient(circle, rgba(110, 68, 255, 0.08) 0%, rgba(110, 68, 255, 0) 70%)`,
    bottom: '-150px',
    right: '-150px',
    zIndex: 1,
  },
  decorativeCircle3: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: `radial-gradient(circle, rgba(0, 204, 255, 0.07) 0%, rgba(0, 204, 255, 0) 70%)`,
    bottom: '100px',
    left: '15%',
    zIndex: 1,
  },
  connectionsContainer: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '100px',
    zIndex: 1,
  },
  connection: {
    position: 'absolute',
    width: '20px',
    height: '60px',
    backgroundColor: `rgba(0, 204, 255, 0.3)`,
    borderRadius: '50%',
    left: '50%',
    transform: 'translateX(-50%)',
    filter: 'blur(10px)',
    animation: `${float} 3s infinite ease-out`,
    opacity: 0.6,
  }
};

export default LoadingScreen;