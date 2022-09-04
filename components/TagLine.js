import React, { useEffect } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform, 
  PixelRatio,
  Animated
} from "react-native";

var {width: SCREEN_WIDTH, height: SCREEN_HEIGHT,} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;
console.log(SCREEN_HEIGHT)
console.log(SCREEN_WIDTH)
export function normalize(size) {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}
const spinValue = new Animated.Value(0);
function TagLine() {

  useEffect(() => {
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    })
  })

  return (
    <View style={{alignItems: "center"}}>
      <View style={{width: 'fit-content'}}>
        <Text style={{color: '#000000', marginTop:10, textAlign: "center", fontSize:normalize(20),}}>Welcome to <Text style={{fontWeight: 'bold'}}>SurveyOptimus!</Text></Text>
        <Text style={{ textAlign: "right", fontSize:normalize(15),}}>it's quick and easy</Text>
      </View>
    </View>
  )
}

export default TagLine