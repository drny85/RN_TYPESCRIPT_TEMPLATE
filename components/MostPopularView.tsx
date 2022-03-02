import React, { FC, useEffect } from 'react';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { SIZES } from '../constants';

interface Props {
	scrollY: number;
}

const MostPopularView: FC<Props> = ({ scrollY, children }) => {
	const w = useSharedValue(SIZES.isSmallDevice ? 80 : 100);
	const opacity = useSharedValue(1);
	const flex = useSharedValue(0.2);
	const animatedStyled = useAnimatedStyle(() => {
		return {
			height: withTiming(w.value),
			flex: withTiming(flex.value),
			opacity: withTiming(opacity.value),
		};
	});

	useEffect(() => {
		if (scrollY < 1) {
			w.value = SIZES.isSmallDevice ? 60 : 80;
			opacity.value = 1;
			flex.value = 0.2;
		} else {
			w.value = 0;
			opacity.value = 0;
			flex.value = 0;
		}
	}, [scrollY]);
	return (
		<Animated.View
			style={[
				{
					flex: flex.value,
					marginBottom: 10,
					maxHeight: 130,
				},
				animatedStyled,
			]}
		>
			{children}
		</Animated.View>
	);
};

export default MostPopularView;
