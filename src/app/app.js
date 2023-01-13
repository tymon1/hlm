import { configureStore } from '@reduxjs/toolkit';

import appReducer from '../slice/AppSlice';
import storeReducer from '../slice/StoreSlice';


export const hlm = configureStore({
  reducer: {
    app: appReducer,
    store: storeReducer,
  },
});
