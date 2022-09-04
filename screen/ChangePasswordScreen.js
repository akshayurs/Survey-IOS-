import React, { useState, useContext } from "react";
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
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from "../context/AuthContext";
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

export default function ChangePasswordScreen({navigation}) {
    const { colors } = useTheme();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const {isLoading, changePassword} = useContext(AuthContext);

    const [curr_pass_sec, set_curr_pass_sec] = useState(true)
    const [pass_sec, setPass_sec] = useState(true)
    const [confPassSec, setConfPassSec] = useState(true)


    return (<ScrollView>
    <View style={styles.container}>
    <Animatable.View 
        animation="fadeInUpBig"
        style={[styles.footer, {
            backgroundColor: "rgb(235 235 235)"
        }]}
    >

        <Text style={{fontSize: normalize(16), textAlign: "center"}}>Change Password</Text>
        
        <View style={[styles.action, {backgroundColor: '#ffffff', marginTop: 20}]}>
            <FontAwesome 
                name="lock"
                color={colors.text}
                size={20}
            />
            <TextInput 
                placeholder="Current Password"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => setCurrentPassword(val)}
                secureTextEntry={curr_pass_sec} 
            />
            <TouchableOpacity onPress={() => {set_curr_pass_sec(!curr_pass_sec)}}>
                {curr_pass_sec ? 
                <Feather 
                    name="eye-off"
                    color="grey"
                    size={20}
                />
                :
                <Feather 
                    name="eye"
                    color="green"
                    size={20}
                />
                }
            </TouchableOpacity>
        </View>

        <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            <Feather 
                name="lock"
                color={colors.text}
                size={20}
            />
            <TextInput 
                placeholder="New Password"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => setNewPassword(val)}
                secureTextEntry={pass_sec} 
            />
            <TouchableOpacity onPress={() => {setPass_sec(!pass_sec)}}>
                {pass_sec ? 
                <Feather 
                    name="eye-off"
                    color="grey"
                    size={20}
                />
                :
                <Feather 
                    name="eye"
                    color="green"
                    size={20}
                />
                }
            </TouchableOpacity>
        </View>

        <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            <Feather 
                name="lock"
                color={colors.text}
                size={20}
            />
            <TextInput 
                placeholder="Confirm Password"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => setConfirmPassword(val)}
                secureTextEntry={confPassSec} 
            />
            <TouchableOpacity onPress={() => {setConfPassSec(!confPassSec)}}>
                {confPassSec ? 
                <Feather 
                    name="eye-off"
                    color="grey"
                    size={20}
                />
                :
                <Feather 
                    name="eye"
                    color="green"
                    size={20}
                />
                }
            </TouchableOpacity>
        </View>
        <View style={styles.button}>
            <TouchableOpacity
                onPress={() => changePassword(currentPassword, newPassword, confirmPassword)}
                style={[styles.signIn, {
                    backgroundColor: '#378C3C',
                }]}
            >
                <Text style={[styles.textSign, {
                    color: '#fff'
                }]}>Set Password</Text>
            </TouchableOpacity>
        </View>
    </Animatable.View>
  </View></ScrollView>
);
}


const styles = StyleSheet.create({
    container:{
        marginTop: SCREEN_HEIGHT * 0.2,
        backgroundColor: 'rgb(235 235 235)',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    stretch: {
        width: SCREEN_WIDTH*0.20,
        height: SCREEN_WIDTH*0.20,
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
        marginTop: normalize(10),
        minHeight: normalize(37),
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: normalize(10),
        paddingLeft: 15,
        paddingRight: 15,
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
        marginTop: normalize(10),
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
    },
  });

