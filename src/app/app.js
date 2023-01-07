import { configureStore } from '@reduxjs/toolkit';

import appReducer from '../slice/AppSlice';
import storeReducer from '../slice/StoreSlice';
//import dropReducer from '../features/hellmutt/DropSlice.js';


export const hlm = configureStore({
  reducer: {
    app: appReducer,
    store: storeReducer,
  },
});
