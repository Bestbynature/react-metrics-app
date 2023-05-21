import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  country: '',
  countryData: JSON.parse(localStorage.getItem('country')) || {},
  header: {
    first: '2015',
    second: 'most views',
  },
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setCountry: (state, { payload }) => {
      const newVal = {
        first: '',
        second: 'country details',
      };
      state.header = { ...newVal };
      const [country, load] = payload;
      state.country = country;
      localStorage.setItem('country', JSON.stringify(load));
      state.countryData = JSON.parse(localStorage.getItem('country'));
    },
    setHeader: (state) => {
      const newVal = {
        first: '2015',
        second: 'most views',
      };
      state.header = { ...newVal };
    },
  },
});

export const { setCountry, setHeader, setCountryData } = detailsSlice.actions;

export default detailsSlice.reducer;
