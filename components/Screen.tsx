import React from 'react'
import styled from 'styled-components/native'
import {View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppSelector } from '../redux/store'


const Screen: React.FC = ({children}) => {
    const theme = useAppSelector(state => state.theme)
    return (
       <SafeAreaView style={{backgroundColor: theme.BACKGROUND_COLOR, flex:1}}>
           {children}
       </SafeAreaView>
    )
}

export default Screen

