import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Card, 
  CardContent, 
  Box, 
  Typography, 
  Divider, 
  Grid, 
  Avatar, 
  useTheme 
} from '@mui/material';
import { 
  ArrowUpward as ArrowUpIcon, 
  ArrowDownward as ArrowDownIcon,
  AttachMoney as MoneyIcon,
  AccountBalance as BalanceIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { selectPortfolioData } from '../../store/slices/portfolioSlice';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryItem = ({ title, value, icon, color, secondaryValue }) => {
  const theme = useTheme();
  
  return (
    <motion.div 
      whileHover={{ translateY: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        sx={{ 
          p: { xs: 1.5, sm: 2 },
          height: '100%',
          background: theme.palette.mode === 'dark' 
            ? `linear-gradient(135deg, rgba(${color}, 0.2) 0%, rgba(${color}, 0.05) 100%)` 
            : `linear-gradient(135deg, rgba(${color}, 0.1) 0%, rgba(${color}, 0.03) 100%)`,
          borderTop: `4px solid rgba(${color}, ${theme.palette.mode === 'dark' ? 0.7 : 1})`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar
            sx={{ 
              bgcolor: `rgba(${color}, ${theme.palette.mode === 'dark' ? 0.2 : 0.1})`,
              color: `rgba(${color}, 1)`,
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              mr: { xs: 1, sm: 2 },
              boxShadow: `0 4px 8px rgba(${color}, 0.25)`,
            }}
          >
            {icon}
          </Avatar>
          <Typography 
            color="text.secondary" 
            variant="body2" 
            fontWeight={500}
            sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
          >
            {title}
          </Typography>
        </Box>
        <Typography 
          variant="h4" 
          fontWeight={700} 
          sx={{ 
            mb: 0.5,
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }
          }}
        >
          {value}
        </Typography>
        {secondaryValue && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {secondaryValue.isPositive ? (
              <ArrowUpIcon fontSize="small" color="success" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }} />
            ) : (
              <ArrowDownIcon fontSize="small" color="error" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }} />
            )}
            <Typography 
              variant="body2" 
              sx={{ 
                color: secondaryValue.isPositive ? 'success.main' : 'error.main',
                fontWeight: 500,
                ml: 0.5,
                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' }
              }}
            >
              {secondaryValue.value}
            </Typography>
          </Box>
        )}
      </Card>
    </motion.div>
  );
};

const PortfolioSummary = () => {
  const theme = useTheme();
  const portfolioData = useSelector(selectPortfolioData);
  
  if (!portfolioData) {
    return (
      <Card sx={{ height: '100%', minHeight: 200, border: `1px solid ${theme.palette.divider}` }} elevation={0}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h6">Loading portfolio data...</Typography>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for allocation chart
  const allocationData = {
    labels: Array.from(portfolioData.holdings).map(holding => holding.id),
    datasets: [
      {
        data: Array.from(portfolioData.holdings).map(holding => holding.allocationPercent),
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main,
          theme.palette.info.main,
          theme.palette.warning.main,
          theme.palette.error.main,
        ],
        borderColor: theme.palette.background.paper,
        borderWidth: 2,
        hoverOffset: 5,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.formattedValue || '';
            return `${label}: ${value}%`;
          }
        }
      }
    },
    cutout: '70%',
    animation: {
      animateScale: true,
      animateRotate: true
    },
    maintainAspectRatio: false,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ height: '100%', border: `1px solid ${theme.palette.divider}` }} elevation={0}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: { xs: 2, sm: 3 }, 
              fontWeight: 600,
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}
          >
            Portfolio Summary
          </Typography>
          
          <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mb: { xs: 2, sm: 4 } }}>
            <Grid item xs={12} sm={6} lg={3}>
              <SummaryItem 
                title="Total Value"
                value={`$${portfolioData.portfolioValue.toLocaleString()}`}
                icon={<MoneyIcon />}
                color="3, 218, 198"
                secondaryValue={{
                  isPositive: portfolioData.dailyChange > 0,
                  value: `${portfolioData.dailyChange > 0 ? '+' : ''}$${portfolioData.dailyChange.toFixed(2)} (${portfolioData.dailyChangePercent.toFixed(2)}%) Today`
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <SummaryItem 
                title="Cash Balance"
                value={`$${portfolioData.cashBalance.toLocaleString()}`}
                icon={<BalanceIcon />}
                color="187, 134, 252"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <SummaryItem 
                title="Total Gain/Loss"
                value={`$${portfolioData.totalGain.toLocaleString()}`}
                icon={<TrendingUpIcon />}
                color={portfolioData.totalGain >= 0 ? "0, 227, 150" : "255, 69, 96"}
                secondaryValue={{
                  isPositive: portfolioData.totalGainPercent > 0,
                  value: `${portfolioData.totalGainPercent.toFixed(2)}%`
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <SummaryItem 
                title="Invested Since"
                value={new Date(portfolioData.investmentStart).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
                icon={<TrendingUpIcon />}
                color="0, 176, 255"
              />
            </Grid>
          </Grid>
          
          <Divider sx={{ my: { xs: 2, sm: 3 } }} />
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            mt: { xs: 1, sm: 2 }
          }}>
            <Box sx={{ 
              flex: 1, 
              height: { xs: 180, sm: 200, md: 250 }, 
              mr: { xs: 0, md: 3 }, 
              mb: { xs: 3, md: 0 } 
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: { xs: 1, sm: 2 }, 
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.25rem' } 
                }}
              >
                Asset Allocation
              </Typography>
              <Doughnut data={allocationData} options={chartOptions} />
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: { xs: 1, sm: 2 }, 
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                Top Holdings
              </Typography>
              <Box>
                {Array.from(portfolioData.holdings)
                  .sort((a, b) => b.currentValue - a.currentValue)
                  .slice(0, 4)
                  .map((holding, index, array) => (
                    <Box
                      key={holding.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: { xs: 1, sm: 1.5 },
                        borderBottom: index === array.length - 1 ? 'none' : `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={`https://logo.clearbit.com/${holding.id.toLowerCase()}.com`}
                          variant="rounded"
                          sx={{ 
                            width: { xs: 28, sm: 36 }, 
                            height: { xs: 28, sm: 36 }, 
                            mr: { xs: 1, sm: 2 } 
                          }}
                        />
                        <Box>
                          <Typography 
                            variant="body1" 
                            fontWeight={500}
                            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                          >
                            {holding.id}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                          >
                            {holding.shares} Shares
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography 
                          variant="body1" 
                          fontWeight={500}
                          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                        >
                          ${holding.currentValue.toLocaleString()}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: holding.unrealizedGain >= 0
                              ? 'success.main'
                              : 'error.main',
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                          }}
                        >
                          {holding.unrealizedGain >= 0 ? '+' : ''}
                          {holding.unrealizedGainPercent.toFixed(2)}%
                        </Typography>
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PortfolioSummary; 