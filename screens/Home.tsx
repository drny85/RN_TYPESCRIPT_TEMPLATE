import React, { useState } from 'react'
import { View, TouchableOpacity, useWindowDimensions } from 'react-native'
import Screen from '../components/Screen'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { switchTheme } from '../redux/themeReducer/themeSlide'
import { darkTheme, lightTheme} from '../Theme'


import { FontAwesome } from '@expo/vector-icons';

import { Audio,} from 'expo-av';
import { SONGS } from '../constants/Songs'
import { ScrollView } from 'react-native-gesture-handler'
import SliderBar from '../components/Slider'
import Text  from '../components/styled/Text'
import { PlayingStatus } from '../types'

const Home = () => {
    const {width} = useWindowDimensions()
    const {theme} = useAppSelector(state => state)
    const [sounds, setSounds] = useState<typeof SONGS>(SONGS)
    const [currentSoung, setCurrentSoung] = useState<any>(null)
    const [playingName, setPlayingName] = useState<string>()
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [volume, setVolume] = useState<number>(1.0)
    const [status, setStatus] = useState<PlayingStatus>()
    const [playingNumber, setPlayingNumber] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [position, setPosition] = useState<number>(0)
   
   
    const dispatch = useAppDispatch()

    const onPlayStatusChange = (s: PlayingStatus | any) => {
       console.log(s)
       setDuration(s.durationMillis)
       setPosition(s.positionMillis)
       setIsPlaying(s.isPlaying)
      setStatus(s)
       
    }

    const loadSound = async () => {
        try {
           const sound = new Audio.Sound()
           const source = {uri: sounds[playingNumber].url}
           setPlayingName(sounds[playingNumber].name)
           sound.setOnPlaybackStatusUpdate(onPlayStatusChange)
          
          const {isLoaded} =  await sound.loadAsync(sounds[playingNumber].url, {shouldPlay: isPlaying, volume}, false)
         
         
           setCurrentSoung(sound)

           return isLoaded
           
        } catch (error) {
            console.log(error)
        }
    }
 
    const initialLoad = async () => {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: true
              })

              await loadSound()
         
        } catch (error) {
            console.log(error)
        }
    }

  
    const playOrPause = async () => {
        try {
            status?.isPlaying ? await currentSoung.pauseAsync() : await currentSoung.playAsync()

        } catch (error) {
            
        }
    }

    const onSliderMove = async (mili:number) => {
        try {
            
            if (currentSoung) {
                await currentSoung.setPositionAsync(mili)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const playNext = async () => {
        try {
           
           console.log(playingNumber)
            if (currentSoung) {
                await currentSoung.unloadAsync()
                playingNumber < SONGS.length - 1 ? setPlayingNumber(prev => prev + 1) : setPlayingNumber(0)
                setIsPlaying(true)
                loadSound()
                
            }
            
          
        } catch (error) {
            console.log(error)
        }
    }

    const playPrevious = async () => {
        try {
            if (currentSoung) {
                await currentSoung.unloadAsync()

                playingNumber < sounds.length -1 ? setPlayingNumber(prev => prev -1): setPlayingNumber(0)

                loadSound()
            }
        } catch (error) {
            
        }
    }

    const playOnSelect = async (index: number) => {
        try {
            if (currentSoung) {
                await currentSoung.unloadAsync()

                playingNumber < sounds.length -1 ? setPlayingNumber(index): setPlayingNumber(0)

                loadSound()
            }
                
           
            
        } catch (error) {
            console.log(error)
        }
    }

   
    React.useEffect(() => {
        initialLoad()

        return currentSoung
        ? () => {
            console.log('Unloading currentSoung');
            currentSoung.unloadAsync(); }
        : undefined;
       
    }, [])
    return (
        <Screen>
            <TouchableOpacity onPress={() => 
                dispatch(switchTheme(theme.mode === 'dark' ? lightTheme : darkTheme))
            } style={{paddingVertical:20, paddingHorizontal:35, backgroundColor: theme.BACKGROUND_COLOR, borderRadius:35, marginHorizontal:25}}>
                <Text style={{color: theme.TEXT_COLOR}}>Swicth Theme</Text>
            </TouchableOpacity>
           <ScrollView>
               {SONGS.map((s, index ) => {
                   return <TouchableOpacity onPress={() => playOnSelect(index)} key={s.name} style={{height:50, backgroundColor: theme.BACKGROUND_COLOR, paddingVertical:10, paddingHorizontal:15}}>
                       <Text>{s.name}</Text>
                   </TouchableOpacity>
               })}
           </ScrollView>
           
            <View style={{backgroundColor:theme.BACKGROUND_COLOR,  position:'absolute', bottom:0, left:0, right:0, height: 250, justifyContent:'space-evenly', alignItems:'center', padding:20,width:width }}>
                <SliderBar maximumValue={status?.durationMillis} minimumValue={0} value={position} onSlidingComplete={(e:number) => onSliderMove(e)} onValueChange={(e:number) => setPosition(position)} />
           <View style={{flexDirection:'row', justifyContent:'space-between', width: '80%'}}>
           {/* <Text>{new Date(position).toISOString().substr(14, 5)}</Text>
            <Text>{new Date(duration -  position).toISOString().substr(14, 5)}</Text> */}
           </View>
            <Text>{playingName}</Text>
            
            <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', padding:20,width:width}}>
           {!status?.isPlaying ? (
               <>
                  <TouchableOpacity style={{justifyContent:'center', alignItems:'center', shadowOffset: {width:4, height:4}, elevation:6, shadowOpacity:0.5, shadowRadius:3, borderRadius:55,backgroundColor: '#e0d4d4', height:50, width:50}} onPress={playPrevious}>
                <FontAwesome name='backward' size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center', shadowOffset: {width:4, height:4}, elevation:6, shadowOpacity:0.5, shadowRadius:3, borderRadius:35,backgroundColor: '#e0d4d4', height:70, width:70}} onPress={playOrPause}>
                <FontAwesome name='play' size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center', shadowOffset: {width:4, height:4}, elevation:6, shadowOpacity:0.5, shadowRadius:3, borderRadius:25,backgroundColor: '#e0d4d4', height:50, width:50}} onPress={playNext}>
                <FontAwesome name='forward' size={24} />
            </TouchableOpacity>
            </>
            )
            
            :
            ( 
                <>
                <TouchableOpacity style={{justifyContent:'center', alignItems:'center', shadowOffset: {width:4, height:4}, elevation:6, shadowOpacity:0.5, shadowRadius:3, borderRadius:55,backgroundColor: '#e0d4d4', height:50, width:50}} onPress={playPrevious}>
              <FontAwesome name='backward' size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={{justifyContent:'center', alignItems:'center', shadowOffset: {width:4, height:4}, elevation:6, shadowOpacity:0.5, shadowRadius:3, borderRadius:35,backgroundColor: '#e0d4d4', height:70, width:70}} onPress={playOrPause}>
              <FontAwesome name='pause' size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{justifyContent:'center', alignItems:'center', shadowOffset: {width:4, height:4}, elevation:6, shadowOpacity:0.5, shadowRadius:3, borderRadius:25,backgroundColor: '#e0d4d4', height:50, width:50}} onPress={playNext}>
              <FontAwesome name='forward' size={24} />
          </TouchableOpacity>
          </>
            )
           }
           </View>
           
            </View>
        </Screen>
    )
}

export default Home
