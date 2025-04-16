import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  useTheme
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  SaveAlt as ExportIcon,
  MoreVert as MoreVertIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  History as HistoryIcon,
  Analytics as AnalyticsIcon,
  Timeline as TimelineIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { selectPortfolioData } from '../store/slices/portfolioSlice';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
}));

// Sample data for portfolio performance chart
const performanceData = [
  { name: 'Jan', value: 96000 },
  { name: 'Feb', value: 94500 },
  { name: 'Mar', value: 98000 },
  { name: 'Apr', value: 99200 },
  { name: 'May', value: 103000 },
  { name: 'Jun', value: 108500 },
  { name: 'Jul', value: 112000 },
];

// Sample data for transaction history
const transactionHistory = [
  { id: 1, date: '2023-06-15', type: 'Buy', symbol: 'AAPL', shares: 10, price: 185.92, total: 1859.20 },
  { id: 2, date: '2023-06-10', type: 'Sell', symbol: 'MSFT', shares: 5, price: 338.65, total: 1693.25 },
  { id: 3, date: '2023-06-05', type: 'Buy', symbol: 'GOOGL', shares: 8, price: 125.23, total: 1001.84 },
  { id: 4, date: '2023-05-25', type: 'Dividend', symbol: 'JNJ', shares: null, price: null, total: 88.50 },
  { id: 5, date: '2023-05-20', type: 'Buy', symbol: 'AMZN', shares: 12, price: 124.25, total: 1491.00 },
];

// Sample data for allocation
const allocationData = [
  { name: 'Technology', value: 45, color: '#8884d8' },
  { name: 'Healthcare', value: 20, color: '#82ca9d' },
  { name: 'Consumer Goods', value: 15, color: '#ffc658' },
  { name: 'Financials', value: 10, color: '#ff8042' },
  { name: 'Energy', value: 10, color: '#0088fe' },
];

