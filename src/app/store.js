import { configureStore } from '@reduxjs/toolkit';
import fieldsReducer from '../features/hellmutt/FieldSlice';
import rampsReducer from '../features/hellmutt/RampsSlice';
import queueReducer from '../features/hellmutt/QueueSlice';

export const store = configureStore({
  reducer: {
    field: fieldsReducer,
    ramps: rampsReducer,
    queue: queueReducer,
  },
});
