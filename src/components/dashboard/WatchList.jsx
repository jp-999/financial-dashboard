import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Card, 
  CardContent, 
  Box, 
  Typography, 
  IconButton, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Avatar, 
  Paper, 
  useTheme 
} from '@mui/material';
import { 
  Visibility as ViewIcon, 
  Delete as DeleteIcon, 
  TrendingUp as TrendingUpIcon, 
  TrendingDown as TrendingDownIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { 
  selectWatchlist, 
  selectStocksData,
  removeFromWatchlist,
  setActiveStock 
} from '../../store/slices/portfolioSlice';

const WatchList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const watchlist = useSelector(selectWatchlist);
  const stocksData = useSelector(selectStocksData);
  
  const watchlistStocks = stocksData.filter(stock => 
    watchlist.includes(stock.id)
  );
  
  const handleViewStock = (stockId) => {
    dispatch(setActiveStock(stockId));
  };
  
  const handleRemoveFromWatchlist = (stockId) => {
    dispatch(removeFromWatchlist(stockId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card 
        sx={{ 
          height: '100%',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(to bottom right, rgba(30, 30, 30, 0.8), rgba(44, 44, 44, 0.8))' 
            : 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(245, 247, 250, 0.8))',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h5">Watchlist</Typography>
            <IconButton 
              color="primary" 
              size="small"
              sx={{ 
                bgcolor: theme.palette.mode === 'dark' 
                  ? 'rgba(3, 218, 198, 0.1)' 
                  : 'rgba(3, 140, 126, 0.08)',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(3, 218, 198, 0.2)' 
                    : 'rgba(3, 140, 126, 0.16)',
                }
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>

          <TableContainer 
            component={Paper} 
            sx={{ 
              boxShadow: 'none',
              background: 'transparent',
              maxHeight: 350,
              overflow: 'auto',
            }}
          >
            <Table stickyHeader aria-label="watchlist table">
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Change</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {watchlistStocks.length > 0 ? (
                  watchlistStocks.map((stock) => (
                    <TableRow
                      key={stock.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        transition: 'background-color 0.3s',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.05)' 
                            : 'rgba(0, 0, 0, 0.02)',
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            src={stock.logo}
                            alt={stock.name}
                            variant="rounded"
                            sx={{ width: 32, height: 32, mr: 1 }}
                          />
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {stock.id}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {stock.name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight={500}>
                          ${stock.currentPrice.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'flex-end',
                            color: stock.change >= 0 
                              ? 'success.main' 
                              : 'error.main',
                          }}
                        >
                          {stock.change >= 0 ? 
                            <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} /> : 
                            <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
                          }
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500,
                            }}
                          >
                            {stock.change >= 0 ? '+' : ''}
                            {stock.changePercent.toFixed(2)}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box>
                          <IconButton 
                            size="small" 
                            color="primary" 
                            onClick={() => handleViewStock(stock.id)}
                            sx={{ mr: 1 }}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => handleRemoveFromWatchlist(stock.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                        No stocks in watchlist. Add stocks to track them here.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WatchList; 