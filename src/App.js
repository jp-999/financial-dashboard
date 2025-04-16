import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { lightTheme, darkTheme } from './theme/theme';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import Portfolio from './pages/Portfolio';
import Stocks from './pages/Stocks';
import News from './pages/News';
import Markets from './pages/Markets';
import Research from './pages/Research';
import PersonalFinance from './pages/PersonalFinance';
import Videos from './pages/Videos';
import Streaming from './pages/Streaming';
import Navbar from './components/Navbar';

// App content with themes
const AppContent = () => {
  const themeMode = useSelector(state => state.theme.mode);
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1,
              p: { xs: 1, sm: 2, md: 3 },
              pt: { xs: 2, sm: 3 },
              pb: { xs: 4, sm: 5 },
              backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(0, 0, 0, 0.1)'
                : 'rgba(0, 0, 0, 0.02)',
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/stocks" element={<Stocks />} />
              <Route path="/news" element={<News />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/research" element={<Research />} />
              <Route path="/personal-finance" element={<PersonalFinance />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/streaming" element={<Streaming />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

// Main App component that wraps the whole application with Redux Provider
const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
