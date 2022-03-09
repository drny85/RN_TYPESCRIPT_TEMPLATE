import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { Text } from '.';
import { FONTS, SIZES } from '../constants';
import { CartItem } from '../redux/cartReducer/cartSlide';
import { useAppDispatch, useAppSelector } from '../redux/store';
import Row from './Row';
import Shopper from './Shopper';
import { addToCart, deleteFromCart } from '../redux/cartReducer/cartActions';
//import { Image } from 'react-native-expo-image-cache';
import { MotiView, useAnimationState } from 'moti';

interface Props {
    product: CartItem;
}
const CartItemList: React.FC<Props> = ({ product }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.cart);
    const theme = useAppSelector((state) => state.theme);

    const animationState = useAnimationState({
        from: {
            opacity: 1,
            scale: 1
        },
        to: {
            opacity: 1,
            scale: 1
        },
        expanded: {
            scale: 0,
            opacity: 0
        }
    });
    console.log(product.quantity);

    return (
        <MotiView state={animationState}>
            <Row containerStyle={styles.view}>
                <View style={{ flex: 0.3 }}>
                    <Image
                        resizeMode="cover"
                        style={styles.image}
                        source={{ uri: product.imageUrl }}
                    />
                </View>

                <View style={styles.rightView}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        style={{
                            ...FONTS.h4,
                            textAlign: 'center',
                            textTransform: 'capitalize'
                        }}
                    >
                        {product.name}
                    </Text>

                    <Row
                        horizontalAlign="space-between"
                        verticalAlign="flex-start"
                        containerStyle={{
                            paddingVertical: 8,
                            paddingHorizontal: SIZES.padding
                        }}
                    >
                        <Text style={{ ...FONTS.body4 }}>
                            {product.quantity} x $
                            {typeof product.price === 'object'
                                ? parseFloat(
                                      product.price[product.size!]
                                  ).toFixed(2)
                                : parseFloat(product.price).toFixed(2)}
                        </Text>
                        {product.size ? (
                            <Text
                                style={{
                                    paddingLeft: 20,
                                    color: theme.WHITE_COLOR,
                                    opacity: 0.7,
                                    textTransform: 'capitalize',
                                    ...FONTS.body4
                                }}
                            >
                                {product.size}
                            </Text>
                        ) : (
                            <Text style={{ ...FONTS.body4 }}></Text>
                        )}
                    </Row>

                    <Row
                        horizontalAlign="space-between"
                        verticalAlign="center"
                        containerStyle={{ paddingHorizontal: 10 }}
                    >
                        <Shopper
                            value={product.quantity}
                            onAdd={() => {
                                if (!loading) {
                                    dispatch(
                                        addToCart({
                                            ...product,
                                            quantity: 1,
                                            size: product.size,
                                            sizes: product.sizes
                                        })
                                    );
                                }
                            }}
                            onDelete={async () => {
                                if (product.quantity === 1) {
                                    if (animationState.current === 'to') {
                                        animationState.transitionTo('expanded');
                                    } else {
                                        animationState.transitionTo('to');
                                    }
                                }
                                if (!loading) {
                                    const result = await dispatch(
                                        deleteFromCart({
                                            ...product,
                                            quantity: product.quantity,
                                            size: product.size,
                                            sizes: product.sizes,
                                            instruction: product.instruction
                                        })
                                    );
                                }
                            }}
                        />
                        <Text style={{ ...FONTS.h3 }}>
                            $
                            {typeof product.price === 'object'
                                ? parseFloat(
                                      product.price[product.size! as string] *
                                          product.quantity!
                                  ).toFixed(2)
                                : +parseFloat(
                                      product.price * product.quantity
                                  ).toFixed(2)}
                        </Text>
                    </Row>
                </View>
            </Row>
        </MotiView>
    );
};

export default CartItemList;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: SIZES.width * 0.95,
        justifyContent: 'space-between',
        alignSelf: 'center',
        shadowOffset: { width: 4, height: 6 },
        borderRadius: 5,
        marginVertical: SIZES.padding * 0.3,
        overflow: 'hidden',
        elevation: 6,
        shadowOpacity: 0.6,
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.069)',
        shadowRadius: 6
    },
    image: {
        width: '100%',
        height: '100%'
    },
    rightView: {
        flex: 0.7,
        padding: SIZES.padding * 0.2,
        justifyContent: 'space-evenly'
    }
});
