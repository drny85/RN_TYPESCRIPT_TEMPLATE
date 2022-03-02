import {
	Animated,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';
import React, { FC } from 'react';
import { Text } from '.';
import { COLORS, FONTS, SIZES } from '../constants';
import { useAppSelector } from '../redux/store';
import { Store } from '../redux/storesReducer/storesSlide';
import { LinearGradient } from 'expo-linear-gradient';
import Row from './Row';

interface Props {
	onPress: () => void;
	restaurant: Store;
	containerStyle?: ViewStyle;
	style?: ViewStyle;
	scale?: any;
	opacity?: any;
}

const RestaurantCard: FC<Props> = ({
	onPress,
	restaurant,
	containerStyle,
	style,
	scale,
	opacity,
}) => {
	const theme = useAppSelector((state) => state.theme);
	const { stores } = useAppSelector((state) => state.stores);
	return (
		<Animated.View
			style={[
				containerStyle,
				{
					transform: scale && [{ scale }],
					opacity: opacity && opacity,
					width: SIZES.isSmallDevice
						? SIZES.width * 0.9
						: stores.length > 1
						? SIZES.width * 0.45
						: SIZES.width * 0.9,
				},
			]}
		>
			<TouchableOpacity
				style={[
					styles.view,
					{ backgroundColor: theme.PRIMARY_BUTTON_COLOR },
					style,
				]}
				onPress={onPress}
			>
				<ImageBackground
					style={styles.img}
					source={{
						uri: restaurant.imageUrl
							? restaurant.imageUrl
							: 'https://mk0tarestaurant7omoy.kinstacdn.com/wp-content/uploads/2018/01/premiumforrestaurants_0.jpg',
					}}
				>
					<LinearGradient
						locations={[0.1, 0.5, 0.8, 0.9]}
						colors={[
							theme.SECONDARY_BUTTON_COLOR,
							'rgba(0,0,0,0.6)',
							'rgba(0,0,0,0.4)',
							'rgba(0,0,0,0.125)',
						]}
						start={{ x: 0.1, y: 0.1 }}
						end={{ x: 1, y: 1 }}
						style={{
							position: 'absolute',
							bottom: 0,
							left: 0,
							padding: 10,
							width: '100%',
						}}
					>
						<Text
							numberOfLines={1}
							ellipsizeMode='tail'
							style={{
								...FONTS.h3,
								textTransform: 'uppercase',
								color: '#ffffff',
							}}
						>
							{restaurant.name}
						</Text>
						<Text style={{ ...FONTS.body4, color: '#ffffff' }}>
							{restaurant.phone}
						</Text>
						{restaurant.deliveryType !== 'pickup' && restaurant.open && (
							<Row horizontalAlign='space-between'>
								<Text style={{ ...FONTS.body5, color: theme.WHITE_COLOR }}>
									${restaurant.deliveryMinimum} minimum delivery
								</Text>
								<Text style={{ ...FONTS.h4, color: theme.WHITE_COLOR }}>
									{restaurant.estimatedDeliveryTime} mins
								</Text>
							</Row>
						)}
					</LinearGradient>
				</ImageBackground>
			</TouchableOpacity>
		</Animated.View>
	);
};

export default RestaurantCard;

const styles = StyleSheet.create({
	view: {
		height: SIZES.height * 0.2,
		marginHorizontal: SIZES.isSmallDevice ? 0 : 10,
		borderRadius: 15,
		elevation: 10,
		shadowColor: 'red',
		shadowOffset: { width: 3, height: 6 },
		shadowOpacity: 0.7,
		shadowRadius: 15,
		marginVertical: 8,
		overflow: 'hidden',
	},
	img: {
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		borderRadius: 15,
	},
});
