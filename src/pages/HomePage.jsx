import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Divider, 
  Paper, 
  useTheme 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import { 
  TrendingUp as TrendingUpIcon, 
  AccountBalance as AccountBalanceIcon,
  Analytics as AnalyticsIcon,
  VideoLibrary as VideoLibraryIcon,
  Article as ArticleIcon,
  LiveTv as LiveTvIcon,
  MonetizationOn as MonetizationOnIcon,
  Equalizer as EqualizerIcon
} from '@mui/icons-material';

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(66, 165, 245, 0.1)' 
    : 'rgba(33, 150, 243, 0.1)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(6),
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: -16,
    left: 0,
    width: 80,
    height: 4,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
  },
}));

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <TrendingUpIcon fontSize="large" />,
      title: 'Market Analysis',
      description: 'Get real-time insights and analysis of global markets to make informed investment decisions.',
    },
    {
      icon: <MonetizationOnIcon fontSize="large" />,
      title: 'Portfolio Management',
      description: 'Track and manage your investments with our comprehensive portfolio tools and reports.',
    },
    {
      icon: <EqualizerIcon fontSize="large" />,
      title: 'Performance Tracking',
      description: 'Monitor your investment performance with detailed metrics and visualizations.',
    },
    {
      icon: <AccountBalanceIcon fontSize="large" />,
      title: 'Financial Planning',
      description: 'Plan your financial future with our suite of planning tools and calculators.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box>
      <HeroSection />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <SectionTitle variant="h4" component="h2" fontWeight="bold">
          Powerful financial tools
        </SectionTitle>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={featureVariants}
              >
                <FeatureCard elevation={3}>
                  <FeatureIcon>
                    {feature.icon}
                  </FeatureIcon>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      <Box 
        sx={{
          py: 10,
          position: 'relative',
          backgroundColor: theme => theme.palette.mode === 'dark' 
            ? 'rgba(0, 0, 0, 0.2)' 
            : 'rgba(33, 150, 243, 0.05)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            opacity: 0.3,
          }}
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(33, 150, 243, 0.3) 0%, transparent 30%)',
              'radial-gradient(circle at 80% 70%, rgba(33, 150, 243, 0.3) 0%, transparent 30%)',
              'radial-gradient(circle at 40% 60%, rgba(33, 150, 243, 0.3) 0%, transparent 30%)',
              'radial-gradient(circle at 60% 30%, rgba(33, 150, 243, 0.3) 0%, transparent 30%)',
              'radial-gradient(circle at 20% 30%, rgba(33, 150, 243, 0.3) 0%, transparent 30%)',
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
            Ready to take control of your investments?
          </Typography>
          <Typography variant="h6" component="p" paragraph color="textSecondary" sx={{ mb: 4 }}>
            Start tracking your portfolio performance and discover new investment opportunities today.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            color="primary"
            onClick={() => navigate('/portfolio')}
            sx={{ py: 1.5, px: 4, borderRadius: 2 }}
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 