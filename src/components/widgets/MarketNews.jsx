import React from 'react';
import { 
  Card, 
  CardContent, 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Chip, 
  Divider, 
  useTheme 
} from '@mui/material';
import { motion } from 'framer-motion';
import mockNewsData from '../../data/mockNews.json';

const MarketNews = () => {
  const theme = useTheme();
  const [news] = React.useState(mockNewsData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card 
        sx={{ 
          height: '100%',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, rgba(37, 37, 37, 0.9), rgba(44, 44, 44, 0.8))' 
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(245, 247, 250, 0.8))',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Market News
          </Typography>
          
          <List sx={{ maxHeight: 380, overflow: 'auto' }}>
            {news.map((item, index) => (
              <React.Fragment key={item.id}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.08,
                    ease: "easeOut" 
                  }}
                >
                  <ListItem 
                    alignItems="flex-start"
                    sx={{ 
                      py: 2,
                      px: 0,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)' 
                          : 'rgba(0, 0, 0, 0.02)',
                        transform: 'translateY(-2px)',
                      },
                      borderRadius: theme.shape.borderRadius,
                      cursor: 'pointer',
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
                            {item.title}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ 
                              minWidth: '80px', 
                              textAlign: 'right',
                              pt: 0.5
                            }}
                          >
                            {new Date(item.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            {item.summary}
                          </Typography>
                          <Box sx={{ display: 'flex', mt: 1 }}>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                borderRadius: '4px',
                                bgcolor: theme.palette.mode === 'dark' 
                                  ? 'rgba(255, 255, 255, 0.05)' 
                                  : 'rgba(0, 0, 0, 0.04)',
                                py: 0.5,
                                px: 1,
                                mr: 1,
                                fontWeight: 500,
                              }}
                            >
                              {item.source}
                            </Typography>
                            {item.related.length > 0 && 
                              item.related.map(symbol => (
                                <Chip
                                  key={symbol}
                                  label={symbol}
                                  size="small"
                                  sx={{ 
                                    height: '24px',
                                    mr: 0.5,
                                    fontWeight: 600,
                                    color: theme.palette.primary.main,
                                    backgroundColor: theme.palette.mode === 'dark' 
                                      ? 'rgba(3, 218, 198, 0.08)' 
                                      : 'rgba(3, 140, 126, 0.08)',
                                  }}
                                />
                              ))
                            }
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                </motion.div>
                
                {index < news.length - 1 && (
                  <Divider component="li" sx={{ my: 1 }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MarketNews; 