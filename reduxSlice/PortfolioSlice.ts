import { PortfolioAsset, PortfolioState } from '@/type';
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


    addAssets: (state, action: PayloadAction<PortfolioAsset>) => {
        const existing = state.assets.find(asset => asset.id === action.payload.id);

      if (existing) { 
        existing.quantity += action.payload.quantity;
      } else {
        state.assets.push(action.payload);
      }
    },


    sellAssets: (state, action: PayloadAction<PortfolioAsset>) => {
       
      const existing = state.assets.find(asset => asset.id === action.payload.id);

      if(!existing){
        return
      }

      if (existing) {
        existing.quantity -= action.payload.quantity;
      }
      
      if (existing!.quantity <= 0) {
          state.assets = state.assets.filter(asset => asset.id !== action.payload.id);
        }
    },
  },
});

export const { addAssets,  sellAssets } = portfolioSlice.actions;

export default portfolioSlice.reducer;
