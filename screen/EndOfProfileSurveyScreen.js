import React, { useContext, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform, 
    PixelRatio
} from "react-native";
import * as Animatable from 'react-native-animatable';
import ConfettiCannon from 'react-native-confetti-cannon';
import { AuthContext } from "../context/AuthContext";
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

export default function EndOfProfileSurveyScreen({navigation}) {
    const {userInfo, panelist_basic_details} = useContext(AuthContext);
    console.log(userInfo)
    return (
    <View style={styles.container}>
    <Animatable.View 
        animation="fadeInUpBig"
        style={[styles.footer, {
            backgroundColor: "rgb(235 235 235)"
        }]}
    >

        <View style={{alignItems: 'center', marginTop: 20}}>
            <Image
                style={styles.stretch}
                source={require('../assets/logo_remove_bg.png')}
            />
        </View>

        <TouchableOpacity>
            <Text style={{color: '#000000', marginTop:10, textAlign: "center", fontSize:normalize(16), fontWeight: 'bold'}}>Congratulations!</Text>
        </TouchableOpacity>
        
        <Text style={{color: '#000000', marginTop:20,  fontSize:normalize(12)}}>You have successfully updated your profile.{'\n'}
To activate your account & start receving exiting survey, an "Account Conformation" email has been send to:{'\n'}</Text>
        <Text style={{color: '#000000', color: '#1E96F0', alignSelf: "center"}}> {panelist_basic_details == null ? userInfo.Result && userInfo.Result.email : panelist_basic_details.Results.email}{'\n'} </Text>
        <Text>Please click on the <Text style={{fontStyle: 'italic', lineHeight: 21}}>"Active Account" button in the email Kindly check your Spam/Junk folder as well for the confirmation email.</Text>
        </Text>
        <View style={styles.button}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={[styles.signIn, {
                    backgroundColor: '#378C3C',
                }]}
            >
                <Text style={[styles.textSign, {
                    color: '#fff'
                }]}>Go To Dashboard</Text>
            </TouchableOpacity>
        </View>
        <ConfettiCannon count={200} origin={{x: -10, y: 0}} fallSpeed={7000}/>
    </Animatable.View>
  </View>
    );
  }


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#FAFAFA',
        flexDirection:'row',
        // alignItems:'center',
        justifyContent:'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    stretch: {
        width: SCREEN_WIDTH*0.4,
        height: SCREEN_WIDTH*0.4,
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
  });
