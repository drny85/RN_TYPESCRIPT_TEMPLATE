import { ImageBackground, StyleSheet, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { Text } from '../../components';
import CheckBox from '../../components/CkeckBox';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RestaurantsStackParamList } from '../../types';
import { setProduct } from '../../redux/productsReducer/productsSlide';
import { FONTS, SIZES } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import Shopper from '../../components/Shopper';
import FloatingButton from '../../components/FloatingButton';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = NativeStackScreenProps<
	RestaurantsStackParamList,
	'ProductDetails'
>;
const ProductDetails: FC<Props> = ({ navigation, route }) => {
	const { product } = useAppSelector((state) => state.products);
	const theme = useAppSelector((state) => state.theme);
	const [checked, setChecked] = useState<boolean | any>(false);
	const dispatch = useAppDispatch();
	const sizes: string[] = [];

	const handleCheck = (item: string) => {
		//add size to the array just once;
		const found = sizes.find((i) => i === item);
		if (found) return;
		const index = sizes.findIndex((i) => i === item);
		sizes.splice(index, 1);

		sizes.push(item);
		setChecked(item);
	};

	useEffect(() => {
		dispatch(setProduct(route.params.productId));
	}, [route.params.productId, dispatch]);
	return (
		<View style={{ flex: 1, backgroundColor: theme.BACKGROUND_COLOR }}>
			<ImageBackground
				style={styles.image}
				resizeMode='cover'
				source={{ uri: product?.imageUrl }}
			>
				<FloatingButton
					containerStyle={{
						position: 'absolute',
						top: 40,
						left: 20,
						zIndex: 99,
					}}
					onPress={() => navigation.goBack()}
					iconName='arrow-left'
				/>
				<LinearGradient
					style={styles.gradient}
					locations={[0.2, 0.4, 1]}
					colors={[
						'rgba(0,0,0,0.125)',
						theme.SHADOW_COLOR,
						theme.SECONDARY_BUTTON_COLOR,
					]}
				>
					<Text
						style={{
							fontFamily: 'lobster',
							fontSize: 24,
							color: theme.WHITE_COLOR,
						}}
					>
						{product?.name}
					</Text>
					<Text style={{ ...FONTS.h3, color: theme.WHITE_COLOR }}>
						{product?.sizes && checked ? `$${product.price[checked]}` : null}
						{product?.sizes && !checked
							? `$${product?.price[product.sizes[0]]!} - $${
									product.price[product.sizes[product.sizes.length - 1]!]
							  }`
							: null}
						{!product?.sizes && `$${product?.price}`}
					</Text>
				</LinearGradient>
			</ImageBackground>
			{/* <Shopper
				value={count}
				onAdd={() => setCount(count + 1)}
				onDelete={() => setCount(count - 1)}
			/> */}
			<KeyboardAwareScrollView
				keyboardDismissMode='on-drag'
				contentContainerStyle={{ flex: 1 }}
			>
				<DescriptionView style={styles.description}>
					<Text style={{ ...FONTS.body2, fontFamily: 'lobster' }}>
						{product?.description}
					</Text>
				</DescriptionView>
				{product?.sizes && (
					<>
						<Text
							style={{ ...FONTS.h4, textAlign: 'center', paddingBottom: 10 }}
						>
							Pick a Size
						</Text>
						<SizesView
							style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
						>
							{product.sizes.map((s) => (
								<SizeView key={s}>
									<CheckBox
										title={s}
										onPress={() => handleCheck(s)}
										checked={checked === s}
									/>
								</SizeView>
							))}
						</SizesView>
					</>
				)}
			</KeyboardAwareScrollView>
		</View>
	);
};

export default ProductDetails;

const DescriptionView = styled.View``;
const SizesView = styled.View``;
const SizeView = styled.View``;

const styles = StyleSheet.create({
	image: {
		width: SIZES.width,
		height: SIZES.height * 0.25,
	},
	gradient: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		padding: SIZES.padding * 0.5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	description: {
		padding: SIZES.padding * 0.5,
	},
});
