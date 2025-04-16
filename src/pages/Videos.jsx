import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Tabs,
  Tab,
  Divider,
  Button,
  Avatar,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Search as SearchIcon,
  CheckCircle as VerifiedIcon,
  Whatshot as TrendingIcon,
  School as EducationIcon,
  Assessment as AnalysisIcon,
  AccountBalance as InvestingIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Sample data for featured videos
const featuredVideos = [
  {
    id: 1,
    title: 'Market Outlook for Second Half of 2023',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    duration: '28:15',
    views: '15.3K',
    date: '2 days ago',
    channel: 'FinDash Analysis',
    verified: true,
    trending: true,
    description: 'Our expert analysts discuss market trends, economic indicators, and investment opportunities for the remainder of 2023.'
  },
  {
    id: 2,
    title: 'Investing in AI: Opportunities and Risks',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    duration: '34:22',
    views: '23.7K',
    date: '5 days ago',
    channel: 'Tech Investor',
    verified: true,
    trending: true,
    description: 'A deep dive into artificial intelligence investments, highlighting major players, emerging technologies, and potential risks.'
  }
];

// Sample data for video categories
const videoCategories = [
  {
    name: 'All',
    icon: null
  },
  {
    name: 'Trending',
    icon: <TrendingIcon fontSize="small" />
  },
  {
    name: 'Education',
    icon: <EducationIcon fontSize="small" />
  },
  {
    name: 'Market Analysis',
    icon: <AnalysisIcon fontSize="small" />
  },
  {
    name: 'Investing',
    icon: <InvestingIcon fontSize="small" />
  }
];

// Sample data for video list
const videoList = [
  {
    id: 3,
    title: 'Beginner\'s Guide to Stock Market Investing',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    duration: '45:18',
    views: '102K',
    date: '3 weeks ago',
    channel: 'Finance Academy',
    verified: true,
    category: 'Education',
    saved: false
  },
  {
    id: 4,
    title: 'Understanding ETFs vs. Mutual Funds',
    thumbnail: 'https://images.unsplash.com/photo-1579226905180-636b76d96082?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    duration: '18:45',
    views: '45.2K',
    date: '2 weeks ago',
    channel: 'FinDash Academy',
    verified: true,
    category: 'Education',
    saved: true
  },
  {
    id: 5,
    title: 'Crypto Market Analysis: Bitcoin and Beyond',
    thumbnail: 'https://images.unsplash.com/photo-1591994843349-f415893b3a6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    duration: '27:34',
    views: '67.8K',
    date: '6 days ago',
    channel: 'Crypto Insights',
    verified: false,
    category: 'Market Analysis',
    saved: false
  },
  {
    id: 6,
    title: 'How to Build a Dividend Portfolio',
    thumbnail: 'https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    duration: '32:10',
    views: '38.1K',
    date: '4 days ago',
    channel: 'Dividend Investor',
    verified: true,
    category: 'Investing',
    saved: false
  },
  {
    id: 7,
    title: 'Technical Analysis Fundamentals',
    thumbnail: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    duration: '53:22',
    views: '76.4K',
    date: '2 weeks ago',
    channel: 'Chart Masters',
    verified: true,
    category: 'Market Analysis',
    saved: true
  },
  {
    id: 8,
    title: 'Retirement Planning Essentials',
    thumbnail: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    duration: '41:55',
    views: '29.3K',
    date: '3 weeks ago',
    channel: 'FinDash Academy',
    verified: true,
    category: 'Education',
    saved: false
  }
];

const VideosPage = () => {
  const [categoryTab, setCategoryTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedVideos, setSavedVideos] = useState(
    videoList.reduce((acc, video) => ({ ...acc, [video.id]: video.saved }), {})
  );
  
  const handleCategoryChange = (event, newValue) => {
    setCategoryTab(newValue);
  };
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const toggleSaveVideo = (videoId) => {
    setSavedVideos(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Financial Videos
        </Typography>
        
        {/* Search Bar */}
        <Paper sx={{ p: 2, mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search for videos..."
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Paper>
        
        {/* Categories */}
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={categoryTab}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 2 }}
          >
            {videoCategories.map((category, index) => (
              <Tab 
                key={category.name}
                label={category.name}
                icon={category.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Box>
        
        {/* Featured Videos */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Featured Videos
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {featuredVideos.map((video) => (
            <Grid item xs={12} md={6} key={video.id}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card sx={{ position: 'relative' }}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={video.thumbnail}
                      alt={video.title}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        padding: '8px 16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant="body2">{video.duration}</Typography>
                      <IconButton size="small" color="inherit">
                        <PlayIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {video.title}
                      </Typography>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => toggleSaveVideo(video.id)}
                      >
                        {savedVideos[video.id] ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                      </IconButton>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                        {video.views} views • {video.date}
                      </Typography>
                      {video.trending && (
                        <Chip 
                          icon={<TrendingIcon fontSize="small" />} 
                          label="Trending" 
                          size="small"
                          color="error"
                          sx={{ mr: 1 }}
                        />
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                      <Typography variant="body2" fontWeight="medium">
                        {video.channel}
                      </Typography>
                      {video.verified && (
                        <VerifiedIcon sx={{ fontSize: 14, ml: 0.5, color: 'primary.main' }} />
                      )}
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary">
                      {video.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        {/* Video List */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Recent Videos
        </Typography>
        <Grid container spacing={3}>
          {videoList.map((video) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={video.thumbnail}
                      alt={video.title}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        padding: '4px 8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant="caption">{video.duration}</Typography>
                      <IconButton size="small" color="inherit" sx={{ p: 0.5 }}>
                        <PlayIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8
                      }}
                    >
                      <Chip 
                        label={video.category} 
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(0, 0, 0, 0.6)', 
                          color: 'white',
                          fontSize: '0.7rem'
                        }}
                      />
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        {video.title}
                      </Typography>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => toggleSaveVideo(video.id)}
                        sx={{ mt: -1, mr: -1 }}
                      >
                        {savedVideos[video.id] ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
                      </IconButton>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {video.views} views • {video.date}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 20, height: 20, mr: 0.5 }} />
                      <Typography variant="caption" fontWeight="medium">
                        {video.channel}
                      </Typography>
                      {video.verified && (
                        <VerifiedIcon sx={{ fontSize: 12, ml: 0.5, color: 'primary.main' }} />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="outlined" 
            endIcon={<ArrowForwardIcon />}
          >
            Load More Videos
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default VideosPage; 