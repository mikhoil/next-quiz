import { combineReducers, configureStore } from '@reduxjs/toolkit';
import resultReducer from './slices/resultSlice';

const rootReducer = combineReducers({ resultReducer });

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
