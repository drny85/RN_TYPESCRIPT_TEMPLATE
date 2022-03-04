import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../productsReducer/productsSlide';
import { addToCart, Cart, deleteFromCart, getCartItems } from './cartActions';

export interface CartItem extends Product {
	size: null | string;
	quantity: number;
}

export interface CartState {
	cartItems: CartItem[];
	cartTotal: number;
	loading: boolean;
	itemsCount: number;
	counts: number;
	InCart: boolean;
}
const initialState: CartState = {
	cartItems: [],
	loading: false,
	cartTotal: 0,
	counts: 0,
	InCart: false,
	itemsCount: 0,
};
const cartSlide = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		calculateCartTotal: (
			state,
			{ payload: { items, quantity, total } }: PayloadAction<Cart>
		) => {
			const t = items.reduce(
				(current, index) => current + index.price * index.quantity,
				0
			);
			const counts = items.reduce(
				(current, index) => current + index.quantity,
				0
			);
			state.cartTotal = t;
			state.itemsCount = quantity;
			state.counts = counts;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addToCart.pending, (state) => {
				state.loading = true;
			})
			.addCase(addToCart.rejected, (state) => {
				state.loading = false;
			})
			.addCase(
				addToCart.fulfilled,
				(
					state,
					{ payload: { items, quantity, total } }: PayloadAction<Cart>
				) => {
					state.loading = false;
					state.itemsCount = quantity;
					state.cartItems = items;
					state.cartTotal = total;
				}
			)
			.addCase(getCartItems.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCartItems.rejected, (state) => {
				state.loading = false;
			})
			.addCase(
				getCartItems.fulfilled,
				(
					state,
					{ payload: { items, quantity, total } }: PayloadAction<Cart>
				) => {
					state.loading = false;
					state.itemsCount = quantity;
					state.cartItems = items;
					state.cartTotal = total;
				}
			)
			.addCase(deleteFromCart.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteFromCart.rejected, (state, { payload }) => {
				state.loading = false;
				console.log('Error', payload);
			})
			.addCase(deleteFromCart.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.cartItems = payload?.items!;
				state.cartTotal = payload?.total!;
				state.itemsCount = payload?.quantity!;
			});
	},
});

export const { calculateCartTotal } = cartSlide.actions;

export default cartSlide.reducer;
