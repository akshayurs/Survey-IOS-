import React, { useState, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Platform, 
    PixelRatio,
    Animated,
    Easing ,
    Image
} from "react-native";
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import Logo from "../components/Logo";
import TagLine from "../components/TagLine";
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
const spinValue = new Animated.Value(0);
export default function ForgotPasswordScreen({navigation}) {

    const {isLoading, forgotpassword} = useContext(AuthContext);
    
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

    return (
        
    <View style={styles.container}>
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
        {/* <View style={{alignItems: "center"}}>
            <View>
                <View>
                    <Text style={{color: '#000000', marginTop:10, textAlign: "center", fontSize:normalize(20),}}>Welcome to <Text style={{fontWeight: 'bold'}}>SurveyOptimus!</Text></Text>
                    <Text style={{ textAlign: "right", fontSize:normalize(15),}}>it's quick and easy</Text>
                </View>
            </View>
        </View>
 */}
        <Text style={{color: '#009387', marginTop:10, textAlign: "center", fontSize:normalize(24), fontWeight: 'bold'}}>Forgot Password</Text>

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
        <View style={styles.button}>
            <TouchableOpacity
                onPress={() => forgotpassword(email)}
                style={[styles.signIn, {
                    backgroundColor: '#378C3C',
                }]}
                disabled={isLoading}
            >
                <Text style={[styles.textSign, {
                    color: '#fff'
                }]}>SUBMIT</Text>
            </TouchableOpacity>
        </View>
            
        <TouchableOpacity  onPress={() => navigation.navigate('Sign Up Screen')}>
            <Text style={{color: '#000000', marginTop:15, textAlign: "center", fontSize:20 }}>Not a Member: <Text style={{color: '#1E96F0', fontWeight: 'bold'}}>SIGN UP</Text></Text>
        </TouchableOpacity>
    </Animatable.View>
  </View>
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
        flex: 1,
        backgroundColor: 'rgb(235 235 235)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginTop: 30,
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
        minHeight: normalize(40),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: normalize(10),
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#ffffff'
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
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
});