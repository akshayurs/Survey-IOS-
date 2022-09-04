import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Platform, 
    PixelRatio,
    Animated,
    Easing 
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
export default function LoadingScreen({navigation}) {

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
    <View style={styles.container}>
        <View style={{alignItems: 'center', marginTop: SCREEN_HEIGHT*0.2}}>
            <Animated.Image
                style={{ transform: [{ rotate: spin }], width: SCREEN_HEIGHT*0.2, height: SCREEN_HEIGHT*0.2 }}
                source={require('../assets/logo_remove_bg.png')}
            />
        </View>
        <View style={{ padding: 20, marginTop: SCREEN_HEIGHT*0.6 - 100}}>
            <Image
                style={styles.stretch_logo}
                source={require('../assets/icon_new_logo.png')}
            />
            <Text style={{alignSelf: "center"}}>v.1.0.3</Text>
        </View> 
    </View>   
    );
  }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        alignItems:'center',
        backgroundColor: "#fff"
    },
    stretch_logo: {
        width: SCREEN_WIDTH * 0.5,
        height: 60,
        // width: "80%"
    },
    stretch: {
        // width: SCREEN_WIDTH * 0.5,
        height: 60,
        width: 60
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: "20",
        paddingBottom: "50"
    },
    footer: {
        flex: 1,
        backgroundColor: 'rgb(235 235 235)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: "20",
        paddingVertical: "30"
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        marginTop: normalize(30),
        minHeight: 40,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: normalize(10),
        paddingLeft: "3",
        paddingRight: "3",
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        height: normalize(20),
        flex: 1,
        paddingLeft: "10",
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: normalize(30),
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
  });
