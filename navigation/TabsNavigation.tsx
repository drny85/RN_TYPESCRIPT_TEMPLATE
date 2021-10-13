import { RootTabParamList } from '../types';
import React, {FC} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Home } from '../screens';
import {FontAwesome} from '@expo/vector-icons'
import { useAppSelector } from '../redux/store';

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color?: string;
  }) {
    const theme = useAppSelector(state => state.theme)
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} color={theme.PRIMARY_BUTTON_COLOR} />;
  }
  

const {Navigator, Screen} = createBottomTabNavigator<RootTabParamList>()

const TabsNavigation:FC  = () => {
    const theme = useAppSelector(state => state.theme)
    return (
       
       <Navigator screenOptions={{headerShown:false, tabBarStyle: {
           backgroundColor:theme.BACKGROUND_COLOR,
        
       },
       tabBarActiveTintColor: theme.TEXT_COLOR ,
       tabBarActiveBackgroundColor: theme.mode === 'dark' ? '#272729': '#b9adad7d'









    
    }}>
           <Screen name='HomeStack' component={Home} options={{
               title:'Home',
               tabBarIcon: ({focused, color, size}) => <TabBarIcon name='home'  />
           }} />
           <Screen name='OrdersStack' component={Home} options={{
               title:'Orders',
            tabBarIcon: ({focused, color, size}) => <TabBarIcon name='first-order' />
        }} />
        <Screen name='CartStack' component={Home} options={{
            title:'Cart',
            tabBarIcon: ({focused, color, size}) => <TabBarIcon name='shopping-cart' />
        }} />
        <Screen name='ProfileStack' component={Home} options={{
            title:'Profile',
            tabBarIcon: ({focused, color, size}) => <TabBarIcon name='user' />
        }} />
       </Navigator>

    )
    
}

export default TabsNavigation