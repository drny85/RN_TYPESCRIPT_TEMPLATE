import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
	mode: 'light',
	BACKGROUND_COLOR: '#ffffff',
	TEXT_COLOR: '#212121',
	BUTTON_TEXT_COLOR: '#ffffff',
	PRIMARY_BUTTON_COLOR: '#212121',
	SHADOW_COLOR: 'rgba(0, 0, 0, 0.19)',
	SECONDARY_BUTTON_COLOR: '#3d405b',
	STATUS_BAR: 'dark',
	WHITE_COLOR: '#ffffff',
};

export const darkTheme: DefaultTheme = {
	mode: 'dark',
	BACKGROUND_COLOR: '#212121',
	TEXT_COLOR: '#fff',
	BUTTON_TEXT_COLOR: '#ffffff',
	PRIMARY_BUTTON_COLOR: '#8f5757',
	SHADOW_COLOR: 'rgba(0, 0, 0, 0.19)',
	SECONDARY_BUTTON_COLOR: '#3d405b',
	STATUS_BAR: 'light',
	WHITE_COLOR: '#ffffff',
};
