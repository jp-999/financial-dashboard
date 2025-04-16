import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a custom futuristic theme
const theme = (mode) => {
  let themeOptions = {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light mode palette
            primary: {
              main: '#03a9f4',
              light: '#67daff',
              dark: '#007ac1',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#7c4dff',
              light: '#b47cff',
              dark: '#3f1dcb',
              contrastText: '#ffffff',
            },
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
            text: {
              primary: '#212121',
              secondary: '#757575',
            },
            divider: 'rgba(0, 0, 0, 0.12)',
          }
        : {
            // Dark mode palette
            primary: {
              main: '#03dac6',
              light: '#6efff8',
              dark: '#00a896',
              contrastText: '#000000',
            },
            secondary: {
              main: '#bb86fc',
              light: '#efb7ff',
              dark: '#8858c8',
              contrastText: '#000000',
            },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
              secondary: '#b0b0b0',
            },
            divider: 'rgba(255, 255, 255, 0.12)',
          }),
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      subtitle1: {
        fontWeight: 500,
      },
      subtitle2: {
        fontWeight: 500,
      },
      button: {
        fontWeight: 500,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 8,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'dark' 
                ? '0 6px 12px rgba(0,0,0,0.3)' 
                : '0 6px 12px rgba(0,0,0,0.1)',
            },
          },
          containedPrimary: {
            boxShadow: mode === 'dark' 
              ? '0 4px 10px rgba(3, 218, 198, 0.4)' 
              : '0 4px 10px rgba(3, 169, 244, 0.25)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            boxShadow: mode === 'dark' 
              ? '0 4px 20px rgba(0, 0, 0, 0.5)' 
              : '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
          elevation1: {
            boxShadow: mode === 'dark'
              ? '0 2px 10px rgba(0, 0, 0, 0.4)'
              : '0 2px 10px rgba(0, 0, 0, 0.08)',
          },
          elevation2: {
            boxShadow: mode === 'dark'
              ? '0 4px 15px rgba(0, 0, 0, 0.45)'
              : '0 4px 15px rgba(0, 0, 0, 0.1)',
          },
          elevation3: {
            boxShadow: mode === 'dark'
              ? '0 6px 20px rgba(0, 0, 0, 0.5)'
              : '0 6px 20px rgba(0, 0, 0, 0.12)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: mode === 'dark'
                ? '0 8px 24px rgba(0, 0, 0, 0.6)'
                : '0 8px 24px rgba(0, 0, 0, 0.15)',
            },
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-head': {
              fontWeight: 600,
              backgroundColor: mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.03)',
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.2s ease',
            '&:hover': {
              backgroundColor: mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.02)',
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            scrollbarWidth: 'thin',
            scrollbarColor: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.2) rgba(0, 0, 0, 0.3)' 
              : 'rgba(0, 0, 0, 0.2) rgba(255, 255, 255, 0.3)',
          },
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-track': {
            background: mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
            },
          },
          'html, body': {
            height: '100%',
            width: '100%',
            margin: 0,
            padding: 0,
            overflowX: 'hidden',
          },
          '#root': {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      },
    },
  };

  return responsiveFontSizes(createTheme(themeOptions));
};

export default theme; 