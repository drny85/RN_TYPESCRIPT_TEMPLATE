import {configureStore} from '@reduxjs/toolkit'
import themeSlide from './themeReducer/themeSlide';

import {useSelector, TypedUseSelectorHook, useDispatch} from 'react-redux'

const reducer = {
    theme: themeSlide
}

const store = configureStore({
    reducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;