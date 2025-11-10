import { CoinData, CoinsState } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState: CoinsState = {
  coins: [],
  loading: false,
  error: null,
};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<CoinData[]>) => {
      state.coins = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    addCoin: (state, action: PayloadAction<CoinData>) => {
      state.coins.push(action.payload);
    },
  },
});


export const { setCoins, setLoading, setError, addCoin } = coinsSlice.actions;


export default coinsSlice.reducer;
