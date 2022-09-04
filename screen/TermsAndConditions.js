import React, { useState } from "react";
import {
    View,
    Dimensions,
    Platform, 
    PixelRatio,
} from "react-native";
import { WebView } from 'react-native-webview';
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


export default function TermsAndConditions({navigation}) {
 
   
    return (
        Platform.OS === "web" ? (
            <iframe src="https://surveyoptimus.com/terms-and-conditions" height={'100%'} width={'100%'} />
          ) : (
            <View style={{ flex: 1 }}>
              <WebView
                source={{ uri: "https://surveyoptimus.com/terms-and-conditions" }}
                style={{marginTop: 22, flex: 1}}
              />
            </View>
          )
    );
  }

