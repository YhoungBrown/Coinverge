import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './reduxSlice/CoinsSlice';
import favouriteReducer from './reduxSlice/FavouriteSlice';
import portfolioReducer from './reduxSlice/PortfolioSlice';

export const store = configureStore({
  reducer: {
     coins: coinReducer,
     portfolio: portfolioReducer,
     favourite: favouriteReducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch