import {
    Alert,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import React, { FC } from 'react';
import { Text } from '.';
import { FONTS, SIZES } from '../constants';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Product } from '../redux/productsReducer/productsSlide';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/core';
import Shopper from './Shopper';
import {
    addToCart,
    clearCart,
    deleteFromCart
} from '../redux/cartReducer/cartActions';

interface Props {
    product: Product;
    onPress: () => void;
}
const ProductCard: FC<Props> = ({ product, onPress }) => {
    const theme = useAppSelector((state) => state.theme);
    const { cartItems, InCart } = useAppSelector((state) => state.cart);
    const { selectedStore } = useAppSelector((state) => state.stores);
    const dispatch = useAppDispatch();
    const productInCart = cartItems.find((p) => product.id === p.id);
    const isFromAnotherStore = async (): Promise<boolean> => {
        try {
            if (cartItems.length > 0) {
                const found = cartItems.find(
                    (i) => i.storeId === selectedStore?.id
                );
                return !found ? true : false;
            }
            return false;
        } catch (error) {
            return false;
        }
    };

    const deleteAndAdd = async () => {
        try {
            const { payload } = await dispatch(clearCart());

            if (payload) {
                await dispatch(
                    addToCart({
                        ...product,
                        size: null,
                        quantity: 1,
                        instruction: null
                    })
                );
            }

            return;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.card,
                {
                    backgroundColor: theme.SHADOW_COLOR,
                    width: SIZES.isSmallDevice
                        ? SIZES.width * 0.7
                        : SIZES.width * 0.4
                }
            ]}
        >
            <ImageBackground
                resizeMode="cover"
                source={{ uri: product.imageUrl }}
                style={styles.image}
            >
                {cartItems.find((i) => i.id === product.id) && (
                    <LinearGradient
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            padding: SIZES.padding * 0.2
                        }}
                        colors={[
                            theme.SHADOW_COLOR,
                            theme.SECONDARY_BUTTON_COLOR,
                            'rgba(0,0,0,0.183)',
                            'rgba(0,0,0,0.123)'
                        ]}
                    >
                        <Text style={{ color: theme.WHITE_COLOR, ...FONTS.h5 }}>
                            In Cart
                        </Text>
                    </LinearGradient>
                )}

                <View style={{ position: 'absolute', right: 0, top: 0 }}>
                    {product.sizes === null && (
                        <Shopper
                            value={productInCart?.quantity!}
                            onAdd={async () => {
                                const anotherStore = await isFromAnotherStore();
                                if (anotherStore) {
                                    Alert.alert('Another Item Found', `dsdsd`, [
                                        { text: 'Cancel', style: 'cancel' },
                                        {
                                            text: 'Delete & Add New Item',
                                            onPress: deleteAndAdd
                                        }
                                    ]);

                                    return;
                                }
                                dispatch(
                                    addToCart({
                                        ...product,

                                        size: null,
                                        quantity: productInCart?.quantity || 1,
                                        instruction: null
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
                                        instruction: null
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
                        paddingHorizontal: SIZES.base
                    }}
                    colors={[theme.SHADOW_COLOR, theme.SECONDARY_BUTTON_COLOR]}
                >
                    <Text
                        style={{
                            fontFamily: 'lobster',
                            fontSize: 24,
                            color: theme.WHITE_COLOR
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
        borderRadius: SIZES.radius
    },
    image: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: SIZES.radius
    }
});
