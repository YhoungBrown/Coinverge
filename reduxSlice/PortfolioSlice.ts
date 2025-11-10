import { CoinData, PortfolioState } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: PortfolioState = {
  assets: [],
  loading: false,
  error: null,
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {


    addAssets: (state, action: PayloadAction<CoinData>) => {
        state.assets.push(action.payload);
    },


    sellAssets: (state, action: PayloadAction<CoinData>) => {
      state.assets = state.assets.filter(
        (asset) => asset.id !== action.payload.id
      );
    },
  },
});

export const { addAssets,  sellAssets } = portfolioSlice.actions;

export default portfolioSlice.reducer;
