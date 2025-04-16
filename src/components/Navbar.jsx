import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  IconButton, 
  InputBase, 
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Dashboard as DashboardIcon,
  ShowChart as StocksIcon,
  Person as UserIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  AccountBalance as WalletIcon,
  Close as CloseIcon,
  Email as EmailIcon,
  Inbox as InboxIcon,
  Drafts as DraftsIcon,
  Send as SendIcon,
  ArrowForward as ArrowForwardIcon,
  VideoLibrary as VideoLibraryIcon,
  LiveTv as LiveTvIcon,
  TrendingUp as TrendingUpIcon,
  Analytics as AnalyticsIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' 
    ? '#1e1e1e' 
    : '#ffffff',
  color: theme.palette.text.primary,
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.2 : 0.05),
  display: 'flex',
  width: '100%',
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    maxWidth: 600,
  },
  border: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.3 : 0.1),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#2a2a2a' : '#f2f2f2',
  borderRadius: '0 20px 20px 0',
  cursor: 'pointer',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    width: '100%',
  },
}));

const StyledNavLink = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  fontWeight: active ? 600 : 500,
  textTransform: 'none',
  minWidth: 'unset',
  padding: '8px 12px',
  borderRadius: 0,
  borderBottom: active ? `3px solid ${theme.palette.primary.main}` : 'none',
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  },
}));

const LogoWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  '& img': {
    height: 28,
  },
});

