import { configureStore } from '@reduxjs/toolkit';
import fieldsReducer from '../features/hellmutt/FieldSlice';
import queueReducer from '../features/hellmutt/QueueSlice';

export const store = configureStore({
  reducer: {
    store: fieldsReducer,
    queue: queueReducer,
  },
});
