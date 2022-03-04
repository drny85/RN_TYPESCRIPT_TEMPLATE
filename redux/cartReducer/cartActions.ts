import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebase';

import { calculateCartTotal, CartItem } from './cartSlide';
import Cart from '../../screens/cart/Cart';

export interface Cart {
	items: CartItem[];
	quantity: number;
	total: number;
}

const CART_ID = 'cartId';
export const getCartOrCreateCart = createAsyncThunk(
	'cart/createCart',
	async (_, { rejectWithValue }) => {
		try {
			let cartId;
			const data = await AsyncStorage.getItem(CART_ID);
			if (data === null) {
				const query = await db
					.collection('carts')
					.add({ items: [], quantity: 0, total: 0 });
				const id = (await query.get()).id;
				cartId = id;
				await AsyncStorage.setItem(CART_ID, JSON.stringify(id));
			} else {
				cartId = JSON.parse(data);

				const found = (await db.collection('carts').doc(cartId).get()).exists;
				if (found) {
					console.log(found);
					cartId = JSON.parse(data);
				} else {
					await AsyncStorage.removeItem(CART_ID);
					const query = await db
						.collection('carts')
						.add({ items: [], quantity: 0, total: 0 });
					cartId = (await query.get()).id;

					await AsyncStorage.setItem(CART_ID, JSON.stringify(cartId));
				}
			}

			return cartId;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const addToCart = createAsyncThunk(
	'cart/addToCart',
	async (product: CartItem, { rejectWithValue, dispatch }) => {
		try {
			const cartId = await dispatch(getCartOrCreateCart());

			const data = db.collection('carts').doc(cartId.payload);
			const { items, quantity, total } = (await data.get()).data() as Cart;
			const result = await checkIfProductComeInSizes(
				product,
				items,
				quantity,
				total,
				cartId.payload
			);

			return result as Cart;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deleteFromCart = createAsyncThunk(
	'cart/deleteFromCart',
	async (product: CartItem, { rejectWithValue, dispatch }) => {
		try {
			console.log('P', product);

			const { payload: cartId } = await dispatch(getCartOrCreateCart());
			const { payload } = await dispatch(getCartItems());
			const { items, quantity, total } = payload as Cart;

			if (items.length === 0) return;
			if (product.size !== null) {
				//DEAL WITH A PRODUCT THAT COMES IN SIZES
				const itemFound = items.find((i) => i.id === product.id);
				if (itemFound) {
					//DEAL WITH ITEM FOUND
					const size = itemFound.quantity;
					if (size > 1) {
						const index = items.indexOf(itemFound);
						const updatedItems = [...items];
						updatedItems[index].quantity = itemFound.quantity - 1;
						await removeOneMoreToCart(
							updatedItems,
							quantity - 1,
							total - product.price,
							cartId
						);
					} else {
						const index = items.findIndex(
							(i) => i.id === product.id && i.size === product.size
						);
						const updatedItems = [...items];
						updatedItems.splice(index, 1);
						await removeOneMoreToCart(
							updatedItems,
							quantity - 1,
							total - product.price,
							cartId
						);
					}
				} else {
					return rejectWithValue('No Product Found');
				}
			} else {
				const itemFound = items.find((i) => i.id === product.id);

				if (itemFound) {
					const size = itemFound.quantity;
					if (size > 1) {
						const index = items.indexOf(itemFound);

						const updatedProducts = [...items];
						updatedProducts.splice(index, 1);
						const newProduct = { ...product, quantity: product.quantity - 1 };
						const updatedItems = [...updatedProducts, newProduct];

						await removeOneMoreToCart(
							updatedItems,
							quantity - 1,
							total - itemFound.price,
							cartId
						);
					} else {
						const index = items.findIndex((i) => i.id === product.id);
						const updatedItems = [...items];
						updatedItems.splice(index, 1);
						await removeOneMoreToCart(
							updatedItems,
							quantity - 1,
							total - product.price,
							cartId
						);
					}
				} else {
					rejectWithValue('No product found');
				}
			}

			const ref = await db.collection('carts').doc(cartId).get();

			return ref.data() as Cart;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getCartItems = createAsyncThunk(
	'cart/getCartItems',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const { payload } = await dispatch(getCartOrCreateCart());
			const data = (
				await db.collection('carts').doc(payload).get()
			).data() as Cart;

			return data as Cart;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const checkIfProductComeInSizes = async (
	product: CartItem,
	products: CartItem[],
	quantity: number,
	total: number,
	cartId: string
) => {
	try {
		let data;
		if (product.size !== null) {
			const found = products.find((i) => i.id === product.id);
			if (found) {
				const indexFound = products.indexOf(found);
				const newItems = [...products];
				newItems[indexFound].quantity = found.quantity + 1;
				await addOneMoreToCart(newItems, quantity, total, cartId);
			} else {
				data = await addOneMoreToCart(
					[...products, product],
					quantity + 1,
					total + product.price,
					cartId
				);
			}
		} else {
			// ITEM DO NOT COME IN SIZES
			const itemFound = products.find((i) => i.id === product.id);
			if (itemFound) {
				const index = products.indexOf(itemFound);
				const newItems = [...products];
				newItems[index].quantity = itemFound.quantity + 1;
				data = await addOneMoreToCart(
					newItems,
					quantity + 1,
					total + product.price,
					cartId
				);
			} else {
				data = await addOneMoreToCart(
					[...products, product],
					quantity + 1,
					total + product.price,
					cartId
				);
			}
		}

		return data;
	} catch (error) {
		console.log(error);
		return error;
	}
};

const addOneMoreToCart = async (
	items: CartItem[],
	quantity: number,
	total: number,
	cardId: string
) => {
	try {
		const ref = await db.collection('carts').doc(cardId);
		await ref.update({
			items,
			quantity,
			total,
		});

		const data = (await ref.get()).data() as Cart;
		return data;
	} catch (error) {
		console.log(error);
	}
};

const removeOneMoreToCart = async (
	items: CartItem[],
	quantity: number,
	total: number,
	cardId: string
) => {
	try {
		const ref = await db.collection('carts').doc(cardId);
		await ref.update({
			items,
			quantity,
			total,
		});

		const data = (await ref.get()).data() as Cart;
		return data;
	} catch (error) {
		console.log(error);
	}
};
