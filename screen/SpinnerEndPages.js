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
    ImageBackground
} from "react-native";
import * as Animatable from 'react-native-animatable';
import background from '../assets/background.jpeg'

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


export default function SpinnerEndPages({navigation}) {
    const { colors } = useTheme();
    const [email, setEmail] = useState("");
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
   
    return (
    <View style={styles.container}>
    <Animatable.View 
        animation="fadeInUpBig"
        style={[styles.footer, {
            backgroundColor: "rgb(235 235 235)"
        }]}
    >

        <View style={{alignItems: 'center', marginTop: '0'}}>
            <Image
                style={styles.stretch}
                source={require('../assets/icon_logo.png')}
            />
        </View>
        <View style={styles.shadow_container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}></ImageBackground>
            <View style={{alignItems: 'center', marginTop: '0'}}>
                <Image
                    style={styles.robot_img}
                    source={require('../assets/robot_pic.png')}
                />
            </View>
            <Text style={{color: '#02B670', marginTop:10, textAlign: "center", fontSize:normalize(25), fontWeight: 'bold'}}>Congratulation!</Text>
            <Text style={{color: '#4D4D4D', marginTop:10,  fontSize:normalize(20)}}>You have successfully completed the survey.</Text>
            <Text style={{color: '#4D4D4D', marginTop:10,  fontSize:normalize(20)}}>Thank you for your participation!</Text>
            <View style={styles.button}>
            <TouchableOpacity
                onPress={() => navigation.navigate('SignUpScreen')}
                style={[styles.signIn, {
                    backgroundColor: '#00A5DF',
                }]}
            >
                <Text style={[styles.textSign, {
                    color: '#fff'
                }]}>Go To my Dashboard</Text>
            </TouchableOpacity>
            <Text style={{color: '#4D4D4D', marginTop:10, textAlign: "center", fontSize:normalize(15)}}>Please allow some time for the points to diplay the points on your account</Text>
        </View>
        </View>
        
        
    </Animatable.View>
  </View>
    );
  }


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f7f7f7',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    stretch: {
        width: SCREEN_WIDTH * 0.5,
        height: 60,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    robot_img: {
        width: SCREEN_WIDTH * 0.5,
        height: 60,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1,
        backgroundColor: 'rgb(235 235 235)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
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
        marginTop: normalize(5),
        maxHeight: 50,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'center',
        borderRadius: normalize(10),
        borderWidth: 1,
        borderColor: "black",
        paddingLeft: 3,
        paddingRight: 3,
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
        paddingLeft: 10,
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
    shadow_container:{
        marginTop: 10,
        padding:20,
        backgroundColor:'#fff',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    image: {
        flex: 1,
        justifyContent: "center"
      },
  });
