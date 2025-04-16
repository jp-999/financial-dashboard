import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  Button,
  TextField,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Switch,
  FormControlLabel,
  Zoom,
  Fade,
  Avatar,
  Tooltip,
  Badge,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
  NotificationsOff as NotificationsOffIcon,
  Info as InfoIcon,
  ArrowDropUp as ArrowUpIcon,
  ArrowDropDown as ArrowDownIcon,
  Timeline as TimelineIcon,
  Equalizer as EqualizerIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.5)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(to right bottom, #1e1e1e, #121212)'
    : 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '5px',
    background: 'linear-gradient(to right, #03dac6, #536dfe)',
  },
}));

const AlertIconWrapper = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(3, 218, 198, 0.1)' 
    : 'rgba(3, 218, 198, 0.08)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 0 15px rgba(3, 218, 198, 0.2)'
    : '0 4px 12px rgba(3, 218, 198, 0.1)',
}));

const AlertChip = styled(Chip)(({ theme, alerttype }) => ({
  fontWeight: 'bold',
  borderRadius: 20,
  height: 28,
  padding: '0 8px',
  backgroundColor: 
    alerttype === 'price_above' ? theme.palette.success.main :
    alerttype === 'price_below' ? theme.palette.error.main :
    alerttype === 'percent_change' ? theme.palette.warning.main :
    theme.palette.info.main,
  color: theme.palette.common.white,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 0 10px rgba(0, 0, 0, 0.3)'
    : '0 2px 5px rgba(0, 0, 0, 0.1)',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(0, 0, 0, 0.3)'
    : '0 4px 12px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 24px rgba(0, 0, 0, 0.4)'
      : '0 8px 24px rgba(0, 0, 0, 0.08)',
  },
  padding: theme.spacing(2),
}));

const AddAlertButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: '10px 24px',
  fontWeight: 'bold',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(3, 218, 198, 0.3)'
    : '0 4px 12px rgba(3, 140, 126, 0.2)',
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark'
      ? '0 6px 18px rgba(3, 218, 198, 0.4)'
      : '0 6px 18px rgba(3, 140, 126, 0.3)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

