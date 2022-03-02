import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, ListRenderItem, View } from 'react-native';
import { Screen, Text } from '../../components';
import Loader from '../../components/Loader';
import RestaurantCard from '../../components/RestaurantCard';
import RestaurantSearch from '../../components/RestaurantSearch';
import Toogler from '../../components/Toogler';
import { SIZES } from '../../constants';
import { db } from '../../firebase';
import { useAllProducts } from '../../hooks/useAllProducts';
import { useStores } from '../../hooks/useStores';
import {
	getAllProducts,
	getMorePopular,
	Product,
} from '../../redux/productsReducer/productsSlide';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getStore } from '../../redux/storesReducer/storesActions';
import { Store, switchOrderType } from '../../redux/storesReducer/storesSlide';
import { RestaurantsStackParamList } from '../../types';

const SPACING = SIZES.padding;
const ITEM_SIZE = SIZES.height * 0.25 + SPACING * 2;

type Props = NativeStackScreenProps<RestaurantsStackParamList, 'Restaurants'>;

const Restaurants: FC<Props> = ({ navigation }) => {
	const dispatch = useAppDispatch();
	const theme = useAppSelector((state) => state.theme);
	const { orderType } = useAppSelector((state) => state.stores);
	const { allProducts } = useAppSelector((state) => state.products);
	const scrollY = useRef(new Animated.Value(0)).current;
	const [currentX, setCurrentX] = useState<number>(0);
	const [searchText, setSearchText] = useState('');
	const { loading, stores } = useStores();
	//useAllProducts();

	const prepareProductsForNextScreen = (storeId: string) => {
		if (storeId) {
			dispatch(getStore(storeId));
		}
	};

	const renderRestaurants: ListRenderItem<Store> = ({ item, index }) => {
		const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
		const opacityRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)];
		const scale = scrollY.interpolate({
			inputRange,
			outputRange: [1, 1, 1, 0],
		});
		const opacity = scrollY.interpolate({
			inputRange: opacityRange,
			outputRange: [1, 1, 1, 0],
		});
		return (
			<RestaurantCard
				scale={scale}
				opacity={opacity}
				restaurant={item}
				onPress={() => {
					prepareProductsForNextScreen(item.id);
					navigation.navigate('Restaurant', { restaurantId: item.id });
				}}
			/>
		);
	};

	if (loading) return <Loader />;
	return (
		<Screen>
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<RestaurantSearch
					onPressSearch={({ nativeEvent }) => {
						console.log(nativeEvent.key);
					}}
					onPressClearButton={() => {
						setSearchText('');
						Keyboard.dismiss();
					}}
					onChangeText={(text) => {
						setSearchText(text);
					}}
					searchText={searchText}
				/>
				<View
					style={{
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Toogler
						leftCondition='delivery'
						rightCondition='pickup'
						condition={orderType}
						onPressLeft={() => dispatch(switchOrderType('delivery'))}
						onPressRight={() => dispatch(switchOrderType('pickup'))}
					/>
				</View>
			</View>
			{stores && (
				<Animated.FlatList
					numColumns={SIZES.isSmallDevice ? 1 : 2}
					ListHeaderComponent={
						<View
							style={{
								width: SIZES.width * 0.9,
								marginTop: SIZES.padding,
							}}
						>
							<Text style={{ textAlign: 'left' }}>Restaurants</Text>
						</View>
					}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrollY } } }],
						{ useNativeDriver: true }
					)}
					showsVerticalScrollIndicator={false}
					style={{ flex: 1 }}
					contentContainerStyle={{ alignItems: 'center' }}
					data={stores}
					keyExtractor={(item) => item.id!}
					renderItem={renderRestaurants}
				/>
			)}
		</Screen>
	);
};

export default Restaurants;
