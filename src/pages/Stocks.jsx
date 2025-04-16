import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ShowChart as ShowChartIcon,
} from '@mui/icons-material';
import { selectStocksData } from '../store/slices/portfolioSlice';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
}));

const StyledChip = styled(Chip)(({ theme, color }) => ({
  fontWeight: 'bold',
  backgroundColor: color === 'success' 
    ? theme.palette.success.main 
    : theme.palette.error.main,
  color: theme.palette.common.white,
}));

const Stocks = () => {
  const stocksData = useSelector(selectStocksData);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredStocks = stocksData?.stocks?.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

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
        Stock Market
      </Typography>

      <Grid container spacing={3}>
        {/* Market Overview */}
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
              Market Overview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="body2" color="text.secondary">S&P 500</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {stocksData?.marketOverview?.sp500?.value?.toLocaleString() || '0'}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 600, 
                      color: (stocksData?.marketOverview?.sp500?.change || 0) >= 0 
                        ? 'success.main' 
                        : 'error.main'
                    }}
                  >
                    {(stocksData?.marketOverview?.sp500?.change || 0) >= 0 ? '+' : ''}
                    {stocksData?.marketOverview?.sp500?.change?.toFixed(2) || '0.00'}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="body2" color="text.secondary">Dow Jones</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {stocksData?.marketOverview?.dowJones?.value?.toLocaleString() || '0'}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 600, 
                      color: (stocksData?.marketOverview?.dowJones?.change || 0) >= 0 
                        ? 'success.main' 
                        : 'error.main'
                    }}
                  >
                    {(stocksData?.marketOverview?.dowJones?.change || 0) >= 0 ? '+' : ''}
                    {stocksData?.marketOverview?.dowJones?.change?.toFixed(2) || '0.00'}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="body2" color="text.secondary">Nasdaq</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {stocksData?.marketOverview?.nasdaq?.value?.toLocaleString() || '0'}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 600, 
                      color: (stocksData?.marketOverview?.nasdaq?.change || 0) >= 0 
                        ? 'success.main' 
                        : 'error.main'
                    }}
                  >
                    {(stocksData?.marketOverview?.nasdaq?.change || 0) >= 0 ? '+' : ''}
                    {stocksData?.marketOverview?.nasdaq?.change?.toFixed(2) || '0.00'}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="body2" color="text.secondary">Russell 2000</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {stocksData?.marketOverview?.russell2000?.value?.toLocaleString() || '0'}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 600, 
                      color: (stocksData?.marketOverview?.russell2000?.change || 0) >= 0 
                        ? 'success.main' 
                        : 'error.main'
                    }}
                  >
                    {(stocksData?.marketOverview?.russell2000?.change || 0) >= 0 ? '+' : ''}
                    {stocksData?.marketOverview?.russell2000?.change?.toFixed(2) || '0.00'}%
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Stock Search */}
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
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs={12} md={8}>
                <Typography variant="h5">
                  Stock Explorer
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search stocks..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
            
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="stock tabs">
                <Tab label="All Stocks" />
                <Tab label="Top Gainers" />
                <Tab label="Top Losers" />
                <Tab label="Most Active" />
              </Tabs>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Symbol</StyledTableCell>
                    <StyledTableCell>Company</StyledTableCell>
                    <StyledTableCell align="right">Price</StyledTableCell>
                    <StyledTableCell align="right">Change</StyledTableCell>
                    <StyledTableCell align="right">Change %</StyledTableCell>
                    <StyledTableCell align="right">Volume</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStocks.map((stock) => (
                    <TableRow key={stock.symbol}>
                      <TableCell sx={{ fontWeight: 'bold' }}>{stock.symbol}</TableCell>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell align="right">${stock.price.toFixed(2)}</TableCell>
                      <TableCell 
                        align="right"
                        sx={{ 
                          fontWeight: 600,
                          color: stock.change >= 0 ? 'success.main' : 'error.main'
                        }}
                      >
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <StyledChip 
                          size="small" 
                          label={`${stock.changePercent >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%`} 
                          color={stock.changePercent >= 0 ? 'success' : 'error'}
                          icon={stock.changePercent >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                        />
                      </TableCell>
                      <TableCell align="right">{stock.volume.toLocaleString()}</TableCell>
                      <TableCell align="right">
                        <Button 
                          variant="outlined" 
                          size="small" 
                          startIcon={<ShowChartIcon />}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stocks; 