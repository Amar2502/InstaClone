// app/store.ts or src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import identifierReducer from '../features/identifierSlice';

export const store = configureStore({
  reducer: {
    identifier: identifierReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;