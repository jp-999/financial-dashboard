import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Divider, 
  Button, 
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Card,
  CardContent,
  IconButton,
  Avatar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  useTheme
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { 
  Search as SearchIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ArrowForward as ArrowForwardIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { 
  fetchPortfolioData, 
  fetchStocksData,
  selectPortfolioData,
  selectStocksData,
  selectStatus
} from '../store/slices/portfolioSlice';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';

// Styled components
const BannerSection = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(to bottom, #1a1a1a, #121212)'
    : 'linear-gradient(to bottom, #f4f6f8, #ffffff)',
  padding: theme.spacing(4, 2),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 1),
  },
}));

const MarketCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 0.3s ease',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 16px rgba(0, 0, 0, 0.5)'
      : '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: theme.shape.borderRadius * 3,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 40,
  '& .MuiTab-root': {
    minHeight: 40,
    padding: '6px 16px',
    fontWeight: 600,
    fontSize: '0.875rem',
    textTransform: 'none',
  },
  '& .MuiTabs-indicator': {
    height: 3,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: 40,
  fontWeight: 600,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const portfolioData = useSelector(selectPortfolioData);
  const stocksData = useSelector(selectStocksData);
  const status = useSelector(selectStatus);
  const [marketTabValue, setMarketTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchPortfolioData());
    dispatch(fetchStocksData());
  }, [dispatch]);

  const handleMarketTabChange = (event, newValue) => {
    setMarketTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Mock market data
  const marketIndices = [
    { name: 'S&P Futures', value: '5,462.75', change: '+25.00', percentChange: '+0.46%', isPositive: true },
    { name: 'Dow Futures', value: '40,856.00', change: '+122.00', percentChange: '+0.31%', isPositive: true },
    { name: 'Nasdaq Futures', value: '19,034.00', change: '+99.25', percentChange: '+0.52%', isPositive: true },
    { name: 'Russell 2000', value: '1,899.50', change: '+8.20', percentChange: '+0.43%', isPositive: true },
    { name: 'Crude Oil', value: '61.96', change: '+0.43', percentChange: '+0.70%', isPositive: true },
    { name: 'Gold', value: '3,233.90', change: '+7.50', percentChange: '+0.23%', isPositive: true }
  ];

  // Mock gainers and losers
  const topGainers = [
    { symbol: 'MP', name: 'MP Materials Corp', price: '27.59', change: '+4.91', percentChange: '+21.65%' },
    { symbol: 'PHI', name: 'P3 Health Partners', price: '8.99', change: '+1.41', percentChange: '+18.60%' },
    { symbol: 'BMA', name: 'Banco Macro S.A.', price: '91.00', change: '+12.15', percentChange: '+15.41%' },
    { symbol: 'BBVA', name: 'Banco BBVA Argentina', price: '20.36', change: '+2.57', percentChange: '+14.45%' },
    { symbol: 'GCM', name: 'Grupo Financiero', price: '61.43', change: '+7.66', percentChange: '+14.03%' }
  ];

  const topLosers = [
    { symbol: 'STVN', name: 'Stevanato Group', price: '15.75', change: '-12.32', percentChange: '-43.88%' },
    { symbol: 'ZBH', name: 'Zimmer Biomet', price: '111.67', change: '-13.31', percentChange: '-10.65%' },
    { symbol: 'SVC', name: 'Service Properties', price: '6.13', change: '-0.59', percentChange: '-8.78%' },
    { symbol: 'LAC', name: 'Lithium Americas', price: '4.07', change: '-0.26', percentChange: '-6.00%' },
    { symbol: 'BIP', name: 'Brookfield Infrastructure', price: '27.70', change: '-1.39', percentChange: '-4.78%' }
  ];

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box>
      {/* Banner Section */}
      <BannerSection>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            One place for your portfolios,
          </Typography>
          <Typography 
            variant="h3" 
            component="div" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            metrics and more
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 3, 
              maxWidth: '800px', 
              mx: 'auto',
              px: { xs: 1, sm: 2 }
            }}
          >
            Gain insights, see trends and get real-time updates when you securely link or manually add your brokerage accounts.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            FinDash does not store your broker credentials. <Button color="primary" size="small">Learn more</Button>
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              borderRadius: '20px', 
              px: 3,
              fontWeight: 600 
            }}
          >
            Sign in to get started
          </Button>
        </motion.div>
      </BannerSection>

      {/* Market Overview Section */}
      <Box sx={{ mb: { xs: 2, sm: 3, md: 4 }, px: { xs: 1, sm: 0 } }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          flexWrap: { xs: 'wrap', sm: 'nowrap' }
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            width: { xs: '100%', sm: 'auto' },
            mb: { xs: 1, sm: 0 }
          }}>
            <Typography 
              variant="subtitle1" 
              component="div" 
              sx={{ 
                fontWeight: 500, 
                color: 'success.main',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              🟢 U.S. markets open in 5h 26m
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', ml: { xs: 'auto', sm: 0 } }}>
            <IconButton size="small" sx={{ mr: 1, width: 26, height: 26 }}>
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ width: 26, height: 26 }}>
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <StyledTabs 
          value={marketTabValue} 
          onChange={handleMarketTabChange}
          sx={{ mb: 2 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <StyledTab label="US" />
          <StyledTab label="Europe" />
          <StyledTab label="Asia" />
          <StyledTab label="Rates" />
          <StyledTab label="Commodities" />
        </StyledTabs>

        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {marketIndices.map((index, i) => (
            <Grid item xs={6} sm={4} md={2} key={i}>
              <MarketCard elevation={0}>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  noWrap
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  {index.name}
                </Typography>
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    fontWeight: 600, 
                    my: 1,
                    fontSize: { xs: '1rem', sm: '1.25rem' }
                  }}
                >
                  {index.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {index.isPositive ? (
                    <TrendingUpIcon 
                      fontSize="small" 
                      color="success" 
                      sx={{ 
                        mr: 0.5, 
                        fontSize: { xs: '0.75rem', sm: '1rem' } 
                      }} 
                    />
                  ) : (
                    <TrendingDownIcon 
                      fontSize="small" 
                      color="error" 
                      sx={{ 
                        mr: 0.5, 
                        fontSize: { xs: '0.75rem', sm: '1rem' } 
                      }} 
                    />
                  )}
                  <Typography 
                    variant="body2" 
                    color={index.isPositive ? 'success.main' : 'error.main'}
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  >
                    {index.change} ({index.percentChange})
                  </Typography>
                </Box>
              </MarketCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* Full Width Content */}
        <Grid item xs={12}>
          {/* Portfolio Summary */}
          <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
            <PortfolioSummary />
          </Box>

          {/* Market Performance */}
          <Paper 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              mb: { xs: 2, sm: 3, md: 4 }, 
              border: `1px solid ${theme.palette.divider}` 
            }} 
            elevation={0}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                fontWeight: 600,
                fontSize: { xs: '1.125rem', sm: '1.25rem' }
              }}
            >
              Today's Market Performance
            </Typography>
            <Box sx={{ 
              height: { xs: 200, sm: 250, md: 300 }, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Typography variant="body1" color="text.secondary">
                Chart visualization will go here
              </Typography>
            </Box>
          </Paper>
          
          {/* Market Movers Section - Combines top gainers and losers in one row */}
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {/* Top Gainers */}
            <Grid item xs={12} md={6}>
              <Paper 
                sx={{ 
                  p: { xs: 2, sm: 3 }, 
                  height: '100%',
                  border: `1px solid ${theme.palette.divider}` 
                }} 
                elevation={0}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    fontWeight: 600,
                    fontSize: { xs: '1.125rem', sm: '1.25rem' }
                  }}
                >
                  Top gainers
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      {topGainers.map((stock, index) => (
                        <TableRow key={index} hover>
                          <TableCell 
                            sx={{ 
                              borderBottom: index === topGainers.length - 1 ? 'none' : undefined,
                              py: { xs: 1, sm: 1.5 },
                              px: { xs: 1, sm: 2 }
                            }}
                          >
                            <Box>
                              <Typography 
                                variant="body2" 
                                fontWeight={600}
                                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                              >
                                {stock.symbol}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                color="text.secondary" 
                                noWrap
                                sx={{ 
                                  fontSize: { xs: '0.625rem', sm: '0.75rem' },
                                  maxWidth: { xs: '90px', sm: '150px', md: '200px' },
                                  display: 'block'
                                }}
                              >
                                {stock.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell 
                            align="right" 
                            sx={{ 
                              borderBottom: index === topGainers.length - 1 ? 'none' : undefined,
                              py: { xs: 1, sm: 1.5 },
                              px: { xs: 1, sm: 2 }
                            }}
                          >
                            <Typography 
                              variant="body2"
                              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                            >
                              {stock.price}
                            </Typography>
                          </TableCell>
                          <TableCell 
                            align="right" 
                            sx={{ 
                              borderBottom: index === topGainers.length - 1 ? 'none' : undefined,
                              py: { xs: 1, sm: 1.5 },
                              px: { xs: 1, sm: 2 }
                            }}
                          >
                            <Typography 
                              variant="body2" 
                              color="success.main"
                              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                            >
                              +{stock.percentChange}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            {/* Top Losers */}
            <Grid item xs={12} md={6}>
              <Paper 
                sx={{ 
                  p: { xs: 2, sm: 3 },
                  height: '100%',
                  border: `1px solid ${theme.palette.divider}` 
                }} 
                elevation={0}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    fontWeight: 600,
                    fontSize: { xs: '1.125rem', sm: '1.25rem' }
                  }}
                >
                  Top losers
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      {topLosers.map((stock, index) => (
                        <TableRow key={index} hover>
                          <TableCell 
                            sx={{ 
                              borderBottom: index === topLosers.length - 1 ? 'none' : undefined,
                              py: { xs: 1, sm: 1.5 },
                              px: { xs: 1, sm: 2 }
                            }}
                          >
                            <Box>
                              <Typography 
                                variant="body2" 
                                fontWeight={600}
                                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                              >
                                {stock.symbol}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                color="text.secondary" 
                                noWrap
                                sx={{ 
                                  fontSize: { xs: '0.625rem', sm: '0.75rem' },
                                  maxWidth: { xs: '90px', sm: '150px', md: '200px' },
                                  display: 'block'
                                }}
                              >
                                {stock.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell 
                            align="right" 
                            sx={{ 
                              borderBottom: index === topLosers.length - 1 ? 'none' : undefined,
                              py: { xs: 1, sm: 1.5 },
                              px: { xs: 1, sm: 2 }
                            }}
                          >
                            <Typography 
                              variant="body2"
                              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                            >
                              {stock.price}
                            </Typography>
                          </TableCell>
                          <TableCell 
                            align="right" 
                            sx={{ 
                              borderBottom: index === topLosers.length - 1 ? 'none' : undefined,
                              py: { xs: 1, sm: 1.5 },
                              px: { xs: 1, sm: 2 }
                            }}
                          >
                            <Typography 
                              variant="body2" 
                              color="error.main"
                              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                            >
                              {stock.percentChange}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 