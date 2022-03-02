import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useAppSelector } from '../redux/store';
import { FONTS, SIZES } from '../constants';
import { AntDesign } from '@expo/vector-icons';

interface Props {
	value: number;
	onAdd: () => void;
	onDelete: () => void;
}

const Shopper: FC<Props> = ({ value, onAdd, onDelete }) => {
	const w = useSharedValue(60);
	const theme = useAppSelector((state) => state.theme);
	const animtedStyle = useAnimatedStyle(() => {
		return {
			width: withTiming(w.value, { duration: 500, easing: Easing.ease }),
		};
	});

	useEffect(() => {
		if (value > 0) {
			w.value = SIZES.width / 3;
		} else {
			w.value = 60;
		}
	}, [value]);
	return (
		<Animated.View
			style={[
				animtedStyle,
				{
					backgroundColor: theme.SECONDARY_BUTTON_COLOR,
					width: w.value,

					borderRadius: value > 0 ? w.value / 2 : 30,
					justifyContent: value > 0 ? 'space-between' : 'center',
					flexDirection: 'row',
					alignItems: 'center',
				},
			]}
		>
			{value > 0 && (
				<>
					<TouchableOpacity onPress={onDelete}>
						<AntDesign name='minuscircle' size={34} color={theme.WHITE_COLOR} />
					</TouchableOpacity>
					<Text style={{ ...FONTS.h3, color: theme.WHITE_COLOR }}>{value}</Text>
				</>
			)}
			<TouchableOpacity onPress={onAdd}>
				<AntDesign name='pluscircle' size={34} color={theme.WHITE_COLOR} />
			</TouchableOpacity>
		</Animated.View>
	);
};

export default Shopper;

const styles = StyleSheet.create({});
