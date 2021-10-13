import React from 'react'
import { View, Text } from 'react-native'

import Slider from '@react-native-community/slider';

const SliderBar : React.FC<{ minimumValue:number | undefined
maximumValue:number | undefined, value:number | undefined, onValueChange: any, onSlidingComplete: any}> = ({minimumValue, maximumValue, value, onValueChange, onSlidingComplete}) => {
    return (
        <View style={{width:'90%'}}>
            <Slider
                style={{width: '100%', height: 30}}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                value={value}
                onSlidingComplete={onSlidingComplete}
                thumbTintColor='#856363'
                onValueChange={onValueChange}
                minimumTrackTintColor="#8f5757"
                maximumTrackTintColor="#000000"
                    />
        </View>
    )
}

export default SliderBar
