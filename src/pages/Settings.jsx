import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  Switch,
  FormControlLabel,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { toggleTheme, selectThemeMode } from '../store/slices/themeSlice';

const SettingsCategory = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 20px rgba(0, 0, 0, 0.5)'
    : '0 4px 20px rgba(0, 0, 0, 0.1)',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(to right bottom, #1a1a1a, #141414)'
    : 'linear-gradient(to right bottom, #ffffff, #f5f5f5)',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 0 20px rgba(3, 218, 198, 0.3)'
    : '0 0 20px rgba(3, 140, 126, 0.2)',
}));

const Settings = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectThemeMode);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    language: 'en',
    notifications: {
      priceAlerts: true,
      newsAlerts: true,
      marketSummary: true,
      accountActivity: true,
    },
    currency: 'USD',
    timezone: 'America/New_York',
  });

  const [editProfile, setEditProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  });

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  const handleNotificationChange = (setting) => {
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: !prev.notifications[setting],
      }
    }));
  };

  const handleProfileChange = (field, value) => {
    setProfileFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    setUserData(prev => ({
      ...prev,
      name: profileFormData.name,
      email: profileFormData.email,
      phone: profileFormData.phone,
    }));
    setEditProfile(false);
  };

  const handleLanguageChange = (event) => {
    setUserData(prev => ({
      ...prev,
      language: event.target.value,
    }));
  };

  const handleCurrencyChange = (event) => {
    setUserData(prev => ({
      ...prev,
      currency: event.target.value,
    }));
  };

  const handleTimezoneChange = (event) => {
    setUserData(prev => ({
      ...prev,
      timezone: event.target.value,
    }));
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: { xs: 2, md: 3 },
        backgroundImage: (theme) => theme.palette.mode === 'dark'
          ? 'radial-gradient(circle at 50% 14em, #313131 0%, #0c0c0c 60%, #000000 100%)'
          : 'radial-gradient(circle at 50% 14em, #ffffff 0%, #f5f5f5 60%, #e0e0e0 100%)',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: 'text.primary',
          textShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 0 8px rgba(255, 255, 255, 0.1)'
            : 'none',
        }}
      >
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <SettingsCategory>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <ProfileAvatar src="/avatar-placeholder.jpg" alt={userData.name}>
                {userData.name.split(' ').map(n => n[0]).join('')}
              </ProfileAvatar>
              <Box sx={{ position: 'relative', mt: -3, ml: 8 }}>
                <IconButton 
                  aria-label="upload picture" 
                  component="label"
                  sx={{ 
                    bgcolor: 'background.paper', 
                    boxShadow: 2,
                    '&:hover': { bgcolor: 'background.default' } 
                  }}
                  size="small"
                >
                  <input hidden accept="image/*" type="file" />
                  <UploadIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                {userData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userData.email}
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            {!editProfile ? (
              <>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Full Name"
                      secondary={userData.name}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={userData.email}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone"
                      secondary={userData.phone}
                    />
                  </ListItem>
                </List>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<EditIcon />}
                    onClick={() => setEditProfile(true)}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </>
            ) : (
              <Box component="form" sx={{ mt: 2 }}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={profileFormData.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={profileFormData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profileFormData.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      onClick={() => setEditProfile(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="contained" 
                      startIcon={<SaveIcon />}
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Stack>
              </Box>
            )}
          </SettingsCategory>
        </Grid>

        {/* Settings Accordion */}
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 3 }}>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="appearance-settings-content"
                id="appearance-settings-header"
              >
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                  {themeMode === 'dark' ? <DarkModeIcon sx={{ mr: 1 }} /> : <LightModeIcon sx={{ mr: 1 }} />}
                  Appearance
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ pl: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={themeMode === 'dark'}
                        onChange={handleThemeChange}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>Dark Mode</Typography>
                        {themeMode === 'dark' && (
                          <Chip 
                            label="Active" 
                            size="small" 
                            color="primary"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>
                    }
                  />
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="notifications-settings-content"
                id="notifications-settings-header"
              >
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                  <NotificationsIcon sx={{ mr: 1 }} />
                  Notifications
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <ListItemText primary="Price Alerts" />
                    <Switch
                      edge="end"
                      checked={userData.notifications.priceAlerts}
                      onChange={() => handleNotificationChange('priceAlerts')}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="News Alerts" />
                    <Switch
                      edge="end"
                      checked={userData.notifications.newsAlerts}
                      onChange={() => handleNotificationChange('newsAlerts')}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Daily Market Summary" />
                    <Switch
                      edge="end"
                      checked={userData.notifications.marketSummary}
                      onChange={() => handleNotificationChange('marketSummary')}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Account Activity" />
                    <Switch
                      edge="end"
                      checked={userData.notifications.accountActivity}
                      onChange={() => handleNotificationChange('accountActivity')}
                    />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="regional-settings-content"
                id="regional-settings-header"
              >
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                  <LanguageIcon sx={{ mr: 1 }} />
                  Regional Settings
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="language-select-label">Language</InputLabel>
                      <Select
                        labelId="language-select-label"
                        value={userData.language}
                        label="Language"
                        onChange={handleLanguageChange}
                      >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                        <MenuItem value="de">German</MenuItem>
                        <MenuItem value="zh">Chinese</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="currency-select-label">Currency</InputLabel>
                      <Select
                        labelId="currency-select-label"
                        value={userData.currency}
                        label="Currency"
                        onChange={handleCurrencyChange}
                      >
                        <MenuItem value="USD">US Dollar ($)</MenuItem>
                        <MenuItem value="EUR">Euro (€)</MenuItem>
                        <MenuItem value="GBP">British Pound (£)</MenuItem>
                        <MenuItem value="JPY">Japanese Yen (¥)</MenuItem>
                        <MenuItem value="CAD">Canadian Dollar (C$)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="timezone-select-label">Timezone</InputLabel>
                      <Select
                        labelId="timezone-select-label"
                        value={userData.timezone}
                        label="Timezone"
                        onChange={handleTimezoneChange}
                      >
                        <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
                        <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
                        <MenuItem value="America/Denver">Mountain Time (MT)</MenuItem>
                        <MenuItem value="America/Los_Angeles">Pacific Time (PT)</MenuItem>
                        <MenuItem value="Europe/London">London (GMT)</MenuItem>
                        <MenuItem value="Asia/Tokyo">Tokyo (JST)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="security-settings-content"
                id="security-settings-header"
              >
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                  <SecurityIcon sx={{ mr: 1 }} />
                  Security
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Two-Factor Authentication" 
                      secondary="Add an extra layer of security to your account" 
                    />
                    <Button variant="outlined" color="primary">Enable</Button>
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Change Password" 
                      secondary="It's a good idea to use a strong password that you don't use elsewhere" 
                    />
                    <Button variant="outlined" color="primary">Update</Button>
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Connected Devices" 
                      secondary="Manage devices that are currently logged into your account" 
                    />
                    <Button variant="outlined" color="primary">Manage</Button>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings; 