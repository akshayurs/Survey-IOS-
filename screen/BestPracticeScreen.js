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
    ImageBackground,
    ScrollView
} from "react-native";
import {Avatar} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import facebook from '../assets/facebook.png'
import google from '../assets/google.png'
import background from '../assets/background.jpeg'
import background_survey_complete from '../assets/background_survey_complete.jpeg'

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


export default function BestPracticeScreen({navigation}) {
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

        <View style={styles.shadow_container}>
            <ImageBackground source={background_survey_complete} resizeMode="cover" style={styles.image}>
            <Text style={{color: '#4D4D4D', marginTop:10, textAlign: "center", fontSize:normalize(20), fontWeight: 'bold'}}>Best Practice you may consider for better completion</Text>
            <Text style={{color: '#4D4D4D', marginTop:10, textAlign: "center", fontSize:normalize(15)}}>Read the pre-screener question, it gives you inputs on what the client is looking for</Text>
            <Text style={{color: '#4D4D4D', marginTop:10, textAlign: "center", fontSize:normalize(15)}}>Read the question carefully and answer hoestly</Text>
            <Text style={{color: '#4D4D4D', marginTop:10, textAlign: "center", fontSize:normalize(15)}}>Be Consistent with your answers, some questions may be asked multiple times</Text>
            <Text style={{color: '#4D4D4D', marginTop:10, textAlign: "center", fontSize:normalize(15)}}>Don't fill junk information in Descriptive Question Type(open End Question)</Text>
            <View style={styles.button}>
            <TouchableOpacity
                onPress={() => navigation.navigate('SignUpScreen')}
                style={[styles.signIn, {
                    backgroundColor: '#00A5DF',
                    width: SCREEN_WIDTH*0.4,
                }]}
            >
                <Text style={[styles.textSign, {
                    color: '#fff'
                }]}>Next</Text>
            </TouchableOpacity>
            </View>
            </ImageBackground>
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
        height: SCREEN_HEIGHT,
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
