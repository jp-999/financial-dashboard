import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Sample data for major indices
const majorIndices = [
  { name: 'S&P 500', value: '4,781.23', change: '+1.53%', isPositive: true },
  { name: 'Dow 30', value: '38,671.05', change: '+0.94%', isPositive: true },
  { name: 'Nasdaq', value: '15,045.38', change: '+2.23%', isPositive: true },
  { name: 'Russell 2000', value: '2,092.74', change: '-0.31%', isPositive: false },
  { name: 'VIX', value: '17.42', change: '-5.63%', isPositive: false },
  { name: '10-Yr Bond', value: '3.48%', change: '+0.05%', isPositive: true }
];

// Sample data for top movers
const topGainers = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: '$742.38', change: '+5.92%' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: '$178.23', change: '+4.87%' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: '$128.41', change: '+4.52%' },
  { symbol: 'AAPL', name: 'Apple Inc', price: '$193.28', change: '+3.15%' },
  { symbol: 'META', name: 'Meta Platforms Inc', price: '$478.22', change: '+3.01%' }
];

const topLosers = [
  { symbol: 'NFLX', name: 'Netflix Inc', price: '$623.12', change: '-2.87%' },
  { symbol: 'INTC', name: 'Intel Corporation', price: '$31.75', change: '-2.43%' },
  { symbol: 'DIS', name: 'Walt Disney Co', price: '$97.54', change: '-1.95%' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co', price: '$178.92', change: '-1.83%' },
  { symbol: 'PG', name: 'Procter & Gamble Co', price: '$161.45', change: '-1.52%' }
];

// Sample data for sector performance
const sectorPerformance = [
  { name: 'Technology', change: '+2.87%', isPositive: true, value: 78 },
  { name: 'Energy', change: '+1.53%', isPositive: true, value: 65 },
  { name: 'Healthcare', change: '+0.95%', isPositive: true, value: 48 },
  { name: 'Financials', change: '+0.47%', isPositive: true, value: 32 },
  { name: 'Consumer Discretionary', change: '+0.28%', isPositive: true, value: 24 },
  { name: 'Industrials', change: '-0.15%', isPositive: false, value: -12 },
  { name: 'Materials', change: '-0.42%', isPositive: false, value: -25 },
  { name: 'Utilities', change: '-0.73%', isPositive: false, value: -38 },
  { name: 'Consumer Staples', change: '-1.27%', isPositive: false, value: -52 },
  { name: 'Real Estate', change: '-1.85%', isPositive: false, value: -68 }
];

const MarketsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Markets Overview
        </Typography>
        
        {/* Major Indices */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Major Indices
          </Typography>
          <Grid container spacing={3}>
            {majorIndices.map((index) => (
              <Grid item xs={6} sm={4} md={2} key={index.name}>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Box 
                    sx={{ 
                      textAlign: 'center',
                      p: 2,
                      borderRadius: 1,
                      border: 1,
                      borderColor: 'divider'
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {index.name}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {index.value}
                    </Typography>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: index.isPositive ? 'success.main' : 'error.main'
                      }}
                    >
                      {index.isPositive ? 
                        <TrendingUpIcon fontSize="small" /> : 
                        <TrendingDownIcon fontSize="small" />
                      }
                      <Typography 
                        variant="body2" 
                        sx={{ ml: 0.5 }}
                        fontWeight="medium"
                      >
                        {index.change}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Paper>
        
        {/* Top Gainers & Losers */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2
                }}
              >
                <TrendingUpIcon sx={{ color: 'success.main', mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Top Gainers
                </Typography>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Symbol</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Change</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topGainers.map((stock) => (
                      <TableRow 
                        key={stock.symbol}
                        hover
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell 
                          component="th" 
                          scope="row"
                          sx={{ fontWeight: 'bold' }}
                        >
                          {stock.symbol}
                        </TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell align="right">{stock.price}</TableCell>
                        <TableCell 
                          align="right"
                          sx={{ 
                            color: 'success.main',
                            fontWeight: 'medium'
                          }}
                        >
                          {stock.change}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2
                }}
              >
                <TrendingDownIcon sx={{ color: 'error.main', mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Top Losers
                </Typography>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Symbol</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Change</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topLosers.map((stock) => (
                      <TableRow 
                        key={stock.symbol}
                        hover
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell 
                          component="th" 
                          scope="row"
                          sx={{ fontWeight: 'bold' }}
                        >
                          {stock.symbol}
                        </TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell align="right">{stock.price}</TableCell>
                        <TableCell 
                          align="right"
                          sx={{ 
                            color: 'error.main',
                            fontWeight: 'medium'
                          }}
                        >
                          {stock.change}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Sector Performance */}
        <Paper sx={{ p: 3 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 3
            }}
          >
            <BarChartIcon sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Sector Performance
            </Typography>
          </Box>
          
          <Grid container spacing={2}>
            {sectorPerformance.map((sector) => (
              <Grid item xs={12} sm={6} key={sector.name}>
                <Box sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{sector.name}</Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ color: sector.isPositive ? 'success.main' : 'error.main' }}
                    >
                      {sector.change}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={Math.abs(sector.value)}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: sector.isPositive ? 'success.light' : 'error.light',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: sector.isPositive ? 'success.main' : 'error.main',
                        borderRadius: 5,
                      },
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default MarketsPage; 