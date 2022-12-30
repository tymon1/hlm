import { configureStore } from '@reduxjs/toolkit';
import fieldsReducer from '../features/hellmutt/fieldSlice';

export const store = configureStore({
  reducer: {
    field: fieldsReducer,
  },
});
