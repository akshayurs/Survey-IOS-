import React, { useContext, useState } from "react";
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
    ScrollView
} from "react-native";
import {Avatar} from 'react-native-paper';
import * as Animatable from 'react-native-animatable'

import { useTheme } from 'react-native-paper';
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

export default function UnsubscribeReason({navigation}) {
    const { colors } = useTheme();
    const {isLoading, emailUnsubscribe, is_subscribed, setIs_subscribed} = useContext(AuthContext);
    const [number, setNumber] = useState(null);
    const [text, setText] = useState("");
    const [select, setSelect] = useState(false)
    const un_subscribe = () => {
        console.log(number)
        setIs_subscribed(false)
        emailUnsubscribe(0, number, text)
        navigation.navigate('Communication Option Screen')
    }

    return (
        
    <ScrollView >
    <View style={styles.container}>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: "rgb(235 235 235)"
            }]}
        >
            {/* heading */}
            <Text style={{fontWeight: 'bold', fontSize: normalize(16), marginTop: 10}}>You will be missed!?</Text>

            {/* Question */}
            <Text style={{color: '#000000', marginTop:10,  fontSize:normalize(12), }}>You are requesting to Unsubscribe/opt-out from receiving email survey invitations, marketing message and notices from SurveyOptimus.</Text>
            <Text style={{color: '#000000', marginTop:10,  fontSize:normalize(12), }}>Please take a monument to tell us why you no longer wish to receive email invitations, marketing messagae and notices:</Text>

            <TouchableOpacity style={[styles.action, {backgroundColor: number  == 1 ? "#378C3C" : "#ffffff"}]} onPress={()=>{setSelect(!select); setNumber(1)}}>
                <Text style={styles.option}>I receive too many emails and messages from you</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.action, {backgroundColor: number  == 2 ? "#378C3C" : "#ffffff"}]} onPress={()=>{setSelect(!select); setNumber(2)}}>
                <Text style={styles.option}>I don't receive enough surveys from you</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.action, {backgroundColor: number  == 3 ? "#378C3C" : "#ffffff"}]} onPress={()=>{setSelect(!select); setNumber(3)}}>
                <Text style={styles.option}>I am having touble opening your email messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.action, {backgroundColor: number  == 4 ? "#378C3C" : "#ffffff"}]} onPress={()=>{setSelect(!select); setNumber(4)}}>
                <Text style={styles.option}>I never qualify for surveys</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.action, {backgroundColor: number  == 5 ? "#378C3C" : "#ffffff"}]} onPress={()=>{setSelect(!select); setNumber(5)}}>
                <Text style={styles.option}>Email Surveys don't interest me</Text>
            </TouchableOpacity>
            <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
                <TextInput 
                    placeholder="Other (Please explain below)"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => 
                    {   setNumber(6)
                        setText(val)}}
                    
                />
            </View>

            <View style={styles.button}>

                <TouchableOpacity
                    onPress={un_subscribe}
                    style={[styles.signIn, {
                        backgroundColor: '#378C3C',
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#fff'
                    }]}>Unsubscribe</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
    </View>
    </ScrollView>
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
        width: SCREEN_WIDTH*0.5,
        height: SCREEN_WIDTH*0.5,
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
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    option: {
        fontSize: normalize(10)
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
        borderColor: "#2955a9",
        paddingLeft: 3,
        paddingRight: 3,
        // fontFamily: 'Poppins Regular 400',
        fontSize: normalize(15)
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        height: normalize(30),
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
