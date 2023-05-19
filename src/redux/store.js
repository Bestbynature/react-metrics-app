import { configureStore } from '@reduxjs/toolkit';
import italyReducer from './italy/italySlice';
import homeReducer from './home/homeSlice';

const store = configureStore({
  reducer: {
    italy: italyReducer,
    home: homeReducer,
  },
});

export default store;
