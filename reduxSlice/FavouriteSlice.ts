import { CoinData, favouriteState } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: favouriteState = {
  assets: [],
  loading: false,
  error: null,
};

export const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {


    addToFav: (state, action: PayloadAction<CoinData>) => {
        state.assets.push(action.payload);
    },


    removeFromFav: (state, action: PayloadAction<CoinData>) => {
      state.assets = state.assets.filter(
        (asset) => asset.id !== action.payload.id
      );
    },
  },
});

export const { addToFav,  removeFromFav } = favouriteSlice.actions;

export default favouriteSlice.reducer;
