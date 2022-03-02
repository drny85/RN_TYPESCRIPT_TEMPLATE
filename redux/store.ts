import { configureStore } from '@reduxjs/toolkit';
import themeSlide from './themeReducer/themeSlide';

import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import storesSlide from './storesReducer/storesSlide';
import productsSlide from './productsReducer/productsSlide';
import authSlide from './authReducer/authSlide';
import categoriesSlide from './categoryReducer/categoriesSlide';

const reducer = {
	theme: themeSlide,
	stores: storesSlide,
	products: productsSlide,
	auth: authSlide,
	categories: categoriesSlide,
};

const store = configureStore({
	reducer,
	devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
