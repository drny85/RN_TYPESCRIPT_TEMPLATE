import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../../screens/cart/Cart';

const { Navigator, Screen } = createNativeStackNavigator();

const CartStack = () => {
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen name='Cart' component={Cart} />
		</Navigator>
	);
};

export default CartStack;
