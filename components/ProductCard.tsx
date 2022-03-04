import {
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { FC, useRef, useState } from 'react';
import { Text } from '.';
import { FONTS, SIZES } from '../constants';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Product } from '../redux/productsReducer/productsSlide';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/core';
import Shopper from './Shopper';
import { addToCart, deleteFromCart } from '../redux/cartReducer/cartActions';

interface Props {
	product: Product;
	onPress: () => void;
}
const ProductCard: FC<Props> = ({ product, onPress }) => {
	const theme = useAppSelector((state) => state.theme);
	const { cartItems } = useAppSelector((state) => state.cart);
	const navigation = useNavigation();
	const dispatch = useAppDispatch();
	const productInCart = cartItems.find((p) => product.id === p.id);

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				styles.card,
				{
					backgroundColor: theme.SHADOW_COLOR,
					width: SIZES.isSmallDevice ? SIZES.width * 0.7 : SIZES.width * 0.4,
				},
			]}
		>
			<ImageBackground
				resizeMode='cover'
				source={{ uri: product.imageUrl }}
				style={styles.image}
			>
				<View style={{ position: 'absolute', right: 0, top: 0 }}>
					{product.sizes === null && (
						<Shopper
							value={productInCart?.quantity!}
							onAdd={() => {
								dispatch(
									addToCart({
										...product,
										size: productInCart?.size || null,
										sizes: productInCart?.sizes || null,
										quantity: productInCart?.quantity || 1,
									})
								);
							}}
							onDelete={() => {
								dispatch(
									deleteFromCart({
										...product,
										size: productInCart?.size!,
										sizes: productInCart?.sizes!,
										quantity: productInCart?.quantity!,
									})
								);
							}}
						/>
					)}
				</View>
				<LinearGradient
					style={{
						position: 'absolute',
						justifyContent: 'space-between',
						alignItems: 'center',
						flexDirection: 'row',
						bottom: 0,
						left: 0,
						right: 0,
						paddingVertical: SIZES.padding * 0.5,
						paddingHorizontal: SIZES.base,
					}}
					colors={[theme.SHADOW_COLOR, theme.SECONDARY_BUTTON_COLOR]}
				>
					<Text
						style={{
							fontFamily: 'lobster',
							fontSize: 24,
							color: theme.WHITE_COLOR,
						}}
					>
						{product.name}
					</Text>
					<Text style={{ ...FONTS.h3, color: theme.WHITE_COLOR }}>
						$
						{product.sizes !== null
							? product.price[product.sizes[0]]
							: product.price}
					</Text>
				</LinearGradient>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default ProductCard;

const styles = StyleSheet.create({
	card: {
		marginHorizontal: SIZES.padding * 0.2,
		height: SIZES.height * 0.2,
		borderRadius: SIZES.radius,
	},
	image: {
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		borderRadius: SIZES.radius,
	},
});
