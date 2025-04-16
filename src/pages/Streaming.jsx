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
  Button,
  Divider,
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  useTheme
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Schedule as ScheduleIcon,
  LiveTv as LiveTvIcon,
  Notifications as NotificationsIcon,
  NotificationsNone as NotificationsNoneIcon,
  People as PeopleIcon,
  DonutLarge as DonutLargeIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as VerifiedIcon,
  FiberManualRecord as RecordIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Sample data for live streams
const liveStreams = [
  {
    id: 1,
    title: 'Live Market Open: Daily Analysis & Trade Ideas',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    viewers: 1423,
    channel: 'FinDash Live',
    verified: true,
    duration: '32:15',
    description: 'Join our analysts for the market open as they break down key moves, earnings reports, and provide actionable trade ideas.'
  },
  {
    id: 2,
    title: 'Federal Reserve Press Conference Live Coverage',
    thumbnail: 'https://images.unsplash.com/photo-1621264448270-9ef00e88e8b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    viewers: 3876,
    channel: 'Economy Watch',
    verified: true,
    duration: '1:15:42',
    description: 'Live coverage of the Federal Reserve press conference with real-time analysis and market reactions.'
  }
];

// Sample data for upcoming streams
const upcomingStreams = [
  {
    id: 3,
    title: 'Q2 Earnings Season: What to Expect',
    date: 'Today, 4:00 PM',
    channel: 'Market Insights',
    verified: true,
    notified: true
  },
  {
    id: 4,
    title: 'Tech Sector Analysis: Growth Opportunities',
    date: 'Tomorrow, 10:00 AM',
    channel: 'Tech Trends',
    verified: true,
    notified: false
  },
  {
    id: 5,
    title: 'Cryptocurrency Market Update',
    date: 'Wednesday, 3:30 PM',
    channel: 'Crypto Daily',
    verified: false,
    notified: true
  },
  {
    id: 6,
    title: 'Global Markets: European Markets Focus',
    date: 'Thursday, 8:00 AM',
    channel: 'International Finance',
    verified: true,
    notified: false
  }
];

// Sample data for recently streamed
const recentStreams = [
  {
    id: 7,
    title: 'Interest Rate Impact on Housing Market',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    views: '12.5K',
    date: 'Yesterday',
    duration: '48:22',
    channel: 'Real Estate Insights',
    verified: true
  },
  {
    id: 8,
    title: 'Oil Markets: Current Trends & Forecast',
    thumbnail: 'https://images.unsplash.com/photo-1582486225144-a54ade421a35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    views: '8.7K',
    date: '2 days ago',
    duration: '36:15',
    channel: 'Commodities Watch',
    verified: true
  },
  {
    id: 9,
    title: 'Small Cap Stocks: Hidden Gems for 2023',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    views: '15.3K',
    date: '3 days ago',
    duration: '52:40',
    channel: 'Stock Picks',
    verified: true
  },
  {
    id: 10,
    title: 'Retail Investor Workshop: Portfolio Construction',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    views: '23.1K',
    date: '5 days ago',
    duration: '1:25:18',
    channel: 'FinDash Academy',
    verified: true
  }
];

const StreamingPage = () => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState(
    upcomingStreams.reduce((acc, stream) => ({ ...acc, [stream.id]: stream.notified }), {})
  );
  
  const toggleNotification = (streamId) => {
    setNotifications(prev => ({
      ...prev,
      [streamId]: !prev[streamId]
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <LiveTvIcon sx={{ mr: 1, color: 'error.main' }} />
          <Typography variant="h4" fontWeight="bold">
            Streaming Now
          </Typography>
        </Box>
        
        {/* Live Streams */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {liveStreams.map((stream) => (
            <Grid item xs={12} md={6} key={stream.id}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card sx={{ position: 'relative' }}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={stream.thumbnail}
                      alt={stream.title}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        bgcolor: 'error.main',
                        color: 'white',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <RecordIcon sx={{ fontSize: 14, mr: 0.5, animation: 'pulse 1.5s infinite' }} />
                      <Typography variant="caption" fontWeight="bold">
                        LIVE
                      </Typography>
                    </Box>
                    
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <PeopleIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="caption" fontWeight="bold">
                        {stream.viewers.toLocaleString()} watching
                      </Typography>
                    </Box>
                    
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        borderRadius: '4px'
                      }}
                    >
                      <Typography variant="caption">
                        {stream.duration} elapsed
                      </Typography>
                    </Box>
                    
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: '0.3s',
                        '&:hover': {
                          opacity: 1,
                        }
                      }}
                    >
                      <IconButton 
                        sx={{ 
                          bgcolor: 'rgba(0, 0, 0, 0.6)', 
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' }
                        }}
                      >
                        <PlayIcon fontSize="large" />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <Avatar sx={{ width: 40, height: 40, mr: 1.5 }} />
                      <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {stream.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" fontWeight="medium">
                            {stream.channel}
                          </Typography>
                          {stream.verified && (
                            <VerifiedIcon sx={{ fontSize: 14, ml: 0.5, color: 'primary.main' }} />
                          )}
                        </Box>
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {stream.description}
                    </Typography>
                    
                    <Button 
                      variant="contained" 
                      startIcon={<PlayIcon />}
                      fullWidth
                    >
                      Watch Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        {/* Upcoming Streams */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ScheduleIcon sx={{ mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              Upcoming Broadcasts
            </Typography>
          </Box>
          
          <Paper sx={{ p: 3 }}>
            <List>
              {upcomingStreams.map((stream) => (
                <React.Fragment key={stream.id}>
                  <ListItem 
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        onClick={() => toggleNotification(stream.id)}
                        color={notifications[stream.id] ? 'primary' : 'default'}
                      >
                        {notifications[stream.id] ? 
                          <NotificationsIcon /> : 
                          <NotificationsNoneIcon />
                        }
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <ScheduleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="medium">
                          {stream.title}
                          {stream.verified && (
                            <VerifiedIcon sx={{ fontSize: 14, ml: 0.5, color: 'primary.main', verticalAlign: 'middle' }} />
                          )}
                        </Typography>
                      }
                      secondary={
                        <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body2" component="span">
                            {stream.date}
                          </Typography>
                          <Typography variant="caption" component="span">
                            {stream.channel}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {stream.id !== upcomingStreams[upcomingStreams.length - 1].id && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
        
        {/* Recently Streamed */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DonutLargeIcon sx={{ mr: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                Recently Streamed
              </Typography>
            </Box>
            <Button endIcon={<ArrowForwardIcon />} size="small">
              View All
            </Button>
          </Box>
        </Box>
        
        <Grid container spacing={3}>
          {recentStreams.map((stream) => (
            <Grid item xs={12} sm={6} md={3} key={stream.id}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={stream.thumbnail}
                      alt={stream.title}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        px: 0.8,
                        py: 0.3,
                        borderRadius: '4px',
                        fontSize: '0.75rem'
                      }}
                    >
                      {stream.duration}
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="subtitle1" 
                      fontWeight="bold" 
                      gutterBottom
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {stream.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {stream.views} views • {stream.date}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 20, height: 20, mr: 0.5 }} />
                      <Typography variant="caption" fontWeight="medium">
                        {stream.channel}
                      </Typography>
                      {stream.verified && (
                        <VerifiedIcon sx={{ fontSize: 12, ml: 0.5, color: 'primary.main' }} />
                      )}
                    </Box>
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

export default StreamingPage; 