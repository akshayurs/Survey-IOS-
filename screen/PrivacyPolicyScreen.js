import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Platform, 
    PixelRatio,
    SafeAreaView ,

} from "react-native";
import { WebView } from 'react-native-webview';


import { useTheme } from 'react-native-paper';
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

export default function PrivacyPolicyScreen({navigation}) {
  return (
    Platform.OS === "web" ? (
      <iframe src="https://surveyoptimus.com/privacy-policy" height={'100%'} width={'100%'} />
    ) : (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: "https://surveyoptimus.com/privacy-policy" }}
          style={{marginTop: 22, flex: 1}}
        />
      </View>
    )
  );
}

