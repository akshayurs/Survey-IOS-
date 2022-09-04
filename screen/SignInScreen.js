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
    Easing, 
    ScrollView
} from "react-native";
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import TagLine from "../components/TagLine";
import Logo from "../components/Logo";
import {AuthContext} from '../context/AuthContext';

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

export default function SignInScreen({navigation}) {

    const { colors } = useTheme();
    
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [pass_sec, setPass_sec] = useState(true)
    const [confPassSec, setConfPassSec] = useState(true)

    const {isLoading, login} = useContext(AuthContext);

    
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
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
    <Animatable.View 
        animation="fadeInUpBig"
        style={[styles.footer, {
            backgroundColor: "rgb(235 235 235)"
        }]}
    >

        <Animated.Image
                style={{ transform: [{ rotate: spin }], width: SCREEN_WIDTH*0.28, height: SCREEN_WIDTH*0.28, alignSelf: 'center' }}
                source={require('../assets/logo_remove_bg.png')}
            />
        <View style={{alignItems: "center"}}>
            <View>
                <View>
                    <Text style={{color: '#000000', marginTop:10, textAlign: "center", fontSize:normalize(16),}}>Welcome to <Text style={{fontWeight: 'bold'}}>SurveyOptimus!</Text></Text>
                    <Text style={{ textAlign: "right", fontSize:normalize(12),}}>it's quick and easy</Text>
                </View>
            </View>
        </View>

        <View style={[styles.action,{marginTop: 30}]}>
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

        <TouchableOpacity onPress={() => navigation.navigate('Forgot Password Screen')}>
            <Text style={{color: '#009387', marginTop:15, paddingRight: 0, fontSize: normalize(12)}}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.button}>
            <TouchableOpacity
                onPress={() => login(email, password, navigation)}
                style={[styles.signIn, {
                    backgroundColor: '#378C3C',
                }]} 
                disabled={isLoading}
            >
                <Text style={[styles.textSign, {
                    color: '#fff'
                }]}>SIGN IN</Text>
            </TouchableOpacity>
        </View>
            
        {/* <TouchableOpacity>
        <Text style={{color: '#000000', marginTop:15, textAlign: "center",  fontSize: 20}}>Or continue with</Text>
        </TouchableOpacity>
        <View style={{alignItems: "center",justifyContent: 'center', flexDirection: 'row', marginTop: 20}}>
            <Image source={require('../assets/facebook_.png')} style={{height: 50, width: 50, marginRight: 10}}></Image>
            <Image source={require('../assets/google_.png')} style={{height: 50, width: 50, marginLeft: 10}}></Image>
        </View> */}
        <TouchableOpacity  onPress={() => navigation.navigate('Sign Up Screen')}>
            <Text style={{color: '#000000', marginTop:15, textAlign: "center", fontSize:16}}>Not a Member: <Text style={{color: '#1E96F0', fontWeight: 'bold'}}>SIGN UP</Text></Text>
        </TouchableOpacity>
    </Animatable.View>
  </ScrollView>
    );
  }


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'rgb(235 235 235)',
        flexDirection:'row',
        alignItems:'center',
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
        marginTop: SCREEN_HEIGHT*0.18,
        flex: 1,
        backgroundColor: 'rgb(235 235 235)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
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
        backgroundColor: '#ffffff', 
        padding: 5,
        marginTop: normalize(10),
        minHeight: normalize(40),
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
        fontSize: 15,
        fontWeight: 'bold'
    },
  });
