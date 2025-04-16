import React from 'react';
import { Box, Typography, Container, Button, Grid, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AnimatedText = styled(motion.div)({
  display: 'inline-block',
});

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
}));

const HeroButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1.5, 4),
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  },
}));

const heroTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const HeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '85vh',
        minHeight: '600px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: theme => theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, rgba(22,28,36,1) 0%, rgba(22,28,36,0.95) 100%)'
          : 'linear-gradient(180deg, rgba(245,247,250,1) 0%, rgba(245,247,250,0.95) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <Box
        component={motion.div}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            style={{
              position: 'absolute',
              background: theme.palette.mode === 'dark'
                ? `rgba(33, 150, 243, ${0.03 + index * 0.01})`
                : `rgba(33, 150, 243, ${0.03 + index * 0.01})`,
              borderRadius: '50%',
              filter: 'blur(10px)',
              width: 100 + index * 100,
              height: 100 + index * 100,
              x: (index % 2 === 0 ? -1 : 1) * (100 + index * 50),
              y: -50 + index * 100,
            }}
            animate={{
              x: [(index % 2 === 0 ? -1 : 1) * (100 + index * 50), (index % 2 === 0 ? 1 : -1) * (100 + index * 50), (index % 2 === 0 ? -1 : 1) * (100 + index * 50)],
              y: [-50 + index * 100, 50 + index * 100, -50 + index * 100],
            }}
            transition={{
              duration: 20 + index * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <AnimatedText variants={heroTextVariants}>
                <Typography variant="overline" color="primary" fontWeight={600} gutterBottom>
                  Financial Dashboard
                </Typography>
              </AnimatedText>
              
              <AnimatedText variants={heroTextVariants}>
                <GradientText variant="h2" component="h1" fontWeight={700} gutterBottom>
                  Visualize Your Financial Future
                </GradientText>
              </AnimatedText>
              
              <AnimatedText variants={heroTextVariants}>
                <Typography 
                  variant="h5" 
                  component="p" 
                  color="textSecondary" 
                  sx={{ mb: 4, maxWidth: '90%' }}
                >
                  Track your investments, analyze market trends, and make informed financial decisions with our powerful dashboard.
                </Typography>
              </AnimatedText>
              
              <motion.div variants={heroTextVariants}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <HeroButton
                    variant="contained"
                    color="primary"
                    onClick={handleExploreClick}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Explore Dashboard
                  </HeroButton>
                  
                  <HeroButton
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate('/portfolio')}
                  >
                    View Portfolio
                  </HeroButton>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                component="img"
                src="/assets/images/dashboard-preview.png"
                alt="Dashboard Preview"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '550px',
                  borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection; 