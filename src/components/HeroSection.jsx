import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  useTheme 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '6rem 2rem',
  overflow: 'hidden',
  minHeight: '80vh',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark' 
      ? 'radial-gradient(circle at 20% 30%, rgba(123, 31, 162, 0.15) 0%, rgba(123, 31, 162, 0) 70%), radial-gradient(circle at 80% 70%, rgba(0, 176, 255, 0.15) 0%, rgba(0, 176, 255, 0) 70%)'
      : 'radial-gradient(circle at 20% 30%, rgba(123, 31, 162, 0.1) 0%, rgba(123, 31, 162, 0) 70%), radial-gradient(circle at 80% 70%, rgba(0, 176, 255, 0.1) 0%, rgba(0, 176, 255, 0) 70%)',
    zIndex: -1,
  }
}));

const HeroTitle = styled(motion(Typography))(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
  fontWeight: 800,
  marginBottom: '1.5rem',
  lineHeight: 1.1,
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(to right, #fff, #b39ddb)'
    : 'linear-gradient(to right, #1a237e, #7b1fa2)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  textShadow: theme.palette.mode === 'dark' 
    ? '0 0 20px rgba(123, 31, 162, 0.3)'
    : 'none',
  
  '& span': {
    display: 'block',
    background: 'linear-gradient(to right, #7b1fa2, #00b0ff)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  }
}));

const HeroSubtitle = styled(motion(Typography))(({ theme }) => ({
  fontSize: 'clamp(1rem, 3vw, 1.5rem)',
  fontWeight: 400,
  color: theme.palette.text.secondary,
  maxWidth: 700,
  margin: '0 auto 3rem',
  lineHeight: 1.6,
}));

const HeroActions = styled(motion(Box))({
  display: 'flex',
  gap: '1rem',
  marginBottom: '3rem',
  
  '@media (max-width: 576px)': {
    flexDirection: 'column',
  }
});

const StatsList = styled(motion(Grid))({
  marginBottom: '2rem',
});

const StatItem = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: '0.5rem',
  background: 'linear-gradient(to right, #7b1fa2, #00b0ff)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}));

const GridBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: theme.palette.mode === 'dark'
    ? 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)'
    : 'linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
  backgroundSize: '40px 40px',
  zIndex: -2,
}));

const Orb = styled(motion.div)(({ size, top, left, right, bottom, color }) => ({
  position: 'absolute',
  width: size || '200px',
  height: size || '200px',
  borderRadius: '50%',
  background: `radial-gradient(circle, ${color} 0%, rgba(0, 0, 0, 0) 70%)`,
  filter: 'blur(60px)',
  opacity: 0.4,
  zIndex: -1,
  top: top || '0',
  left: left || '0',
  right: right || 'auto',
  bottom: bottom || 'auto',
}));

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    } 
  }
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      delay: 0.2, 
      ease: "easeOut" 
    } 
  }
};

const actionsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      delay: 0.4, 
      ease: "easeOut" 
    } 
  }
};

const statsVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.6
    } 
  }
};

const statItemVariants = {
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

const orbVariants = {
  animate: {
    x: [0, 10, -10, 0],
    y: [0, -10, 10, 0],
    transition: {
      x: {
        repeat: Infinity,
        duration: 20,
        ease: "easeInOut"
      },
      y: {
        repeat: Infinity,
        duration: 15,
        ease: "easeInOut"
      }
    }
  }
};

const HeroSection = () => {
  const theme = useTheme();
  
  const stats = [
    { value: '$2.5T+', label: 'Assets Tracked' },
    { value: '5M+', label: 'Users' },
    { value: '10K+', label: 'Securities' },
    { value: '99.9%', label: 'Uptime' }
  ];
  
  return (
    <HeroContainer>
      <GridBackground />
      
      <Orb 
        color={theme.palette.mode === 'dark' ? "rgba(123, 31, 162, 0.5)" : "rgba(123, 31, 162, 0.3)"} 
        size="300px" 
        top="-50px" 
        left="10%" 
        variants={orbVariants}
        animate="animate"
      />
      <Orb 
        color={theme.palette.mode === 'dark' ? "rgba(0, 176, 255, 0.5)" : "rgba(0, 176, 255, 0.3)"} 
        size="250px" 
        bottom="-30px" 
        right="15%" 
        variants={orbVariants}
        animate="animate"
      />
      
      <HeroTitle 
        variant="h1"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        One place for your <span>portfolios, metrics and more</span>
      </HeroTitle>
      
      <HeroSubtitle
        variant="h2"
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
      >
        Gain insights, see trends and get real-time updates when you securely link or manually add your brokerage accounts.
      </HeroSubtitle>
      
      <HeroActions
        variants={actionsVariants}
        initial="hidden"
        animate="visible"
      >
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          component={Link}
          to="/portfolio"
          sx={{ 
            px: 4, 
            py: 1.5, 
            borderRadius: '8px',
            fontWeight: 600
          }}
        >
          Get Started
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          size="large"
          component={Link}
          to="/research"
          sx={{ 
            px: 4, 
            py: 1.5, 
            borderRadius: '8px',
            fontWeight: 600
          }}
        >
          Learn More
        </Button>
      </HeroActions>
      
      <StatsList
        container
        spacing={3}
        justifyContent="center"
        variants={statsVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, index) => (
          <StatItem 
            item
            xs={6}
            sm={3}
            key={index}
            component={motion.div}
            variants={statItemVariants}
          >
            <StatValue variant="h3">{stat.value}</StatValue>
            <StatLabel variant="body2">{stat.label}</StatLabel>
          </StatItem>
        ))}
      </StatsList>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          transition: { delay: 1, duration: 0.8 }
        }}
      >
        <Typography variant="body2" color="textSecondary" sx={{ mt: 4 }}>
          FinDash does not store your broker credentials. <Link to="/privacy" style={{ color: theme.palette.primary.main }}>Learn more</Link>
        </Typography>
      </motion.div>
    </HeroContainer>
  );
};

export default HeroSection; 