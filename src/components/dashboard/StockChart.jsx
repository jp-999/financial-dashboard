import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Box, Typography, ButtonGroup, Button, useTheme } from '@mui/material';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { selectActiveStockData, selectSelectedTimeRange } from '../../store/slices/portfolioSlice';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const timeRanges = ['1W', '1M', '3M', '6M', '1Y', 'ALL'];

const StockChart = ({ onTimeRangeChange }) => {
  const theme = useTheme();
  const activeStock = useSelector(selectActiveStockData);
  const selectedTimeRange = useSelector(selectSelectedTimeRange);
  
  if (!activeStock) {
    return (
      <Card sx={{ height: '100%', minHeight: 400 }}>
        <CardContent>
          <Typography variant="h6">Loading stock data...</Typography>
        </CardContent>
      </Card>
    );
  }

  // Filter price history based on selected time range
  const getFilteredPriceHistory = () => {
    const history = [...activeStock.priceHistory];
    const today = new Date();
    
    switch (selectedTimeRange) {
      case '1W':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        return history.filter(item => new Date(item.date) >= oneWeekAgo);
      case '1M':
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        return history.filter(item => new Date(item.date) >= oneMonthAgo);
      case '3M':
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(today.getMonth() - 3);
        return history.filter(item => new Date(item.date) >= threeMonthsAgo);
      case '6M':
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);
        return history.filter(item => new Date(item.date) >= sixMonthsAgo);
      case '1Y':
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        return history.filter(item => new Date(item.date) >= oneYearAgo);
      case 'ALL':
      default:
        return history;
    }
  };

  const filteredHistory = getFilteredPriceHistory();
  
  // Prepare data for chart
  const data = {
    labels: filteredHistory.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: activeStock.name,
        data: filteredHistory.map(item => item.price),
        fill: 'start',
        backgroundColor: activeStock.change >= 0 
          ? theme.palette.mode === 'dark' 
            ? 'rgba(0, 227, 150, 0.1)' 
            : 'rgba(0, 200, 83, 0.1)'
          : theme.palette.mode === 'dark' 
            ? 'rgba(255, 69, 96, 0.1)' 
            : 'rgba(255, 61, 87, 0.1)',
        borderColor: activeStock.change >= 0 
          ? theme.palette.success.main 
          : theme.palette.error.main,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: theme.palette.background.paper,
        pointHoverBorderColor: activeStock.change >= 0 
          ? theme.palette.success.main 
          : theme.palette.error.main,
        pointHoverBorderWidth: 2,
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(30, 30, 30, 0.8)' 
          : 'rgba(255, 255, 255, 0.9)',
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].label;
          },
          label: (context) => {
            return `$${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          maxRotation: 0,
          font: {
            size: 10,
          },
        },
      },
      y: {
        grid: {
          color: theme.palette.divider,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 10,
          },
          callback: (value) => `$${value}`,
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        hoverRadius: 5,
      },
    },
    animation: {
      duration: 1000,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: '100%' }}
    >
      <Card 
        sx={{ 
          height: '100%', 
          minHeight: 400, 
          position: 'relative',
          overflow: 'visible'
        }}
      >
        <CardContent>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                {activeStock.name} ({activeStock.id})
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" fontWeight={600}>
                  ${activeStock.currentPrice.toFixed(2)}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    ml: 1,
                    color: activeStock.change >= 0 
                      ? 'success.main' 
                      : 'error.main',
                    fontWeight: 500,
                  }}
                >
                  {activeStock.change >= 0 ? '+' : ''}
                  {activeStock.change.toFixed(2)} 
                  ({activeStock.changePercent.toFixed(2)}%)
                </Typography>
              </Box>
            </Box>
            <ButtonGroup size="small" aria-label="time range selector">
              {timeRanges.map((range) => (
                <Button
                  key={range}
                  onClick={() => onTimeRangeChange(range)}
                  variant={selectedTimeRange === range ? 'contained' : 'outlined'}
                  sx={{
                    minWidth: '40px',
                    fontWeight: selectedTimeRange === range ? 600 : 400,
                  }}
                >
                  {range}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
          
          <Box sx={{ height: 300, mt: 4 }}>
            <Line data={data} options={options} />
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mt: 3,
              px: 1,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Market Cap
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {activeStock.marketCap}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Sector
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {activeStock.sector}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Volume
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {filteredHistory.length > 0 
                  ? filteredHistory[filteredHistory.length - 1].volume.toLocaleString() 
                  : '-'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StockChart; 