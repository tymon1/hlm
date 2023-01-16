import { configureStore } from '@reduxjs/toolkit';
import { storeWare } from './storeWare.js'

import appReducer from '../slice/AppSlice';
import storeReducer from '../slice/StoreSlice';


export const hlm = configureStore({
  reducer: {
    app: appReducer,
    store: storeReducer,
  },
	middleware: [storeWare] 
});
