import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

export const countries = ['BOLIVIA', 'ITALY', 'GERMANY', 'POLAND', 'SPAIN', 'UNITED KINGDOM', 'NIGERIA', 'GHANA', 'CAMEROON', 'TUNISIA', 'ISRAEL', 'CANADA', 'CONGO', 'KENYA', 'MALI', 'SENEGAL', 'SOUTH AFRICA', 'EGYPT', 'SUDAN', 'ETHIOPIA', 'CHINA', 'INDIA', 'ARGENTINA', 'CHILE', 'PERU', 'MEXICO', 'HAITI', 'SOUTH KOREA', 'BRAZIL', 'COSTA RICA', 'PANAMA', 'COLOMBIA', 'VENEZUELA', 'ECUADOR', 'PARAGUAY', 'URUGUAY'];

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
            'lat & long': item[0].latlng ? item[0].latlng.join(', ') : 'N/A',
            Area: item[0].area,
            Timezones: item[0].timezones[0],
            Borders: item[0].borders ? item[0].borders.join(', ') : 'N/A',
            'Alternate Spellings': item[0].altSpellings ? item[0].altSpellings.join(', ') : 'N/A',
            'Independent?': item[0].independent,
            Status: item[0].status,
            Abbreviation: item[0].cioc,
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
