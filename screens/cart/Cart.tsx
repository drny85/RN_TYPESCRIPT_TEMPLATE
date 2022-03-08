import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Screen, Text } from '../../components';

import FloatingButton from '../../components/FloatingButton';
import Row from '../../components/Row';
import { FONTS } from '../../constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartStackScreenParams } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { CartItem } from '../../redux/cartReducer/cartSlide';

import CartItemList from '../../components/CartItemList';
import { clearCart } from '../../redux/cartReducer/cartActions';

type Props = NativeStackScreenProps<CartStackScreenParams, 'Cart'>;

const Cart: React.FC<Props> = ({ navigation }) => {
    const { cartItems } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const cartIsNotEmpty = () => cartItems.length === 0;
    const renderCartItems: ListRenderItem<CartItem> = ({ item, index }) => {
        return <CartItemList product={item} />;
    };
    return (
        <Screen>
            <Row
                horizontalAlign="space-between"
                verticalAlign="center"
                containerStyle={{ marginHorizontal: 10 }}
            >
                <Text></Text>
                <Text style={{ ...FONTS.h3 }}>Cart</Text>
                {!cartIsNotEmpty() ? (
                    <FloatingButton
                        iconName="trash"
                        onPress={async () => {
                            const { payload } = await dispatch(clearCart());
                            console.log(payload);
                        }}
                    />
                ) : (
                    <Text></Text>
                )}
            </Row>
            {!cartIsNotEmpty() ? (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item, index) => item.id! + index}
                    renderItem={renderCartItems}
                />
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ ...FONTS.body3, paddingVertical: 10 }}>
                        No Items
                    </Text>
                    <Button
                        small
                        // @ts-ignore
                        onPress={() => navigation.navigate('RestaurantsStack')}
                    >
                        <Text style={{ ...FONTS.h4, color: '#ffffff' }}>
                            Start Shopping
                        </Text>
                    </Button>
                </View>
            )}
        </Screen>
    );
};

export default Cart;

const styles = StyleSheet.create({});