const IconContainer = styled(Box)(({ type, theme }) => {
  let color = theme.palette.info.main;
  if (type === 'price_above') color = theme.palette.success.main;
  if (type === 'price_below') color = theme.palette.error.main;
  if (type === 'percent_change') color = theme.palette.warning.main;
  
  return {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(0, 0, 0, 0.2)' 
      : 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    padding: '5px',
    marginRight: '5px',
    boxShadow: `0 0 0 2px ${color}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
});

// Mock data for alerts
const mockAlerts = [
  {
    id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'price_above',
    value: 190.00,
    active: true,
    createdAt: '2023-04-15T10:30:00Z',
  },
  {
    id: 2,
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    type: 'price_below',
    value: 350.00,
    active: true,
    createdAt: '2023-04-14T14:45:00Z',
  },
  {
    id: 3,
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    type: 'percent_change',
    value: 5.00,
    active: false,
    createdAt: '2023-04-12T09:15:00Z',
  },
  {
    id: 4,
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    type: 'volume_spike',
    value: 10000000,
    active: true,
    createdAt: '2023-04-11T16:20:00Z',
  },
];

// Mock data for available stocks
const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.' },
];

const alertTypes = [
  { value: 'price_above', label: 'Price Above', icon: <ArrowUpIcon /> },
  { value: 'price_below', label: 'Price Below', icon: <ArrowDownIcon /> },
  { value: 'percent_change', label: 'Percent Change', icon: <TimelineIcon /> },
  { value: 'volume_spike', label: 'Volume Spike', icon: <EqualizerIcon /> },
];

const getAlertTypeLabel = (type) => {
  const alertType = alertTypes.find(t => t.value === type);
  return alertType ? alertType.label : type;
};

const getAlertTypeIcon = (type) => {
  const alertType = alertTypes.find(t => t.value === type);
  return alertType ? alertType.icon : <InfoIcon />;
};

const formatAlertValue = (type, value) => {
  switch (type) {
    case 'price_above':
    case 'price_below':
      return `$${value.toFixed(2)}`;
    case 'percent_change':
      return `${value.toFixed(2)}%`;
    case 'volume_spike':
      return value.toLocaleString();
    default:
      return value;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const Alerts = () => {
  const theme = useTheme();
  const [alerts, setAlerts] = useState(mockAlerts);
  const [open, setOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState('');
  const [selectedAlertType, setSelectedAlertType] = useState('price_above');
  const [alertValue, setAlertValue] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editAlertId, setEditAlertId] = useState(null);

  const activeAlertsCount = alerts.filter(alert => alert.active).length;

  const handleClickOpen = () => {
    setOpen(true);
    setEditMode(false);
    resetForm();
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedStock('');
    setSelectedAlertType('price_above');
    setAlertValue('');
    setEditAlertId(null);
  };

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  const handleAlertTypeChange = (event) => {
    setSelectedAlertType(event.target.value);
  };

  const handleAlertValueChange = (event) => {
    setAlertValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!selectedStock || !selectedAlertType || !alertValue) {
      return;
    }

    const selectedStockData = mockStocks.find(stock => stock.symbol === selectedStock);
    
    if (editMode && editAlertId) {
      setAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === editAlertId 
            ? {
                ...alert,
                symbol: selectedStock,
                name: selectedStockData.name,
                type: selectedAlertType,
                value: parseFloat(alertValue),
              } 
            : alert
        )
      );
    } else {
      const newAlert = {
        id: Date.now(),
        symbol: selectedStock,
        name: selectedStockData.name,
        type: selectedAlertType,
        value: parseFloat(alertValue),
        active: true,
        createdAt: new Date().toISOString(),
      };
      
      setAlerts(prevAlerts => [...prevAlerts, newAlert]);
    }
    
    handleClose();
  };

  const handleEdit = (alert) => {
    setSelectedStock(alert.symbol);
    setSelectedAlertType(alert.type);
    setAlertValue(alert.value.toString());
    setEditMode(true);
    setEditAlertId(alert.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  const handleToggleActive = (id) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === id ? { ...alert, active: !alert.active } : alert
      )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: { xs: 2, md: 4 },
        backgroundImage: (theme) => theme.palette.mode === 'dark'
          ? 'radial-gradient(circle at 50% 14em, #313131 0%, #0c0c0c 60%, #000000 100%)'
          : 'radial-gradient(circle at 50% 14em, #ffffff 0%, #f5f5f5 60%, #e0e0e0 100%)',
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge 
                badgeContent={activeAlertsCount} 
                color="primary"
                sx={{ mr: 2 }}
              >
                <Avatar
                  sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(3, 218, 198, 0.2)' : 'rgba(3, 218, 198, 0.1)',
                    width: 56,
                    height: 56,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                >
                  <NotificationsIcon 
                    fontSize="large" 
                    sx={{ color: theme.palette.primary.main }}
                  />
                </Avatar>
              </Badge>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    textShadow: (theme) => theme.palette.mode === 'dark'
                      ? '0 0 8px rgba(255, 255, 255, 0.1)'
                      : 'none',
                  }}
                >
                  Price Alerts
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Get notified when price conditions are met
                </Typography>
              </Box>
            </Box>
            <AddAlertButton
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              Create Alert
            </AddAlertButton>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper elevation={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                My Alerts
              </Typography>
              <Chip 
                label={`${activeAlertsCount} Active`} 
                color="primary" 
                size="small"
                sx={{ fontWeight: 'bold' }}
              />
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <List>
                {alerts.length === 0 ? (
                  <Fade in timeout={1000}>
                    <StyledListItem>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', py: 4 }}>
                        <NotificationsIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" align="center" color="text.secondary">
                          No alerts set
                        </Typography>
                        <Typography variant="body2" align="center" color="text.disabled" sx={{ mt: 1 }}>
                          Create your first price alert by clicking 'Create Alert' button above
                        </Typography>
                      </Box>
                    </StyledListItem>
                  </Fade>
                ) : (
                  alerts.map((alert, index) => (
                    <Zoom in key={alert.id} style={{ transitionDelay: `${index * 50}ms` }}>
                      <motion.div variants={itemVariants}>
                        <StyledListItem>
                          <AlertIconWrapper>
                            {alert.active ? (
                              <NotificationsActiveIcon color="primary" fontSize="large" />
                            ) : (
                              <NotificationsOffIcon color="disabled" fontSize="large" />
                            )}
                          </AlertIconWrapper>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 1 }}>
                                  {alert.symbol}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {alert.name}
                                </Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <Tooltip title={`Created on ${formatDate(alert.createdAt)}`}>
                                  <Typography variant="caption" color="text.disabled" sx={{ ml: 1 }}>
                                    {formatDate(alert.createdAt)}
                                  </Typography>
                                </Tooltip>
                              </Box>
                            }
                            secondary={
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <IconContainer type={alert.type}>
                                  {getAlertTypeIcon(alert.type)}
                                </IconContainer>
                                <AlertChip 
                                  label={getAlertTypeLabel(alert.type)} 
                                  size="small" 
                                  alerttype={alert.type}
                                  sx={{ mr: 1 }}
                                />
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {formatAlertValue(alert.type, alert.value)}
                                </Typography>
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={alert.active}
                                  onChange={() => handleToggleActive(alert.id)}
                                  color="primary"
                                  size="small"
                                />
                              }
                              label={
                                <Typography variant="body2" sx={{ mr: 1 }}>
                                  {alert.active ? "Active" : "Inactive"}
                                </Typography>
                              }
                              labelPlacement="start"
                            />
                            <Tooltip title="Edit alert">
                              <IconButton 
                                edge="end" 
                                aria-label="edit"
                                onClick={() => handleEdit(alert)}
                                sx={{ 
                                  ml: 1,
                                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                                  '&:hover': {
                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                                  }
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete alert">
                              <IconButton 
                                edge="end" 
                                aria-label="delete"
                                onClick={() => handleDelete(alert.id)}
                                sx={{ 
                                  ml: 1,
                                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                                  '&:hover': {
                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                                  }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </ListItemSecondaryAction>
                        </StyledListItem>
                      </motion.div>
                    </Zoom>
                  ))
                )}
              </List>
            </motion.div>
          </StyledPaper>
        </Grid>
      </Grid>

      {/* Dialog for creating/editing alerts */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          elevation: 24,
          sx: {
            borderRadius: 2,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(to right bottom, #1e1e1e, #121212)'
              : 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
            px: 2
          }
        }}
      >
        <DialogTitle sx={{ 
          pt: 3, 
          display: 'flex', 
          alignItems: 'center',
          fontWeight: 700,
          fontSize: '1.5rem'
        }}>
          <Avatar sx={{ 
            bgcolor: 'primary.main', 
            mr: 2,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            {editMode ? <EditIcon /> : <AddIcon />}
          </Avatar>
          {editMode ? 'Edit Alert' : 'Create New Alert'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="stock-label">Stock</InputLabel>
                <Select
                  labelId="stock-label"
                  value={selectedStock}
                  onChange={handleStockChange}
                  label="Stock"
                >
                  {mockStocks.map((stock) => (
                    <MenuItem key={stock.symbol} value={stock.symbol}>
                      <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
                        {stock.symbol}
                      </Typography> - {stock.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="alert-type-label">Alert Type</InputLabel>
                <Select
                  labelId="alert-type-label"
                  value={selectedAlertType}
                  onChange={handleAlertTypeChange}
                  label="Alert Type"
                >
                  {alertTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 1 }}>{type.icon}</Box>
                        {type.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Value"
                type="number"
                value={alertValue}
                onChange={handleAlertValueChange}
                InputProps={{
                  startAdornment: selectedAlertType === 'price_above' || selectedAlertType === 'price_below' ? '$' : '',
                  endAdornment: selectedAlertType === 'percent_change' ? '%' : '',
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleClose}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            sx={{ 
              borderRadius: 2, 
              px: 3,
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'  
            }}
          >
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Alerts; 