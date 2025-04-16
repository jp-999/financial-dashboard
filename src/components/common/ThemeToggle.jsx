import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { toggleTheme, selectThemeMode } from '../../store/slices/themeSlice';
import { motion } from 'framer-motion';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.05)',
  },
}));

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectThemeMode);
  const isDarkMode = themeMode === 'dark';

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Tooltip title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
      <StyledIconButton
        onClick={handleToggleTheme}
        color="inherit"
        component={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDarkMode ? (
          <Brightness7 sx={{ color: 'orange' }} />
        ) : (
          <Brightness4 sx={{ color: '#555' }} />
        )}
      </StyledIconButton>
    </Tooltip>
  );
};

export default ThemeToggle; 