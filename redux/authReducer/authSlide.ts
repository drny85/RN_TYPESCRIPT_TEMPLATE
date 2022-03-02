import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
};
const authSlide = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
});

export default authSlide.reducer;
