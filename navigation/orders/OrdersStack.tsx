import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orders from '../../screens/orders/Orders';

const { Navigator, Screen } = createNativeStackNavigator();

const OrdersStack = () => {
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen name='Orders' component={Orders} />
		</Navigator>
	);
};

export default OrdersStack;
