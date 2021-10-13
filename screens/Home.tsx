import React,{FC} from 'react'
import { Screen } from '../components'
import { Button, Text } from '../components'

import { useAppDispatch, useAppSelector } from '../redux/store'
import { switchTheme } from '../redux/themeReducer/themeSlide'
import { darkTheme, lightTheme } from '../Theme'


const Home:FC = () => {
    const dispath = useAppDispatch()
    const theme = useAppSelector(state => state.theme)
    return (
       <Screen center>
           <Text>Home</Text>
           <Button onPress={() => dispath(switchTheme(theme.mode === 'dark' ? lightTheme : darkTheme))} secondary>
               <Text>Switch Theme</Text>
           </Button>
       </Screen>
    )
}

export default Home
