import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './reduxSlice/CoinsSlice';
import portfolioReducer from './reduxSlice/PortfolioSlice';

export const store = configureStore({
  reducer: {
     coins: coinReducer,
     portfolio: portfolioReducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch