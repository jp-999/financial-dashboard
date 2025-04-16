import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import portfolioReducer from './slices/portfolioSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    portfolio: portfolioReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Needed if we use non-serializable values
    }),
});

export default store; 