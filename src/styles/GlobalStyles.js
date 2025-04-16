import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    height: 100%;
    width: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }
  
  #root {
    height: 100%;
    width: 100%;
  }
  
  /* Custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.mode === 'dark' ? '#1E1E1E' : '#F0F2F5'};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.mode === 'dark' ? '#424242' : '#C4C4C4'};
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.palette.mode === 'dark' ? '#616161' : '#A8A8A8'};
  }
  
  /* For Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => 
      theme.palette.mode === 'dark' ? '#424242 #1E1E1E' : '#C4C4C4 #F0F2F5'};
  }
  
  /* For glass morphism effect */
  .glass-morphism {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  /* For neon effect */
  .neon-text {
    text-shadow: 0 0 5px rgba(3, 218, 198, 0.5), 0 0 10px rgba(3, 218, 198, 0.3);
  }
  
  .neon-border {
    box-shadow: 0 0 5px rgba(3, 218, 198, 0.5), 0 0 10px rgba(3, 218, 198, 0.3);
  }
  
  /* For card hover effect */
  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card-hover:hover {
    transform: translateY(-5px);
  }
  
  /* For grid layout */
  .grid-container {
    display: grid;
    grid-gap: 16px;
  }
  
  /* For animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease forwards;
  }
  
  .animate-slideUp {
    animation: slideUp 0.5s ease forwards;
  }
  
  .animate-pulse {
    animation: pulse 2s infinite;
  }
  
  /* For responsive design */
  .responsive-container {
    width: 100%;
    padding-right: 16px;
    padding-left: 16px;
    margin-right: auto;
    margin-left: auto;
    
    @media (min-width: 576px) {
      max-width: 540px;
    }
    
    @media (min-width: 768px) {
      max-width: 720px;
    }
    
    @media (min-width: 992px) {
      max-width: 960px;
    }
    
    @media (min-width: 1200px) {
      max-width: 1140px;
    }
    
    @media (min-width: 1400px) {
      max-width: 1320px;
    }
  }
`;

export default GlobalStyles; 