import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';

import useCachedResources from './hooks/useCachedResources';
import TabsNavigation from './navigation/TabsNavigation';
import store, { RootState, useAppSelector } from './redux/store';
import {ThemeProvider} from 'styled-components'



const  App: React.FC = () => {
  const isLoadingComplete = useCachedResources();
 
  
   const theme = useAppSelector(state => state.theme)
 
  if (!isLoadingComplete) {
    return null;
  } 


    return (
     <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <TabsNavigation />
        <StatusBar style='auto' />
        </NavigationContainer>
      </SafeAreaProvider>
      </ThemeProvider>
    );
  
}

export default () => {
  return <Provider store={store}>
    <App />
  </Provider>
}
