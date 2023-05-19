import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

const capitals = ['Prague', 'Rome', 'Berlin', 'Warsaw', 'Madrid', 'London', 'Abuja', 'Accra'];

const latlonggen = (arr) => {
  const result = [];
  arr.forEach((item) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${item}&limit=1&appid=04e719b7fe8733da512311060dc69fd0`;
    result.push(url);
  });
  return result;
};

export const fetchHomeLatLong = createAsyncThunk(
  'home/fetchHomeLatLongData', async () => {
    const citylatlong = latlonggen(capitals);
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

export const fetchHomeData = createAsyncThunk(
  'home/fetchHomeData', async (arr) => {
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
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeLatLong.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomeLatLong.fulfilled, (state, { payload }) => {
        state.loading = false;
        const output = [];
        payload.forEach((item) => {
          const latlong = { lat: item[0].lat, lng: item[0].lon };
          output.push(latlong);
        });
        state.data1 = [...output];
      })
      .addCase(fetchHomeLatLong.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomeData.fulfilled, (state, { payload }) => {
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
      .addCase(fetchHomeData.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  },
});

export default homeSlice.reducer;
