import React, { useState, useEffect } from 'react';
import { Box, Toolbar, CssBaseline, useMediaQuery, useTheme, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const getPageTitle = (pathname) => {
  switch (pathname) {
    case '/':
      return 'Dashboard';
    case '/portfolio':
      return 'Portfolio';
    case '/stocks':
      return 'Stocks';
    case '/alerts':
      return 'Alerts';
    case '/settings':
      return 'Settings';
    default:
      return 'Dashboard';
  }
};

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isExpanded, setIsExpanded] = useState(true);

  // Auto-open sidebar on desktop and auto-close on mobile
  useEffect(() => {
    if (isDesktop) {
      setMobileOpen(false);
    }
  }, [isDesktop]);

  // Toggle sidebar width on desktop
  const toggleSidebarWidth = () => {
    const newIsExpanded = !isExpanded;
    setIsExpanded(newIsExpanded);
    setSidebarWidth(newIsExpanded ? 240 : 72);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      <Header 
        handleDrawerToggle={handleDrawerToggle} 
        pageTitle={pageTitle} 
        isDesktop={isDesktop}
        sidebarWidth={sidebarWidth}
      />
      
      <Sidebar 
        isMobileOpen={mobileOpen} 
        handleDrawerToggle={handleDrawerToggle}
        isDesktop={isDesktop}
        width={sidebarWidth}
        isExpanded={isExpanded}
        toggleSidebarWidth={toggleSidebarWidth}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: '100%', lg: `calc(100% - ${sidebarWidth}px)` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          ml: { xs: 0, lg: `${sidebarWidth}px` },
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container 
          maxWidth={isDesktop ? 'xl' : 'lg'} 
          sx={{ 
            py: { xs: 2, md: 3 },
            px: { xs: 2, md: 3, lg: 4 },
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 