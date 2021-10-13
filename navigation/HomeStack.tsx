import React from 'react'
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'
import { Home } from '../screens'
import { HomeStackParamList } from '../types'

const {Navigator, Screen} = createSharedElementStackNavigator<HomeStackParamList>()

const HomeStack = () => {
    return (
        <Navigator>
            <Screen name='Home' component={Home} />
        </Navigator>
    )
}
export default HomeStack