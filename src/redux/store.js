import { configureStore } from '@reduxjs/toolkit';
import detailsReducer from './details/detailsSlice';
import homeReducer from './home/homeSlice';

const store = configureStore({
  reducer: {
    details: detailsReducer,
    home: homeReducer,
  },
});

export default store;