const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const themeMode = useSelector(state => state.theme.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [mailAnchorEl, setMailAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMailMenuOpen = (event) => {
    setMailAnchorEl(event.currentTarget);
  };

  const handleMailMenuClose = () => {
    setMailAnchorEl(null);
  };
  
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality here
      console.log(`Searching for: ${searchQuery}`);
      // You could navigate to a search results page
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLoginOpen = () => {
    setOpenLoginDialog(true);
  };

  const handleLoginClose = () => {
    setOpenLoginDialog(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setOpenLoginDialog(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleMenuClose();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/profile">Profile</MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/settings">Settings</MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mailMenuId = 'mail-menu';
  const renderMailMenu = (
    <Menu
      anchorEl={mailAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={mailMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(mailAnchorEl)}
      onClose={handleMailMenuClose}
    >
      <MenuItem onClick={handleMailMenuClose}>
        <ListItemIcon>
          <InboxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Inbox" secondary="5 new messages" />
      </MenuItem>
      <MenuItem onClick={handleMailMenuClose}>
        <ListItemIcon>
          <DraftsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Drafts" secondary="3 drafts" />
      </MenuItem>
      <MenuItem onClick={handleMailMenuClose}>
        <ListItemIcon>
          <SendIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Sent" />
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMailMenuClose} component={Link} to="/messages">
        <ListItemText primary="See all messages" />
        <ArrowForwardIcon fontSize="small" />
      </MenuItem>
    </Menu>
  );
  
  // Login Dialog
  const renderLoginDialog = (
    <Dialog
      open={openLoginDialog}
      onClose={handleLoginClose}
      aria-labelledby="login-dialog-title"
    >
      <DialogTitle id="login-dialog-title">Sign In</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Sign in to access your FinDash account.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLoginClose}>Cancel</Button>
        <Button onClick={handleLogin} variant="contained">Sign In</Button>
      </DialogActions>
    </Dialog>
  );
  
  const mobileMenu = (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
    >
      <Box sx={{ 
        width: 280, 
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 2 
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            <span style={{ color: '#7B1FA2' }}>Fin</span>Dash
          </Typography>
          <IconButton onClick={handleMobileMenuToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <SearchBox sx={{ mb: 2, width: '100%' }}>
          <StyledInputBase
            placeholder="Search for news, symbols or companies"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
          />
          <SearchIconWrapper>
            <SearchIcon fontSize="small" />
          </SearchIconWrapper>
        </SearchBox>
        
        <List>
          <ListItem button component={Link} to="/" selected={isActive('/')}>
            <ListItemIcon>
              <DashboardIcon color={isActive('/') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="News" />
          </ListItem>
          <ListItem button component={Link} to="/portfolio" selected={isActive('/portfolio')}>
            <ListItemIcon>
              <WalletIcon color={isActive('/portfolio') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Finance" />
          </ListItem>
          <ListItem button component={Link} to="/stocks" selected={isActive('/stocks')}>
            <ListItemIcon>
              <StocksIcon color={isActive('/stocks') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Sports" />
          </ListItem>
          <Divider sx={{ my: 1 }} />
          <ListItem button component={Link} to="/markets">
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Markets" />
          </ListItem>
          <ListItem button component={Link} to="/research">
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Research" />
          </ListItem>
          <ListItem button component={Link} to="/personal-finance">
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Personal Finance" />
          </ListItem>
          <ListItem button component={Link} to="/videos">
            <ListItemIcon>
              <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Videos" />
          </ListItem>
          <ListItem button component={Link} to="/streaming">
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary="Streaming" />
          </ListItem>
        </List>
        
        <Box sx={{ mt: 'auto' }}>
          {isLoggedIn ? (
            <>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<UserIcon />}
                component={Link}
                to="/profile"
                sx={{ mb: 2, borderRadius: '20px', py: 1 }}
              >
                My Account
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleLogout}
                sx={{ mb: 2, borderRadius: '20px', py: 1 }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button 
              variant="contained" 
              fullWidth 
              startIcon={<UserIcon />}
              onClick={handleLoginOpen}
              sx={{ mb: 2, borderRadius: '20px', py: 1 }}
            >
              Sign In
            </Button>
          )}
          <Button 
            variant="outlined" 
            fullWidth 
            onClick={handleThemeToggle}
            startIcon={themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            sx={{ borderRadius: '20px', py: 1 }}
          >
            {themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <>
      <StyledAppBar>
        <Toolbar sx={{ minHeight: '48px', px: { xs: 1, sm: 2 } }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleMobileMenuToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <LogoWrapper>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{ 
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                letterSpacing: -0.5,
                mr: 2
              }}
            >
              <span style={{ color: '#7B1FA2' }}>Fin</span>Dash
            </Typography>
          </LogoWrapper>
          
          <form onSubmit={handleSearchSubmit} style={{ flexGrow: 1 }}>
            <SearchBox>
              <StyledInputBase
                placeholder="Search for news, symbols or companies"
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <SearchIconWrapper component="button" type="submit">
                <SearchIcon fontSize="small" />
              </SearchIconWrapper>
            </SearchBox>
          </form>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <StyledNavLink 
                component={Link} 
                to="/news" 
                active={isActive('/news') ? 1 : 0}
              >
                News
              </StyledNavLink>
              <StyledNavLink 
                component={Link} 
                to="/portfolio" 
                active={isActive('/portfolio') ? 1 : 0}
                sx={{ color: '#2e7d32' }}
              >
                Finance
              </StyledNavLink>
              <StyledNavLink 
                component={Link} 
                to="/markets" 
                active={isActive('/markets') ? 1 : 0}
              >
                Sports
              </StyledNavLink>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <Button
                  size="small"
                  sx={{ 
                    minWidth: 'unset', 
                    p: 0.5
                  }}
                  aria-controls="more-menu"
                  aria-haspopup="true"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  More
                  <span style={{ fontSize: '0.7rem', marginLeft: '4px' }}>▼</span>
                </Button>
                <Menu
                  id="more-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem component={Link} to="/research" onClick={handleMenuClose}>Research</MenuItem>
                  <MenuItem component={Link} to="/personal-finance" onClick={handleMenuClose}>Personal Finance</MenuItem>
                  <MenuItem component={Link} to="/videos" onClick={handleMenuClose}>Videos</MenuItem>
                  <MenuItem component={Link} to="/streaming" onClick={handleMenuClose}>Streaming</MenuItem>
                </Menu>
              </Box>
            </Box>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton 
              color="inherit"
              size="small"
              sx={{ ml: 1 }}
              onClick={handleMailMenuOpen}
              aria-controls={mailMenuId}
              aria-haspopup="true"
            >
              <EmailIcon fontSize="small" />
            </IconButton>
            
            {isLoggedIn ? (
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ ml: 2 }}
              >
                <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
              </IconButton>
            ) : (
              <Button 
                variant="contained" 
                size="small"
                onClick={handleLoginOpen}
                sx={{ 
                  ml: 2,
                  textTransform: 'none',
                  borderRadius: 1,
                  backgroundColor: '#383838',
                  '&:hover': {
                    backgroundColor: '#505050',
                  },
                  px: 2,
                  py: 0.5
                }}
              >
                Sign in
              </Button>
            )}
          </Box>
        </Toolbar>
        
        {!isMobile && (
          <Toolbar variant="dense" sx={{ minHeight: '36px', borderTop: `1px solid ${theme.palette.divider}`, px: 2 }}>
            <Button 
              variant="text"
              color="inherit"
              component={Link}
              to="/portfolio"
              sx={{ 
                textTransform: 'none', 
                fontWeight: 600,
                fontSize: '14px',
                color: '#00c532',
                mr: 2,
              }}
            >
              My Portfolio
            </Button>
            
            <Button 
              variant="text"
              color="inherit"
              component={Link}
              to="/news"
              sx={{ 
                textTransform: 'none', 
                fontWeight: 500,
                fontSize: '14px',
                mr: 2,
              }}
            >
              News
            </Button>
            
            <Button 
              variant="text"
              color="inherit"
              component={Link}
              to="/markets"
              sx={{ 
                textTransform: 'none', 
                fontWeight: 500,
                fontSize: '14px',
                mr: 2,
              }}
            >
              Markets
            </Button>
            
            <Button 
              variant="text"
              color="inherit"
              component={Link}
              to="/research"
              sx={{ 
                textTransform: 'none', 
                fontWeight: 500,
                fontSize: '14px',
                mr: 2,
              }}
            >
              Research
            </Button>
            
            <Button 
              variant="text"
              color="inherit"
              component={Link}
              to="/personal-finance"
              sx={{ 
                textTransform: 'none', 
                fontWeight: 500,
                fontSize: '14px',
                mr: 2,
              }}
            >
              Personal Finance
            </Button>
            
            <Button 
              variant="text"
              color="inherit"
              component={Link}
              to="/videos"
              sx={{ 
                textTransform: 'none', 
                fontWeight: 500,
                fontSize: '14px',
                mr: 2,
              }}
            >
              Videos
            </Button>
            
            <Button 
              variant="text"
              color="inherit"
              component={Link}
              to="/streaming"
              sx={{ 
                textTransform: 'none', 
                fontWeight: 500,
                fontSize: '14px',
              }}
            >
              Streaming Now
            </Button>
          </Toolbar>
        )}
      </StyledAppBar>
      {mobileMenu}
      {renderMenu}
      {renderMailMenu}
      {renderLoginDialog}
    </>
  );
};

export default Navbar; 