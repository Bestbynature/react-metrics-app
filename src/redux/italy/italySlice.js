import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

// export const cities = ['Milan', 'Venice', 'Bologna', 'Florence', 'Palermo'];

export const citiesall = {
  italy: ['Milan', 'Venice', 'Bologna', 'Florence', 'Palermo'],
  germany: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
  spain: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza'],
  unitedkingdom: ['London', 'Birmingham', 'Leeds', 'Glasgow', 'Sheffield'],
  poland: ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Poznań'],
  nigeria: ['Lagos', 'Kano', 'Ibadan', 'Kaduna', 'Port Harcourt'],
  ghana: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Cape Coast'],
  czeckrepublic: ['Prague', 'Brno', 'Ostrava', 'Pilsen', 'Olomouc'],
};

const latlonggen = (arr) => {
  const result = [];
  arr.forEach((item) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${item}&limit=1&appid=04e719b7fe8733da512311060dc69fd0`;
    result.push(url);
  });
  return result;
};

const generateUrl = (arr) => {
  const result = [];
  arr.forEach((item) => {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${item.lat}&lon=${item.lng}&appid=04e719b7fe8733da512311060dc69fd0`;
    result.push(url);
  });
  return result;
};

export const fetchItalyLatLong = createAsyncThunk(
  'italy/fetchItalyLatLongData', async (load) => {
    const loaded = load.toLowerCase().replace(/ /g, '');
    const cities = citiesall[loaded];
    console.log(cities);
    const citylatlong = latlonggen(cities);
    const result = [];
    try {
      const response = await axios.all(citylatlong.map((url) => axios.get(url)));
      response.forEach((item) => {
        result.push(item.data);
      });
      const output = [];
      result.forEach((item) => {
        const latlong = { lat: item[0].lat, lng: item[0].lon };
        output.push(latlong);
      });

      const allUrl = generateUrl(output);

      const result2 = [];

      const response2 = await axios.all(allUrl.map((url) => axios.get(url)));
      response2.forEach((item) => {
        result2.push(item.data);
      });
      const output2 = [];
      result2.forEach((item) => {
        const obj = {
          co: item.list[0].components.co,
          no: item.list[0].components.no,
          pollution: `${item.list[0].main.aqi} of 5`,
        };
        output2.push(obj);
      });

      return output2;
      // state.citydata = [...output];
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  },
);

// export const fetchItalyData = createAsyncThunk(
//   'italy/fetchItalyData', async (arr) => {
//     const allUrl = generateUrl(arr);
//     const result = [];
//     try {
//       const response = await axios.all(allUrl.map((url) => axios.get(url)));
//       response.forEach((item) => {
//         result.push(item.data);
//       });
//       return result;
//     } catch (error) {
//       return isRejectedWithValue(error.response.data);
//     }
//   },
// );

const initialState = {
  loading: false,
  error: null,
  // coord: [],
  citydata: [],
  country: '',
  countryPollution: {},
};

const italySlice = createSlice({
  name: 'italy',
  initialState,
  reducers: {
    setCountry: (state, { payload }) => {
      // state.citydata = [];
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
        // const output = [];
        // payload.forEach((item) => {
        //   const latlong = { lat: item[0].lat, lng: item[0].lon };
        //   output.push(latlong);
        // });
        // state.data1 = [...output];
        state.citydata = [...payload];
      })
      .addCase(fetchItalyLatLong.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  //     .addCase(fetchItalyData.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(fetchItalyData.fulfilled, (state, { payload }) => {
  //       state.loading = false;
  //       const output = [];
  //       payload.forEach((item) => {
  //         const obj = {
  //           co: item.list[0].components.co,
  //           no: item.list[0].components.no,
  //           pollution: `${item.list[0].main.aqi} of 5`,
  //         };
  //         output.push(obj);
  //       });
  //       state.data2 = [...output];
  //     })
  //     .addCase(fetchItalyData.rejected, (state, { payload }) => {
  //       state.error = payload;
  //       state.loading = false;
  //     });
  },
});

export const { setCountry } = italySlice.actions;

export default italySlice.reducer;
