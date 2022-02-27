import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import main from '../screens/mainSlice';
import { apiSlice } from './apiSlice';
const store = configureStore({
	reducer: {
		main,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
