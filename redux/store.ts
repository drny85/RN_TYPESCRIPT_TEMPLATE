import { configureStore } from '@reduxjs/toolkit';
import themeSlide from './themeReducer/themeSlide';

import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import {
	authSlide,
	cartSlide,
	categoriesSlide,
	productsSlide,
	storesSlide,
} from '.';

const reducer = {
	theme: themeSlide,
	stores: storesSlide,
	products: productsSlide,
	auth: authSlide,
	categories: categoriesSlide,
	cart: cartSlide,
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
