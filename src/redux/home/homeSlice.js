import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
// https://restcountries.com/v3.1/name/nigeria
// const capitals = ['Prague', 'Rome', 'Berlin', 'Warsaw', 'Madrid', 'London', 'Abuja', 'Accra'];

// const latlonggen = (arr) => {
//   const result = [];
//   arr.forEach((item) => {
//     const url = `http://api.openweathermap.org/geo/1.0/direct?q=${item}&limit=1&appid=04e719b7fe8733da512311060dc69fd0`;
//     result.push(url);
//   });
//   return result;
// };

// export const fetchHomeLatLong = createAsyncThunk(
//   'home/fetchHomeLatLongData', async () => {
//     const citylatlong = latlonggen(capitals);
//     const result = [];
//     try {
//       const response = await axios.all(citylatlong.map((url) => axios.get(url)));
//       response.forEach((item) => {
//         result.push(item.data);
//       });
//       return result;
//     } catch (error) {
//       return isRejectedWithValue(error?.response?.data || error.message);
//     }
//   },
// );
export const countries = ['BOLIVIA', 'ITALY', 'GERMANY', 'POLAND', 'SPAIN', 'UNITED KINGDOM', 'NIGERIA', 'GHANA'];

const generateUrl = (arr) => {
  const result = [];
  arr.forEach((item) => {
    const url = `https://restcountries.com/v3.1/name/${item}`;
    result.push(url);
  });
  return result;
};

export const fetchHomeData = createAsyncThunk(
  'home/fetchHomeData', async () => {
    const allUrl = generateUrl(countries);
    const result = [];
    try {
      const response = await axios.all(allUrl.map((url) => axios.get(url)));
      response.forEach((item) => {
        result.push(item.data);
      });
      return result;
    } catch (error) {
      return isRejectedWithValue(error?.response?.data || error.message);
    }
  },
);

const initialState = {
  loading: false,
  error: null,
  data: JSON.parse(localStorage.getItem('homedata')) || [],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(fetchHomeLatLong.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(fetchHomeLatLong.fulfilled, (state, { payload }) => {
      //   state.loading = false;
      //   // console.log(payload);
      //   const output = [];
      //   payload.forEach((item) => {
      //     const latlong = { lat: item[0].lat, lng: item[0].lon };
      //     output.push(latlong);
      //   });
      //   localStorage.setItem('homelatlong', JSON.stringify(output));
      //   state.data1 = [...output];
      // })
      // .addCase(fetchHomeLatLong.rejected, (state, { payload }) => {
      //   state.error = payload;
      //   state.loading = false;
      // })
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomeData.fulfilled, (state, { payload }) => {
        state.loading = false;
        const output = [];
        payload.forEach((item) => {
          const obj = {
            Name: item[0].name.common,
            'Official Flag': item[0].flags.png,
            'Coat Of Arms': item[0].coatOfArms.png,
            Capital: item[0].capital[0],
            Region: item[0].region,
            Subregion: item[0].subregion,
            Population: item[0].population,
            Map: item[0].maps.googleMaps,
            'lat & long': item[0].latlng.join(', '),
            Area: item[0].area,
            Timezones: item[0].timezones[0],
            // nativeName: item[0].nativeName,
            // currencies: item[0].currencies.BOB,
            // languages: item[0].languages,
            // translations: item[0].translations,
            // flagpng: item[0].flags.png,
            // flagsvg: item[0].flags.svg,
            // callingCodes: item[0].callingCodes,
            // topLevelDomain: item[0].topLevelDomain,
            // alpha3Code: item[0].alpha3Code,
            'Alternate Spellings': item[0].altSpellings.join(', '),
            // demonym: item[0].demonym,
            // landlocked: item[0].landlocked,
            'Independent?': item[0].independent,
            Status: item[0].status,
            Abbreviation: item[0].cioc,
            // idd: item[0].idd,
            Continent: item[0].continents[0],
            'UN Member?': item[0].unMember,
          };
          output.push(obj);
        });
        localStorage.setItem('homedata', JSON.stringify(output));
        state.data = [...output];
      })
      .addCase(fetchHomeData.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  },
});

export default homeSlice.reducer;
