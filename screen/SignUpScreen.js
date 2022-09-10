import React, { useState, useContext} from "react";
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
    Animated,
    Easing ,
    ScrollView,
} from "react-native";
import CheckBox from 'react-native-check-box'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../context/AuthContext';
import { useTheme } from 'react-native-paper';
import TagLine from "../components/TagLine";
import Logo from "../components/Logo";
import KeyboardAvoidingWrapper from "../component/KeyboardAvoidingWrapper";
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

export default function SignUpScreen({navigation}) {

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

    const { colors } = useTheme();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [isSelected, setSelection] = useState(false);
    const [pass_sec, setPass_sec] = useState(true)
    const [confPassSec, setConfPassSec] = useState(true)
    const {isLoading, register, setTemp_password} = useContext(AuthContext);
    console.log(isSelected)
    return (

        <KeyboardAvoidingWrapper>

    <ScrollView showsVerticalScrollIndicator ={false}>
    <View style={styles.container}>
    <Animatable.View 
        animation="fadeInUpBig"
        style={[styles.footer, {
            backgroundColor: "rgb(235 235 235)"
        }]}
    >
        <Animated.Image
            style={{ transform: [{ rotate: spin }],width: SCREEN_WIDTH*0.28, height: SCREEN_WIDTH*0.28, alignSelf: 'center'  }}
            source={require('../assets/logo_remove_bg.png')}
        />
        <View style={{alignItems: "center"}}>
            <View>
                <View>
                    <Text style={{color: '#000000', marginTop:10, textAlign: "center", fontSize:normalize(20),}}>Welcome to <Text style={{fontWeight: 'bold'}}>SurveyOptimus!</Text></Text>
                    <Text style={{ textAlign: "right", fontSize:normalize(15),}}>it's quick and easy</Text>
                </View>
            </View>
        </View>
        
        <View style={styles.action}>
            <FontAwesome 
                name="user-o"
                color={colors.text}
                size={20}
            />
            <TextInput 
                placeholder="Email"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => setEmail(val)}
            />
            <Animatable.View
                animation="bounceIn"
            >
                <Feather 
                    name="mail"
                    color="gray"
                    size={20}
                />
            </Animatable.View>
        </View>

        <View style={styles.action}>
            <Feather 
                name="lock"
                color={colors.text}
                size={20}
            />
            <TextInput 
                placeholder="Password"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => setPassword(val)}
                secureTextEntry={pass_sec} 
            />
            <TouchableOpacity onPress={() => {setPass_sec(!pass_sec)}}
            >
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

        <View style={styles.action}>
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
            <TouchableOpacity
            onPress={() => {setConfPassSec(!confPassSec)}}
            >
                {confPassSec ? 
                <Feather 
                    name="eye-off"
                    color="grey"
                    size={20}
                />
                :
                <Feather 
                    name="eye"
                    color="grey"
                    size={20}
                />
                }
            </TouchableOpacity>
        </View>

        
        <View style={styles.action}>
            <TextInput 
                placeholder="First Name"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => setFirstName(val)}
            />
        </View>

        
        <View style={styles.action}>
            <TextInput 
                placeholder="Last Name"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => setLastName(val)}
            />
        </View>

        <View style={styles.checkboxContainer}>
            <CheckBox
            isChecked={isSelected}
            onClick={()=>{setSelection(!isSelected)}}
            style={styles.checkbox}
            />
            <TouchableOpacity style={styles.label} onPress={() => navigation.navigate('Terms And Conditions Screen')}><Text>I accept the <Text style={{color: "#1E96F0"}}>Terms and Conditions</Text></Text></TouchableOpacity>
        </View>

        <View style={styles.button}>
            <TouchableOpacity
                onPress={async ()  => {
                    console.log(email)
                    console.log(password)
                    console.log(firstName)
                    console.log(lastName)
                    console.log(lastName)
                    setTemp_password(password)
                    if (confirmPassword != password) {
                      alert('Confirm password is not same as entered password')
                      return
                    }
                    if(email != null && password != null && firstName != null && lastName != null && isSelected){
                        const responce = await register(email, password, confirmPassword, firstName, lastName, navigation)
                    }
                    else{
                        alert('Please fill all the credentials')
                    }
                    }}
                style={[styles.signIn, {
                    backgroundColor: '#378C3C',
                }]}
                // disabled={!isSelected}
            >
                <Text style={[styles.textSign, {
                    color: '#fff'
                }]}>SIGN UP</Text>
            </TouchableOpacity>
        </View> 
        {/* <TouchableOpacity>
        <Text style={{color: '#000000', marginTop:15, textAlign: "center", fontSize: 20}}>Or continue with</Text>
        </TouchableOpacity>
        <View style={{alignItems: "center",justifyContent: 'center', flexDirection: 'row', marginTop: 20}}>

            <Image source={require('../assets/facebook_.png')} style={{height: 50, width: 50, marginRight: 10}}></Image>
            <Image source={require('../assets/google_.png')} style={{height: 50, width: 50, marginLeft: 10}}></Image>
            
        </View> */}
        <TouchableOpacity onPress={() => navigation.navigate('Sign In Screen')}>
            <Text style={{color: '#000000', marginTop:15, textAlign: "center", fontSize:20}}>Already a Member: <Text style={{color: '#1E96F0', fontWeight: '500'}}>SIGN IN</Text></Text>
        </TouchableOpacity>
        </Animatable.View>
    </View>
    </ScrollView>
    </KeyboardAvoidingWrapper>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'rgb(235 235 235)',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop: 30,
        // width: SCREEN_WIDTH,
        // height: SCREEN_HEIGHT
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
        minHeight: normalize(40),
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: normalize(10),
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "#ffffff"
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
        marginTop: normalize(5),
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowRadius: 10,
        shadowOffset: {
        width: 0,
        height: 0
        },
        shadowOpacity: 0.3
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 15,
        alignItems:'center',
        justifyContent:'center',
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 15,
    },
  });