import * as React from 'react';
import { View, Animated, Text, Easing, Dimensions, } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
const spinValue = new Animated.Value(0);

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
export default function Logo() {
  React.useEffect(() => {
    Animated.loop(
        Animated.timing(
          spinValue,
          {
           toValue: 1,
           duration: 3000,
           easing: Easing.linear,
           useNativeDriver: true
          }
        )
       ).start();
    }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.Image
      style={{ transform: [{ rotate: spin }], width: SCREEN_WIDTH*0.28, height: SCREEN_WIDTH*0.28, alignSelf: 'center'  }}
      source={require('../assets/logo_remove_bg.png')}
    />
  );
}


