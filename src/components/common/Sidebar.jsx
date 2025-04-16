import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useMediaQuery,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccountBalance as PortfolioIcon,
  ShowChart as StocksIcon,
  Notifications as AlertsIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { selectThemeMode } from '../../store/slices/themeSlice';

const openedMixin = (theme, width = 240) => ({
  width: width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'width',
})(({ theme, open, width = 240 }) => ({
  width: width,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme, width),
    '& .MuiDrawer-paper': openedMixin(theme, width),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  height: 64,
}));

const CollapseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 12,
  top: 64,
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  zIndex: 999,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.05)',
  }
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: '8px 12px',
  padding: '10px 16px',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  backgroundColor: active 
    ? theme.palette.mode === 'dark' 
      ? 'rgba(3, 218, 198, 0.15)'
      : 'rgba(3, 140, 126, 0.08)'
    : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(0, 0, 0, 0.04)',
    transform: 'translateY(-2px)',
  },
  '& .MuiListItemIcon-root': {
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
    minWidth: 40,
  },
  '& .MuiListItemText-primary': {
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    fontWeight: active ? 600 : 400,
  },
}));

const navItems = [
  { 
    path: '/', 
    name: 'Dashboard', 
    icon: <DashboardIcon /> 
  },
  { 
    path: '/portfolio', 
    name: 'Portfolio', 
    icon: <PortfolioIcon /> 
  },
  { 
    path: '/stocks', 
    name: 'Stocks', 
    icon: <StocksIcon /> 
  },
  { 
    path: '/alerts', 
    name: 'Alerts', 
    icon: <AlertsIcon /> 
  },
  { 
    path: '/settings', 
    name: 'Settings', 
    icon: <SettingsIcon /> 
  },
];

const Sidebar = ({ isMobileOpen, handleDrawerToggle, isDesktop, width = 240, isExpanded, toggleSidebarWidth }) => {
  const location = useLocation();
  const themeMode = useSelector(selectThemeMode);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: 0.1, 
        duration: 0.5 
      } 
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: 0.1 * i, 
        duration: 0.3 
      } 
    }),
  };

  const drawer = (
    <>
      <Logo>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={logoVariants}
        >
          {isExpanded ? (
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 700, 
                letterSpacing: '0.5px',
                color: 'primary.main',
                textShadow: themeMode === 'dark' ? '0 0 8px rgba(3, 218, 198, 0.4)' : 'none',
              }}
            >
              FinDash
            </Typography>
          ) : (
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 700, 
                letterSpacing: '0.5px',
                color: 'primary.main',
                textShadow: themeMode === 'dark' ? '0 0 8px rgba(3, 218, 198, 0.4)' : 'none',
              }}
            >
              FD
            </Typography>
          )}
        </motion.div>
      </Logo>
      
      {isDesktop && (
        <CollapseButton onClick={toggleSidebarWidth} size="small">
          {isExpanded ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
        </CollapseButton>
      )}
      
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial="hidden"
            animate="visible"
            custom={index + 1}
            variants={itemVariants}
          >
            <Tooltip title={!isExpanded ? item.name : ""} placement="right" arrow>
              <StyledListItem
                button
                component={Link}
                to={item.path}
                active={location.pathname === item.path ? 1 : 0}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {isExpanded && <ListItemText primary={item.name} />}
              </StyledListItem>
            </Tooltip>
          </motion.div>
        ))}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ 
        width: { md: width }, 
        flexShrink: { md: 0 },
      }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={isMobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              background: (theme) => theme.palette.background.default,
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <StyledDrawer
          variant="permanent"
          open={isExpanded}
          width={width}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              background: (theme) => theme.palette.background.default,
              borderRight: (theme) => 
                `1px solid ${theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.12)' 
                  : 'rgba(0, 0, 0, 0.12)'}`,
            },
          }}
        >
          {drawer}
        </StyledDrawer>
      )}
    </Box>
  );
};

export default Sidebar; 