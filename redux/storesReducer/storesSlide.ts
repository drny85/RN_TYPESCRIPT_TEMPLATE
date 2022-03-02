import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getStore } from './storesActions';

export interface Store {
	id: string;
	name: string;
	address: string;
	phone: string;
	email?: string;
	open: boolean;
	status: string;
	hours: {
		mon: string;
		tue: string;
		wed: string;
		thu: string;
		fri: string;
		sat: string;
		sun: string;
	};
	imageUrl?: string;
	estimatedDeliveryTime?: string;
	chargedCardFee: boolean;
	deliveryMinimum: number;
	deliveryType: 'pickup' | 'delivery' | 'both';
	deliveryZip: [string];
	hasItems: boolean;
	state: string;
	street: string;
	userId: string;
	zipcode: string;
	deliveryMilesRadius?: number;
	longAddress: string;
}

interface StoresState {
	stores: Store[];
	loading: boolean;
	selectedStore: Store | null;
	orderType: 'delivery' | 'pickup';
}

const initialState: StoresState = {
	stores: [],
	selectedStore: null,
	loading: false,
	orderType: 'delivery',
};

const storesSlide = createSlice({
	name: 'stores',
	initialState,
	reducers: {
		getStores: (state, { payload }) => {
			state.loading = false;
			state.stores = payload;
		},
		setSelectedStore: (state, { payload }) => {
			state.selectedStore = payload;
		},
		switchOrderType: (
			state,
			{ payload }: PayloadAction<StoresState['orderType']>
		) => {
			state.loading = false;
			state.orderType = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getStore.pending, (state) => {
				state.loading = true;
			})
			.addCase(getStore.rejected, (state) => {
				state.loading = false;
			})
			.addCase(getStore.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.selectedStore = payload!;
			});
	},
});

export const { getStores, setSelectedStore, switchOrderType } =
	storesSlide.actions;

export default storesSlide.reducer;
