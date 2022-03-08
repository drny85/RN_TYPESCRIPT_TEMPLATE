import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../../screens/cart/Cart';
import { CartStackScreenParams } from '../../types';

const { Navigator, Screen } =
    createNativeStackNavigator<CartStackScreenParams>();

const CartStack = () => {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_bottom'
            }}
        >
            <Screen name="Cart" component={Cart} />
        </Navigator>
    );
};

export default CartStack;
