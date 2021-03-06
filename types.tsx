/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
    CompositeScreenProps,
    NavigatorScreenParams
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    Modal: undefined;
    NotFound: undefined;
};

export type RestaurantsStackParamList = {
    Restaurants: undefined;
    Restaurant:
        | { restaurantId: string }
        | NativeStackScreenProps<CartStackScreenParams>;
    ProductDetails: { productId: string };
};

export type RootStackScreenProps<Screen extends keyof RootTabParamList> =
    NativeStackScreenProps<RootTabParamList, Screen>;

export type RootTabParamList = {
    RestaurantsStack:
        | NavigatorScreenParams<RestaurantsStackParamList>
        | undefined;
    OrdersStack: NavigatorScreenParams<OrderStackSCreenParams> | undefined;
    CartStack: NavigatorScreenParams<CartStackScreenParams> | undefined;
    ProfileStack: undefined;
};

export type CartStackScreenParams = {
    Cart: undefined;
};

export type OrderStackSCreenParams = {
    Order: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<RootTabParamList, Screen>,
        NativeStackScreenProps<RootStackParamList>
    >;

export interface Theme {
    mode: string;
    BACKGROUND_COLOR: string;
    TEXT_COLOR: string;
    BUTTON_TEXT_COLOR: string;
    PRIMARY_BUTTON_COLOR: string;
    SHADOW_COLOR: string;
    SECONDARY_BUTTON_COLOR: string;
    STATUS_BAR: string;
    WHITE_COLOR: string;
}
