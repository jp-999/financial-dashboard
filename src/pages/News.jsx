import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Box, 
  Divider, 
  Chip,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';

const newsItems = [
  {
    id: 1,
    title: 'Federal Reserve Holds Interest Rates Steady',
    category: 'Economy',
    image: 'https://images.unsplash.com/photo-1611324806374-16bc4a5b48ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    snippet: 'The Federal Reserve announced today that it will maintain current interest rates, citing economic stability and controlled inflation.',
    date: 'May 15, 2023'
  },
  {
    id: 2,
    title: 'Tech Stocks Rally After Strong Earnings Reports',
    category: 'Markets',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    snippet: 'Major technology companies exceeded earnings expectations, driving a sector-wide rally in the stock market.',
    date: 'May 14, 2023'
  },
  {
    id: 3,
    title: 'Global Supply Chain Issues Starting to Ease',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    snippet: 'After months of disruptions, global supply chains are showing signs of recovery as transportation bottlenecks begin to clear.',
    date: 'May 13, 2023'
  },
  {
    id: 4,
    title: 'New Cryptocurrency Regulations Expected',
    category: 'Crypto',
    image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    snippet: 'Lawmakers are finalizing a framework for cryptocurrency oversight, aiming to provide clarity for investors and businesses.',
    date: 'May 12, 2023'
  },
  {
    id: 5,
    title: 'Housing Market Cools as Mortgage Rates Rise',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    snippet: 'The previously hot housing market is showing signs of cooling as higher mortgage rates reduce buyer demand.',
    date: 'May 11, 2023'
  },
  {
    id: 6,
    title: 'Major Merger Announced in Banking Sector',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    snippet: 'Two leading banks have announced plans to merge, creating one of the largest financial institutions in the market.',
    date: 'May 10, 2023'
  }
];

const topCategories = [
  { name: 'Markets', color: '#4caf50' },
  { name: 'Economy', color: '#2196f3' },
  { name: 'Business', color: '#ff9800' },
  { name: 'Crypto', color: '#9c27b0' },
  { name: 'Personal Finance', color: '#f44336' }
];

const NewsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Financial News
        </Typography>
        
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {topCategories.map(category => (
            <Chip 
              key={category.name}
              label={category.name}
              sx={{ 
                backgroundColor: category.color, 
                color: 'white',
                '&:hover': { opacity: 0.9 }
              }}
              clickable
            />
          ))}
        </Box>
        
        <Grid container spacing={3}>
          {/* Featured News */}
          <Grid item xs={12} md={6}>
            <motion.div
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 3
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={newsItems[0].image}
                  alt={newsItems[0].title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography 
                    variant="overline" 
                    color="primary"
                    fontWeight="bold"
                  >
                    {newsItems[0].category} • {newsItems[0].date}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', mt: 1 }}
                  >
                    {newsItems[0].title}
                  </Typography>
                  <Typography variant="body1">
                    {newsItems[0].snippet}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          {/* Secondary Featured News */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {newsItems.slice(1, 3).map(item => (
                <Grid item xs={12} key={item.id}>
                  <motion.div
                    whileHover={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card 
                      sx={{ 
                        display: 'flex', 
                        height: '100%',
                        boxShadow: 2
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 140 }}
                        image={item.image}
                        alt={item.title}
                      />
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography 
                          variant="overline" 
                          color="primary"
                          fontWeight="bold"
                        >
                          {item.category} • {item.date}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          component="h2"
                          sx={{ fontWeight: 'bold', mt: 0.5 }}
                        >
                          {item.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                        >
                          {item.snippet}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 4 }} />
          </Grid>
          
          {/* More News */}
          {newsItems.slice(3).map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Card sx={{ height: '100%', boxShadow: 1 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography 
                      variant="overline" 
                      color="primary"
                      fontWeight="bold"
                    >
                      {item.category} • {item.date}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      component="h2"
                      sx={{ fontWeight: 'bold', mt: 0.5 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.snippet}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default NewsPage; 