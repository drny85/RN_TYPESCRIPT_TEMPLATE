import { lightTheme } from './../Theme';
import { useAppDispatch } from './../redux/store';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import useColorScheme from './useColorScheme';
import { darkTheme } from '../Theme';
import { switchTheme } from '../redux/themeReducer/themeSlide';
import { getCartItems } from '../redux/cartReducer/cartActions';

export default function useCachedResources() {
	const [isLoadingComplete, setLoadingComplete] = React.useState(false);
	const isDark = useColorScheme() === 'dark';
	const dispatch = useAppDispatch();

	// Load any resources or data that we need prior to rendering the app
	React.useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHideAsync();

				// Load fonts
				isDark
					? dispatch(switchTheme(darkTheme))
					: dispatch(switchTheme(lightTheme));
				await Font.loadAsync({
					...FontAwesome.font,
					montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
					'montserrat-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
					lobster: require('../assets/fonts/Lobster-Regular.ttf'),
				});
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			} finally {
				setLoadingComplete(true);
				SplashScreen.hideAsync();
				dispatch(getCartItems());
			}
		}

		loadResourcesAndDataAsync();
	}, [isDark]);

	return isLoadingComplete;
}
