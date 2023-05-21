import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  country: '',
  countryData: {},
};

const italySlice = createSlice({
  name: 'italy',
  initialState,
  reducers: {
    setCountry: (state, { payload }) => {
      const [country, load] = payload;
      state.country = country;
      state.countryData = { ...load };
    },
  },
});

export const { setCountry } = italySlice.actions;

export default italySlice.reducer;
