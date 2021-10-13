import { RootTabParamList } from '../types';
import React, {FC} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Home } from '../screens';
import {FontAwesome} from '@expo/vector-icons'
import { useAppSelector } from '../redux/store';

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
  }
  

const {Navigator, Screen} = createBottomTabNavigator<RootTabParamList>()

const TabsNavigation:FC  = () => {
    const theme = useAppSelector(state => state.theme)
    return (
       
       <Navigator screenOptions={{headerShown:false, tabBarStyle: {
           backgroundColor:theme.BACKGROUND_COLOR
       }}}>
           <Screen name='HomeStack' component={Home} options={{
               tabBarIcon: ({focused, color, size}) => <TabBarIcon name='home' color={color} />
           }} />
           <Screen name='OrdersStack' component={Home} options={{
               title:'Orders',
            tabBarIcon: ({focused, color, size}) => <TabBarIcon name='first-order' color={color} />
        }} />
        <Screen name='CartStack' component={Home} options={{
            title:'Cart',
            tabBarIcon: ({focused, color, size}) => <TabBarIcon name='shopping-cart' color={color} />
        }} />
        <Screen name='ProfileStack' component={Home} options={{
            title:'Profile',
            tabBarIcon: ({focused, color, size}) => <TabBarIcon name='user' color={color} />
        }} />
       </Navigator>

    )
    
}

export default TabsNavigation