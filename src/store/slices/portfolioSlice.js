import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mockPortfolioData from '../../data/mockPortfolio.json';
import mockStocksData from '../../data/mockStocks.json';

// Simulating API call to fetch portfolio data
export const fetchPortfolioData = createAsyncThunk(
  'portfolio/fetchPortfolioData',
  async (_, { rejectWithValue }) => {
    try {
      // In a real application, this would be an API call
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockPortfolioData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Simulating API call to fetch stocks data
export const fetchStocksData = createAsyncThunk(
  'portfolio/fetchStocksData',
  async (_, { rejectWithValue }) => {
    try {
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockStocksData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  portfolioData: null,
  stocksData: [],
  activeStock: null,
  selectedTimeRange: '1Y', // Default time range for charts
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setActiveStock: (state, action) => {
      state.activeStock = action.payload;
    },
    setSelectedTimeRange: (state, action) => {
      state.selectedTimeRange = action.payload;
    },
    addToWatchlist: (state, action) => {
      if (state.portfolioData && !state.portfolioData.watchlist.includes(action.payload)) {
        state.portfolioData.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      if (state.portfolioData) {
        state.portfolioData.watchlist = state.portfolioData.watchlist.filter(
          (symbol) => symbol !== action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolioData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPortfolioData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.portfolioData = action.payload;
      })
      .addCase(fetchPortfolioData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchStocksData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStocksData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stocksData = action.payload;
        // If no active stock is set, set the first one as active
        if (!state.activeStock && action.payload.length > 0) {
          state.activeStock = action.payload[0].id;
        }
      })
      .addCase(fetchStocksData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { 
  setActiveStock, 
  setSelectedTimeRange, 
  addToWatchlist, 
  removeFromWatchlist 
} = portfolioSlice.actions;

export const selectPortfolioData = (state) => state.portfolio.portfolioData;
export const selectStocksData = (state) => state.portfolio.stocksData;
export const selectActiveStock = (state) => state.portfolio.activeStock;
export const selectActiveStockData = (state) => {
  const activeStockId = state.portfolio.activeStock;
  return state.portfolio.stocksData.find(stock => stock.id === activeStockId) || null;
};
export const selectSelectedTimeRange = (state) => state.portfolio.selectedTimeRange;
export const selectStatus = (state) => state.portfolio.status;
export const selectError = (state) => state.portfolio.error;
export const selectWatchlist = (state) => state.portfolio.portfolioData?.watchlist || [];

export default portfolioSlice.reducer; 