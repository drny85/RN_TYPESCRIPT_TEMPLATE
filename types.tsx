/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
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

export type HomeStackParamList = {
  Home:undefined;
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  HomeStack: undefined;
  OrdersStack: undefined;
  CartStack:undefined;
  ProfileStack: undefined
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
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
  
 
}

export interface PlayingStatus {
  didJustFinish?: boolean,
  durationMillis?: number,
  hasJustBeenInterrupted: boolean,
  isBuffering: boolean,
  isLoaded: true,
  isLooping: boolean,
  isMuted: boolean,
  isPlaying: boolean,
  pitchCorrectionQuality: string,
  playableDurationMillis: number,
  positionMillis: number,
  progressUpdateIntervalMillis: boolean,
  rate: boolean,
  shouldCorrectPitch: boolean,
  shouldPlay: boolean,
  uri: string
  volume: number,


}