const Portfolio = () => {
  const theme = useTheme();
  const portfolioData = useSelector(selectPortfolioData);
  const [tabValue, setTabValue] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [holdingMenuAnchorEl, setHoldingMenuAnchorEl] = useState(null);
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [openTradeDialog, setOpenTradeDialog] = useState(false);
  const [tradeType, setTradeType] = useState('buy');
  const [tradeQuantity, setTradeQuantity] = useState('');
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  
  const handleHoldingMenuOpen = (event, holding) => {
    setHoldingMenuAnchorEl(event.currentTarget);
    setSelectedHolding(holding);
  };
  
  const handleHoldingMenuClose = () => {
    setHoldingMenuAnchorEl(null);
    setSelectedHolding(null);
  };
  
  const handleOpenTradeDialog = (type = 'buy') => {
    setTradeType(type);
    setOpenTradeDialog(true);
    handleHoldingMenuClose();
  };
  
  const handleCloseTradeDialog = () => {
    setOpenTradeDialog(false);
    setTradeQuantity('');
  };
  
  const handleExecuteTrade = () => {
    // Here you would handle the actual trade execution
    console.log(`Executing ${tradeType} order for ${selectedHolding?.symbol}: ${tradeQuantity} shares`);
    handleCloseTradeDialog();
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
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
          Portfolio Details
        </Typography>
        
        <Box>
          <Tooltip title="Refresh Data">
            <IconButton sx={{ mr: 1 }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export Data">
            <IconButton sx={{ mr: 1 }}>
              <ExportIcon />
            </IconButton>
          </Tooltip>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => handleOpenTradeDialog('buy')}
          >
            Add Position
          </Button>
          <IconButton 
            sx={{ ml: 1 }}
            onClick={handleMenuOpen}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <ShareIcon fontSize="small" sx={{ mr: 1 }} />
              Share Portfolio
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <AnalyticsIcon fontSize="small" sx={{ mr: 1 }} />
              Portfolio Analysis
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <TimelineIcon fontSize="small" sx={{ mr: 1 }} />
              Performance Report
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Portfolio Summary Card */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 4px 20px rgba(0, 0, 0, 0.5)'
                : '0 4px 20px rgba(0, 0, 0, 0.1)',
              background: (theme) => theme.palette.mode === 'dark'
                ? 'linear-gradient(to right bottom, #1a1a1a, #141414)'
                : 'linear-gradient(to right bottom, #ffffff, #f5f5f5)'
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Portfolio Overview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="body2" color="text.secondary">Total Value</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    ${portfolioData?.totalValue?.toLocaleString() || '0'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="body2" color="text.secondary">Daily Change</Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700, 
                      color: (portfolioData?.dailyChange || 0) >= 0 ? 'success.main' : 'error.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {(portfolioData?.dailyChange || 0) >= 0 ? (
                      <ArrowUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                    ) : (
                      <ArrowDownIcon fontSize="small" sx={{ mr: 0.5 }} />
                    )}
                    {(portfolioData?.dailyChange || 0) >= 0 ? '+' : ''}
                    {portfolioData?.dailyChange?.toFixed(2) || '0.00'}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="body2" color="text.secondary">Total Profit/Loss</Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700, 
                      color: (portfolioData?.totalProfitLoss || 0) >= 0 ? 'success.main' : 'error.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {(portfolioData?.totalProfitLoss || 0) >= 0 ? (
                      <ArrowUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                    ) : (
                      <ArrowDownIcon fontSize="small" sx={{ mr: 0.5 }} />
                    )}
                    ${(portfolioData?.totalProfitLoss || 0) >= 0 ? '+' : ''}
                    {portfolioData?.totalProfitLoss?.toLocaleString() || '0'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="body2" color="text.secondary">Return</Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700, 
                      color: (portfolioData?.totalReturn || 0) >= 0 ? 'success.main' : 'error.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {(portfolioData?.totalReturn || 0) >= 0 ? (
                      <ArrowUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                    ) : (
                      <ArrowDownIcon fontSize="small" sx={{ mr: 0.5 }} />
                    )}
                    {(portfolioData?.totalReturn || 0) >= 0 ? '+' : ''}
                    {portfolioData?.totalReturn?.toFixed(2) || '0.00'}%
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Performance Chart */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 4px 20px rgba(0, 0, 0, 0.5)'
                : '0 4px 20px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              height: '400px'
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Portfolio Performance
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={theme.palette.primary.main} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        {/* Allocation Chart */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 4px 20px rgba(0, 0, 0, 0.5)'
                : '0 4px 20px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              height: '400px'
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Allocation
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        {/* Tabs for Holdings and Transactions */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 4px 20px rgba(0, 0, 0, 0.5)'
                : '0 4px 20px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="portfolio tabs">
                <Tab label="Holdings" />
                <Tab label="Transactions" />
              </Tabs>
            </Box>
            
            {/* Holdings Tab */}
            {tabValue === 0 && (
              <Box sx={{ mt: 2 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Symbol</StyledTableCell>
                        <StyledTableCell>Company</StyledTableCell>
                        <StyledTableCell align="right">Shares</StyledTableCell>
                        <StyledTableCell align="right">Avg. Cost</StyledTableCell>
                        <StyledTableCell align="right">Current Price</StyledTableCell>
                        <StyledTableCell align="right">Current Value</StyledTableCell>
                        <StyledTableCell align="right">Return</StyledTableCell>
                        <StyledTableCell align="center">Actions</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {portfolioData?.holdings?.map((holding) => (
                        <TableRow key={holding.symbol} hover>
                          <TableCell>
                            <Typography fontWeight="bold">{holding.symbol}</Typography>
                          </TableCell>
                          <TableCell>{holding.name}</TableCell>
                          <TableCell align="right">{holding.shares}</TableCell>
                          <TableCell align="right">${holding.avgCost?.toFixed(2) || '0.00'}</TableCell>
                          <TableCell align="right">${holding.currentPrice?.toFixed(2) || '0.00'}</TableCell>
                          <TableCell align="right">${holding.currentValue?.toLocaleString() || '0'}</TableCell>
                          <TableCell 
                            align="right"
                            sx={{ 
                              fontWeight: 600,
                              color: (holding.return || 0) >= 0 ? 'success.main' : 'error.main'
                            }}
                          >
                            {(holding.return || 0) >= 0 ? (
                              <ArrowUpIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                            ) : (
                              <ArrowDownIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                            )}
                            {(holding.return || 0) >= 0 ? '+' : ''}
                            {holding.return?.toFixed(2) || '0.00'}%
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              onClick={(e) => handleHoldingMenuOpen(e, holding)}
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Menu
                  anchorEl={holdingMenuAnchorEl}
                  open={Boolean(holdingMenuAnchorEl)}
                  onClose={handleHoldingMenuClose}
                >
                  <MenuItem onClick={() => handleOpenTradeDialog('buy')}>
                    <AddIcon fontSize="small" sx={{ mr: 1 }} />
                    Buy More
                  </MenuItem>
                  <MenuItem onClick={() => handleOpenTradeDialog('sell')}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    Sell Shares
                  </MenuItem>
                  <MenuItem onClick={handleHoldingMenuClose}>
                    <AnalyticsIcon fontSize="small" sx={{ mr: 1 }} />
                    View Details
                  </MenuItem>
                  <MenuItem onClick={handleHoldingMenuClose}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                    Edit Position
                  </MenuItem>
                </Menu>
              </Box>
            )}
            
            {/* Transactions Tab */}
            {tabValue === 1 && (
              <Box sx={{ mt: 2 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Type</StyledTableCell>
                        <StyledTableCell>Symbol</StyledTableCell>
                        <StyledTableCell align="right">Shares</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                        <StyledTableCell align="right">Total</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactionHistory.map((transaction) => (
                        <TableRow key={transaction.id} hover>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <Chip 
                              label={transaction.type} 
                              size="small"
                              color={
                                transaction.type === 'Buy' ? 'success' :
                                transaction.type === 'Sell' ? 'error' :
                                'primary'
                              }
                              sx={{ fontWeight: 'bold' }}
                            />
                          </TableCell>
                          <TableCell>{transaction.symbol}</TableCell>
                          <TableCell align="right">{transaction.shares !== null ? transaction.shares : '-'}</TableCell>
                          <TableCell align="right">{transaction.price !== null ? `$${transaction.price}` : '-'}</TableCell>
                          <TableCell align="right">${transaction.total.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Trade Dialog */}
      <Dialog open={openTradeDialog} onClose={handleCloseTradeDialog}>
        <DialogTitle>
          {tradeType === 'buy' ? 'Buy Shares' : 'Sell Shares'}
          {selectedHolding && ` - ${selectedHolding.symbol}`}
        </DialogTitle>
        <DialogContent>
          {selectedHolding ? (
            <>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Current Price: ${selectedHolding.currentPrice?.toFixed(2) || '0.00'}
              </Typography>
              {tradeType === 'sell' && (
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Available Shares: {selectedHolding.shares}
                </Typography>
              )}
            </>
          ) : (
            <FormControl fullWidth margin="normal">
              <InputLabel id="symbol-select-label">Symbol</InputLabel>
              <Select
                labelId="symbol-select-label"
                id="symbol-select"
                label="Symbol"
              >
                {portfolioData?.holdings?.map((holding) => (
                  <MenuItem key={holding.symbol} value={holding.symbol}>
                    {holding.symbol} - {holding.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={tradeQuantity}
            onChange={(e) => setTradeQuantity(e.target.value)}
            sx={{ mt: 2 }}
          />
          {selectedHolding && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Estimated Total: ${selectedHolding.currentPrice * (parseInt(tradeQuantity) || 0)}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTradeDialog}>Cancel</Button>
          <Button 
            onClick={handleExecuteTrade} 
            variant="contained"
            color={tradeType === 'buy' ? 'primary' : 'error'}
            disabled={!tradeQuantity}
          >
            {tradeType === 'buy' ? 'Buy' : 'Sell'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Portfolio; 