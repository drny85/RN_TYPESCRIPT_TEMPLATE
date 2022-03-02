import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../../screens/auth/Profile';

const { Navigator, Screen } = createNativeStackNavigator();

const AuthStack = () => {
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen name='Auth' component={Profile} />
		</Navigator>
	);
};

export default AuthStack;
