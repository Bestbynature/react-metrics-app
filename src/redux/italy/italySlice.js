import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

export const cities = ['Milan', 'Venice', 'Bologna', 'Florence', 'Palermo'];

const latlonggen = (arr) => {
  const result = [];
  arr.forEach((item) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${item}&limit=1&appid=04e719b7fe8733da512311060dc69fd0`;
    result.push(url);
  });
  return result;
};

export const fetchItalyLatLong = createAsyncThunk(
  'italy/fetchItalyLatLongData', async () => {
    const citylatlong = latlonggen(cities);
    const result = [];
    try {
      const response = await axios.all(citylatlong.map((url) => axios.get(url)));
      response.forEach((item) => {
        result.push(item.data);
      });
      return result;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  },
);

const generateUrl = (arr) => {
  const result = [];
  arr.forEach((item) => {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${item.lat}&lon=${item.lng}&appid=04e719b7fe8733da512311060dc69fd0`;
    result.push(url);
  });
  return result;
};

export const fetchItalyData = createAsyncThunk(
  'italy/fetchItalyData', async (arr) => {
    const allUrl = generateUrl(arr);
    const result = [];
    try {
      const response = await axios.all(allUrl.map((url) => axios.get(url)));
      response.forEach((item) => {
        result.push(item.data);
      });
      return result;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  },
);

const initialState = {
  loading: false,
  error: null,
  data1: [],
  data2: [],
  country: '',
  countryPollution: {},
};

const italySlice = createSlice({
  name: 'italy',
  initialState,
  reducers: {
    setCountry: (state, { payload }) => {
      state.data1 = [];
      state.data2 = [];
      const [country, countryPollution] = payload;
      state.country = country;
      state.countryPollution = { ...countryPollution };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItalyLatLong.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItalyLatLong.fulfilled, (state, { payload }) => {
        state.loading = false;
        const output = [];
        payload.forEach((item) => {
          const latlong = { lat: item[0].lat, lng: item[0].lon };
          output.push(latlong);
        });
        state.data1 = [...output];
      })
      .addCase(fetchItalyLatLong.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })
      .addCase(fetchItalyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItalyData.fulfilled, (state, { payload }) => {
        state.loading = false;
        const output = [];
        payload.forEach((item) => {
          const obj = {
            co: item.list[0].components.co,
            no: item.list[0].components.no,
            pollution: `${item.list[0].main.aqi} of 5`,
          };
          output.push(obj);
        });
        state.data2 = [...output];
      })
      .addCase(fetchItalyData.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  },
});

export const { setCountry } = italySlice.actions;

export default italySlice.reducer;
