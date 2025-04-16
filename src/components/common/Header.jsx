import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  Switch, 
  Tooltip,
  alpha,
  Button,
  Badge,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { toggleTheme, selectThemeMode } from '../../store/slices/themeSlice';

const StyledAppBar = styled(AppBar)(({ theme, sidebarwidth = 240 }) => ({
  backdropFilter: 'blur(6px)',
  backgroundColor: alpha(
    theme.palette.mode === 'dark' 
      ? theme.palette.background.default 
      : theme.palette.background.paper, 
    0.8
  ),
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 20px rgba(0, 0, 0, 0.5)'
    : '0 1px 10px rgba(0, 0, 0, 0.1)',
  borderBottom: `1px solid ${
    theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.05)'
  }`,
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${sidebarwidth}px)`,
    marginLeft: sidebarwidth,
  },
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 3,
  backgroundColor: alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.15 : 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.25 : 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 2),
  transition: 'all 0.3s ease',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled('input')(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: theme.spacing(1, 1, 1, 0),
  border: 'none',
  outline: 'none',
  width: '100%',
  background: 'transparent',
  '&::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 0.7,
  },
}));

const Header = ({ handleDrawerToggle, pageTitle, isDesktop, sidebarWidth = 240 }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectThemeMode);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationsEl, setNotificationsEl] = React.useState(null);
  
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleNotificationsOpen = (event) => {
    setNotificationsEl(event.currentTarget);
  };
  
  const handleNotificationsClose = () => {
    setNotificationsEl(null);
  };

  return (
    <StyledAppBar 
      position="fixed" 
      color="default" 
      elevation={0}
      sidebarwidth={sidebarWidth}
    >
      <Toolbar sx={{ pr: { xs: 1, sm: 2, md: 3 } }}>
        {!isDesktop && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography 
          variant="h6" 
          noWrap 
          component="div"
          sx={{ 
            fontWeight: 600,
            display: { xs: 'none', sm: 'block' }
          }}
        >
          {pageTitle}
        </Typography>
        
        {isDesktop && (
          <SearchBox>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchBox>
        )}

        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton 
              color="inherit" 
              onClick={handleThemeToggle}
              sx={{ ml: 1 }}
            >
              {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit"
              onClick={handleNotificationsOpen}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Menu
            id="notifications-menu"
            anchorEl={notificationsEl}
            keepMounted
            open={Boolean(notificationsEl)}
            onClose={handleNotificationsClose}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.2))',
                mt: 1.5,
                minWidth: 300,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Stock alert: AAPL up by 3%
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Portfolio value increased by $1,250
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                New market report available
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Bond maturity approaching
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem dense>
              <Typography variant="body2" color="primary" align="center" sx={{ width: '100%' }}>
                See all notifications
              </Typography>
            </MenuItem>
          </Menu>
          
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleMenu}
              color="inherit"
              size="small"
              sx={{ ml: 2 }}
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40,
                  border: (theme) => `2px solid ${theme.palette.primary.main}`,
                  boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '0 0 10px rgba(3, 218, 198, 0.3)'
                    : '0 0 10px rgba(3, 169, 244, 0.2)',
                }}
              >
                AJ
              </Avatar>
            </IconButton>
          </Tooltip>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.2))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header; 