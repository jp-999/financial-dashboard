import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Chip,
  Avatar,
  Stack
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  CreditCard as CreditCardIcon,
  Home as HomeIcon,
  DirectionsCar as CarIcon,
  School as EducationIcon,
  LocalAtm as BudgetIcon,
  TrendingUp as InvestingIcon,
  BarChart as ChartIcon,
  ArrowUpward as IncreaseIcon,
  ArrowDownward as DecreaseIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Sample data for budget overview
const budgetData = [
  { name: 'Income', value: 8500, color: '#4caf50' },
  { name: 'Expenses', value: 5800, color: '#f44336' },
  { name: 'Savings', value: 2700, color: '#2196f3' }
];

// Sample data for expenses by category
const expenseCategories = [
  { name: 'Housing', value: 2200, color: '#8884d8', icon: <HomeIcon /> },
  { name: 'Food', value: 800, color: '#82ca9d', icon: <CreditCardIcon /> },
  { name: 'Transportation', value: 600, color: '#ffc658', icon: <CarIcon /> },
  { name: 'Utilities', value: 450, color: '#ff8042', icon: <HomeIcon /> },
  { name: 'Entertainment', value: 350, color: '#a4de6c', icon: <CreditCardIcon /> },
  { name: 'Other', value: 1400, color: '#d0ed57', icon: <BudgetIcon /> }
];

// Sample data for savings goals
const savingsGoals = [
  { 
    name: 'Emergency Fund', 
    current: 12000, 
    target: 15000, 
    percentage: 80,
    icon: <AccountBalanceIcon />,
    color: '#2196f3'
  },
  { 
    name: 'Vacation', 
    current: 3500, 
    target: 5000, 
    percentage: 70,
    icon: <CreditCardIcon />,
    color: '#ff9800'
  },
  { 
    name: 'Down Payment', 
    current: 45000, 
    target: 100000, 
    percentage: 45,
    icon: <HomeIcon />,
    color: '#4caf50'
  }
];

// Sample data for monthly spending trends
const monthlyTrends = [
  { month: 'Jan', amount: 5200 },
  { month: 'Feb', amount: 5400 },
  { month: 'Mar', amount: 5100 },
  { month: 'Apr', amount: 5800 },
  { month: 'May', amount: 5600 },
  { month: 'Jun', amount: 5900 }
];

// Sample data for financial tools
const financialTools = [
  {
    title: 'Budget Planner',
    description: 'Create and manage your monthly budget',
    icon: <BudgetIcon fontSize="large" />,
    color: '#4caf50'
  },
  {
    title: 'Debt Tracker',
    description: 'Track and plan your debt payoff strategy',
    icon: <CreditCardIcon fontSize="large" />,
    color: '#f44336'
  },
  {
    title: 'Retirement Calculator',
    description: 'Plan for your retirement needs',
    icon: <AccountBalanceIcon fontSize="large" />,
    color: '#9c27b0'
  },
  {
    title: 'Investment Planner',
    description: 'Optimize your investment strategy',
    icon: <InvestingIcon fontSize="large" />,
    color: '#2196f3'
  },
  {
    title: 'Mortgage Calculator',
    description: 'Calculate mortgage payments and amortization',
    icon: <HomeIcon fontSize="large" />,
    color: '#ff9800'
  },
  {
    title: 'Education Savings',
    description: 'Plan for education expenses',
    icon: <EducationIcon fontSize="large" />,
    color: '#795548'
  }
];

// Sample data for financial insights
const financialInsights = [
  {
    title: 'Spending increased in Entertainment category',
    description: 'Your entertainment spending is 15% higher than last month.',
    type: 'warning',
    icon: <WarningIcon color="warning" />
  },
  {
    title: 'Exceeded your savings goal this month',
    description: 'You saved $450 more than your monthly target. Great job!',
    type: 'success',
    icon: <CheckCircleIcon color="success" />
  },
  {
    title: 'Potential to optimize your utility bills',
    description: 'Based on your usage patterns, you could save up to $85 monthly.',
    type: 'info',
    icon: <ChartIcon color="info" />
  }
];

const PersonalFinancePage = () => {
  const [selectedMonth, setSelectedMonth] = useState('Jun');

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Personal Finance
        </Typography>
        
        {/* Budget Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Budget Overview
              </Typography>
              <Box sx={{ height: 250, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                
                <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mt: 2 }}>
                  {budgetData.map((item) => (
                    <Chip 
                      key={item.name}
                      label={`${item.name}: $${item.value}`}
                      sx={{ 
                        bgcolor: item.color,
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Monthly Spending Trends
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyTrends}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Bar dataKey="amount" name="Total Expenses" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Expense Categories and Savings Goals */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Expense Categories
              </Typography>
              <List>
                {expenseCategories.map((category) => (
                  <ListItem key={category.name} disableGutters>
                    <ListItemIcon sx={{ color: category.color }}>
                      {category.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={category.name} 
                      secondary={`$${category.value}`}
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                    />
                    <Box sx={{ flexGrow: 1, ml: 2 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(category.value / 2200) * 100}
                        sx={{ 
                          height: 8, 
                          borderRadius: 5,
                          backgroundColor: `${category.color}40`,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: category.color,
                            borderRadius: 5
                          }
                        }}
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Savings Goals
              </Typography>
              <List>
                {savingsGoals.map((goal) => (
                  <ListItem key={goal.name} disableGutters>
                    <ListItemIcon sx={{ color: goal.color }}>
                      {goal.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={goal.name} 
                      secondary={`$${goal.current} of $${goal.target}`}
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                    />
                    <Box sx={{ flexGrow: 1, ml: 2 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={goal.percentage}
                        sx={{ 
                          height: 8, 
                          borderRadius: 5,
                          backgroundColor: `${goal.color}40`,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: goal.color,
                            borderRadius: 5
                          }
                        }}
                      />
                      <Typography 
                        variant="caption" 
                        sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}
                      >
                        {goal.percentage}%
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Financial Insights */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Financial Insights
          </Typography>
          <Grid container spacing={2}>
            {financialInsights.map((insight, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Avatar
                        sx={{ 
                          bgcolor: 
                            insight.type === 'warning' ? 'warning.light' :
                            insight.type === 'success' ? 'success.light' : 'info.light',
                          mr: 1.5
                        }}
                      >
                        {insight.icon}
                      </Avatar>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {insight.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {insight.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
        
        {/* Financial Tools */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Financial Tools
        </Typography>
        <Grid container spacing={3}>
          {financialTools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
                }}
              >
                <CardActionArea sx={{ height: '100%', p: 2 }}>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}
                  >
                    <Avatar
                      sx={{ 
                        bgcolor: tool.color, 
                        width: 60, 
                        height: 60,
                        mb: 2
                      }}
                    >
                      {tool.icon}
                    </Avatar>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {tool.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tool.description}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default PersonalFinancePage; 