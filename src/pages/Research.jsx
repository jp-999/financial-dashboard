import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Link
} from '@mui/material';
import { 
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon,
  PictureAsPdf as PdfIcon,
  AssessmentOutlined as AssessmentIcon,
  FolderOutlined as FolderIcon,
  DescriptionOutlined as DocumentIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Sample data for research reports
const researchReports = [
  {
    id: 1,
    title: 'AI Industry Outlook 2023-2025',
    description: 'Comprehensive analysis of artificial intelligence trends, market opportunities, and growth projections for the next two years.',
    date: 'June 15, 2023',
    author: 'Dr. Sarah Chen',
    tags: ['AI', 'Technology', 'Market Forecast'],
    type: 'PDF'
  },
  {
    id: 2,
    title: 'Renewable Energy: Investment Opportunities',
    description: 'Analysis of the renewable energy sector, focusing on solar, wind, and energy storage technologies and companies positioned for growth.',
    date: 'May 28, 2023',
    author: 'Michael Rodriguez',
    tags: ['Renewable Energy', 'ESG', 'Green Investments'],
    type: 'PDF'
  },
  {
    id: 3,
    title: 'Semiconductor Industry Supply Chain Analysis',
    description: 'Deep dive into the global semiconductor supply chain, recent challenges, and outlook for key industry players.',
    date: 'May 12, 2023',
    author: 'Jennifer Wong',
    tags: ['Semiconductors', 'Supply Chain', 'Technology'],
    type: 'PDF'
  },
  {
    id: 4,
    title: 'Fintech Disruption: Banking Sector Impacts',
    description: 'Examination of how financial technology companies are reshaping traditional banking and investment services.',
    date: 'April 30, 2023',
    author: 'Robert Patel',
    tags: ['Fintech', 'Banking', 'Digital Transformation'],
    type: 'PDF'
  }
];

// Sample data for stock analysis
const stockAnalysisData = [
  { 
    symbol: 'AAPL', 
    name: 'Apple Inc.', 
    price: '$193.28', 
    target: '$225.00', 
    upside: '+16.4%',
    rating: 'Buy',
    ratingColor: '#4caf50'
  },
  { 
    symbol: 'MSFT', 
    name: 'Microsoft Corporation', 
    price: '$420.45', 
    target: '$480.00', 
    upside: '+14.2%',
    rating: 'Buy',
    ratingColor: '#4caf50'
  },
  { 
    symbol: 'GOOGL', 
    name: 'Alphabet Inc.', 
    price: '$175.33', 
    target: '$192.50', 
    upside: '+9.8%',
    rating: 'Buy',
    ratingColor: '#4caf50'
  },
  { 
    symbol: 'AMZN', 
    name: 'Amazon.com Inc.', 
    price: '$178.12', 
    target: '$210.00', 
    upside: '+17.9%',
    rating: 'Strong Buy',
    ratingColor: '#2e7d32'
  },
  { 
    symbol: 'META', 
    name: 'Meta Platforms Inc.', 
    price: '$478.22', 
    target: '$525.00', 
    upside: '+9.8%',
    rating: 'Buy',
    ratingColor: '#4caf50'
  },
  { 
    symbol: 'NFLX', 
    name: 'Netflix Inc.', 
    price: '$623.12', 
    target: '$650.00', 
    upside: '+4.3%',
    rating: 'Hold',
    ratingColor: '#ff9800'
  },
  { 
    symbol: 'TSLA', 
    name: 'Tesla Inc.', 
    price: '$178.23', 
    target: '$200.00', 
    upside: '+12.2%',
    rating: 'Buy',
    ratingColor: '#4caf50'
  },
  { 
    symbol: 'JPM', 
    name: 'JPMorgan Chase & Co.', 
    price: '$178.92', 
    target: '$195.00', 
    upside: '+9.0%',
    rating: 'Buy',
    ratingColor: '#4caf50'
  }
];

const ResearchPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Research & Analysis
        </Typography>
        
        {/* Search Bar */}
        <Paper 
          sx={{ 
            p: 2, 
            mb: 4, 
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            fullWidth
            placeholder="Search for company, industry, or topic..."
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            sx={{ mr: 2 }}
          />
          <Button 
            variant="contained" 
            startIcon={<SearchIcon />}
            sx={{ 
              height: 40,
              minWidth: 120 
            }}
          >
            Search
          </Button>
        </Paper>
        
        {/* Main Content Tabs */}
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab 
              icon={<AssessmentIcon />} 
              iconPosition="start" 
              label="Stock Analysis" 
            />
            <Tab 
              icon={<DocumentIcon />} 
              iconPosition="start" 
              label="Research Reports" 
            />
            <Tab 
              icon={<FolderIcon />} 
              iconPosition="start" 
              label="Saved Research" 
            />
          </Tabs>
          
          {/* Tab Panel: Stock Analysis */}
          {tabValue === 0 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Analyst Recommendations & Price Targets
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Symbol</TableCell>
                      <TableCell>Company</TableCell>
                      <TableCell align="right">Current Price</TableCell>
                      <TableCell align="right">Target Price</TableCell>
                      <TableCell align="right">Upside</TableCell>
                      <TableCell align="center">Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stockAnalysisData.map((stock) => (
                      <TableRow 
                        hover 
                        key={stock.symbol}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                          {stock.symbol}
                        </TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell align="right">{stock.price}</TableCell>
                        <TableCell align="right">{stock.target}</TableCell>
                        <TableCell 
                          align="right" 
                          sx={{ 
                            color: 'success.main',
                            fontWeight: 'medium'
                          }}
                        >
                          {stock.upside}
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={stock.rating} 
                            size="small"
                            sx={{ 
                              backgroundColor: stock.ratingColor,
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ mt: 3, textAlign: 'right' }}>
                <Button endIcon={<ArrowForwardIcon />}>
                  View All Recommendations
                </Button>
              </Box>
            </Box>
          )}
          
          {/* Tab Panel: Research Reports */}
          {tabValue === 1 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {researchReports.map((report) => (
                  <Grid item xs={12} md={6} key={report.id}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: '0.3s',
                        '&:hover': {
                          boxShadow: 6
                        }
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                          >
                            {report.date}
                          </Typography>
                          <Chip 
                            icon={<PdfIcon fontSize="small" />} 
                            label={report.type} 
                            size="small"
                            sx={{ 
                              backgroundColor: '#f44336',
                              color: 'white'
                            }}
                          />
                        </Box>
                        
                        <Typography 
                          variant="h6" 
                          component="h2" 
                          gutterBottom
                          sx={{ fontWeight: 'bold' }}
                        >
                          {report.title}
                        </Typography>
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {report.description}
                        </Typography>
                        
                        <Typography 
                          variant="body2" 
                          fontWeight="medium"
                          sx={{ mb: 2 }}
                        >
                          Author: {report.author}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {report.tags.map((tag) => (
                            <Chip 
                              key={tag} 
                              label={tag} 
                              size="small"
                              variant="outlined"
                              sx={{ borderRadius: 1 }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                      
                      <Divider />
                      
                      <CardActions>
                        <Button size="small">View Report</Button>
                        <Button size="small">Download</Button>
                        <Button size="small">Save</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button variant="outlined" endIcon={<ArrowForwardIcon />}>
                  View All Research Reports
                </Button>
              </Box>
            </Box>
          )}
          
          {/* Tab Panel: Saved Research */}
          {tabValue === 2 && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" sx={{ mt: 4, mb: 2 }}>
                You haven't saved any research yet
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Browse our research reports and analysis, and save them for future reference
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => setTabValue(1)}
                sx={{ mx: 1 }}
              >
                Browse Research Reports
              </Button>
              <Button 
                variant="outlined"
                onClick={() => setTabValue(0)}
                sx={{ mx: 1 }}
              >
                View Stock Analysis
              </Button>
            </Box>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default ResearchPage; 